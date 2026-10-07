import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { CERTIFICATES } from '@/data/certificates';
import { QUALITY_STANDARDS, QUALITY_FAQ_COUNT } from '@/components/seo/quality/qualityData';
import QualityHeroSeo from '@/components/seo/quality/QualityHeroSeo';
import QualityAiOverviewSeo from '@/components/seo/quality/QualityAiOverviewSeo';
import QualityPillarsSeo from '@/components/seo/quality/QualityPillarsSeo';
import QualityPdcaCycleSeo from '@/components/seo/quality/QualityPdcaCycleSeo';
import QualityComparisonMatrixSeo from '@/components/seo/quality/QualityComparisonMatrixSeo';
import QualityAuthorityFaqSeo from '@/components/seo/quality/QualityAuthorityFaqSeo';
import QualityConversionCtaSeo from '@/components/seo/quality/QualityConversionCtaSeo';

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
      expect(pillar.deliverableCount).toBeGreaterThanOrEqual(3);
    }
  });

  it('SSS maddeleri çeviri anahtarlarında tanımlıdır (tr/en/ru/ar) ve doludur', () => {
    expect(QUALITY_FAQ_COUNT).toBeGreaterThanOrEqual(4);
    for (const lang of ['tr', 'en', 'ru', 'ar']) {
      const dict = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), `src/i18n/locales/${lang}/common.json`), 'utf8')
      ) as Record<string, string>;
      for (let n = 1; n <= QUALITY_FAQ_COUNT; n++) {
        expect(dict[`qlt_faq_${n}_q`]?.length, `${lang} q${n}`).toBeGreaterThan(15);
        expect(dict[`qlt_faq_${n}_a`]?.length, `${lang} a${n}`).toBeGreaterThan(50);
      }
    }
  });

  it('kalite sayfası doğrulanamayan rakam ve garanti ifadeleri içermez', () => {
    const dict = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'src/i18n/locales/tr/common.json'), 'utf8')
    ) as Record<string, string>;
    const text = Object.entries(dict)
      .filter(([k]) => k.startsWith('qlt_'))
      .map(([, v]) => v)
      .join(' | ');
    for (const bad of ['48 habersiz', 'Yılda 48', '20 dakika', '20 Dk', '%99.4', '%99,4', 'garanti', 'sıfır sızıntı', 'sıfır risk', '%60']) {
      expect(text.toLowerCase(), bad).not.toContain(bad.toLowerCase());
    }
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
