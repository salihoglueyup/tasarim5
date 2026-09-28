import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TRANSLATED_PATHS, isIndexable, isLocaleIndexable, normalizeIndexPath, tagToSlug } from './indexPolicy';
import { buildLanguageAlternates, buildMetadata, BASE_URL } from '@/lib/seo';

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
