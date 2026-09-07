import { describe, it, expect } from 'vitest';
import { generateFacilityManagementGraph } from './facilityTopicGraph';
import {
  buildFacilityCompleteGraphSchema,
  buildFacilitySubSectorGraphSchema,
  buildDistrictFacilityGraphSchema,
} from './facilityCompleteGraphBuilder';
import {
  buildLocalBusinessSchema,
  buildDistrictLocalBusinessSchema,
} from './dualCoreRichResultEngine';
import { faqPageSchema } from '../schemas/faq';
import { blogPostingSchema } from '../schemas/articles';
import { graph } from '../schemas/misc';
import { buildHttpLinkHeader } from './edgeHeaderInjector';
import { BASE_URL } from '../seo';

describe('GSC Zero-Error (Sıfır Hata) Güvence Testleri', () => {
  describe('1. Schema.org AggregateRating itemReviewed Zorunluluk Kontrolleri', () => {
    it('facilityTopicGraph: aggregateRating içinde geçerli itemReviewed bulunmalıdır', () => {
      const graphObj = generateFacilityManagementGraph('tr');
      const agg = (graphObj as any).aggregateRating;
      expect(agg).toBeDefined();
      expect(agg['@type']).toBe('AggregateRating');
      expect(agg.itemReviewed).toBeDefined();
      expect(agg.itemReviewed['@type']).toBe('Service');
      expect(agg.itemReviewed.name).toContain('Alo Yönetim');
    });

    it('facilityCompleteGraphBuilder primary: aggregateRating içinde itemReviewed bulunmalıdır', () => {
      const primaryGraph = buildFacilityCompleteGraphSchema({
        lang: 'tr',
        pageTitle: 'Tesis Yönetimi',
        pageDescription: 'Açıklama',
      });
      const nodes = (primaryGraph as any)['@graph'];
      const serviceNode = nodes.find((n: any) => n['@type'] === 'Service' && n.aggregateRating);
      expect(serviceNode).toBeDefined();
      expect(serviceNode.aggregateRating.itemReviewed).toBeDefined();
      expect(serviceNode.aggregateRating.itemReviewed['@type']).toBe('Service');
    });

    it('facilityCompleteGraphBuilder subsector: aggregateRating içinde itemReviewed bulunmalıdır', () => {
      const subGraph = buildFacilitySubSectorGraphSchema({
        lang: 'tr',
        subSectorSlug: 'rezidans-site-yonetimi',
        name: 'Rezidans Yönetimi',
        description: 'Rezidans açıklama',
      });
      const nodes = (subGraph as any)['@graph'];
      const serviceNode = nodes.find((n: any) => n['@type'] === 'Service' && n.aggregateRating);
      expect(serviceNode).toBeDefined();
      expect(serviceNode.aggregateRating.itemReviewed).toBeDefined();
      expect(serviceNode.aggregateRating.itemReviewed['@type']).toBe('Service');
    });

    it('facilityCompleteGraphBuilder district: aggregateRating içinde itemReviewed bulunmalıdır', () => {
      const districtGraph = buildDistrictFacilityGraphSchema({
        lang: 'tr',
        districtSlug: 'kadikoy',
        districtName: 'Kadıköy',
      });
      const nodes = (districtGraph as any)['@graph'];
      const serviceNode = nodes.find((n: any) => n['@type'] === 'Service' && n.aggregateRating);
      expect(serviceNode).toBeDefined();
      expect(serviceNode.aggregateRating.itemReviewed).toBeDefined();
      expect(serviceNode.aggregateRating.itemReviewed['@type']).toBe('Service');
    });

    it('dualCoreRichResultEngine buildLocalBusinessSchema: aggregateRating içinde itemReviewed bulunmalıdır', () => {
      const schema = buildLocalBusinessSchema({ pillar: 'facility' });
      const agg = (schema as any).aggregateRating;
      expect(agg).toBeDefined();
      expect(agg.itemReviewed).toBeDefined();
      expect(agg.itemReviewed['@type']).toBe('ProfessionalService');
    });

    it('dualCoreRichResultEngine buildDistrictLocalBusinessSchema: aggregateRating içinde itemReviewed bulunmalıdır', () => {
      const districtSchema = buildDistrictLocalBusinessSchema('kadikoy', 'facility');
      const agg = (districtSchema as any).aggregateRating;
      expect(agg).toBeDefined();
      expect(agg.itemReviewed).toBeDefined();
      expect(agg.itemReviewed['@type']).toBe('LocalBusiness');
    });
  });

  describe('2. FAQPage mainEntity Boşluk Kalkanı', () => {
    it('boş soru-cevap dizisi verildiğinde null dönmeli ve boş FAQPage basmamalıdır', () => {
      const emptyFaq = faqPageSchema([]);
      expect(emptyFaq).toBeNull();

      const whitespaceFaq = faqPageSchema([{ question: '   ', answer: '  ' }]);
      expect(whitespaceFaq).toBeNull();
    });

    it('geçerli soru-cevap olduğunda tam FAQPage şeması üretmelidir', () => {
      const validFaq = faqPageSchema([
        { question: 'Tesis yönetimi nedir?', answer: 'Tesis yönetimi entegre işletme modelidir.' },
      ]);
      expect(validFaq).not.toBeNull();
      expect(validFaq?.['@type']).toBe('FAQPage');
      expect(Array.isArray((validFaq as any).mainEntity)).toBe(true);
      expect((validFaq as any).mainEntity.length).toBe(1);
    });
  });

  describe('3. Article / BlogPosting Görsel Güvencesi', () => {
    it('görsel verilmediğinde dahi 1200px genişlik standartında fallback görsel bulunmalıdır', () => {
      const postSchema = blogPostingSchema({
        headline: 'Test Başlığı',
        description: 'Test Açıklaması',
        path: '/blog/test-yazisi',
        datePublished: '2026-03-01T10:00:00.000Z',
      });
      expect(postSchema.image).toBeDefined();
      expect(typeof postSchema.image).toBe('string');
      expect(postSchema.image).toContain('hero-poster-v5.webp');
    });
  });

  describe('4. graph(...) Düğüm Temizliği ve @context İzolasyonu', () => {
    it('graph fonksiyonu null, undefined ve boş düğümleri elemeli, iç @context kalıntılarını temizlemelidir', () => {
      const sampleNodeWithContext = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Ana Sayfa',
      };
      const result = graph(null, sampleNodeWithContext, undefined, {} as any);
      expect(result['@context']).toBe('https://schema.org');
      const g = (result as any)['@graph'];
      expect(g.length).toBe(1);
      expect(g[0]['@type']).toBe('WebPage');
      expect(g[0]['@context']).toBeUndefined(); // İç @context temizlenmiş olmalıdır
    });
  });

  describe('5. HTTP Link Header & Hreflang Paritesi', () => {
    it('buildHttpLinkHeader hem ISO 639-1 hem BCP 47 bölgesel etiketleri içermelidir', () => {
      const header = buildHttpLinkHeader('/hizmetler', 'tr');
      expect(header).toContain('hreflang="tr"');
      expect(header).toContain('hreflang="tr-TR"');
      expect(header).toContain('hreflang="en"');
      expect(header).toContain('hreflang="en-US"');
      expect(header).toContain('hreflang="ru"');
      expect(header).toContain('hreflang="ru-RU"');
      expect(header).toContain('hreflang="ar"');
      expect(header).toContain('hreflang="ar-SA"');
      expect(header).toContain('hreflang="x-default"');
    });
  });
});
