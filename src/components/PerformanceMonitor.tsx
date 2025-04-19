import React, { useEffect, useRef, useState } from "react";
import "./PerformanceMonitor.css";

/***************************
 *  GLOBAL INSTRUMENTATION *
 ***************************/

// Avoid double‑patching when Hot Reload remounts the component
if (!(window as any).__PM_PATCHED__) {
  (window as any).__PM_PATCHED__ = true;

  /* ---------- Timers ---------- */
  let timeoutCount = 0;
  let intervalCount = 0;

  const _setTimeout = window.setTimeout;
  const _clearTimeout = window.clearTimeout;
  const _setInterval = window.setInterval;
  const _clearInterval = window.clearInterval;

  window.setTimeout = (...args) => {
    timeoutCount++;
    return _setTimeout(...args);
  };
  window.clearTimeout = (id) => {
    if (timeoutCount > 0) timeoutCount--;
    _clearTimeout(id);
  };

  window.setInterval = (...args) => {
    intervalCount++;
    return _setInterval(...args);
  };
  window.clearInterval = (id) => {
    if (intervalCount > 0) intervalCount--;
    _clearInterval(id);
  };

  (window as any).__PM_GET_ACTIVE_TIMERS__ = () => timeoutCount + intervalCount;

  /* ---------- Event listeners ---------- */
  let listenerCount = 0;
  const _add = EventTarget.prototype.addEventListener;
  const _remove = EventTarget.prototype.removeEventListener;

  EventTarget.prototype.addEventListener = function (...args) {
    listenerCount++;
    // @ts-ignore
    return _add.apply(this, args);
  };
  EventTarget.prototype.removeEventListener = function (...args) {
    if (listenerCount > 0) listenerCount--;
    // @ts-ignore
    return _remove.apply(this, args);
  };

  (window as any).__PM_GET_EVENT_LISTENERS__ = () => listenerCount;

  /* ---------- Pending fetch ---------- */
  let pendingFetches = 0;
  const _fetch : any= window.fetch.bind(window);

  window.fetch = (...args) => {
    pendingFetches++;
    return _fetch(...args)?.finally(() => {
      if (pendingFetches > 0) pendingFetches--;
    });
  };

  (window as any).__PM_GET_PENDING_REQUESTS__ = () => pendingFetches;
}

/***************************
 * TYPES
 ***************************/

interface PerformanceData {
  score: number;
  domSize: {
    totalElements: number;
    depth: number;
    bodyElements: number;
    headElements: number;
  };
  imagesAlt: {
    total: number;
    withoutAlt: number;
    elements: Element[];
  };
  layoutShift: {
    value: number;
    elements: Element[];
  };
  memoryUsage: {
    usedMB: number;
    totalMB: number;
    limitMB: number;
  } | null;
  activeTimers: number;
  eventListeners: { totalListeners: number };
  interactionDelay: number;
  pendingRequests: { total: number; requests: PerformanceEntry[] };
}
/************  CLS accumulator  ************/
let clsValue = 0;
let clsEntries: any[] = [];

if (!("__PM_CLS_OBSERVER__" in window) && "PerformanceObserver" in window) {
  const clsObserver = new PerformanceObserver(list => {
    list.getEntries().forEach(e => {
      const entry = e as any;
      if (!entry.hadRecentInput && entry.value > 0) {
        clsValue += entry.value;          // <- accumulate magnitude
        clsEntries.push(entry);
      }
    });
  });

  clsObserver.observe({ type: "layout-shift", buffered: true });
  (window as any).__PM_CLS_OBSERVER__ = clsObserver;
}

/***************************
 *   METRIC HELPERS
 ***************************/

const checkImagesAlt = () => {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
  const without = imgs.filter((img) => !(img.getAttribute("alt") ?? "").trim());
  return { total: imgs.length, withoutAlt: without.length, elements: without };
};

const getMaxDepth = (el: Element | null, depth = 0): number => {
  if (!el || el.children.length === 0) return depth;
  return Math.max(...Array.from(el.children).map((c) => getMaxDepth(c, depth + 1)));
};

const checkDOMSize = () => {
  const bodyElements = document.body.getElementsByTagName("*").length;
  const headElements = document.head.getElementsByTagName("*").length;
  return {
    totalElements: bodyElements + headElements,
    depth: getMaxDepth(document.body),
    bodyElements,
    headElements,
  };
};


/************   helper   ************/
const checkLayoutShift = () => {
  // Grab the nodes for developer hints
  const nodes = new Set<Element>();
  clsEntries.forEach(e => e.sources?.forEach((s:any) => s.node && nodes.add(s.node!)));
  // Return both the cumulative value and the offending nodes
  return { value: +clsValue.toFixed(3), elements: Array.from(nodes) };
};

const checkMemoryUsage = () => {
  if ((performance as any).memory) {
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } =
      (performance as any).memory;

    return {
      usedMB: +(usedJSHeapSize / 1048576).toFixed(2),
      totalMB: +(totalJSHeapSize / 1048576).toFixed(2),
      limitMB: +(jsHeapSizeLimit / 1048576).toFixed(2)
    };
  }
  return null;   // API not available
};
const measureInteractionDelay = () =>
  new Promise<number>((resolve) => {
    const start = performance.now();
    requestAnimationFrame(() => resolve(performance.now() - start));
  });

const checkPerformance = async (): Promise<PerformanceData> => {
  const domSize = checkDOMSize();
  const imagesAlt = checkImagesAlt();
  const layoutShift = checkLayoutShift();
  const memoryUsage = checkMemoryUsage();
  const activeTimers = (window as any).__PM_GET_ACTIVE_TIMERS__?.() ?? 0;
  const totalListeners = (window as any).__PM_GET_EVENT_LISTENERS__?.() ?? 0;
  const pending = (window as any).__PM_GET_PENDING_REQUESTS__?.() ?? 0;
  const interactionDelay = await measureInteractionDelay();

  /* ---------- score ---------- */
  let score = 100;

  if (domSize.totalElements > 3000) score -= 50;
  else if (domSize.totalElements > 2000) score -= 35;
  else if (domSize.totalElements > 1000) score -= 25;

  if (domSize.depth > 32) score -= Math.min(10, domSize.depth - 10);
  if (imagesAlt.withoutAlt) score -= Math.min(15, imagesAlt.withoutAlt * 2);
  
  if (layoutShift.value > 0.1) {          // 0.1 is Google’s “good” threshold
    score -= Math.min(10, layoutShift.value * 100); // 0.25 CLS ⇒ –10 pts
  }
  if (memoryUsage && memoryUsage.limitMB && memoryUsage.usedMB / memoryUsage.limitMB > 0.3) {
    score -= Math.min(15, ((memoryUsage.usedMB / memoryUsage.limitMB) - 0.3) * 50);
  }

  if (activeTimers > 10) score -= Math.min(10, activeTimers - 10);
  if (totalListeners > 500) score -= Math.min(15, (totalListeners - 500) / 50);
  if (interactionDelay > 100) score -= Math.min(20, (interactionDelay - 100) / 10);
  if (pending > 5) score -= Math.min(10, pending - 5);

  if (score < 0) score = 0;

  return {
    score,
    domSize,
    imagesAlt,
    layoutShift,
    memoryUsage,
    activeTimers,
    eventListeners: { totalListeners },
    interactionDelay,
    pendingRequests: { total: pending, requests: [] },
  };
};

/***************************
 * UI Helpers
 ***************************/

const scoreColor = (s: number) =>
  s >= 90 ? "#4CAF50" : s >= 70 ? "#FFC107" : s >= 50 ? "#FF9800" : "#F44336";

/***************************
 * THE COMPONENT
 ***************************/

export const PerformanceMonitor: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const pop = useRef<HTMLDivElement | null>(null);

  const analyze = async () => {
    setLoading(true);
    try {
      setData(await checkPerformance());
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  /* click‑outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pop.current && !pop.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {children}
      <div className="PerformanceMonitor_container">
        <button
          className="PerformanceMonitor_analyzeButton"
          onClick={analyze}
          disabled={loading}
          aria-label="Analyze Performance"
        >
          <span className="PerformanceMonitor_buttonIcon">
            {loading ? "⏳" : "🔍"}
          </span>
          <span className="PerformanceMonitor_buttonText">
            {loading ? "Analyzing…" : "Analyze Performance"}
          </span>
        </button>

        {open && data && (
          <div className="PerformanceMonitor_popover" ref={pop}>
            {/* header */}
            <div className="PerformanceMonitor_popoverHeader">
              <h2 className="PerformanceMonitor_popoverTitle">
                Performance Analysis
              </h2>
              <button
                className="PerformanceMonitor_closeButton"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* score donut */}
            <div className="PerformanceMonitor_scoreContainer">
              <div
                className="PerformanceMonitor_scoreCircle"
                style={{
                  background: `conic-gradient(${scoreColor(
                    data.score
                  )} ${data.score}%, #f0f0f0 ${data.score}% 100%)`,
                }}
              >
                <div className="PerformanceMonitor_scoreInner">
                  <span className="PerformanceMonitor_scoreValue">
                    {Math.round(data.score)}
                  </span>
                  <span className="PerformanceMonitor_scoreLabel">Score</span>
                </div>
              </div>
            </div>

            {/* results */}
            <div className="PerformanceMonitor_resultsContainer">
              {data.score >= 99 ? (
                <div className="PerformanceMonitor_goodResult">
                  <h3>Great job! Your app is performing well.</h3>
                  <p>Keep monitoring as your codebase grows.</p>
                </div>
              ) : (
                <>
                  <h3 className="PerformanceMonitor_resultsTitle">
                    Areas for Improvement:
                  </h3>

                  {/* list of issues (rendered only when triggered) */}
                  {data.domSize.totalElements > 1000 && (
                    <Issue
                      title="Large DOM Size"
                      detail={`DOM has ${data.domSize.totalElements} elements (limit ≈ 1000).`}
                      suggestion="Simplify or virtualise parts of the UI."
                    />
                  )}

                  {data.domSize.depth > 32 && (
                    <Issue
                      title="Deep DOM Structure"
                      detail={`DOM depth is ${data.domSize.depth} (recommended ≤ 32) for Single Page Applications.`}
                      suggestion="Flatten nested component trees."
                    />
                  )}

                  {data.imagesAlt.withoutAlt > 0 && (
                    <Issue
                      title="Missing Image Alts"
                      detail={`${data.imagesAlt.withoutAlt} image(s) lack alt attributes.`}
                      suggestion="Add descriptive alt text."
                    />
                  )}

                  {data.layoutShift.value > 0 && (
                    <Issue
                      title="Layout Shifts Detected"
                      detail={`CLS score ${data.layoutShift.value.toFixed(3)} across ${
                        data.layoutShift.elements.length
                      } element(s).`}
                      suggestion="Reserve space for images/ads and avoid inserting content above existing UI."
                    />
                  )}

                  {data.memoryUsage && data.memoryUsage.usedMB > 100 && (
                    <Issue
                      title="High Memory Usage"
                      detail={`Using ${data.memoryUsage.usedMB} MB (target ≤ 100 MB).`}
                      suggestion="Release large objects and watch for leaks."
                    />
                  )}

                  {data.activeTimers > 10 && (
                    <Issue
                      title="Too Many Active Timers"
                      detail={`${data.activeTimers} active timeouts/intervals (limit ≈ 10).`}
                      suggestion="Clear timers on unmount, replace polling with events."
                    />
                  )}

                  {data.eventListeners.totalListeners > 500 && (
                    <Issue
                      title="Excessive Event Listeners"
                      detail={`${data.eventListeners.totalListeners} listeners attached (limit ≈ 500).`}
                      suggestion="Remove listeners on cleanup, delegate where possible."
                    />
                  )}

                  {data.interactionDelay > 100 && (
                    <Issue
                      title="Slow Interaction Response"
                      detail={`Interaction delay ${Math.round(
                        data.interactionDelay
                      )} ms (target ≤ 100 ms).`}
                      suggestion="Move heavy work off main thread or use Web Workers."
                    />
                  )}

                  {data.pendingRequests.total > 5 && (
                    <Issue
                      title="Many Pending Requests"
                      detail={`${data.pendingRequests.total} concurrent fetches (limit ≈ 5).`}
                      suggestion="Batch requests or debounce API calls."
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

/* helper sub‑component */
interface IssueProps {
  title: string;
  detail: string;
  suggestion: string;
}
const Issue: React.FC<IssueProps> = ({ title, detail, suggestion }) => (
  <div className="PerformanceMonitor_issueItem">
    <div className="PerformanceMonitor_issueHeader">
      <span className="PerformanceMonitor_issueIcon">⚠️</span>
      <h4>{title}</h4>
    </div>
    <p>{detail}</p>
    <p className="PerformanceMonitor_suggestion">{suggestion}</p>
  </div>
);

export default PerformanceMonitor;
