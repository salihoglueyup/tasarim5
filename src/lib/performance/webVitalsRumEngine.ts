/**
 * Faz 242: Real User Monitoring (RUM) Web Vitals Motoru
 * Gerçek kullanıcılardan gelen LCP, CLS, INP, FCP, TTFB metriklerini toplar,
 * Google 75. persentil (p75) standardına göre değerlendirir ve raporlar.
 */

export type VitalMetricName = 'LCP' | 'CLS' | 'INP' | 'FCP' | 'TTFB' | 'FID';
export type VitalRating = 'good' | 'needs-improvement' | 'poor';

export interface RumMetricInput {
  name: VitalMetricName;
  value: number;
  rating?: VitalRating;
  url?: string;
  id?: string;
  delta?: number;
  navigationType?: string;
}

export interface StoredRumMetric {
  id: string;
  name: VitalMetricName;
  value: number;
  rating: VitalRating;
  url: string;
  timestamp: number;
}

export interface MetricSummary {
  name: VitalMetricName;
  sampleCount: number;
  p75Value: number;
  rating: VitalRating;
  goodPercentage: number;
}

export interface WebVitalsRumSummary {
  timestamp: string;
  totalSamples: number;
  overallStatus: 'PASS' | 'NEEDS_IMPROVEMENT' | 'FAIL';
  metrics: Record<VitalMetricName, MetricSummary>;
}

// Google Core Web Vitals resmi 'good' eşikleri
export const CWV_GOOD_THRESHOLDS: Record<VitalMetricName, number> = {
  LCP: 2500, // 2.5s
  CLS: 0.1,  // 0.1
  INP: 200,  // 200ms
  FCP: 1800, // 1.8s
  TTFB: 800, // 800ms
  FID: 100,  // 100ms
};

export const CWV_POOR_THRESHOLDS: Record<VitalMetricName, number> = {
  LCP: 4000,
  CLS: 0.25,
  INP: 500,
  FCP: 3000,
  TTFB: 1800,
  FID: 300,
};

// Maksimum bellek korumalı ring-buffer (500 kayıt)
const MAX_BUFFER_SIZE = 500;
const rumBuffer: StoredRumMetric[] = [];

/**
 * Sayısal değere göre otomatik derecelendirme yapar.
 */
export function calculateVitalRating(name: VitalMetricName, value: number): VitalRating {
  const goodThreshold = CWV_GOOD_THRESHOLDS[name] ?? 2000;
  const poorThreshold = CWV_POOR_THRESHOLDS[name] ?? 4000;

  if (value <= goodThreshold) return 'good';
  if (value <= poorThreshold) return 'needs-improvement';
  return 'poor';
}

/**
 * Persentil (ör. 75. persentil) hesaplar.
 */
export function calculatePercentile(values: number[], percentile = 75): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  const clampedIndex = Math.max(0, Math.min(sorted.length - 1, index));
  return Math.round(sorted[clampedIndex] * 100) / 100;
}

/**
 * Gelen RUM metriğini depolar (Bellek sızıntısı yapmaz).
 */
export function recordRumMetric(input: RumMetricInput): StoredRumMetric {
  const rating = input.rating || calculateVitalRating(input.name, input.value);
  const metric: StoredRumMetric = {
    id: input.id || `rum_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: input.name,
    value: input.value,
    rating,
    url: input.url || '/',
    timestamp: Date.now(),
  };

  if (rumBuffer.length >= MAX_BUFFER_SIZE) {
    rumBuffer.shift(); // En eski kaydı at
  }
  rumBuffer.push(metric);

  return metric;
}

/**
 * RUM metriklerinin p75 Core Web Vitals analiz özetini çıkarır.
 */
export function getWebVitalsRumSummary(): WebVitalsRumSummary {
  const metricNames: VitalMetricName[] = ['LCP', 'CLS', 'INP', 'FCP', 'TTFB', 'FID'];
  const metricsResult: Partial<Record<VitalMetricName, MetricSummary>> = {};

  let allCorePass = true;

  for (const name of metricNames) {
    const items = rumBuffer.filter((m) => m.name === name);
    const count = items.length;
    const values = items.map((m) => m.value);
    const p75 = calculatePercentile(values, 75);
    const rating = count > 0 ? calculateVitalRating(name, p75) : 'good';
    const goodCount = items.filter((m) => m.rating === 'good').length;
    const goodPercentage = count > 0 ? Math.round((goodCount / count) * 100) : 100;

    if (['LCP', 'CLS', 'INP'].includes(name) && rating !== 'good') {
      allCorePass = false;
    }

    metricsResult[name] = {
      name,
      sampleCount: count,
      p75Value: p75,
      rating,
      goodPercentage,
    };
  }

  return {
    timestamp: new Date().toISOString(),
    totalSamples: rumBuffer.length,
    overallStatus: allCorePass ? 'PASS' : 'NEEDS_IMPROVEMENT',
    metrics: metricsResult as Record<VitalMetricName, MetricSummary>,
  };
}

/**
 * Test izolasyonu için tamponu temizler.
 */
export function clearRumBuffer(): void {
  rumBuffer.length = 0;
}
