import { describe, it, expect } from 'vitest';
import {
  buildWelcomeEmailSpec,
  buildLeadNurtureSequence,
  buildUTMParameters,
  buildReviewRequestEmailSpec,
  buildEmailSubjectLineVariants,
} from './dualCoreEmailSeoEngine';

describe('BÖLÜM L — 📧 E-Posta Otomasyonu & SEO Entegrasyonu (dualCoreEmailSeoEngine.test.ts)', () => {
  /* =========================================================================
   * L1 — E-POSTA ŞABLON & SEGMENTASYON (Faz 271-290)
   * ========================================================================= */
  describe('L1: Hoş Geldiniz & Lead Nurture Sekans Testleri (Faz 271-290)', () => {
    it('buildWelcomeEmailSpec segmente göre kişiselleştirilmiş şablon ve UTM üretir', () => {
      const siteWelcome = buildWelcomeEmailSpec('site-prospect');
      expect(siteWelcome.subject).toContain('Apartman');
      expect(siteWelcome.primaryCTA.url).toContain('utm_source=email');
      expect(siteWelcome.primaryCTA.url).toContain('utm_campaign=welcome-series');

      const facilityWelcome = buildWelcomeEmailSpec('facility-prospect');
      expect(facilityWelcome.subject).toContain('Plaza');
      expect(facilityWelcome.pillar).toBe('facility');
    });

    it('buildLeadNurtureSequence 5 adımlı sekansı eksiksiz sağlar', () => {
      for (let step = 1; step <= 5; step++) {
        const nurtureStep = buildLeadNurtureSequence('site-prospect', step);
        expect(nurtureStep.stepNumber).toBe(step);
        expect(nurtureStep.subject.length).toBeGreaterThan(10);
        expect(nurtureStep.dayDelay).toBeGreaterThan(0);
        expect(nurtureStep.targetUrl).toBeDefined();
      }
    });

    it('buildUTMParameters standart GA4 izleme parametrelerini içerir', () => {
      const utm = buildUTMParameters('spring-promo', 'blog-subscriber');
      expect(utm.utm_source).toBe('email');
      expect(utm.utm_medium).toBe('newsletter');
      expect(utm.utm_campaign).toBe('spring-promo');
      expect(utm.utm_content).toBe('blog-subscriber');
    });
  });

  /* =========================================================================
   * L2 — E-POSTA & SEO ÇİFT YÖNLÜ ENTEGRASYON (Faz 291-305)
   * ========================================================================= */
  describe('L2: İnceleme Talebi & A/B Konu Varyantları (Faz 291-305)', () => {
    it('buildReviewRequestEmailSpec Google Haritalar yorum bağlantısı içerir', () => {
      const reviewEmail = buildReviewRequestEmailSpec('site');
      expect(reviewEmail.subject).toContain('Hizmet Deneyiminizi');
      expect(reviewEmail.primaryCTA.url).toContain('g.page');
      expect(reviewEmail.secondaryCTA).toBeDefined();
    });

    it('buildEmailSubjectLineVariants A/B testi için 3 farklı konu başlığı üretir', () => {
      const variants = buildEmailSubjectLineVariants('aidat-tasarruf', 'site');
      expect(variants).toHaveLength(3);
      expect(new Set(variants).size).toBe(3); // Hepsi birbirinden farklı
    });
  });
});
