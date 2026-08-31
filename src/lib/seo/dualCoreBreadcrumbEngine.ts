/**
 * Çift Çekirdekli (Dual-Core) Dinamik Silo Breadcrumb & Hiyerarşik Otorite Motoru (Alo Yönetim)
 * 
 * Googlebot ve LLM tarayıcılarının tüm sayfa tiplerini (hizmetler, ilçeler, alt sektörler,
 * blog, sözlük, SSS) 'Site Yönetimi' ve 'Tesis Yönetimi' topikal siloları içerisinde
 * kusursuzca anlamasını sağlayan BreadcrumbList ve SiteNavigationElement şema motoru.
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';
import { getDistrictDualCore } from './districtDualCoreMatrix';

export interface BreadcrumbStep {
  name: string;
  url: string;
  pillar?: DomainPillar;
}

export interface DualCoreBreadcrumbOptions {
  pageType: 'service' | 'district' | 'subsector' | 'blog' | 'sozluk' | 'faq' | 'home' | 'calculator';
  pillar?: DomainPillar;
  serviceSlug?: string;
  serviceName?: string;
  districtSlug?: string;
  subsectorSlug?: string;
  subsectorName?: string;
  blogCategory?: string;
  blogTitle?: string;
  blogSlug?: string;
  termSlug?: string;
  termName?: string;
  faqSlug?: string;
  faqTitle?: string;
  lang?: string;
}

export interface DualCoreBreadcrumbOutput {
  pillar: DomainPillar;
  trail: BreadcrumbStep[];
  jsonLd: Record<string, any>;
  ariaLabel: string;
}

const SERVICE_NAME_MAP: Record<string, { tr: string; en: string }> = {
  'tesis-yonetimi': { tr: 'Tesis ve Site Yönetimi', en: 'Facility & Property Management' },
  'aidat-takibi': { tr: 'Aidat Takibi & Bütçe', en: 'Dues Tracking & Budget' },
  'guvenlik-yonetimi': { tr: '5188 Güvenlik Yönetimi', en: 'Security Management' },
  'teknik-bakim': { tr: 'Teknik Bakım & Onarım', en: 'Technical Maintenance' },
  'temizlik-ve-hijyen': { tr: 'Temizlik ve Hijyen', en: 'Cleaning & Hygiene' },
  'peyzaj-ve-bahce-bakimi': { tr: 'Peyzaj ve Bahçe Bakımı', en: 'Landscape & Garden' },
  'havuz-bakimi-ve-hijyen': { tr: 'Havuz Bakımı & Hijyen', en: 'Pool Maintenance' },
  'hasere-ve-dezenfeksiyon': { tr: 'Haşere & Dezenfeksiyon', en: 'Pest Control' },
  'hukuk-ve-icra-danismanligi': { tr: 'Hukuk & İcra Danışmanlığı', en: 'Legal Consultancy' },
};

const SUBSECTOR_NAME_MAP: Record<string, { tr: string; en: string }> = {
  'rezidans-site-yonetimi': { tr: 'Rezidans & Lüks Site Yönetimi', en: 'Residence & Luxury Property' },
  'plaza-yonetimi': { tr: 'Plaza & İş Merkezi Yönetimi', en: 'Plaza & Commercial Management' },
  'toplu-konut-yonetimi': { tr: 'Toplu Konut & Mega Site Yönetimi', en: 'Mass Housing Management' },
  'sanayi-tesisi-yonetimi': { tr: 'Sanayi Tesisi & OSB Yönetimi', en: 'Industrial Facility Management' },
  'rehber': { tr: 'Tesis ve Site Yönetim Rehberi', en: 'Facility Management Guide' },
};

/**
 * Sayfa tipi, dikey (pillar) ve parametrelere göre semantik Breadcrumb zinciri üretir.
 */
export function buildDualCoreBreadcrumb(options: DualCoreBreadcrumbOptions): DualCoreBreadcrumbOutput {
  const lang = options.lang || 'tr';
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const pillar = options.pillar || 'hybrid';

  const homeLabel = lang === 'tr' ? 'Ana Sayfa' : 'Home';
  const servicesLabel = lang === 'tr' ? 'Hizmetler' : 'Services';
  const districtsLabel = lang === 'tr' ? 'Hizmet Bölgelerimiz' : 'Service Areas';
  const istanbulLabel = 'İstanbul';

  const trail: BreadcrumbStep[] = [
    {
      name: homeLabel,
      url: `${BASE_URL}${langPrefix || '/'}`,
    },
  ];

  switch (options.pageType) {
    case 'service': {
      trail.push({
        name: servicesLabel,
        url: `${BASE_URL}${langPrefix}/hizmetler`,
      });

      if (options.serviceSlug === 'tesis-yonetimi') {
        const pillarLabel =
          pillar === 'site'
            ? lang === 'tr' ? 'Site ve Apartman Yönetimi' : 'Site Management'
            : pillar === 'facility'
            ? lang === 'tr' ? 'Plaza ve Tesis Yönetimi' : 'Facility Management'
            : lang === 'tr' ? 'Tesis ve Site Yönetimi' : 'Facility & Site Management';

        trail.push({
          name: pillarLabel,
          url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`,
          pillar,
        });
      } else if (options.serviceSlug) {
        // Silo Hub
        const hubLabel =
          pillar === 'site'
            ? lang === 'tr' ? 'Site Yönetim Hizmetleri' : 'Site Services'
            : pillar === 'facility'
            ? lang === 'tr' ? 'Tesis Yönetim Hizmetleri' : 'Facility Services'
            : servicesLabel;

        trail.push({
          name: hubLabel,
          url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`,
          pillar,
        });

        const serviceName =
          options.serviceName ||
          SERVICE_NAME_MAP[options.serviceSlug]?.[lang as 'tr' | 'en'] ||
          options.serviceSlug;

        trail.push({
          name: serviceName,
          url: `${BASE_URL}${langPrefix}/hizmetler/${options.serviceSlug}`,
          pillar,
        });
      }
      break;
    }

    case 'subsector': {
      trail.push({
        name: servicesLabel,
        url: `${BASE_URL}${langPrefix}/hizmetler`,
      });

      trail.push({
        name: lang === 'tr' ? 'Tesis ve Site Yönetimi' : 'Facility Management',
        url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`,
        pillar: 'facility',
      });

      if (options.subsectorSlug) {
        const subsectorName =
          options.subsectorName ||
          SUBSECTOR_NAME_MAP[options.subsectorSlug]?.[lang as 'tr' | 'en'] ||
          options.subsectorSlug;

        trail.push({
          name: subsectorName,
          url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/${options.subsectorSlug}`,
          pillar,
        });
      }
      break;
    }

    case 'district': {
      trail.push({
        name: districtsLabel,
        url: `${BASE_URL}${langPrefix}/bolgeler`,
      });

      trail.push({
        name: istanbulLabel,
        url: `${BASE_URL}${langPrefix}/bolgeler/istanbul`,
      });

      if (options.districtSlug) {
        const districtData = getDistrictDualCore(options.districtSlug);
        const districtName = districtData?.name || options.districtSlug;

        const pillarDistrictTitle =
          pillar === 'site'
            ? `${districtName} Site Yönetimi`
            : pillar === 'facility'
            ? `${districtName} Tesis Yönetimi`
            : `${districtName} Site & Tesis Yönetimi`;

        trail.push({
          name: pillarDistrictTitle,
          url: `${BASE_URL}${langPrefix}/bolgeler/istanbul/${options.districtSlug}`,
          pillar,
        });
      }
      break;
    }

    case 'blog': {
      trail.push({
        name: 'Blog',
        url: `${BASE_URL}${langPrefix}/blog`,
      });

      if (options.blogCategory) {
        trail.push({
          name: options.blogCategory,
          url: `${BASE_URL}${langPrefix}/blog?kategori=${encodeURIComponent(options.blogCategory)}`,
        });
      }

      if (options.blogTitle && options.blogSlug) {
        trail.push({
          name: options.blogTitle,
          url: `${BASE_URL}${langPrefix}/blog/${options.blogSlug}`,
        });
      }
      break;
    }

    case 'sozluk': {
      trail.push({
        name: lang === 'tr' ? 'Tesis Yönetimi Sözlüğü' : 'Facility Glossary',
        url: `${BASE_URL}${langPrefix}/sozluk`,
      });

      if (options.termSlug) {
        const termName = options.termName || options.termSlug;
        trail.push({
          name: termName,
          url: `${BASE_URL}${langPrefix}/sozluk/${options.termSlug}`,
        });
      }
      break;
    }

    case 'faq': {
      trail.push({
        name: lang === 'tr' ? 'Sıkça Sorulan Sorular' : 'FAQ',
        url: `${BASE_URL}${langPrefix}/sss`,
      });

      if (options.faqTitle && options.faqSlug) {
        trail.push({
          name: options.faqTitle,
          url: `${BASE_URL}${langPrefix}/sss#${options.faqSlug}`,
        });
      }
      break;
    }

    case 'calculator': {
      trail.push({
        name: lang === 'tr' ? 'Hesaplayıcılar & Araçlar' : 'Calculators',
        url: `${BASE_URL}${langPrefix}/hesaplayici`,
      });
      break;
    }

    default:
      break;
  }

  const jsonLd = buildBreadcrumbJsonLd(trail);

  return {
    pillar,
    trail,
    jsonLd,
    ariaLabel: lang === 'tr' ? 'Sayfa hiyerarşisi' : 'Breadcrumb navigation',
  };
}

/**
 * Breadcrumb dizisini Schema.org BreadcrumbList JSON-LD formatına dönüştürür.
 */
export function buildBreadcrumbJsonLd(trail: BreadcrumbStep[]): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: step.url,
    })),
  };
}

/**
 * Belirli bir dikey (pillar) için silo yönlendirme bağlantılarını döner.
 */
export function buildSiloNavigationLinks(pillar: DomainPillar = 'hybrid', lang: string = 'tr'): BreadcrumbStep[] {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;

  if (pillar === 'site') {
    return [
      { name: 'Site ve Apartman Yönetimi', url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`, pillar: 'site' },
      { name: 'Toplu Konut Yönetimi', url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`, pillar: 'site' },
      { name: 'Rezidans Yönetimi', url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`, pillar: 'site' },
      { name: 'Aidat ve Muhasebe Takibi', url: `${BASE_URL}${langPrefix}/hizmetler/aidat-takibi`, pillar: 'site' },
      { name: 'Online Aidat Hesaplayıcı', url: `${BASE_URL}${langPrefix}/hesaplayici`, pillar: 'site' },
    ];
  }

  if (pillar === 'facility') {
    return [
      { name: 'Entegre Tesis Yönetimi', url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`, pillar: 'facility' },
      { name: 'Plaza & İş Merkezi Yönetimi', url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/plaza-yonetimi`, pillar: 'facility' },
      { name: 'Sanayi Tesisi & OSB Yönetimi', url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`, pillar: 'facility' },
      { name: '5188 Güvenlik Yönetimi', url: `${BASE_URL}${langPrefix}/hizmetler/guvenlik-yonetimi`, pillar: 'facility' },
      { name: 'Periyodik Teknik Bakım', url: `${BASE_URL}${langPrefix}/hizmetler/teknik-bakim`, pillar: 'facility' },
    ];
  }

  return [
    { name: 'Tesis ve Site Yönetimi', url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`, pillar: 'hybrid' },
    { name: 'Tüm Hizmetler', url: `${BASE_URL}${langPrefix}/hizmetler`, pillar: 'hybrid' },
    { name: 'Hizmet Bölgelerimiz', url: `${BASE_URL}${langPrefix}/bolgeler/istanbul`, pillar: 'hybrid' },
    { name: 'Tesis Yönetimi Rehberi', url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rehber`, pillar: 'hybrid' },
  ];
}

/**
 * Google Sitelinks Arama Kutusu Schema.org JSON-LD üretir.
 */
export function buildDualCoreSitelinksSchema(pillar: DomainPillar = 'hybrid'): Record<string, any> {
  const queryParam = pillar === 'site' ? 'site-ara' : pillar === 'facility' ? 'tesis-ara' : 'q';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Alo Yönetim — Profesyonel Site ve Tesis Yönetimi',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/arama?${queryParam}={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Sayfa gezinme çubuğu (SiteNavigationElement) JSON-LD şeması üretir.
 */
export function buildPillarNavigationSchema(pillar: DomainPillar = 'hybrid', lang: string = 'tr'): Record<string, any> {
  const navLinks = buildSiloNavigationLinks(pillar, lang);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${pillar.toUpperCase()} Silo Gezinme Menüsü`,
    itemListElement: navLinks.map((link, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: link.name,
      url: link.url,
    })),
  };
}

/**
 * Belirli bir pillar için tüm temel sayfa tiplerinde Breadcrumb bütünlüğünü doğrular.
 */
export function validateSiloIntegrity(pillar: DomainPillar): { isValid: boolean; checkedPages: number } {
  const serviceOutput = buildDualCoreBreadcrumb({ pageType: 'service', serviceSlug: 'aidat-takibi', pillar });
  const districtOutput = buildDualCoreBreadcrumb({ pageType: 'district', districtSlug: 'kadikoy', pillar });
  const subsectorOutput = buildDualCoreBreadcrumb({ pageType: 'subsector', subsectorSlug: 'plaza-yonetimi', pillar });

  const isValid =
    serviceOutput.trail.length >= 3 &&
    districtOutput.trail.length >= 3 &&
    subsectorOutput.trail.length >= 3;

  return {
    isValid,
    checkedPages: 3,
  };
}
