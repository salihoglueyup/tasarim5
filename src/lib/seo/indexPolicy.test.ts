import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TRANSLATED_PATHS, isIndexable, isLocaleIndexable, normalizeIndexPath, tagToSlug } from './indexPolicy';
import { buildLanguageAlternates, buildMetadata, formatBrandTitle, BASE_URL } from '@/lib/seo';
import sitemap from '@/app/sitemap';

describe('İndeksleme politikası (indexPolicy.ts)', () => {
  it('Türkçe her zaman, çevrilmemiş diller asla indekslenmez', () => {
    expect(isLocaleIndexable('/hizmetler', 'tr')).toBe(true);
    expect(isLocaleIndexable('/hizmetler', 'en')).toBe(false);
    expect(isLocaleIndexable('/hizmetler', 'xx')).toBe(false);
  });

  it('yolları normalize eder', () => {
    expect(normalizeIndexPath('')).toBe('/');
    expect(normalizeIndexPath('/hizmetler/')).toBe('/hizmetler');
    expect(normalizeIndexPath('hizmetler?x=1')).toBe('/hizmetler');
    expect(tagToSlug('Site Yönetimi ')).toBe('site-yönetimi');
  });

  it('çevrilmemiş dildeki sayfa noindex olur, TR sürümü indekslenir', () => {
    const en = buildMetadata({ title: 'T', description: 'D', path: '/hizmetler', lang: 'en' });
    const tr = buildMetadata({ title: 'T', description: 'D', path: '/hizmetler', lang: 'tr' });
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
    beforeEach(() => list.push('/hakkimizda'));
    afterEach(() => list.splice(list.indexOf('/hakkimizda'), 1));

    it('o dilde indekslenir ve hreflang\'e girer', () => {
      expect(isIndexable('/hakkimizda/', 'en')).toBe(true);
      const alt = buildLanguageAlternates('/hakkimizda');
      expect(alt.en).toBe(`${BASE_URL}/en/hakkimizda`);
      expect(alt['en-US']).toBe(`${BASE_URL}/en/hakkimizda`);
      expect(alt.ru).toBeUndefined();
    });
  });
});
