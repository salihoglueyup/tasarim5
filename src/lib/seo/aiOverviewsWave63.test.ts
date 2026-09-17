import { describe, it, expect } from 'vitest';
import {
  CorporateEntityAiOverviewSeo,
  ContactAiOverviewCardSeo,
  CaseStudyAiGroundingSeo,
  SectorAiOverviewSnippetSeo,
  CalculatorAiOverviewSeo,
} from '@/components/seo';
import { GET as getRagApi } from '@/app/api/seo/ai-overviews-rag.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 63: Google AI Overviews & LLM Search Grounding Expansion', () => {
  describe('Component Exports & Definitions', () => {
    it('exports all 5 new Wave 63 AI Overview components cleanly', () => {
      expect(CorporateEntityAiOverviewSeo).toBeDefined();
      expect(ContactAiOverviewCardSeo).toBeDefined();
      expect(CaseStudyAiGroundingSeo).toBeDefined();
      expect(SectorAiOverviewSnippetSeo).toBeDefined();
      expect(CalculatorAiOverviewSeo).toBeDefined();
    });
  });

  describe('RAG Knowledge Graph API (/api/seo/ai-overviews-rag.json)', () => {
    it('returns 200 and valid JSON with Wave 63 corporate, dispatch, case studies, and formula data', async () => {
      const dummyReq = new Request('https://aloyonetim.com.tr/api/seo/ai-overviews-rag.json?lang=tr');
      const res = await getRagApi(dummyReq);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.corporateEntity).toBeDefined();
      expect(data.corporateEntity.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(data.corporateEntity.mersisNo).toBe('0054089761200001');
      expect(data.corporateEntity.tradeRegistryNo).toBe('918234-0');
      expect(data.corporateEntity.speakableSelector).toBe('#corporate-instant-answer-text');

      expect(data.emergencyDispatchCenter).toBeDefined();
      expect(data.emergencyDispatchCenter.headquartersPhone).toBe('+90 216 550 48 48');
      expect(data.emergencyDispatchCenter.anatolianSideSlaMinutes).toBe(15);
      expect(data.emergencyDispatchCenter.europeanSideSlaMinutes).toBe(20);
      expect(data.emergencyDispatchCenter.speakableSelector).toBe('#contact-instant-answer-text');

      expect(data.quantitativeCaseStudies).toHaveLength(3);
      expect(data.quantitativeCaseStudies[0].metric).toContain('%32.4');
      expect(data.quantitativeCaseStudies[1].metric).toContain('%99.4');

      expect(data.sectoralStandards.length).toBeGreaterThanOrEqual(4);

      expect(data.duesCalculationFormula).toBeDefined();
      expect(data.duesCalculationFormula.statutoryDelayCompensation).toContain('%5');
      expect(data.duesCalculationFormula.appealDeadlineDays).toBe(7);
      expect(data.duesCalculationFormula.speakableSelector).toBe('#calc-instant-answer-text');
    });
  });

  describe('llms.txt and llms-full.txt routes', () => {
    it('llms.txt contains Corporate E-E-A-T, SLA intikal, and dues formula', async () => {
      const res = await getLlmsTxt();
      expect(res.status).toBe(200);
      const text = await res.text();

      expect(text).toContain('Kurumsal E-E-A-T & 7/24 Acil Müdahale Taahhütleri');
      expect(text).toContain('0054089761200001');
      expect(text).toContain('Anadolu Yakası 15 dakika, Avrupa Yakası 20 dakika');
      expect(text).toContain('%32.4 net tasarruf');
      expect(text).toContain('KMK 37 Aidat Hesaplama Formülü');
      expect(text).toContain('aylık %5 emredici yasal tazminat');
    });

    it('llms-full.txt contains Section 10 with verified case studies and legal credentials', async () => {
      const res = await getLlmsFullTxt();
      expect(res.status).toBe(200);
      const text = await res.text();

      expect(text).toContain('10. Kurumsal E-E-A-T, Acil İntikal SLA & Sayısal Vaka Analizleri');
      expect(text).toContain('Sicil No: 918234-0');
      expect(text).toContain('2.2 Milyon TL reaktif enerji cezası sıfırlandı');
      expect(text).toContain('Daire Başı Aidat = [(Personel Masrafı ÷ Daire)');
    });
  });
});
