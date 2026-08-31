import { describe, it, expect } from 'vitest';
import {
  CWV_BENCHMARK_TARGETS,
  evaluatePageSpeedGrade,
  buildResourceHints,
  buildImageOptimizationSpec,
  generateCriticalCSS,
  auditThirdPartyScripts,
  buildPrefetchQueue,
  buildLayoutStabilitySpec,
  auditImageAspectRatios,
  getLayoutShiftBudget,
  buildINPOptimizationSpec,
  buildInputDebounceSpec,
  getINPBudget,
  buildPerformanceBudgetConfig,
} from './dualCorePageSpeedEngine';

describe('BÖLÜM G — ⚡ Core Web Vitals & Sayfa Hızı Motoru (dualCorePageSpeedEngine.test.ts)', () => {
  /* =========================================================================
   * G1 — PERFORMANS İNTERFACE & METRİK SİSTEMİ (Faz 56-65)
   * ========================================================================= */
  describe('G1: Core Web Vitals Hedefleri & Değerlendirme (Faz 56-65)', () => {
    it('CWV_BENCHMARK_TARGETS Google resmi iyi eşiklerini tanımlar', () => {
      expect(CWV_BENCHMARK_TARGETS.LCP_ms).toBeLessThanOrEqual(2500);
      expect(CWV_BENCHMARK_TARGETS.INP_ms).toBeLessThanOrEqual(200);
      expect(CWV_BENCHMARK_TARGETS.CLS_score).toBeLessThanOrEqual(0.1);
      expect(CWV_BENCHMARK_TARGETS.TTFB_ms).toBeLessThanOrEqual(600);
      expect(CWV_BENCHMARK_TARGETS.FCP_ms).toBeLessThanOrEqual(1800);
    });

    it('evaluatePageSpeedGrade tüm metrikler başarılı olduğunda PASS derecesi üretir', () => {
      const result = evaluatePageSpeedGrade({
        lcp: 1800,
        cls: 0.02,
        inp: 95,
        ttfb: 250,
        fcp: 900,
      });
      expect(result.grade).toBe('PASS');
      expect(result.passedCount).toBe(4);
      expect(result.recommendations).toHaveLength(0);
    });

    it('evaluatePageSpeedGrade başarısız metrikler için hedefe yönelik öneri üretir', () => {
      const result = evaluatePageSpeedGrade({
        lcp: 3400, // yüksek
        cls: 0.25, // yüksek
        inp: 320,  // yüksek
        ttfb: 850, // yüksek
      });
      expect(result.grade).toBe('FAIL');
      expect(result.recommendations.length).toBeGreaterThanOrEqual(3);
      expect(result.recommendations.some((r) => r.includes('LCP'))).toBe(true);
      expect(result.recommendations.some((r) => r.includes('CLS'))).toBe(true);
    });
  });

  /* =========================================================================
   * G2 — KAYNAK YÜKLEME & EDGE OPTİMİZASYON (Faz 66-80)
   * ========================================================================= */
  describe('G2: Kaynak İpuçları & Görsel Optimizasyonu (Faz 66-80)', () => {
    it('buildResourceHints en az 2 preconnect ve 1 high priority preload direktifi içerir', () => {
      const hints = buildResourceHints('service', 'facility');
      expect(hints.length).toBeGreaterThanOrEqual(3);

      const preconnects = hints.filter((h) => h.rel === 'preconnect');
      expect(preconnects.length).toBeGreaterThanOrEqual(2);

      const heroPreload = hints.find((h) => h.rel === 'preload' && h.as === 'image');
      expect(heroPreload).toBeDefined();
      expect(heroPreload?.fetchPriority).toBe('high');
      expect(heroPreload?.href).toContain('facility-hero.webp');
    });

    it('buildImageOptimizationSpec hero görseller için eager yükleme ve srcset üretir', () => {
      const heroSpec = buildImageOptimizationSpec('/images/site-hero.jpg', 'home', true);
      expect(heroSpec.loading).toBe('eager');
      expect(heroSpec.fetchPriority).toBe('high');
      expect(heroSpec.srcset).toContain('1920w');
      expect(heroSpec.formats).toContain('avif');
      expect(heroSpec.formats).toContain('webp');

      const cardSpec = buildImageOptimizationSpec('/images/service-card.jpg', 'service', false);
      expect(cardSpec.loading).toBe('lazy');
      expect(cardSpec.fetchPriority).toBe('auto');
    });

    it('generateCriticalCSS above-the-fold stillerini içerir', () => {
      const critical = generateCriticalCSS('tesis-yonetimi');
      expect(critical.inlineCssLength).toBeGreaterThan(100);
      expect(critical.aboveTheFoldElements).toContain('.hero-section');
      expect(critical.criticalRules.some((r) => r.includes('--color-primary'))).toBe(true);
    });

    it('auditThirdPartyScripts 150KB bütçesini aşan scriptleri denetler', () => {
      const scripts = [
        { name: 'google-analytics', url: 'https://googletagmanager.com/gtag.js', sizeKb: 45 },
        { name: 'heavy-chat-widget', url: 'https://widget.example.com/chat.js', sizeKb: 210 },
      ];
      const audit = auditThirdPartyScripts(scripts);
      expect(audit[0].passesBudget).toBe(true);
      expect(audit[1].passesBudget).toBe(false);
    });

    it('buildPrefetchQueue pillar ve mevcut sayfaya göre mantıklı sonraki sayfaları döner', () => {
      const siteQueue = buildPrefetchQueue('site', '/');
      expect(siteQueue).toContain('/hizmetler/aidat-takibi');
      expect(siteQueue).toContain('/teklif-al');

      const districtQueue = buildPrefetchQueue('site', '/istanbul/kadikoy');
      expect(districtQueue).toContain('/teklif-al');
    });
  });

  /* =========================================================================
   * G3 — CLS & LAYOUT STABİLİTE MOTORU (Faz 81-92)
   * ========================================================================= */
  describe('G3: CLS & Düzen Kayması Önleme (Faz 81-92)', () => {
    it('buildLayoutStabilitySpec sıkı 0.05 CLS bütçesi ve skeleton tanımları içerir', () => {
      const spec = buildLayoutStabilitySpec('service');
      expect(spec.clsBudget).toBeLessThanOrEqual(0.05);
      expect(spec.skeletonRequirements.length).toBeGreaterThanOrEqual(3);
      expect(spec.fontLoadingRules.display).toBe('swap');
    });

    it('auditImageAspectRatios eksik boyutlu görselleri tespit eder', () => {
      const images = [
        { src: '/images/img1.webp', width: 800, height: 600 },
        { src: '/images/img2.webp', width: 400, height: 300 },
        { src: '/images/bad-img.webp' }, // eksik
      ];
      const audit = auditImageAspectRatios(images);
      expect(audit.isPass).toBe(false);
      expect(audit.nonCompliantImages).toContain('/images/bad-img.webp');
      expect(audit.compliantImages).toBe(2);
    });

    it('getLayoutShiftBudget sayfa tipine göre 0.1 altında bütçe döner', () => {
      expect(getLayoutShiftBudget('home')).toBeLessThanOrEqual(0.08);
      expect(getLayoutShiftBudget('service')).toBeLessThanOrEqual(0.08);
      expect(getLayoutShiftBudget('calculator')).toBeLessThanOrEqual(0.1);
    });
  });

  /* =========================================================================
   * G4 — INP & İNTERAKTİVİTE MOTORU (Faz 91-105)
   * ========================================================================= */
  describe('G4: INP & Etkileşim Gecikmesi Optimizasyonu (Faz 91-105)', () => {
    it('buildINPOptimizationSpec hesaplayıcı bileşenler için Web Worker önerir', () => {
      const calcSpec = buildINPOptimizationSpec('AidatHesaplayiciForm');
      expect(calcSpec.useWebWorker).toBe(true);
      expect(calcSpec.debounceMs).toBe(150);

      const searchSpec = buildINPOptimizationSpec('DistrictSearchInput');
      expect(searchSpec.debounceMs).toBe(300);
    });

    it('buildInputDebounceSpec arama sorguları için 300ms gecikme döner', () => {
      const searchDebounce = buildInputDebounceSpec('search');
      expect(searchDebounce.delayMs).toBe(300);
      expect(searchDebounce.trailing).toBe(true);

      const filterDebounce = buildInputDebounceSpec('filter');
      expect(filterDebounce.delayMs).toBe(200);
    });

    it('getINPBudget tüm sayfalar için 200ms veya altında bütçe belirler', () => {
      expect(getINPBudget('service')).toBeLessThanOrEqual(200);
      expect(getINPBudget('home')).toBeLessThanOrEqual(200);
      expect(getINPBudget('calculator')).toBeLessThanOrEqual(200);
    });

    it('buildPerformanceBudgetConfig tüm kaynak ve vitals bütçelerini eksiksiz içerir', () => {
      const config = buildPerformanceBudgetConfig();
      expect(config.budgets.length).toBeGreaterThanOrEqual(5);
      expect(config.vitalsThresholds.LCP).toBe(2500);
      expect(config.vitalsThresholds.CLS).toBe(0.1);
      expect(config.vitalsThresholds.INP).toBe(200);
      expect(config.assertRules['performance-score']).toBeGreaterThanOrEqual(90);
    });
  });
});
