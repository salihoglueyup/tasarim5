import { describe, it, expect } from 'vitest';
import { generateEtag, evaluateConditionalGet } from '@/lib/seo/etagEngine';
import { lintSchemaOrgObject } from '@/lib/seo/schemaLinter';
import { findNearestFacilityHub } from '@/lib/seo/edgeGeoResolver';
import { KMK_LAW_INDEX } from '@/app/api/tesis-yonetimi/kmk-law-index.json/route';

describe('5 İleri Düzey Backend SEO Motoru Testleri (Wave 5)', () => {
  describe('Dinamik ETag & 304 Not Modified Motoru (etagEngine.ts)', () => {
    it('Deterministik ETag üretir ve If-None-Match eşleştiğinde 304 Not Modified verir', () => {
      const etag = generateEtag({ page: 'tesis-yonetimi', version: '2026' });
      expect(etag).toContain('W/"alo-');

      const matchResult = evaluateConditionalGet(etag, etag);
      expect(matchResult.isNotModified).toBe(true);

      const noMatchResult = evaluateConditionalGet('W/"old-etag"', etag);
      expect(noMatchResult.isNotModified).toBe(false);
    });
  });

  describe('Google Rich Results Şema Linter Motoru (schemaLinter.ts)', () => {
    it('Eksiksiz FAQPage şemasını 100 puan ile onaylar', () => {
      const validFaq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Tesis yönetimi nedir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ISO 41001 standartlarında bina işletmeciliğidir.',
            },
          },
        ],
      };

      const report = lintSchemaOrgObject(validFaq);
      expect(report.isValid).toBe(true);
      expect(report.googleRichResultsCompliant).toBe(true);
      expect(report.score).toBe(100);
    });

    it('Eksik Question içeren şemayı tespit eder ve hata verir', () => {
      const invalidFaq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [],
      };

      const report = lintSchemaOrgObject(invalidFaq);
      expect(report.isValid).toBe(false);
      expect(report.googleRichResultsCompliant).toBe(false);
    });
  });

  describe('Edge Geo Proximity Tesis Hub Çözücü (edgeGeoResolver.ts)', () => {
    it('Kadıköy koordinatlarında en yakın Kadıköy Tesis Merkezini bulur', () => {
      const result = findNearestFacilityHub(40.9901, 29.0290);
      expect(result.nearestDistrict.name).toBe('Kadıköy');
      expect(result.distanceKm).toBeLessThan(5);
      expect(result.estimatedSlaMinutes).toBeLessThanOrEqual(45);
      expect(result.schema['@type']).toBe('Place');
    });
  });

  describe('KMK 634 Bütüncül Açık Veri İndeksi (KMK_LAW_INDEX)', () => {
    it('Madde 20 aidat ve Madde 37 işletme projesi maddelerini içerir', () => {
      expect(KMK_LAW_INDEX.length).toBeGreaterThanOrEqual(8);

      const m20 = KMK_LAW_INDEX.find((m) => m.articleNumber === 20);
      expect(m20).toBeDefined();
      expect(m20?.summary).toContain('%5 yasal tazminat');

      const m37 = KMK_LAW_INDEX.find((m) => m.articleNumber === 37);
      expect(m37).toBeDefined();
      expect(m37?.title).toContain('İşletme Projesi');
    });
  });
});
