import { describe, it, expect } from 'vitest';
import {
  SITE_VOICE_FAQS,
  FACILITY_VOICE_FAQS,
  ALL_DUAL_CORE_FAQS,
  buildDualCoreFaqPage,
  buildDualCoreSpeakable,
  buildQAPageSchema,
  getVoiceFaqByIntent,
  getTopVoiceFaqs,
} from './dualCoreVoiceFaqEngine';

describe('Çift Çekirdekli Sesli Arama & FAQ Motoru (dualCoreVoiceFaqEngine.test.ts)', () => {
  describe('1. Soru-Cevap Bankası Bütünlüğü (Faz 106-148)', () => {
    it('Site Yönetimi külliyatında en az 10 soru bulunur ve speakable limitlerine uyar', () => {
      expect(SITE_VOICE_FAQS.length).toBeGreaterThanOrEqual(10);
      SITE_VOICE_FAQS.forEach((item) => {
        expect(item.voiceQuery.length).toBeGreaterThan(5);
        const wordCount = item.speakableAnswer.trim().split(/\s+/).length;
        expect(wordCount).toBeLessThanOrEqual(40);
        expect(item.detailedAnswer.length).toBeGreaterThan(item.speakableAnswer.length);
      });
    });

    it('Tesis Yönetimi külliyatında en az 6 soru bulunur', () => {
      expect(FACILITY_VOICE_FAQS.length).toBeGreaterThanOrEqual(6);
      FACILITY_VOICE_FAQS.forEach((item) => {
        expect(item.pillar).toBe('facility');
        expect(item.targetKeyword.length).toBeGreaterThan(0);
      });
    });

    it('Toplam soru havuzu en az 16 soru içerir', () => {
      expect(ALL_DUAL_CORE_FAQS.length).toBeGreaterThanOrEqual(16);
    });
  });

  describe('2. Schema.org JSON-LD Üretim Testleri (Faz 149-160)', () => {
    it('buildDualCoreFaqPage geçerli FAQPage şeması üretir', () => {
      const siteFaq = buildDualCoreFaqPage('site', 'tr');
      expect(siteFaq['@type']).toBe('FAQPage');
      expect(siteFaq.mainEntity.length).toBe(SITE_VOICE_FAQS.length);
      expect(siteFaq.mainEntity[0].acceptedAnswer.inLanguage).toBe('tr');

      const facilityFaq = buildDualCoreFaqPage('facility', 'tr');
      expect(facilityFaq.mainEntity.length).toBe(FACILITY_VOICE_FAQS.length);
    });

    it('buildDualCoreSpeakable geçerli SpeakableSpecification şeması üretir', () => {
      const speakable = buildDualCoreSpeakable('site');
      expect(speakable.speakable['@type']).toBe('SpeakableSpecification');
      expect(speakable.speakable.cssSelector).toContain('.voice-faq-answer');
    });

    it('buildQAPageSchema geçerli QAPage şeması üretir', () => {
      const qa = buildQAPageSchema('hybrid');
      expect(qa['@type']).toBe('QAPage');
      expect(qa.mainEntity.length).toBe(ALL_DUAL_CORE_FAQS.length);
    });

    it('getVoiceFaqByIntent niyetine göre soruları doğru filtreler', () => {
      const legalQuestions = getVoiceFaqByIntent('legal', 'site');
      expect(legalQuestions.length).toBeGreaterThanOrEqual(4);
      expect(legalQuestions.every((q) => q.intent === 'legal')).toBe(true);
    });

    it('getTopVoiceFaqs belirlenen limitte sorular döner', () => {
      const topQuestions = getTopVoiceFaqs('site', 4);
      expect(topQuestions.length).toBe(4);
    });
  });
});
