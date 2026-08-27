import { describe, it, expect } from 'vitest';
import { buildFacilitySubSectorGraphSchema } from './facilityCompleteGraphBuilder';
import { resolveFacilitySiloHierarchy, FACILITY_SUB_SECTORS } from './facilitySiloRankPasser';
import { FACILITY_MANAGEMENT_ENTITIES } from '@/lib/seoEngine';

describe('Tesis ve Mülk Hizmetleri Silo PageRank & Alt Sektör @graph Motoru (Faz 9)', () => {
  describe('Alt Sektör @graph Şema Motoru (buildFacilitySubSectorGraphSchema)', () => {
    it('Rezidans sayfası için ebeveyn hub bağlantılı @graph üretir', () => {
      const graph = buildFacilitySubSectorGraphSchema({
        subSectorSlug: 'rezidans-site-yonetimi',
        name: 'Rezidans & Lüks Site Yönetimi',
        description: 'İstanbul rezidans ve lüks siteler için VIP concierge ve tesis yönetimi.',
        priceRange: '₺₺₺',
        lang: 'tr',
        faqs: [
          { question: 'Rezidans yönetimi neleri kapsar?', answer: 'Concierge ve VIP güvenlik kapsar.' },
        ],
        sameAsWikidata: 'https://www.wikidata.org/wiki/Q108846399',
      });

      expect(graph['@context']).toBe('https://schema.org');
      expect(Array.isArray(graph['@graph'])).toBe(true);

      const nodes = graph['@graph'] as any[];
      const serviceNode = nodes.find((n) => n['@type'] === 'Service');

      expect(serviceNode).toBeDefined();
      expect(serviceNode.name).toContain('Rezidans & Lüks Site Yönetimi');
      expect(serviceNode.isPartOf['@id']).toContain('/hizmetler/tesis-yonetimi#service');
      expect(serviceNode.areaServed).toHaveLength(39);
      expect(serviceNode.priceRange).toBe('₺₺₺');
      expect(serviceNode.sameAs).toContain('https://www.wikidata.org/wiki/Q108846399');

      const faqNode = nodes.find((n) => n['@type'] === 'FAQPage');
      expect(faqNode).toBeDefined();
      expect(faqNode.mainEntity).toHaveLength(1);
    });

    it('5 alt sektörün tamamı için geçerli şema düğümleri üretir', () => {
      for (const sub of FACILITY_SUB_SECTORS) {
        const graph = buildFacilitySubSectorGraphSchema({
          subSectorSlug: sub.slug,
          name: sub.name,
          description: sub.shortDesc,
          lang: 'tr',
        });

        const nodes = graph['@graph'] as any[];
        const breadcrumbNode = nodes.find((n) => n['@type'] === 'BreadcrumbList');
        expect(breadcrumbNode).toBeDefined();
        expect(breadcrumbNode.itemListElement).toHaveLength(4);
        expect(breadcrumbNode.itemListElement[2].name).toBe('Tesis Yönetimi');
        expect(breadcrumbNode.itemListElement[3].name).toBe(sub.name);
      }
    });
  });

  describe('Silo İçi PageRank & Hiyerarşi Motoru (resolveFacilitySiloHierarchy)', () => {
    it('Ana Hub, kardeş alt sektörler ve 39 ilçe ağını doğru hesaplar', () => {
      const silo = resolveFacilitySiloHierarchy('plaza-yonetimi', 'tr');

      expect(silo.parentHub.slug).toBe('tesis-yonetimi');
      expect(silo.parentHub.rankWeight).toBe(1.0);
      expect(silo.currentSubSector?.slug).toBe('plaza-yonetimi');
      expect(silo.siblingSubSectors).toHaveLength(4);
      expect(silo.connectedDistricts).toHaveLength(39);
      expect(silo.totalSiloPageRankScore).toBeGreaterThan(50);

      expect(silo.breadcrumbJsonLd['@type']).toBe('BreadcrumbList');
      expect(silo.breadcrumbJsonLd.itemListElement).toHaveLength(4);
      expect(silo.breadcrumbJsonLd.itemListElement[3].name).toContain('Plaza');
    });
  });

  describe('Tesis ve Mülk Hizmetleri Topikal Varlık Entegrasyonu', () => {
    it('Tesis ve Mülk Hizmetleri varlığının Wikidata ve LSI eşanlamlılarını barındırdığını doğrular', () => {
      const mulkEntity = FACILITY_MANAGEMENT_ENTITIES.find((e) => e.slug === 'tesis-ve-mulk-hizmetleri');

      expect(mulkEntity).toBeDefined();
      expect(mulkEntity?.wikidata).toBe('https://www.wikidata.org/wiki/Q1758229');
      expect(mulkEntity?.variations).toContain('tesis ve mülk hizmetleri');
      expect(mulkEntity?.variations).toContain('mülk yönetimi');
      expect(mulkEntity?.variations).toContain('gayrimenkul tesis işletmeciliği');
    });
  });
});
