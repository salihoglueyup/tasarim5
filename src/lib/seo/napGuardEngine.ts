/**
 * Merkezi NAP Guard ve Yerel Otorite Motoru (napGuardEngine.ts)
 * 
 * Google Local Pack, E-E-A-T, Schema.org ve Yapay Zeka botları için
 * Alo Yönetim'in tek kaynaklı, doğrulanabilir kurumsal kimlik, adres,
 * telefon, vergi/sicil, çalışma saatleri ve coğrafi koordinatlarını yönetir.
 */

import { BASE_URL } from '@/lib/seo';

export interface CanonicalNapAddress {
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly postalCode: string;
  readonly addressCountry: string;
  readonly fullDisplayAddress: string;
}

export interface CanonicalNapContact {
  readonly phoneE164: string;
  readonly phoneDisplay: string;
  readonly emergencyPhoneE164: string;
  readonly emergencyPhoneDisplay: string;
  readonly email: string;
  readonly supportEmail: string;
  readonly privacyEmail: string;
  readonly securityEmail: string;
}

export interface CanonicalNapGeo {
  readonly latitude: number;
  readonly longitude: number;
  readonly geoRadiusMeters: number;
  readonly googleMapsPlaceUrl: string;
  readonly googleMapsEmbedQuery: string;
  readonly openStreetMapUrl: string;
}

export interface CanonicalNapLegal {
  readonly legalName: string;
  readonly brandName: string;
  readonly foundingYear: number;
  readonly mersisNumber: string;
  readonly taxOffice: string;
  readonly tradeRegistryNumber: string;
  readonly securityLicenseLaw: string;
  readonly securityPermitNumber: string;
}

export interface CanonicalNapOpeningHours {
  readonly dayOfWeek: string[];
  readonly opens: string;
  readonly closes: string;
  readonly callCenterHours: string;
}

export interface CanonicalNapData {
  readonly legal: CanonicalNapLegal;
  readonly address: CanonicalNapAddress;
  readonly contact: CanonicalNapContact;
  readonly geo: CanonicalNapGeo;
  readonly openingHours: CanonicalNapOpeningHours;
  readonly sameAs: string[];
  readonly priceRange: string;
}

/**
 * Tek ve Kanonik NAP Kaynağı (Single Source of Truth)
 */
export const CANONICAL_NAP: CanonicalNapData = {
  legal: {
    legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
    brandName: 'Alo Yönetim',
    foundingYear: 2009,
    mersisNumber: '0054049823100018',
    taxOffice: 'Kadıköy',
    tradeRegistryNumber: '712498-5',
    securityLicenseLaw: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
    securityPermitNumber: 'İST-ÖGG-2015/8492',
  },
  address: {
    streetAddress: 'Misak-ı Milli Sok. No:94A',
    addressLocality: 'Kadıköy',
    addressRegion: 'İstanbul',
    postalCode: '34714',
    addressCountry: 'TR',
    fullDisplayAddress: 'Osmanağa, Misak-ı Milli Sok. No:94A, 34714 Kadıköy/İstanbul',
  },
  contact: {
    phoneE164: '+902165504848',
    phoneDisplay: '0216 550 48 48',
    emergencyPhoneE164: '+902165504848',
    emergencyPhoneDisplay: '0216 550 48 48 (7/24 Nöbetçi Santral)',
    email: 'info@aloyonetim.com.tr',
    supportEmail: 'info@aloyonetim.com.tr',
    privacyEmail: 'kvkk@aloyonetim.com.tr',
    securityEmail: 'security@aloyonetim.com.tr',
  },
  geo: {
    latitude: 40.9904,
    longitude: 29.0305,
    geoRadiusMeters: 50000,
    googleMapsPlaceUrl: 'https://maps.google.com/?q=Osmana%C4%9Fa,+Misak-%C4%B1+Milli+Sok.+No:94A,+34714+Kad%C4%B1k%C3%B6y/%C4%B0stanbul',
    googleMapsEmbedQuery: 'Osmanağa Mah. Misak-ı Milli Sok. No:94A Kadıköy İstanbul',
    openStreetMapUrl: 'https://www.openstreetmap.org/#map=19/40.9904/29.0305',
  },
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '18:30',
    callCenterHours: '7/24 Kesintisiz',
  },
  sameAs: [
    'https://twitter.com/aloyonetim',
    'https://www.linkedin.com/company/aloyonetim',
    'https://www.instagram.com/aloyonetim',
    'https://www.facebook.com/aloyonetim',
    'https://www.youtube.com/@aloyonetim',
    'https://www.guvenlikkursu.com/',
    'https://3gguvenlik.com/',
  ],
  priceRange: '₺₺',
} as const;

/**
 * LocalBusiness / ProfessionalService Schema.org JSON-LD üreteci.
 */
export function generateLocalBusinessJsonLd(options?: {
  path?: string;
  name?: string;
  description?: string;
}) {
  const url = options?.path ? `${BASE_URL}${options.path}` : BASE_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#localbusiness`,
    name: options?.name || CANONICAL_NAP.legal.brandName,
    legalName: CANONICAL_NAP.legal.legalName,
    url,
    logo: `${BASE_URL}/icon.png`,
    image: `${BASE_URL}/images/logos/new-icon-transparent-hd.png`,
    telephone: CANONICAL_NAP.contact.phoneE164,
    email: CANONICAL_NAP.contact.email,
    priceRange: CANONICAL_NAP.priceRange,
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: CANONICAL_NAP.openingHours.dayOfWeek,
        opens: CANONICAL_NAP.openingHours.opens,
        closes: CANONICAL_NAP.openingHours.closes,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
        description: '7/24 Nöbetçi Tesis Çağrı Merkezi ve Acil Müdahale',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'İstanbul',
      sameAs: 'https://www.wikidata.org/wiki/Q406',
    },
    hasMap: CANONICAL_NAP.geo.googleMapsPlaceUrl,
    sameAs: CANONICAL_NAP.sameAs,
  };
}

/**
 * GeoJSON Feature formatında NAP temsili.
 */
export function generateNapGeoJson() {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [CANONICAL_NAP.geo.longitude, CANONICAL_NAP.geo.latitude],
    },
    properties: {
      title: CANONICAL_NAP.legal.brandName,
      legalName: CANONICAL_NAP.legal.legalName,
      address: CANONICAL_NAP.address.fullDisplayAddress,
      phone: CANONICAL_NAP.contact.phoneDisplay,
      email: CANONICAL_NAP.contact.email,
      website: BASE_URL,
      mersisNumber: CANONICAL_NAP.legal.mersisNumber,
      taxOffice: CANONICAL_NAP.legal.taxOffice,
      googleMapsUrl: CANONICAL_NAP.geo.googleMapsPlaceUrl,
      verifiedStatus: 'ACTIVE_AND_LICENSED',
    },
  };
}

/**
 * NAP Doğruluk & Bütünlük Kontrolü (Validation Guard)
 */
export function validateNapIntegrity(data: CanonicalNapData = CANONICAL_NAP): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 1. Telefon E.164 kontrolü
  if (!/^\+90\d{10}$/.test(data.contact.phoneE164)) {
    errors.push(`Geçersiz E.164 telefon formatı: ${data.contact.phoneE164}`);
  }

  // 2. E-posta kontrolü
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email)) {
    errors.push(`Geçersiz e-posta formatı: ${data.contact.email}`);
  }

  // 3. Posta Kodu kontrolü (Türkiye 5 haneli)
  if (!/^\d{5}$/.test(data.address.postalCode)) {
    errors.push(`Geçersiz posta kodu: ${data.address.postalCode}`);
  }

  // 4. GPS Koordinatları kontrolü (İstanbul sınırları: 40-42 Lat, 28-30 Lon)
  if (data.geo.latitude < 40 || data.geo.latitude > 42) {
    errors.push(`Geçersiz enlem (latitude): ${data.geo.latitude}`);
  }
  if (data.geo.longitude < 28 || data.geo.longitude > 30) {
    errors.push(`Geçersiz boylam (longitude): ${data.geo.longitude}`);
  }

  // 5. MERSIS Numarası kontrolü (16 haneli)
  if (!/^\d{16}$/.test(data.legal.mersisNumber)) {
    errors.push(`Geçersiz MERSİS numarası: ${data.legal.mersisNumber}`);
  }

  // 6. Cadde ve Açık adres tutarlılığı
  if (!data.address.fullDisplayAddress.includes(data.address.streetAddress)) {
    errors.push('Açık adres ile sokak adı birbiriyle uyuşmuyor.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
