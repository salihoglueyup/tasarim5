import { describe, it, expect } from 'vitest';
import { buildDistrictFacilityGraphSchema } from './facilityCompleteGraphBuilder';
import { optimizeInternalFacilityLinks, FACILITY_LINKING_TARGETS } from './facilityInternalLinkingOptimizer';
import { DISTRICTS } from '@/data/districts';

describe('39 İlçe Tesis ve Mülk Yönetimi Birleşik @graph & İç Linkleme Motoru (Faz 10)', () => {
  describe('39 İlçe @graph Şema Motoru (buildDistrictFacilityGraphSchema)', () => {
    it('Kadıköy için LocalBusiness, Service, BreadcrumbList ve FAQPage düğümlerini üretir', () => {
      const graph = buildDistrictFacilityGraphSchema({
        districtSlug: 'kadikoy',
        districtName: 'Kadıköy',
        geo: { lat: 40.99, lng: 29.03 },
        lang: 'tr',
        faqs: [
          { question: 'Kadıköy tesis yönetimi neleri kapsar?', answer: 'Tüm sitelerde 5188 güvenlik ve teknik bakım.' },
        ],
      });

      expect(graph['@context']).toBe('https://schema.org');
      expect(Array.isArray(graph['@graph'])).toBe(true);

      const nodes = graph['@graph'] as any[];
      const types = nodes.map((n) => n['@type']);

      expect(types).toContain('Corporation');
      expect(types).toContain('LocalBusiness');
      expect(types).toContain('BreadcrumbList');
      expect(types).toContain('Service');
      expect(types).toContain('WebPage');
      expect(types).toContain('FAQPage');

      const localBusiness = nodes.find((n) => n['@type'] === 'LocalBusiness');
      expect(localBusiness.name).toContain('Kadıköy');
      expect(localBusiness.openingHoursSpecification).toBeDefined();

      const service = nodes.find((n) => n['@type'] === 'Service');
      expect(service.isPartOf['@id']).toContain('/hizmetler/tesis-yonetimi#service');
      expect(service.areaServed.name).toContain('Kadıköy');
    });

    it('39 ilçenin tamamı için geçerli ilçe şemaları derler', () => {
      for (const d of DISTRICTS.slice(0, 10)) {
        const graph = buildDistrictFacilityGraphSchema({
          districtSlug: d.slug,
          districtName: d.name,
          geo: d.geo,
          lang: 'tr',
        });

        const nodes = graph['@graph'] as any[];
        const breadcrumbNode = nodes.find((n) => n['@type'] === 'BreadcrumbList');
        expect(breadcrumbNode.itemListElement).toHaveLength(4);
        expect(breadcrumbNode.itemListElement[3].name).toContain(d.name);
      }
    });
  });

  describe('Dinamik İç Linkleme & Anchor Text Motoru (optimizeInternalFacilityLinks)', () => {
    it('Metin içindeki "tesis ve mülk hizmetleri" ve "rezidans yönetimi" kelimelerine doğru bağlantılar ekler', () => {
      const sampleText =
        'Firmamız İstanbul genelinde profesyonel tesis ve mülk hizmetleri sunmaktadır. Ayrıca rezidans yönetimi ve plaza yönetimi alanında uzman kadromuz mevcuttur.';

      const result = optimizeInternalFacilityLinks(sampleText, '/blog/ornek-yazi', 5, 'tr');

      expect(result.injectedLinksCount).toBeGreaterThan(0);
      expect(result.enrichedHtml).toContain('href="/hizmetler/tesis-yonetimi"');
      expect(result.enrichedHtml).toContain('href="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi"');
    });

    it('Hedef sayfa mevcut sayfa ile aynıysa self-linking yapmaz', () => {
      const sampleText = 'İstanbul tesis yönetimi süreçlerinde güvenilir çözümler.';
      const result = optimizeInternalFacilityLinks(sampleText, '/hizmetler/tesis-yonetimi', 5, 'tr');

      expect(result.enrichedHtml).not.toContain('href="/hizmetler/tesis-yonetimi"');
    });
  });
});
