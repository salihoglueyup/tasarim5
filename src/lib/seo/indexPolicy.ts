// Hangi URL'lerin Google'da indekslenebileceğinin tek kaynağı.
// buildMetadata (robots + hreflang), sitemap'ler ve etiket sayfaları bu modülü kullanır.
// Bu dosya bilinçli olarak hiçbir şey import etmez (@/lib/seo ile döngüsel bağımlılığı önler).

export type IndexLocale = 'tr' | 'en' | 'ru' | 'ar';

/**
 * Çevirisi tamamlanmış ve ana dili o dil olan biri tarafından gözden geçirilmiş sayfalar.
 * Buraya eklenmeyen en/ru/ar sayfaları noindex olur, hreflang'den ve sitemap'ten çıkar
 * (içerikleri Türkçe olduğu için Türkçe sayfanın kopyası sayılırlar).
 */
export const TRANSLATED_PATHS: Record<Exclude<IndexLocale, 'tr'>, readonly string[]> = {
  en: [],
  ru: [],
  ar: [],
};

/** Türkçe dahil tüm dillerde noindex olacak yol kalıpları (ince/şablon sayfalar). */
export const NOINDEX_PATH_PATTERNS: readonly RegExp[] = [];

/** Bir etiket sayfasının indekslenmesi için gereken en az yazı sayısı. */
export const MIN_POSTS_FOR_TAG_INDEX = 3;

export function normalizeIndexPath(path: string): string {
  const bare = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return bare === '' ? '/' : bare.startsWith('/') ? bare : `/${bare}`;
}

export function isPathIndexable(path: string): boolean {
  const p = normalizeIndexPath(path);
  return !NOINDEX_PATH_PATTERNS.some((re) => re.test(p));
}

export function isLocaleIndexable(path: string, locale: string): boolean {
  if (locale === 'tr') return true;
  const list = TRANSLATED_PATHS[locale as Exclude<IndexLocale, 'tr'>];
  return !!list && list.includes(normalizeIndexPath(path));
}

export function isIndexable(path: string, locale: string): boolean {
  return isPathIndexable(path) && isLocaleIndexable(path, locale);
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, '-');
}
