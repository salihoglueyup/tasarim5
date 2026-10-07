import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Vizyon & Misyon 2026 Kurumsal Modernizasyon Güvence Testleri', () => {
  const rootDir = process.cwd();

  it('VizyonMisyonClient tüm 7 modern kurumsal vizyon bileşenini ve ekosistem referanslarını içerir', () => {
    const clientPath = path.join(
      rootDir,
      'src/app/[lang]/kurumsal/vizyon-misyon/VizyonMisyonClient.tsx'
    );
    const content = fs.readFileSync(clientPath, 'utf8');

    expect(content).toContain('VisionHeroSeo');
    expect(content).toContain('VisionAiOverviewSeo');
    expect(content).toContain('VisionComparisonMatrixSeo');
    expect(content).toContain('VisionOperationalPillarsSeo');
    expect(content).toContain('VisionManifestoSeo');
    expect(content).toContain('VisionRoadmapSeo');
    expect(content).toContain('VisionEcosystemCtaSeo');
    expect(content).toContain('guvenlikkursu.com');
  });

  // Yalnızca vizyon sayfasına ait (viz_) çeviri satırları; sözlüğün geri kalanındaki başka sayfalar etkilenmez.
  const dictRaw = () => {
    const all = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/i18n/locales/tr/common.json'), 'utf8')) as Record<string, string>;
    return Object.entries(all)
      .filter(([k]) => k.startsWith('viz_'))
      .map(([k, v]) => `"${k}": "${v}"`)
      .join(' | ');
  };
  const read = (rel: string) => fs.readFileSync(path.join(rootDir, rel), 'utf8');

  it('VisionHeroSeo çeviri anahtarlarını kullanır ve doğrulanamayan rakamlar içermez', () => {
    const content = read('src/components/seo/vision/VisionHeroSeo.tsx');
    const dict = dictRaw();

    expect(content).toContain("viz_hero_b1");
    expect(content).toContain("viz_card_${i + 1}_value");
    for (const bad of ['45.000', '1.200', '%99,4', '%28', 'ISO 9001']) {
      expect(content).not.toContain(bad);
    }
    expect(dict).toContain('ISO 45001 • ISO 14001 • ISO 10002');
    expect(dict).not.toContain('ISO 9001');
  });

  it('VisionComparisonMatrixSeo 6 kriteri çeviri anahtarlarından okur ve rakamsız ifadeler kullanır', () => {
    const content = read('src/components/seo/vision/VisionComparisonMatrixSeo.tsx');
    const dict = dictRaw();

    expect(content).toContain('ROW_COUNT = 6');
    expect(content).toContain('viz_cmp_${n}_crit');
    expect(dict).toContain('Finansal Şeffaflık & Kasa Denetimi');
    expect(dict).toContain('Satın Alma & Tedarik Maliyetleri');
    expect(dict).not.toContain('%99,4 Zamanında Tahsilat');
    expect(dict).not.toContain('%28 Doğrudan');
  });

  it('VisionManifestoSeo 5 taahhüdü çeviri anahtarlarından okur; yanlış kanun atıfları ve garanti dili yoktur', () => {
    const content = read('src/components/seo/vision/VisionManifestoSeo.tsx');
    const dict = dictRaw();

    expect(content).toContain('PLEDGE_COUNT = 5');
    expect(content).toContain('viz_man_${n}_title');
    expect(dict).toContain('Site Adına Bloke Kıdem Tazminatı Karşılığı');
    expect(dict).not.toContain('Minimum %20 Tasarruf');
    expect(dict).not.toContain('KMK m.38');
    expect(dict).not.toContain('SÖZLEŞME GARANTİLİ');
  });

  it('VisionRoadmapSeo yalnızca doğrulanmış kuruluş yılını (2009) tarih olarak kullanır', () => {
    const content = read('src/components/seo/vision/VisionRoadmapSeo.tsx');
    const dict = dictRaw();

    expect(content).toContain('viz_road_${n}_period');
    expect(dict).toContain('"viz_road_1_period": "2009"');
    for (const bad of ['2014 — 2019', '2020 — 2023', '45.000+', '1.200+', 'ISO 9001']) {
      expect(dict).not.toContain(bad);
    }
  });

  it('Vizyon ve Misyon page.tsx dosyasında zengin AboutPage ve Corporation JSON-LD şemaları bulunur', () => {
    const pagePath = path.join(
      rootDir,
      'src/app/[lang]/kurumsal/vizyon-misyon/page.tsx'
    );
    const content = fs.readFileSync(pagePath, 'utf8');

    expect(content).toContain('AboutPage');
    expect(content).toContain('Corporation');
    expect(content).toContain('guvenlikkursu.com');
    expect(content).toContain('speakableSelectors');
  });
});
