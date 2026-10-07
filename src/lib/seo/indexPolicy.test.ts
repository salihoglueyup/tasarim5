import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TRANSLATED_PATHS, isIndexable, isLocaleIndexable, normalizeIndexPath, tagToSlug } from './indexPolicy';
import { buildLanguageAlternates, buildMetadata, formatBrandTitle, BASE_URL } from '@/lib/seo';
import sitemap from '@/app/sitemap';

describe('İndeksleme politikası (indexPolicy.ts)', () => {
  it('Türkçe her zaman, çevrilmemiş diller asla indekslenmez', () => {
    expect(isLocaleIndexable('/referanslar', 'tr')).toBe(true);
    expect(isLocaleIndexable('/referanslar', 'en')).toBe(false);
    expect(isLocaleIndexable('/referanslar', 'xx')).toBe(false);
  });

  it('yolları normalize eder', () => {
    expect(normalizeIndexPath('')).toBe('/');
    expect(normalizeIndexPath('/hizmetler/')).toBe('/hizmetler');
    expect(normalizeIndexPath('hizmetler?x=1')).toBe('/hizmetler');
    expect(tagToSlug('Site Yönetimi ')).toBe('site-yönetimi');
  });

  it('çevrilmemiş dildeki sayfa noindex olur, TR sürümü indekslenir', () => {
    const en = buildMetadata({ title: 'T', description: 'D', path: '/referanslar', lang: 'en' });
    const tr = buildMetadata({ title: 'T', description: 'D', path: '/referanslar', lang: 'tr' });
    expect((en.robots as { index: boolean }).index).toBe(false);
    expect((tr.robots as { index: boolean }).index).toBe(true);
  });

  it('canonical\'ı başka domainde olan sayfa noindex olmaz ama hreflang ve sitemap dışında kalır', async () => {
    const meta = buildMetadata({ title: 'T', description: 'D', path: '/guvenlik-akademisi', canonicalUrl: 'https://www.guvenlikkursu.com/' });
    expect((meta.robots as { index: boolean }).index).toBe(true);
    expect(buildLanguageAlternates('/guvenlik-akademisi')).toEqual({});
    const urls = (await sitemap()).map((i) => i.url);
    expect(urls.some((u) => u.endsWith('/guvenlik-akademisi'))).toBe(false);
  });

  it('sitemap tarihi bilinmeyen sayfalara sahte lastmod vermez, gerçek tarihi olanlara verir', async () => {
    const items = await sitemap();
    const hizmetler = items.find((i) => i.url === `${BASE_URL}/hizmetler`);
    const post = items.find((i) => i.url.startsWith(`${BASE_URL}/blog/`) && !i.url.includes('/etiket/') && !i.url.includes('/kategori/') && !i.url.includes('/yazar/'));
    expect(hizmetler?.lastModified).toBeUndefined();
    expect(post?.lastModified).toBeDefined();
  });

  it('başlıkta marka tek kez yer alır (Alo Management / Alo Yonetim varyantları dahil)', () => {
    expect(formatBrandTitle('Sosyal Sorumluluk | Alo Management')).toBe('Sosyal Sorumluluk | Alo Yönetim');
    expect(formatBrandTitle('Guides | Alo Management Blog')).toBe('Guides | Alo Yönetim');
    expect(formatBrandTitle('Blog | Alo Yonetim | Alo Yönetim')).toBe('Blog | Alo Yönetim');
  });

  describe('bir sayfa çeviri listesine eklendiğinde', () => {
    const list = TRANSLATED_PATHS.en as string[];
    beforeEach(() => list.push('/referanslar'));
    afterEach(() => list.splice(list.indexOf('/referanslar'), 1));

    it('o dilde indekslenir ve hreflang\'e girer', () => {
      expect(isIndexable('/referanslar/', 'en')).toBe(true);
      const alt = buildLanguageAlternates('/referanslar');
      expect(alt.en).toBe(`${BASE_URL}/en/referanslar`);
      expect(alt['en-US']).toBe(`${BASE_URL}/en/referanslar`);
      expect(alt.ru).toBeUndefined();
    });
  });

  describe('çevirisi doğrulanmış çekirdek sayfalar', () => {
    const core = ['/', '/hizmetler', '/iletisim', '/hakkimizda', '/kullanim-sartlari', '/gizlilik-politikasi', '/kvkk-ve-aydinlatma-metni', '/cerez-politikasi'];

    it('en/ru/ar dillerinde indekslenir ve hreflang matrisinde üç dil + x-default yer alır', () => {
      for (const p of core) {
        for (const l of ['en', 'ru', 'ar']) expect(isIndexable(p, l)).toBe(true);
        const alt = buildLanguageAlternates(p);
        for (const l of ['tr', 'en', 'ru', 'ar']) expect(alt[l]).toBeDefined();
        expect(alt['x-default']).toBe(alt.tr);
      }
    });

    it('robots meta\'sı en/ru/ar sürümlerinde index, çevrilmemiş sayfada noindex', () => {
      const robots = (lang: string, path: string) =>
        (buildMetadata({ title: 'T', description: 'D', path, lang }).robots as { index: boolean }).index;
      for (const l of ['en', 'ru', 'ar']) {
        expect(robots(l, '/hakkimizda')).toBe(true);
        expect(robots(l, '/hizmetler/teknik-bakim')).toBe(true);
        expect(robots(l, '/referanslar')).toBe(false);
      }
    });

    it('sitemap çevrilmiş dil URL\'lerini içerir, çevrilmemişleri içermez', async () => {
      const urls = (await sitemap()).map((i) => i.url);
      expect(urls).toContain(`${BASE_URL}/en/hakkimizda`);
      expect(urls).toContain(`${BASE_URL}/ar/iletisim`);
      expect(urls).toContain(`${BASE_URL}/ru/teklif-al`);
      expect(urls).toContain(`${BASE_URL}/en/teklif-al`);
      expect(urls).toContain(`${BASE_URL}/ar/teklif-al`);
      expect(urls.some((u) => /\/(en|ru|ar)\/(blog|bolgeler)\//.test(u))).toBe(false);
    });
  });
});
