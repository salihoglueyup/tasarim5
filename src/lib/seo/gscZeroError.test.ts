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
  buildServiceReviewPage,
} from './dualCoreRichResultEngine';
import { faqPageSchema } from '../schemas/faq';
import { blogPostingSchema } from '../schemas/articles';
import { siteNavigationSchema } from '../schemas/breadcrumbs';
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

  describe('6. SiteNavigationElement ItemList Formatı', () => {
    it('siteNavigationSchema tekil string dizisi yerine Schema.org ItemList ve SiteNavigationElement üretmelidir', () => {
      const links = [
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetler', url: '/hizmetler' },
        { name: 'Tesis Yönetimi', url: '/hizmetler/tesis-yonetimi' },
      ];
      const navSchema = siteNavigationSchema(links);
      expect(navSchema['@type']).toBe('ItemList');
      expect(Array.isArray((navSchema as any).itemListElement)).toBe(true);
      expect((navSchema as any).itemListElement.length).toBe(3);

      const first = (navSchema as any).itemListElement[0];
      expect(first['@type']).toBe('SiteNavigationElement');
      expect(first.position).toBe(1);
      expect(first.name).toBe('Ana Sayfa');
      expect(first.url).toBe(`${BASE_URL}/`);
      expect(typeof first.name).toBe('string');
      expect(typeof first.url).toBe('string');
    });
  });

  describe('7. buildServiceReviewPage Product aggregateRating itemReviewed', () => {
    it('buildServiceReviewPage aggregateRating içinde geçerli itemReviewed bulunmalıdır', () => {
      const reviewSchema = buildServiceReviewPage('tesis-yonetimi', 'facility');
      expect(reviewSchema['@type']).toBe('Product');
      const agg = (reviewSchema as any).aggregateRating;
      expect(agg).toBeDefined();
      expect(agg.itemReviewed).toBeDefined();
      expect(agg.itemReviewed['@type']).toBe('Product');
      expect(agg.itemReviewed.name).toBe(reviewSchema.name);
    });
  });

  describe('8. image-sitemap.xml 500 Hatası Önleme ve 200 OK Güvencesi', () => {
    it('GET fonksiyonu 500 atmadan her durumda 200 OK ve geçerli XML dönmelidir', async () => {
      const { GET } = await import('@/app/image-sitemap.xml/route');
      const res = await GET();
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(text).toContain('<urlset');
      expect(text).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
      expect(text).toContain('<image:loc>');
    });
  });

  describe('9. robots.txt Next.js Statik Dosya (_next/static/) İzni', () => {
    it('Googlebot için /_next/static/ yolu açıkça izin verilmiş olmalıdır', async () => {
      const robotsFn = (await import('@/app/robots')).default;
      const config = robotsFn();
      const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
      const wildcardRule = rules.find((r: any) => r.userAgent === '*');
      expect(wildcardRule).toBeDefined();
      expect((wildcardRule as any).allow).toContain('/_next/static/');
    });
  });

  describe('10. Kök Layout googleBot max-image-preview ve Snippet İzinleri', () => {
    it('metadata.robots içinde googleBot max-image-preview large ve sınırsız snippet tanımlı olmalıdır', async () => {
      const fs = await import('fs');
      const path = await import('path');
      const layoutContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[lang]/layout.tsx'), 'utf-8');
      expect(layoutContent).toContain('googleBot: {');
      expect(layoutContent).toContain("'max-image-preview': 'large'");
      expect(layoutContent).toContain("'max-snippet': -1");
    });
  });

  describe('11. Evrensel Google HTML Dosyası Doğrulama Motoru ve Link Header', () => {
    it('middleware /google[token].html isteğinde HTTP 200 ve geçerli doğrulama metni dönmelidir', async () => {
      process.env.JWT_SECRET = 'test_jwt_secret_key_for_vitest_runner_2026';
      const { middleware } = await import('@/middleware');
      const { NextRequest } = await import('next/server');
      const req = new NextRequest('https://aloyonetim.com.tr/google1234567890abcdef.html');
      const res = await middleware(req);
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toBe('google-site-verification: google1234567890abcdef.html');
    });

    it('middleware Link header içinde sitemap-index.xml bulunmalıdır', async () => {
      process.env.JWT_SECRET = 'test_jwt_secret_key_for_vitest_runner_2026';
      const { middleware } = await import('@/middleware');
      const { NextRequest } = await import('next/server');
      const req = new NextRequest('https://aloyonetim.com.tr/hizmetler');
      const res = await middleware(req);
      const linkHeader = res.headers.get('Link');
      expect(linkHeader).toBeDefined();
      expect(linkHeader).toContain('sitemap-index.xml');
    });
  });
});


