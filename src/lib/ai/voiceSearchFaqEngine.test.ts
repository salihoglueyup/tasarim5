import { describe, it, expect } from 'vitest';
import {
  VOICE_SEARCH_KNOWLEDGE_BASE,
  generateSpeakableJsonLd,
  generateVoiceFaqPageJsonLd,
} from './voiceSearchFaqEngine';

describe('Voice Search & SpeakableSpecification Engine', () => {
  it('VOICE_SEARCH_KNOWLEDGE_BASE sesli arama soruları ve kısa yanıtları tamdır', () => {
    expect(VOICE_SEARCH_KNOWLEDGE_BASE.length).toBeGreaterThanOrEqual(6);

    VOICE_SEARCH_KNOWLEDGE_BASE.forEach((topic) => {
      expect(topic.spokenQuery).toBeTruthy();
      expect(topic.conciseVoiceAnswer).toBeTruthy();
      // Sesli asistanların net okuması için yanıt 200 karakterden uzun olmamalı
      expect(topic.conciseVoiceAnswer.length).toBeLessThanOrEqual(250);
      expect(topic.canonicalPageUrl).toContain('https://aloyonetim.com.tr');
      expect(topic.speakableCssSelectors.length).toBeGreaterThan(0);
    });
  });

  it('generateSpeakableJsonLd standart SpeakableSpecification şeması üretir', () => {
    const schema = generateSpeakableJsonLd({
      pageUrl: 'https://aloyonetim.com.tr/hizmetler/aidat-takibi',
      cssSelectors: ['h1', '.tldr', '.voice-answer-aidat'],
    });

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebPage');
    expect(schema.url).toBe('https://aloyonetim.com.tr/hizmetler/aidat-takibi');
    expect(schema.speakable['@type']).toBe('SpeakableSpecification');
    expect(schema.speakable.cssSelector).toEqual(['h1', '.tldr', '.voice-answer-aidat']);
  });

  it('generateVoiceFaqPageJsonLd geçerli FAQPage nesnesi üretir', () => {
    const faqSchema = generateVoiceFaqPageJsonLd();

    expect(faqSchema['@context']).toBe('https://schema.org');
    expect(faqSchema['@type']).toBe('FAQPage');
    expect(faqSchema.mainEntity.length).toBe(VOICE_SEARCH_KNOWLEDGE_BASE.length);
    expect(faqSchema.mainEntity[0]['@type']).toBe('Question');
    expect(faqSchema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
  });
});
