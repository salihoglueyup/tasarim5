import { describe, it, expect } from 'vitest';
import {
  buildHreflangTags,
  buildCanonicalForLocale,
  buildLocalizedKeywordMap,
  buildLocalizedSerpMeta,
  buildLocalizedSitemapEntry,
  detectUserLocale,
  validateHreflangConsistency,
  SUPPORTED_LOCALES,
} from './dualCoreMultiLangEngine';
import { BASE_URL } from '@/lib/seo';

describe('BÖLÜM O — 🌍 Çok Dilli SEO & hreflang Motoru (dualCoreMultiLangEngine.test.ts)', () => {
  /* =========================================================================
   * O1 — HREFLANG & LOKALİZASYON (Faz 386-405)
   * ========================================================================= */
  describe('O1: hreflang, Canonical & Lokalize Meta Testleri (Faz 386-405)', () => {
    it('buildHreflangTags TR, EN, AR, RU ve x-default etiketlerini eksiksiz üretir', () => {
      const tags = buildHreflangTags('/tesis-yonetimi');
      expect(tags).toHaveLength(5); // 4 dil + 1 x-default

      const langs = tags.map((t) => t.lang);
      expect(langs).toContain('tr');
      expect(langs).toContain('en');
      expect(langs).toContain('ar');
      expect(langs).toContain('ru');
      expect(langs).toContain('x-default');

      const xDefault = tags.find((t) => t.lang === 'x-default');
      expect(xDefault?.url).toBe(`${BASE_URL}/tesis-yonetimi`);
    });

    it('buildCanonicalForLocale dile göre doğru canonical URL üretir', () => {
      const canonicalTR = buildCanonicalForLocale('/hizmetler', 'tr');
      expect(canonicalTR).toBe(`${BASE_URL}/hizmetler`);

      const canonicalEN = buildCanonicalForLocale('/hizmetler', 'en');
      expect(canonicalEN).toBe(`${BASE_URL}/en/hizmetler`);
    });

    it('buildLocalizedKeywordMap 4 dilde dikeyine uygun anahtar kelimeler döner', () => {
      SUPPORTED_LOCALES.forEach((locale) => {
        const keywords = buildLocalizedKeywordMap('site', locale);
        expect(keywords.length).toBeGreaterThanOrEqual(3);
      });

      const enKeywords = buildLocalizedKeywordMap('facility', 'en');
      expect(enKeywords.some((k) => k.includes('facility management'))).toBe(true);

      const arKeywords = buildLocalizedKeywordMap('site', 'ar');
      expect(arKeywords.some((k) => k.includes('إدارة'))).toBe(true);
    });

    it('buildLocalizedSerpMeta her dilde doğru başlık ve ogLocale üretir', () => {
      const metaTR = buildLocalizedSerpMeta('/tesis-yonetimi', 'tr', 'facility');
      expect(metaTR.title).toContain('Alo Yönetim');
      expect(metaTR.ogLocale).toBe('tr_TR');

      const metaEN = buildLocalizedSerpMeta('/tesis-yonetimi', 'en', 'facility');
      expect(metaEN.title).toContain('Alo Management');
      expect(metaEN.ogLocale).toBe('en_US');
    });
  });

  /* =========================================================================
   * O2 — SITEMAP & TUTARLILIK DENETİMİ (Faz 406-420)
   * ========================================================================= */
  describe('O2: Sitemap XML & Karşılıklı Etiket Doğrulama (Faz 406-420)', () => {
    it('buildLocalizedSitemapEntry xhtml:link rel="alternate" etiketleri içerir', () => {
      const sitemapXml = buildLocalizedSitemapEntry('/tesis-yonetimi');
      expect(sitemapXml).toContain('<xhtml:link rel="alternate" hreflang="tr"');
      expect(sitemapXml).toContain('<xhtml:link rel="alternate" hreflang="en"');
      expect(sitemapXml).toContain('<xhtml:link rel="alternate" hreflang="x-default"');
    });

    it('detectUserLocale Accept-Language başlığına göre dili doğru saptar', () => {
      expect(detectUserLocale('en-US,en;q=0.9')).toBe('en');
      expect(detectUserLocale('ar-EG,ar;q=0.8')).toBe('ar');
      expect(detectUserLocale('ru-RU,ru;q=0.9')).toBe('ru');
      expect(detectUserLocale('tr-TR,tr;q=0.9')).toBe('tr');
      expect(detectUserLocale('')).toBe('tr'); // Varsayılan
    });

    it('validateHreflangConsistency ters etiket eksikliklerini tespit eder', () => {
      const pageSetInconsistent = [
        {
          url: 'https://aloyonetim.com.tr/tesis',
          hreflangs: [{ lang: 'en', url: 'https://aloyonetim.com.tr/en/facility' }],
        },
        {
          url: 'https://aloyonetim.com.tr/en/facility',
          hreflangs: [], // TR'ye geri bağlantı yok
        },
      ];
      const checkInconsistent = validateHreflangConsistency(pageSetInconsistent);
      expect(checkInconsistent.isValid).toBe(false);
      expect(checkInconsistent.missingReciprocalLinks.length).toBeGreaterThan(0);

      const pageSetConsistent = [
        {
          url: 'https://aloyonetim.com.tr/tesis',
          hreflangs: [{ lang: 'en', url: 'https://aloyonetim.com.tr/en/facility' }],
        },
        {
          url: 'https://aloyonetim.com.tr/en/facility',
          hreflangs: [{ lang: 'tr', url: 'https://aloyonetim.com.tr/tesis' }],
        },
      ];
      const checkConsistent = validateHreflangConsistency(pageSetConsistent);
      expect(checkConsistent.isValid).toBe(true);
    });
  });
});
