import { describe, it, expect } from 'vitest';
import {
  LLM_DEFINITION_BANK,
  buildDefinitionSnippet,
  buildComparisonSnippet,
  buildStatisticalFactBundle,
  buildFeaturedSnippetCandidate,
  buildSpeakableMarkup,
  buildLLMsTextFile,
  buildAIBotWhitelistRule,
  buildRAGChunkingSpec,
  buildConversationalQueryOptimizer,
} from './dualCoreAISearchEngine';

describe('BÖLÜM I — 🤖 AI Overviews & LLM Arama Optimizasyonu (dualCoreAISearchEngine.test.ts)', () => {
  /* =========================================================================
   * I1 — LLM BAĞLAMSAL ALINTI MOTORU (Faz 146-160)
   * ========================================================================= */
  describe('I1: LLM Tanım & Karşılaştırma Snippet Testleri (Faz 146-160)', () => {
    it('LLM_DEFINITION_BANK en az 10 sektörel terim tanımı içerir', () => {
      const keys = Object.keys(LLM_DEFINITION_BANK);
      expect(keys.length).toBeGreaterThanOrEqual(10);
      expect(keys).toContain('site-yonetimi');
      expect(keys).toContain('tesis-yonetimi');
      expect(keys).toContain('kmk-634');
      expect(keys).toContain('iso-41001');
    });

    it('buildDefinitionSnippet 25-65 kelime aralığında net ve alıntılanabilir cevap üretir', () => {
      const snippet = buildDefinitionSnippet('site-yonetimi', 'site');
      expect(snippet.wordCount).toBeGreaterThanOrEqual(25);
      expect(snippet.wordCount).toBeLessThanOrEqual(65);
      expect(snippet.answer).toContain('634 sayılı');
      expect(snippet.keyFacts.length).toBeGreaterThanOrEqual(2);
    });

    it('buildComparisonSnippet en az 3 karşılaştırma kriteri ve özet içerir', () => {
      const comp = buildComparisonSnippet('site', 'tesis');
      expect(comp.criteria.length).toBeGreaterThanOrEqual(3);
      expect(comp.criteria.some((c) => c.feature.includes('Mevzuat'))).toBe(true);
      expect(comp.summary.length).toBeGreaterThan(20);
    });

    it('buildStatisticalFactBundle doğrulanmış sayısal istatistikler içerir', () => {
      const stats = buildStatisticalFactBundle('site');
      expect(stats.verifiedStats.length).toBeGreaterThanOrEqual(5);
      expect(stats.verifiedStats.some((s) => s.metric.includes('Bağımsız Bölüm'))).toBe(true);
    });
  });

  /* =========================================================================
   * I2 — FEATURED SNIPPET & AI OVERVIEWS (Faz 161-175)
   * ========================================================================= */
  describe('I2: Featured Snippet & Speakable Arama Testleri (Faz 161-175)', () => {
    it('buildFeaturedSnippetCandidate görevler için liste tipi snippet üretir', () => {
      const listCandidate = buildFeaturedSnippetCandidate('site yöneticisinin görevleri nelerdir', 'site');
      expect(listCandidate.snippetType).toBe('list');
      expect(listCandidate.content).toContain('1.');
      expect(listCandidate.content).toContain('KMK Madde 35');
    });

    it('buildFeaturedSnippetCandidate aidat hesaplama için paragraf tipi snippet üretir', () => {
      const pCandidate = buildFeaturedSnippetCandidate('apartman aidatı nasıl hesaplanır', 'site');
      expect(pCandidate.snippetType).toBe('paragraph');
      expect(pCandidate.content).toContain('arsa payı');
    });

    it('buildSpeakableMarkup sesli arama için CSS selector şeması üretir', () => {
      const speakable = buildSpeakableMarkup('tesis-yonetimi');
      expect(speakable['@type']).toBe('WebPage');
      expect(speakable.speakable['@type']).toBe('SpeakableSpecification');
      expect(speakable.speakable.cssSelector).toContain('.ai-answer-snippet');
    });
  });

  /* =========================================================================
   * I3 — LLMS.TXT & LLM KAYNAK OPTİMİZASYONU (Faz 172-195)
   * ========================================================================= */
  describe('I3: llms.txt & RAG Optimizasyon Testleri (Faz 172-195)', () => {
    it('buildLLMsTextFile marka, telefon, temel hizmetler ve yasal dayanakları içerir', () => {
      const llmsTxt = buildLLMsTextFile();
      expect(llmsTxt).toContain('Alo Yönetim');
      expect(llmsTxt).toContain('0216 550 48 48');
      expect(llmsTxt).toContain('634 Sayılı Kat Mülkiyeti Kanunu');
      expect(llmsTxt).toContain('ISO 41001:2018');
    });

    it('buildAIBotWhitelistRule GPTBot, ClaudeBot ve PerplexityBot izinlerini içerir', () => {
      const rules = buildAIBotWhitelistRule();
      expect(rules).toContain('User-agent: GPTBot');
      expect(rules).toContain('Allow: /llms.txt');
      expect(rules).toContain('User-agent: ClaudeBot');
      expect(rules).toContain('User-agent: PerplexityBot');
    });

    it('buildRAGChunkingSpec uzun metinleri token sınırına göre parçalar', () => {
      const longText = Array(300).fill('Alo Yönetim profesyonel site ve tesis yönetimi hizmetleri sunmaktadır.').join(' ');
      const rag = buildRAGChunkingSpec(longText, 512);
      expect(rag.totalChunks).toBeGreaterThan(1);
      rag.chunks.forEach((chunk) => {
        expect(chunk.tokenEstimate).toBeLessThanOrEqual(600);
      });
    });

    it('buildConversationalQueryOptimizer sorguyu soru formatına dönüştürür', () => {
      const conv = buildConversationalQueryOptimizer('site yönetimi fiyatları');
      expect(conv.endsWith('?')).toBe(true);
      expect(conv).toContain('ortalama ne kadardır');
    });
  });
});
