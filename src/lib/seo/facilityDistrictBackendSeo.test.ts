import { describe, it, expect } from 'vitest';
import { buildDistrictFacilityGraphSchema } from './facility/facilityCompleteGraphBuilder';
import { optimizeInternalFacilityLinks, FACILITY_LINKING_TARGETS } from './facility/facilityInternalLinkingOptimizer';
import { DISTRICTS } from '@/data/districts';

describe('39 İlçe Tesis ve Mülk Yönetimi Birleşik @graph & İç Linkleme Motoru (Faz 10)', () => {
  describe('39 İlçe @graph Şema Motoru (buildDistrictFacilityGraphSchema)', () => {

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
