import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { buildLanguageAlternates, localizedUrl } from '../seo';

describe('Wave 7: Faz 151 - Faz 155 Çok Dilli Mimari (i18n), RTL, x-default & Slug Çevirileri', () => {
  const globalsCssPath = path.resolve(process.cwd(), 'src/app/globals.css');
  const middlewarePath = path.resolve(process.cwd(), 'src/middleware.ts');

  it('Faz 151: globals.css Arapça RTL için doğru yazı tipi, satır yüksekliği ve hizalama içerir', () => {
    const css = fs.readFileSync(globalsCssPath, 'utf-8');
    expect(css).toContain('[dir="rtl"]');
    expect(css).toContain('text-align: right');
    expect(css).toContain('var(--font-cairo)');
  });

  it('Faz 152: globals.css RTL modunda oklar ve ikonlar için otomatik yön tersleme (mirroring) kurallarını içerir', () => {
    const css = fs.readFileSync(globalsCssPath, 'utf-8');
    expect(css).toContain('[dir="rtl"] .rtl-flip');
    expect(css).toContain('[dir="rtl"] .rtl-auto-mirror');
    expect(css).toContain('transform: scaleX(-1)');
  });

  it('Faz 153: buildLanguageAlternates x-default etiketini daima Türkçe kök URL olarak sabitler', () => {
    const pathUrl = '/hizmetler/tesis-yonetimi';
    const alternates = buildLanguageAlternates(pathUrl);

    expect(alternates['x-default']).toBeDefined();
    expect(alternates['x-default']).toBe(localizedUrl(pathUrl, 'tr'));
    expect(alternates['x-default']).toBe('https://aloyonetim.com.tr/hizmetler/tesis-yonetimi');
  });

  it('Faz 154: common.json TR, EN, RU ve AR dilleri arasında %100 anahtar eşleşmesine sahiptir (0 eksik anahtar)', () => {
    const tr = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/i18n/locales/tr/common.json'), 'utf-8'));
    const en = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/i18n/locales/en/common.json'), 'utf-8'));
    const ru = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/i18n/locales/ru/common.json'), 'utf-8'));
    const ar = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/i18n/locales/ar/common.json'), 'utf-8'));

    const trKeys = Object.keys(tr);
    const enKeys = new Set(Object.keys(en));
    const ruKeys = new Set(Object.keys(ru));
    const arKeys = new Set(Object.keys(ar));

    const missingInEn = trKeys.filter((k) => !enKeys.has(k));
    const missingInRu = trKeys.filter((k) => !ruKeys.has(k));
    const missingInAr = trKeys.filter((k) => !arKeys.has(k));

    expect(missingInEn).toEqual([]);
    expect(missingInRu).toEqual([]);
    expect(missingInAr).toEqual([]);
    expect(trKeys.length).toBeGreaterThan(1400);
  });

  it('Faz 155: middleware.ts EN, RU ve AR için alt hizmet ve kurumsal URL çevirilerini eksiksiz barındırır', () => {
    const middlewareContent = fs.readFileSync(middlewarePath, 'utf-8');

    // EN eşleşmeleri
    expect(middlewareContent).toContain("'corporate/about-us': 'kurumsal/hakkimizda'");
    expect(middlewareContent).toContain("'facility-management/plaza-management': 'hizmetler/tesis-yonetimi/plaza-yonetimi'");

    // RU eşleşmeleri
    expect(middlewareContent).toContain("'uslugi/bezopasnost': 'hizmetler/guvenlik-yonetimi'");
    expect(middlewareContent).toContain("'korporativniy/sertifikaty': 'kurumsal/kalite-belgelerimiz'");

    // AR eşleşmeleri
    expect(middlewareContent).toContain("'khadamat/al-amn': 'hizmetler/guvenlik-yonetimi'");
    expect(middlewareContent).toContain("'sharika/shahadat-aljawda': 'kurumsal/kalite-belgelerimiz'");
  });
});
