import { describe, it, expect } from 'vitest';
import { generateEdgeSeoHeaders, buildHttpLinkHeader, buildXRobotsTag } from './edgeHeaderInjector';
import { buildFacilityAuthorityCorpus } from './facilityAuthorityCorpusEngine';
import { GET as getGeoFeed } from '@/app/api/tesis-yonetimi/geo-feed.xml/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { CANONICAL_NAP } from './napGuardEngine';

describe('İç Backend SEO Mega Motoru (facilityBackendSeoMega.test.ts)', () => {
  describe('Edge SEO Response Headers & Bot Denetimi (edgeHeaderInjector.ts)', () => {
    it('Kanonik link, hreflang, llms.txt ve entity graph linklerini eksiksiz üretir', () => {
      const linkHeader = buildHttpLinkHeader('/hizmetler/tesis-yonetimi', 'tr');
      
      expect(linkHeader).toContain('rel="canonical"');
      expect(linkHeader).toContain('hreflang="tr"');
      expect(linkHeader).toContain('hreflang="en"');
      expect(linkHeader).toContain('hreflang="x-default"');
      expect(linkHeader).toContain('/llms.txt');
      expect(linkHeader).toContain('/api/tesis-yonetimi/geo-feed.xml');
    });

    it('X-Robots-Tag ve AI alıntı başlıklarını tek merkezli ekler', () => {
      const headers = generateEdgeSeoHeaders('/bolgeler/kadikoy', 'tr');

      expect(headers['X-Robots-Tag']).toContain('max-image-preview:large');
      expect(headers['X-AI-Citation']).toContain('Alo Yönetim');
      expect(headers['X-Legal-Entity']).toContain(CANONICAL_NAP.legal.mersisNumber);
      expect(headers['Content-Language']).toBe('tr-TR');
    });

    it('noindex durumunda doğru X-Robots-Tag üretir', () => {
      const tag = buildXRobotsTag({ noindex: true, nofollow: true });
      expect(tag).toBe('noindex, nofollow');
    });
  });

  describe('Semantik Hukuk & KMK 634 Otorite Külliyatı (facilityAuthorityCorpusEngine.ts)', () => {
    it('KMK Madde 12, 20, 28, 34, 35, 37, 38, 41 maddelerini eksiksiz derler', () => {
      const corpus = buildFacilityAuthorityCorpus('tr');
      const articles = corpus.legalFramework.kmk634Articles;

      expect(articles.length).toBeGreaterThanOrEqual(7);
      expect(articles.some(a => a.articleNumber === 20)).toBe(true);
      expect(articles.some(a => a.articleNumber === 35)).toBe(true);
      expect(articles.some(a => a.articleNumber === 38)).toBe(true);
      expect(corpus.legalFramework.executionLaw2004.article68Scope).toContain('İİK 68');
    });

    it('ISO 41001 KPI sistemini ve doğrulanmış başarı metriklerini içerir', () => {
      const corpus = buildFacilityAuthorityCorpus('tr');

      expect(corpus.iso41001KpiSystem.length).toBeGreaterThanOrEqual(4);
      expect(corpus.provenMetrics.activeFacilityPortfolioCount).toBeGreaterThanOrEqual(100);
      expect(corpus.provenMetrics.duesCollectionEfficiencyRatePercent).toBeGreaterThanOrEqual(98);
    });
  });

  describe('39 İlçe Dinamik GeoRSS XML Feed (/api/tesis-yonetimi/geo-feed.xml)', () => {
    it('Geçerli GeoRSS XML üretir ve 39 ilçeyi kapsar', async () => {
      const res = await getGeoFeed(new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/geo-feed.xml'));
      expect(res.status).toBe(200);

      const xmlText = await res.text();
      expect(xmlText).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xmlText).toContain('<rss version="2.0"');
      expect(xmlText).toContain('xmlns:georss=');
      expect(xmlText).toContain('Kadıköy');
      expect(xmlText).toContain('Beşiktaş');
      expect(xmlText).toContain('tesis:slaEmergencyMinutes');
      expect(xmlText).toContain(CANONICAL_NAP.legal.mersisNumber);
    });
  });

  describe('AI & LLM Bilgi Protokolü (/llms.txt)', () => {
    it('Standart grounding ve citation direktiflerini doğru döndürür', async () => {
      const res = await getLlmsTxt();
      expect(res.status).toBe(200);

      const text = await res.text();
      expect(text).toContain('# Alo Yönetim ve Organizasyon A.Ş.');
      expect(text).toContain('CANONICAL_NAP' in {} || CANONICAL_NAP.legal.mersisNumber);
      expect(text).toContain('ISO 41001:2018');
      expect(text).toContain('Ground Truth Q&A');
      expect(text).toContain('/api/tesis-yonetimi/geo-feed.xml');
    });
  });

  describe('Hiper-Yerel Mahalle FAQ Sentezleyici (facilityFaqSynthesizer.ts)', () => {
    it('Moda (Kadıköy) ve Florya (Bakırköy) için dinamik Schema.org FAQPage üretir', async () => {
      const { synthesizeNeighborhoodFacilityFaq } = await import('./facilityFaqSynthesizer');
      const resultModa = synthesizeNeighborhoodFacilityFaq('kadikoy', 'moda');

      expect(resultModa.districtSlug).toBe('kadikoy');
      expect(resultModa.neighborhoodSlug).toBe('moda');
      expect(resultModa.faqs.length).toBe(4);
      expect(resultModa.faqs[0].question).toContain('Moda');
      expect(resultModa.schema).not.toBeNull();
      expect(resultModa.schema?.['@type']).toBe('FAQPage');

      const resultFlorya = synthesizeNeighborhoodFacilityFaq('bakirkoy', 'florya');
      expect(resultFlorya.neighborhoodName).toBeDefined();
      expect(resultFlorya.faqs.some(f => f.topic === 'TECHNICAL_SLA')).toBe(true);
      expect(resultFlorya.faqs.some(f => f.topic === 'KMK_634')).toBe(true);
    });
  });

  describe('AI Snippets Canonical Route Uyumluluğu (facilityAiSnippetEngine.ts)', () => {
    it('İngilizce ve Türkçe AI Snippet atıf linkleri kanonik ve 200 uyumlu rotalara bakar', async () => {
      const { generateFacilityAiSnippets } = await import('./facilityAiSnippetEngine');
      const enPayload = generateFacilityAiSnippets('en');

      expect(enPayload.totalSnippets).toBe(7);
      for (const snippet of enPayload.snippets) {
        expect(snippet.citationAnchorUrl).toMatch(/^https:\/\/aloyonetim\.com\.tr/);
        // Eski bozuk rotaları içermemeli
        expect(snippet.citationAnchorUrl).not.toContain('/en/hizmetler/guvenlik-hizmetleri');
        expect(snippet.citationAnchorUrl).not.toContain('/en/hizmetler/teknik-yonetim');
        expect(snippet.citationAnchorUrl).not.toContain('/en/hizmetler/aidat-yonetimi');
        expect(snippet.citationAnchorUrl).not.toContain('/en/hizmetler/ticari-yonetim');
      }
    });
  });

  describe('Otonom SEO Patrol Rota & Sitemap Sağlığı (facilitySeoPatrol.ts)', () => {
    it('Yeni feed ve geo açık veri rotalarını sitemap ve internal links auditinde tanır', async () => {
      const { auditSitemapIntegrity, auditInternalLinks } = await import('./facilitySeoPatrol');
      const sitemapResult = auditSitemapIntegrity();
      expect(sitemapResult.status).toBe('VALID');
      expect(sitemapResult.sitemapIntegrityScore).toBe(100);

      const linksResult = auditInternalLinks();
      expect(linksResult.status).toBe('CLEAN');
      expect(linksResult.brokenLinksFound).toBe(0);
    });
  });

  describe('Hiper-Yerel Proximity & Mahalle "Near-Me" Motoru (edgeGeoResolver.ts)', () => {
    it('Moda koordinatlarında en yakın mahalleyi ve 15-25 dk SLA süresini saptar', async () => {
      const { findNearestFacilityHub } = await import('./edgeGeoResolver');
      // Kadıköy Moda sahil koordinatı
      const hub = findNearestFacilityHub(40.985, 29.028);

      expect(hub.nearestDistrict.slug).toBe('kadikoy');
      expect(hub.nearestNeighborhood).toBeDefined();
      expect(hub.nearestNeighborhood?.slug).toBe('moda');
      expect(hub.nearestNeighborhood?.name).toBe('Moda');
      expect(hub.nearestNeighborhood?.neighborhoodSlaMinutes).toBeLessThanOrEqual(25);
      expect(hub.estimatedSlaMinutes).toBeLessThanOrEqual(45);
      expect(hub.schema.name).toContain('Moda');
      expect(hub.schema.areaServed).toContain('Moda Mahallesi');
    });

    it('Beşiktaş Levent koordinatlarında ilgili mahalleyi saptar', async () => {
      const { findNearestFacilityHub } = await import('./edgeGeoResolver');
      // Levent koordinatı
      const hub = findNearestFacilityHub(41.080, 29.015);

      expect(hub.nearestDistrict.slug).toBe('besiktas');
      expect(hub.nearestNeighborhood).toBeDefined();
      expect(hub.nearestNeighborhood?.slug).toBe('levent');
    });
  });

  describe('GSC Zengin Sonuç Şema Linter Genişletmesi (schemaLinter.ts)', () => {
    it('WebApplication, GeoCoordinates ve SearchAction şemalarını başarıyla doğrular', async () => {
      const { lintSchemaOrgObject } = await import('./schemaLinter');

      const webAppReport = lintSchemaOrgObject({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Alo Yönetim Aidat Hesaplayıcı',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
      });
      expect(webAppReport.isValid).toBe(true);
      expect(webAppReport.googleRichResultsCompliant).toBe(true);

      const geoReport = lintSchemaOrgObject({
        '@context': 'https://schema.org',
        '@type': 'GeoCoordinates',
        latitude: 40.9912,
        longitude: 29.0274,
      });
      expect(geoReport.isValid).toBe(true);

      const searchActionReport = lintSchemaOrgObject({
        '@context': 'https://schema.org',
        '@type': 'SearchAction',
        target: 'https://aloyonetim.com.tr/arama?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      });
      expect(searchActionReport.isValid).toBe(true);
    });
  });

  describe('W3C Server-Timing & Edge Header Telemetrisi (edgeHeaderInjector.ts)', () => {
    it('Server-Timing ve X-Coverage-Scope başlıklarını eksiksiz üretir', async () => {
      const { generateEdgeSeoHeaders } = await import('./edgeHeaderInjector');
      const headers = generateEdgeSeoHeaders('/bolgeler/kadikoy/mahalleler/moda', 'tr');

      expect(headers['Server-Timing']).toContain('Alo-Edge-Cache');
      expect(headers['X-Coverage-Scope']).toContain('169 Neighborhoods');
      expect(headers['X-Content-Type-Options']).toBe('nosniff');
    });
  });

  describe('169 Mahalle Otonom SEO Patrol Denetimi (facilitySeoPatrol.ts)', () => {
    it('Tüm mahalle sayfalarını denetler ve yüksek skorla OPTIMAL durum döner', async () => {
      const { auditNeighborhoodSeoPages } = await import('./facilitySeoPatrol');
      const report = auditNeighborhoodSeoPages();

      expect(report.totalNeighborhoodsAudited).toBeGreaterThanOrEqual(160);
      expect(report.averageScore).toBeGreaterThanOrEqual(90);
      expect(report.healthStatus).toBe('OPTIMAL');
      expect(report.pages[0].path).toMatch(/^\/bolgeler\/[a-z0-9-]+\/mahalleler\/[a-z0-9-]+$/);
    });
  });

  describe('AI Bot Doğrulama & LLM Hızlı Şerit Motoru (botVerifier.ts)', () => {
    it('GPTBot, ClaudeBot ve Perplexity botlarını doğrular ve AI Fast-Lane önbellek önerir', async () => {
      const { verifySearchBot } = await import('./botVerifier');

      const gptResult = verifySearchBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)');
      expect(gptResult.isBot).toBe(true);
      expect(gptResult.isAiBot).toBe(true);
      expect(gptResult.allowFastLane).toBe(true);
      expect(gptResult.botName).toBe('GPTBot');

      const claudeResult = verifySearchBot('ClaudeBot/1.0; +claudebot@anthropic.com');
      expect(claudeResult.isBot).toBe(true);
      expect(claudeResult.isAiBot).toBe(true);
      expect(claudeResult.botName).toBe('ClaudeBot');

      const perplexityResult = verifySearchBot('Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)');
      expect(perplexityResult.isBot).toBe(true);
      expect(perplexityResult.isAiBot).toBe(true);
      expect(perplexityResult.botName).toBe('PerplexityBot');
    });
  });

  describe('Aidat Açık Veri API 169 Mahalle & CSV Dışa Aktarımı (/api/tesis-yonetimi/dues-index.json)', () => {
    it('JSON formatında 169 mahalle özetini döner ve schema.org/Dataset çift dağıtım içerir', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/dues-index.json/route');
      const res = await GET(new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dues-index.json'));
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.istanbulSummary.totalNeighborhoods).toBeGreaterThanOrEqual(160);
      expect(data.districts[0].neighborhoodsCount).toBeGreaterThan(0);
      expect(data.schema.distribution.some((d: any) => d.encodingFormat === 'text/csv')).toBe(true);
    });

    it('format=csv istendiğinde RFC 4180 UTF-8 CSV çıktısı verir', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/dues-index.json/route');
      const res = await GET(new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/dues-index.json?format=csv'));
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('text/csv');

      const text = await res.text();
      expect(text).toContain('Ilce,Yaka,Nufus,Mahalle_Sayisi');
      expect(text).toContain('Kadıköy');
      expect(text).toContain('Anadolu Yakası');
    });
  });

  describe('Google News & Discover Zengin Sitemap Etiketleri (/news-sitemap.xml)', () => {
    it('Haberler için image:image ve news:keywords etiketlerini içerir', async () => {
      const { GET } = await import('@/app/news-sitemap.xml/route');
      const res = await GET();
      expect(res.status).toBe(200);

      const xml = await res.text();
      expect(xml).toContain('xmlns:image=');
      expect(xml).toContain('<image:image>');
      expect(xml).toContain('<image:loc>');
    });
  });

  describe('Wave 5: Google Chrome Private Prefetch Proxy (/.well-known/traffic-advice)', () => {
    it('traffic-advice route fraction 1.0 ve google fraction 1.0 döner', async () => {
      const { GET } = await import('@/app/.well-known/traffic-advice/route');
      const res = await GET();
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/trafficadvice+json');
      expect(res.headers.get('Cache-Control')).toContain('max-age=86400');

      const data = await res.json();
      expect(data[0].user_agent).toBe('prefetch-proxy');
      expect(data[0].fraction).toBe(1.0);
      expect(data[0].google?.fraction).toBe(1.0);
    });

    it('public/.well-known/traffic-advice statik dosyası diskte mevcuttur ve geçerli JSON içerir', async () => {
      const fs = await import('fs');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'public', '.well-known', 'traffic-advice');

      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      expect(parsed[0].user_agent).toBe('prefetch-proxy');
      expect(parsed[0].fraction).toBe(1.0);
    });
  });

  describe('Wave 5: Yargıtay Emsal Kararları Açık Veri CSV & Dataset Şeması (/api/tesis-yonetimi/legal-precedents.json)', () => {
    it('format=csv ile RFC 4180 UTF-8 BOM CSV çıktısı verir', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/legal-precedents.json/route');
      const res = await GET(new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-precedents.json?format=csv'));
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('text/csv');

      const text = await res.text();
      expect(text).toContain('ID,Mahkeme,Esas_No,Karar_No,Karar_Tarihi');
      expect(text).toContain('yargitay-asansor-zemin-kat');
      expect(text).toContain('yargitay-aidat-yuzde-bes-faiz');
    });

    it('JSON yanıtında Schema.org Dataset çift dağıtım ve HTTP Link başlığı sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/legal-precedents.json/route');
      const res = await GET(new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/legal-precedents.json'));
      expect(res.status).toBe(200);
      expect(res.headers.get('Link')).toContain('format=csv');

      const data = await res.json();
      expect(data.datasetSchema['@type']).toBe('Dataset');
      expect(data.datasetSchema.distribution.length).toBe(2);
      expect(data.datasetSchema.distribution.some((d: any) => d.encodingFormat === 'text/csv')).toBe(true);
    });
  });

  describe('Wave 5: 634 KMK Kanun İndeksi 12 Temel Madde & CSV Dağıtımı (/api/tesis-yonetimi/kmk-law-index.json)', () => {
    it('KMK 18, 28, 38 ve 45 maddelerini içerir ve toplam 12 madde sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/kmk-law-index.json/route');
      const res = await GET(new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/kmk-law-index.json'));
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.metadata.totalArticlesIndexed).toBeGreaterThanOrEqual(12);
      const articleNums = data.articles.map((a: any) => a.articleNumber);
      expect(articleNums).toContain(18);
      expect(articleNums).toContain(20);
      expect(articleNums).toContain(28);
      expect(articleNums).toContain(34);
      expect(articleNums).toContain(38);
      expect(articleNums).toContain(45);
    });

    it('format=csv ile KMK mevzuat tablosunu RFC 4180 olarak indirir', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/kmk-law-index.json/route');
      const res = await GET(new Request('https://aloyonetim.com.tr/api/tesis-yonetimi/kmk-law-index.json?format=csv'));
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('text/csv');

      const text = await res.text();
      expect(text).toContain('Madde_No,Baslik,Kategori');
      expect(text).toContain('Ortak Yerler ve Tesisler');
    });
  });

  describe('Wave 5: RFC 8288 HTTP Link Başlığı Auto-Discovery (edgeHeaderInjector.ts)', () => {
    it('OpenSearch, RSS 2.0 ve WebSub Hub linklerini eksiksiz üretir', () => {
      const link = buildHttpLinkHeader('/hizmetler/tesis-yonetimi', 'tr');
      expect(link).toContain('rel="search"');
      expect(link).toContain('/opensearch.xml');
      expect(link).toContain('/feed.xml');
      expect(link).toContain('https://pubsubhubbub.appspot.com/');
      expect(link).toContain('rel="hub"');
    });
  });

  describe('Wave 5: Knowledge Graph E-E-A-T Kalite Belgesi Çözümlemesi', () => {
    it('entity-graph.jsonld kalite belgeleri için kanonik URL döner', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/entity-graph.jsonld/route');
      const res = await GET();
      expect(res.status).toBe(200);

      const data = await res.json();
      const org = data['@graph'].find((n: any) => n['@type'] === 'Organization');
      expect(org).toBeDefined();
      expect(org.hasCredential.length).toBeGreaterThanOrEqual(8);
      const iso14001 = org.hasCredential.find((c: any) => c.name.includes('ISO 14001'));
      expect(iso14001?.url).toContain('/kurumsal/sertifikalar/iso-14001');
    });

    it('verify-credentials API kanonik sertifika URLleri sunar', async () => {
      const { GET } = await import('@/app/api/tesis-yonetimi/verify-credentials/route');
      const res = await GET();
      expect(res.status).toBe(200);

      const data = await res.json();
      const iso45001 = data.schema.mainEntity.hasCredential.find((c: any) => c.name.includes('ISO 45001'));
      expect(iso45001?.url).toContain('/kurumsal/sertifikalar/iso-45001');
    });
  });

  describe('Wave 5: Amazonbot, Meta ve Bytespider AI Bot Doğrulaması (botVerifier.ts)', () => {
    it('Amazonbot ve Meta-ExternalAgent botlarını doğrular ve AI Fast-Lane önbellek önerir', async () => {
      const { verifySearchBot } = await import('./botVerifier');

      const amazonResult = verifySearchBot('Mozilla/5.0 (compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot)');
      expect(amazonResult.isBot).toBe(true);
      expect(amazonResult.isAiBot).toBe(true);
      expect(amazonResult.allowFastLane).toBe(true);
      expect(amazonResult.botName).toBe('Amazonbot');

      const metaResult = verifySearchBot('Mozilla/5.0 (compatible; Meta-ExternalAgent/1.0; +https://developers.facebook.com/docs/sharing/webmasters/crawler)');
      expect(metaResult.isBot).toBe(true);
      expect(metaResult.isAiBot).toBe(true);
      expect(metaResult.botName).toBe('Meta-ExternalAgent');
    });
  });
});



