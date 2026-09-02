/**
 * Normalize Edilmiş Blog Arama İndeksi (Faz 20 - Arama Motoru Optimizasyonu).
 *
 * Türkçe karakter uyumlu (ı-i, ç-c, ğ-g, ö-o, ş-s, ü-u) normalizasyon ve
 * tek seferlik arama indeksi üretimi ile CPU yükünü minimuma indirir.
 */

import { parseTags } from './jsonSafe';

/**
 * Arama terimlerini ve içerikleri Türkçe harf duyarsız normalize eder.
 */
export function normalizeSearchTerm(text: unknown): string {
  if (!text || typeof text !== 'string') return '';

  return text
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Kombine aksan işaretlerini temizle
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
}

export interface SearchIndexEntry<T = any> {
  post: T;
  searchToken: string;
  categorySlug: string;
}

/**
 * Blog yazıları listesini tek seferde aranabilir bir indeks yapısına dönüştürür.
 */
export function createBlogSearchIndex<T extends { title?: string; description?: string; tags?: unknown; category?: any }>(
  posts: T[]
): SearchIndexEntry<T>[] {
  if (!Array.isArray(posts)) return [];

  return posts.map((post) => {
    const title = post.title || '';
    const desc = post.description || '';
    const tags = parseTags(post.tags).join(' ');
    const categorySlug = post.category?.slug || '';

    const combined = `${title} ${desc} ${tags}`;
    const searchToken = normalizeSearchTerm(combined);

    return {
      post,
      searchToken,
      categorySlug,
    };
  });
}

/**
 * Normalize edilmiş arama indeksi üzerinde ultra hızlı filtreleme yapar.
 */
export function searchInBlogIndex<T>(
  index: SearchIndexEntry<T>[],
  query: string,
  categorySlug: string = 'all'
): T[] {
  if (!index || index.length === 0) return [];

  const normQuery = normalizeSearchTerm(query);
  const filterByCat = categorySlug !== 'all';

  return index
    .filter((entry) => {
      const catMatch = !filterByCat || entry.categorySlug === categorySlug;
      if (!catMatch) return false;

      if (!normQuery) return true;
      return entry.searchToken.includes(normQuery);
    })
    .map((entry) => entry.post);
}
