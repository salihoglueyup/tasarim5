import { describe, it, expect, beforeEach } from 'vitest';
import {
  detectAndLogAiCrawler,
  getAiCrawlerAnalytics,
  clearAiCrawlerLogsForTesting,
  checkAiCrawlerRateLimit,
} from '@/lib/seo/aiBotTelemetry';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';
import { generateFacilityRfpDocument } from '@/data/rfpGeneratorData';
import { resolveSiloRedirect } from '@/lib/seo/siloRedirector';
import { calculateFacilityBudget } from '@/data/facilityBudgetData';
import { findNearestFacilityHub } from '@/lib/seo/edgeGeoResolver';

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

  describe('KMK 634 & Yargıtay Emsal Kararları (YARGITAY_LEGAL_PRECEDENTS)', () => {
    it('Asansör, cam balkon ve %5 faiz kararlarını içerir', () => {
      expect(YARGITAY_LEGAL_PRECEDENTS.length).toBeGreaterThanOrEqual(5);

      const asansor = YARGITAY_LEGAL_PRECEDENTS.find((p) => p.id === 'yargitay-asansor-zemin-kat');
      expect(asansor).toBeDefined();
      expect(asansor?.court).toContain('Yargıtay');
      expect(asansor?.bindingPrecedentText).toBeDefined();

      const faiz = YARGITAY_LEGAL_PRECEDENTS.find((p) => p.id === 'yargitay-aidat-yuzde-bes-faiz');
      expect(faiz).toBeDefined();
      expect(faiz?.kmkArticle).toContain('Madde 20/2');
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
      expect(rfp.fullText).toContain('ISO 41001:2018');
      expect(rfp.fullText).toContain('5188 Sayılı');
      expect(rfp.schema['@type']).toBe('DigitalDocument');
    });
  });

  describe('39 İlçe Tesis Bütçe Hesaplama Motoru (calculateFacilityBudget)', () => {
    it('Kadıköy ve Beşiktaş için dinamik aidat katsayılı hesaplama yapar', () => {
      const kadikoyRes = calculateFacilityBudget(50, 'site', 'kadikoy');
      const besiktasRes = calculateFacilityBudget(50, 'site', 'besiktas');

      expect(kadikoyRes.estimatedMonthlyBudget).toBeGreaterThan(0);
      expect(besiktasRes.estimatedMonthlyBudget).toBeGreaterThan(0);
      expect(kadikoyRes.savingsWithAloYonetim.annualSavingsAmount).toBeGreaterThan(0);
      expect(besiktasRes.savingsWithAloYonetim.savingsPercentage).toBeGreaterThanOrEqual(20);
    });
  });

  describe('Edge Geo Resolver (findNearestFacilityHub)', () => {
    it('Verilen koordinatlar için en yakın ilçe ve aidat verilerini döner', () => {
      const result = findNearestFacilityHub(40.99, 29.02); // Kadıköy koordinatları

      expect(result.nearestDistrict.slug).toBe('kadikoy');
      expect(result.duesData.avgDuesM2).toBeGreaterThan(0);
      expect(result.duesData.savingsRate).toBeGreaterThanOrEqual(20);
      expect(result.estimatedSlaMinutes).toBeLessThanOrEqual(45);
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
});
