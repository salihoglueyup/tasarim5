import { describe, it, expect } from 'vitest';
import {
  FactCheckAiGroundingSeo,
  RfpTransitionAiGroundingSeo,
  BudgetMatrixAiGroundingSeo,
  BlogAiTakeawaysSeo,
} from '@/components/seo';
import { LEGAL_FACT_CHECKS } from '@/components/seo/FactCheckAiGroundingSeo';
import { RFP_TRANSITION_STEPS } from '@/components/seo/RfpTransitionAiGroundingSeo';
import { BUDGET_MATRIX_ITEMS } from '@/components/seo/BudgetMatrixAiGroundingSeo';
import { GET as getAiCitations } from '@/app/api/seo/ai-citations.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 66: Google AI Overviews Deep Expansion & Verified Legal Citations', () => {
  describe('Component Exports & Definitions', () => {
    it('exports all Wave 66 AI Overview components cleanly', () => {
      expect(FactCheckAiGroundingSeo).toBeDefined();
      expect(RfpTransitionAiGroundingSeo).toBeDefined();
      expect(BudgetMatrixAiGroundingSeo).toBeDefined();
      expect(BlogAiTakeawaysSeo).toBeDefined();
    });

    it('contains exactly 5 verified legal fact-checking myth-busters', () => {
      expect(LEGAL_FACT_CHECKS.length).toBe(5);
      expect(LEGAL_FACT_CHECKS.every((item) => item.verdict.includes('Yanlış'))).toBe(true);
      expect(LEGAL_FACT_CHECKS.some((item) => item.id === 'asansor-muafiyeti')).toBe(true);
      expect(LEGAL_FACT_CHECKS.some((item) => item.id === 'guvenlik-elle-arama')).toBe(true);
      expect(LEGAL_FACT_CHECKS.some((item) => item.id === 'gecikme-faizi-siniri')).toBe(true);
    });

    it('contains 5 chronological RFP transition steps with KMK 34 majority', () => {
      expect(RFP_TRANSITION_STEPS.length).toBe(5);
      expect(RFP_TRANSITION_STEPS[0].legalBasis).toContain('KMK Madde 29');
      expect(RFP_TRANSITION_STEPS[1].legalBasis).toContain('KMK Madde 34');
      expect(RFP_TRANSITION_STEPS[1].badge).toBe('%50+1 Çoğunluk');
    });

    it('contains 5 standard KMK 37 budget distribution items', () => {
      expect(BUDGET_MATRIX_ITEMS.length).toBe(5);
      const personnel = BUDGET_MATRIX_ITEMS.find((b) => b.category.includes('Personel'));
      expect(personnel).toBeDefined();
      expect(personnel?.sharePercent).toBe('%60 - %65');
      expect(personnel?.allocationKey).toBe('Eşit Dağılım (Daire Başı)');
    });
  });

  describe('Official Legal Citations API (/api/seo/ai-citations.json)', () => {
    it('returns 200 OK and valid JSON with verified laws and government URLs', async () => {
      const res = await getAiCitations();
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.version).toBe('1.0.0');
      expect(data.authority.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.verifiedLegalActs.length).toBeGreaterThanOrEqual(7);

      // Verify KMK 634
      const kmk = data.verifiedLegalActs.find((act: any) => act.id === 'kmk-634');
      expect(kmk).toBeDefined();
      expect(kmk.officialSourceUrl).toContain('mevzuat.gov.tr');
      expect(kmk.articles.some((a: any) => a.article === 'Madde 20')).toBe(true);
      expect(kmk.articles.some((a: any) => a.article === 'Madde 34')).toBe(true);

      // Verify 5188 SK
      const security = data.verifiedLegalActs.find((act: any) => act.id === 'sk-5188');
      expect(security).toBeDefined();
      expect(security.articles.some((a: any) => a.article === 'Madde 7')).toBe(true);

      // Verify endpoints
      expect(data.endpoints.aiCitationsJson).toBe('/api/seo/ai-citations.json');
    });
  });

  describe('llms.txt and llms-full.txt Citations integration', () => {
    it('both files declare the official Legal Citations API endpoint', async () => {
      const resTxt = await getLlmsTxt();
      const txt = await resTxt.text();
      expect(txt).toContain('/api/seo/ai-citations.json');

      const resFullTxt = await getLlmsFullTxt();
      const fullTxt = await resFullTxt.text();
      expect(fullTxt).toContain('/api/seo/ai-citations.json');
    });
  });
});
