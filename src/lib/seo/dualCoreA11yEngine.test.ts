import { describe, it, expect } from 'vitest';
import {
  checkColorContrast,
  checkAltTextPresence,
  checkHeadingHierarchy,
  checkFormLabels,
  generateFullA11yReport,
  buildA11yComplianceStatement,
  scoreA11yImpactOnSEO,
} from './dualCoreA11yEngine';

describe('BÖLÜM N — ♿ Erişilebilirlik & WCAG 2.2 Uyum Motoru (dualCoreA11yEngine.test.ts)', () => {
  /* =========================================================================
   * N1 — WCAG 2.2 DENETİM MOTORU (Faz 351-370)
   * ========================================================================= */
  describe('N1: Kontrast, Alt Text & Başlık Denetimleri (Faz 351-370)', () => {
    it('checkColorContrast siyah/beyaz için 21:1 oran hesaplar ve AA/AAA geçer', () => {
      const contrast = checkColorContrast('#000000', '#ffffff');
      expect(contrast.ratio).toBe(21);
      expect(contrast.passesNormalAA).toBe(true);
      expect(contrast.passesAAA).toBe(true);

      const weakContrast = checkColorContrast('#cccccc', '#ffffff');
      expect(weakContrast.passesNormalAA).toBe(false);
    });

    it('checkAltTextPresence eksik alt etiketlerini tespit eder ve dekoratifleri atlar', () => {
      const images = [
        { src: '/images/hero.webp', alt: 'Alo Yönetim Tesis Hizmetleri' },
        { src: '/images/icon.svg', isDecorative: true },
        { src: '/images/bad.jpg' }, // eksik
      ];
      const result = checkAltTextPresence(images);
      expect(result.passed).toBe(false);
      expect(result.issues).toHaveLength(1);
      expect(result.issues[0].ruleId).toBe('image-alt-missing');
    });

    it('checkHeadingHierarchy H1 atlayan hiyerarşik sıralama hatalarını tespit eder', () => {
      const brokenHeadings = ['H1', 'H3', 'H4']; // H2 atlanmış
      const result = checkHeadingHierarchy(brokenHeadings);
      expect(result.passed).toBe(false);
      expect(result.issues.some((i) => i.ruleId === 'heading-order')).toBe(true);

      const validHeadings = ['H1', 'H2', 'H3', 'H2', 'H3'];
      const validResult = checkHeadingHierarchy(validHeadings);
      expect(validResult.passed).toBe(true);
    });

    it('checkFormLabels etiketi veya aria-label olmayan inputları raporlar', () => {
      const form = [
        { tag: 'input', id: 'name', hasLabel: true },
        { tag: 'input', id: 'phone', hasLabel: false }, // eksik
      ];
      const result = checkFormLabels(form);
      expect(result.passed).toBe(false);
      expect(result.issues[0].ruleId).toBe('label-missing');
    });
  });

  /* =========================================================================
   * N2 — RAPORLAMA & RESMÎ BEYAN (Faz 371-385)
   * ========================================================================= */
  describe('N2: Tam Denetim Raporu & SEO Etki Puanı (Faz 371-385)', () => {
    it('generateFullA11yReport tüm denetimler başarılıyken %100 ve AA derecesi üretir', () => {
      const report = generateFullA11yReport({
        pageUrl: 'https://aloyonetim.com.tr/tesis-yonetimi',
        fgHex: '#0f172a',
        bgHex: '#ffffff',
        images: [{ src: '/images/img.webp', alt: 'Tesis Yönetimi Görseli' }],
        headings: ['H1', 'H2', 'H3'],
        formElements: [{ tag: 'input', id: 'email', hasLabel: true }],
      });
      expect(report.overallGrade).toBe('AA');
      expect(report.complianceScore).toBe(100);
      expect(report.issues).toHaveLength(0);
    });

    it('buildA11yComplianceStatement WCAG 2.2 AA standartlarını ve iletişim kanallarını içerir', () => {
      const statement = buildA11yComplianceStatement();
      expect(statement).toContain('WCAG 2.2 AA Düzeyi');
      expect(statement).toContain('0216 550 48 48');
      expect(statement).toContain('info@aloyonetim.com.tr');
    });

    it('scoreA11yImpactOnSEO kritik hatalarda puan kesintisi yapar', () => {
      const report = generateFullA11yReport({
        pageUrl: 'https://aloyonetim.com.tr/hatali-sayfa',
        fgHex: '#cccccc', // zayıf kontrast (kritik)
        bgHex: '#ffffff',
        images: [{ src: '/images/img.webp' }], // eksik alt (kritik)
        headings: ['H2', 'H3'], // H1 yok (kritik)
        formElements: [{ tag: 'input', id: 'test', hasLabel: false }], // etiket yok (kritik)
      });
      const seoScore = scoreA11yImpactOnSEO(report);
      expect(seoScore).toBeLessThan(70);
    });
  });
});
