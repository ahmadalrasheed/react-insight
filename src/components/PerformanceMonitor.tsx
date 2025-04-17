import React, { useState, useEffect, useRef } from 'react';
import styles from './PerformanceMonitor.module.css';

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
    total: number;
    elements: Element[];
  };
  memoryUsage: {
    usedMB: number;
    totalMB: number;
    limitMB: number;
  } | null;
  activeTimers: number;
  eventListeners: {
    totalListeners: number;
  };
  interactionDelay: number;
  pendingRequests: {
    total: number;
    requests: PerformanceEntry[];
  };
}


// Performance monitoring utility functions
const checkImagesAlt = () => {
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img?.hasAttribute('alt'));
  
  return {
    total: images?.length || 0,
    withoutAlt: imagesWithoutAlt?.length || 0,
    elements: imagesWithoutAlt || []
  };
};

const checkLayoutShift = () => {
  const elements = document.querySelectorAll('*');
  let potentialLayoutShifts: Element[] = [];
  
  if (elements) {
    Array.from(elements).forEach(el => {
      const style = window?.getComputedStyle(el);
      if (style?.position === 'absolute' || style?.position === 'fixed') {
        potentialLayoutShifts.push(el);
      }
    });
  }
  
  return {
    total: potentialLayoutShifts?.length || 0,
    elements: potentialLayoutShifts || []
  };
};

const checkDOMSize = () => {
  const bodyElements = document?.body?.getElementsByTagName('*')?.length || 0;
  const headElements = document?.head?.getElementsByTagName('*')?.length || 0;
  const totalElements = bodyElements + headElements;
  const depth = getMaxDepth(document?.body);
  
  console.log(`DOM Size: ${totalElements} elements (${bodyElements} in body, ${headElements} in head)`);
  
  return {
    totalElements,
    depth,
    bodyElements,
    headElements
  };
};

const getMaxDepth = (node: Element | null, depth = 0): number => {
  if (!node?.children || node?.children?.length === 0) return depth;
  
  return Math.max(...Array.from(node?.children || []).map(child => getMaxDepth(child, depth + 1)));
};

const checkMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = performance.memory as {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
    return {
      usedMB: +((memory.usedJSHeapSize || 0) / 1024 / 1024).toFixed(2),
      totalMB: +((memory.totalJSHeapSize || 0) / 1024 / 1024).toFixed(2),
      limitMB: +((memory.jsHeapSizeLimit || 0) / 1024 / 1024).toFixed(2),
    };
  }
  return null;
};

const checkActiveTimers = () => {
  const allTimers = Object.getOwnPropertyNames(window || {})
    .filter(prop => prop?.startsWith('setInterval') || prop?.startsWith('setTimeout'));
  return allTimers?.length || 0;
};

let eventListenerCount = 0;
const originalAddEventListener = EventTarget?.prototype?.addEventListener;
if (originalAddEventListener) {
  EventTarget.prototype.addEventListener = function(...args) {
    eventListenerCount++;
    return originalAddEventListener.apply(this, args);
  };
}

const checkEventListeners = () => ({
  totalListeners: eventListenerCount || 0
});

const measureInteractionDelay = () => {
  const start = performance?.now() || 0;
  return new Promise<number>(resolve => {
    requestAnimationFrame(() => {
      const delay = (performance?.now() || 0) - start;
      resolve(delay);
    });
  });
};

const checkPendingNetworkRequests = () => {
  const pendingFetches = window?.performance?.getEntriesByType('resource')
    ?.filter(entry => {
      const resourceEntry = entry as PerformanceResourceTiming;
      return resourceEntry.duration > 0 && resourceEntry.responseEnd === 0;
    }) || [];
  
  return {
    total: pendingFetches?.length || 0,
    requests: pendingFetches || []
  };
};

const checkPerformance = async (): Promise<PerformanceData> => {
  const domSize = checkDOMSize();
  const imagesAlt = checkImagesAlt();
  const layoutShift = checkLayoutShift();
  const memoryUsage = checkMemoryUsage();
  const activeTimers = checkActiveTimers();
  const eventListeners = checkEventListeners();
  const pendingRequests = checkPendingNetworkRequests();
  const interactionDelay = await measureInteractionDelay();
  
  let maxScore = 100;
  
  if (domSize?.totalElements > 3000) {
    maxScore = 50;
  } else if (domSize?.totalElements > 2000) {
    maxScore = 65;
  } else if (domSize?.totalElements > 1000) {
    maxScore = 75;
  }
  
  let score = maxScore;
  
  if (domSize && domSize.depth > 10) {
    score = Math.max(0, score - Math.min(10, (domSize.depth - 10)));
  }
  
  if (imagesAlt && imagesAlt.withoutAlt > 0) {
    score = Math.max(0, score - Math.min(15, imagesAlt.withoutAlt * 2));
  }
  
  if (layoutShift && layoutShift.total > 0) {
    score = Math.max(0, score - Math.min(10, layoutShift.total));
  }
  
  if (memoryUsage && memoryUsage.usedMB > 100) {
    score = Math.max(0, score - Math.min(15, (memoryUsage.usedMB - 100) / 10));
  }
  
  if (activeTimers > 10) {
    score = Math.max(0, score - Math.min(10, (activeTimers - 10)));
  }
  
  if (eventListeners?.totalListeners > 500) {
    score = Math.max(0, score - Math.min(15, (eventListeners.totalListeners - 500) / 50));
  }
  
  if (interactionDelay > 100) {
    score = Math.max(0, score - Math.min(20, (interactionDelay - 100) / 10));
  }
  
  if (pendingRequests?.total > 5) {
    score = Math.max(0, score - Math.min(10, (pendingRequests.total - 5)));
  }
  
  score = Math.max(0, score);
  
  console.log(`DOM size: ${domSize?.totalElements || 0}, max score: ${maxScore}, final score: ${score}`);
  console.log(`Memory usage: ${memoryUsage ? memoryUsage?.usedMB + 'MB' : 'N/A'}`);
  console.log(`Active timers: ${activeTimers || 0}`);
  console.log(`Event listeners: ${eventListeners?.totalListeners || 0}`);
  console.log(`Interaction delay: ${interactionDelay || 0}ms`);
  console.log(`Pending requests: ${pendingRequests?.total || 0}`);
  
  return {
    score,
    domSize,
    imagesAlt,
    layoutShift,
    memoryUsage,
    activeTimers,
    eventListeners,
    interactionDelay,
    pendingRequests
  };
};

const getScoreColor = (score: number): string => {
  if (score >= 90) return '#4CAF50';
  if (score >= 70) return '#FFC107';
  if (score >= 50) return '#FF9800';
  return '#F44336';
};

export const PerformanceMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [performanceData, setPerformanceData] = useState(null as PerformanceData | null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const popoverRef = useRef(null as HTMLDivElement | null);
  
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const data = await checkPerformance();
      console.log("Performance data:", data);
      
      setPerformanceData(data);
      setIsOpen(true);
    } catch (error) {
      console.error("Error analyzing performance:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef?.current && !popoverRef?.current?.contains(event?.target as Node)) {
        setIsOpen(false);
      }
    };
    
    const doc = document;
    if (doc) {
      doc.addEventListener('mousedown', handleClickOutside);
      return () => {
        doc.removeEventListener('mousedown', handleClickOutside);
      };
    }
    return undefined;
  }, []);
  
  return (
    <>
      {children}
      <div className={styles?.container}>
        <button 
          className={styles?.analyzeButton}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          aria-label="Analyze Performance"
        >
          <span className={styles?.buttonIcon}>{isAnalyzing ? '⏳' : '🔍'}</span>
          <span className={styles?.buttonText}>{isAnalyzing ? 'Analyzing...' : 'Analyze Performance'}</span>
        </button>
        
        {isOpen && performanceData && (
          <div className={styles?.popover} ref={popoverRef}>
            <div className={styles?.popoverHeader}>
              <h2 className={styles?.popoverTitle}>Performance Analysis</h2>
              <button 
                className={styles?.closeButton}
                onClick={handleClose}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            
            <div className={styles?.scoreContainer}>
              <div className={styles?.scoreCircle} style={{
                background: `conic-gradient(
                  ${getScoreColor(performanceData?.score || 0)} ${performanceData?.score || 0}%,
                  #f0f0f0 ${performanceData?.score || 0}% 100%
                )`
              }}>
                <div className={styles?.scoreInner}>
                  <span className={styles?.scoreValue}>{Math.round(performanceData?.score || 0)}</span>
                  <span className={styles?.scoreLabel}>Score</span>
                </div>
              </div>
            </div>
            
            <div className={styles?.resultsContainer}>
              {performanceData?.score >= 90 ? (
                <div className={styles?.goodResult}>
                  <h3>Great job! Your application is performing well.</h3>
                  <p>Keep up the good work and continue to monitor performance as your application grows.</p>
                </div>
              ) : (
                <>
                  <h3 className={styles?.resultsTitle}>Areas for Improvement:</h3>
                  
                  {performanceData?.domSize?.totalElements > 1000 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>Large DOM Size</h4>
                      </div>
                      <p>Your DOM contains {performanceData?.domSize?.totalElements || 0} elements, which is above the recommended limit of 1000.</p>
                      <p className={styles?.suggestion}>Consider reducing the number of DOM elements by simplifying your component structure.</p>
                    </div>
                  )}
                  
                  {performanceData?.domSize?.depth > 10 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>Deep DOM Structure</h4>
                      </div>
                      <p>Your DOM has a depth of {performanceData?.domSize?.depth || 0} levels, which is above the recommended limit of 10.</p>
                      <p className={styles?.suggestion}>Consider flattening your component hierarchy to improve rendering performance.</p>
                    </div>
                  )}
                  
                  {performanceData?.imagesAlt?.withoutAlt > 0 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>Images Without Alt Text</h4>
                      </div>
                      <p>Found {performanceData?.imagesAlt?.withoutAlt || 0} images without alt attributes.</p>
                      <p className={styles?.suggestion}>Add descriptive alt text to all images for accessibility and SEO benefits.</p>
                    </div>
                  )}
                  
                  {performanceData?.layoutShift?.total > 0 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>Potential Layout Shifts</h4>
                      </div>
                      <p>Detected {performanceData?.layoutShift?.total || 0} elements that might cause layout shifts.</p>
                      <p className={styles?.suggestion}>Ensure elements have defined dimensions and avoid inserting content above existing content.</p>
                    </div>
                  )}
                  
                  {performanceData?.memoryUsage && performanceData?.memoryUsage?.usedMB > 100 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>High Memory Usage</h4>
                      </div>
                      <p>Your application is using {performanceData?.memoryUsage?.usedMB || 0}MB of memory, which is above the recommended limit of 100MB.</p>
                      <p className={styles?.suggestion}>Optimize memory usage by reducing object allocations, implementing proper cleanup, and avoiding memory leaks.</p>
                    </div>
                  )}
                  
                  {performanceData?.activeTimers > 10 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>Too Many Active Timers</h4>
                      </div>
                      <p>Your application has {performanceData?.activeTimers || 0} active timers, which is above the recommended limit of 10.</p>
                      <p className={styles?.suggestion}>Ensure all setInterval and setTimeout calls are properly cleared when components unmount.</p>
                    </div>
                  )}
                  
                  {performanceData?.eventListeners?.totalListeners > 500 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>Too Many Event Listeners</h4>
                      </div>
                      <p>Your application has {performanceData?.eventListeners?.totalListeners || 0} event listeners, which is above the recommended limit of 500.</p>
                      <p className={styles?.suggestion}>Ensure all event listeners are properly removed when components unmount to prevent memory leaks.</p>
                    </div>
                  )}
                  
                  {performanceData?.interactionDelay > 100 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>Slow Interaction Response</h4>
                      </div>
                      <p>Your application has an interaction delay of {Math.round(performanceData?.interactionDelay || 0)}ms, which is above the recommended limit of 100ms.</p>
                      <p className={styles?.suggestion}>Optimize JavaScript execution, reduce main thread work, and consider using web workers for heavy computations.</p>
                    </div>
                  )}
                  
                  {performanceData?.pendingRequests?.total > 5 && (
                    <div className={styles?.issueItem}>
                      <div className={styles?.issueHeader}>
                        <span className={styles?.issueIcon}>⚠️</span>
                        <h4>Too Many Pending Network Requests</h4>
                      </div>
                      <p>Your application has {performanceData?.pendingRequests?.total || 0} pending network requests, which is above the recommended limit of 5.</p>
                      <p className={styles?.suggestion}>Implement proper request cancellation, use request batching, and consider using a request queue to limit concurrent requests.</p>
                    </div>
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

export default PerformanceMonitor; 