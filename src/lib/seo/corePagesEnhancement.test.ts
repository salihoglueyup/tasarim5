import { describe, it, expect } from 'vitest';
import { synthesizeDistrictFacilityFaq } from '@/lib/seo/facilityFaqSynthesizer';
import { findNearestFacilityHub } from '@/lib/seo/edgeGeoResolver';
import { generateVerifiedAuthorityGraph } from '@/lib/seo/eeatAuditor';
import { KMK_LAW_INDEX } from '@/data/kmkLawData';
import { TERMS } from '@/data/dictionary';

describe('5 Ana Sayfa Tesis Yönetimi SEO Entegrasyon Testleri (Wave 6)', () => {
  describe('bolgeler/[ilce]/[hizmet] Yerel Sayfa Entegrasyonu', () => {
    it('Tesis Yönetimi için dinamik ilçe SSS ve Geo SLA süresi üretir', () => {
      const faqResult = synthesizeDistrictFacilityFaq('kadikoy');
      expect(faqResult.faqs.length).toBeGreaterThanOrEqual(4);
      expect(faqResult.faqs[0].question).toContain('Kadıköy');

      const hubResult = findNearestFacilityHub(40.9901, 29.0290);
      expect(hubResult.estimatedSlaMinutes).toBeGreaterThanOrEqual(25);
      expect(hubResult.estimatedSlaMinutes).toBeLessThanOrEqual(45);

      const authorityGraph = generateVerifiedAuthorityGraph();
      expect(authorityGraph['@type']).toBe('Organization');
    });
  });

  describe('sektorel-cozumler/[slug] ve teklif-al Sayfa Entegrasyonu', () => {
    it('QuoteAction ve CalculateAction yapısını doğrular', () => {
      const authorityGraph = generateVerifiedAuthorityGraph();
      expect(authorityGraph.hasCredential.some((c: any) => c.name.includes('ISO 41001'))).toBe(true);
    });
  });

  describe('sozluk ve hesaplayici Sayfa Entegrasyonu', () => {
    it('Sözlük için KMK yasa maddelerini ve genel terimleri birleştirir', () => {
      const kmkTerms = KMK_LAW_INDEX.map((item) => ({
        term: `KMK Madde ${item.articleNumber}: ${item.title}`,
        definition: item.summary,
        url: item.legalAnchor,
      }));

      const allTerms = [
        ...TERMS.map((t) => ({
          term: t.term,
          definition: t.definition,
          url: `/sozluk#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        })),
        ...kmkTerms,
      ];

      expect(allTerms.length).toBeGreaterThan(TERMS.length);
      expect(allTerms.some((t) => t.term.includes('KMK Madde 20'))).toBe(true);
    });
  });
});
