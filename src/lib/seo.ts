import type { Metadata } from 'next';

/**
 * Merkezi SEO Yardımcı ve Metadata Fabrikası (Alo Yönetim — SEO Master Plan V4).
 *
 * Tüm sayfaların metadata'sını tek bir yerden üretir; canonical, hreflang
 * (alternates.languages), Open Graph, Twitter, Googlebot gelişmiş direktifleri
 * (max-image-preview:large, max-snippet:-1), yerel geo etiketleri, sayfalama (pagination)
 * ve kanonik URL temizliğini otomatik ve tutarlı biçimde sağlar.
 */

import { BASE_URL } from './constants';
import { isIndexable, hasExternalCanonical } from './seo/indexPolicy';
import { BASE_KEYWORDS, getPageMeta } from '@/i18n/pageMeta';
export { BASE_URL };

/** Varsayılan (marka) OG görselinin alt metni. */
export const DEFAULT_OG_ALT = 'Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi İstanbul';

export const LOCALES = ['tr', 'en', 'ru', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'tr';
export const SITE_NAME = 'Alo Yönetim';

/** Sabit Coğrafi Konum Koordinatları (Kadıköy Merkez Ofis). */
export const SEO_GEO_REGION = 'TR-34';
export const SEO_GEO_PLACENAME = 'Kadıköy, İstanbul, Türkiye';
export const SEO_GEO_POSITION = '40.9900;29.0300';
export const SEO_ICBM = '40.9900, 29.0300';

const OG_LOCALE_MAP: Record<Locale, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  ru: 'ru_RU',
  ar: 'ar_SA',
};

/** Gelen değeri desteklenen bir Locale'e normalize eder. */
export function normalizeLocale(lang?: string): Locale {
  if (lang === 'en' || lang === 'ru' || lang === 'ar') {
    return lang;
  }
  return DEFAULT_LOCALE;
}

/**
 * URL üzerindeki takip ve kampanya parametrelerini (UTM, fbclid, gclid vb.)
 * temizleyerek saf kanonik URL üretir (Kopya içerik önleme).
 */
export function sanitizeCanonicalUrl(url: string, allowedParams: string[] = []): string {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? url : `/${url}`}`);
    const keysToDelete: string[] = [];

    parsed.searchParams.forEach((_, key) => {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey.startsWith('utm_') ||
        lowerKey === 'fbclid' ||
        lowerKey === 'gclid' ||
        lowerKey === 'msclkid' ||
        lowerKey === 'ref' ||
        lowerKey === 'source' ||
        lowerKey === 'session_id'
      ) {
        if (!allowedParams.includes(key)) {
          keysToDelete.push(key);
        }
      }
    });

    keysToDelete.forEach((key) => parsed.searchParams.delete(key));
    const cleanSearch = parsed.searchParams.toString();
    const cleanPath = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/+$/, '');
    return `${parsed.origin}${cleanPath}${cleanSearch ? `?${cleanSearch}` : ''}`;
  } catch {
    return url;
  }
}

/**
 * Faz 146: Kopya İçerik (Duplicate Content) Riskine Karşı
 * Self-Referencing Canonical URL Doğrulama Motoru.
 */
export function validateCanonicalUrl(
  candidateUrl: string,
  expectedPath: string,
  lang: string = DEFAULT_LOCALE
): { isValid: boolean; normalizedCanonical: string; issues: string[] } {
  const issues: string[] = [];
  const expectedCanonical = localizedUrl(expectedPath, normalizeLocale(lang));

  if (!candidateUrl || !candidateUrl.startsWith('http')) {
    issues.push('Kanonik URL mutlak (absolute) HTTPS protokolü ile başlamalıdır.');
  }

  const clean = sanitizeCanonicalUrl(candidateUrl);
  if (clean !== candidateUrl) {
    issues.push('Kanonik URL üzerinde takip/kampanya parametresi tespit edildi ve temizlendi.');
  }

  if (clean !== expectedCanonical) {
    issues.push(`Self-referencing uyuşmazlığı: Beklenen "${expectedCanonical}", gelen "${candidateUrl}".`);
  }

  return {
    isValid: issues.length === 0,
    normalizedCanonical: expectedCanonical,
    issues,
  };
}

/**
 * Locale-siz bir kanonik yol ("/", "/hizmetler", "/hizmetler/tesis-yonetimi")
 * ve dil için mutlak URL üretir.
 */
export function localizedUrl(path: string, lang: Locale): string {
  const normalized = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  const prefix = lang === DEFAULT_LOCALE ? '' : `/${lang}`;
  const full = `${BASE_URL}${prefix}${normalized}` || BASE_URL;
  return sanitizeCanonicalUrl(full);
}

const REGIONAL_TAG: Record<Locale, string> = { tr: 'tr-TR', en: 'en-US', ru: 'ru-RU', ar: 'ar-SA' };

/** Yalnızca bu yol için indekslenebilir dillerdeki URL'ler. */
export function indexableLocales(path: string): Locale[] {
  return LOCALES.filter((l) => isIndexable(path, l));
}

/** Sitemap'e girecek diller: indekslenebilir ve canonical'ı bu sitede olan URL'ler. */
export function sitemapLocales(path: string): Locale[] {
  return hasExternalCanonical(path) ? [] : indexableLocales(path);
}

/**
 * hreflang matrisi: yalnızca indekslenebilir diller (bkz. seo/indexPolicy.ts) + bölgesel etiketleri + x-default.
 * Noindex bir dile hreflang vermek, Google'a çelişkili sinyal gönderir.
 */
export function buildLanguageAlternates(path: string): Record<string, string> {
  const locales = indexableLocales(path);
  if (!locales.includes(DEFAULT_LOCALE) || hasExternalCanonical(path)) return {};
  const out: Record<string, string> = {};
  for (const l of locales) {
    out[l] = localizedUrl(path, l);
    out[REGIONAL_TAG[l]] = localizedUrl(path, l);
  }
  out['x-default'] = localizedUrl(path, DEFAULT_LOCALE);
  return out;
}

/**
 * Sayfalama (Pagination) için prev ve next linklerini ve kanonik URL'yi üretir.
 */
export function buildPaginationAlternates(
  basePath: string,
  currentPage: number,
  totalPages: number,
  lang: string = DEFAULT_LOCALE
): {
  canonical: string;
  prev?: string;
  next?: string;
} {
  const locale = normalizeLocale(lang);
  const cleanBasePath = basePath.replace(/\/page\/\d+/g, '').replace(/\/+$/, '');

  const pagePath = currentPage <= 1 ? cleanBasePath : `${cleanBasePath}/page/${currentPage}`;
  const canonical = localizedUrl(pagePath, locale);

  let prev: string | undefined;
  if (currentPage > 1) {
    const prevPath = currentPage === 2 ? cleanBasePath : `${cleanBasePath}/page/${currentPage - 1}`;
    prev = localizedUrl(prevPath, locale);
  }

  let next: string | undefined;
  if (currentPage < totalPages) {
    const nextPath = `${cleanBasePath}/page/${currentPage + 1}`;
    next = localizedUrl(nextPath, locale);
  }

  return { canonical, prev, next };
}

/**
 * Breadcrumb dizisinden arama motoru dostu başlık zinciri üretir.
 */
export function buildBreadcrumbTitleChain(
  breadcrumbs: { name: string; url?: string }[],
  separator = ' | '
): string {
  const names = breadcrumbs
    .map((b) => b.name.trim())
    .filter((n) => n && n.toLowerCase() !== 'anasayfa' && n.toLowerCase() !== 'home');
  return names.length > 0 ? names.reverse().join(separator) : SITE_NAME;
}

export interface SocialShareLinks {
  whatsapp: string;
  linkedin: string;
  twitter: string;
  facebook: string;
}

/**
 * Sosyal Medya Paylaşım Linkleri Üreticisi.
 */
export function generateSocialShareUrls(
  pageUrl: string,
  title: string,
  summary?: string
): SocialShareLinks {
  const fullUrl = pageUrl.startsWith('http') ? pageUrl : `${BASE_URL}${pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary || title);

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedSummary}`,
  };
}

export type BuildMetadataArgs = {
  /** Sayfa başlığı (title template'i root layout tarafından uygulanır). */
  title: string;
  description: string;
  /** Locale-siz kanonik yol, ör. "/hizmetler" veya "/" (ana sayfa). */
  path: string;
  /** Sayfanın dili; verilmezse TR. */
  lang?: string;
  /** OG/Twitter görselleri. Verilmezse dinamik opengraph-image route'u devreye girer. */
  images?: string[];
  keywords?: string[];
  /** true ise robots noindex (follow açık kalır). */
  noindex?: boolean;
  /** OG tipi (varsayılan "website"; blog için "article"). */
  ogType?: 'website' | 'article';
  /** OG görsel varyantı: default | service | local | article. Otomatik türetilir. */
  ogImageType?: 'default' | 'service' | 'local' | 'article';
  /** Blog yazıları için E-E-A-T: yayın tarihi (ISO 8601). */
  datePublished?: string;
  /** Blog yazıları için E-E-A-T: güncelleme tarihi (ISO 8601). */
  dateModified?: string;
  /** Blog yazıları için E-E-A-T: yazar adı. */
  authorName?: string;
  /** Hedef anahtar kelime (örn. 'tesis yönetimi') */
  targetKeyword?: string;
  /** Harici veya özel canonical URL (örn. cross-domain otorite aktarımı için). */
  canonicalUrl?: string;
};

/**
 * Marka başlığı formatlayıcı (Alo Yönetim Tek Marka Standardı).
 * - Çift marka eklerini ("| Alo Yönetim | Alo Yönetim") temizler.
 * - Hantal tüzel ad eklerini ("— Alo Yönetim ve Organizasyon A.Ş.") temizler.
 * - Başlık sonunda tek ve standart " | Alo Yönetim" olmasını garanti eder.
 * - Anasayfa gibi doğrudan marka içeren başlıkları ("Alo Yönetim — ...") korur.
 */
export function formatBrandTitle(title: string, brand: string = 'Alo Yönetim'): string {
  if (!title) return brand;
  let clean = title.trim();

  // 1. Tüzel unvan veya eski uzun marka eklerini temizle
  clean = clean.replace(/\s*[-—–|]\s*Alo Yönetim ve Organizasyon A\.Ş\.?/gi, '');
  clean = clean.replace(/\s*[-—–|]\s*Alo Yönetim Tesis Yönetimi/gi, '');

  // 2. Sondaki marka eklerini ayıkla (Alo Yönetim / Alo Yonetim / Alo Management, "Blog" ekiyle veya eksiz)
  const trailingBrand = /\s*[-—–|]\s*Alo (Yönetim|Yonetim|Management)( Blog)?\s*$/i;
  while (trailingBrand.test(clean)) {
    clean = clean.replace(trailingBrand, '').trim();
  }

  // 3. Başlık zaten doğrudan marka ile başlıyorsa (örn. anasayfa başlıkları)
  if (clean === brand || clean.startsWith(brand + ' —') || clean.startsWith(brand + ' |') || clean.startsWith(brand + ' -')) {
    return clean;
  }

  // 4. Temizlenmiş sayfa konusunun ardına tek ve standart marka ekini yerleştir
  return clean ? `${clean} | ${brand}` : brand;
}

/**
 * Sayfa metadata'sı üretir. Canonical + hreflang + OG + Twitter + Googlebot gelişmiş direktifleri dahil.
 */
export function buildMetadata({
  title: titleArg,
  description: descriptionArg,
  path,
  lang,
  images,
  keywords = [],
  noindex = false,
  ogType = 'website',
  ogImageType,
  datePublished,
  dateModified,
  authorName,
  targetKeyword,
  canonicalUrl,
}: BuildMetadataArgs): Metadata {
  const locale = normalizeLocale(lang);
  // Türkçe dışındaki dillerde, çevirisi varsa sayfanın verdiği Türkçe başlık/açıklama yerine kullanılır.
  const translated = getPageMeta(path, locale);
  const title = translated?.title ?? titleArg;
  const description = translated?.description ?? descriptionArg;
  const resolvedTitle = formatBrandTitle(title);
  const canonical = canonicalUrl || localizedUrl(path, locale);
  const shouldNoindex = noindex || !isIndexable(path, locale);

  const baseKeywords =
    locale === 'en' || locale === 'ru' || locale === 'ar' ? BASE_KEYWORDS[locale] : ['tesis yönetimi', 'site yönetimi', 'İstanbul'];
  // Çevrilmiş dillerde Türkçe anahtar kelimeler basılmaz.
  const pageKeywords = translated ? [] : [...(targetKeyword ? [targetKeyword] : []), ...keywords];
  const resolvedKeywords = Array.from(new Set([...pageKeywords, ...baseKeywords]));

  const resolvedOgType: 'default' | 'service' | 'local' | 'article' =
    ogImageType ?? (ogType === 'article' ? 'article' : 'default');

  const ogParams = new URLSearchParams({ title: resolvedTitle, type: resolvedOgType }).toString();
  const resolvedImages =
    images && images.length
      ? images
      : [
          {
            url: `${BASE_URL}/api/og?${ogParams}`,
            width: 1200,
            height: 630,
            alt: resolvedTitle,
          },
        ];

  return {
    metadataBase: new URL(BASE_URL),
    title: resolvedTitle,
    description,
    keywords: resolvedKeywords,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: ogType,
      locale: OG_LOCALE_MAP[locale] || 'tr_TR',
      alternateLocale: Object.values(OG_LOCALE_MAP).filter((l) => l !== (OG_LOCALE_MAP[locale] || 'tr_TR')),
      url: canonical,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      images: resolvedImages,
      ...(ogType === 'article' && datePublished
        ? {
            publishedTime: datePublished,
            modifiedTime: dateModified ?? datePublished,
            ...(authorName ? { authors: [authorName] } : {}),
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: resolvedImages,
    },
    robots: shouldNoindex
      ? {
          index: false,
          follow: true,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    other: {
      'geo.region': SEO_GEO_REGION,
      'geo.placename': SEO_GEO_PLACENAME,
      'geo.position': SEO_GEO_POSITION,
      'ICBM': SEO_ICBM,
      'rating': 'general',
      'revisit-after': '3 days',
      'X-Topical-Domain': 'Facility and Property Management',
      'DC.title': resolvedTitle,
      'DC.description': description,
      'DC.creator': authorName || SITE_NAME,
      'DC.language': locale,
    },
  };
}

/**
 * Başlık ve Açıklama Kalite Kontrol Fonksiyonu.
 */
export function validateSnippetQuality(title: string, description: string): {
  isTitleValid: boolean;
  isDescriptionValid: boolean;
  titleLength: number;
  descriptionLength: number;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  const titleLength = title.trim().length;
  const descriptionLength = description.trim().length;

  if (titleLength < 30) suggestions.push('Başlık çok kısa (en az 30 karakter önerilir)');
  if (titleLength > 65) suggestions.push('Başlık arama sonuçlarında kesilebilir (en fazla 65 karakter önerilir)');

  if (descriptionLength < 100) suggestions.push('Açıklama çok kısa (en az 100 karakter önerilir)');
  if (descriptionLength > 165) suggestions.push('Açıklama arama sonuçlarında kesilebilir (en fazla 160 karakter önerilir)');

  return {
    isTitleValid: titleLength >= 30 && titleLength <= 65,
    isDescriptionValid: descriptionLength >= 100 && descriptionLength <= 165,
    titleLength,
    descriptionLength,
    suggestions,
  };
}
