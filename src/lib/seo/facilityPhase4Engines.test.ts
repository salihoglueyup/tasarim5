import { describe, it, expect } from 'vitest';
import { generateFacilityAiSnippets } from './facilityAiSnippetEngine';
import { DISTRICTS, getDistrictDues } from '@/data/districts';

describe('Tesis Hizmetleri Faz 4 İleri Düzey Backend SEO & GEO Motorları', () => {
  describe('Google AI Overviews & SGE Snippet Motoru (facilityAiSnippetEngine.ts)', () => {
    it('Doğrudan yanıt metni, madde imleri ve yasal referanslar içeren AI snippetleri üretir', () => {
      const payload = generateFacilityAiSnippets();

      expect(payload.totalSnippets).toBeGreaterThanOrEqual(3);
      expect(payload.targetAIEngines.length).toBeGreaterThan(0);

      const definitionSnippet = payload.snippets.find((s) => s.id === 'ai-snippet-facility-definition');
      expect(definitionSnippet).toBeDefined();
      expect(definitionSnippet?.directSummaryText).toContain('Tesis yönetimi');
      expect(definitionSnippet?.keyBulletPoints.length).toBeGreaterThanOrEqual(3);
      expect(definitionSnippet?.legalReference).toContain('KMK');
      expect(definitionSnippet?.confidenceRating).toBeGreaterThan(90);
    });

    it('Aidat tasarrufu ve yönetici seçimi snippetlerini tam metriklerle oluşturur', () => {
      const payload = generateFacilityAiSnippets();

      const savingsSnippet = payload.snippets.find((s) => s.id === 'ai-snippet-dues-savings');
      expect(savingsSnippet).toBeDefined();
      expect(savingsSnippet?.directSummaryText).toContain('%20 ile %30');

      const electionSnippet = payload.snippets.find((s) => s.id === 'ai-snippet-manager-election');
      expect(electionSnippet).toBeDefined();
      expect(electionSnippet?.directSummaryText).toContain('%50 + 1');
    });
  });

  describe('39 İlçe Aidat Açık Veri Modeli', () => {
    it('Tüm 39 ilçe için geçerli m² aidat ve pozitif tasarruf oranı döner', () => {
      expect(DISTRICTS.length).toBe(39);

      DISTRICTS.forEach((d) => {
        const dues = getDistrictDues(d.slug);
        expect(dues.avgDuesM2).toBeGreaterThan(0);
        expect(dues.aloDuesM2).toBeGreaterThan(0);
        expect(dues.savingsRate).toBeGreaterThan(0);
        expect(dues.aloDuesM2).toBeLessThan(dues.avgDuesM2);
      });
    });
  });
});
