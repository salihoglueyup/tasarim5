"use client";

import { useEffect } from 'react';

export interface WebVitalsPayload {
  lcp?: number;
  fcp?: number;
  cls?: number;
  ttfb?: number;
  url: string;
  userAgent: string;
  timestamp: number;
}

/**
 * Faz 239: Web Vitals PerformanceObserver & Sessiz Beacon İletimi
 * Tarayıcı arka plana geçtiğinde (visibilitychange: hidden) toplanan Core Web Vitals
 * metriklerini `navigator.sendBeacon` ile analitik uç noktasına sessizce postalar.
 */
export default function WebVitalsBeacon() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
      return;
    }

    const vitals: Partial<WebVitalsPayload> = {
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      cls: 0,
    };

    let lcpObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;
    let fcpObserver: PerformanceObserver | null = null;
    let navObserver: PerformanceObserver | null = null;

    try {
      // 1. LCP İzleyici
      lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          vitals.lcp = Math.round(lastEntry.startTime);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // 2. FCP İzleyici
      fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            vitals.fcp = Math.round(entry.startTime);
          }
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });

      // 3. CLS İzleyici
      clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            vitals.cls = (vitals.cls || 0) + entry.value;
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // 4. TTFB İzleyici
      navObserver = new PerformanceObserver((entryList) => {
        const [nav] = entryList.getEntries() as any[];
        if (nav) {
          vitals.ttfb = Math.round(nav.responseStart);
        }
      });
      navObserver.observe({ type: 'navigation', buffered: true });
    } catch {
      // Bazı tarayıcı tiplerini desteklemeyebilir
    }

    // Sayfadan ayrılırken veya arka plana atıldığında beacon gönder
    const sendMetrics = () => {
      if (navigator.sendBeacon) {
        const payload = JSON.stringify({
          ...vitals,
          cls: Math.round((vitals.cls || 0) * 1000) / 1000,
        });
        navigator.sendBeacon('/api/analytics/vitals', payload);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendMetrics();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', sendMetrics);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', sendMetrics);
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      fcpObserver?.disconnect();
      navObserver?.disconnect();
    };
  }, []);

  return null;
}
