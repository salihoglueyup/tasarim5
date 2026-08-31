import { describe, it, expect } from 'vitest';
import {
  COMPETITOR_PROFILES,
  findQuickWinKeywords,
  rankKeywordsByOpportunityScore,
  generateContentBriefFromGap,
  analyzeContentGap,
  buildWinningContentSpec,
  buildOutreachTargetList,
} from './dualCoreCompetitorAnalyzer';

describe('BÖLÜM J — 🕵️ Rakip Analiz & Boşluk Tespit Motoru (dualCoreCompetitorAnalyzer.test.ts)', () => {
  /* =========================================================================
   * J1 — RAKİP PROFİL & VERİ MODELİ (Faz 196-208)
   * ========================================================================= */
  describe('J1: Rakip Veritabanı & Profil Testleri (Faz 196-208)', () => {
    it('COMPETITOR_PROFILES en az 5 önemli sektör rakibi içerir', () => {
      expect(COMPETITOR_PROFILES.length).toBeGreaterThanOrEqual(5);
      COMPETITOR_PROFILES.forEach((comp) => {
        expect(comp.domain.length).toBeGreaterThan(3);
        expect(comp.backlinkScore).toBeGreaterThan(0);
        expect(comp.strengthAreas.length).toBeGreaterThan(0);
        expect(comp.weaknesses.length).toBeGreaterThan(0);
      });
    });

    it('Rakip profilleri hem site hem de tesis dikeyindeki aktörleri kapsar', () => {
      const siteRivals = COMPETITOR_PROFILES.filter((c) => c.pillar === 'site');
      const facilityRivals = COMPETITOR_PROFILES.filter((c) => c.pillar === 'facility');
      expect(siteRivals.length).toBeGreaterThanOrEqual(2);
      expect(facilityRivals.length).toBeGreaterThanOrEqual(2);
    });
  });

  /* =========================================================================
   * J2 — KEYWORD BOŞLUK & FIRSAT MOTORU (Faz 207-220)
   * ========================================================================= */
  describe('J2: Hızlı Kazanım & Fırsat Analizi (Faz 207-220)', () => {
    it('findQuickWinKeywords en az 4 fırsat kelimesi döner', () => {
      const siteWins = findQuickWinKeywords('site');
      expect(siteWins.length).toBeGreaterThanOrEqual(4);
      expect(siteWins[0].opportunityScore).toBeGreaterThanOrEqual(siteWins[1].opportunityScore);
    });

    it('rankKeywordsByOpportunityScore azalan fırsat puanına göre sıralar', () => {
      const keywords = [
        { keyword: 'a', monthlySearchVolume: 100, competitorRank: 5, difficultyScore: 20, opportunityScore: 50, intent: 'commercial' as const },
        { keyword: 'b', monthlySearchVolume: 500, competitorRank: 3, difficultyScore: 10, opportunityScore: 90, intent: 'transactional' as const },
      ];
      const sorted = rankKeywordsByOpportunityScore(keywords);
      expect(sorted[0].keyword).toBe('b');
      expect(sorted[0].opportunityScore).toBe(90);
    });

    it('generateContentBriefFromGap eksiksiz içerik şartnamesi üretir', () => {
      const brief = generateContentBriefFromGap('apartman aidat gecikme faizi hesaplama', 'site');
      expect(brief.targetKeyword).toContain('aidat gecikme faizi');
      expect(brief.targetWordCount).toBeGreaterThanOrEqual(1500);
      expect(brief.requiredHeadings.length).toBeGreaterThanOrEqual(4);
      expect(brief.requiredSchemas).toContain('FAQPage');
      expect(brief.requiredSchemas).toContain('HowTo');
    });
  });

  /* =========================================================================
   * J3 — İÇERİK & SERP BOŞLUK MOTORU (Faz 216-235)
   * ========================================================================= */
  describe('J3: İçerik & Backlink Boşluk Testleri (Faz 216-235)', () => {
    it('analyzeContentGap rakibe ait içerik eksikliklerini döner', () => {
      const gaps = analyzeContentGap('iss-turkiye', 'facility');
      expect(gaps.length).toBeGreaterThanOrEqual(2);
      expect(gaps.some((g) => g.includes('yerel') || g.includes('aidat'))).toBe(true);
    });

    it('buildWinningContentSpec rakibi geçmek için gerekli minimum kelime ve şemaları belirtir', () => {
      const spec = buildWinningContentSpec('site yönetimi', 'https://rival.example.com');
      expect(spec.minWordCount).toBeGreaterThanOrEqual(1500);
      expect(spec.requiredSchemas).toContain('FAQPage');
      expect(spec.lsiKeywordsRequired.length).toBeGreaterThanOrEqual(4);
    });

    it('buildOutreachTargetList yüksek otoriteli sektörel bağlantı hedefleri döner', () => {
      const targets = buildOutreachTargetList('site');
      expect(targets.length).toBeGreaterThanOrEqual(3);
      targets.forEach((t) => {
        expect(t.domainAuthority).toBeGreaterThanOrEqual(50);
        expect(t.outreachAngle.length).toBeGreaterThan(10);
      });
    });
  });
});
