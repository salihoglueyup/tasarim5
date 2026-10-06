// Hangi URL'lerin Google'da indekslenebileceğinin tek kaynağı.
// buildMetadata (robots + hreflang), sitemap'ler ve etiket sayfaları bu modülü kullanır.
// Bu dosya bilinçli olarak hiçbir şey import etmez (@/lib/seo ile döngüsel bağımlılığı önler).

export type IndexLocale = 'tr' | 'en' | 'ru' | 'ar';

/**
 * Çevirisi tamamlanmış ve ana dili o dil olan biri tarafından gözden geçirilmiş sayfalar.
 * Buraya eklenmeyen en/ru/ar sayfaları noindex olur, hreflang'den ve sitemap'ten çıkar
 * (içerikleri Türkçe olduğu için Türkçe sayfanın kopyası sayılırlar).
 */
// Doğrulama: <main> içeriği yerel build üzerinde ölçüldü (scripts/audit-translation.mjs): metin gerçekten
// hedef dilde, <title>/description çevrili. Yeni bir sayfa eklemeden önce aynı denetimden geçmeli.
const CORE_TRANSLATED = [
  '/',
  '/hizmetler',
  '/iletisim',
  '/hakkimizda',
  '/kullanim-sartlari',
  '/gizlilik-politikasi',
  '/kvkk-ve-aydinlatma-metni',
  '/cerez-politikasi',
] as const;

// Hizmet sayfaları: çekirdek içerik çevrildi, yalnızca Türkçe olan SEO blokları en/ru/ar'da gizli (TrOnly).
const SERVICE_TRANSLATED = ['/hizmetler/peyzaj-ve-bahce-bakimi', '/hizmetler/hasere-ve-dezenfeksiyon', '/hizmetler/havuz-bakimi-ve-hijyen', '/hizmetler/temizlik-ve-hijyen', '/hizmetler/aidat-takibi', '/hizmetler/teknik-bakim', '/hizmetler/hukuk-ve-icra-danismanligi', '/hizmetler/guvenlik-yonetimi'] as const;

export const TRANSLATED_PATHS: Record<Exclude<IndexLocale, 'tr'>, readonly string[]> = {
  // teklif-al: form etiketleri ve metinler çeviri anahtarlarına bağlı (en/ru/ar doğrulandı).
  // /sss: arayüz metinleri çeviri anahtarlarında, SSS maddeleri DB'deki _en/_ru/_ar alanlarından gelir.
  en: [...CORE_TRANSLATED, '/teklif-al', '/sss', ...SERVICE_TRANSLATED],
  ru: [...CORE_TRANSLATED, '/teklif-al', '/sss', ...SERVICE_TRANSLATED],
  ar: [...CORE_TRANSLATED, '/teklif-al', '/sss', ...SERVICE_TRANSLATED],
};

/** Türkçe dahil tüm dillerde noindex olacak yol kalıpları (ince/şablon sayfalar). */
export const NOINDEX_PATH_PATTERNS: readonly RegExp[] = [];

/**
 * Canonical'ı başka bir domainde olan yollar (ör. /guvenlik-akademisi -> guvenlikkursu.com;
 * "alo güvenlik" aramasında iki sitenin birbiriyle yarışmasını önler).
 * Bu yollar noindex YAPILMAZ (başka domaine canonical ile çelişir); yalnızca
 * sitemap'e ve hreflang'e girmezler, çünkü ikisi de yalnızca canonical URL listelemelidir.
 */
export const EXTERNAL_CANONICAL_PATHS: readonly string[] = ['/guvenlik-akademisi'];

export function hasExternalCanonical(path: string): boolean {
  return EXTERNAL_CANONICAL_PATHS.includes(normalizeIndexPath(path));
}

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
