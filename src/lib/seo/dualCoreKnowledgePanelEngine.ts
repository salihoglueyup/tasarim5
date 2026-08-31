/**
 * Çift Çekirdekli Google Knowledge Panel & Varlık Grafiği Motoru (dualCoreKnowledgePanelEngine.ts)
 * 
 * Alo Yönetim markasını Google Knowledge Graph, Wikidata ve AI varlık ağlarına yerleştiren,
 * Organization, Person, Service, DefinedTerm, E-E-A-T sinyalleri ve kavramsal grafikleri
 * Schema.org JSON-LD olarak üreten otorite motoru.
 * 
 * 500 Faz Master Planı — Bölüm H (Faz 106 - 145)
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';
import { CANONICAL_NAP } from './napGuardEngine';
import { DISTRICTS } from '@/data/districts';

/* =========================================================================
 * H1 — ORGANİZASYON & MARKA VARLIĞI (Faz 106-118)
 * ========================================================================= */

export interface OrganizationEntityOptions {
  legalName?: string;
  brandName?: string;
  foundingDate?: string;
  founderName?: string;
  certifications?: string[];
  socialProfiles?: string[];
  awards?: string[];
  memberOf?: string[];
  knowsAbout?: string[];
}

export interface PersonEntityOptions {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: string;
  hasCredential?: string[];
}

export interface AuthorEntityOptions {
  authorName: string;
  roleTitle: string;
  expertiseArea: string[];
  articlesCount?: number;
  certifications?: string[];
  linkedinUrl?: string;
}

export const CORPORATE_CREDENTIALS = [
  'ISO 41001:2018 Tesis Yönetim Standardı Akreditasyonu',
  'ISO 9001:2015 Kalite Yönetim Sistemi Sertifikası',
  'ISO 14001:2015 Çevre Yönetim Sistemi Sertifikası',
  'ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi',
  '5188 Sayılı Özel Güvenlik Hizmet Faaliyet İzin Belgesi',
  'KMK 634 Lisanslı Profesyonel Tesis & Site Yöneticiliği Belgesi',
];

export const CORPORATE_AWARDS = [
  '2025 Yılı En Güvenilir Site & Tesis Yönetim Şirketi Ödülü (Gayrimenkul Zirvesi)',
  '2024 Müşteri Memnuniyeti & Sıfır Şikayet Mükemmellik Belgesi',
  '2023 Akıllı Bina ve Enerji Verimliliği Yönetim Liderliği',
];

export const CORPORATE_MEMBERSHIPS = [
  'TRFMA (Türkiye Tesis Yönetim Derneği)',
  'TOBB (Türkiye Odalar ve Borsalar Birliği)',
  'İTO (İstanbul Ticaret Odası)',
  'TÜGEM (Tüm Girişimci Emlak Müşavirleri Derneği)',
];

export const CORPORATE_KNOWLEDGE_DOMAINS = [
  '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
  'ISO 41001 Tesis Yönetim Standardı',
  '5188 Sayılı Özel Güvenlik Hizmetleri Kanunu',
  '6331 Sayılı İş Sağlığı ve Güvenliği Kanunu',
  'Profesyonel Site ve Apartman Yönetimi',
  'Plaza, AVM ve Fabrika Entegrasyon Yönetimi',
  'İşletme Projesi ve Aidat Takibi Muhasebesi',
  'BMS (Bina Yönetim Sistemleri) ve CMMS Bakım Otomasyonu',
];

/**
 * Google Knowledge Panel için merkezi Organization Schema.org JSON-LD üretir.
 */
export function buildOrganizationSchema(options?: OrganizationEntityOptions) {
  const brandName = options?.brandName || CANONICAL_NAP.legal.brandName;
  const legalName = options?.legalName || CANONICAL_NAP.legal.legalName;
  const foundingDate = options?.foundingDate || `${CANONICAL_NAP.legal.foundingYear}-01-01`;

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${BASE_URL}/#organization`,
    name: brandName,
    legalName,
    alternateName: [brandName, 'Alo Yönetim Hizmetleri', 'Alo Tesis Yönetimi'],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/logo.png`,
      caption: `${brandName} Logo`,
    },
    image: `${BASE_URL}/images/og-main.jpg`,
    description: 'İstanbul geneli 39 ilçede KMK 634 ve ISO 41001 standartlarında profesyonel site, apartman, rezidans, plaza ve entegre tesis yönetimi hizmetleri.',
    foundingDate,
    founder: {
      '@type': 'Person',
      name: options?.founderName || 'Alo Yönetim Kurucu Heyeti',
      jobTitle: 'Kurucu & Yönetim Kurulu Başkanı',
    },
    taxID: CANONICAL_NAP.legal.taxOffice,
    vatID: CANONICAL_NAP.legal.mersisNumber,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CANONICAL_NAP.address.streetAddress,
      addressLocality: CANONICAL_NAP.address.addressLocality,
      addressRegion: CANONICAL_NAP.address.addressRegion,
      postalCode: CANONICAL_NAP.address.postalCode,
      addressCountry: CANONICAL_NAP.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CANONICAL_NAP.geo.latitude,
      longitude: CANONICAL_NAP.geo.longitude,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CANONICAL_NAP.contact.phoneE164,
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish', 'English'],
        hoursAvailable: 'Mo-Su 00:00-24:00',
      },
      {
        '@type': 'ContactPoint',
        telephone: CANONICAL_NAP.contact.phoneE164,
        contactType: 'sales',
        areaServed: 'TR',
        availableLanguage: ['Turkish', 'English'],
      },
    ],
    sameAs: options?.socialProfiles || [...CANONICAL_NAP.sameAs],
    knowsAbout: options?.knowsAbout || CORPORATE_KNOWLEDGE_DOMAINS,
    hasCredential: (options?.certifications || CORPORATE_CREDENTIALS).map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
    memberOf: (options?.memberOf || CORPORATE_MEMBERSHIPS).map((m) => ({
      '@type': 'Organization',
      name: m,
    })),
    award: options?.awards || CORPORATE_AWARDS,
  };
}

/**
 * Uzman ve Yönetici Profilleri için Person Schema.org JSON-LD üretir.
 */
export function buildPersonSchema(person: PersonEntityOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: CANONICAL_NAP.legal.brandName,
      url: BASE_URL,
    },
    description: person.description,
    image: person.image,
    sameAs: person.sameAs || [],
    knowsAbout: person.knowsAbout || ['Site Yönetimi', 'Tesis Yönetimi', 'KMK 634'],
    hasCredential: person.hasCredential?.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
  };
}

/**
 * Blog yazarı ve teknik yazar için E-E-A-T Author şeması üretir.
 */
export function buildAuthorEntitySchema(author: AuthorEntityOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.authorName,
    jobTitle: author.roleTitle,
    worksFor: {
      '@type': 'Organization',
      name: `${CANONICAL_NAP.legal.brandName} Araştırma & Hukuk Kurulu`,
      url: BASE_URL,
    },
    knowsAbout: author.expertiseArea,
    sameAs: author.linkedinUrl ? [author.linkedinUrl] : [],
    hasCredential: author.certifications?.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert,
    })),
  };
}

/* =========================================================================
 * H2 — PİLLAR VARLIK AĞI & KAVRAMSAL HARİTALAMA (Faz 119-131)
 * ========================================================================= */

/**
 * "Site Yönetimi" veya "Tesis Yönetimi" kavramsal varlık şeması üretir.
 */
export function buildConceptEntitySchema(concept: 'site' | 'facility' | string, pillar: DomainPillar = 'site') {
  const isFacility = concept === 'facility' || pillar === 'facility';
  const name = isFacility ? 'Entegre Tesis Yönetimi (Facility Management)' : 'Profesyonel Site Yönetimi (Property Management)';
  const description = isFacility
    ? 'Ticari binalar, plazalar, AVM ve endüstriyel tesislerin teknik bakım, güvenlik, temizlik ve enerji verimliliği süreçlerinin ISO 41001 standardında entegre yönetilmesidir.'
    : 'Apartman, site ve rezidans gibi çok paydaşlı konut yapılarının 634 sayılı Kat Mülkiyeti Kanunu çerçevesinde idari, hukuki, mali ve teknik süreçlerinin profesyonelce yürütülmesidir.';

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/kavram/${isFacility ? 'tesis-yonetimi' : 'site-yonetimi'}`,
    name,
    description,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Alo Yönetim Gayrimenkul & Tesis Terminolojisi Sözlüğü',
      url: `${BASE_URL}/sozluk`,
    },
  };
}

/**
 * Hizmet Varlık Şeması (Service Entity) üretir.
 */
export function buildServiceEntitySchema(serviceSlug: string, pillar: DomainPillar = 'site') {
  const isFacility = pillar === 'facility';
  const serviceUrl = `${BASE_URL}/${serviceSlug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: isFacility ? 'Kurumsal Entegre Tesis Yönetimi Hizmeti' : 'Profesyonel Site ve Apartman Yönetimi Hizmeti',
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      name: CANONICAL_NAP.legal.brandName,
      url: BASE_URL,
      telephone: CANONICAL_NAP.contact.phoneDisplay,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'İstanbul, Türkiye',
    },
    serviceType: isFacility ? 'Facility Management Services' : 'Property Management Services',
    termsOfService: `${BASE_URL}/kullanim-kosullari`,
  };
}

/**
 * İlçe Coğrafi Varlık Şeması (Place + City) üretir.
 */
export function buildAreaServedEntitySchema(districtSlug: string) {
  const district = DISTRICTS.find((d) => d.slug === districtSlug) || {
    slug: districtSlug,
    name: districtSlug.charAt(0).toUpperCase() + districtSlug.slice(1),
    geo: { lat: 40.9904, lng: 29.0305 },
    population: 400000,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'City',
    '@id': `${BASE_URL}/istanbul/${district.slug}#city`,
    name: `${district.name}, İstanbul`,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'İstanbul',
      containedInPlace: {
        '@type': 'Country',
        name: 'Türkiye',
      },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: district.geo.lat,
      longitude: district.geo.lng,
    },
  };
}

/**
 * Hukuk & İcra Danışmanlığı Hizmeti için LegalService şeması üretir.
 */
export function buildLegalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${BASE_URL}/hizmetler/hukuk-danismanligi#legalservice`,
    name: 'Alo Yönetim — Kat Mülkiyeti Hukuku ve Aidat İcra Danışmanlığı',
    url: `${BASE_URL}/hizmetler/hukuk-danismanligi`,
    telephone: CANONICAL_NAP.contact.phoneDisplay,
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      addressLocality: CANONICAL_NAP.address.addressLocality,
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    description: '634 sayılı KMK uyarınca aidat borçlarının icra takibi, genel kurul iptal davaları savunması ve yönetim planı hukuki revizyonu.',
  };
}

/**
 * Aidat Takibi & Bütçe Yönetimi için FinancialService şeması üretir.
 */
export function buildFinancialServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${BASE_URL}/hizmetler/aidat-takibi#financialservice`,
    name: 'Alo Yönetim — Site İşletme Projesi ve Aidat Takip Muhasebesi',
    url: `${BASE_URL}/hizmetler/aidat-takibi`,
    telephone: CANONICAL_NAP.contact.phoneDisplay,
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      addressLocality: CANONICAL_NAP.address.addressLocality,
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    description: 'KMK Madde 37 uyarınca yıllık işletme projesi, gecikme tazminatı hesaplama ve %99.2 başarıyla online aidat tahsilat muhasebesi.',
  };
}

/**
 * Varlık Grafiği Haritası (Knowledge Graph Map) üretir.
 */
export function buildKnowledgeGraphMap(pillar: DomainPillar = 'site') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildConceptEntitySchema(pillar, pillar),
      buildServiceEntitySchema('tesis-yonetimi', pillar),
      buildLegalServiceSchema(),
      buildFinancialServiceSchema(),
      buildAreaServedEntitySchema('kadikoy'),
      buildAreaServedEntitySchema('sisli'),
    ],
  };
}

/* =========================================================================
 * H3 — E-E-A-T SİNYAL ÜRETİM MOTORU (Faz 132-145)
 * ========================================================================= */

export interface EEATSignalBundle {
  pageType: string;
  pillar: DomainPillar;
  experienceSignals: { label: string; proof: string; metrics?: string }[];
  expertiseSignals: { label: string; certification: string; authorityBody: string }[];
  authoritativenessSignals: { label: string; citationSource: string; url?: string }[];
  trustworthinessSignals: { label: string; verificationMethod: string; policyUrl?: string }[];
  overallScore: number; // 0 - 100
}

/**
 * Sayfa ve dikey için kapsamlı E-E-A-T sinyal paketi üretir.
 */
export function buildEEATSignalBundle(pageType: string, pillar: DomainPillar = 'site'): EEATSignalBundle {
  const isFacility = pillar === 'facility';

  const experienceSignals = isFacility
    ? [
        { label: 'Yönetilen Ticari Alan', proof: '1.200.000+ m² Plaza ve İş Merkezi', metrics: '1.2M m²' },
        { label: 'Enerji Tasarrufu Vaka Çalışması', proof: 'BMS optimizasyonu ile yıllık ortalama %18 elektrik tasarrufu kanıtlandı.', metrics: '%18 Tasarruf' },
        { label: 'SLA Başarı Oranı', proof: 'Arıza müdahale süresi taahhütlerine %99.4 uyum.', metrics: '%99.4 SLA' },
      ]
    : [
        { label: 'Yönetilen Konut & Daire', proof: 'İstanbul genelinde 28.000+ bağımsız bölüm ve 350+ site.', metrics: '28.000+ Daire' },
        { label: 'Aidat Tahsilat Başarısı', proof: 'Düzenli hukuki ve dijital takip ile %99.2 aidat tahsilat oranı.', metrics: '%99.2 Başarı' },
        { label: 'Sektörel Tecrübe', proof: '2009 yılından bu yana 17 yıllık kesintisiz profesyonel yönetim.', metrics: '17 Yıl' },
      ];

  const expertiseSignals = [
    { label: 'Uluslararası Tesis Standardı', certification: 'ISO 41001:2018', authorityBody: 'TÜRKAK / IAS Akredite' },
    { label: 'Yasal Güvenlik Yetkinliği', certification: '5188 Sayılı Kanun Lisansı', authorityBody: 'T.C. İçişleri Bakanlığı EGM' },
    { label: 'Kat Mülkiyeti Hukuk Kadrosu', certification: 'KMK 634 Uzmanlığı', authorityBody: 'Alo Yönetim Hukuk Müşavirliği' },
  ];

  const authoritativenessSignals = [
    { label: 'Resmî Mevzuat Dayanağı', citationSource: '634 Sayılı Kat Mülkiyeti Kanunu (Resmî Gazete)', url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5' },
    { label: 'Sektörel Tesis Standartları', citationSource: 'ISO 41001:2018 Facility Management', url: 'https://www.iso.org/standard/68020.html' },
    { label: 'Mesleki Kuruluş Üyeliği', citationSource: 'TRFMA Türkiye Tesis Yönetim Derneği', url: 'https://www.trfma.org.tr' },
  ];

  const trustworthinessSignals = [
    { label: 'Şeffaf Açık Defter Muhasebe', verificationMethod: 'Her malike 7/24 online banka ve harcama mutabakat paneli.', policyUrl: `${BASE_URL}/seffaflik-politikasi` },
    { label: 'Kişisel Veri Güvenliği (KVKK)', verificationMethod: '6698 sayılı KVKK mevzuatına tam uyumlu veri işleme altyapısı.', policyUrl: `${BASE_URL}/kvkk` },
    { label: 'Tek Kaynaklı NAP Güvencesi', verificationMethod: 'İstanbul Kadıköy fiziki ofis, MERSİS: 0054049823100018 ve sabit santral.', policyUrl: `${BASE_URL}/iletisim` },
  ];

  return {
    pageType,
    pillar,
    experienceSignals,
    expertiseSignals,
    authoritativenessSignals,
    trustworthinessSignals,
    overallScore: 96,
  };
}

/**
 * Sayfanın E-E-A-T uygunluk puanını denetler (0-100).
 */
export function auditEEATScore(page: {
  hasAuthor: boolean;
  hasCredentials: boolean;
  hasCitations: boolean;
  hasNAP: boolean;
  hasCaseStudy: boolean;
  hasHttps: boolean;
}): number {
  let score = 0;
  if (page.hasAuthor) score += 15;
  if (page.hasCredentials) score += 20;
  if (page.hasCitations) score += 15;
  if (page.hasNAP) score += 20;
  if (page.hasCaseStudy) score += 15;
  if (page.hasHttps) score += 15;
  return score;
}

/**
 * Yasal Feragatname (Legal Disclaimer) Schema.org JSON-LD üretir.
 */
export function buildLegalDisclaimerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Alo Yönetim KMK Hukuki Bilgilendirme ve Danışmanlık Beyanı',
    description: 'Sitemizde yer alan kat mülkiyeti, aidat ve yönetim içerikleri 634 sayılı KMK çerçevesinde bilgilendirme amaçlıdır. 1136 sayılı Avukatlık Kanunu uyarınca doğrudan hukuki mütalaa yerine geçmez.',
    publisher: {
      '@type': 'Organization',
      name: CANONICAL_NAP.legal.brandName,
      url: BASE_URL,
    },
  };
}

/**
 * Resmî ve akademik atıf listesini döner.
 */
export function buildCitationList(pillar: DomainPillar = 'site'): { title: string; source: string; url: string }[] {
  const common = [
    {
      title: '634 Sayılı Kat Mülkiyeti Kanunu',
      source: 'T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi',
      url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
    },
    {
      title: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
      source: 'T.C. Resmî Gazete',
      url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5',
    },
  ];

  if (pillar === 'facility') {
    return [
      ...common,
      {
        title: 'ISO 41001:2018 Facility Management Systems',
        source: 'International Organization for Standardization',
        url: 'https://www.iso.org/standard/68020.html',
      },
      {
        title: '6331 Sayılı İş Sağlığı ve Güvenliği Kanunu',
        source: 'T.C. Çalışma ve Sosyal Güvenlik Bakanlığı',
        url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6331&MevzuatTur=1&MevzuatTertip=5',
      },
    ];
  }

  return common;
}
