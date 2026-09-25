import { describe, it, expect } from 'vitest';
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
    expect(ids).toContain('iso-41001');
    expect(ids).toContain('iso-9001');
    expect(ids).toContain('iso-27001');
    expect(ids).toContain('iso-45001');
    expect(ids).toContain('iso-14001');
    expect(ids).toContain('tse-hyb');
  });

  it('ISO 41001:2018 ve ISO 9001:2015 standartları doğru kod ve teslimat kriterleriyle yer alır', () => {
    const iso41001 = QUALITY_STANDARDS.find((s) => s.id === 'iso-41001');
    expect(iso41001).toBeDefined();
    expect(iso41001?.code).toBe('ISO 41001:2018');
    expect(iso41001?.deliverables.length).toBeGreaterThanOrEqual(4);

    const iso9001 = QUALITY_STANDARDS.find((s) => s.id === 'iso-9001');
    expect(iso9001).toBeDefined();
    expect(iso9001?.code).toBe('ISO 9001:2015');
    expect(iso9001?.deliverables.length).toBeGreaterThanOrEqual(4);
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
