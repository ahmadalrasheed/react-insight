import { ReactNode } from 'react';

export interface PerformanceData {
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

export interface PerformanceMonitorProps {
  children: ReactNode;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps>;