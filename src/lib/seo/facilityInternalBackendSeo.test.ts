import { describe, it, expect } from 'vitest';
import { buildFacilityCompleteGraphSchema } from './facilityCompleteGraphBuilder';
import { FACILITY_MANAGEMENT_ENTITIES, resolveTopicalEntityGraph } from '@/lib/seoEngine';
import { generateFacilityManagementGraph } from './facilityTopicGraph';

describe('Tesis Yönetimi Doğrudan İç Backend SEO & Knowledge Graph Motorları (Faz 8)', () => {
  describe('Birleşik Schema.org @graph Mimarisi (buildFacilityCompleteGraphSchema)', () => {
    it('Tüm temel varlık düğümlerini tek bir @graph dizisinde birleştirir', () => {
      const graph = buildFacilityCompleteGraphSchema({ lang: 'tr' });

      expect(graph['@context']).toBe('https://schema.org');
      expect(Array.isArray(graph['@graph'])).toBe(true);

      const nodes = graph['@graph'] as Array<{ '@type': string; '@id': string }>;
      const types = nodes.map((n) => n['@type']);

      expect(types).toContain('Corporation');
      expect(types).toContain('WebSite');
      expect(types).toContain('BreadcrumbList');
      expect(types).toContain('Service');
      expect(types).toContain('WebPage');
      expect(types).toContain('FAQPage');
      expect(types).toContain('ItemList');
      expect(types).toContain('DigitalDocument');
      expect(types).toContain('HowTo');
      expect(types).toContain('DefinedTermSet');
    });

    it('Service düğümü 39 ilçeyi, alt sektör kataloğunu ve ISO akreditasyonlarını içerir', () => {
      const graph = buildFacilityCompleteGraphSchema({ lang: 'tr' });
      const nodes = graph['@graph'] as any[];
      const serviceNode = nodes.find((n) => n['@type'] === 'Service');

      expect(serviceNode).toBeDefined();
      expect(serviceNode.name).toContain('Tesis Yönetimi');
      expect(serviceNode.provider['@id']).toBeDefined();
      expect(serviceNode.areaServed).toHaveLength(39);
      expect(serviceNode.hasCredential.some((c: any) => c.name.includes('ISO 41001'))).toBe(true);
      expect(serviceNode.hasOfferCatalog.itemListElement.length).toBe(5);
    });

    it('FAQPage düğümü 7 adet soru-cevap çiftini ve geçerli Answer metinlerini barındırır', () => {
      const graph = buildFacilityCompleteGraphSchema({ lang: 'tr' });
      const nodes = graph['@graph'] as any[];
      const faqNode = nodes.find((n) => n['@type'] === 'FAQPage');

      expect(faqNode).toBeDefined();
      expect(faqNode.mainEntity.length).toBe(7);
      expect(faqNode.mainEntity[0].name).toBeDefined();
      expect(faqNode.mainEntity[0].acceptedAnswer.text).toBeDefined();
    });
  });

  describe('Topikal Varlık (Entity) Sözlüğü & Sektörel Düğümler (FACILITY_MANAGEMENT_ENTITIES)', () => {
    it('Rezidans, Plaza, Toplu Konut ve Sanayi alt sektörlerini içerir', () => {
      const slugs = FACILITY_MANAGEMENT_ENTITIES.map((e) => e.slug);

      expect(slugs).toContain('tesis-yonetimi');
      expect(slugs).toContain('rezidans-site-yonetimi');
      expect(slugs).toContain('plaza-yonetimi');
      expect(slugs).toContain('toplu-konut-yonetimi');
      expect(slugs).toContain('sanayi-tesisi-yonetimi');
    });

    it('İçerikten varlık ve Wikidata eşleşmelerini doğru çözer', () => {
      const sampleText = 'İstanbul rezidans yönetimi ve plaza yönetimi süreçlerinde ISO 41001 standartları uygulanır.';
      const result = resolveTopicalEntityGraph(sampleText);
      const allFound = [...result.about, ...result.mentions];

      expect(allFound.length).toBeGreaterThan(0);
      expect(allFound.some((e) => e.name.includes('Rezidans') || e.name.includes('Tesis') || e.name.includes('Plaza'))).toBe(true);
    });
  });

  describe('Topic Graph & Offer Catalog Linkleme (generateFacilityManagementGraph)', () => {
    it('hasOfferCatalog içindeki alt sektörlerin resmi tesis yönetimi alt yollarına bağlandığını doğrular', () => {
      const graph = generateFacilityManagementGraph('tr');
      const catalog = (graph as any).hasOfferCatalog;

      expect(catalog).toBeDefined();
      expect(catalog.itemListElement.length).toBe(5);
      expect(catalog.itemListElement[0].itemOffered.url).toContain('/hizmetler/tesis-yonetimi/rezidans-site-yonetimi');
      expect(catalog.itemListElement[1].itemOffered.url).toContain('/hizmetler/tesis-yonetimi/plaza-yonetimi');
      expect(catalog.itemListElement[2].itemOffered.url).toContain('/hizmetler/tesis-yonetimi/toplu-konut-yonetimi');
      expect(catalog.itemListElement[3].itemOffered.url).toContain('/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi');
      expect(catalog.itemListElement[4].itemOffered.url).toContain('/hizmetler/tesis-yonetimi/rehber');
    });
  });
});
