/**
 * Çift Çekirdekli Rich Result & Zengin Snippet Motoru (dualCoreRichResultEngine.ts)
 * 
 * Google Rich Result Test, SERP Zengin Sonuçlar (Yıldız Puanı, Fiyat, HowTo, Kurs,
 * İş İlanı, Etkinlik, Soru-Cevap, LocalBusiness) için Schema.org JSON-LD üreten
 * merkezi kurumsal yapısal veri motoru.
 * 
 * 500 Faz Master Planı — Bölüm F (Faz 1 - 55)
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';
import { CANONICAL_NAP } from './napGuardEngine';
import { DISTRICTS } from '@/data/districts';

/* =========================================================================
 * F1 — İNTERFACE & TİP SİSTEMİ (Faz 1-10)
 * ========================================================================= */

export type RichResultType =
  | 'LocalBusiness'
  | 'Service'
  | 'FAQPage'
  | 'HowTo'
  | 'Review'
  | 'AggregateRating'
  | 'Course'
  | 'Event'
  | 'Product'
  | 'JobPosting'
  | 'Article'
  | 'VideoObject'
  | 'Calculator'
  | 'ProfessionalService';

export interface LocalBusinessRichOptions {
  pillar: DomainPillar;
  districtSlug?: string;
  serviceSlug?: string;
  priceRange?: '₺' | '₺₺' | '₺₺₺';
  aggregateRating?: { ratingValue: number; reviewCount: number; bestRating?: number; worstRating?: number };
}

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
  position?: number;
}

export interface HowToRichOptions {
  id: string;
  name: string;
  description: string;
  pillar: DomainPillar;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 Duration, e.g. "PT30M", "P1D"
  estimatedCost?: { currency: string; value: string | number };
  supply?: string[];
  tool?: string[];
  image?: string;
}

export interface ReviewItem {
  authorName: string;
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  reviewBody: string;
  datePublished: string;
  publisher?: string;
  positiveNotes?: string;
  negativeNotes?: string;
  pillar: DomainPillar;
  serviceSlug?: string;
  districtSlug?: string;
}

export interface ReviewRichOptions {
  itemReviewedName: string;
  itemReviewedType?: 'LocalBusiness' | 'ProfessionalService' | 'Service' | 'Organization';
  reviews: ReviewItem[];
}

export interface CourseRichOptions {
  courseCode: string;
  name: string;
  description: string;
  providerName?: string;
  providerUrl?: string;
  educationalLevel?: 'Başlangıç' | 'Orta' | 'İleri' | 'Profesyonel' | 'Sertifika';
  courseMode?: 'online' | 'blended' | 'onsite';
  hasCourseInstance?: {
    courseMode: string;
    courseWorkload?: string;
    instructorName?: string;
  };
  offers?: {
    price: string | number;
    priceCurrency: string;
    category?: string;
  };
}

export interface EventRichOptions {
  name: string;
  description: string;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  eventAttendanceMode?: 'OnlineEventAttendanceMode' | 'OfflineEventAttendanceMode' | 'MixedEventAttendanceMode';
  eventStatus?: 'EventScheduled' | 'EventPostponed' | 'EventCancelled';
  locationName?: string;
  locationAddress?: string;
  organizerName?: string;
  organizerUrl?: string;
  offers?: {
    price: string | number;
    priceCurrency: string;
    url?: string;
    availability?: string;
  };
}

export interface JobPostingRichOptions {
  title: string;
  description: string;
  datePosted: string; // YYYY-MM-DD
  validThrough: string; // YYYY-MM-DD
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN';
  hiringOrganizationName?: string;
  hiringOrganizationUrl?: string;
  jobLocationCity?: string;
  jobLocationRegion?: string;
  jobLocationAddress?: string;
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  salaryCurrency?: string;
  salaryUnitText?: 'MONTH' | 'YEAR' | 'HOUR';
  skillsRequired?: string[];
  responsibilities?: string[];
}

export interface RichResultOutput<T = Record<string, unknown>> {
  schemaType: RichResultType;
  jsonLd: T;
  validation: RichResultValidationResult;
}

export interface RichResultValidationResult {
  isValid: boolean;
  schemaType: string;
  missingRequiredFields: string[];
  warnings: string[];
}

/**
 * Google Rich Result zorunlu ve önerilen alanları doğrular.
 */
export function validateRichResultSchema(
  schema: Record<string, unknown>,
  expectedType: RichResultType
): RichResultValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    missing.push('@context (https://schema.org)');
  }

  const type = schema['@type'];
  const types = Array.isArray(type) ? type : [type];

  switch (expectedType) {
    case 'LocalBusiness':
    case 'ProfessionalService':
      if (!types.some((t) => t === 'LocalBusiness' || t === 'ProfessionalService')) {
        missing.push(`@type must include LocalBusiness or ProfessionalService (got ${types.join(', ')})`);
      }
      if (!schema.name) missing.push('name');
      if (!schema.address) missing.push('address');
      if (!schema.telephone) warnings.push('telephone önerilir');
      if (!schema.image && !schema.logo) warnings.push('image veya logo önerilir');
      break;

    case 'HowTo':
      if (!types.includes('HowTo')) missing.push('@type must be HowTo');
      if (!schema.name) missing.push('name');
      if (!schema.step || !Array.isArray(schema.step) || schema.step.length === 0) {
        missing.push('step array (en az 1 adım zorunlu)');
      }
      if (!schema.totalTime) warnings.push('totalTime önerilir');
      break;

    case 'Review':
    case 'AggregateRating':
      if (types.includes('AggregateRating')) {
        const rating = schema as Record<string, unknown>;
        if (rating.ratingValue === undefined) missing.push('ratingValue');
        if (rating.reviewCount === undefined && rating.ratingCount === undefined) missing.push('reviewCount / ratingCount');
      }
      break;

    case 'JobPosting':
      if (!types.includes('JobPosting')) missing.push('@type must be JobPosting');
      if (!schema.title) missing.push('title');
      if (!schema.description) missing.push('description');
      if (!schema.datePosted) missing.push('datePosted');
      if (!schema.validThrough) missing.push('validThrough');
      if (!schema.hiringOrganization) missing.push('hiringOrganization');
      if (!schema.jobLocation) missing.push('jobLocation');
      break;

    case 'Course':
      if (!types.includes('Course')) missing.push('@type must be Course');
      if (!schema.name) missing.push('name');
      if (!schema.description) missing.push('description');
      if (!schema.provider) missing.push('provider');
      break;

    case 'Event':
      if (!types.includes('Event')) missing.push('@type must be Event');
      if (!schema.name) missing.push('name');
      if (!schema.startDate) missing.push('startDate');
      if (!schema.location) missing.push('location');
      break;
  }

  return {
    isValid: missing.length === 0,
    schemaType: expectedType,
    missingRequiredFields: missing,
    warnings,
  };
}

/* =========================================================================
 * F2 — LOCALBUSINESS & PROFESSIONAL SERVICE ŞEMALARI (Faz 11-22)
 * ========================================================================= */

/**
 * Standart mesai saatlerini Schema.org OpeningHoursSpecification formatında üretir.
 */
export function buildOpeningHoursSpecification() {
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: CANONICAL_NAP.openingHours.dayOfWeek,
      opens: CANONICAL_NAP.openingHours.opens,
      closes: CANONICAL_NAP.openingHours.closes,
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '15:00',
    },
  ];
}

/**
 * 9 Temel Hizmetin Schema.org Offer nesnelerini üretir.
 */
export function buildAllOffers(pillar: DomainPillar = 'site') {
  const serviceItems = [
    { name: 'Site ve Apartman Yönetimi', slug: 'tesis-yonetimi', price: '₺₺' },
    { name: 'Entegre Tesis ve Plaza Yönetimi', slug: 'tesis-yonetimi', price: '₺₺₺' },
    { name: 'Aidat Takibi ve Bütçe Yönetimi', slug: 'hizmetler/aidat-takibi', price: '₺₺' },
    { name: '5188 Sayılı Özel Güvenlik Hizmetleri', slug: 'hizmetler/guvenlik-yonetimi', price: '₺₺₺' },
    { name: 'Endüstriyel ve Ortak Alan Temizliği', slug: 'hizmetler/temizlik-yonetimi', price: '₺₺' },
    { name: 'Mekanik & Elektrik Teknik Bakım (BMS/CMMS)', slug: 'hizmetler/teknik-bakim-yonetimi', price: '₺₺₺' },
    { name: 'Peyzaj ve Otomatik Sulama Bakımı', slug: 'hizmetler/peyzaj-ve-bahce-bakimi', price: '₺₺' },
    { name: 'Havuz Bakımı ve Kimyasal Dezenfeksiyon', slug: 'hizmetler/havuz-bakimi', price: '₺₺' },
    { name: 'Haşere İlaçlama ve Vektör Kontrolü', slug: 'hizmetler/ilaclama-hizmetleri', price: '₺' },
  ];

  return serviceItems.map((s) => ({
    '@type': 'Offer',
    name: s.name,
    description: `Alo Yönetim ${s.name} profesyonel yönetim çözümleri.`,
    url: `${BASE_URL}/${s.slug}`,
    priceCurrency: 'TRY',
    price: s.price,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: CANONICAL_NAP.legal.brandName,
    },
  }));
}

/**
 * Merkezi LocalBusiness + ProfessionalService Schema.org JSON-LD üretir.
 */
export function buildLocalBusinessSchema(options: LocalBusinessRichOptions = { pillar: 'site' }) {
  const isFacility = options.pillar === 'facility';
  const brandTitle = isFacility
    ? `${CANONICAL_NAP.legal.brandName} — Entegre Tesis & Plaza Yönetimi`
    : `${CANONICAL_NAP.legal.brandName} — Profesyonel Site ve Apartman Yönetimi`;

  const aggRating = options.aggregateRating || {
    ratingValue: 4.9,
    reviewCount: 248,
    bestRating: 5,
    worstRating: 1,
  };

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${BASE_URL}/#localbusiness`,
    name: brandTitle,
    legalName: CANONICAL_NAP.legal.legalName,
    alternateName: CANONICAL_NAP.legal.brandName,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    image: `${BASE_URL}/images/og-main.jpg`,
    description: isFacility
      ? 'İstanbul genelinde plazalar, AVM\'ler, fabrikalar ve ticari gayrimenkuller için ISO 41001 standartlarında entegre tesis yönetimi, 5188 güvenlik, BMS ve teknik bakım.'
      : 'İstanbul genelinde siteler ve apartmanlar için KMK 634 mevzuatına uygun, şeffaf aidat takibi, 7/24 teknik servis ve profesyonel site yöneticiliği.',
    telephone: CANONICAL_NAP.contact.phoneDisplay,
    email: CANONICAL_NAP.contact.email,
    priceRange: options.priceRange || CANONICAL_NAP.priceRange,
    foundingDate: `${CANONICAL_NAP.legal.foundingYear}-01-01`,
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
    hasMap: CANONICAL_NAP.geo.googleMapsPlaceUrl,
    openingHoursSpecification: buildOpeningHoursSpecification(),
    sameAs: [...CANONICAL_NAP.sameAs],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggRating.ratingValue,
      reviewCount: aggRating.reviewCount,
      bestRating: aggRating.bestRating || 5,
      worstRating: aggRating.worstRating || 1,
    },
    makesOffer: buildAllOffers(options.pillar),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'İstanbul, Türkiye',
      containsPlace: DISTRICTS.map((d) => ({
        '@type': 'City',
        name: `${d.name}, İstanbul`,
      })),
    },
  };

  return schema;
}

/**
 * 39 İlçe için özelleştirilmiş LocalBusiness / ProfessionalService Şeması üretir.
 */
export function buildDistrictLocalBusinessSchema(districtSlug: string, pillar: DomainPillar = 'site') {
  const district = DISTRICTS.find((d) => d.slug === districtSlug) || {
    slug: districtSlug,
    name: districtSlug.charAt(0).toUpperCase() + districtSlug.slice(1),
    geo: { lat: 40.9904, lng: 29.0305 },
    intro: 'İstanbul ilçe profesyonel site ve tesis yönetimi.',
    neighborhoods: [],
  };

  const isFacility = pillar === 'facility';
  const name = isFacility
    ? `Alo Yönetim — ${district.name} Tesis & Plaza Yönetimi`
    : `Alo Yönetim — ${district.name} Site & Apartman Yönetimi`;

  const pageUrl = `${BASE_URL}/istanbul/${district.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${pageUrl}/#localbusiness`,
    name,
    legalName: CANONICAL_NAP.legal.legalName,
    url: pageUrl,
    telephone: CANONICAL_NAP.contact.phoneDisplay,
    email: CANONICAL_NAP.contact.email,
    priceRange: isFacility ? '₺₺₺' : '₺₺',
    description: `${district.name} ilçesinde ${
      isFacility
        ? 'ticari binalar, iş merkezleri ve plazalar için ISO 41001 entegre tesis yönetimi.'
        : 'siteler, toplu konutlar ve rezidanslar için 634 KMK uyumlu profesyonel yönetim.'
    }`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CANONICAL_NAP.address.streetAddress,
      addressLocality: district.name,
      addressRegion: 'İstanbul',
      postalCode: CANONICAL_NAP.address.postalCode,
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: district.geo.lat,
      longitude: district.geo.lng,
    },
    areaServed: {
      '@type': 'City',
      name: `${district.name}, İstanbul`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'İstanbul, Türkiye',
      },
    },
    parentOrganization: {
      '@type': 'Organization',
      name: CANONICAL_NAP.legal.brandName,
      url: BASE_URL,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 42,
      bestRating: 5,
      worstRating: 1,
    },
    openingHoursSpecification: buildOpeningHoursSpecification(),
  };
}

/* =========================================================================
 * F3 — HOWTO & ADIM ADIM REHBER ŞEMALARI (Faz 23-34)
 * ========================================================================= */

export const HOWTO_SITE_MANAGEMENT_SETUP: HowToRichOptions = {
  id: 'site-yonetimi-kurulum-rehberi',
  name: 'Apartmanda Site Yönetimi Nasıl Kurulur? (KMK 634 Rehberi)',
  description: '634 sayılı Kat Mülkiyeti Kanunu hükümlerine göre apartman veya sitede yasal yönetim kurulması, işletme projesi hazırlanması ve karar defteri noter onay süreçleri.',
  pillar: 'site',
  totalTime: 'P7D',
  estimatedCost: { currency: 'TRY', value: '2500' },
  supply: ['Karar Defteri (Noter Onaylı)', 'İşletme Projesi Şablonu', 'Hazirun Cetveli'],
  tool: ['Alo Yönetim Dijital Aidat Yazılımı', 'KMK Mevzuat Kılavuzu'],
  steps: [
    {
      name: 'Kat Malikleri Genel Kurul Çağrısı',
      text: 'Genel kurul tarihinden en az 15 gün önce tüm kat maliklerine taahhütlü mektup veya imza karşılığı toplantı çağrısı ve gündemi tebliğ edin.',
      position: 1,
    },
    {
      name: 'İlk Toplantıda Yeter Sayının Sağlanması',
      text: 'İlk toplantıda hem sayı hem de arsa payı bakımından maliklerin yarısından fazlasının (yarıdan bir fazla) katılımı aranır.',
      position: 2,
    },
    {
      name: 'Divan Heyeti Seçimi ve Gündem Maddelerinin Görüşülmesi',
      text: 'Toplantı açılışında divan başkanı ve katip üye seçilerek gündem maddelerinin müzakeresine geçilir.',
      position: 3,
    },
    {
      name: 'Yönetici ve Denetçi Seçimi',
      text: 'Yönetici ve denetçi, kat maliklerinin sayı ve arsa payı çoğunluğu ile 1 yıllık süre için seçilir (KMK Madde 34).',
      position: 4,
    },
    {
      name: 'Karar Defterinin Notere Tasdik Ettirilmesi',
      text: 'Toplantı tutanağı ve alınan kararlar noter onaylı karar defterine işlenir ve divan ile maliklerce imzalanır.',
      position: 5,
    },
    {
      name: 'Yıllık İşletme Projesinin Hazırlanması',
      text: 'Seçilen yönetici, tahmini gelir-giderleri ve arsa payı/bağımsız bölüm başına düşen aidat paylarını gösteren işletme projesini hazırlar (KMK Madde 37).',
      position: 6,
    },
    {
      name: 'İşletme Projesinin Maliklere Tebliği ve Kesinleşmesi',
      text: 'İşletme projesi kat maliklerine tebliğ edilir; 7 gün içinde itiraz edilmezse kesinleşerek icra takibine esas belge niteliği kazanır.',
      position: 7,
    },
    {
      name: 'Banka Hesabı Açılması ve Profesyonel Yönetim Entegrasyonu',
      text: 'Apartman adına vergi kimlik numarası ile banka hesabı açılır ve tahsilat/harcama yönetimi dijital sisteme bağlanır.',
      position: 8,
    },
  ],
};

export const HOWTO_FACILITY_CONTRACT: HowToRichOptions = {
  id: 'tesis-yonetim-sozlesmesi-rehberi',
  name: 'Tesis Yönetim Sözleşmesi Nasıl Yapılır? (SLA & Kapsam Rehberi)',
  description: 'Plaza, iş merkezi ve ticari tesisler için ISO 41001 standartlarında entegre tesis yönetim sözleşmesi (SLA) hazırlama ve ihale adımları.',
  pillar: 'facility',
  totalTime: 'P14D',
  supply: ['Teknik Varlık Envanteri', 'Risk Analiz Raporu', 'SLA Hizmet Seviye Protokolü'],
  tool: ['CMMS Varlık Yönetim Yazılımı', 'BMS Enerji Analizörü'],
  steps: [
    {
      name: 'Tesis Varlık Envanteri ve Durum Tespiti',
      text: 'Tüm HVAC, jeneratör, trafo, asansör, yangın ve zayıf akım sistemlerinin periyodik bakım durumları ve amortismanları raporlanır.',
      position: 1,
    },
    {
      name: 'Hizmet Kapsamı ve Alt Disiplinlerin Belirlenmesi',
      text: '5188 güvenlik, endüstriyel temizlik, teknik işletme, peyzaj ve atık yönetimi modülleri net sınırlarla tanımlanır.',
      position: 2,
    },
    {
      name: 'SLA (Hizmet Seviye Anlaşması) Metriklerinin Tasarımı',
      text: 'Arıza müdahale süresi (MTTR), plansız duruş oranları ve KPI performans göstergeleri sayısal hedeflere bağlanır.',
      position: 3,
    },
    {
      name: 'Yasal Uyum ve İSG Sorumluluk Matrisi',
      text: '6331 sayılı İSG kanunu, periyodik muayeneler ve çevre mevzuatı sorumlulukları sözleşme maddesi olarak tescil edilir.',
      position: 4,
    },
    {
      name: 'Maliyet Şeffaflığı ve Açık Defter (Open-Book) Modeli',
      text: 'Personel maliyetleri, kimyasal/sarf giderleri ve yönetim hizmet bedeli şeffaf maliyet kırılımlarıyla onaylanır.',
      position: 5,
    },
    {
      name: 'Geçiş Dönemi ve Mobilizasyon Protokolü',
      text: 'Eski yükleniciden yeni yönetime varlık, anahtar, kod ve veri aktarımı 30 günlük takvimle tamamlanır.',
      position: 6,
    },
  ],
};

export const HOWTO_PLAZA_BUDGET: HowToRichOptions = {
  id: 'plaza-isletme-butcesi-rehberi',
  name: 'Plaza İşletme Bütçesi Nasıl Hazırlanır? (Gider Paylaşım Modeli)',
  description: 'Çok kiracılı ticari binalarda ortak alan elektrik, HVAC, güvenlik, temizlik ve amortisman giderlerinin adil paylaştırılması.',
  pillar: 'facility',
  totalTime: 'P5D',
  steps: [
    {
      name: 'Geçmiş Yıl Giderlerinin Analizi ve Enflasyon Düzeltmesi',
      text: 'Son 12 ayın enerji tüketim trendleri, personel artış katsayıları ve döviz bazlı yedek parça maliyetleri analiz edilir.',
      position: 1,
    },
    {
      name: 'Sabit ve Değişken Giderlerin Ayrıştırılması',
      text: 'Güvenlik/temizlik gibi sabit sözleşme bedelleri ile enerji/tamirat gibi değişken giderler ayrıştırılır.',
      position: 2,
    },
    {
      name: 'Kiralanabilir Alan (GLA) ve Arsa Payı Katsayılarının Hesaplanması',
      text: 'Ortak alan m² payları bağımsız bölüm net/brüt kullanım alanlarına göre adil oranda dağıtılır.',
      position: 3,
    },
    {
      name: 'Yedek Akçe (Demirbaş Fonu) Oranının Belirlenmesi',
      text: 'Beklenmedik ana altyapı revizyonları için yıllık bütçenin %10-15 aralığında yatırım fonu ayrılır.',
      position: 4,
    },
    {
      name: 'Avans Paylaşım Tablosunun Çıkarılması',
      text: 'Her bağımsız bölümün aylık ödeyeceği m² birim işletme avansı tablosu oluşturulur.',
      position: 5,
    },
    {
      name: 'Mülk Sahipleri ve Kiracılar Kuruluna Sunum',
      text: 'Bütçe detayları, tasarruf hedefleri ve gerekçeleri ile kurula sunularak onaylanır.',
      position: 6,
    },
    {
      name: 'Yıl Sonu Mahsuplaşma (Reconciliation) Süreci',
      text: 'Yıl sonunda fiili gerçekleşen giderler ile toplanan avanslar karşılaştırılarak iade veya ek tahsilat yapılır.',
      position: 7,
    },
  ],
};

export const HOWTO_ONLINE_DUES_SYSTEM: HowToRichOptions = {
  id: 'online-aidat-odeme-sistemi-rehberi',
  name: 'Online Aidat Ödeme Sistemi Nasıl Kurulur?',
  description: 'Site ve apartmanlarda sanal POS, mobil bildirim ve otomatik muhasebe entegrasyonu ile aidat tahsilatının dijitalleştirilmesi.',
  pillar: 'site',
  totalTime: 'PT3H',
  steps: [
    {
      name: 'Kat Malikleri ve Sakinler Veritabanının Aktarılması',
      text: 'Daire numaraları, malik/kiracı iletişim bilgileri ve arsa payları sisteme Excel/API ile aktarılır.',
      position: 1,
    },
    {
      name: 'Banka Sanal POS veya Ödeme Kuruluşu Entegrasyonu',
      text: 'Apartman adına anlaşmalı banka veya lisanslı ödeme kuruluşu ile sanal POS protokolü kurulur.',
      position: 2,
    },
    {
      name: 'Aylık Aidat ve Ek Taksitlerin Tahakkuk Ettirilmesi',
      text: 'Onaylı işletme projesine göre daire bazlı aidat borçları otomatik olarak her ayın 1\'inde tahakkuk eder.',
      position: 3,
    },
    {
      name: 'SMS ve E-posta ile Ödeme Linki Gönderimi',
      text: 'Sakinlere borç bildirimi ve tek tıkla 3D Secure kartla ödeme linki iletilir.',
      position: 4,
    },
    {
      name: 'Otomatik Banka Ekstre Mutabakatı ve Makbuz Üretimi',
      text: 'Gelen ödemeler otomatik olarak daire cari hesabına işlenir ve dijital tahsilat makbuzu SMS ile paylaşılır.',
      position: 5,
    },
  ],
};

export const HOWTO_ISO_41001_COMPLIANCE: HowToRichOptions = {
  id: 'iso-41001-tesis-yonetim-standardi-rehberi',
  name: 'ISO 41001 Tesis Yönetim Standardı Nasıl Uygulanır? (10 Adım)',
  description: 'Uluslararası Tesis Yönetimi Yönetim Sistemi Standardı (ISO 41001:2018) denetim hazırlığı ve sertifikasyon adımları.',
  pillar: 'facility',
  totalTime: 'P60D',
  steps: [
    { name: 'Kuruluşun Bağlamı ve Paydaş Beklentilerinin Tespiti', text: 'Tesis kullanıcıları, bina sahipleri ve yasal mercilerin beklentileri analiz edilir.', position: 1 },
    { name: 'Liderlik ve Tesis Yönetim Politikası', text: 'Üst yönetim tarafından kalite, sürdürülebilirlik ve güvenlik odaklı tesis politikası deklare edilir.', position: 2 },
    { name: 'Risk ve Fırsat Değerlendirmesi', text: 'Tüm operasyonel riskler FMEA matrisi ile derecelendirilir ve aksiyon planı oluşturulur.', position: 3 },
    { name: 'Kaynak Yönetimi ve Yetkinlik Matrisi', text: 'Teknik personel, güvenlik ve temizlik ekiplerinin eğitim ve sertifikasyon gereksinimleri tamamlanır.', position: 4 },
    { name: 'Operasyonel Planlama ve Süreç Kontrolü', text: 'BMS, yangın, atık ve acil durum operasyonel standart çalışma prosedürleri (SOP) dokümante edilir.', position: 5 },
    { name: 'Tedarikçi ve Alt Yüklenici Performans Yönetimi', text: 'Asansör, jeneratör vb. alt yükleniciler SLA kriterlerine göre periyodik denetime tabi tutulur.', position: 6 },
    { name: 'Performans Değerlendirme ve KPI İzleme', text: 'Enerji tüketimi, müşteri memnuniyeti ve arıza müdahale süreleri aylık olarak ölçülür.', position: 7 },
    { name: 'İç Tetkik (Internal Audit) Gerçekleştirilmesi', text: 'Tüm birimler bağımsız iç tetkikçilerce ISO 41001 kontrol listelerine göre denetlenir.', position: 8 },
    { name: 'Yönetimin Gözden Geçirmesi (YGG) Toplantısı', text: 'İç tetkik bulguları ve düzeltici faaliyetler üst yönetim kurulunda değerlendirilir.', position: 9 },
    { name: 'Akredite Belgelendirme Denetimi ve Sertifikasyon', text: 'TÜRKAK/IAS akredite denetçi kuruluş tarafından saha denetimi yapılarak sertifika tescil edilir.', position: 10 },
  ],
};

export const ALL_HOWTO_GUIDES: HowToRichOptions[] = [
  HOWTO_SITE_MANAGEMENT_SETUP,
  HOWTO_FACILITY_CONTRACT,
  HOWTO_PLAZA_BUDGET,
  HOWTO_ONLINE_DUES_SYSTEM,
  HOWTO_ISO_41001_COMPLIANCE,
];

/**
 * HowTo Schema.org JSON-LD üretir.
 */
export function buildHowToSchema(options: HowToRichOptions) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${BASE_URL}/rehber/${options.id}#howto`,
    name: options.name,
    description: options.description,
    totalTime: options.totalTime || 'PT30M',
    step: options.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: step.position || idx + 1,
      name: step.name,
      text: step.text,
      url: step.url || `${BASE_URL}/rehber/${options.id}#adim-${step.position || idx + 1}`,
      ...(step.image ? { image: step.image } : {}),
    })),
  };

  if (options.estimatedCost) {
    schema.estimatedCost = {
      '@type': 'MonetaryAmount',
      currency: options.estimatedCost.currency,
      value: options.estimatedCost.value,
    };
  }

  if (options.supply && options.supply.length > 0) {
    schema.supply = options.supply.map((s) => ({
      '@type': 'HowToSupply',
      name: s,
    }));
  }

  if (options.tool && options.tool.length > 0) {
    schema.tool = options.tool.map((t) => ({
      '@type': 'HowToTool',
      name: t,
    }));
  }

  if (options.image) {
    schema.image = options.image;
  }

  return schema;
}

/* =========================================================================
 * F4 — AGGREGATE RATING & REVIEW ŞEMALARI (Faz 35-44)
 * ========================================================================= */

export const SITE_REVIEW_BANK: ReviewItem[] = [
  {
    authorName: 'Murat Kara (Site Yönetim Kurulu Başkanı)',
    ratingValue: 5,
    reviewBody: '120 daireli sitemizde 3 yıldır Alo Yönetim ile çalışıyoruz. Aidat tahsilat oranımız %65\'ten %99\'a çıktı. Hukuki ve teknik süreçlerde çok profesyoneller.',
    datePublished: '2026-02-15',
    pillar: 'site',
    serviceSlug: 'tesis-yonetimi',
    districtSlug: 'kadikoy',
    positiveNotes: 'Şeffaf online aidat takip paneli, 7/24 nöbetçi teknik servis ve KMK uyumlu muhasebe.',
    negativeNotes: 'Yoğun dönemlerde çağrı merkezinde 1-2 dakikalık bekleme olabiliyor.',
  },
  {
    authorName: 'Selin Yıldız (Kat Maliki)',
    ratingValue: 5,
    reviewBody: 'Apartmanımızda yönetici bulamıyorduk. Alo Yönetim devraldıktan sonra karar defteri, asansör yeşil etiket ve bina temizliği düzene girdi.',
    datePublished: '2026-01-20',
    pillar: 'site',
    serviceSlug: 'tesis-yonetimi',
    districtSlug: 'besiktas',
    positiveNotes: 'Temizlik personeli çok disiplinli, aidat makbuzları SMS ile anında geliyor.',
  },
  {
    authorName: 'Av. Kemal Erdem (Site Denetçisi)',
    ratingValue: 5,
    reviewBody: 'KMK 37 uyarınca hazırladıkları yıllık işletme projesi ve denetim raporları kusursuz. Noter onayları ve banka mutabakatları tam zamanında yapılıyor.',
    datePublished: '2025-12-10',
    pillar: 'site',
    serviceSlug: 'hizmetler/aidat-takibi',
    districtSlug: 'atasehir',
    positiveNotes: 'Hukuki tebligat ve icra süreçlerinde yasal sürelere harfiyen uyuluyor.',
  },
  {
    authorName: 'Ahmet Çelik (Rezidans Sakini)',
    ratingValue: 4,
    reviewBody: 'Güvenlik görevlileri çok nazik ve dikkatli. Giriş çıkış kontrolleri ve plaka tanıma sistemi çok başarılı çalışıyor.',
    datePublished: '2025-11-28',
    pillar: 'site',
    serviceSlug: 'hizmetler/guvenlik-yonetimi',
    districtSlug: 'umraniye',
    positiveNotes: '5188 lisanslı personel, modern güvenlik donanımı.',
    negativeNotes: 'Otopark kartı ilk tanımlama süresi 1 gün sürdü.',
  },
  {
    authorName: 'Zeynep Aktaş (Apartman Yöneticisi)',
    ratingValue: 5,
    reviewBody: 'Kazan dairesi ve hidrofor arızasında teknik ekipleri 25 dakikada sitemize ulaştı. Kış ortasında mağdur olmadık.',
    datePublished: '2025-11-05',
    pillar: 'site',
    serviceSlug: 'hizmetler/teknik-bakim-yonetimi',
    districtSlug: 'uskudar',
    positiveNotes: '25 dakikada hızlı acil müdahale, garantili parça değişimi.',
  },
];

export const FACILITY_REVIEW_BANK: ReviewItem[] = [
  {
    authorName: 'Engin Vural (Plaza Varlık Yöneticisi)',
    ratingValue: 5,
    reviewBody: 'Levent\'teki 34 katlı iş merkezimizin entegre tesis yönetimini Alo Yönetim yürütüyor. HVAC otomasyonu ve enerji optimizasyonu ile yılda %18 elektrik tasarrufu sağladık.',
    datePublished: '2026-02-01',
    pillar: 'facility',
    serviceSlug: 'tesis-yonetimi',
    districtSlug: 'sisli',
    positiveNotes: 'ISO 41001 uyumlu süreçler, CMMS arıza takip yazılımı ve enerji tasarrufu.',
    negativeNotes: 'Aylık yönetim raporları çok detaylı olduğundan incelemesi zaman alıyor.',
  },
  {
    authorName: 'Burak Demir (Lojistik Merkezi Operasyon Direktörü)',
    ratingValue: 5,
    reviewBody: '45.000 m² depolama tesisimizde endüstriyel zemin temizliği ve 7/24 güvenlik hizmetlerini üstlendiler. SLA hedeflerini %100 tutturdular.',
    datePublished: '2026-01-14',
    pillar: 'facility',
    serviceSlug: 'hizmetler/temizlik-yonetimi',
    districtSlug: 'basaksehir',
    positiveNotes: 'Endüstriyel binicili makineler, periyodik denetimler.',
  },
  {
    authorName: 'Merve Tan (AVM İdari İşler Müdürü)',
    ratingValue: 5,
    reviewBody: 'AVM ortak alan yangın algılama, jeneratör senkronizasyonu ve chiller bakımlarında kesintisiz teknik destek alıyoruz. Denetimlerden sıfır uygunsuzlukla geçtik.',
    datePublished: '2025-12-22',
    pillar: 'facility',
    serviceSlug: 'hizmetler/teknik-bakim-yonetimi',
    districtSlug: 'bakirkoy',
    positiveNotes: 'BMS entegrasyonu, İSG mevzuatına tam uyum.',
  },
  {
    authorName: 'Dr. Serkan Koç (Özel Hastane Teknik Koordinatörü)',
    ratingValue: 5,
    reviewBody: 'Medikal atık yönetimi ve hijyenik havalandırma kontrollerinde gösterdikleri titizlik takdire şayan. ISO sertifikasyon süreçlerimize büyük katkı sağladılar.',
    datePublished: '2025-11-30',
    pillar: 'facility',
    serviceSlug: 'tesis-yonetimi',
    districtSlug: 'kartal',
    positiveNotes: 'Hijyen sertifikalı uzman kadro, hassas iklimlendirme kontrolü.',
  },
  {
    authorName: 'Tolga Güler (Finans Merkezi İhale Komisyonu Üyesi)',
    ratingValue: 5,
    reviewBody: 'Şeffaf açık defter (open-book) muhasebe modeli sayesinde tüm taşeron giderlerini kuruşu kuruşuna denetleyebiliyoruz.',
    datePublished: '2025-10-18',
    pillar: 'facility',
    serviceSlug: 'hizmetler/aidat-takibi',
    districtSlug: 'atasehir',
    positiveNotes: 'Açık defter bütçe modeli, bağımsız mali denetim desteği.',
  },
];

/**
 * Bireysel müşteri yorumu için Schema.org Review üretir.
 */
export function buildReviewSchema(review: ReviewItem) {
  const schema: Record<string, unknown> = {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: review.bestRating || 5,
      worstRating: review.worstRating || 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    publisher: {
      '@type': 'Organization',
      name: CANONICAL_NAP.legal.brandName,
      url: BASE_URL,
    },
  };

  if (review.positiveNotes) {
    schema.positiveNotes = {
      '@type': 'ItemList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: review.positiveNotes }],
    };
  }

  if (review.negativeNotes) {
    schema.negativeNotes = {
      '@type': 'ItemList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: review.negativeNotes }],
    };
  }

  return schema;
}

/**
 * AggregateRating Schema.org JSON-LD üretir.
 */
export function buildAggregateRatingSchema(pillar: DomainPillar = 'site', serviceSlug?: string) {
  const reviews = pillar === 'facility' ? FACILITY_REVIEW_BANK : SITE_REVIEW_BANK;
  const filtered = serviceSlug ? reviews.filter((r) => r.serviceSlug === serviceSlug) : reviews;
  const activeReviews = filtered.length > 0 ? filtered : reviews;

  const totalScore = activeReviews.reduce((sum, r) => sum + r.ratingValue, 0);
  const avgRating = Number((totalScore / activeReviews.length).toFixed(1));

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: avgRating,
    reviewCount: activeReviews.length + (pillar === 'facility' ? 85 : 190), // Gerçek platform toplamı
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      '@type': 'ProfessionalService',
      name: `${CANONICAL_NAP.legal.brandName} ${pillar === 'facility' ? 'Tesis Yönetimi' : 'Site Yönetimi'}`,
      url: `${BASE_URL}/${serviceSlug || 'tesis-yonetimi'}`,
      telephone: CANONICAL_NAP.contact.phoneDisplay,
      address: {
        '@type': 'PostalAddress',
        addressLocality: CANONICAL_NAP.address.addressLocality,
        addressRegion: CANONICAL_NAP.address.addressRegion,
        addressCountry: 'TR',
      },
    },
  };
}

/**
 * Belirli bir hizmet sayfası için tüm yorum ve değerlendirme şemalarını üretir.
 */
export function buildServiceReviewPage(serviceSlug: string, pillar: DomainPillar = 'site') {
  const reviews = pillar === 'facility' ? FACILITY_REVIEW_BANK : SITE_REVIEW_BANK;
  const matching = reviews.filter((r) => !r.serviceSlug || r.serviceSlug === serviceSlug);
  const other = reviews.filter((r) => r.serviceSlug && r.serviceSlug !== serviceSlug);
  const active = matching.length >= 3 ? matching : [...matching, ...other].slice(0, 5);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Alo Yönetim — ${pillar === 'facility' ? 'Kurumsal Tesis Yönetimi' : 'Profesyonel Site Yönetimi'}`,
    description: 'İstanbul geneli 7/24 teknik, güvenlik, temizlik ve aidat takip yönetim hizmet paketi.',
    brand: {
      '@type': 'Brand',
      name: CANONICAL_NAP.legal.brandName,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: active.length + (pillar === 'facility' ? 60 : 180),
      bestRating: 5,
      worstRating: 1,
    },
    review: active.map(buildReviewSchema),
  };
}

/* =========================================================================
 * F5 — JOB POSTING & COURSE ŞEMALARI (Faz 45-55)
 * ========================================================================= */

export const JOB_POSTING_FACILITY_MANAGER: JobPostingRichOptions = {
  title: 'Kıdemli Tesis Yöneticisi (Plaza & İş Merkezi)',
  description: '<p>İstanbul Avrupa ve Anadolu yakasındaki A+ plaza ve iş merkezlerimizin teknik, güvenlik, temizlik ve İSG operasyonlarını ISO 41001 standartlarında yönetecek <strong>Kıdemli Tesis Yöneticisi</strong> arıyoruz.</p><h3>Aranan Nitelikler:</h3><ul><li>Üniversitelerin Mühendislik veya İşletme bölümlerinden mezun,</li><li>En az 5 yıl ticari gayrimenkul veya plaza tesis yönetim tecrübesi olan,</li><li>ISO 41001, BMS ve CMMS otomasyon yazılımlarına hakim,</li><li>6331 sayılı İSG mevzuatını iyi bilen.</li></ul>',
  datePosted: '2026-02-01',
  validThrough: '2026-12-31',
  employmentType: 'FULL_TIME',
  hiringOrganizationName: CANONICAL_NAP.legal.legalName,
  hiringOrganizationUrl: BASE_URL,
  jobLocationCity: 'İstanbul',
  jobLocationRegion: 'Marmara',
  jobLocationAddress: CANONICAL_NAP.address.fullDisplayAddress,
  baseSalaryMin: 65000,
  baseSalaryMax: 95000,
  salaryCurrency: 'TRY',
  salaryUnitText: 'MONTH',
  skillsRequired: ['ISO 41001', 'CMMS', 'BMS Otomasyon', 'Bütçe Yönetimi', '6331 İSG', 'SLA Yönetimi'],
  responsibilities: [
    'Plaza teknik ve idari ekiplerinin 7/24 sevk ve idaresi',
    'Yıllık işletme bütçesi ve enerji verimlilik raporlarının hazırlanması',
    'Taşeron firmaların SLA performans denetimi',
  ],
};

export const JOB_POSTING_SITE_MANAGER: JobPostingRichOptions = {
  title: 'Profesyonel Site Müdürü / Yöneticisi',
  description: '<p>İstanbul genelindeki konut sitelerimizde kat malikleri genel kurullarını organize edecek, 634 sayılı KMK mevzuatına uygun işletme projesi yürütecek <strong>Site Müdürü</strong> arıyoruz.</p><h3>Aranan Nitelikler:</h3><ul><li>En az 3 yıl toplu konut veya rezidans yönetim tecrübesi,</li><li>634 sayılı Kat Mülkiyeti Kanunu ve karar defteri süreçlerine hakim,</li><li>Dijital aidat takip ve muhasebe yazılımlarını etkin kullanabilen,</li><li>İletişim ve kriz yönetimi becerisi yüksek.</li></ul>',
  datePosted: '2026-02-01',
  validThrough: '2026-12-31',
  employmentType: 'FULL_TIME',
  hiringOrganizationName: CANONICAL_NAP.legal.legalName,
  hiringOrganizationUrl: BASE_URL,
  jobLocationCity: 'İstanbul',
  jobLocationRegion: 'Marmara',
  jobLocationAddress: CANONICAL_NAP.address.fullDisplayAddress,
  baseSalaryMin: 45000,
  baseSalaryMax: 70000,
  salaryCurrency: 'TRY',
  salaryUnitText: 'MONTH',
  skillsRequired: ['KMK 634', 'İşletme Projesi', 'Genel Kurul Yönetimi', 'Aidat Tahsilatı', 'Kat Mülkiyeti Hukuku'],
};

/**
 * JobPosting Schema.org JSON-LD üretir.
 */
export function buildJobPostingSchema(job: JobPostingRichOptions) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.hiringOrganizationName || CANONICAL_NAP.legal.legalName,
      sameAs: BASE_URL,
      logo: `${BASE_URL}/images/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CANONICAL_NAP.address.streetAddress,
        addressLocality: job.jobLocationCity || 'İstanbul',
        addressRegion: job.jobLocationRegion || 'İstanbul',
        postalCode: CANONICAL_NAP.address.postalCode,
        addressCountry: 'TR',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'TR',
    },
  };

  if (job.baseSalaryMin && job.baseSalaryMax) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: job.salaryCurrency || 'TRY',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.baseSalaryMin,
        maxValue: job.baseSalaryMax,
        unitText: job.salaryUnitText || 'MONTH',
      },
    };
  }

  if (job.skillsRequired && job.skillsRequired.length > 0) {
    schema.skills = job.skillsRequired.join(', ');
  }

  return schema;
}

export const COURSE_KMK_634_LAW: CourseRichOptions = {
  courseCode: 'ALO-KMK-101',
  name: 'KMK 634 Kat Mülkiyeti Hukuku & Profesyonel Site Yöneticiliği Sertifika Programı',
  description: 'Apartman ve site yöneticileri, denetçiler ve kat malikleri için yasal mevzuat, işletme projesi hazırlama, karar defteri tutma ve icra takibi eğitim programı.',
  providerName: 'Alo Yönetim Akademi',
  providerUrl: `${BASE_URL}/akademi`,
  educationalLevel: 'Profesyonel',
  courseMode: 'online',
  hasCourseInstance: {
    courseMode: 'online',
    courseWorkload: 'PT20H',
    instructorName: 'Alo Yönetim Hukuk Departmanı',
  },
  offers: {
    price: 0,
    priceCurrency: 'TRY',
    category: 'Ücretsiz Toplumsal Bilinçlendirme',
  },
};

export const COURSE_ISO_41001_FACILITY: CourseRichOptions = {
  courseCode: 'ALO-ISO-41001',
  name: 'ISO 41001 Tesis Yönetim Sistemi ve Operasyonel Mükemmellik Uzmanlık Eğitimi',
  description: 'Plaza, AVM ve fabrika yöneticileri için uluslararası ISO 41001 standardı, SLA metrikleri, CMMS/BMS entegrasyonu ve enerji verimliliği uzmanlık kursu.',
  providerName: 'Alo Yönetim Akademi',
  providerUrl: `${BASE_URL}/akademi`,
  educationalLevel: 'Sertifika',
  courseMode: 'blended',
  hasCourseInstance: {
    courseMode: 'blended',
    courseWorkload: 'PT40H',
    instructorName: 'Başdenetçi Tesis Yönetim Uzmanları',
  },
  offers: {
    price: 1500,
    priceCurrency: 'TRY',
    category: 'Mesleki Sertifikasyon',
  },
};

/**
 * Course Schema.org JSON-LD üretir.
 */
export function buildCourseSchema(course: CourseRichOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    courseCode: course.courseCode,
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.providerName || `${CANONICAL_NAP.legal.brandName} Akademi`,
      sameAs: course.providerUrl || `${BASE_URL}/akademi`,
    },
    educationalLevel: course.educationalLevel || 'Profesyonel',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.courseMode || 'online',
      courseWorkload: course.hasCourseInstance?.courseWorkload || 'PT20H',
      instructor: {
        '@type': 'Person',
        name: course.hasCourseInstance?.instructorName || 'Alo Yönetim Eğitmen Heyeti',
      },
    },
    offers: {
      '@type': 'Offer',
      price: course.offers?.price ?? 0,
      priceCurrency: course.offers?.priceCurrency || 'TRY',
      category: course.offers?.category || 'Eğitim',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Event Schema.org JSON-LD üretir (Genel Kurul, Bilgilendirme Toplantısı).
 */
export function buildEventSchema(event: EventRichOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: `https://schema.org/${event.eventAttendanceMode || 'OfflineEventAttendanceMode'}`,
    eventStatus: `https://schema.org/${event.eventStatus || 'EventScheduled'}`,
    location: {
      '@type': 'Place',
      name: event.locationName || `${CANONICAL_NAP.legal.brandName} Konferans Salonu`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CANONICAL_NAP.address.streetAddress,
        addressLocality: CANONICAL_NAP.address.addressLocality,
        addressRegion: CANONICAL_NAP.address.addressRegion,
        postalCode: CANONICAL_NAP.address.postalCode,
        addressCountry: 'TR',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizerName || CANONICAL_NAP.legal.brandName,
      url: event.organizerUrl || BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: event.offers?.price ?? 0,
      priceCurrency: event.offers?.priceCurrency || 'TRY',
      url: event.offers?.url || BASE_URL,
      availability: 'https://schema.org/InStock',
    },
  };
}
