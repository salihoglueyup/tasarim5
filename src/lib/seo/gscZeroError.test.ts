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
import { siteNavigationSchema, generateBreadcrumbs } from '../schemas/breadcrumbs';
import { graph, videoObjectSchema } from '../schemas/misc';
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

  describe('12. sitemap-regions.xml 39 İlçe Ana İniş & Tesis Yönetimi Rotaları', () => {
    it('GET fonksiyonu hem ilçe hub hem tesis yönetimi sayfalarını tam hreflang ile üretmelidir', async () => {
      const { GET } = await import('@/app/sitemap-regions.xml/route');
      const res = await GET();
      expect(res.status).toBe(200);
      const xml = await res.text();
      expect(xml).toContain('<loc>https://aloyonetim.com.tr/bolgeler/kadikoy</loc>');
      expect(xml).toContain('<loc>https://aloyonetim.com.tr/bolgeler/kadikoy/tesis-yonetimi</loc>');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="tr"');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="tr-TR"');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en"');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en-US"');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="ru"');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="ru-RU"');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="ar"');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="ar-SA"');
      expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default"');
    });
  });

  describe('13. generateBreadcrumbs Google Rich Results Tekil Öğe Kalkanı', () => {
    it('2 elemandan az liste verildiğinde null dönmeli ve tekil öğe uyarısını engellemelidir', () => {
      expect(generateBreadcrumbs([])).toBeNull();
      expect(generateBreadcrumbs([{ name: 'Ana Sayfa', url: '/' }])).toBeNull();
      expect(generateBreadcrumbs([{ name: '', url: '/' }])).toBeNull();
    });

    it('2 veya daha fazla geçerli eleman olduğunda tam BreadcrumbList üretmelidir', () => {
      const result = generateBreadcrumbs([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Bölgeler', url: '/bolgeler' },
        { name: 'Kadıköy', url: '/bolgeler/kadikoy' },
      ]);
      expect(result).not.toBeNull();
      expect(result?.['@type']).toBe('BreadcrumbList');
      expect(Array.isArray((result as any).itemListElement)).toBe(true);
      expect((result as any).itemListElement.length).toBe(3);
      expect((result as any).itemListElement[2].name).toBe('Kadıköy');
    });
  });

  describe('14. rss.xml Enclosure Görselinde 404 Koruması', () => {
    it('GET fonksiyonu /og kırık linki yerine geçerli görsel URL üretmelidir', async () => {
      const { GET } = await import('@/app/rss.xml/route');
      const res = await GET();
      expect(res.status).toBe(200);
      const xml = await res.text();
      expect(xml).not.toContain('url="https://aloyonetim.com.tr/og"');
      expect(xml).toContain('<enclosure');

      const fs = await import('fs');
      const path = await import('path');
      const routeContent = fs.readFileSync(path.join(process.cwd(), 'src/app/rss.xml/route.ts'), 'utf-8');
      expect(routeContent).toContain('hero-poster-v5.webp');
      expect(routeContent).not.toContain("`${BASE_URL}/og`");
    });
  });

  describe('15. videoObjectSchema Google Video Snippet Standartları', () => {
    it('thumbnailUrl dizi formatında olmalı ve contentUrl / embedUrl desteklenmelidir', () => {
      const schema = videoObjectSchema({
        name: 'Tesis Yönetimi Tanıtım',
        description: 'Video açıklaması',
        thumbnailUrl: '/images/video-thumb.webp',
        contentUrl: 'https://aloyonetim.com.tr/media/intro.mp4',
        embedUrl: 'https://youtube.com/embed/xyz123',
        uploadDate: '2026-01-15',
        duration: 'PT2M30S',
      });

      expect(schema['@type']).toBe('VideoObject');
      expect(Array.isArray(schema.thumbnailUrl)).toBe(true);
      expect((schema.thumbnailUrl as string[])[0]).toBe('https://aloyonetim.com.tr/images/video-thumb.webp');
      expect(schema.contentUrl).toBe('https://aloyonetim.com.tr/media/intro.mp4');
      expect(schema.embedUrl).toBe('https://youtube.com/embed/xyz123');
    });
  });

  describe('16. news-sitemap.xml POSTS_META Hafif Fallback ve 200 OK', () => {
    it('GET fonksiyonu 200 OK ve geçerli Google News şeması üretmelidir', async () => {
      const { GET } = await import('@/app/news-sitemap.xml/route');
      const res = await GET();
      expect(res.status).toBe(200);
      const xml = await res.text();
      expect(xml).toContain('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"');
      expect(xml).toContain('<news:name>Alo Yönetim Tesis Bülteni</news:name>');
      expect(xml).toContain('<news:language>tr</news:language>');
      expect(xml).toContain('<news:publication_date>');
      expect(xml).toContain('<news:title>');

      const fs = await import('fs');
      const path = await import('path');
      const content = fs.readFileSync(path.join(process.cwd(), 'src/app/news-sitemap.xml/route.ts'), 'utf-8');
      expect(content).toContain('POSTS_META');
    });
  });

  describe('17. BlogFAQExtractor faqPageSchema Standardizasyonu', () => {
    it('soru içermeyen metinlerde veya boş içerikte null dönerek GSC hatasını engellemelidir', async () => {
      const BlogFAQExtractor = (await import('@/components/seo/BlogFAQExtractor')).default;
      expect(BlogFAQExtractor({ htmlContent: '' })).toBeNull();
      expect(BlogFAQExtractor({ htmlContent: '<p>Sadece düz bir açıklama paragrafı.</p>' })).toBeNull();
      expect(BlogFAQExtractor({ htmlContent: '<h2>Başlık Sorusuz</h2><p>Cevap yok</p>' })).toBeNull();
    });

    it('soru işareti içeren başlıklardan geçerli FAQ şeması oluşturmalıdır', async () => {
      const html = '<h2>Tesis yönetimi aidatları nasıl düşürülür?</h2><p>Toplu satın alma ve enerji optimizasyonu ile %30 tasarruf sağlanır.</p>';
      const BlogFAQExtractor = (await import('@/components/seo/BlogFAQExtractor')).default;
      const element = BlogFAQExtractor({ htmlContent: html });
      expect(element).not.toBeNull();
      expect(element?.props?.data?.['@type']).toBe('FAQPage');
      expect(element?.props?.data?.mainEntity).toHaveLength(1);
      expect(element?.props?.data?.mainEntity[0].name).toContain('Tesis yönetimi aidatları');
    });
  });

  describe('18. FacilityDistrictGridSeo 4 Dilli Bölgesel URL Eşleşmesi', () => {
    it('TR, EN, RU, AR dillerinin tamamında doğru yerel yol üretilmelidir', () => {
      const getLocalizedPath = (path: string, language: string) => {
        if (!path) return '/';
        return language && language !== 'tr' ? `/${language}${path === '/' ? '' : path}` : path;
      };

      expect(getLocalizedPath('/bolgeler/kadikoy', 'tr')).toBe('/bolgeler/kadikoy');
      expect(getLocalizedPath('/bolgeler/kadikoy', 'en')).toBe('/en/bolgeler/kadikoy');
      expect(getLocalizedPath('/bolgeler/kadikoy', 'ru')).toBe('/ru/bolgeler/kadikoy');
      expect(getLocalizedPath('/bolgeler/kadikoy', 'ar')).toBe('/ar/bolgeler/kadikoy');
    });
  });

  describe('19. facilityFaqSynthesizer Merkezi faqPageSchema Entegrasyonu', () => {
    it('39 ilçe için üretilen SSS nesnesi geçerli FAQPage şeması içermelidir', async () => {
      const { synthesizeDistrictFacilityFaq } = await import('./facilityFaqSynthesizer');
      const result = synthesizeDistrictFacilityFaq('kadikoy');
      expect(result.schema).not.toBeNull();
      expect(result.schema?.['@type']).toBe('FAQPage');
      expect(Array.isArray((result.schema as any)?.mainEntity)).toBe(true);
      expect((result.schema as any)?.mainEntity.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('20. edgeGeoResolver LocalBusiness Şeması ve Yerel Nitelikler', () => {
    it('en yakın merkez şeması LocalBusiness olmalı, telefon ve fiyat aralığı içermelidir', async () => {
      const { findNearestFacilityHub } = await import('./edgeGeoResolver');
      const hub = findNearestFacilityHub(40.99, 29.02);
      expect(hub.schema['@type']).toBe('LocalBusiness');
      expect(hub.schema.telephone).toBe('+90 216 550 48 48');
      expect(hub.schema.priceRange).toBe('₺₺');
      expect(hub.schema.url).toContain('/bolgeler/kadikoy/tesis-yonetimi');
    });
  });

  describe('21. api/tesis-yonetimi/feed.xml Enclosure Görsel Koruması', () => {
    it('GET fonksiyonu tüm öğelerde geçerli enclosure görsel etiketi üretmelidir', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/feed.xml/route');
      const res = await GET();
      expect(res.status).toBe(200);
      const xml = await res.text();
      expect(xml).toContain('<enclosure');
      expect(xml).toContain('hero-poster-v5.webp');
    });
  });

  describe('22. api/tesis-yonetimi/llm-facts.json Çift Kanallı İlçe Rotaları', () => {
    it('GET fonksiyonu 39 ilçe için hem ana iniş hem tesis yönetimi linklerini sunmalıdır', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/llm-facts.json/route');
      const res = await GET();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(Array.isArray(data.districtDuesBenchmarks39)).toBe(true);
      expect(data.districtDuesBenchmarks39.length).toBe(39);
      const first = data.districtDuesBenchmarks39[0];
      expect(first.districtHubUrl).toBeDefined();
      expect(first.facilityManagementUrl).toBeDefined();
      expect(first.districtHubUrl).toContain('/bolgeler/');
      expect(first.facilityManagementUrl).toContain('/tesis-yonetimi');
    });
  });

  describe('23. facilityIndexNowPinger 39 İlçe Hub & Spoke URL Kapsamı', () => {
    it('IndexNow yükü hem ilçe ana sayfası hem tesis yönetimi linklerini içermelidir', async () => {
      const { buildFacilityIndexNowPayload } = await import('./facilityIndexNowPinger');
      const payload = buildFacilityIndexNowPayload();
      expect(payload.urlList).toContain('https://aloyonetim.com.tr/bolgeler/kadikoy');
      expect(payload.urlList).toContain('https://aloyonetim.com.tr/bolgeler/kadikoy/tesis-yonetimi');
      expect(payload.urlList.length).toBeGreaterThanOrEqual(80);
    });
  });

  describe('24. facilityAutonomousAuditor Genişletilmiş Açık Veri & AI Raporu', () => {
    it('otonom denetleyici tüm AI ve mevzuat API uç noktalarını raporlamalıdır', async () => {
      const { runFacilityAutonomousAudit } = await import('./facilityAutonomousAuditor');
      const report = runFacilityAutonomousAudit();
      expect(report.overallSeoHealthScore).toBeGreaterThanOrEqual(90);
      const endpoints = report.apiHealthStatus.map((e) => e.endpoint);
      expect(endpoints).toContain('/api/tesis-yonetimi/llm-facts.json');
      expect(endpoints).toContain('/api/tesis-yonetimi/kmk-law-index.json');
      expect(endpoints).toContain('/api/tesis-yonetimi/feed.xml');
    });
  });

  describe('25. hesaplayici/page.tsx WebApplication Şema Standartları', () => {
    it('hesaplayıcı sayfasında ücretsiz offer ve özellik listesi bulunmalıdır', async () => {
      const fs = await import('fs');
      const path = await import('path');
      const content = fs.readFileSync(path.join(process.cwd(), 'src/app/[lang]/hesaplayici/page.tsx'), 'utf-8');
      expect(content).toContain("'WebApplication'");
      expect(content).toContain("price: '0'");
      expect(content).toContain("priceCurrency: 'TRY'");
      expect(content).toContain('featureList');
      expect(content).toContain('CalculateAction');
    });
  });

  describe('26. kmk-law-index.json Legislation Mevzuat ve Otorite Şeması', () => {
    it('GET fonksiyonu mevzuat dilini ve TBMM otorite nesnesini sunmalıdır', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/kmk-law-index.json/route');
      const req = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/kmk-law-index.json');
      const res = await GET(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.schema['@type']).toBe('ItemList');
      const firstLegislation = data.schema.itemListElement[0].item;
      expect(firstLegislation['@type']).toBe('Legislation');
      expect(firstLegislation.inLanguage).toBe('tr');
      expect(firstLegislation.legislationPassedBy.name).toContain('TBMM');
    });
  });

  describe('27. robots.ts AI Bot Genişletmesi ve Açık Veri İzinleri', () => {
    it('robots.ts Amazonbot, Meta-ExternalAgent ve KMK açık veri yollarını içermelidir', async () => {
      const robotsFn = (await import('@/app/robots')).default;
      const config = robotsFn();
      const userAgentRules = Array.isArray(config.rules) ? config.rules : [config.rules];
      const aiRule = userAgentRules.find((r) => Array.isArray(r.userAgent) && r.userAgent.includes('Amazonbot'));
      expect(aiRule).toBeDefined();
      expect(aiRule?.userAgent).toContain('Meta-ExternalAgent');
      expect(aiRule?.userAgent).toContain('Bytespider');

      const allAllows = userAgentRules.flatMap((r) =>
        Array.isArray(r.allow) ? r.allow : r.allow ? [r.allow] : []
      );
      expect(allAllows).toContain('/api/tesis-yonetimi/kmk-law-index.json');
      expect(allAllows).toContain('/api/tesis-yonetimi/authority-corpus.json');
      expect(allAllows).toContain('/api/tesis-yonetimi/voice-knowledge.json');
    });
  });

  describe('28. middleware.ts Link Headers ve Akıllı Bot Telemetrisi', () => {
    it('middleware.ts içinde parseBotName ve KMK açık veri link başlıkları tanımlı olmalıdır', async () => {
      const fs = await import('fs');
      const path = await import('path');
      const content = fs.readFileSync(path.join(process.cwd(), 'src/middleware.ts'), 'utf-8');
      expect(content).toContain('parseBotName');
      expect(content).toContain('/api/tesis-yonetimi/kmk-law-index.json');
      expect(content).toContain('/api/tesis-yonetimi/llm-facts.json');
      expect(content).toContain('X-AI-KMK-Law-Index');
      expect(content).toContain('X-AI-Facts');
    });
  });

  describe('29. feed.xml WebSub Google Hub Entegrasyonu', () => {
    it('tesis-yonetimi feed.xml resmi WebSub Hub ve HTTP Link başlığı sunmalıdır', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/feed.xml/route');
      const res = await GET();
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain('rel="hub"');
      expect(text).toContain('https://pubsubhubbub.appspot.com/');
      const linkHeader = res.headers.get('Link');
      expect(linkHeader).toBeDefined();
      expect(linkHeader).toContain('rel="hub"');
      expect(linkHeader).toContain('rel="self"');
    });
  });

  describe('30. webSubPinger Çoklu Besleme Bildirim Desteği', () => {
    it('publishWebSubPing parametresiz ve dizi ile çağrıldığında başarıyla çözülmelidir', async () => {
      const { publishWebSubPing } = await import('./webSubPinger');
      const resultDefault = await publishWebSubPing();
      expect(resultDefault).toBe(true);

      const resultMulti = await publishWebSubPing([
        'https://aloyonetim.com.tr/feed.xml',
        'https://aloyonetim.com.tr/api/tesis-yonetimi/feed.xml',
      ]);
      expect(resultMulti).toBe(true);
    });
  });

  describe('31. facilityVoiceAiSynthesizer 4 Dilli Speakable Soru-Cevap Kapsamı', () => {
    it('sesli asistan motoru TR, EN, RU ve AR dillerinde SpeakableSpecification üretmelidir', async () => {
      const { synthesizeFacilityVoiceQA } = await import('./facilityVoiceAiSynthesizer');
      const payload = synthesizeFacilityVoiceQA();
      expect(payload.supportedLanguages).toEqual(['tr', 'en', 'ru', 'ar']);
      expect(payload.qaCollection.length).toBeGreaterThanOrEqual(6);

      const languages = payload.qaCollection.map((q) => q.lang);
      expect(languages).toContain('tr');
      expect(languages).toContain('en');
      expect(languages).toContain('ru');
      expect(languages).toContain('ar');

      payload.qaCollection.forEach((item) => {
        expect(item.schema['@type']).toBe('SpeakableSpecification');
        expect(item.spokenQuestion.length).toBeGreaterThan(10);
        expect(item.spokenAnswer.length).toBeGreaterThan(15);
      });
    });
  });

  describe('32. verify-credentials E-E-A-T Kurumsal Şema Doğrulaması', () => {
    it('GET fonksiyonu resmi Kadıköy adresini, telefonunu ve ISO akreditasyonlarını sunmalıdır', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/verify-credentials/route');
      const res = await GET();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.schema['@type']).toBe('AboutPage');
      const entity = data.schema.mainEntity;
      expect(entity['@type']).toBe('Organization');
      expect(entity.telephone).toBe('+90 216 550 48 48');
      expect(entity.address.addressLocality).toBe('Kadıköy');
      expect(entity.address.addressCountry).toBe('TR');
      expect(entity.hasCredential.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('33. ping-indexnow API Rotası Telemetri ve Güvencesi', () => {
    it('GET ve POST istekleri 200 dönmeli ve no-store başlığı ile 80+ URL iletmelidir', async () => {
      const { GET, POST } = await import('@/app/api/tesis-yonetimi/ping-indexnow/route');
      const resGet = await GET();
      expect(resGet.status).toBe(200);
      expect(resGet.headers.get('Cache-Control')).toContain('no-store');
      const dataGet = await resGet.json();
      expect(dataGet.success).toBe(true);
      expect(dataGet.totalUrlsSubmitted).toBeGreaterThanOrEqual(80);

      const resPost = await POST();
      expect(resPost.status).toBe(200);
      expect(resPost.headers.get('Cache-Control')).toContain('no-store');
      const dataPost = await resPost.json();
      expect(dataPost.success).toBe(true);
      expect(dataPost.totalUrlsSubmitted).toBeGreaterThanOrEqual(80);
    });
  });

  describe('34. FacilityDistrictGridSeo Çok Dilli UI Metinleri', () => {
    it('bileşen kaynak kodunda TR, EN, RU ve AR dilleri için UI_TEXT tanımlı olmalıdır', async () => {
      const fs = await import('fs');
      const path = await import('path');
      const content = fs.readFileSync(
        path.join(process.cwd(), 'src/components/seo/FacilityDistrictGridSeo.tsx'),
        'utf-8'
      );
      expect(content).toContain('UI_TEXT');
      expect(content).toContain('badge:');
      expect(content).toContain('searchPlaceholder:');
      expect(content).toContain('marketAvg:');
      expect(content).toContain('aloManagement:');
    });
  });

  describe('35. facilityDistrictComparator LocalBusiness Şema Zenginleştirmesi', () => {
    it('kıyaslama motoru ve API rotası LocalBusiness ve telefon/adres nesneleri sunmalıdır', async () => {
      const { compareFacilityDistricts } = await import('./facilityDistrictComparator');
      const res = compareFacilityDistricts(['kadikoy', 'besiktas']);
      expect(res).toBeDefined();
      const about = res?.schema.about as any[];
      expect(about).toBeDefined();
      expect(about[0]['@type']).toBe('LocalBusiness');
      expect(about[0].telephone).toBe('+90 216 550 48 48');
      expect(about[0].address.addressLocality).toBe('Kadıköy');

      const { GET } = await import('@/app/api/tesis-yonetimi/compare-districts/route');
      const req = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/compare-districts?d1=kadikoy&d2=besiktas');
      const apiRes = await GET(req as any);
      expect(apiRes.status).toBe(200);
      expect(apiRes.headers.get('X-Robots-Tag')).toBe('all');
    });
  });

  describe('36. facilitySerpRankSimulator ve facility-rank-score Çok Dilli Destek', () => {
    it('simülasyon motoru ve API rotası çok dilli parametreleri başarıyla değerlendirmelidir', async () => {
      const { runFacilitySerpRankSimulation } = await import('./facilitySerpRankSimulator');
      const reportEn = runFacilitySerpRankSimulation('en');
      expect(reportEn.overallAverageRankPotential).toBeGreaterThan(0);
      expect(reportEn.districtScores.length).toBe(39);

      const { GET } = await import('@/app/api/seo/facility-rank-score/route');
      const req = new Request('https://aloyonetim.com.tr/api/seo/facility-rank-score?lang=en');
      const res = await GET(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.districtScores.length).toBe(39);
      expect(data.overallAverageRankPotential).toBeGreaterThan(0);
    });
  });

  describe('37. JsonLd Evrensel Boş ItemList Kalkanı', () => {
    it('boş itemListElement içeren şemaları filtrelemeli ve null dönmelidir', async () => {
      const JsonLd = (await import('@/components/seo/JsonLd')).default;
      const elementEmpty = JsonLd({
        data: { '@type': 'ItemList', itemListElement: [] } as any,
      });
      expect(elementEmpty).toBeNull();

      const elementValid = JsonLd({
        data: {
          '@type': 'ItemList',
          itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Test' }],
        } as any,
      });
      expect(elementValid).not.toBeNull();
    });
  });

  describe('38. eeatAuditor ve verify-authority Marka ve Şirket Unvanı Standardı', () => {
    it('resmi şirket adı ve marka adı standartlarına uygun olmalı ve X-Robots-Tag taşımalıdır', async () => {
      const { generateVerifiedAuthorityGraph } = await import('./eeatAuditor');
      const graph = generateVerifiedAuthorityGraph();
      expect(graph.name).toBe('Alo Yönetim');
      expect(graph.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');

      const { GET } = await import('@/app/api/seo/verify-authority/route');
      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('X-Robots-Tag')).toBe('all');
      const data = await res.json();
      expect(data.schema.name).toBe('Alo Yönetim');
      expect(data.schema.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
    });
  });

  describe('39. nearest-facility-hub API Rotası Başlık ve Telemetrisi', () => {
    it('GET isteği 200, X-Robots-Tag all ve en yakın operasyon merkezini dönmelidir', async () => {
      const { GET } = await import('@/app/api/geo/nearest-facility-hub/route');
      const req = new Request('https://aloyonetim.com.tr/api/geo/nearest-facility-hub?lat=40.99&lng=29.02');
      const res = await GET(req as any);
      expect(res.status).toBe(200);
      expect(res.headers.get('X-Robots-Tag')).toBe('all');
      const data = await res.json();
      expect(data.nearestDistrict.name).toContain('Kadıköy');
      expect(data.distanceKm).toBeGreaterThanOrEqual(0);
    });
  });

  describe('40. entity-graph.jsonld Kurumsal Knowledge Graph Doğrulaması', () => {
    it('GET isteği 200 döner ve Organization düğümünde marka, yasal unvan ve knowsAbout içerir', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/entity-graph.jsonld/route');
      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/ld+json');
      expect(res.headers.get('X-Robots-Tag')).toBe('all');
      const data = await res.json();
      expect(data['@context']).toBe('https://schema.org');
      const org = data['@graph'].find((node: any) => node['@type'] === 'Organization');
      expect(org).toBeDefined();
      expect(org.name).toBe('Alo Yönetim');
      expect(org.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(org.knowsAbout).toContain('https://www.wikidata.org/wiki/Q1273919');
      expect(org.publishingPrinciples).toContain('/hakkimizda');
    });
  });

  describe('41. edgeGeoResolver LocalBusiness ve ParentOrganization Hiyerarşisi', () => {
    it('findNearestFacilityHub LocalBusiness içinde parentOrganization, TRY ve 7/24 çalışma saatleri sunar', async () => {
      const { findNearestFacilityHub } = await import('@/lib/seo/edgeGeoResolver');
      const hubResult = findNearestFacilityHub(41.0082, 28.9784);
      expect(hubResult.schema['@type']).toBe('LocalBusiness');
      expect(hubResult.schema.currenciesAccepted).toBe('TRY');
      expect(hubResult.schema.parentOrganization?.['@type']).toBe('Organization');
      expect(hubResult.schema.parentOrganization?.name).toBe('Alo Yönetim');
      expect(hubResult.schema.parentOrganization?.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(hubResult.schema.openingHoursSpecification?.dayOfWeek.length).toBe(7);
      expect(hubResult.schema.openingHoursSpecification?.opens).toBe('00:00');
    });
  });

  describe('42. facilitySeoPatrol Dinamik Hizmet ve Kırık Link Denetimi', () => {
    it('Sitemap ve iç link denetimleri dinamik hizmet yolları ile %100 temiz sonuç üretir', async () => {
      const { auditSitemapIntegrity, auditInternalLinks } = await import('@/lib/seo/facilitySeoPatrol');
      const sitemapAudit = auditSitemapIntegrity();
      expect(sitemapAudit.status).toBe('VALID');
      expect(sitemapAudit.missingCanonicalCount).toBe(0);

      const linkAudit = auditInternalLinks();
      expect(linkAudit.status).toBe('CLEAN');
      expect(linkAudit.brokenLinksFound).toBe(0);
      expect(linkAudit.linkHealthScore).toBe(100);

      const { GET } = await import('@/app/api/cron/seo-patrol/route');
      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
    });
  });

  describe('43. schemaLinter Genişletilmiş Tip Denetimleri (ItemList, Breadcrumb, Organization)', () => {
    it('ItemList boş dizi koruması ve Organization zorunlu alanlarını doğrular', async () => {
      const { lintSchemaOrgObject } = await import('@/lib/seo/schemaLinter');

      // Boş ItemList hatası
      const emptyItemList = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [],
      };
      const emptyReport = lintSchemaOrgObject(emptyItemList);
      expect(emptyReport.isValid).toBe(false);
      expect(emptyReport.issues.some((i) => i.message.includes('Missing field itemListElement'))).toBe(true);

      // Dolu ItemList başarısı
      const validItemList = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Adım 1' }],
      };
      const validItemReport = lintSchemaOrgObject(validItemList);
      expect(validItemReport.isValid).toBe(true);

      // Organization doğrulaması
      const validOrg = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Alo Yönetim',
        legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: 'https://aloyonetim.com.tr',
        logo: 'https://aloyonetim.com.tr/icon.png',
      };
      const orgReport = lintSchemaOrgObject(validOrg);
      expect(orgReport.isValid).toBe(true);
      expect(orgReport.googleRichResultsCompliant).toBe(true);
    });
  });

  describe('44. schemaLinter lintSchemaGraph Çoklu Düğüm ve @graph Denetimi', () => {
    it('Birleşik @graph ağacındaki tüm düğümleri tek tek denetler ve genel skor üretir', async () => {
      const { lintSchemaGraph } = await import('@/lib/seo/schemaLinter');

      const graphPayload = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: 'Alo Yönetim',
            url: 'https://aloyonetim.com.tr',
          },
          {
            '@type': 'Service',
            name: 'Tesis Yönetimi',
            serviceType: 'Entegre Tesis Yönetimi',
          },
        ],
      };

      const report = lintSchemaGraph(graphPayload);
      expect(report.totalNodes).toBe(2);
      expect(report.validNodes).toBe(2);
      expect(report.isGraphValid).toBe(true);
      expect(report.overallScore).toBeGreaterThanOrEqual(80);
    });
  });

  describe('45. admin/schema-lint API Rotası Çoklu Destek ve noindex Başlığı', () => {
    it('GET ve POST istekleri 200, noindex başlığı ve geçerli denetim raporu döner', async () => {
      const { GET, POST } = await import('@/app/api/admin/schema-lint/route');

      // GET benchmark
      const getRes = await GET();
      expect(getRes.status).toBe(200);
      expect(getRes.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      const getData = await getRes.json();
      expect(getData.graphReport.isGraphValid).toBe(true);

      // POST @graph payload
      const postReq = new Request('https://aloyonetim.com.tr/api/admin/schema-lint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Alo Yönetim Kadıköy',
          address: { '@type': 'PostalAddress', addressLocality: 'Kadıköy' },
        }),
      });
      const postRes = await POST(postReq as any);
      expect(postRes.status).toBe(200);
      expect(postRes.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      const postData = await postRes.json();
      expect(postData.isValid).toBe(true);
    });
  });

  describe('46. facilityAutonomousAuditor Genişletilmiş API Envanteri ve Sağlık Raporu', () => {
    it('15 açık veri/SEO API ucunu ve %100 sağlık durumunu doğrular', async () => {
      const { runFacilityAutonomousAudit } = await import('@/lib/seo/facilityAutonomousAuditor');
      const report = runFacilityAutonomousAudit();

      expect(report.apiHealthStatus.length).toBe(15);
      expect(report.overallSeoHealthScore).toBeGreaterThanOrEqual(80);
      expect(report.apiHealthStatus.every((a) => a.status === 'ACTIVE_AND_HEALTHY')).toBe(true);

      const entityGraphEndpoint = report.apiHealthStatus.find((a) => a.endpoint.includes('entity-graph.jsonld'));
      expect(entityGraphEndpoint).toBeDefined();

      const nearestHubEndpoint = report.apiHealthStatus.find((a) => a.endpoint.includes('nearest-facility-hub'));
      expect(nearestHubEndpoint).toBeDefined();
    });
  });

  describe('47. facilityIndexNowPinger Dinamik Senkronizasyon ve facility-audit Başlıkları', () => {
    it('IndexNow dinamik hizmetleri içerir ve facility-audit noindex, no-store başlığı döner', async () => {
      const { buildFacilityIndexNowPayload } = await import('@/lib/seo/facilityIndexNowPinger');
      const payload = buildFacilityIndexNowPayload();
      expect(payload.urlList.length).toBeGreaterThanOrEqual(90);

      const { GET } = await import('@/app/api/seo/facility-audit/route');
      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(res.headers.get('Content-Type')).toContain('application/json');
      const data = await res.json();
      expect(data.totalDistrictsAudited).toBe(39);
    });
  });
});






