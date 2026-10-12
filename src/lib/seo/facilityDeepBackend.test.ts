import { describe, it, expect, beforeEach } from 'vitest';
import {
  detectAndLogAiCrawler,
  getAiCrawlerAnalytics,
  clearAiCrawlerLogsForTesting,
  checkAiCrawlerRateLimit,
} from '@/lib/seo/bots/aiBotTelemetry';
import { generateFacilityRfpDocument } from '@/data/rfpGeneratorData';
import { resolveSiloRedirect } from '@/lib/seo/indexing/siloRedirector';
import { findNearestFacilityHub } from '@/lib/seo/indexing/edgeGeoResolver';
import { b2bServiceSchema } from '@/lib/schemas/services';

describe('Tesis Yönetimi Derin Backend SEO & Hukuki Otorite Motorları (Faz 7)', () => {
  beforeEach(() => {
    clearAiCrawlerLogsForTesting();
  });

  describe('AI Bot & LLM Tarama Telemetrisi (aiBotTelemetry.ts)', () => {
    it('GPTBot, PerplexityBot ve ClaudeBot taramalarını doğru tespit eder', () => {
      const gptResult = detectAndLogAiCrawler(
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
        '/api/ai/facility-agent-context.json',
        '20.15.10.5'
      );
      expect(gptResult.isAiBot).toBe(true);
      expect(gptResult.botName).toBe('GPTBot');
      expect(gptResult.botFamily).toBe('OpenAI');

      const perplexityResult = detectAndLogAiCrawler(
        'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
        '/bolgeler/kadikoy/tesis-yonetimi',
        '157.240.1.1'
      );
      expect(perplexityResult.isAiBot).toBe(true);
      expect(perplexityResult.botName).toBe('PerplexityBot');
      expect(perplexityResult.botFamily).toBe('Perplexity');

      const analytics = getAiCrawlerAnalytics();
      expect(analytics.totalAiHits).toBe(2);
      expect(analytics.uniqueBotsCount).toBe(2);
      expect(analytics.aiVisibilityScore).toBeGreaterThan(10);
    });

    it('Standart tarayıcıları AI botu olarak işaretlemez', () => {
      const humanResult = detectAndLogAiCrawler(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        '/'
      );
      expect(humanResult.isAiBot).toBe(false);
    });

    it('AI botları için token-bucket hız sınırlandırması uygular (Faz 43)', () => {
      const ip = '198.51.100.22';
      const bot = 'GPTBot';
      const firstCheck = checkAiCrawlerRateLimit(ip, bot);
      expect(firstCheck.allowed).toBe(true);
      expect(firstCheck.remainingTokens).toBeLessThan(120);
    });
  });


  describe('B2B Tesis Yönetimi Şartname RFP Motoru (generateFacilityRfpDocument)', () => {
    it('Şartname metnini ve Schema.org DigitalDocument yapısını eksiksiz üretir', () => {
      const rfp = generateFacilityRfpDocument({
        facilityName: 'Göztepe Park Konutları',
        units: 120,
        blocks: 4,
        districtSlug: 'kadikoy',
        servicesNeeded: ['guvenlik', 'temizlik', 'teknik', 'muhasebe'],
      });

      expect(rfp.facilityName).toBe('Göztepe Park Konutları');
      expect(rfp.districtName).toBe('Kadıköy');
      expect(rfp.units).toBe(120);
      expect(rfp.sections.length).toBe(5);
      expect(rfp.fullText).toContain('634 Sayılı Kat Mülkiyeti Kanunu');
      expect(rfp.fullText).toContain('5188 Sayılı');
      expect(rfp.schema['@type']).toBe('DigitalDocument');
    });
  });



  describe('Akıllı Silo Yönlendiricisi (resolveSiloRedirect)', () => {
    it('İlçe ve hizmet içeren eski yolları doğru yerel sayfaya yönlendirir', () => {
      const result = resolveSiloRedirect('/kadikoy-apartman-guvenlik-firmalari');
      expect(result.hasMatch).toBe(true);
      expect(result.targetPath).toBe('/bolgeler/kadikoy/guvenlik-yonetimi');
    });

    it('Yalnızca ilçe içeren yolları o ilçenin Tesis Yönetimi sayfasına yönlendirir', () => {
      const result = resolveSiloRedirect('/besiktas-site-yonetim-sirketi');
      expect(result.hasMatch).toBe(true);
      expect(result.targetPath).toBe('/bolgeler/besiktas/tesis-yonetimi');
    });

    it('Sektörel anahtar kelimeleri ilgili sektörel çözüme bağlar', () => {
      const result = resolveSiloRedirect('/luks-rezidans-yonetim-hizmeti');
      expect(result.hasMatch).toBe(true);
      expect(result.targetPath).toBe('/sektorel-cozumler/rezidans-yonetimi');
    });
  });

  describe('B2B Hizmet ve Hedef Sektör Şeması (b2bServiceSchema - Faz 70)', () => {
    it('B2BService ve BusinessAudience şema yapısını eksiksiz üretir', () => {
      const schema = b2bServiceSchema({
        serviceType: 'Plaza & İş Merkezi Tesis Yönetimi',
        path: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
        description: 'Kurumsal iş merkezleri için entegre tesis ve teknik işletme çözümleri.',
        industry: 'Gayrimenkul ve Plaza Yönetimi',
      });

      expect(schema['@type']).toContain('B2BService');
      expect(schema.industry).toBe('Gayrimenkul ve Plaza Yönetimi');
      expect(schema.areaServed).toEqual({ '@type': 'State', name: 'İstanbul' });
      expect(schema.audience).toBeDefined();
    });
  });
});

