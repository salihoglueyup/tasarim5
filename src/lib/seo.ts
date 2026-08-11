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

import { BASE_URL } from './constants';
export { BASE_URL };

/** Varsayılan (marka) OG görselinin alt metni. */
export const DEFAULT_OG_ALT = 'Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi';

export const LOCALES = ['tr', 'en', 'ru', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'tr';
export const SITE_NAME = 'Alo Yönetim';

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
 * Locale-siz bir kanonik yol ("/", "/hizmetler", "/hizmetler/tesis-yonetimi")
 * ve dil için mutlak URL üretir.
 */
export function localizedUrl(path: string, lang: Locale): string {
  // Baştaki "/" garanti, sondaki "/" temizlenir, kök "" olur.
  const normalized = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  const prefix = lang === DEFAULT_LOCALE ? '' : `/${lang}`;
  return `${BASE_URL}${prefix}${normalized}` || BASE_URL;
}

/** hreflang matrisi: tr-TR, en-US, ru-RU, ar-SA ve x-default (TR varsayılan). */
export function buildLanguageAlternates(path: string): Record<string, string> {
  return {
    'tr-TR': localizedUrl(path, 'tr'),
    'en-US': localizedUrl(path, 'en'),
    'ru-RU': localizedUrl(path, 'ru'),
    'ar-SA': localizedUrl(path, 'ar'),
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
  /** OG görsel varyantı: default | service | local | article. Otomatik türetilir. */
  ogImageType?: 'default' | 'service' | 'local' | 'article';
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
  ogImageType,
}: BuildMetadataArgs): Metadata {
  const locale = normalizeLocale(lang);
  const canonical = localizedUrl(path, locale);

  // OG görsel tipi: açıkça geçilmezse ogType'tan türetilir.
  const resolvedOgType: 'default' | 'service' | 'local' | 'article' =
    ogImageType ?? (ogType === 'article' ? 'article' : 'default');

  // Görsel verilmezse dinamik OG route'u devreye girer (Faz 4 — güncellenmiş).
  // title ve type query param olarak iletilir; her sayfa kendine özgü görsel alır.
  const ogParams = new URLSearchParams({ title, type: resolvedOgType }).toString();
  const resolvedImages =
    images && images.length
      ? images
      : [
          {
            url: `${localizedUrl('/og', locale)}?${ogParams}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ];

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
      locale: OG_LOCALE_MAP[locale] || 'tr_TR',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: resolvedImages,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: resolvedImages,
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}
