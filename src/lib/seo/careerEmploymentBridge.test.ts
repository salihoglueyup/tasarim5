import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import CareerHeroSeo from '@/components/seo/career/CareerHeroSeo';
import CareerDualProtectionSeo from '@/components/seo/career/CareerDualProtectionSeo';
import CareerDisciplinesGridSeo from '@/components/seo/career/CareerDisciplinesGridSeo';
import CareerRecruitmentStepsSeo from '@/components/seo/career/CareerRecruitmentStepsSeo';
import CareerLegalGuaranteeDeepDiveSeo from '@/components/seo/career/CareerLegalGuaranteeDeepDiveSeo';
import CareerApplicationDualFormSeo from '@/components/seo/career/CareerApplicationDualFormSeo';
import CareerFaqSeo from '@/components/seo/career/CareerFaqSeo';
import CareerCtaBannerSeo from '@/components/seo/career/CareerCtaBannerSeo';

const root = process.cwd();
const dict = (lang: string) =>
  JSON.parse(fs.readFileSync(path.join(root, `src/i18n/locales/${lang}/common.json`), 'utf8')) as Record<string, string>;
const istText = (lang: string) =>
  Object.entries(dict(lang))
    .filter(([k]) => k.startsWith('ist_'))
    .map(([, v]) => v)
    .join(' | ');

describe('Career & İstihdam Köprüsü SEO Component Suite', () => {
  it('8 kariyer bileşeni tanımlı birer fonksiyondur', () => {
    for (const c of [
      CareerHeroSeo,
      CareerDualProtectionSeo,
      CareerDisciplinesGridSeo,
      CareerRecruitmentStepsSeo,
      CareerLegalGuaranteeDeepDiveSeo,
      CareerApplicationDualFormSeo,
      CareerFaqSeo,
      CareerCtaBannerSeo,
    ]) {
      expect(typeof c).toBe('function');
    }
  });

  it('uydurma iş ilanları ve JobPosting şeması sayfada yer almaz', () => {
    expect(fs.existsSync(path.join(root, 'src/components/seo/career/CareerOpenPositionsSeo.tsx'))).toBe(false);
    const client = fs.readFileSync(path.join(root, 'src/app/[lang]/istihdam-koprusu/IstihdamKoprusuClient.tsx'), 'utf8');
    expect(client).not.toContain('CareerOpenPositionsSeo');
    expect(client).not.toContain('JobPosting');
  });

  it('ist_ çeviri anahtarları dört dilde de aynı kümeyi içerir', () => {
    const keys = (l: string) => Object.keys(dict(l)).filter((k) => k.startsWith('ist_')).sort();
    const tr = keys('tr');
    expect(tr.length).toBeGreaterThan(150);
    for (const l of ['en', 'ru', 'ar']) expect(keys(l)).toEqual(tr);
  });

  it('doğrulanamayan kadro rakamları ve abartılı garanti ifadeleri kaldırılmıştır', () => {
    const text = istText('tr');
    for (const bad of ['1.200', '650+', '380+', '140+', '12 lojistik', '0850', 'Sıfır Dava', 'Sıfır Risk', '%100 Vergiden', 'Referans No']) {
      expect(text, bad).not.toContain(bad);
    }
  });

  it('maaş ödeme günü (ayın 10’u) tüm dillerde tutarlıdır; ayın 1’i denmez', () => {
    expect(istText('tr')).toContain("10'u");
    expect(istText('tr')).not.toContain("ayın 1'i");
    expect(istText('en')).toContain('10th');
  });

  it('başvuru formu çeviri anahtarlarını kullanır ve sahte referans numarası üretmez', () => {
    const form = fs.readFileSync(path.join(root, 'src/components/seo/career/CareerApplicationDualFormSeo.tsx'), 'utf8');
    expect(form).toContain("tk('ist_f_c_submit')");
    expect(form).not.toContain('Math.random');
  });
});
