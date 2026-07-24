import type { Metadata } from 'next';

/**
 * Merkezi SEO yardımcı modülü (SEO Master Plan V4 — Faz 1).
 *
 * Tüm sayfaların metadata'sını tek bir yerden üretir; canonical, hreflang
 * (alternates.languages), Open Graph, Twitter ve robots alanlarını otomatik
 * ve tutarlı biçimde doldurur.
 *
 * Dil kuralı (proxy/middleware ile uyumlu):
 *  - TR varsayılan dildir ve **prefix'siz** sunulur:  /hizmetler
 *  - EN, /en prefix'i ile sunulur:                    /en/hizmetler
 *  - Canonical daima sayfanın kendi (self-referencing) temiz URL'sini işaret eder.
 */

export const BASE_URL = 'https://aloyonetim.com';

export const LOCALES = ['tr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'tr';
export const SITE_NAME = 'Alo Yönetim';

/** Gelen değeri desteklenen bir Locale'e normalize eder. */
export function normalizeLocale(lang?: string): Locale {
  return lang === 'en' ? 'en' : DEFAULT_LOCALE;
}

/**
 * Locale-siz bir kanonik yol ("/", "/hizmetler", "/hizmetler/tesis-yonetimi")
 * ve dil için mutlak URL üretir.
 */
export function localizedUrl(path: string, lang: Locale): string {
  // Baştaki "/" garanti, sondaki "/" temizlenir, kök "" olur.
  const normalized = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  const prefix = lang === DEFAULT_LOCALE ? '' : `/${lang}`;
  return `${BASE_URL}${prefix}${normalized}` || BASE_URL;
}

/** hreflang matrisi: tr-TR, en-US ve x-default (TR varsayılan). */
export function buildLanguageAlternates(path: string): Record<string, string> {
  return {
    'tr-TR': localizedUrl(path, 'tr'),
    'en-US': localizedUrl(path, 'en'),
    'x-default': localizedUrl(path, 'tr'),
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
  /** OG/Twitter görselleri. Verilmezse dinamik opengraph-image route'u devreye girer (Faz 4). */
  images?: string[];
  keywords?: string[];
  /** true ise robots noindex (follow açık kalır). */
  noindex?: boolean;
  /** OG tipi (varsayılan "website"; blog için "article"). */
  ogType?: 'website' | 'article';
};

/**
 * Sayfa metadata'sı üretir. Canonical + hreflang + OG + Twitter + robots dahil.
 * `metadataBase` yalnız root layout'ta tanımlanır (burada tekrar edilmez).
 */
export function buildMetadata({
  title,
  description,
  path,
  lang,
  images,
  keywords,
  noindex = false,
  ogType = 'website',
}: BuildMetadataArgs): Metadata {
  const locale = normalizeLocale(lang);
  const canonical = localizedUrl(path, locale);

  return {
    title,
    description,
    ...(keywords && keywords.length ? { keywords } : {}),
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: ogType,
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      ...(images && images.length ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images && images.length ? { images } : {}),
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}
