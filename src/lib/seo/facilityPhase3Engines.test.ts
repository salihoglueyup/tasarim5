import { describe, it, expect } from 'vitest';
import { buildFacilityIndexNowPayload } from './indexing/facilityIndexNowPinger';
import { recordBotCrawlEvent, generateBotAnalyticsReport } from './bots/facilityBotAuditLog';
import { synthesizeFacilityVoiceQA } from './facility/facilityVoiceAiSynthesizer';

describe('Tesis Yönetimi Faz 3 İleri Düzey Backend SEO Motorları', () => {

  describe('IndexNow Push Motoru (facilityIndexNowPinger.ts)', () => {
    it('39 ilçe ve ana hub rotalarını eksiksiz IndexNow payload listesine derler', () => {
      const payload = buildFacilityIndexNowPayload('test-key');

      expect(payload.host).toBe('aloyonetim.com.tr');
      expect(payload.key).toBe('test-key');
      expect(payload.urlList.length).toBeGreaterThanOrEqual(90);

      const kadikoyUrl = payload.urlList.find((u) => u.includes('/bolgeler/kadikoy/tesis-yonetimi'));
      expect(kadikoyUrl).toBeDefined();

      const aidatUrl = payload.urlList.find((u) => u.includes('/hizmetler/aidat-takibi'));
      expect(aidatUrl).toBeDefined();
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
