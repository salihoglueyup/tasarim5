/**
 * Çift Çekirdekli Core Web Vitals & Sayfa Hızı Motoru (dualCorePageSpeedEngine.ts)
 * 
 * LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift) ve INP (Interaction to Next Paint)
 * metriklerini optimize eden, kaynak ipuçları (preload/prefetch/preconnect), kritik CSS,
 * görsel optimizasyon şartnameleri ve performans bütçelerini yöneten motor.
 * 
 * 500 Faz Master Planı — Bölüm G (Faz 56 - 105)
 */

import { DomainPillar } from './domainKeywordsTaxonomy';

/* =========================================================================
 * G1 — PERFORMANS İNTERFACE & METRİK SİSTEMİ (Faz 56-65)
 * ========================================================================= */

export interface CoreWebVitalsTarget {
  LCP_ms: number;    // Hedef: < 2500ms (İyi)
  INP_ms: number;    // Hedef: < 200ms (İyi)
  CLS_score: number; // Hedef: < 0.1 (İyi)
  TTFB_ms: number;   // Hedef: < 600ms (İyi)
  FCP_ms: number;    // Hedef: < 1800ms (İyi)
}

export const CWV_BENCHMARK_TARGETS: CoreWebVitalsTarget = {
  LCP_ms: 2500,
  INP_ms: 200,
  CLS_score: 0.1,
  TTFB_ms: 600,
  FCP_ms: 1800,
};

export type PageSpeedGrade = 'PASS' | 'NEEDS_IMPROVEMENT' | 'FAIL';

export interface ResourceHint {
  rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  href: string;
  as?: 'font' | 'image' | 'style' | 'script' | 'fetch';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export interface ImageOptimizationSpec {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  formats: ('avif' | 'webp' | 'png' | 'jpg')[];
  srcset: string;
  sizes: string;
  loading: 'eager' | 'lazy';
  fetchPriority: 'high' | 'low' | 'auto';
  decoding: 'async' | 'sync' | 'auto';
}

export interface FontLoadingStrategy {
  fontFamily: string;
  display: 'swap' | 'optional' | 'fallback';
  preloadUrls: string[];
  subsets: string[];
  fallbackFont: string;
}

export interface CriticalCSSSpec {
  pageType: string;
  inlineCssLength: number;
  criticalRules: string[];
  aboveTheFoldElements: string[];
}

export interface ThirdPartyScriptAudit {
  scriptName: string;
  url: string;
  transferSizeKb: number;
  maxBudgetKb: number;
  executionStrategy: 'defer' | 'async' | 'worker' | 'idle';
  passesBudget: boolean;
}

export interface PageSpeedReport {
  pageUrl: string;
  pageType: string;
  pillar: DomainPillar;
  measured: {
    lcp: number;
    cls: number;
    inp: number;
    ttfb: number;
    fcp: number;
  };
  targets: CoreWebVitalsTarget;
  grade: PageSpeedGrade;
  passedMetricsCount: number;
  recommendations: string[];
}

/**
 * Ölçülen değerlere göre Core Web Vitals derecesini hesaplar.
 */
export function evaluatePageSpeedGrade(
  measured: { lcp: number; cls: number; inp: number; ttfb?: number; fcp?: number },
  targets: CoreWebVitalsTarget = CWV_BENCHMARK_TARGETS
): { grade: PageSpeedGrade; passedCount: number; recommendations: string[] } {
  const recommendations: string[] = [];
  let passedCount = 0;

  if (measured.lcp <= targets.LCP_ms) {
    passedCount++;
  } else {
    recommendations.push(`LCP yüksek (${measured.lcp}ms > ${targets.LCP_ms}ms). Hero görselini preload edin ve fetchpriority="high" kullanın.`);
  }

  if (measured.cls <= targets.CLS_score) {
    passedCount++;
  } else {
    recommendations.push(`CLS yüksek (${measured.cls} > ${targets.CLS_score}). Görsellere ve reklam alanlarına sabit width/height veya aspect-ratio tanımlayın.`);
  }

  if (measured.inp <= targets.INP_ms) {
    passedCount++;
  } else {
    recommendations.push(`INP yüksek (${measured.inp}ms > ${targets.INP_ms}ms). Ağır JS görevlerini Web Worker veya requestIdleCallback ile bölün.`);
  }

  if (measured.ttfb !== undefined) {
    if (measured.ttfb <= targets.TTFB_ms) {
      passedCount++;
    } else {
      recommendations.push(`TTFB yüksek (${measured.ttfb}ms > ${targets.TTFB_ms}ms). Edge caching ve CDN optimizasyonu uygulayın.`);
    }
  }

  const totalEvaluated = measured.ttfb !== undefined ? 4 : 3;
  let grade: PageSpeedGrade = 'FAIL';
  if (passedCount === totalEvaluated) {
    grade = 'PASS';
  } else if (passedCount >= 2) {
    grade = 'NEEDS_IMPROVEMENT';
  }

  return { grade, passedCount, recommendations };
}

/* =========================================================================
 * G2 — KAYNAK YÜKLEME & EDGE OPTİMİZASYON (Faz 66-80)
 * ========================================================================= */

/**
 * Sayfa türü ve pillar'a göre en uygun Resource Hints (<link rel="...">) dizisini üretir.
 */
export function buildResourceHints(pageType: string, pillar: DomainPillar = 'site'): ResourceHint[] {
  const hints: ResourceHint[] = [
    // Google Fonts CDN preconnect
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ];

  // Hero görsel preload
  const heroImage = pillar === 'facility' ? '/images/facility-hero.webp' : '/images/site-hero.webp';
  hints.push({
    rel: 'preload',
    href: heroImage,
    as: 'image',
    type: 'image/webp',
    fetchPriority: 'high',
  });

  // Sayfa tipine özel kritik font preload
  hints.push({
    rel: 'preload',
    href: '/fonts/inter-latin-var.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  });

  if (pageType === 'calculator') {
    hints.push({
      rel: 'prefetch',
      href: '/api/calculator/rates',
      as: 'fetch',
    });
  }

  return hints;
}

/**
 * Görsel için WebP/AVIF srcset ve responsive sizes şartnamesi üretir.
 */
export function buildImageOptimizationSpec(
  imagePath: string,
  pageType: string = 'service',
  isHero: boolean = false
): ImageOptimizationSpec {
  const baseName = imagePath.replace(/\.[^/.]+$/, '');
  const widths = isHero ? [640, 768, 1024, 1280, 1920] : [320, 480, 640, 800];
  const srcset = widths.map((w) => `${baseName}-${w}.webp ${w}w`).join(', ');

  const sizes = isHero
    ? '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
    : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return {
    src: `${baseName}.webp`,
    alt: isHero ? 'Alo Yönetim Profesyonel Tesis ve Site Yönetimi' : 'Alo Yönetim Hizmet Görseli',
    width: isHero ? 1200 : 800,
    height: isHero ? 630 : 500,
    aspectRatio: isHero ? '1200 / 630' : '800 / 500',
    formats: ['avif', 'webp', 'jpg'],
    srcset,
    sizes,
    loading: isHero ? 'eager' : 'lazy',
    fetchPriority: isHero ? 'high' : 'auto',
    decoding: 'async',
  };
}

/**
 * İlk görünüm (Above-the-fold) için kritik CSS şartnamesi üretir.
 */
export function generateCriticalCSS(pageSlug: string): CriticalCSSSpec {
  const commonRules = [
    ':root { --color-primary: #0284c7; --color-navy: #0f172a; --font-sans: Inter, sans-serif; }',
    'body { margin: 0; font-family: var(--font-sans); color: #334155; line-height: 1.5; }',
    '.hero-section { min-height: 520px; display: flex; align-items: center; background: #0f172a; color: #fff; }',
    '.hero-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.15; margin-bottom: 1rem; }',
    '.hero-cta-btn { display: inline-flex; align-items: center; padding: 0.875rem 1.75rem; border-radius: 0.5rem; background: #0284c7; color: #fff; text-decoration: none; font-weight: 600; }',
    '.container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1rem; }',
  ];

  return {
    pageType: pageSlug,
    inlineCssLength: commonRules.join('').length,
    criticalRules: commonRules,
    aboveTheFoldElements: ['header', '.hero-section', '.hero-title', '.hero-cta-btn', '.nav-bar'],
  };
}

/**
 * Üçüncü taraf script transfer boyutlarını ve bloklama bütçelerini denetler.
 */
export function auditThirdPartyScripts(scripts: { name: string; url: string; sizeKb: number }[]): ThirdPartyScriptAudit[] {
  const SCRIPT_BUDGET_KB = 150; // Toplam üçüncü taraf bütçesi

  return scripts.map((s) => ({
    scriptName: s.name,
    url: s.url,
    transferSizeKb: s.sizeKb,
    maxBudgetKb: SCRIPT_BUDGET_KB,
    executionStrategy: s.name.includes('analytics') ? 'idle' : 'defer',
    passesBudget: s.sizeKb <= SCRIPT_BUDGET_KB,
  }));
}

/**
 * Akıllı prefetch kuyruğu üretir.
 */
export function buildPrefetchQueue(pillar: DomainPillar, currentPage: string): string[] {
  if (currentPage === '/') {
    return pillar === 'facility'
      ? ['/tesis-yonetimi', '/hizmetler/teknik-bakim-yonetimi', '/teklif-al']
      : ['/hizmetler/aidat-takibi', '/istanbul/kadikoy', '/hesaplayici', '/teklif-al'];
  }

  if (currentPage.startsWith('/istanbul/')) {
    return ['/teklif-al', '/hizmetler/aidat-takibi', '/hizmetler/guvenlik-yonetimi'];
  }

  return ['/teklif-al', '/iletisim'];
}

/* =========================================================================
 * G3 — CLS & LAYOUT STABİLİTE MOTORU (Faz 81-92)
 * ========================================================================= */

export interface LayoutStabilitySpec {
  pageType: string;
  clsBudget: number;
  skeletonRequirements: { component: string; minHeightPx: number; skeletonClass: string }[];
  fontLoadingRules: FontLoadingStrategy;
  imageAspectRatioMandatory: boolean;
}

/**
 * Sayfa tipine göre CLS sıfırlama şartnamesi üretir.
 */
export function buildLayoutStabilitySpec(pageType: string): LayoutStabilitySpec {
  return {
    pageType,
    clsBudget: 0.05, // Hedef: < 0.05 (Google standardı < 0.1'den daha sıkı)
    skeletonRequirements: [
      { component: 'HeroBanner', minHeightPx: 520, skeletonClass: 'skeleton-hero' },
      { component: 'ServiceCardsGrid', minHeightPx: 450, skeletonClass: 'skeleton-grid' },
      { component: 'ReviewsCarousel', minHeightPx: 320, skeletonClass: 'skeleton-carousel' },
      { component: 'CalculatorForm', minHeightPx: 400, skeletonClass: 'skeleton-form' },
    ],
    fontLoadingRules: {
      fontFamily: 'Inter',
      display: 'swap',
      preloadUrls: ['/fonts/inter-latin-var.woff2'],
      subsets: ['latin', 'latin-ext'],
      fallbackFont: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    imageAspectRatioMandatory: true,
  };
}

/**
 * Görsellerin width/height ve aspect-ratio varlığını denetler.
 */
export function auditImageAspectRatios(
  images: { src: string; width?: number; height?: number; hasAspectRatioStyle?: boolean }[]
): { compliantImages: number; nonCompliantImages: string[]; isPass: boolean } {
  const nonCompliant: string[] = [];

  images.forEach((img) => {
    const hasDimensions = Boolean(img.width && img.height);
    const hasStyle = Boolean(img.hasAspectRatioStyle);
    if (!hasDimensions && !hasStyle) {
      nonCompliant.push(img.src);
    }
  });

  return {
    compliantImages: images.length - nonCompliant.length,
    nonCompliantImages: nonCompliant,
    isPass: nonCompliant.length === 0,
  };
}

/**
 * Sayfa türüne göre CLS bütçesini döner.
 */
export function getLayoutShiftBudget(pageType: string): number {
  switch (pageType) {
    case 'home':
    case 'service':
      return 0.05;
    case 'district':
    case 'calculator':
      return 0.08;
    default:
      return 0.09;
  }
}

/* =========================================================================
 * G4 — INP & İNTERAKTİVİTE MOTORU (Faz 91-105)
 * ========================================================================= */

export interface INPOptimizationSpec {
  componentName: string;
  inpTargetMs: number;
  debounceMs: number;
  useWebWorker: boolean;
  useDeferredHydration: boolean;
  passiveEventListeners: boolean;
  gpuAcceleratedAnimations: boolean;
}

/**
 * Bileşene özel INP optimizasyon şartnamesi üretir.
 */
export function buildINPOptimizationSpec(componentName: string): INPOptimizationSpec {
  const isSearchOrFilter = componentName.includes('Search') || componentName.includes('Filter');
  const isCalculator = componentName.includes('Calculator') || componentName.includes('Hesaplayici');

  return {
    componentName,
    inpTargetMs: 150, // Google 200ms standardından daha sıkı
    debounceMs: isSearchOrFilter ? 300 : isCalculator ? 150 : 0,
    useWebWorker: isCalculator,
    useDeferredHydration: !componentName.includes('Hero'),
    passiveEventListeners: true,
    gpuAcceleratedAnimations: true,
  };
}

/**
 * Arama kutusu veya filtre için debounce şartnamesi döner.
 */
export function buildInputDebounceSpec(inputType: 'search' | 'filter' | 'calculator' | 'form'): {
  delayMs: number;
  maxWaitMs: number;
  leading: boolean;
  trailing: boolean;
} {
  switch (inputType) {
    case 'search':
      return { delayMs: 300, maxWaitMs: 1000, leading: false, trailing: true };
    case 'filter':
      return { delayMs: 200, maxWaitMs: 600, leading: false, trailing: true };
    case 'calculator':
      return { delayMs: 150, maxWaitMs: 500, leading: false, trailing: true };
    case 'form':
      return { delayMs: 400, maxWaitMs: 1200, leading: false, trailing: true };
  }
}

/**
 * Sayfa türüne göre INP bütçesini döner (ms).
 */
export function getINPBudget(pageType: string): number {
  switch (pageType) {
    case 'service':
    case 'home':
      return 150;
    case 'calculator':
    case 'search':
      return 200;
    default:
      return 200;
  }
}

/**
 * CI/CD Pipeline için komple Performans Bütçesi Konfigürasyonunu üretir.
 */
export function buildPerformanceBudgetConfig() {
  return {
    budgets: [
      {
        resourceType: 'script',
        budgetKb: 250,
      },
      {
        resourceType: 'total',
        budgetKb: 750,
      },
      {
        resourceType: 'image',
        budgetKb: 400,
      },
      {
        resourceType: 'font',
        budgetKb: 100,
      },
      {
        resourceType: 'document',
        budgetKb: 50,
      },
      {
        resourceType: 'third-party',
        budgetKb: 150,
      },
    ],
    vitalsThresholds: {
      LCP: 2500,
      CLS: 0.1,
      INP: 200,
      TTFB: 600,
      FCP: 1800,
    },
    assertRules: {
      'performance-score': 95,
      'seo-score': 100,
      'accessibility-score': 100,
      'best-practices-score': 100,
    },
  };
}
