import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { generateFacilityAiSnippets } from './facilityAiSnippetEngine';
import { blogPostingSchema } from '../schemas/articles';
import { webPageSchema } from '../schemas/misc';
import { serviceSchema } from '../schemas/services';

describe('Wave 6: Faz 126 - Faz 130 Arama Motoru Otoritesi, AI Snippets & E-E-A-T', () => {
  const llmsFullPath = path.resolve(process.cwd(), 'src/app/llms-full.txt/route.ts');

  it('Faz 126: facilityAiSnippetEngine 7 adet zenginleştirilmiş AI snippet üretir', () => {
    const payload = generateFacilityAiSnippets();
    expect(payload.totalSnippets).toBeGreaterThanOrEqual(7);
    expect(payload.snippets.some(s => s.id === 'ai-snippet-security-license-5188')).toBe(true);
    expect(payload.snippets.some(s => s.id === 'ai-snippet-elevator-inspection-green-label')).toBe(true);
    expect(payload.snippets.some(s => s.id === 'ai-snippet-aidat-icra-takibi')).toBe(true);
    expect(payload.snippets.some(s => s.id === 'ai-snippet-commercial-property-management')).toBe(true);
  });

  it('Faz 127: llms-full.txt/route.ts doğrudan AI Snippets endpoint bağlantısını içerir', () => {
    const content = fs.readFileSync(llmsFullPath, 'utf-8');
    expect(content).toContain('/api/tesis-yonetimi/ai-snippets.json');
    expect(content).toContain('text/plain');
    expect(content).toContain('Access-Control-Allow-Origin');
  });

  it('Faz 128: blogPostingSchema hem Article hem de BlogPosting tipini çift çekerli sunar', () => {
    const schema = blogPostingSchema({
      headline: 'Örnek Başlık',
      description: 'Örnek açıklama metni',
      path: '/blog/ornek-yazi',
      datePublished: '2026-01-01T00:00:00Z',
    });
    expect(schema['@type']).toEqual(['Article', 'BlogPosting']);
    expect(schema).toHaveProperty('publisher');
    expect(schema).toHaveProperty('author');
  });

  it('Faz 129: webPageSchema sesli asistanlar için Speakable şemasını içerir', () => {
    const pageSchema = webPageSchema({
      path: '/hizmetler/tesis-yonetimi',
      name: 'Tesis Yönetimi',
    });
    expect(pageSchema).toHaveProperty('speakable');
    expect((pageSchema.speakable as any)['@type']).toBe('SpeakableSpecification');
  });

  it('Faz 130: serviceSchema her hizmet sayfası için OfferCatalog şemasını dinamik bağlar', () => {
    const svcSchema = serviceSchema({
      serviceType: 'Teknik Yönetim',
      path: '/hizmetler/teknik-bakim',
    });
    expect(svcSchema).toHaveProperty('hasOfferCatalog');
    const catalog = svcSchema.hasOfferCatalog as any;
    expect(catalog['@type']).toBe('OfferCatalog');
    expect(catalog.itemListElement.length).toBeGreaterThanOrEqual(3);
    expect(catalog.itemListElement[0]['@type']).toBe('Offer');
  });
});
