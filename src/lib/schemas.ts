/**
 * Merkezi JSON-LD şema fabrikası (SEO Master Plan V4 — Bölüm C, Faz 41–70).
 *
 * Tüm yapılandırılmış veri (schema.org) tek bir yerden, tip-güvenli üretici
 * fonksiyonlarla üretilir. Sayfalarda inline literal JSON-LD bırakılmaz;
 * `<JsonLd data={...} />` bileşeni ile render edilir (src/components/seo/JsonLd).
 *
 * @id grafiği: Organization ve WebSite node'ları sabit @id'lerle tanımlanır;
 * diğer node'lar (WebPage, Service, LocalBusiness...) bunlara `isPartOf` /
 * `provider` / `publisher` üzerinden bağlanır.
 */

import { BASE_URL } from '@/lib/seo';

/** Genel JSON-LD nesne tipi. */
export type JsonLdObject = Record<string, unknown>;

// ---------------------------------------------------------------------------
// Sabit @id'ler (varlık grafiği düğümleri)
// ---------------------------------------------------------------------------
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const LOCALBUSINESS_ID = `${BASE_URL}/#localbusiness`;
export const LOGO_ID = `${BASE_URL}/#logo`;

// ---------------------------------------------------------------------------
// Kurumsal sabitler (NAP — Name/Address/Phone tek kaynak)
// ---------------------------------------------------------------------------
export const ORG_NAME = 'Alo Yönetim';
export const ORG_LEGAL_NAME = 'Alo Yönetim Tesis Yönetimi A.Ş.';
export const ORG_LOGO = `${BASE_URL}/icon.png`;
export const ORG_PHONE = '+902165504848';
export const ORG_EMAIL = 'istanbul@aloyonetim.com';
export const ORG_FOUNDING_DATE = '2015';
export const ORG_PRICE_RANGE = '₺₺';

/** Postal adres (Kadıköy merkez ofis). */
export const ORG_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Eğitim Mahallesi, Kasap İsmail Sk. No: 15 / 19',
  addressLocality: 'Kadıköy',
  addressRegion: 'İstanbul',
  postalCode: '34722',
  addressCountry: 'TR',
} as const;

/** Coğrafi konum (merkez ofis). */
export const ORG_GEO = {
  '@type': 'GeoCoordinates',
  latitude: 40.99,
  longitude: 29.03,
} as const;

/** Doğrulanmış sosyal + kurumsal profiller (Faz 60 — sameAs). */
export const ORG_SAME_AS = [
  'https://twitter.com/aloyonetim',
  'https://www.linkedin.com/company/aloyonetim',
  'https://www.instagram.com/aloyonetim',
  'https://www.facebook.com/aloyonetim',
  'https://www.youtube.com/@aloyonetim',
];

/** Topikal otorite sinyali (Faz 67 — knowsAbout). */
export const ORG_KNOWS_ABOUT = [
  'Tesis yönetimi',
  'Site yönetimi',
  'Apartman yönetimi',
  'Kat Mülkiyeti Kanunu',
  '5188 sayılı Özel Güvenlik Kanunu',
  'Bina güvenliği',
  'Profesyonel temizlik ve hijyen',
  'Teknik bakım ve işletme',
  'Aidat tahsilatı ve icra takibi',
  'Peyzaj ve bahçe bakımı',
];

/**
 * Hizmet verilen coğrafya (Faz 63 — GeoCircle). İstanbul merkezli ~40 km yarıçap.
 * Bölüm E'deki yerel (ilçe) sayfalarıyla paylaşılabilir.
 */
export const AREA_SERVED_GEOCIRCLE = {
  '@type': 'GeoCircle',
  geoMidpoint: { '@type': 'GeoCoordinates', latitude: 41.0082, longitude: 28.9784 },
  geoRadius: '40000',
} as const;

/** Departman bazlı iletişim noktaları (Faz 61 — ContactPoint). */
export const ORG_CONTACT_POINTS = [
  {
    '@type': 'ContactPoint',
    telephone: ORG_PHONE,
    contactType: 'customer service',
    areaServed: 'TR',
    availableLanguage: ['Turkish', 'English'],
  },
  {
    '@type': 'ContactPoint',
    telephone: ORG_PHONE,
    contactType: 'sales',
    areaServed: 'TR',
    availableLanguage: ['Turkish'],
  },
  {
    '@type': 'ContactPoint',
    telephone: ORG_PHONE,
    contactType: 'emergency',
    areaServed: 'TR',
    availableLanguage: ['Turkish'],
  },
];

const abs = (path: string) => (path.startsWith('http') ? path : `${BASE_URL}${path}`);

// ---------------------------------------------------------------------------
// Faz 42 — Organization (tam alan)
// ---------------------------------------------------------------------------
export function organizationSchema(): JsonLdObject {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: ORG_LOGO,
      caption: ORG_NAME,
    },
    image: { '@id': LOGO_ID },
    foundingDate: ORG_FOUNDING_DATE,
    slogan: 'Profesyonel Mülk ve Tesis Yönetimi',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: '500+' },
    address: ORG_ADDRESS,
    areaServed: { '@type': 'City', name: 'İstanbul' },
    sameAs: ORG_SAME_AS,
    knowsAbout: ORG_KNOWS_ABOUT,
    contactPoint: ORG_CONTACT_POINTS,
  };
}

// ---------------------------------------------------------------------------
// Faz 58 — WebSite + SearchAction
// ---------------------------------------------------------------------------
export function webSiteSchema(): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: ORG_NAME,
    url: BASE_URL,
    publisher: { '@id': ORG_ID },
    inLanguage: 'tr-TR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ---------------------------------------------------------------------------
// Faz 43 — ProfessionalService / LocalBusiness
// ---------------------------------------------------------------------------
export type RatingInput = { ratingValue: string; reviewCount: string };

export function professionalServiceSchema(opts?: {
  description?: string;
  aggregateRating?: RatingInput;
}): JsonLdObject {
  return {
    '@type': 'ProfessionalService',
    '@id': LOCALBUSINESS_ID,
    name: ORG_NAME,
    image: ORG_LOGO,
    url: BASE_URL,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    priceRange: ORG_PRICE_RANGE,
    ...(opts?.description ? { description: opts.description } : {}),
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    hasMap: 'https://www.google.com/maps?q=Alo+Yönetim+Kadıköy',
    areaServed: AREA_SERVED_GEOCIRCLE,
    parentOrganization: { '@id': ORG_ID },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    ...(opts?.aggregateRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: opts.aggregateRating.ratingValue,
            reviewCount: opts.aggregateRating.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// Faz 44/45 — Service + hasOfferCatalog + Offer
// ---------------------------------------------------------------------------
export type OfferItem = { name: string; description?: string };

export function serviceSchema(opts: {
  serviceType: string;
  path: string;
  description?: string;
  offerCatalogName?: string;
  offers?: OfferItem[];
}): JsonLdObject {
  return {
    '@type': 'Service',
    serviceType: opts.serviceType,
    name: opts.serviceType,
    url: abs(opts.path),
    ...(opts.description ? { description: opts.description } : {}),
    provider: { '@id': LOCALBUSINESS_ID },
    areaServed: { '@type': 'State', name: 'İstanbul' },
    ...(opts.offers && opts.offers.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: opts.offerCatalogName ?? `${opts.serviceType} Hizmetleri`,
            itemListElement: opts.offers.map((o) => ({
              '@type': 'Offer',
              priceCurrency: 'TRY',
              availability: 'https://schema.org/InStock',
              itemOffered: {
                '@type': 'Service',
                name: o.name,
                ...(o.description ? { description: o.description } : {}),
              },
            })),
          },
        }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// Faz 48 — FAQPage
// ---------------------------------------------------------------------------
export function faqPageSchema(items: { question: string; answer: string }[]): JsonLdObject {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}

// ---------------------------------------------------------------------------
// Faz 49 — HowTo
// ---------------------------------------------------------------------------
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): JsonLdObject {
  return {
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// ---------------------------------------------------------------------------
// Faz 46/47 — AggregateRating + Review
// ---------------------------------------------------------------------------
export type ReviewInput = {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
};

export function reviewsWithRating(opts: {
  reviews: ReviewInput[];
  ratingValue: string;
}): JsonLdObject {
  return {
    '@type': 'LocalBusiness',
    '@id': LOCALBUSINESS_ID,
    name: ORG_NAME,
    image: ORG_LOGO,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: opts.ratingValue,
      reviewCount: opts.reviews.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: opts.reviews.map((r) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.reviewBody,
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    })),
  };
}

// ---------------------------------------------------------------------------
// Faz 50/51 — Course + Event (Güvenlik Akademisi)
// ---------------------------------------------------------------------------
export function courseSchema(opts: {
  name: string;
  description: string;
  path: string;
}): JsonLdObject {
  return {
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: {
      '@type': 'EducationalOrganization',
      name: `${ORG_NAME} Güvenlik Akademisi`,
      sameAs: BASE_URL,
    },
  };
}

export function eventSchema(opts: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
}): JsonLdObject {
  return {
    '@type': 'Event',
    name: opts.name,
    description: opts.description,
    startDate: opts.startDate,
    ...(opts.endDate ? { endDate: opts.endDate } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: `${ORG_NAME} Güvenlik Akademisi`,
      address: ORG_ADDRESS,
    },
    organizer: { '@id': ORG_ID },
  };
}

// ---------------------------------------------------------------------------
// Faz 52 — JobPosting (İstihdam Köprüsü)
// ---------------------------------------------------------------------------
export function jobPostingSchema(opts: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType?: string;
}): JsonLdObject {
  return {
    '@type': 'JobPosting',
    title: opts.title,
    description: opts.description,
    datePosted: opts.datePosted,
    validThrough: opts.validThrough,
    employmentType: opts.employmentType ?? 'FULL_TIME',
    hiringOrganization: { '@id': ORG_ID },
    jobLocation: {
      '@type': 'Place',
      address: ORG_ADDRESS,
    },
    applicantLocationRequirements: { '@type': 'Country', name: 'TR' },
  };
}

// ---------------------------------------------------------------------------
// Faz 53 — Person (yönetim/ekip)
// ---------------------------------------------------------------------------
export function personSchema(opts: {
  name: string;
  jobTitle: string;
  image?: string;
  sameAs?: string[];
}): JsonLdObject {
  return {
    '@type': 'Person',
    name: opts.name,
    jobTitle: opts.jobTitle,
    worksFor: { '@id': ORG_ID },
    ...(opts.image ? { image: abs(opts.image) } : {}),
    ...(opts.sameAs && opts.sameAs.length ? { sameAs: opts.sameAs } : {}),
  };
}

// ---------------------------------------------------------------------------
// Faz 54 — VideoObject
// ---------------------------------------------------------------------------
export function videoObjectSchema(opts: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  duration?: string;
}): JsonLdObject {
  return {
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl: abs(opts.thumbnailUrl),
    contentUrl: abs(opts.contentUrl),
    uploadDate: opts.uploadDate,
    ...(opts.duration ? { duration: opts.duration } : {}),
    publisher: { '@id': ORG_ID },
  };
}

// ---------------------------------------------------------------------------
// Faz 56 — BlogPosting / Article
// ---------------------------------------------------------------------------
export function blogPostingSchema(opts: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  /** E-E-A-T için zengin yazar bilgisi (Faz 94/159). */
  author?: { name: string; jobTitle?: string; url?: string };
  section?: string;
  keywords?: string[];
}): JsonLdObject {
  const url = abs(opts.path);
  const author = opts.author
    ? {
        '@type': 'Person',
        name: opts.author.name,
        ...(opts.author.jobTitle ? { jobTitle: opts.author.jobTitle } : {}),
        ...(opts.author.url ? { url: abs(opts.author.url) } : {}),
      }
    : { '@type': 'Person', name: opts.authorName ?? `${ORG_NAME} Editör Ekibi` };
  return {
    '@type': 'BlogPosting',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    ...(opts.image ? { image: abs(opts.image) } : {}),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    ...(opts.section ? { articleSection: opts.section } : {}),
    ...(opts.keywords && opts.keywords.length ? { keywords: opts.keywords.join(', ') } : {}),
    author,
    publisher: { '@id': ORG_ID },
  };
}

// ---------------------------------------------------------------------------
// Faz 57/59 — WebPage (+ speakable) her sayfa tipi için
// ---------------------------------------------------------------------------
export type WebPageType =
  | 'WebPage'
  | 'ContactPage'
  | 'AboutPage'
  | 'CollectionPage'
  | 'FAQPage';

export function webPageSchema(opts: {
  type?: WebPageType;
  name: string;
  description?: string;
  path: string;
  speakableSelectors?: string[];
}): JsonLdObject {
  const url = abs(opts.path);
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'tr-TR',
    ...(opts.speakableSelectors && opts.speakableSelectors.length
      ? {
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: opts.speakableSelectors,
          },
        }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// Faz 108/109 — Yerel LocalBusiness (ilçe-özel geo + areaServed)
// ---------------------------------------------------------------------------
export function localBusinessAreaSchema(opts: {
  areaName: string;
  geo: { lat: number; lng: number };
  description?: string;
  url: string;
}): JsonLdObject {
  return {
    '@type': 'ProfessionalService',
    name: `${ORG_NAME} — ${opts.areaName}`,
    image: ORG_LOGO,
    url: abs(opts.url),
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    priceRange: ORG_PRICE_RANGE,
    ...(opts.description ? { description: opts.description } : {}),
    address: ORG_ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: opts.geo.lat,
      longitude: opts.geo.lng,
    },
    areaServed: { '@type': 'AdministrativeArea', name: `${opts.areaName}, İstanbul` },
    parentOrganization: { '@id': ORG_ID },
  };
}

/** Yerel Service node'u (ilçe hedefli) — Faz 108. */
export function localServiceSchema(opts: {
  serviceType: string;
  areaName: string;
  path: string;
  description?: string;
}): JsonLdObject {
  return {
    '@type': 'Service',
    serviceType: opts.serviceType,
    name: `${opts.serviceType} — ${opts.areaName}`,
    url: abs(opts.path),
    ...(opts.description ? { description: opts.description } : {}),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'AdministrativeArea', name: `${opts.areaName}, İstanbul` },
  };
}

// ---------------------------------------------------------------------------
// Faz 84 — DefinedTermSet (Sözlük)
// ---------------------------------------------------------------------------
export function definedTermSetSchema(opts: {
  name: string;
  description: string;
  path: string;
  terms: { term: string; definition: string }[];
}): JsonLdObject {
  const url = abs(opts.path);
  return {
    '@type': 'DefinedTermSet',
    '@id': `${url}#glossary`,
    name: opts.name,
    description: opts.description,
    url,
    hasDefinedTerm: opts.terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `${url}#glossary`,
    })),
  };
}

// ---------------------------------------------------------------------------
// Faz 41 (uyum) — Breadcrumb (mevcut API korunur)
// ---------------------------------------------------------------------------
export const generateBreadcrumbs = (items: { name: string; url: string }[]): JsonLdObject => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: abs(item.url),
  })),
});

/**
 * Birden fazla node'u tek bir `@graph` altında paketler (Faz 34/57 — @id grafiği).
 * `@context` yalnız bir kez, en üstte yer alır.
 */
export function graph(...nodes: JsonLdObject[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
