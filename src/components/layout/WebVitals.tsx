"use client";

import { useReportWebVitals } from 'next/web-vitals';
import { sendGAEvent } from '@next/third-parties/google';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Core Web Vitals metriklerini Google Analytics'e gönder (Faz 89)
    sendGAEvent('event', metric.name, {
      category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  });

  return null;
}
