"use client";

import { useReportWebVitals } from 'next/web-vitals';
import { sendGAEvent } from '@next/third-parties/google';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // 1. Google Analytics'e ilet (Faz 89)
    if (process.env.NEXT_PUBLIC_GA_ID) {
      sendGAEvent('event', metric.name, {
        category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // 2. Faz 239: Web Vitals sessiz beacon ile analitik sistemine bağlama
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const payload = JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        path: typeof window !== 'undefined' ? window.location.pathname : '',
        timestamp: Date.now(),
      });
      navigator.sendBeacon('/api/analytics/vitals', payload);
    }
  });

  return null;
}
