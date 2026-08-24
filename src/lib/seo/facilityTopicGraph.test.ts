import { describe, it, expect } from 'vitest';
import { generateFacilityManagementGraph } from './facilityTopicGraph';
import { getFacilitySerpMeta } from './facilitySerpOptimizer';

describe('Tesis Yönetimi Semantik Otorite Grafiği (facilityTopicGraph.ts)', () => {
  it('ISO 41001, 8 alt hizmet ve 39 ilçeyi içeren eksiksiz Service şeması üretir', () => {
    const graph = generateFacilityManagementGraph('tr') as any;

    expect(graph['@type']).toBe('Service');
    expect(graph['@id']).toContain('#service-facility-management');
    expect(graph.sameAs).toContain('https://www.wikidata.org/wiki/Q1391515');

    // 8 alt hizmet bağlantısı (isRelatedTo)
    expect(graph.isRelatedTo).toHaveLength(8);
    expect(graph.isRelatedTo.some((s: any) => s.url.includes('/hizmetler/guvenlik-yonetimi'))).toBe(true);
    expect(graph.isRelatedTo.some((s: any) => s.url.includes('/hizmetler/teknik-bakim'))).toBe(true);

    // 39 İlçe alanı (areaServed)
    expect(graph.areaServed).toHaveLength(39);
    expect(graph.areaServed.some((a: any) => a.name.includes('Kadıköy'))).toBe(true);
    expect(graph.areaServed.some((a: any) => a.name.includes('Beşiktaş'))).toBe(true);

    // ISO Standartları (hasCredential)
    expect(graph.hasCredential).toBeDefined();
    expect(graph.hasCredential.some((c: any) => c.name.includes('ISO 41001:2018'))).toBe(true);

    // Sektörel Katalog
    expect(graph.hasOfferCatalog.itemListElement).toHaveLength(5);
  });
});

describe('Tesis Yönetimi SERP Optimizer (facilitySerpOptimizer.ts)', () => {
  it('ana sayfa için yüksek CTR meta verisi üretir', () => {
    const meta = getFacilitySerpMeta('tr');
    expect(meta.title).toContain('Tesis Yönetimi');
    expect(meta.description).toContain('ISO 41001');
    expect(meta.targetKeyword).toBe('tesis yönetimi');
    expect(meta.canonicalPath).toBe('/hizmetler/tesis-yonetimi');
  });

  it('ilçe sayfaları için yerelleştirilmiş SERP verisi üretir', () => {
    const meta = getFacilitySerpMeta('tr', 'kadikoy');
    expect(meta.title).toContain('Kadıköy Tesis Yönetimi');
    expect(meta.description).toContain('Kadıköy');
    expect(meta.canonicalPath).toBe('/bolgeler/kadikoy/tesis-yonetimi');
  });
});
