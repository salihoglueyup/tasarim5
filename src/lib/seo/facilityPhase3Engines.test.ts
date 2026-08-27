import { describe, it, expect } from 'vitest';
import { compareFacilityDistricts } from './facilityDistrictComparator';
import { buildFacilityIndexNowPayload } from './facilityIndexNowPinger';
import { recordBotCrawlEvent, generateBotAnalyticsReport } from './facilityBotAuditLog';
import { synthesizeFacilityVoiceQA } from './facilityVoiceAiSynthesizer';

describe('Tesis Yönetimi Faz 3 İleri Düzey Backend SEO Motorları', () => {
  describe('İlçe Kıyaslama Motoru (facilityDistrictComparator.ts)', () => {
    it('Kadıköy ve Beşiktaş ilçelerini aidat ve tasarruf parametrelerine göre kıyaslar', () => {
      const result = compareFacilityDistricts(['kadikoy', 'besiktas']);

      expect(result).toBeDefined();
      expect(result?.districts.length).toBe(2);
      expect(result?.districts[0].avgDuesM2).toBeGreaterThan(0);
      expect(result?.districts[1].avgDuesM2).toBeGreaterThan(0);
      expect(result?.duesDifferenceM2).toBeGreaterThanOrEqual(0);
      expect(result?.seoSummaryParagraph).toContain('Kadıköy');
      expect(result?.seoSummaryParagraph).toContain('Beşiktaş');
      expect(result?.schema['@type']).toBe('Table');
    });

    it('Geçersiz veya tek ilçe verildiğinde varsayılan kıyaslama ile tamamlar', () => {
      const result = compareFacilityDistricts(['gecersiz-ilce']);

      expect(result).toBeDefined();
      expect(result?.districts.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('IndexNow Push Motoru (facilityIndexNowPinger.ts)', () => {
    it('39 ilçe ve ana hub rotalarını eksiksiz IndexNow payload listesine derler', () => {
      const payload = buildFacilityIndexNowPayload('test-key');

      expect(payload.host).toBe('aloyonetim.com.tr');
      expect(payload.key).toBe('test-key');
      expect(payload.urlList.length).toBeGreaterThanOrEqual(44); // 39 ilçe + hub dilleri + alt sektörler

      const kadikoyUrl = payload.urlList.find((u) => u.includes('/bolgeler/kadikoy/tesis-yonetimi'));
      expect(kadikoyUrl).toBeDefined();
    });
  });

  describe('Bot Telemetrisi & 304 Analizi (facilityBotAuditLog.ts)', () => {
    it('Bot olaylarını kaydeder ve 304 verimlilik raporu üretir', () => {
      recordBotCrawlEvent('Googlebot', 'SearchEngine', '/hizmetler/tesis-yonetimi', 200);
      recordBotCrawlEvent('Googlebot', 'SearchEngine', '/hizmetler/tesis-yonetimi', 304);
      recordBotCrawlEvent('PerplexityBot', 'AICrawler', '/bolgeler/kadikoy/tesis-yonetimi', 304);

      const report = generateBotAnalyticsReport();

      expect(report.totalBotHits).toBeGreaterThanOrEqual(3);
      expect(report.statusCodeDistribution.status200).toBeGreaterThanOrEqual(1);
      expect(report.statusCodeDistribution.status304).toBeGreaterThanOrEqual(2);
      expect(report.crawlEfficiencyRate304).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Sesli Arama & Voice AI Sentezleyici (facilityVoiceAiSynthesizer.ts)', () => {
    it('Doğal konuşma diline uygun ve Speakable şemalı sesli yanıtlar üretir', () => {
      const voiceData = synthesizeFacilityVoiceQA();

      expect(voiceData.totalVoiceAnswers).toBeGreaterThanOrEqual(3);
      expect(voiceData.supportedLanguages).toContain('tr');
      expect(voiceData.supportedLanguages).toContain('en');

      const trDef = voiceData.qaCollection.find((q) => q.id === 'voice-tr-definition');
      expect(trDef).toBeDefined();
      expect(trDef?.spokenAnswer).toContain('Alo Yönetim');
      expect(trDef?.schema['@type']).toBe('SpeakableSpecification');
    });
  });
});
