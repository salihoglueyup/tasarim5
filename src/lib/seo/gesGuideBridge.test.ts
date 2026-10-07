import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const dict = (lang: string) =>
  JSON.parse(fs.readFileSync(path.join(root, `src/i18n/locales/${lang}/common.json`), 'utf8')) as Record<string, string>;
const gesText = (lang: string) =>
  Object.entries(dict(lang))
    .filter(([k]) => k.startsWith('ges_g_') || k.startsWith('sust_hub_') || k.startsWith('eco_point_'))
    .map(([, v]) => v)
    .join(' | ');

describe('Çatı GES rehberi ve sürdürülebilirlik sayfaları', () => {
  it('GES sayfası rehber niteliğindedir; kurulum hizmeti ve rakam iddiası içermez', () => {
    const text = gesText('tr');
    for (const bad of ['%70', '%85', 'anahtar teslim', '10 yıl', 'su sızdırmazlık garanti', 'KMK m.42', 'Madde 42', 'salt çoğunluk']) {
      expect(text, bad).not.toContain(bad);
    }
    expect(dict('tr').ges_g_notice).toContain('doğrudan yapmaz');
  });

  it('GES yatırım simülatörü ve uydurma birim maliyetli bileşenler kaldırılmıştır', () => {
    expect(fs.existsSync(path.join(root, 'src/components/seo/ges'))).toBe(false);
    expect(fs.existsSync(path.join(root, 'src/components/seo/facility/FacilityEcoHealthScoreSeo.tsx'))).toBe(false);
    expect(fs.existsSync(path.join(root, 'src/components/seo/ai-overviews/SustainabilityAiOverviewSeo.tsx'))).toBe(false);
  });

  it('ges_g_ ve sust_hub_meta_ anahtarları dört dilde aynı kümeyi içerir', () => {
    const keys = (l: string) => Object.keys(dict(l)).filter((k) => k.startsWith('ges_g_') || k.startsWith('sust_hub_meta_') || k.startsWith('sust_corp_meta_')).sort();
    const tr = keys('tr');
    expect(tr.length).toBeGreaterThan(40);
    for (const l of ['en', 'ru', 'ar']) expect(keys(l)).toEqual(tr);
  });

  it('GES sayfası hukuki karar yöntemini avukata yönlendirir (7579 dâhil)', () => {
    expect(dict('tr').ges_g_faq_1_a).toContain('7579');
    expect(dict('en').ges_g_faq_1_a).toContain('7579');
  });
});
