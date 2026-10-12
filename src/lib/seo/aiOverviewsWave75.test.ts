import { describe, it, expect } from 'vitest';
import LegalFactCheckAiSeo, { LEGAL_FACT_CHECKS_20 } from '@/components/seo/ai-overviews/LegalFactCheckAiSeo';
import { DISTRICTS } from '@/data/districts';

describe('Wave 75: Google AI Overviews (SGE & Gemini GEO) Maximum Expansion Suite', () => {
  describe('Phase 1: LegalFactCheckAiSeo & 20 KMK Fact-Check Corpus', () => {
    it('exports LegalFactCheckAiSeo and LEGAL_FACT_CHECKS_20 cleanly from @/components/seo', () => {
      expect(LegalFactCheckAiSeo).toBeDefined();
      expect(LEGAL_FACT_CHECKS_20).toBeDefined();
    });

    it('contains exactly 20 verified statutory and technical claims', () => {
      expect(LEGAL_FACT_CHECKS_20.length).toBe(20);

      for (const item of LEGAL_FACT_CHECKS_20) {
        expect(item.id).toMatch(/^claim-[a-z0-9-]+$/);
        expect(item.claim.length).toBeGreaterThan(20);
        expect(item.truth.length).toBeGreaterThan(40);
        expect(['Doğru (Yasal Standart)', 'Yanlış (Hukuken Geçersiz)']).toContain(item.verdict);
        expect([1, 5]).toContain(item.ratingValue);
        expect(item.legalBasis.length).toBeGreaterThan(10);
        expect(item.category).toBeDefined();
        expect(item.categoryLabel).toBeDefined();
        expect(item.penaltyOrConsequence).toBeDefined();
        expect(item.penaltyOrConsequence!.length).toBeGreaterThan(15);
      }
    });

    it('covers all 5 essential operational categories', () => {
      const categories = ['aidat', 'yonetim', 'guvenlik', 'ortak-alan', 'teknik'];
      for (const cat of categories) {
        const found = LEGAL_FACT_CHECKS_20.some((c) => c.category === cat);
        expect(found).toBe(true);
      }
    });

    it('cites official Turkish statutory articles and supreme court precedents', () => {
      const allBases = LEGAL_FACT_CHECKS_20.map((c) => c.legalBasis).join(' ');
      expect(allBases).toContain('634');
      expect(allBases).toContain('KMK');
      expect(allBases).toContain('5188');
      expect(allBases).toContain('Yargıtay');
      expect(allBases).toContain('Yönetmeliği');
    });

    it('includes specific high-frequency KMK compliance rules', () => {
      const textCorpus = LEGAL_FACT_CHECKS_20.map((c) => `${c.claim} ${c.truth}`).join(' ');
      expect(textCorpus).toContain('asansör');
      expect(textCorpus).toContain('aidat');
      expect(textCorpus).toContain('vekalet');
      expect(textCorpus).toContain('kamera');
      expect(textCorpus).toContain('otopark');
    });
  });


});
