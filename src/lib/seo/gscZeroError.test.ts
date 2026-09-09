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
      const req = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/llm-facts.json');
      const res = await GET(req);
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
      expect(apiRes.headers.get('X-Robots-Tag')).toContain('all');
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
      expect(res.headers.get('X-Robots-Tag')).toContain('all');
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
      expect(res.headers.get('X-Robots-Tag')).toContain('all');
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
      expect(res.headers.get('X-Robots-Tag')).toContain('all');
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

  describe('48. dues-index.json Schema.org Dataset ve Açık Veri Doğrulaması', () => {
    it('Google Dataset Search standartlarında Dataset şeması ve CC-BY-SA lisansı sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/dues-index.json/route');
      const req = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dues-index.json');
      const res = await GET(req);
      expect(res.status).toBe(200);
      expect(res.headers.get('X-Robots-Tag')).toContain('all');
      expect(res.headers.get('Content-Type')).toContain('application/json');

      const data = await res.json();
      expect(data.schema).toBeDefined();
      expect(data.schema['@type']).toBe('Dataset');
      expect(data.schema.license).toBe('https://creativecommons.org/licenses/by-sa/4.0/');
      expect(data.schema.creator.name).toBe('Alo Yönetim');
      expect(data.schema.creator.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.schema.spatialCoverage.name).toBe('İstanbul');
      expect(data.schema.distribution[0].encodingFormat).toBe('application/json');
    });
  });

  describe('49. kmk-law-index.json TBMM Wikidata Bağı ve API Başlık Standardizasyonu', () => {
    it('TBMM Q640108 Wikidata bağını, voice-qa ve bot-analytics başlıklarını doğrular', async () => {
      // 1. kmk-law-index TBMM Wikidata ve X-Robots-Tag
      const { GET: getKmk } = await import('@/app/api/tesis-yonetimi/kmk-law-index.json/route');
      const kmkReq = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/kmk-law-index.json');
      const kmkRes = await getKmk(kmkReq);
      expect(kmkRes.status).toBe(200);
      expect(kmkRes.headers.get('X-Robots-Tag')).toContain('all');
      const kmkData = await kmkRes.json();
      expect(kmkData.schema.itemListElement[0].item.legislationPassedBy.sameAs).toContain('Q640108');

      // 2. voice-qa Content-Type
      const { GET: getVoice } = await import('@/app/api/tesis-yonetimi/voice-qa.json/route');
      const voiceReq = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/voice-qa.json');
      const voiceRes = await getVoice(voiceReq);
      expect(voiceRes.status).toBe(200);
      expect(voiceRes.headers.get('Content-Type')).toContain('application/json');

      // 3. bot-analytics noindex
      const { GET: getBot } = await import('@/app/api/seo/bot-analytics/route');
      const botRes = await getBot();
      expect(botRes.status).toBe(200);
      expect(botRes.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(botRes.headers.get('Content-Type')).toContain('application/json');
    });
  });

  describe('50. schemaMinifier Boş ItemList Koruması ve Script Güvenliği', () => {
    it('Boş ItemList nesnelerini tamamen budar ve < karakterini u003c ile maskeler', async () => {
      const { cleanJsonLd, minifyJsonLd } = await import('@/lib/seo/schemaMinifier');

      // 1. Boş ItemList budama
      const emptyItemList = { '@type': 'ItemList', itemListElement: [] };
      expect(cleanJsonLd(emptyItemList)).toBeNull();

      // 2. Dizi içinde boş ItemList ve geçerli şema
      const mixedArray = [
        { '@type': 'ItemList', itemListElement: [] },
        { '@type': 'Service', name: 'Entegre Tesis Yönetimi' },
      ];
      const cleanedArray = cleanJsonLd(mixedArray) as any[];
      expect(cleanedArray.length).toBe(1);
      expect(cleanedArray[0]['@type']).toBe('Service');

      // 3. XSS ve HTML Script etiket güvenliği (\u003c maskelemesi)
      const dirtyScriptText = {
        name: '</script><script>alert("xss")</script>',
      };
      const minified = minifyJsonLd(dirtyScriptText);
      expect(minified).not.toContain('</script>');
      expect(minified).toContain('\\u003c/script\\u003e');
    });
  });

  describe('51. admin/schema-lint API Sıkıştırma Telemetrisi', () => {
    it('GET ve POST isteklerinde şema sıkıştırma ve bayt tasarrufu telemetrisi döner', async () => {
      const { GET, POST } = await import('@/app/api/admin/schema-lint/route');

      // GET telemetrisi
      const getRes = await GET();
      const getData = await getRes.json();
      expect(getData.compression).toBeDefined();
      expect(getData.compression.savedBytes).toBeGreaterThan(0);
      expect(getData.compression.savingsPercentage).toBeGreaterThan(0);

      // POST telemetrisi
      const postReq = new Request('https://aloyonetim.com.tr/api/admin/schema-lint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Site ve Tesis Yönetimi',
          description: 'ISO 41001 standartlarında hizmetler.',
        }),
      });
      const postRes = await POST(postReq as any);
      const postData = await postRes.json();
      expect(postData.compression).toBeDefined();
      expect(postData.compression.minifiedBytes).toBeGreaterThan(0);
      expect(postData.compression.savedBytes).toBeGreaterThan(0);
    });
  });

  describe('52. facilityDistrictComparator Çok Dilli ve GeoCoordinates/parentOrganization Desteği', () => {
    it('TR, EN, RU, AR dillerinde lokalize özet ve GeoCoordinates/parentOrganization şeması üretmelidir', async () => {
      const { compareFacilityDistricts } = await import('./facilityDistrictComparator');

      // 1. Türkçe Varsayılan
      const resTr = compareFacilityDistricts(['kadikoy', 'besiktas'], 'tr');
      expect(resTr).toBeDefined();
      expect(resTr?.seoSummaryParagraph).toContain('İstanbul genelinde');
      expect(resTr?.schema.name).toContain('Tesis Yönetimi ve Aidat Karşılaştırması 2026');

      // 2. İngilizce
      const resEn = compareFacilityDistricts(['kadikoy', 'besiktas'], 'en');
      expect(resEn?.seoSummaryParagraph).toContain('Comparing facility management');
      expect(resEn?.schema.name).toContain('Facility Management & Dues Comparison 2026');

      // 3. Rusça
      const resRu = compareFacilityDistricts(['kadikoy', 'besiktas'], 'ru');
      expect(resRu?.seoSummaryParagraph).toContain('Сравнивая индексы');
      expect(resRu?.schema.name).toContain('Сравнение управления объектами');

      // 4. Arapça
      const resAr = compareFacilityDistricts(['kadikoy', 'besiktas'], 'ar');
      expect(resAr?.seoSummaryParagraph).toContain('مقارنة مؤشرات');
      expect(resAr?.schema.name).toContain('مقارنة إدارة المرافق والرسوم 2026');

      // 5. LocalBusiness Schema Zenginleştirmesi (Geo & parentOrganization)
      const about = resEn?.schema.about as any[];
      expect(about).toBeDefined();
      expect(about.length).toBe(2);

      const kadikoyBusiness = about[0];
      expect(kadikoyBusiness['@type']).toBe('LocalBusiness');
      expect(kadikoyBusiness.currenciesAccepted).toBe('TRY');
      expect(kadikoyBusiness.parentOrganization['@type']).toBe('Organization');
      expect(kadikoyBusiness.parentOrganization['@id']).toBe('https://aloyonetim.com.tr/#organization');
      expect(kadikoyBusiness.parentOrganization.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(kadikoyBusiness.geo['@type']).toBe('GeoCoordinates');
      expect(typeof kadikoyBusiness.geo.latitude).toBe('number');
      expect(typeof kadikoyBusiness.geo.longitude).toBe('number');

      // District modeline geo aktarımı kontrolü
      expect(resEn?.districts[0].geo?.lat).toBeDefined();
      expect(resEn?.districts[0].geo?.lng).toBeDefined();
    });
  });

  describe('53. compare-districts API Çok Dilli İstek Desteği', () => {
    it('lang parametresi ile yapılan API isteklerinde ilgili dilde özet ve şema döndürmelidir', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/compare-districts/route');

      // İngilizce API isteği
      const reqEn = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/compare-districts?d1=kadikoy&d2=besiktas&lang=en');
      const resEn = await GET(reqEn as any);
      expect(resEn.status).toBe(200);
      const dataEn = await resEn.json();

      expect(dataEn.seoSummaryParagraph).toContain('Comparing facility management');
      expect(dataEn.schema.name).toContain('Facility Management & Dues Comparison 2026');
      expect(dataEn.schema.about[0].geo.latitude).toBeDefined();
      expect(dataEn.schema.about[0].parentOrganization.name).toBe('Alo Yönetim');

      // Arapça API isteği
      const reqAr = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/compare-districts?d1=kadikoy&d2=besiktas&lang=ar');
      const resAr = await GET(reqAr as any);
      expect(resAr.status).toBe(200);
      const dataAr = await resAr.json();

      expect(dataAr.seoSummaryParagraph).toContain('مقارنة مؤشرات');
      expect(dataAr.schema.name).toContain('مقارنة إدارة المرافق والرسوم 2026');
    });
  });

  describe('54. facilityTopicGraph Çok Dilli Şema ve OfferCatalog/AggregateRating Standartları', () => {
    it('TR, EN, RU, AR dillerinde yerelleştirilmiş Service şeması ve geçerli Offer/Rating alanları üretmelidir', () => {
      // 1. Türkçe Varsayılan
      const graphTr = generateFacilityManagementGraph('tr') as any;
      expect(graphTr.name).toBe('Alo Yönetim Profesyonel Site ve Entegre Tesis Yönetimi');
      expect(graphTr.serviceType).toBe('Profesyonel Site ve Entegre Tesis Yönetimi');
      expect(graphTr.hasOfferCatalog.name).toBe('Alo Yönetim Tesis Yönetimi Paketleri ve Sektörel Çözümleri');

      // 2. İngilizce
      const graphEn = generateFacilityManagementGraph('en') as any;
      expect(graphEn.name).toBe('Alo Yönetim Professional Property & Integrated Facility Management');
      expect(graphEn.serviceType).toBe('Professional Property & Integrated Facility Management');
      expect(graphEn.hasOfferCatalog.name).toBe('Alo Yönetim Facility Management Packages and Sectoral Solutions');
      expect(graphEn.url).toContain('/en/hizmetler/tesis-yonetimi');

      // 3. Rusça
      const graphRu = generateFacilityManagementGraph('ru') as any;
      expect(graphRu.name).toContain('Профессиональное Управление');
      expect(graphRu.hasOfferCatalog.name).toContain('Пакеты услуг');

      // 4. Arapça
      const graphAr = generateFacilityManagementGraph('ar') as any;
      expect(graphAr.name).toContain('إدارة العقارات');
      expect(graphAr.hasOfferCatalog.name).toContain('باقات وحلول');

      // 5. OfferCatalog Standardı (priceCurrency & availability)
      expect(graphTr.hasOfferCatalog.itemListElement.length).toBe(5);
      for (const offer of graphTr.hasOfferCatalog.itemListElement) {
        expect(offer['@type']).toBe('Offer');
        expect(offer.priceCurrency).toBe('TRY');
        expect(offer.availability).toBe('https://schema.org/InStock');
      }

      // 6. AggregateRating Standardı (reviewCount & ratingCount)
      expect(graphTr.aggregateRating).toBeDefined();
      expect(graphTr.aggregateRating.ratingValue).toBe('4.9');
      expect(graphTr.aggregateRating.reviewCount).toBe('340');
      expect(graphTr.aggregateRating.ratingCount).toBe('340');
      expect(graphEn.aggregateRating.itemReviewed.name).toBe(graphEn.name);
    });
  });

  describe('55. dues-index.json Google Dataset Search Zenginleştirmesi & Side Filtreleme', () => {
    it('Dataset şemasında keywords, temporalCoverage, variableMeasured ve geo döner; side filtresini uygular', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/dues-index.json/route');

      // 1. Varsayılan (tüm İstanbul)
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dues-index.json');
      const resAll = await GET(reqAll);
      const dataAll = await resAll.json();
      expect(dataAll.schema.keywords).toBeDefined();
      expect(dataAll.schema.keywords).toContain('tesis yönetimi');
      expect(dataAll.schema.temporalCoverage).toBe('2026');
      expect(dataAll.schema.variableMeasured.length).toBeGreaterThanOrEqual(4);
      expect(dataAll.districts.length).toBe(39);
      expect(dataAll.districts[0].geo['@type']).toBe('GeoCoordinates');
      expect(typeof dataAll.districts[0].geo.latitude).toBe('number');

      // 2. Anadolu Yakası Filtrelemesi
      const reqAnadolu = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dues-index.json?side=anadolu');
      const resAnadolu = await GET(reqAnadolu);
      const dataAnadolu = await resAnadolu.json();
      expect(dataAnadolu.istanbulSummary.totalDistricts).toBe(14);
      expect(dataAnadolu.districts.length).toBe(14);
      expect(dataAnadolu.districts.every((d: any) => d.side === 'Anadolu Yakası')).toBe(true);
      expect(dataAnadolu.istanbulSummary.filteredSide).toBe('anadolu');

      // 3. Avrupa Yakası Filtrelemesi
      const reqAvrupa = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dues-index.json?side=avrupa');
      const resAvrupa = await GET(reqAvrupa);
      const dataAvrupa = await resAvrupa.json();
      expect(dataAvrupa.istanbulSummary.totalDistricts).toBe(25);
      expect(dataAvrupa.districts.length).toBe(25);
      expect(dataAvrupa.districts.every((d: any) => d.side === 'Avrupa Yakası')).toBe(true);
    });
  });

  describe('56. llm-facts.json Çok Dilli AI Fact-Sheet & Genişletilmiş API Dizini', () => {
    it('linkedApis içinde kmkLawIndex ve facilityAuditApi sunar; lang=en ile İngilizce fact-sheet döndürür', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/llm-facts.json/route');

      // 1. Varsayılan Türkçe ve Genişletilmiş API Grafı
      const reqTr = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/llm-facts.json');
      const resTr = await GET(reqTr);
      const dataTr = await resTr.json();
      expect(dataTr.linkedApis.kmkLawIndex).toBe('https://aloyonetim.com.tr/api/tesis-yonetimi/kmk-law-index.json');
      expect(dataTr.linkedApis.facilityAuditApi).toBe('https://aloyonetim.com.tr/api/seo/facility-audit');
      expect(dataTr.coreService.canonicalName).toBe('Entegre Tesis ve Mülk Yönetimi');

      // 2. Çok Dilli İngilizce AI Fact-Sheet İstegi
      const reqEn = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/llm-facts.json?lang=en');
      const resEn = await GET(reqEn);
      const dataEn = await resEn.json();
      expect(dataEn.coreService.canonicalName).toBe('Integrated Facility & Property Management');
      expect(dataEn.coreService.targetKeyword).toBe('facility management istanbul');
      expect(dataEn.coreService.canonicalUrl).toBe('https://aloyonetim.com.tr/en/hizmetler/tesis-yonetimi');
      expect(dataEn.coreService.slaCommitment).toContain('45 minutes');
      expect(dataEn.coreService.activeCoverage).toContain('39 Districts');
    });
  });

  describe('57. facilityAiSnippetEngine Çok Dilli Destek & Schema Zenginleştirmesi', () => {
    it('TR ve EN dillerinde snippet üretir ve DefinedTermSet şeması sunar', async () => {
      const { generateFacilityAiSnippets } = await import('./facilityAiSnippetEngine');

      // 1. Türkçe Varsayılan
      const trPayload = generateFacilityAiSnippets('tr');
      expect(trPayload.totalSnippets).toBe(7);
      expect(trPayload.snippets[0].queryIntent).toContain('Tesis Yönetimi');
      expect(trPayload.schema).toBeDefined();
      expect(trPayload.schema?.['@type']).toBe('DefinedTermSet');
      expect(trPayload.schema?.name).toContain('Tesis Yönetimi Bilgi ve AI Overviews');

      // 2. İngilizce AI Overviews
      const enPayload = generateFacilityAiSnippets('en');
      expect(enPayload.totalSnippets).toBe(7);
      expect(enPayload.snippets[0].queryIntent).toContain('What is Facility Management');
      expect(enPayload.snippets[0].directSummaryText).toContain('Facility management is');
      expect(enPayload.snippets[0].citationAnchorUrl).toContain('/en/hizmetler/tesis-yonetimi');
      expect(enPayload.schema?.['@type']).toBe('DefinedTermSet');
      expect(enPayload.schema?.name).toContain('Facility Management Knowledge');
    });
  });

  describe('58. ai-snippets.json ve voice-qa.json API Çok Dilli İstek Desteği', () => {
    it('ai-snippets.json ve voice-qa.json uç noktaları lang parametresine göre yerel dilde yanıt verir', async () => {
      // 1. ai-snippets.json İngilizce
      const { GET: getAiSnippets } = await import('@/app/api/tesis-yonetimi/ai-snippets.json/route');
      const aiReq = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/ai-snippets.json?lang=en');
      const aiRes = await getAiSnippets(aiReq);
      expect(aiRes.status).toBe(200);
      const aiData = await aiRes.json();
      expect(aiData.totalSnippets).toBe(7);
      expect(aiData.snippets[0].queryIntent).toContain('What is Facility Management');
      expect(aiData.schema['@type']).toBe('DefinedTermSet');

      // 2. voice-qa.json İngilizce
      const { GET: getVoice } = await import('@/app/api/tesis-yonetimi/voice-qa.json/route');
      const voiceReq = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/voice-qa.json?lang=en');
      const voiceRes = await getVoice(voiceReq);
      expect(voiceRes.status).toBe(200);
      const voiceData = await voiceRes.json();
      expect(voiceData.qaCollection.length).toBeGreaterThan(0);
      expect(voiceData.qaCollection[0].schema.inLanguage).toBe('en');
      expect(voiceData.qaCollection[0].schema['@type']).toBe('SpeakableSpecification');
    });
  });

  describe('59. legal-precedents.json Yargıtay Wikidata (Q1549429) & KMK Madde Filtreleme', () => {
    it('Legislation şemasında Yargıtay Wikidata bağı (Q1549429) döner; X-Robots-Tag all ve article filtresini sağlar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/legal-precedents.json/route');

      // 1. Varsayılan tüm emsal kararlar ve Yargıtay Otorite bağı
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-precedents.json');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('X-Robots-Tag')).toContain('all');
      expect(resAll.headers.get('Content-Type')).toContain('application/json');

      const dataAll = await resAll.json();
      expect(dataAll.precedents.length).toBeGreaterThanOrEqual(4);
      expect(dataAll.schema['@type']).toBe('ItemList');

      const firstItem = dataAll.schema.itemListElement[0].item;
      expect(firstItem['@type']).toBe('Legislation');
      expect(firstItem.inLanguage).toBe('tr');
      expect(firstItem.legislationPassedBy).toBeDefined();
      expect(firstItem.legislationPassedBy.name).toBe('T.C. Yargıtay Başkanlığı');
      expect(firstItem.legislationPassedBy.sameAs).toBe('https://www.wikidata.org/wiki/Q1549429');

      // 2. KMK Madde 20 Filtresi (Aidat Gecikme ve Asansör)
      const reqArt20 = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-precedents.json?article=20');
      const resArt20 = await GET(reqArt20);
      const dataArt20 = await resArt20.json();
      expect(dataArt20.metadata.filteredArticle).toBe('20');
      expect(dataArt20.precedents.length).toBeGreaterThan(0);
      expect(dataArt20.precedents.every((p: any) => p.kmkArticle.includes('20'))).toBe(true);

      // 3. KMK Madde 19 Filtresi (Cam Balkon)
      const reqArt19 = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-precedents.json?article=19');
      const resArt19 = await GET(reqArt19);
      const dataArt19 = await resArt19.json();
      expect(dataArt19.metadata.filteredArticle).toBe('19');
      expect(dataArt19.precedents.length).toBe(1);
      expect(dataArt19.precedents[0].subject).toContain('Cam Balkon');
    });
  });

  describe('60. dictionary.json Dinamik Arama, Kategori Filtreleme & DefinedTermSet Şeması', () => {
    it('Genel çağrıda DefinedTermSet şeması, X-Robots-Tag all ve zengin publisher bilgisi döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/dictionary.json/route');

      // 1. Genel parametresiz çağrı
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dictionary.json');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('X-Robots-Tag')).toContain('all');
      expect(resAll.headers.get('Content-Type')).toContain('application/json');

      const dataAll = await resAll.json();
      expect(dataAll.metadata.totalTerms).toBeGreaterThanOrEqual(14);
      expect(dataAll.terms.length).toBe(dataAll.metadata.totalTerms);
      expect(dataAll.schema['@type']).toBe('DefinedTermSet');
      expect(dataAll.schema.publisher.name).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataAll.schema.publisher.knowsAbout).toContain('Kat Mülkiyeti Kanunu');
      expect(dataAll.schema.hasDefinedTerm.length).toBe(dataAll.terms.length);

      // Her terimin DefinedTerm şeması ve wikidataUri bağı olmalı
      const sampleTerm = dataAll.schema.hasDefinedTerm.find((t: any) => t.termCode === 'site-yonetimi');
      expect(sampleTerm).toBeDefined();
      expect(sampleTerm['@type']).toBe('DefinedTerm');
      expect(sampleTerm.sameAs).toBe('https://www.wikidata.org/wiki/Q108846399');

      // 2. Kategori filtresi: ?category=Hukuk
      const reqCat = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dictionary.json?category=Hukuk');
      const resCat = await GET(reqCat);
      const dataCat = await resCat.json();
      expect(dataCat.metadata.appliedFilter.category).toBe('Hukuk');
      expect(dataCat.terms.length).toBeGreaterThan(0);
      expect(dataCat.terms.every((t: any) => t.category.includes('Hukuk'))).toBe(true);
      expect(dataCat.schema.hasDefinedTerm.length).toBe(dataCat.terms.length);

      // 3. Arama sorgusu filtresi: ?q=aidat
      const reqQ = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dictionary.json?q=aidat');
      const resQ = await GET(reqQ);
      const dataQ = await resQ.json();
      expect(dataQ.metadata.appliedFilter.q).toBe('aidat');
      expect(dataQ.terms.length).toBeGreaterThan(0);
      expect(dataQ.terms.every((t: any) =>
        t.name.toLowerCase().includes('aidat') ||
        t.description.toLowerCase().includes('aidat') ||
        (t.legalBasis && t.legalBasis.toLowerCase().includes('aidat'))
      )).toBe(true);

      // 4. Tekil terim filtresi: ?term=isletme-projesi
      const reqTerm = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dictionary.json?term=isletme-projesi');
      const resTerm = await GET(reqTerm);
      const dataTerm = await resTerm.json();
      expect(dataTerm.metadata.totalFiltered).toBe(1);
      expect(dataTerm.terms[0].termCode).toBe('isletme-projesi');
      expect(dataTerm.schema.hasDefinedTerm[0].sameAs).toBe('https://www.wikidata.org/wiki/Q41267');
    });
  });

  describe('61. facilityTopicGraph 8 Alt Hizmet & Akreditasyon Wikidata Otorite Doğrulaması', () => {
    it('isRelatedTo altındaki 8 alt servisin ve TSE akreditasyonunun resmi Wikidata bağlantılarını doğrular', async () => {
      const { generateFacilityManagementGraph } = await import('@/lib/seo/facilityTopicGraph');

      const graph = generateFacilityManagementGraph('tr') as any;

      // 8 alt hizmetin hepsi sameAs Wikidata URI içermelidir
      expect(graph.isRelatedTo).toHaveLength(8);
      graph.isRelatedTo.forEach((subService: any) => {
        expect(subService['@type']).toBe('Service');
        expect(subService.sameAs).toBeDefined();
        expect(subService.sameAs).toMatch(/^https:\/\/www\.wikidata\.org\/wiki\/Q\d+/);
      });

      // Özel Güvenlik Q11024344
      const securityService = graph.isRelatedTo.find((s: any) => s.url.includes('/guvenlik-yonetimi'));
      expect(securityService.sameAs).toBe('https://www.wikidata.org/wiki/Q11024344');

      // TSE HYB 12850 Belgesi Q12812282
      const tseCredential = graph.hasCredential.find((c: any) => c.name.includes('TSE HYB 12850'));
      expect(tseCredential).toBeDefined();
      expect(tseCredential.sameAs).toBe('https://www.wikidata.org/wiki/Q12812282');
    });
  });

  describe('62. benchmark.json Google Dataset Search Şeması & Bölge Filtreleme', () => {
    it('Google Dataset Search standartlarında Dataset şeması, CC-BY-SA lisansı ve dinamik ilçe filtresi sağlar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/benchmark.json/route');

      // 1. Genel parametresiz çağrı
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/benchmark.json');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('X-Robots-Tag')).toContain('all');
      expect(resAll.headers.get('X-Dataset-Name')).toBe('Istanbul-Facility-Benchmark-Index');

      const dataAll = await resAll.json();
      expect(dataAll['@type']).toBe('Dataset');
      expect(dataAll.license).toBe('https://creativecommons.org/licenses/by-sa/4.0/');
      expect(dataAll.creator.name).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataAll.creator.telephone).toBe('+90 216 550 48 48');
      expect(dataAll.spatialCoverage.name).toBe('İstanbul, Türkiye');
      expect(dataAll.spatialCoverage.geo.latitude).toBe(41.0082);
      expect(dataAll.temporalCoverage).toBe('2026');
      expect(dataAll.data.districts.length).toBe(39);

      // 2. Anadolu Yakası Filtresi (?side=anadolu)
      const reqAnadolu = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/benchmark.json?side=anadolu');
      const resAnadolu = await GET(reqAnadolu);
      const dataAnadolu = await resAnadolu.json();
      expect(dataAnadolu.data.appliedFilter.side).toBe('anadolu');
      expect(dataAnadolu.data.districts.length).toBe(14);
      expect(dataAnadolu.data.districts.every((d: any) => d.side === 'Anadolu')).toBe(true);

      // 3. Tekil İlçe Filtresi (?district=kadikoy)
      const reqKadikoy = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/benchmark.json?district=kadikoy');
      const resKadikoy = await GET(reqKadikoy);
      const dataKadikoy = await resKadikoy.json();
      expect(dataKadikoy.data.appliedFilter.district).toBe('kadikoy');
      expect(dataKadikoy.data.districts.length).toBe(1);
      expect(dataKadikoy.data.districts[0].districtSlug).toBe('kadikoy');
    });
  });

  describe('63. faq.json FAQPage Şeması, Kategori Grubu ve Arama Filtreleme', () => {
    it('FAQPage Schema.org nesnesi, inLanguage tr-TR ve dinamik group/q filtreleme sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/faq.json/route');

      // 1. Genel parametresiz çağrı
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/faq.json');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('X-Robots-Tag')).toContain('all');

      const dataAll = await resAll.json();
      expect(dataAll.meta.totalQuestions).toBeGreaterThanOrEqual(30);
      expect(dataAll.faqs.length).toBe(dataAll.meta.totalQuestions);
      expect(dataAll.jsonLd['@type']).toBe('FAQPage');
      expect(dataAll.jsonLd.inLanguage).toBe('tr-TR');
      expect(dataAll.jsonLd.mainEntity.length).toBe(dataAll.faqs.length);

      // 2. Kategori Grubu Filtresi (?group=maliyet)
      const reqMaliyet = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/faq.json?group=maliyet');
      const resMaliyet = await GET(reqMaliyet);
      const dataMaliyet = await resMaliyet.json();
      expect(dataMaliyet.meta.appliedFilter.group).toBe('maliyet');
      expect(dataMaliyet.faqs.length).toBeGreaterThan(0);
      expect(dataMaliyet.faqs.every((f: any) => f.group === 'maliyet')).toBe(true);
      expect(dataMaliyet.jsonLd.mainEntity.length).toBe(dataMaliyet.faqs.length);

      // 3. Metin Arama Filtresi (?q=aidat)
      const reqAidat = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/faq.json?q=aidat');
      const resAidat = await GET(reqAidat);
      const dataAidat = await resAidat.json();
      expect(dataAidat.meta.appliedFilter.q).toBe('aidat');
      expect(dataAidat.faqs.length).toBeGreaterThan(0);
      expect(dataAidat.faqs.every((f: any) =>
        f.question.toLowerCase().includes('aidat') ||
        f.answer.toLowerCase().includes('aidat')
      )).toBe(true);
      expect(dataAidat.jsonLd.mainEntity.length).toBe(dataAidat.faqs.length);
    });
  });

  describe('64. knowledge.json Semantik Bilgi Bankası Otoritesi & API Kataloğu', () => {
    it('DefinedTerm şemasında kurumsal NAP, Wikidata subServices ve API envanteri sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/knowledge.json/route');

      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('X-Robots-Tag')).toContain('all');
      expect(res.headers.get('Content-Type')).toContain('application/ld+json');

      const data = await res.json();
      expect(data['@type']).toBe('DefinedTerm');
      expect(data.provider.name).toBe('Alo Yönetim');
      expect(data.provider.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.provider.telephone).toBe('+90 216 550 48 48');
      expect(data.provider.knowsAbout).toContain('634 Sayılı Kat Mülkiyeti Kanunu (KMK)');

      // subServices 6 hizmetin tamamında Wikidata URI (sameAs) olmalı
      expect(data.subServices.length).toBe(6);
      data.subServices.forEach((service: any) => {
        expect(service['@type']).toBe('Service');
        expect(service.sameAs).toBeDefined();
        expect(service.sameAs).toMatch(/^https:\/\/www\.wikidata\.org\/wiki\/Q\d+/);
      });

      // API Envanteri doğrulaması
      expect(data.apiEndpoints).toBeDefined();
      expect(data.apiEndpoints.dictionary).toContain('/api/tesis-yonetimi/dictionary.json');
      expect(data.apiEndpoints.definitions).toContain('/api/tesis-yonetimi/definitions.json');
      expect(data.apiEndpoints.legalPrecedents).toContain('/api/tesis-yonetimi/legal-precedents.json');
      expect(data.apiEndpoints.aiSnippets).toContain('/api/tesis-yonetimi/ai-snippets.json');
      expect(data.apiEndpoints.voiceQa).toContain('/api/tesis-yonetimi/voice-qa.json');
    });
  });

  describe('65. definitions.json Terimler Sözlüğü Dinamik Harf & Arama Filtrelemesi', () => {
    it('DefinedTermSet şeması, inLanguage tr-TR, harf ve arama filtresi sağlar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/definitions.json/route');

      // 1. Genel parametresiz çağrı
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/definitions.json');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('X-Robots-Tag')).toContain('all');
      expect(resAll.headers.get('Content-Type')).toContain('application/ld+json');

      const dataAll = await resAll.json();
      expect(dataAll['@type']).toBe('DefinedTermSet');
      expect(dataAll.inLanguage).toBe('tr-TR');
      expect(dataAll.publisher.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataAll.publisher.telephone).toBe('+90 216 550 48 48');
      expect(dataAll.numberOfItems).toBeGreaterThanOrEqual(10);
      expect(dataAll.hasDefinedTerm.length).toBe(dataAll.numberOfItems);

      // 2. Harfe göre filtre (?letter=A)
      const reqA = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/definitions.json?letter=A');
      const resA = await GET(reqA);
      const dataA = await resA.json();
      expect(dataA.numberOfItems).toBeGreaterThan(0);
      expect(dataA.hasDefinedTerm.every((t: any) => t.name.startsWith('A') || t.name.startsWith('a'))).toBe(true);

      // 3. Arama filtresi (?q=aidat)
      const reqQ = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/definitions.json?q=aidat');
      const resQ = await GET(reqQ);
      const dataQ = await resQ.json();
      expect(dataQ.numberOfItems).toBeGreaterThan(0);
      expect(dataQ.hasDefinedTerm.every((t: any) =>
        t.name.toLowerCase().includes('aidat') ||
        t.description.toLowerCase().includes('aidat')
      )).toBe(true);
    });
  });

  describe('66. voice-knowledge.json Sesli Arama, Speakable Şeması & Intent Filtreleme', () => {
    it('SpeakableSpecification şeması, inLanguage ve niyet bazlı soru filtreleme sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/voice-knowledge.json/route');

      // 1. Genel parametresiz çağrı
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/voice-knowledge.json');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('X-Robots-Tag')).toContain('all');
      expect(resAll.headers.get('X-Voice-Search-Protocol')).toBe('Speakable-v1');

      const dataAll = await resAll.json();
      expect(dataAll.totalQuestionsCount).toBeGreaterThanOrEqual(5);
      expect(dataAll.speakableSchemaJsonLd['@type']).toBe('QAPage');
      expect(dataAll.speakableSchemaJsonLd.inLanguage).toBe('tr');
      expect(dataAll.speakableSchemaJsonLd.speakable['@type']).toBe('SpeakableSpecification');
      expect(dataAll.speakableSchemaJsonLd.speakable.inLanguage).toBe('tr');

      const firstAnswer = dataAll.speakableSchemaJsonLd.mainEntity[0].acceptedAnswer;
      expect(firstAnswer.author.telephone).toBe('+90 216 550 48 48');
      expect(firstAnswer.author.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');

      // 2. Hukuki Niyet Filtresi (?intent=legal)
      const reqLegal = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/voice-knowledge.json?intent=legal');
      const resLegal = await GET(reqLegal);
      const dataLegal = await resLegal.json();
      expect(dataLegal.appliedIntent).toBe('legal');
      expect(dataLegal.questions.length).toBeGreaterThan(0);
      expect(dataLegal.questions.every((q: any) => q.queryIntent === 'legal')).toBe(true);
      expect(dataLegal.totalQuestionsCount).toBe(dataLegal.questions.length);
    });
  });

  describe('67. geo-feed.xml GeoRSS Bölge Beslemesi & X-Robots-Tag Güvencesi', () => {
    it('GeoRSS XML şeması, georss:point etiketleri, X-Robots-Tag all ve ?side=anadolu filtresi sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/geo-feed.xml/route');

      // 1. Genel parametresiz çağrı
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/geo-feed.xml');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('Content-Type')).toContain('application/xml');
      expect(resAll.headers.get('X-Robots-Tag')).toContain('all');

      const xmlAll = await resAll.text();
      expect(xmlAll).toContain('<rss version="2.0"');
      expect(xmlAll).toContain('xmlns:georss="http://www.georss.org/georss"');
      expect(xmlAll).toContain('<georss:point>');
      expect(xmlAll).toContain('<tesis:districtSlug>kadikoy</tesis:districtSlug>');
      expect(xmlAll).toContain('<tesis:districtSlug>besiktas</tesis:districtSlug>');

      // 2. Anadolu Yakası Filtresi (?side=anadolu)
      const reqAnadolu = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/geo-feed.xml?side=anadolu');
      const resAnadolu = await GET(reqAnadolu);
      expect(resAnadolu.status).toBe(200);

      const xmlAnadolu = await resAnadolu.text();
      expect(xmlAnadolu).toContain('<tesis:districtSlug>kadikoy</tesis:districtSlug>');
      expect(xmlAnadolu).toContain('<tesis:districtSlug>uskudar</tesis:districtSlug>');
      expect(xmlAnadolu).not.toContain('<tesis:districtSlug>besiktas</tesis:districtSlug>');
      expect(xmlAnadolu).not.toContain('<tesis:districtSlug>sisli</tesis:districtSlug>');
    });
  });

  describe('68. legal-templates Açık Veri Şablonları, DigitalDocument Şeması & Arama Filtreleme', () => {
    it('DataCatalog şeması, inLanguage tr-TR, HowToStep adımları ve ?id= / ?q= filtrelerini sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/legal-templates/route');

      // 1. Genel parametresiz çağrı
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-templates');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('X-Robots-Tag')).toContain('all');
      expect(resAll.headers.get('Content-Type')).toContain('application/json');

      const dataAll = await resAll.json();
      expect(dataAll['@type']).toBe('DataCatalog');
      expect(dataAll.inLanguage).toBe('tr-TR');
      expect(dataAll.provider.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataAll.provider.telephone).toBe('+90 216 550 48 48');
      expect(dataAll.templates.length).toBeGreaterThanOrEqual(4);
      expect(dataAll.dataset.length).toBe(dataAll.templates.length);

      // 2. ID ile tekil şablon filtresi (?id=isletme-projesi-sablonu)
      const reqId = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-templates?id=isletme-projesi-sablonu');
      const resId = await GET(reqId);
      const dataId = await resId.json();
      expect(dataId.appliedFilter.id).toBe('isletme-projesi-sablonu');
      expect(dataId.templates.length).toBe(1);
      expect(dataId.dataset[0]['@type']).toBe('DigitalDocument');
      expect(dataId.dataset[0].hasPart.length).toBeGreaterThanOrEqual(3);
      expect(dataId.dataset[0].hasPart[0]['@type']).toBe('HowToStep');

      // 3. Arama sorgusu filtresi (?q=aidat)
      const reqQ = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-templates?q=aidat');
      const resQ = await GET(reqQ);
      const dataQ = await resQ.json();
      expect(dataQ.appliedFilter.q).toBe('aidat');
      expect(dataQ.templates.length).toBeGreaterThan(0);
      expect(dataQ.templates.every((t: any) =>
        t.title.toLowerCase().includes('aidat') ||
        t.description.toLowerCase().includes('aidat') ||
        t.legalBasis.toLowerCase().includes('aidat')
      )).toBe(true);
    });
  });

  describe('69. calculate-budget API Bütçe Simülasyonu & PriceSpecification Şeması', () => {
    it('GET ve POST isteklerinde PriceSpecification nesnesi ve X-Robots-Tag all döner', async () => {
      const { GET, POST } = await import('@/app/api/tesis-yonetimi/calculate-budget/route');

      // 1. GET hesaplama
      const reqGet = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/calculate-budget?units=50&facilityType=site&district=kadikoy');
      const resGet = await GET(reqGet as any);
      expect(resGet.status).toBe(200);
      expect(resGet.headers.get('X-Robots-Tag')).toContain('all');

      const dataGet = await resGet.json();
      expect(dataGet.priceSpecification).toBeDefined();
      expect(dataGet.priceSpecification['@type']).toBe('PriceSpecification');
      expect(dataGet.priceSpecification.priceCurrency).toBe('TRY');
      expect(dataGet.priceSpecification.price).toBeGreaterThan(0);
      expect(dataGet.schema['@type']).toBe('CalculateAction');

      // 2. POST hesaplama
      const reqPost = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/calculate-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ units: 80, facilityType: 'residence', district: 'besiktas' }),
      });
      const resPost = await POST(reqPost as any);
      expect(resPost.status).toBe(200);
      expect(resPost.headers.get('X-Robots-Tag')).toContain('all');

      const dataPost = await resPost.json();
      expect(dataPost.priceSpecification).toBeDefined();
      expect(dataPost.priceSpecification['@type']).toBe('PriceSpecification');
      expect(dataPost.priceSpecification.price).toBeGreaterThan(0);
    });
  });

  describe('70. rfp-generator API DigitalDocument Şeması, Kurumsal NAP ve X-Robots-Tag', () => {
    it('GET ve POST isteklerinde DigitalDocument şeması, NAP bilgileri ve X-Robots-Tag all döner', async () => {
      const { GET, POST } = await import('@/app/api/tesis-yonetimi/rfp-generator/route');

      // 1. GET İsteği
      const reqGet = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/rfp-generator?facilityName=Kalamis+Marina+Sitesi&units=120&blocks=4&district=kadikoy');
      const resGet = await GET(reqGet as any);
      expect(resGet.status).toBe(200);
      expect(resGet.headers.get('Content-Type')).toContain('application/json');
      expect(resGet.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resGet.headers.get('X-Robots-Tag')).toContain('all');

      const dataGet = await resGet.json();
      expect(dataGet.facilityName).toBe('Kalamis Marina Sitesi');
      expect(dataGet.units).toBe(120);
      expect(dataGet.blocks).toBe(4);
      expect(dataGet.sections.length).toBeGreaterThanOrEqual(4);

      // Schema.org DigitalDocument & Kurumsal NAP kontrolleri
      expect(dataGet.schema['@type']).toBe('DigitalDocument');
      expect(dataGet.schema.inLanguage).toBe('tr-TR');
      expect(dataGet.schema.publisher['@type']).toBe('Organization');
      expect(dataGet.schema.publisher.name).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataGet.schema.publisher.telephone).toBe('+90 216 550 48 48');
      expect(dataGet.schema.publisher.logo).toContain('/images/logo.png');

      // 2. POST İsteği
      const reqPost = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/rfp-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facilityName: 'Akatlar Konakları',
          units: 45,
          blocks: 3,
          district: 'besiktas',
          services: ['guvenlik', 'temizlik', 'teknik'],
        }),
      });
      const resPost = await POST(reqPost as any);
      expect(resPost.status).toBe(200);
      expect(resPost.headers.get('X-Robots-Tag')).toContain('all');

      const dataPost = await resPost.json();
      expect(dataPost.facilityName).toBe('Akatlar Konakları');
      expect(dataPost.districtName).toBe('Beşiktaş');
      expect(dataPost.schema['@type']).toBe('DigitalDocument');
      expect(dataPost.fullText).toContain('Akatlar Konakları');
    });
  });

  describe('71. authority-corpus.json Master Knowledge Corpus Bütünlüğü ve CORS/Robots Başlıkları', () => {
    it('GET isteğinde ISO 41001 ve KMK 634 külliyatı, CORS ve zengin robots başlıkları döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/authority-corpus.json/route');

      const req = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/authority-corpus.json');
      const res = await GET(req);
      expect(res.status).toBe(200);
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('X-Topical-Authority')).toContain('ISO 41001 & KMK 634');
      expect(res.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const corpus = await res.json();
      expect(corpus.protocolVersion).toBeDefined();
      expect(corpus.authorityEntity.name).toBe('Alo Yönetim');
      expect(corpus.authorityEntity.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(corpus.authorityEntity.telephone).toBe('+90 216 550 48 48');
      expect(corpus.authorityEntity.certifications.length).toBeGreaterThanOrEqual(5);

      // Yasal Çerçeve ve İlçe Matrisi Doğrulaması
      expect(corpus.legalFramework.kmk634Articles.length).toBeGreaterThanOrEqual(5);
      expect(corpus.districtMatrix.length).toBeGreaterThan(0);
      expect(corpus.provenMetrics.activeFacilityPortfolioCount).toBeGreaterThan(0);
    });
  });

  describe('72. compare-districts API İlçe Karşılaştırma, Table Şeması ve Kurumsal NAP', () => {
    it('GET isteğinde Table şeması, güncel NAP telefonu ve X-Robots-Tag döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/compare-districts/route');

      // 1. Varsayılan Türkçe kıyaslama (Kadıköy vs Beşiktaş)
      const reqTr = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/compare-districts?d1=kadikoy&d2=besiktas');
      const resTr = await GET(reqTr as any);
      expect(resTr.status).toBe(200);
      expect(resTr.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resTr.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataTr = await resTr.json();
      expect(dataTr.districts.length).toBe(2);
      expect(dataTr.schema['@type']).toBe('Table');
      expect(dataTr.schema.inLanguage).toBe('tr-TR');
      expect(dataTr.schema.about[0]['@type']).toBe('LocalBusiness');
      expect(dataTr.schema.about[0].telephone).toBe('+90 216 550 48 48');
      expect(dataTr.duesDifferenceM2).toBeGreaterThanOrEqual(0);

      // 2. İngilizce lokalizasyon kıyaslaması (?lang=en)
      const reqEn = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/compare-districts?d1=kadikoy&d2=besiktas&lang=en');
      const resEn = await GET(reqEn as any);
      expect(resEn.status).toBe(200);
      const dataEn = await resEn.json();
      expect(dataEn.schema.inLanguage).toBe('en');
      expect(dataEn.seoSummaryParagraph).toContain('Comparing facility management');
    });
  });

  describe('73. dues-index.json API Dataset Şeması, Kurumsal NAP ve Yaka Filtreleme', () => {
    it('GET isteğinde Dataset şeması, kurumsal telefon/logo ve bölgesel filtreleme doğrulanır', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/dues-index.json/route');

      // 1. Tüm ilçeler
      const reqAll = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dues-index.json');
      const resAll = await GET(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resAll.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataAll = await resAll.json();
      expect(dataAll.schema['@type']).toBe('Dataset');
      expect(dataAll.schema.inLanguage).toBe('tr-TR');
      expect(dataAll.schema.creator.name).toBe('Alo Yönetim');
      expect(dataAll.schema.creator.telephone).toBe('+90 216 550 48 48');
      expect(dataAll.schema.creator.logo).toContain('/images/logo.png');
      expect(dataAll.schema.spatialCoverage.sameAs).toBe('https://www.wikidata.org/wiki/Q406');
      expect(dataAll.districts.length).toBe(39);

      // 2. Anadolu yakası filtresi (?side=anadolu)
      const reqSide = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dues-index.json?side=anadolu');
      const resSide = await GET(reqSide);
      expect(resSide.status).toBe(200);
      const dataSide = await resSide.json();
      expect(dataSide.istanbulSummary.filteredSide).toBe('anadolu');
      expect(dataSide.districts.every((d: any) => d.side === 'Anadolu Yakası')).toBe(true);
    });
  });

  describe('74. ai-snippets.json API DefinedTermSet Şeması, Kurumsal NAP ve Çok Dilli Destek', () => {
    it('GET isteğinde DefinedTermSet şeması, kurumsal telefon/logo ve çok dilli snippet döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/ai-snippets.json/route');

      // 1. Türkçe varsayılan istek
      const reqTr = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/ai-snippets.json');
      const resTr = await GET(reqTr);
      expect(resTr.status).toBe(200);
      expect(resTr.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resTr.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataTr = await resTr.json();
      expect(dataTr.schema['@type']).toBe('DefinedTermSet');
      expect(dataTr.schema.inLanguage).toBe('tr-TR');
      expect(dataTr.schema.publisher.name).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataTr.schema.publisher.telephone).toBe('+90 216 550 48 48');
      expect(dataTr.schema.publisher.logo).toContain('/images/logo.png');
      expect(dataTr.snippets.length).toBeGreaterThanOrEqual(4);

      // 2. İngilizce lokalizasyon isteği (?lang=en)
      const reqEn = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/ai-snippets.json?lang=en');
      const resEn = await GET(reqEn);
      expect(resEn.status).toBe(200);
      const dataEn = await resEn.json();
      expect(dataEn.schema.inLanguage).toBe('en');
      expect(dataEn.snippets[0].directSummaryText).toContain('Facility management is');
    });
  });

  describe('75. llm-facts.json API AI-Readiness, Doğrulanmış NAP ve Robots Başlıkları', () => {
    it('GET isteğinde kurumsal kimlik, telefon, standartlar ve ilçe benchmark listesi döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/llm-facts.json/route');

      const req = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/llm-facts.json');
      const res = await GET(req);
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/json');
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const data = await res.json();
      expect(data.entity).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.phone).toBe('+90 216 550 48 48');
      expect(data.coreService.standards.length).toBeGreaterThanOrEqual(5);
      expect(data.coreService.standards).toContain('ISO 41001:2018 (Uluslararası Tesis Yönetim Standardı)');
      expect(data.districtDuesBenchmarks39.length).toBe(39);
      expect(data.linkedApis.aiOverviewsSnippets).toContain('/api/tesis-yonetimi/ai-snippets.json');
    });
  });

  describe('76. voice-qa.json API SpeakableSpecification Şeması, Kurumsal NAP ve Çok Dilli Sesli Sentez', () => {
    it('GET isteğinde SpeakableSpecification şeması, kurumsal telefon/logo ve çok dilli sesli yanıt döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/voice-qa.json/route');

      // 1. Türkçe varsayılan istek
      const reqTr = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/voice-qa.json');
      const resTr = await GET(reqTr);
      expect(resTr.status).toBe(200);
      expect(resTr.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resTr.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataTr = await resTr.json();
      expect(dataTr.publisher).toBeDefined();
      expect(dataTr.publisher.name).toBe('Alo Yönetim');
      expect(dataTr.publisher.telephone).toBe('+90 216 550 48 48');
      expect(dataTr.publisher.logo).toContain('/images/logo.png');
      expect(dataTr.qaCollection.length).toBeGreaterThanOrEqual(3);
      expect(dataTr.qaCollection[0].schema['@type']).toBe('SpeakableSpecification');
      expect(dataTr.qaCollection[0].schema.inLanguage).toBe('tr');

      // 2. İngilizce lokalizasyon isteği (?lang=en)
      const reqEn = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/voice-qa.json?lang=en');
      const resEn = await GET(reqEn);
      expect(resEn.status).toBe(200);
      const dataEn = await resEn.json();
      expect(dataEn.supportedLanguages).toContain('en');
      expect(dataEn.qaCollection[0].lang).toBe('en');
      expect(dataEn.qaCollection[0].spokenAnswer).toContain('Alo Management');
    });
  });

  describe('77. entity-graph.jsonld Master Entity Graph, Yargıtay Q1549429 ve Kurumsal NAP', () => {
    it('GET isteğinde application/ld+json, kurumsal telefon, Yargıtay Q1549429 ve ilçe düğümleri döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/entity-graph.jsonld/route');

      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/ld+json');
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const data = await res.json();
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@graph']).toBeDefined();

      // Kurumsal Organizasyon düğümü kontrolü
      const orgNode = data['@graph'].find((n: any) => n['@type'] === 'Organization');
      expect(orgNode).toBeDefined();
      expect(orgNode.name).toBe('Alo Yönetim');
      expect(orgNode.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(orgNode.telephone).toBe('+90 216 550 48 48');
      expect(orgNode.hasCredential.length).toBeGreaterThanOrEqual(3);

      // Yargıtay emsal kararları düğümü kontrolü (Q1549429)
      const legislationNode = data['@graph'].find((n: any) => n['@type'] === 'Legislation');
      expect(legislationNode).toBeDefined();
      expect(legislationNode.legislationPassedBy.sameAs).toBe('https://www.wikidata.org/wiki/Q1549429');

      // İlçe idari alan düğümleri kontrolü (39 ilçe)
      const districtNodes = data['@graph'].filter((n: any) => n['@type'] === 'AdministrativeArea');
      expect(districtNodes.length).toBe(39);
    });
  });

  describe('78. kmk-law-index.json API ItemList Şeması, Kurumsal NAP ve Genişletilmiş Robots Başlıkları', () => {
    it('GET isteğinde ItemList şeması, kurumsal telefon/logo ve TBMM Wikidata bağı döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/kmk-law-index.json/route');

      const req = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/kmk-law-index.json');
      const res = await GET(req);
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/json');
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      expect(res.headers.get('ETag')).toBeDefined();

      const data = await res.json();
      expect(data.schema['@type']).toBe('ItemList');
      expect(data.schema.inLanguage).toBe('tr-TR');
      expect(data.schema.publisher.name).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.schema.publisher.telephone).toBe('+90 216 550 48 48');
      expect(data.schema.publisher.logo).toContain('/images/logo.png');
      expect(data.articles.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe('79. verify-credentials API AboutPage Şeması, Kurumsal Akreditasyonlar ve Doğrulanmış NAP', () => {
    it('GET isteğinde ISO 41001 sertifikası, 5188 lisansı, kurumsal telefon ve AboutPage şeması döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/verify-credentials/route');

      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/json');
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const data = await res.json();
      expect(data.organization.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.organization.verifiedStatus).toBe('ACTIVE_AND_LICENSED');
      expect(data.accreditations.length).toBeGreaterThanOrEqual(5);

      // Schema.org AboutPage & Kurumsal NAP kontrolleri
      expect(data.schema['@type']).toBe('AboutPage');
      expect(data.schema.inLanguage).toBe('tr-TR');
      expect(data.schema.mainEntity.telephone).toBe('+90 216 550 48 48');
      expect(data.schema.mainEntity.logo).toContain('/images/logo.png');
      expect(data.schema.mainEntity.hasCredential.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('80. ai-knowledge API Enterprise RAG Bilgi Bankası ve Robots Başlıkları', () => {
    it('GET isteğinde şirket profili, ISO akreditasyonları, ilçe ve hizmet verileri döner', async () => {
      const { GET } = await import('@/app/api/ai-knowledge/route');

      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/json');
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const data = await res.json();
      expect(data.meta.purpose).toContain('LLMO & AI Search');
      expect(data.company.name).toBe('Alo Yönetim');
      expect(data.company.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.company.accreditations.length).toBeGreaterThanOrEqual(4);
      expect(data.facilityManagementFramework).toBeDefined();
      expect(data.districts.length).toBe(39);
      expect(data.services.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('81. knowledge-graph API Unified Semantic Graph ve Robots Başlıkları', () => {
    it('GET isteğinde application/ld+json, Corporation, AboutPage ve zengin robots başlığı döner', async () => {
      const { GET } = await import('@/app/api/knowledge-graph/route');

      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/ld+json');
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const data = await res.json();
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@graph']).toBeDefined();

      const corpNode = data['@graph'].find((n: any) => n['@type'] === 'Corporation');
      expect(corpNode).toBeDefined();
      expect(corpNode.name).toBe('Alo Yönetim');
      expect(corpNode.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');

      const aboutNode = data['@graph'].find((n: any) => n['@type'] === 'AboutPage');
      expect(aboutNode).toBeDefined();
      expect(aboutNode.name).toContain('AI Assistant');
    });
  });

  describe('82. istanbul-facility-data API Google Dataset Search, Wikidata Q406 ve Robots Başlıkları', () => {
    it('GET isteğinde application/ld+json, Dataset şeması, Wikidata Q406 ve kurumsal NAP döner', async () => {
      const { GET } = await import('@/app/api/datasets/istanbul-facility-data/route');

      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/ld+json');
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(res.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const data = await res.json();
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('Dataset');
      expect(data.inLanguage).toBe('tr-TR');
      expect(data.spatialCoverage.sameAs).toBe('https://www.wikidata.org/wiki/Q406');
      expect(data.spatialCoverage.name).toContain('İstanbul');
      expect(data.creator.name).toBe('Alo Yönetim');
      expect(data.creator.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.creator.telephone).toBe('+90 216 550 48 48');
      expect(data.creator.logo).toContain('/images/logo.png');
      expect(data.data.length).toBe(39);
      expect(data.data[0].districtId).toBeDefined();
      expect(data.data[0].managedProjects).toBeGreaterThan(0);
    });
  });

  describe('83. terms API DefinedTermSet Sözlük ve summary API CORS/Robots Başlıkları', () => {
    it('terms ve summary uç noktalarında standartlaştırılmış şema, kurumsal NAP ve robots başlıkları döner', async () => {
      // 1. terms API Genel Çağrı
      const { GET: getTerms } = await import('@/app/api/terms/route');
      const reqAll = new Request('https://aloyonetim.com.tr/api/terms');
      const resAll = await getTerms(reqAll);
      expect(resAll.status).toBe(200);
      expect(resAll.headers.get('Content-Type')).toContain('application/ld+json');
      expect(resAll.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resAll.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataAll = await resAll.json();
      expect(dataAll['@type']).toBe('DefinedTermSet');
      expect(dataAll.inLanguage).toBe('tr-TR');
      expect(dataAll.publisher.name).toBe('Alo Yönetim');
      expect(dataAll.publisher.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataAll.publisher.telephone).toBe('+90 216 550 48 48');
      expect(dataAll.publisher.logo).toContain('/images/logo.png');
      expect(dataAll.hasDefinedTerm.length).toBeGreaterThan(0);

      // 2. terms API Arama Sorgusu Filtresi (?q=aidat)
      const reqQ = new Request('https://aloyonetim.com.tr/api/terms?q=aidat');
      const resQ = await getTerms(reqQ);
      expect(resQ.status).toBe(200);
      const dataQ = await resQ.json();
      expect(dataQ.hasDefinedTerm.length).toBeGreaterThan(0);

      // 3. summary API Makine-Okur JSON
      const { GET: getSummary } = await import('@/app/api/summary/route');
      const resSummary = await getSummary();
      expect(resSummary.status).toBe(200);
      expect(resSummary.headers.get('Content-Type')).toContain('application/json');
      expect(resSummary.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resSummary.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataSummary = await resSummary.json();
      expect(dataSummary.name).toBe('Alo Yönetim');
      expect(dataSummary.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataSummary.telephone).toBe('+90 216 550 48 48');
      expect(dataSummary.certifications.length).toBeGreaterThanOrEqual(5);
      expect(dataSummary.serviceAreas.length).toBe(39);
    });
  });

  describe('84. nap-profile Canlı NAP Doğrulama & Yerel SEO Otorite API\'si ve Robots Başlıkları', () => {
    it('nap-profile uç noktası tüm formatlarında (json, jsonld, geojson) doğrulanmış NAP ve robots başlıkları sunar', async () => {
      const { GET } = await import('@/app/api/seo/nap-profile/route');

      // 1. Varsayılan JSON profil
      const reqDefault = new Request('https://aloyonetim.com.tr/api/seo/nap-profile');
      const resDefault = await GET(reqDefault);
      expect(resDefault.status).toBe(200);
      expect(resDefault.headers.get('Content-Type')).toContain('application/json');
      expect(resDefault.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resDefault.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      expect(resDefault.headers.get('X-NAP-Status')).toBe('VERIFIED');

      const dataDefault = await resDefault.json();
      expect(dataDefault.status).toBe('SUCCESS');
      expect(dataDefault.verified).toBe(true);
      expect(dataDefault.nap.legal.brandName).toBe('Alo Yönetim');
      expect(dataDefault.nap.legal.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataDefault.nap.contact.phoneE164).toBe('+902165504848');

      // 2. format=jsonld
      const reqJsonLd = new Request('https://aloyonetim.com.tr/api/seo/nap-profile?format=jsonld');
      const resJsonLd = await GET(reqJsonLd);
      expect(resJsonLd.status).toBe(200);
      expect(resJsonLd.headers.get('Content-Type')).toContain('application/ld+json');
      expect(resJsonLd.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      // 3. format=geojson
      const reqGeoJson = new Request('https://aloyonetim.com.tr/api/seo/nap-profile?format=geojson');
      const resGeoJson = await GET(reqGeoJson);
      expect(resGeoJson.status).toBe(200);
      expect(resGeoJson.headers.get('Content-Type')).toContain('application/geo+json');
      expect(resGeoJson.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
    });
  });

  describe('85. facility-coverage.geojson & districts.geojson RFC 7946 Standartları ve Kurumsal NAP', () => {
    it('facility-coverage ve districts GeoJSON rotaları RFC 7946, kurumsal telefon ve robots başlığı döner', async () => {
      // 1. facility-coverage.geojson
      const { GET: getCoverage } = await import('@/app/api/geo/facility-coverage.geojson/route');
      const resCoverage = await getCoverage();
      expect(resCoverage.status).toBe(200);
      expect(resCoverage.headers.get('Content-Type')).toContain('application/geo+json');
      expect(resCoverage.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resCoverage.headers.get('X-Geo-Standard')).toBe('RFC-7946-GeoJSON');
      expect(resCoverage.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataCoverage = await resCoverage.json();
      expect(dataCoverage.type).toBe('FeatureCollection');
      expect(dataCoverage.metadata.organization).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataCoverage.metadata.contactPhone).toBe('+90 216 550 48 48');
      expect(dataCoverage.features.length).toBe(39);
      expect(dataCoverage.features[0].properties.serviceLevelAgreement.emergencyResponseTimeMinutes).toBeGreaterThan(0);

      // 2. districts.geojson
      const { GET: getDistricts } = await import('@/app/api/geo/districts.geojson/route');
      const resDistricts = await getDistricts();
      expect(resDistricts.status).toBe(200);
      expect(resDistricts.headers.get('Content-Type')).toContain('application/geo+json');
      expect(resDistricts.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resDistricts.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataDistricts = await resDistricts.json();
      expect(dataDistricts.type).toBe('FeatureCollection');
      expect(dataDistricts.metadata.provider).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataDistricts.features.length).toBe(39);
      expect(dataDistricts.features[0].properties.phone).toBe('+90 216 550 48 48');
      expect(dataDistricts.features[0].properties.provider).toBe('Alo Yönetim ve Organizasyon A.Ş.');
    });
  });

  describe('86. security & facility legal-templates API DigitalDocument Şemaları ve Kurumsal NAP', () => {
    it('güvenlik ve tesis hukuki şablon uç noktaları DigitalDocument şeması, inLanguage ve kurumsal NAP döner', async () => {
      // 1. security legal-templates
      const { GET: getSecurityTemplates } = await import('@/app/api/security/legal-templates/route');
      const reqSec = new Request('https://aloyonetim.com.tr/api/security/legal-templates');
      const resSec = await getSecurityTemplates(reqSec as any);
      expect(resSec.status).toBe(200);
      expect(resSec.headers.get('Content-Type')).toContain('application/ld+json');
      expect(resSec.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resSec.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataSec = await resSec.json();
      expect(dataSec['@type']).toBe('DataCatalog');
      expect(dataSec.inLanguage).toBe('tr-TR');
      expect(dataSec.provider.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataSec.provider.telephone).toBe('+90 216 550 48 48');
      expect(dataSec.provider.logo).toContain('/images/logo.png');
      expect(dataSec.dataset.length).toBeGreaterThanOrEqual(3);
      expect(dataSec.dataset[0]['@type']).toBe('DigitalDocument');
      expect(dataSec.dataset[0].inLanguage).toBe('tr-TR');

      // 2. facility legal-templates
      const { GET: getFacilityTemplates } = await import('@/app/api/facility/legal-templates/route');
      const reqFac = new Request('https://aloyonetim.com.tr/api/facility/legal-templates');
      const resFac = await getFacilityTemplates(reqFac as any);
      expect(resFac.status).toBe(200);
      expect(resFac.headers.get('Content-Type')).toContain('application/ld+json');
      expect(resFac.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resFac.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataFac = await resFac.json();
      expect(dataFac['@type']).toBe('DataCatalog');
      expect(dataFac.inLanguage).toBe('tr-TR');
      expect(dataFac.provider.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataFac.provider.telephone).toBe('+90 216 550 48 48');
      expect(dataFac.dataset.length).toBeGreaterThanOrEqual(4);
      expect(dataFac.dataset[0]['@type']).toBe('DigitalDocument');
      expect(dataFac.templates.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('87. facility & security districts-feed.xml GeoRSS ve istanbul.kml GIS Standartları', () => {
    it('GeoRSS beslemeleri ve KML uç noktası geçerli coğrafi etiketler, kurumsal telefon ve robots başlığı sunar', async () => {
      // 1. facility districts-feed.xml
      const { GET: getFacilityFeed } = await import('@/app/api/facility/districts-feed.xml/route');
      const resFacFeed = await getFacilityFeed();
      expect(resFacFeed.status).toBe(200);
      expect(resFacFeed.headers.get('Content-Type')).toContain('application/xml');
      expect(resFacFeed.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resFacFeed.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const xmlFac = await resFacFeed.text();
      expect(xmlFac).toContain('<rss version="2.0"');
      expect(xmlFac).toContain('xmlns:georss="http://www.georss.org/georss"');
      expect(xmlFac).toContain('<georss:point>');
      expect(xmlFac).toContain('Kadıköy');

      // 2. security districts-feed.xml
      const { GET: getSecurityFeed } = await import('@/app/api/security/districts-feed.xml/route');
      const resSecFeed = await getSecurityFeed();
      expect(resSecFeed.status).toBe(200);
      expect(resSecFeed.headers.get('Content-Type')).toContain('application/xml');
      expect(resSecFeed.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resSecFeed.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const xmlSec = await resSecFeed.text();
      expect(xmlSec).toContain('İstanbul 39 İlçe 5188 Özel Güvenlik');
      expect(xmlSec).toContain('<georss:point>');

      // 3. istanbul.kml
      const { GET: getKml } = await import('@/app/api/geo/istanbul.kml/route');
      const resKml = await getKml();
      expect(resKml.status).toBe(200);
      expect(resKml.headers.get('Content-Type')).toContain('application/vnd.google-earth.kml+xml');
      expect(resKml.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resKml.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const kmlText = await resKml.text();
      expect(kmlText).toContain('<kml xmlns="http://www.opengis.net/kml/2.2">');
      expect(kmlText).toContain('<Placemark id="district-kadikoy">');
      expect(kmlText).toContain('+90 216 550 48 48');
    });
  });

  describe('88. facility-knowledge ve verify-authority API Kurumsal Otorite ve Robots Başlıkları', () => {
    it('facility-knowledge ve verify-authority uç noktaları kurumsal kimlik, E-E-A-T ve robots başlıkları sunar', async () => {
      // 1. facility-knowledge
      const { GET: getFacilityKnowledge } = await import('@/app/api/seo/facility-knowledge/route');
      const resFac = await getFacilityKnowledge();
      expect(resFac.status).toBe(200);
      expect(resFac.headers.get('Content-Type')).toContain('application/json');
      expect(resFac.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resFac.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      expect(resFac.headers.get('X-Topical-Engine')).toBe('Alo-Yonetim-SEO-V4');

      const dataFac = await resFac.json();
      expect(dataFac.organization.name).toBe('Alo Yönetim');
      expect(dataFac.organization.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataFac.organization.telephone).toBe('+90 216 550 48 48');
      expect(dataFac.organization.standard).toBe('ISO 41001:2018');
      expect(dataFac.entities.length).toBeGreaterThan(0);
      expect(dataFac.topicCluster).toBeDefined();

      // 2. verify-authority
      const { GET: getVerifyAuthority } = await import('@/app/api/seo/verify-authority/route');
      const resAuth = await getVerifyAuthority();
      expect(resAuth.status).toBe(200);
      expect(resAuth.headers.get('Content-Type')).toContain('application/json');
      expect(resAuth.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resAuth.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataAuth = await resAuth.json();
      expect(dataAuth.status).toBe('verified');
      expect(dataAuth.authorityScore).toBeGreaterThanOrEqual(90);
      expect(dataAuth.schema.name).toBe('Alo Yönetim');
      expect(dataAuth.schema.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
    });
  });

  describe('89. intent-match ve facility-rank-score API Semantik Arama ve Telemetri Standartları', () => {
    it('intent-match ve facility-rank-score uç noktaları CORS, robots başlığı ve telemetri sunar', async () => {
      // 1. intent-match
      const { GET: getIntentMatch } = await import('@/app/api/seo/intent-match/route');
      const reqIntent = new Request('https://aloyonetim.com.tr/api/seo/intent-match?q=aidat+yonetimi+fiyatlari');
      const resIntent = await getIntentMatch(reqIntent as any);
      expect(resIntent.status).toBe(200);
      expect(resIntent.headers.get('Content-Type')).toContain('application/json');
      expect(resIntent.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resIntent.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      expect(resIntent.headers.get('X-Intent-Classifier')).toBe('Alo-Yonetim-Semantic-Intent-Engine');

      const dataIntent = await resIntent.json();
      expect(dataIntent.intent).toBeDefined();
      expect(dataIntent.confidenceScore).toBeGreaterThan(0);

      // 2. facility-rank-score
      const { GET: getRankScore } = await import('@/app/api/seo/facility-rank-score/route');
      const reqRank = new Request('https://aloyonetim.com.tr/api/seo/facility-rank-score');
      const resRank = await getRankScore(reqRank);
      expect(resRank.status).toBe(200);
      expect(resRank.headers.get('Content-Type')).toContain('application/json');
      expect(resRank.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resRank.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataRank = await resRank.json();
      expect(dataRank.overallAverageRankPotential).toBeGreaterThan(0);
      expect(dataRank.totalDistrictsSimulated).toBe(39);
      expect(dataRank.hubScore).toBeDefined();
    });
  });

  describe('90. facility-agent-context.json AI RAG API Robots ve CORS Standardizasyonu', () => {
    it('GET isteğinde kurumsal yetki, RAG bağlamı, CORS ve robots başlıkları döner', async () => {
      const { GET } = await import('@/app/api/ai/facility-agent-context.json/route');

      // 1. Türkçe varsayılan istek
      const reqTr = new Request('https://aloyonetim.com.tr/api/ai/facility-agent-context.json');
      const resTr = await GET(reqTr as any);
      expect(resTr.status).toBe(200);
      expect(resTr.headers.get('Content-Type')).toContain('application/json');
      expect(resTr.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resTr.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      expect(resTr.headers.get('X-AI-Context-Type')).toBe('Ground-Truth-RAG-Knowledge-Corpus');

      const dataTr = await resTr.json();
      expect(dataTr.entity).toBeDefined();
      expect(dataTr.entity.name).toBe('Alo Yönetim');
      expect(dataTr.entity.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dataTr.entity.telephone).toBe('+90 216 550 48 48');
      expect(dataTr.legalFrameworkKMK634).toBeDefined();
      expect(dataTr.districtMatrix.length).toBe(39);

      // 2. İngilizce lokalizasyon isteği (?lang=en)
      const reqEn = new Request('https://aloyonetim.com.tr/api/ai/facility-agent-context.json?lang=en');
      const resEn = await GET(reqEn as any);
      expect(resEn.status).toBe(200);
      const dataEn = await resEn.json();
      expect(dataEn.entity.name).toBe('Alo Yönetim');
      expect(dataEn.districtMatrix.length).toBe(39);
      expect(dataEn.districtMatrix[0].canonicalUrl).toContain('/en/bolgeler/');
    });
  });

  describe('91. search-suggest, reviews ve calculator API CORS & Robots Güvencesi', () => {
    it('search-suggest, reviews ve calculator uç noktalarında CORS ve robots başlıkları döner', async () => {
      // 1. search-suggest API (OpenSearch Formatı)
      const { GET: getSearchSuggest } = await import('@/app/api/search-suggest/route');
      const reqSearch = new Request('https://aloyonetim.com.tr/api/search-suggest?q=guvenlik');
      const resSearch = await getSearchSuggest(reqSearch as any);
      expect(resSearch.status).toBe(200);
      expect(resSearch.headers.get('Content-Type')).toContain('application/json');
      expect(resSearch.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resSearch.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataSearch = await resSearch.json();
      expect(Array.isArray(dataSearch)).toBe(true);
      expect(dataSearch[0]).toBe('guvenlik');
      expect(dataSearch[1].length).toBeGreaterThan(0);

      // 2. reviews API (Google Places Ratings)
      const { GET: getReviews } = await import('@/app/api/reviews/route');
      const resReviews = await getReviews();
      expect(resReviews.status).toBe(200);
      expect(resReviews.headers.get('Content-Type')).toContain('application/json');
      expect(resReviews.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resReviews.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataReviews = await resReviews.json();
      expect(dataReviews.ratingValue).toBeDefined();
      expect(dataReviews.reviewCount).toBeDefined();

      // 3. calculator API (Tesis Yönetimi Maliyet Parametreleri)
      const { GET: getCalculator } = await import('@/app/api/calculator/route');
      const resCalc = await getCalculator();
      expect(resCalc.status).toBe(200);
      expect(resCalc.headers.get('Content-Type')).toContain('application/json');
      expect(resCalc.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resCalc.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataCalc = await resCalc.json();
      expect(dataCalc.baseCostPerUnit).toBeDefined();
      expect(dataCalc.savingsRate).toBeDefined();
    });
  });

  describe('92. Admin ve Telemetri Uç Noktalarında noindex ve Private Cache Güvencesi', () => {
    it('admin seo-health, seo-status, bot-tracker, telemetry, ai-logs, warm-cache ve indexnow-bulk noindex döner', async () => {
      // 1. seo-health API
      const { GET: getSeoHealth } = await import('@/app/api/admin/seo-health/route');
      const resSeoHealth = await getSeoHealth();
      expect(resSeoHealth.status).toBe(200);
      expect(resSeoHealth.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resSeoHealth.headers.get('Cache-Control')).toContain('no-store');

      // 2. seo-status API
      const { GET: getSeoStatus } = await import('@/app/api/admin/seo-status/route');
      const resSeoStatus = await getSeoStatus();
      expect(resSeoStatus.status).toBe(200);
      expect(resSeoStatus.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resSeoStatus.headers.get('Cache-Control')).toContain('no-store');

      // 3. bot-tracker API
      const { GET: getBotTracker } = await import('@/app/api/admin/bot-tracker/route');
      const reqTracker = new Request('https://aloyonetim.com.tr/api/admin/bot-tracker');
      const resTracker = await getBotTracker(reqTracker as any);
      expect(resTracker.status).toBe(200);
      expect(resTracker.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resTracker.headers.get('Cache-Control')).toContain('no-store');

      // 4. bot-telemetry API
      const { GET: getBotTelemetry } = await import('@/app/api/admin/bot-telemetry/route');
      const resTelemetry = await getBotTelemetry();
      expect(resTelemetry.status).toBe(200);
      expect(resTelemetry.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resTelemetry.headers.get('Cache-Control')).toContain('no-store');

      // 5. ai-crawler-logs API
      const { GET: getAiCrawlerLogs } = await import('@/app/api/admin/ai-crawler-logs/route');
      const resAiLogs = await getAiCrawlerLogs();
      expect(resAiLogs.status).toBe(200);
      expect(resAiLogs.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resAiLogs.headers.get('Cache-Control')).toContain('no-store');

      // 6. warm-facility-cache API
      const { GET: getWarmCache } = await import('@/app/api/admin/warm-facility-cache/route');
      const resWarm = await getWarmCache();
      expect(resWarm.status).toBe(200);
      expect(resWarm.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resWarm.headers.get('Cache-Control')).toContain('no-store');

      // 7. indexnow-bulk API
      const { GET: getIndexNowBulk } = await import('@/app/api/admin/indexnow-bulk/route');
      const resIndexNow = await getIndexNowBulk();
      expect(resIndexNow.status).toBe(200);
      expect(resIndexNow.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resIndexNow.headers.get('Cache-Control')).toContain('no-store');
    });
  });

  describe('93. Health, RUM Vitals, Auth ve Upload Uç Noktalarında noindex Standartları', () => {
    it('health, vitals, logout ve upload uç noktaları noindex başlığı ve güvenli önbellekleme döner', async () => {
      // 1. health API (RFC 8485 / Tier-3 SLA)
      const { GET: getHealth } = await import('@/app/api/health/route');
      const resHealth = await getHealth();
      expect(resHealth.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resHealth.headers.get('Content-Type')).toContain('application/json');
      expect(resHealth.headers.get('Cache-Control')).toContain('no-store');

      // 2. analytics vitals API (RUM Core Web Vitals)
      const { GET: getVitals } = await import('@/app/api/analytics/vitals/route');
      const resVitals = await getVitals();
      expect(resVitals.status).toBe(200);
      expect(resVitals.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resVitals.headers.get('Content-Type')).toContain('application/json');
      expect(resVitals.headers.get('Cache-Control')).toContain('no-store');

      // 3. auth logout API
      const { POST: postLogout } = await import('@/app/api/auth/logout/route');
      const resLogout = await postLogout();
      expect(resLogout.status).toBe(200);
      expect(resLogout.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resLogout.headers.get('Content-Type')).toContain('application/json');
      expect(resLogout.headers.get('Cache-Control')).toContain('no-store');

      // 4. upload API (Yetkisiz çağrıda 401 + noindex)
      const { POST: postUpload } = await import('@/app/api/upload/route');
      const reqUpload = new Request('https://aloyonetim.com.tr/api/upload', {
        method: 'POST',
      });
      const resUpload = await postUpload(reqUpload);
      expect(resUpload.status).toBe(401);
      expect(resUpload.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resUpload.headers.get('Content-Type')).toContain('application/json');
      expect(resUpload.headers.get('Cache-Control')).toContain('no-store');
    });
  });

  describe('94. Operasyonel ve Analiz API Uç Noktalarında noindex ve Private Cache Güvencesi', () => {
    it('lead, seed-referanslar, analyze-content, audit-page, ping-all, websub-notify, indexnow ve ping-indexnow noindex döner', async () => {
      process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/alo_yonetim';
      process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key_for_vitest_runner_2026';

      // 1. lead API
      const { POST: postLead } = await import('@/app/api/lead/route');
      const reqLead = new Request('https://aloyonetim.com.tr/api/lead', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      const resLead = await postLead(reqLead as any);
      expect(resLead.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resLead.headers.get('Cache-Control')).toContain('no-store');

      // 2. seed-referanslar API
      const { GET: getSeed } = await import('@/app/api/seed-referanslar/route');
      const resSeed = await getSeed();
      expect(resSeed.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resSeed.headers.get('Cache-Control')).toContain('no-store');

      // 3. analyze-content API
      const { POST: postAnalyze } = await import('@/app/api/seo/analyze-content/route');
      const reqAnalyze = new Request('https://aloyonetim.com.tr/api/seo/analyze-content', {
        method: 'POST',
        body: JSON.stringify({ content: '' }),
      });
      const resAnalyze = await postAnalyze(reqAnalyze as any);
      expect(resAnalyze.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resAnalyze.headers.get('Cache-Control')).toContain('no-store');

      // 4. audit-page API (GET & POST)
      const { GET: getAuditPage, POST: postAuditPage } = await import('@/app/api/seo/audit-page/route');
      const reqAuditGet = new Request('https://aloyonetim.com.tr/api/seo/audit-page');
      const resAuditGet = await getAuditPage(reqAuditGet as any);
      expect(resAuditGet.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resAuditGet.headers.get('Cache-Control')).toContain('no-store');

      const reqAuditPost = new Request('https://aloyonetim.com.tr/api/seo/audit-page', {
        method: 'POST',
        body: JSON.stringify({ title: 'Test' }),
      });
      const resAuditPost = await postAuditPage(reqAuditPost as any);
      expect(resAuditPost.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resAuditPost.headers.get('Cache-Control')).toContain('no-store');

      // 5. ping-all API
      const { GET: getPingAll } = await import('@/app/api/seo/ping-all/route');
      const resPingAll = await getPingAll();
      expect(resPingAll.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resPingAll.headers.get('Cache-Control')).toContain('no-store');

      // 6. websub-notify API
      const { GET: getWebsub } = await import('@/app/api/seo/websub-notify/route');
      const resWebsub = await getWebsub();
      expect(resWebsub.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resWebsub.headers.get('Cache-Control')).toContain('no-store');

      // 7. indexnow genel API
      const { POST: postIndexNow } = await import('@/app/api/indexnow/route');
      const reqIndexNow = new Request('https://aloyonetim.com.tr/api/indexnow', {
        method: 'POST',
        body: JSON.stringify({ urls: [] }),
      });
      const resIndexNow = await postIndexNow(reqIndexNow);
      expect(resIndexNow.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resIndexNow.headers.get('Cache-Control')).toContain('no-store');

      // 8. tesis-yonetimi ping-indexnow API
      const { GET: getTesisPing } = await import('@/app/api/tesis-yonetimi/ping-indexnow/route');
      const resTesisPing = await getTesisPing();
      expect(resTesisPing.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resTesisPing.headers.get('Cache-Control')).toContain('no-store');
    });
  });

  describe('95. GEO (Generative Engine Optimization) & 2026 AI Corpus Zenginleştirme Standartları', () => {
    it('facilityKnowledgeCorpus ve llms.txt çıktılarında 2026 ek bütçe, EV şarj ve enerji tasarrufu bulunur', async () => {
      // 1. facilityKnowledgeCorpus buildFacilityRAGCorpus
      const { buildFacilityRAGCorpus } = await import('@/lib/ai/facilityKnowledgeCorpus');
      const corpus = await buildFacilityRAGCorpus('tr');

      // 2026 Ek bütçe kontrolü
      expect(corpus.asgariUcretEkButceRehberi2026).toBeDefined();
      expect(corpus.asgariUcretEkButceRehberi2026.title).toContain('2026 Asgari Ücret');
      expect(corpus.asgariUcretEkButceRehberi2026.proceduralSteps.length).toBeGreaterThanOrEqual(4);
      expect(corpus.asgariUcretEkButceRehberi2026.kpiMetrics.some((m) => m.standardValue === '7 Gün')).toBe(true);

      // EV Şarj kuralları
      expect(corpus.evChargeInstallationRulesKMK42).toBeDefined();
      expect(corpus.evChargeInstallationRulesKMK42.commonAreaInstallation.quorumRequirement).toContain('%50+1');
      expect(corpus.evChargeInstallationRulesKMK42.privateParkingInstallation.technicalCompliance).toContain('Tip B / 30mA');

      // Enerji verimliliği
      expect(corpus.energyEfficiencyFramework).toBeDefined();
      expect(corpus.energyEfficiencyFramework.reactivePenaltyZeroGuarantee).toBe(true);
      expect(corpus.energyEfficiencyFramework.solarPowerRooftopSavingsPercent).toContain('%65');

      // Canonical FAQs kontrolü
      const faqEkButce = corpus.canonicalFaqs.find((f) => f.question.includes('2026 Asgari ücret'));
      expect(faqEkButce).toBeDefined();
      expect(faqEkButce?.answer).toContain('İİK 68');

      // 2. llms.txt ve llms-full.txt route kontrolleri
      const { GET: getLlmsTxt } = await import('@/app/llms.txt/route');
      const resLlms = await getLlmsTxt();
      expect(resLlms.status).toBe(200);
      expect(resLlms.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const textLlms = await resLlms.text();
      expect(textLlms).toContain('2026 Asgari ücret');
      expect(textLlms).toContain('kompanzasyon');

      const { GET: getLlmsFullTxt } = await import('@/app/llms-full.txt/route');
      const resLlmsFull = await getLlmsFullTxt();
      expect(resLlmsFull.status).toBe(200);
      expect(resLlmsFull.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const textLlmsFull = await resLlmsFull.text();
      expect(textLlmsFull).toContain('2026 Asgari Ücret Ek Bütçe');
      expect(textLlmsFull).toContain('Kapalı Otopark Elektrikli Araç (EV)');
    });
  });

  describe('96. XML Sitemap ve RSS Besleme Uç Noktalarında CORS ve Robots Başlıkları Güvencesi', () => {
    it('haberler, döküman, video, görsel, bölgeler sitemipleri ve RSS beslemeleri CORS ve Robots başlıkları döner', async () => {
      // 1. news-sitemap.xml
      const { GET: getNewsSitemap } = await import('@/app/news-sitemap.xml/route');
      const resNews = await getNewsSitemap();
      expect(resNews.status).toBe(200);
      expect(resNews.headers.get('Content-Type')).toContain('application/xml');
      expect(resNews.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resNews.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const xmlNews = await resNews.text();
      expect(xmlNews).toContain('<urlset');

      // 2. document-sitemap.xml
      const { GET: getDocSitemap } = await import('@/app/document-sitemap.xml/route');
      const resDoc = await getDocSitemap();
      expect(resDoc.status).toBe(200);
      expect(resDoc.headers.get('Content-Type')).toContain('application/xml');
      expect(resDoc.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resDoc.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const xmlDoc = await resDoc.text();
      expect(xmlDoc).toContain('<urlset');

      // 3. video-sitemap.xml
      const { GET: getVideoSitemap } = await import('@/app/video-sitemap.xml/route');
      const resVideo = await getVideoSitemap();
      expect(resVideo.status).toBe(200);
      expect(resVideo.headers.get('Content-Type')).toContain('application/xml');
      expect(resVideo.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resVideo.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const xmlVideo = await resVideo.text();
      expect(xmlVideo).toContain('<urlset');

      // 4. image-sitemap.xml
      const { GET: getImageSitemap } = await import('@/app/image-sitemap.xml/route');
      const resImage = await getImageSitemap();
      expect(resImage.status).toBe(200);
      expect(resImage.headers.get('Content-Type')).toContain('application/xml');
      expect(resImage.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resImage.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const xmlImage = await resImage.text();
      expect(xmlImage).toContain('<urlset');

      // 5. sitemap-regions.xml
      const { GET: getRegionsSitemap } = await import('@/app/sitemap-regions.xml/route');
      const resRegions = await getRegionsSitemap();
      expect(resRegions.status).toBe(200);
      expect(resRegions.headers.get('Content-Type')).toContain('application/xml');
      expect(resRegions.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resRegions.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const xmlRegions = await resRegions.text();
      expect(xmlRegions).toContain('<urlset');

      // 6. sitemap-index.xml (Master Index: noindex, follow)
      const { GET: getIndexSitemap } = await import('@/app/sitemap-index.xml/route');
      const resIndex = await getIndexSitemap();
      expect(resIndex.status).toBe(200);
      expect(resIndex.headers.get('Content-Type')).toContain('application/xml');
      expect(resIndex.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resIndex.headers.get('X-Robots-Tag')).toBe('noindex, follow');
      const xmlIndex = await resIndex.text();
      expect(xmlIndex).toContain('<sitemapindex');

      // 7. feed/tesis-yonetimi.xml (Tesis Yönetimi RSS)
      const { GET: getTesisFeed } = await import('@/app/feed/tesis-yonetimi.xml/route');
      const resTesisFeed = await getTesisFeed();
      expect(resTesisFeed.status).toBe(200);
      expect(resTesisFeed.headers.get('Content-Type')).toContain('application/rss+xml');
      expect(resTesisFeed.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resTesisFeed.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const xmlTesisFeed = await resTesisFeed.text();
      expect(xmlTesisFeed).toContain('<rss version="2.0"');

      // 8. rss.xml (Genel Blog RSS)
      const { GET: getRssXml } = await import('@/app/rss.xml/route');
      const resRssXml = await getRssXml();
      expect(resRssXml.status).toBe(200);
      expect(resRssXml.headers.get('Content-Type')).toContain('application/rss+xml');
      expect(resRssXml.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resRssXml.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const xmlRss = await resRssXml.text();
      expect(xmlRss).toContain('<rss version="2.0"');
    });
  });

  describe('97. Google Knowledge Graph & Entity Graph (JSON-LD) Otorite Zenginleştirmesi', () => {
    it('entity-graph.jsonld uç noktası ISO sertifikaları, Wikidata varlıkları, sosyal profiller ve aggregateRating döner', async () => {
      const { GET: getEntityGraph } = await import('@/app/api/tesis-yonetimi/entity-graph.jsonld/route');
      const resGraph = await getEntityGraph();

      expect(resGraph.status).toBe(200);
      expect(resGraph.headers.get('Content-Type')).toContain('application/ld+json');
      expect(resGraph.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resGraph.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const data = await resGraph.json();
      expect(data['@context']).toBe('https://schema.org');
      expect(Array.isArray(data['@graph'])).toBe(true);

      const org = data['@graph'].find((node: any) => node['@type'] === 'Organization');
      expect(org).toBeDefined();
      expect(org.name).toBe('Alo Yönetim');
      expect(org.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(org.telephone).toBe('+90 216 550 48 48');

      // ISO ve Yasal Sertifikasyon Doğrulamaları (ISO 41001, 9001, 14001, 45001, 27001, 10002, 5188, TSE)
      expect(Array.isArray(org.hasCredential)).toBe(true);
      expect(org.hasCredential.length).toBeGreaterThanOrEqual(8);
      const credentialNames = org.hasCredential.map((c: any) => c.name);
      expect(credentialNames.some((n: string) => n.includes('ISO 41001'))).toBe(true);
      expect(credentialNames.some((n: string) => n.includes('ISO 9001'))).toBe(true);
      expect(credentialNames.some((n: string) => n.includes('ISO 14001'))).toBe(true);
      expect(credentialNames.some((n: string) => n.includes('ISO 45001'))).toBe(true);
      expect(credentialNames.some((n: string) => n.includes('ISO 27001'))).toBe(true);
      expect(credentialNames.some((n: string) => n.includes('ISO 10002'))).toBe(true);
      expect(credentialNames.some((n: string) => n.includes('5188'))).toBe(true);
      expect(credentialNames.some((n: string) => n.includes('TSE HYB'))).toBe(true);

      // Wikidata Varlık Eşleştirmeleri (KMK Q161851, İİK Q6085270, Enerji Q381156, Yangın Q1065908)
      expect(Array.isArray(org.knowsAbout)).toBe(true);
      expect(org.knowsAbout).toContain('https://www.wikidata.org/wiki/Q161851');
      expect(org.knowsAbout).toContain('https://www.wikidata.org/wiki/Q6085270');
      expect(org.knowsAbout).toContain('https://www.wikidata.org/wiki/Q381156');
      expect(org.knowsAbout).toContain('https://www.wikidata.org/wiki/Q1065908');

      // Sosyal Ağ sameAs Linkleri
      expect(Array.isArray(org.sameAs)).toBe(true);
      expect(org.sameAs.some((s: string) => s.includes('linkedin.com/company/aloyonetim'))).toBe(true);
      expect(org.sameAs.some((s: string) => s.includes('instagram.com/aloyonetim'))).toBe(true);
      expect(org.sameAs.some((s: string) => s.includes('twitter.com/aloyonetim'))).toBe(true);
      expect(org.sameAs.some((s: string) => s.includes('youtube.com/@aloyonetim'))).toBe(true);

      // aggregateRating Doğrulaması (4.9 rating, 340 yorum)
      expect(org.aggregateRating).toBeDefined();
      expect(org.aggregateRating['@type']).toBe('AggregateRating');
      expect(org.aggregateRating.ratingValue).toBe('4.9');
      expect(org.aggregateRating.reviewCount).toBe(340);
      expect(org.aggregateRating.bestRating).toBe('5');
    });
  });

  describe('98. Kurumsal Akreditasyon Paritesi, LLM-Facts Açık Veri Bağlantıları ve Robots Standardizasyonu', () => {
    it('verify-credentials 8 ISO akreditasyonu sunar ve llm-facts tüm AI açık veri uç noktalarını bağlar', async () => {
      // 1. verify-credentials API
      const { GET: getVerifyCreds } = await import('@/app/api/tesis-yonetimi/verify-credentials/route');
      const resCreds = await getVerifyCreds();
      expect(resCreds.status).toBe(200);
      expect(resCreds.headers.get('Content-Type')).toContain('application/json');
      expect(resCreds.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resCreds.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataCreds = await resCreds.json();
      expect(dataCreds.accreditations.length).toBeGreaterThanOrEqual(8);
      const standardNames = dataCreds.accreditations.map((a: any) => a.standard);
      expect(standardNames.some((s: string) => s.includes('ISO 41001'))).toBe(true);
      expect(standardNames.some((s: string) => s.includes('ISO 9001'))).toBe(true);
      expect(standardNames.some((s: string) => s.includes('ISO 14001'))).toBe(true);
      expect(standardNames.some((s: string) => s.includes('ISO 45001'))).toBe(true);
      expect(standardNames.some((s: string) => s.includes('ISO 27001'))).toBe(true);
      expect(standardNames.some((s: string) => s.includes('ISO 10002'))).toBe(true);
      expect(standardNames.some((s: string) => s.includes('5188'))).toBe(true);
      expect(standardNames.some((s: string) => s.includes('TSE HYB'))).toBe(true);

      expect(dataCreds.schema.mainEntity.hasCredential.length).toBeGreaterThanOrEqual(8);

      // 2. llm-facts.json API
      const { GET: getLlmFacts } = await import('@/app/api/tesis-yonetimi/llm-facts.json/route');
      const reqFacts = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/llm-facts.json');
      const resFacts = await getLlmFacts(reqFacts);
      expect(resFacts.status).toBe(200);
      expect(resFacts.headers.get('Content-Type')).toContain('application/json');
      expect(resFacts.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resFacts.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      const dataFacts = await resFacts.json();
      expect(dataFacts.coreService.standards.some((s: string) => s.includes('ISO 9001'))).toBe(true);
      expect(dataFacts.coreService.standards.some((s: string) => s.includes('ISO 27001'))).toBe(true);
      expect(dataFacts.coreService.standards.some((s: string) => s.includes('ISO 10002'))).toBe(true);

      expect(dataFacts.linkedApis.geoCoverageGeoJson).toBeDefined();
      expect(dataFacts.linkedApis.districtsGeoJson).toBeDefined();
      expect(dataFacts.linkedApis.istanbulFacilityDataset).toBeDefined();
      expect(dataFacts.linkedApis.llmsTxt).toBeDefined();
      expect(dataFacts.linkedApis.llmsFullTxt).toBeDefined();

      // 3. geo-feed.xml API
      const { GET: getGeoFeed } = await import('@/app/api/tesis-yonetimi/geo-feed.xml/route');
      const reqGeo = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/geo-feed.xml');
      const resGeo = await getGeoFeed(reqGeo);
      expect(resGeo.status).toBe(200);
      expect(resGeo.headers.get('Content-Type')).toContain('application/xml');
      expect(resGeo.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resGeo.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');

      // 4. legal-precedents.json API
      const { GET: getPrecedents } = await import('@/app/api/tesis-yonetimi/legal-precedents.json/route');
      const reqPrec = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-precedents.json');
      const resPrec = await getPrecedents(reqPrec);
      expect(resPrec.status).toBe(200);
      expect(resPrec.headers.get('Content-Type')).toContain('application/json');
      expect(resPrec.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resPrec.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
    });
  });

  describe('99. Tesis RSS Feed, SEO-Health Güvenlik Mührü ve Kapsamlı SEO Devriye Bütünlüğü', () => {
    it('tesis-yonetimi/feed.xml CORS döner, seo-health noindex mühürlüdür ve devriye tüm haritaları doğrular', async () => {
      // 1. api/tesis-yonetimi/feed.xml
      const { GET: getTesisApiFeed } = await import('@/app/api/tesis-yonetimi/feed.xml/route');
      const resApiFeed = await getTesisApiFeed();
      expect(resApiFeed.status).toBe(200);
      expect(resApiFeed.headers.get('Content-Type')).toContain('application/xml');
      expect(resApiFeed.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resApiFeed.headers.get('X-Robots-Tag')).toBe('all, max-snippet:-1, max-image-preview:large');
      const xmlFeed = await resApiFeed.text();
      expect(xmlFeed).toContain('<rss version="2.0"');

      // 2. api/tesis-yonetimi/seo-health (Dahili Teftiş Uç Noktası)
      const { GET: getTesisSeoHealth } = await import('@/app/api/tesis-yonetimi/seo-health/route');
      const reqHealth = new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/seo-health');
      const resHealth = await getTesisSeoHealth(reqHealth);
      expect(resHealth.status).toBe(200);
      expect(resHealth.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(resHealth.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(resHealth.headers.get('Cache-Control')).toContain('no-store');

      // 3. facilitySeoPatrol auditSitemapIntegrity ve auditInternalLinks
      const { auditSitemapIntegrity, auditInternalLinks, runComprehensiveSeoPatrol } = await import('@/lib/seo/facilitySeoPatrol');
      const sitemapAudit = auditSitemapIntegrity();
      expect(sitemapAudit.status).toBe('VALID');
      expect(sitemapAudit.sitemapIntegrityScore).toBe(100);
      expect(sitemapAudit.missingCanonicalCount).toBe(0);
      expect(sitemapAudit.totalUrls).toBeGreaterThan(50);

      const linkAudit = auditInternalLinks();
      expect(linkAudit.status).toBe('CLEAN');
      expect(linkAudit.linkHealthScore).toBe(100);
      expect(linkAudit.brokenLinksFound).toBe(0);

      const patrolReport = runComprehensiveSeoPatrol();
      expect(['OPTIMAL', 'GOOD']).toContain(patrolReport.overallHealthStatus);
      expect(patrolReport.sitemapAudit.sitemapIntegrityScore).toBe(100);
      expect(patrolReport.brokenLinkAudit.brokenLinksFound).toBe(0);
    });
  });

  describe('100. Evrensel 8 Akreditasyon Şema Paritesi Güvencesi', () => {
    it('organizationSchema, credentialSchema ve districtFacilityServiceSchema 8 akreditasyonu eksiksiz sunar', async () => {
      // 1. organizationSchema
      const { organizationSchema, credentialSchema } = await import('@/lib/schemas/organization');
      const org = organizationSchema();
      expect(Array.isArray(org.hasCredential)).toBe(true);
      expect((org.hasCredential as any[]).length).toBe(8);

      const orgCredNames = (org.hasCredential as any[]).map((c) => c.name);
      expect(orgCredNames.some((n: string) => n.includes('ISO 41001'))).toBe(true);
      expect(orgCredNames.some((n: string) => n.includes('ISO 9001'))).toBe(true);
      expect(orgCredNames.some((n: string) => n.includes('ISO 14001'))).toBe(true);
      expect(orgCredNames.some((n: string) => n.includes('ISO 45001'))).toBe(true);
      expect(orgCredNames.some((n: string) => n.includes('ISO 27001'))).toBe(true);
      expect(orgCredNames.some((n: string) => n.includes('ISO 10002'))).toBe(true);
      expect(orgCredNames.some((n: string) => n.includes('5188'))).toBe(true);
      expect(orgCredNames.some((n: string) => n.includes('TSE HYB'))).toBe(true);

      // 2. credentialSchema
      const credList = credentialSchema();
      expect(credList['@type']).toBe('ItemList');
      expect((credList.itemListElement as any[]).length).toBe(8);
      const listCredNames = (credList.itemListElement as any[]).map((i) => i.item.name);
      expect(listCredNames.some((n: string) => n.includes('ISO 41001'))).toBe(true);
      expect(listCredNames.some((n: string) => n.includes('ISO 9001'))).toBe(true);
      expect(listCredNames.some((n: string) => n.includes('TSE HYB'))).toBe(true);

      // 3. districtFacilityServiceSchema (39 ilçe için referans kontrol)
      const { districtFacilityServiceSchema } = await import('@/lib/schemas/services');
      const distSchema = districtFacilityServiceSchema({
        districtName: 'Kadıköy',
        path: '/bolgeler/kadikoy/tesis-yonetimi',
        geo: { lat: 40.99, lng: 29.03 },
      });
      expect(distSchema['@type']).toBe('ProfessionalService');
      const providerCreds = (distSchema.provider as any).hasCredential;
      expect(Array.isArray(providerCreds)).toBe(true);
      expect(providerCreds.length).toBe(8);
      const providerCredNames = providerCreds.map((c: any) => c.name);
      expect(providerCredNames.some((n: string) => n.includes('ISO 41001'))).toBe(true);
      expect(providerCredNames.some((n: string) => n.includes('ISO 27001'))).toBe(true);
      expect(providerCredNames.some((n: string) => n.includes('ISO 10002'))).toBe(true);
      expect(providerCredNames.some((n: string) => n.includes('TSE HYB'))).toBe(true);
    });
  });

  describe('101. Manifest PWA Kısayolları ve İlçe Kıyaslama Şema Zenginleştirmesi', () => {
    it('manifest.ts Tesis Yönetimi ve Sözlük kısayollarını sunar; comparator şeması 8 akreditasyon içerir', async () => {
      // 1. manifest.ts kontrolü
      const { default: manifest } = await import('@/app/manifest');
      const manifestData = manifest();
      expect(manifestData.name).toContain('Alo Yönetim');
      expect(Array.isArray(manifestData.shortcuts)).toBe(true);
      const shortcutUrls = (manifestData.shortcuts as any[]).map((s) => s.url);
      expect(shortcutUrls).toContain('/hizmetler/tesis-yonetimi');
      expect(shortcutUrls).toContain('/sozluk');
      expect(shortcutUrls).toContain('/hesaplayici');

      // 2. compareFacilityDistricts kontrolü
      const { compareFacilityDistricts } = await import('@/lib/seo/facilityDistrictComparator');
      const comparison = compareFacilityDistricts(['kadikoy', 'besiktas'], 'tr');
      expect(comparison).toBeDefined();
      expect(comparison?.schema['@type']).toBe('Table');
      const aboutBusinesses = (comparison?.schema as any).about;
      expect(aboutBusinesses.length).toBe(2);
      expect(aboutBusinesses[0].parentOrganization.hasCredential.length).toBe(8);
      const compCredNames = aboutBusinesses[0].parentOrganization.hasCredential.map((c: any) => c.name);
      expect(compCredNames.some((n: string) => n.includes('ISO 41001'))).toBe(true);
      expect(compCredNames.some((n: string) => n.includes('ISO 9001'))).toBe(true);
      expect(compCredNames.some((n: string) => n.includes('TSE HYB'))).toBe(true);
    });
  });

  describe('102. SemanticLinker Alt Sektör ve 8 Akreditasyon Eşleşme Güvencesi', () => {
    it('SemanticLinker alt sektörleri, ISO/TSE akreditasyonlarını ve kariyer sayfalarını doğru bağlar', async () => {
      const React = await import('react');
      const { renderToStaticMarkup } = await import('react-dom/server');
      const { default: SemanticLinker } = await import('@/components/seo/SemanticLinker');

      const sampleText = 'İstanbul genelinde rezidans yönetimi, plaza yönetimi ve sanayi tesisi yönetimi süreçlerinde ISO 9001 ve TSE HYB kalite standartları uygulanırken, istihdam köprüsü ile personel istihdamı sağlanır.';

      const rendered = renderToStaticMarkup(React.createElement(SemanticLinker, { text: sampleText, maxLinks: 6 }));

      expect(rendered).toContain('/hizmetler/tesis-yonetimi/rezidans-site-yonetimi');
      expect(rendered).toContain('/hizmetler/tesis-yonetimi/plaza-yonetimi');
      expect(rendered).toContain('/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi');
      expect(rendered).toContain('/kurumsal/kalite-belgelerimiz');
      expect(rendered).toContain('/istihdam-koprusu');
    });
  });

  describe('103. autoLinker Akreditasyon ve Kurumsal Semantik Ağ Güvencesi', () => {
    it('autoLinkHtml ISO ve TSE akreditasyonlarını /kurumsal/kalite-belgelerimiz sayfasına bağlar ve self-link engeller', async () => {
      const { autoLinkHtml } = await import('@/lib/autoLinker');

      const html = '<p>Firmamız ISO 9001:2015 ve TSE HYB 12850 belgeleri ile istihdam köprüsü projelerini yönetir.</p>';
      const linked = autoLinkHtml(html, '/blog/ornek-yazi');

      expect(linked).toContain('href="/kurumsal/kalite-belgelerimiz"');
      expect(linked).toContain('href="/istihdam-koprusu"');

      // Kalite belgelerimiz sayfasında iken kendine link vermemelidir (self-referencing engeli)
      const selfPageLinked = autoLinkHtml(html, '/kurumsal/kalite-belgelerimiz');
      expect(selfPageLinked).not.toContain('href="/kurumsal/kalite-belgelerimiz"');
      expect(selfPageLinked).toContain('href="/istihdam-koprusu"');
    });

    it('FACILITY_MANAGEMENT_ENTITIES ISO ve TSE standartları varyasyonlarına sahiptir', async () => {
      const { FACILITY_MANAGEMENT_ENTITIES } = await import('@/lib/seoEngine');

      const securityEntity = FACILITY_MANAGEMENT_ENTITIES.find((e) => e.slug === 'guvenlik-yonetimi');
      expect(securityEntity?.variations.some((v) => v.includes('iso 27001'))).toBe(true);

      const techEntity = FACILITY_MANAGEMENT_ENTITIES.find((e) => e.slug === 'teknik-bakim');
      expect(techEntity?.variations.some((v) => v.includes('iso 9001'))).toBe(true);

      const duesEntity = FACILITY_MANAGEMENT_ENTITIES.find((e) => e.slug === 'aidat-takibi');
      expect(duesEntity?.variations.some((v) => v.includes('iso 10002'))).toBe(true);
    });
  });
});




