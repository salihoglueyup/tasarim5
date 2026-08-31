import { describe, it, expect } from 'vitest';
import {
  buildPrimaryCTASpec,
  buildSocialProofBlock,
  buildLeadQualificationScore,
  buildProgressiveDisclosure,
  buildABTestProtocol,
  buildScrollDepthSegment,
  buildROICalculatorSpec,
  buildPackageSpec,
} from './dualCoreCROEngine';

describe('BÖLÜM M — 💰 CRO & Dönüşüm Optimizasyonu (dualCoreCROEngine.test.ts)', () => {
  /* =========================================================================
   * M1 — CTA & DÖNÜŞÜM YOLLARI (Faz 306-320)
   * ========================================================================= */
  describe('M1: CTA & Sosyal Kanıt Şartnameleri (Faz 306-320)', () => {
    it('buildPrimaryCTASpec anasayfa için aciliyet, sosyal kanıt ve garanti içerir', () => {
      const siteCTA = buildPrimaryCTASpec('home', 'site');
      expect(siteCTA.primaryCTA.text).toContain('Teklif');
      expect(siteCTA.primaryCTA.urgency).toBe('high');
      expect(siteCTA.socialProof).toContain('350+ Site');
      expect(siteCTA.guarantee).toContain('30 gün');

      const facilityCTA = buildPrimaryCTASpec('home', 'facility');
      expect(facilityCTA.primaryCTA.text).toContain('Plaza');
    });

    it('buildSocialProofBlock sayısal istatistikler ve Google puanı döner', () => {
      const proof = buildSocialProofBlock('site');
      expect(proof.stats.length).toBeGreaterThanOrEqual(4);
      expect(proof.rating.score).toBeGreaterThanOrEqual(4.8);
      expect(proof.rating.reviewCount).toBeGreaterThan(100);
    });
  });

  /* =========================================================================
   * M2 — FORM OPTİMİZASYONU & LEAD PUANLAMA (Faz 321-335)
   * ========================================================================= */
  describe('M2: Lead Skorlama & Çok Adımlı Form Testleri (Faz 321-335)', () => {
    it('buildLeadQualificationScore 120 daireli acil site teklifi için HOT derecesi üretir', () => {
      const result = buildLeadQualificationScore({
        pillar: 'site',
        propertyType: 'site',
        unitCount: 120,
        district: 'Kadıköy',
        hasSecurityNeed: true,
        hasCleaningNeed: true,
        hasTechnicalNeed: true,
        urgencyTimeline: 'acil',
      });
      expect(result.score).toBeGreaterThanOrEqual(80);
      expect(result.grade).toBe('HOT');
      expect(result.priorityLevel).toBe('critical');
      expect(result.assignedTeam).toContain('Portföy Yöneticisi');
    });

    it('buildProgressiveDisclosure 3 adımlı net form yapısı döner', () => {
      const form = buildProgressiveDisclosure('teklif');
      expect(form.stepsCount).toBe(3);
      expect(form.steps[0].title).toBe('Mülk ve Ölçek Bilgileri');
      expect(form.steps[2].fields).toContain('phone');
    });
  });

  /* =========================================================================
   * M3 — A/B TEST PROTOKOLLERİ & PAKETLER (Faz 336-350)
   * ========================================================================= */
  describe('M3: A/B Test, Scroll & Paket Şartnameleri (Faz 336-350)', () => {
    it('buildABTestProtocol Variant A ve B arasında net karşılaştırma tanımlar', () => {
      const abCta = buildABTestProtocol('cta', 'site');
      expect(abCta.variantA.text).toBeDefined();
      expect(abCta.variantB.text).toBeDefined();
      expect(abCta.variantA.text).not.toBe(abCta.variantB.text);
      expect(abCta.minimumSampleSize).toBeGreaterThanOrEqual(500);
    });

    it('buildScrollDepthSegment %25-%100 arası 4 farklı etkileşim noktası belirler', () => {
      const scroll = buildScrollDepthSegment('service');
      expect(scroll.segments).toHaveLength(4);
      expect(scroll.segments[0].depthPercent).toBe(25);
      expect(scroll.segments[3].depthPercent).toBe(100);
    });

    it('buildROICalculatorSpec girdi alanları ve formül içerir', () => {
      const roi = buildROICalculatorSpec('site');
      expect(roi.inputFields.length).toBeGreaterThanOrEqual(3);
      expect(roi.averageSavingsPercent).toBe(15);
      expect(roi.formula.length).toBeGreaterThan(10);
    });

    it('buildPackageSpec Site için 3, Tesis için 2 adet ölçekli paket döner', () => {
      const sitePackages = buildPackageSpec('site');
      expect(sitePackages).toHaveLength(3);
      expect(sitePackages.some((p) => p.isPopular)).toBe(true);

      const facilityPackages = buildPackageSpec('facility');
      expect(facilityPackages).toHaveLength(2);
      expect(facilityPackages[1].features).toContain('ISO 41001 Süreçleri');
    });
  });
});
