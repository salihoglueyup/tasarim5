import { describe, it, expect } from 'vitest';
import { CERTIFICATES } from '@/data/certificates';
import {
  QUALITY_STANDARDS,
  QUALITY_FAQS,
  QualityHeroSeo,
  QualityAiOverviewSeo,
  QualityPillarsSeo,
  QualityPdcaCycleSeo,
  QualityComparisonMatrixSeo,
  QualityAuthorityFaqSeo,
  QualityConversionCtaSeo,
} from '@/components/seo/quality';

describe('Quality Policy & ISO Standards Bridge Tests (/kurumsal/kalite-politikamiz)', () => {
  it('6 temel ISO ve akreditasyon standardı eksiksiz tanımlanmıştır', () => {
    expect(QUALITY_STANDARDS).toBeDefined();
    expect(QUALITY_STANDARDS.length).toBe(6);

    const ids = QUALITY_STANDARDS.map((s) => s.id);
    expect(ids).toEqual(['iso-45001', 'iso-14001', 'iso-10002', 'iso-22301', 'iso-31000', 'ozel-guvenlik-5188']);
  });

  it('ISO sütunları yalnızca sahip olunan BELCERT belgeleriyle eşleşir ve teslimat kriterleri doludur', () => {
    const isoPillars = QUALITY_STANDARDS.filter((s) => s.id.startsWith('iso-'));
    for (const pillar of isoPillars) {
      const cert = CERTIFICATES.find((c) => c.slug === pillar.id);
      expect(cert, pillar.id).toBeDefined();
      expect(pillar.code).toBe(cert?.name);
      expect(pillar.badge).toContain(cert!.certificateNumber);
      expect(pillar.deliverables.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('kalite ve denetim SSS listesi en az 5 madde içerir ve doludur', () => {
    expect(QUALITY_FAQS).toBeDefined();
    expect(QUALITY_FAQS.length).toBeGreaterThanOrEqual(5);

    QUALITY_FAQS.forEach((faq) => {
      expect(faq.question.length).toBeGreaterThan(15);
      expect(faq.answer.length).toBeGreaterThan(50);
    });
  });

  it('tüm Kalite Politikası SEO ve UI bileşenleri dışa aktarılmıştır ve geçerlidir', () => {
    expect(typeof QualityHeroSeo).toBe('function');
    expect(typeof QualityAiOverviewSeo).toBe('function');
    expect(typeof QualityPillarsSeo).toBe('function');
    expect(typeof QualityPdcaCycleSeo).toBe('function');
    expect(typeof QualityComparisonMatrixSeo).toBe('function');
    expect(typeof QualityAuthorityFaqSeo).toBe('function');
    expect(typeof QualityConversionCtaSeo).toBe('function');
  });
});
