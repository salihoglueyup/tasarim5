import { describe, it, expect } from 'vitest';
import { TRANSLATED_TERMS, TRANSLATED_TERM_SLUGS, getTranslatedTerm } from './dictionaryTranslated';
import { TERMS, termToSlug } from './dictionary';
import { isIndexable } from '@/lib/seo/indexPolicy';

describe('Sözlük: 20 temel terimin en/ru/ar çevirisi', () => {
  it('tam 20 terim vardır ve hepsi Türkçe sözlükte mevcuttur', () => {
    expect(TRANSLATED_TERMS).toHaveLength(20);
    const slugs = new Set(TERMS.map((t) => termToSlug(t.term)));
    for (const s of TRANSLATED_TERM_SLUGS) expect(slugs.has(s), s).toBe(true);
    expect(new Set(TRANSLATED_TERM_SLUGS).size).toBe(20);
  });

  it('her terim üç dilde dolu başlık ve tanım içerir', () => {
    for (const t of TRANSLATED_TERMS) {
      for (const lang of ['en', 'ru', 'ar'] as const) {
        expect(t[lang].term.length, `${t.slug} ${lang} term`).toBeGreaterThan(3);
        expect(t[lang].definition.length, `${t.slug} ${lang} def`).toBeGreaterThan(60);
      }
    }
  });

  it('rusça ve arapça tanımlar Latin harfli Türkçe cümle içermez (Türkçe özel harfler yok)', () => {
    for (const t of TRANSLATED_TERMS) {
      for (const lang of ['ru', 'ar'] as const) {
        const withoutParens = t[lang].definition.replace(/([^)]*)/g, '');
        expect(/[çğıöşüÇĞİÖŞÜ]/.test(withoutParens), `${t.slug} ${lang}`).toBe(false);
      }
    }
  });

  it('hukuki tanımlar doğrulanmış 7579 verisiyle tutarlıdır (%5, 3 ay, 2/3, 4/5)', () => {
    const get = (slug: string, lang: 'en' | 'ru' | 'ar') => getTranslatedTerm(slug, lang)!.definition;
    for (const lang of ['en', 'ru', 'ar'] as const) {
      expect(get('gecici-isletme-projesi-kmk-m37', lang)).toMatch(/3/);
      expect(get('gecikme-tazminati-5-yasal-faiz', lang)).toMatch(/5%/);
      expect(get('toplu-yapi-kmk-m66-70', lang)).toContain('7579');
      expect(get('yonetim-plani', lang)).toContain('4/5');
      expect(get('yonetim-plani', lang)).toContain('2/3');
    }
  });

  it('çevrilen sayfalar en/ru/ar için indekslenebilir; çevrilmeyen terim indekslenemez', () => {
    for (const lang of ['en', 'ru', 'ar'] as const) {
      expect(isIndexable('/sozluk', lang)).toBe(true);
      expect(isIndexable('/sozluk/aidat', lang)).toBe(true);
      expect(isIndexable('/sozluk/hazirun-cetveli', lang)).toBe(false);
    }
    expect(isIndexable('/sozluk/hazirun-cetveli', 'tr')).toBe(true);
  });
});
