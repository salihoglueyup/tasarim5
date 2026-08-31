/**
 * Çift Çekirdekli Çok Dilli SEO & hreflang Motoru (dualCoreMultiLangEngine.ts)
 * 
 * Türkçe, İngilizce, Arapça ve Rusça (TR/EN/AR/RU) dillerinde hreflang etiketlerini,
 * lokalize anahtar kelimeleri, çok dilli sitemap XML parçalarını, OpenGraph og:locale
 * ve iki yönlü hreflang tutarlılık denetimlerini (Reciprocal Return Tag) yöneten motor.
 * 
 * 500 Faz Master Planı — Bölüm O (Faz 386 - 420)
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';
import { CANONICAL_NAP } from './napGuardEngine';

/* =========================================================================
 * O1 — HREFLANG & LOKALİZASYON (Faz 386-405)
 * ========================================================================= */

export type SupportedLocale = 'tr' | 'en' | 'ar' | 'ru';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['tr', 'en', 'ar', 'ru'];

export interface HreflangEntry {
  lang: string;
  url: string;
  isDefault?: boolean;
}

export interface LocalizedMetaTag {
  locale: SupportedLocale;
  title: string;
  description: string;
  canonicalUrl: string;
  ogLocale: string;
  alternateLocales: string[];
}

/**
 * Sayfa URL'i için eksiksiz <link rel="alternate" hreflang="..."> etiket dizisi üretir.
 */
export function buildHreflangTags(pageSlug: string, locales: SupportedLocale[] = SUPPORTED_LOCALES): HreflangEntry[] {
  const cleanSlug = pageSlug.startsWith('/') ? pageSlug : `/${pageSlug}`;
  const baseSlug = cleanSlug === '/' ? '' : cleanSlug;

  const entries: HreflangEntry[] = locales.map((loc) => {
    const localizedUrl = loc === 'tr' ? `${BASE_URL}${baseSlug}` : `${BASE_URL}/${loc}${baseSlug}`;
    return {
      lang: loc,
      url: localizedUrl,
      isDefault: loc === 'tr',
    };
  });

  // Google x-default direktifi: Eşleşmeyen tüm diller için varsayılan Türkçe sayfaya yönlendirir
  entries.push({
    lang: 'x-default',
    url: `${BASE_URL}${baseSlug}`,
    isDefault: true,
  });

  return entries;
}

/**
 * Belirli bir dil için Canonical URL üretir.
 */
export function buildCanonicalForLocale(pageSlug: string, locale: SupportedLocale = 'tr'): string {
  const cleanSlug = pageSlug.startsWith('/') ? pageSlug : `/${pageSlug}`;
  const baseSlug = cleanSlug === '/' ? '' : cleanSlug;

  if (locale === 'tr') {
    return `${BASE_URL}${baseSlug}`;
  }
  return `${BASE_URL}/${locale}${baseSlug}`;
}

/**
 * Dile ve dikeyine göre hedef anahtar kelimeleri döner.
 */
export function buildLocalizedKeywordMap(pillar: DomainPillar = 'site', locale: SupportedLocale = 'tr'): string[] {
  const isFacility = pillar === 'facility';

  switch (locale) {
    case 'en':
      return isFacility
        ? [
            'facility management Istanbul',
            'commercial property management Turkey',
            'plaza building operations Istanbul',
            'ISO 41001 facility services Turkey',
          ]
        : [
            'property management Istanbul',
            'apartment management company Turkey',
            'HOA management Istanbul',
            'residential building management Turkey',
          ];

    case 'ar':
      return isFacility
        ? [
            'إدارة المرافق والمنشآت في إسطنبول',
            'شركة إدارة الأبراج والمراكز التجارية تركيا',
            'صيانة المباني والشركات إسطنبول',
          ]
        : [
            'إدارة المجمعات السكنية في إسطنبول',
            'شركة إدارة العقارات والمباني تركيا',
            'تحصيل العائدات الشهرية للمجمعات تركيا',
          ];

    case 'ru':
      return isFacility
        ? [
            'фасилити менеджмент Стамбул',
            'управление коммерческой недвижимостью Турция',
            'обслуживание бизнес центров Стамбул',
          ]
        : [
            'управление недвижимостью Стамбул',
            'управляющая компания жилых комплексов Турция',
            'обслуживание жилых домов в Турции',
          ];

    default: // 'tr'
      return isFacility
        ? ['tesis yönetimi istanbul', 'plaza yönetimi', 'bina yönetimi', 'iso 41001']
        : ['site yönetimi istanbul', 'profesyonel apartman yönetimi', 'aidat takibi', 'kmk 634'];
  }
}

/**
 * Belirli bir dil için SERP Title & Description üretir.
 */
export function buildLocalizedSerpMeta(pageSlug: string, locale: SupportedLocale = 'tr', pillar: DomainPillar = 'site'): LocalizedMetaTag {
  const canonicalUrl = buildCanonicalForLocale(pageSlug, locale);
  const isFacility = pillar === 'facility';

  const metaDict: Record<SupportedLocale, { title: string; desc: string; ogLocale: string }> = {
    tr: {
      title: isFacility
        ? 'Entegre Tesis ve Plaza Yönetimi İstanbul | Alo Yönetim'
        : 'Profesyonel Site ve Apartman Yönetimi İstanbul | Alo Yönetim',
      desc: isFacility
        ? 'İstanbul genelinde plazalar, iş merkezleri ve ticari binalar için ISO 41001 standartlarında profesyonel entegre tesis yönetimi.'
        : 'İstanbul\'da 350+ site ve 28.000 dairede 634 KMK uyumlu şeffaf aidat takibi, 7/24 teknik bakım ve profesyonel yönetim.',
      ogLocale: 'tr_TR',
    },
    en: {
      title: isFacility
        ? 'Integrated Facility & Plaza Management Istanbul | Alo Management'
        : 'Professional Property & HOA Management Istanbul | Alo Management',
      desc: isFacility
        ? 'ISO 41001 accredited facility management, BMS maintenance, and 24/7 security for commercial buildings and towers in Istanbul.'
        : 'Leading property management in Istanbul for residential complexes, offering transparent dues tracking and 24/7 technical service.',
      ogLocale: 'en_US',
    },
    ar: {
      title: isFacility
        ? 'شركة إدارة المرافق والابراج في إسطنبول | ألو للإدارة'
        : 'إدارة المجمعات السكنية والعقارات في إسطنبول | ألو للإدارة',
      desc: isFacility
        ? 'خدمات إدارة المرافق المتكاملة للمباني التجارية والأبراج في إسطنبول وفق أعلى معايير الجودة ISO 41001.'
        : 'خدمات إدارة المجمعات السكنية والشقق في إسطنبول، متابعة العائدات والصيانة الدورية على مدار 24 ساعة.',
      ogLocale: 'ar_SA',
    },
    ru: {
      title: isFacility
        ? 'Управление коммерческой недвижимостью в Стамбуле | Alo Management'
        : 'Управляющая компания жилых комплексов в Стамбуле | Alo Management',
      desc: isFacility
        ? 'Комплексный фасилити менеджмент для бизнес-центров и коммерческих объектов в Стамбуле по стандартам ISO 41001.'
        : 'Профессиональное управление жилыми комплексами и апартаментами в Стамбуле, прозрачный учет и круглосуточный сервис.',
      ogLocale: 'ru_RU',
    },
  };

  const current = metaDict[locale] || metaDict.tr;
  const alternates = SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => metaDict[l].ogLocale);

  return {
    locale,
    title: current.title,
    description: current.desc,
    canonicalUrl,
    ogLocale: current.ogLocale,
    alternateLocales: alternates,
  };
}

/* =========================================================================
 * O2 — ÇOK DİLLİ SITEMAP & TUTARLILIK DENETİMİ (Faz 406-420)
 * ========================================================================= */

/**
 * Çok dilli Sitemap XML Parçası üretir.
 */
export function buildLocalizedSitemapEntry(pageSlug: string): string {
  const hreflangs = buildHreflangTags(pageSlug);

  const linksXml = hreflangs
    .map((h) => `    <xhtml:link rel="alternate" hreflang="${h.lang}" href="${h.url}" />`)
    .join('\n');

  return `  <url>
    <loc>${buildCanonicalForLocale(pageSlug, 'tr')}</loc>
${linksXml}
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
}

/**
 * Tarayıcı Accept-Language başlığı ve IP'den en uygun dili tespit eder.
 */
export function detectUserLocale(acceptLanguageHeader?: string): SupportedLocale {
  if (!acceptLanguageHeader) return 'tr';

  const header = acceptLanguageHeader.toLowerCase();
  if (header.includes('tr')) return 'tr';
  if (header.includes('ar')) return 'ar';
  if (header.includes('ru')) return 'ru';
  if (header.includes('en')) return 'en';

  return 'tr';
}

/**
 * Sayfalar arası çift yönlü hreflang tutarlılığını (Reciprocal validation) denetler.
 */
export function validateHreflangConsistency(pageMap: { url: string; hreflangs: { lang: string; url: string }[] }[]): {
  isValid: boolean;
  missingReciprocalLinks: string[];
} {
  const missing: string[] = [];

  pageMap.forEach((sourcePage) => {
    sourcePage.hreflangs.forEach((targetTag) => {
      if (targetTag.lang === 'x-default') return;

      const targetPage = pageMap.find((p) => p.url === targetTag.url);
      if (!targetPage) {
        missing.push(`${sourcePage.url} -> ${targetTag.url} bağlantısı mevcut ancak hedef sayfa bulunamadı.`);
      } else {
        const hasReciprocal = targetPage.hreflangs.some((h) => h.url === sourcePage.url);
        if (!hasReciprocal) {
          missing.push(`${sourcePage.url}, ${targetTag.url} sayfasına işaret ediyor fakat hedef sayfa geri işaret etmiyor (Reciprocal eksik).`);
        }
      }
    });
  });

  return {
    isValid: missing.length === 0,
    missingReciprocalLinks: missing,
  };
}
