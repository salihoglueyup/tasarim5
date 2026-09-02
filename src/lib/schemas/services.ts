import type { JsonLdObject, OfferItem, RatingInput } from './constants';
import {
  ORG_ID,
  LOCALBUSINESS_ID,
  ORG_NAME,
  ORG_LOGO,
  ORG_PHONE,
  ORG_EMAIL,
  ORG_PRICE_RANGE,
  ORG_ADDRESS,
  ORG_GEO,
  AREA_SERVED_GEOCIRCLE,
  BASE_URL,
  abs,
} from './constants';

export function serviceSchema(opts: {
  serviceType: string;
  path: string;
  description?: string;
  offerCatalogName?: string;
  offers?: OfferItem[];
  sameAs?: string;
  priceRange?: string;
}): JsonLdObject {
  return {
    '@type': 'Service',
    serviceType: opts.serviceType,
    name: opts.serviceType,
    url: abs(opts.path),
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.sameAs ? { sameAs: opts.sameAs } : {}),
    ...(opts.priceRange ? { priceRange: opts.priceRange } : {}),
    provider: { '@id': LOCALBUSINESS_ID },
    areaServed: { '@type': 'State', name: 'İstanbul' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: opts.offerCatalogName ?? `${opts.serviceType} Hizmet ve Çözüm Kataloğu`,
      itemListElement: (opts.offers && opts.offers.length
        ? opts.offers
        : [
            { name: `${opts.serviceType} Keşif & Danışmanlık`, description: 'Yerinde ücretsiz fizibilite ve teknik durum tespiti.' },
            { name: `7/24 Operasyonel ${opts.serviceType}`, description: 'Sözleşmeli ve SLA garantili kurumsal hizmet yönetimi.' },
            { name: `${opts.serviceType} Denetim & Raporlama`, description: 'Mobil uygulama üzerinden anlık denetim ve şeffaf tutanaklar.' },
          ]
      ).map((o) => ({
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
  };
}

// ---------------------------------------------------------------------------
// Faz 48 — FAQPage
// ---------------------------------------------------------------------------

export function localBusinessAreaSchema(opts: {
  areaName: string;
  geo: { lat: number; lng: number };
  description?: string;
  url: string;
  aggregateRating?: RatingInput;
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
    hasMap: `https://www.google.com/maps?q=Alo+Yönetim+${encodeURIComponent(opts.areaName)}`,
    areaServed: { '@type': 'AdministrativeArea', name: `${opts.areaName}, İstanbul` },
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
    ...(opts.aggregateRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: opts.aggregateRating.ratingValue,
            reviewCount: opts.aggregateRating.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '120',
            bestRating: '5',
            worstRating: '1',
          },
        }),
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

export function districtSecurityServiceSchema({
  districtName,
  path,
  geo,
  neighborhoods,
}: {
  districtName: string;
  path: string;
  geo?: { lat: number; lng: number };
  neighborhoods?: string[];
}): JsonLdObject {
  const url = `${BASE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SecurityService',
    '@id': `${url}#security-service`,
    name: `${districtName} 5188 Özel Güvenlik Şirketi & Site Emniyet Hizmetleri`,
    description: `${districtName} genelinde 5188 sayılı kanun standartlarında Valilik ruhsatlı özel güvenlik personeli, 7/24 devriye, PTS plaka tanıma ve CCTV kamera izleme hizmeti.`,
    url,
    serviceType: '5188 Sayılı Kanun Kapsamında Özel Güvenlik ve Koruma',
    category: 'SecurityService',
    provider: {
      '@type': 'Corporation',
      '@id': ORG_ID,
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      telephone: ORG_PHONE,
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'T.C. İçişleri Bakanlığı 5188 Sayılı Özel Güvenlik Şirketi Faaliyet İzin Belgesi',
          credentialCategory: 'GovernmentPermit'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'T.C. İstanbul Valiliği Özel Güvenlik İzin Ruhsatı',
          credentialCategory: 'GovernmentPermit'
        }
      ]
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${districtName}, İstanbul`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'İstanbul, Türkiye'
      },
      ...(geo ? {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geo.lat,
          longitude: geo.lng
        }
      } : {})
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${districtName} Özel Güvenlik ve Koruma Çözümleri`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '5188 Sertifikalı Üniformalı Site Güvenlik Personeli'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Yapay Zeka Destekli PTS (Plaka Tanıma) ve Bariyer Otomasyonu'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'RFID Devriye Tur Kontrol ve 7/24 CCTV İzleme Merkezi'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'İstanbul Valiliği 5188 Özel Güvenlik İzin Alma Danışmanlığı'
          }
        }
      ]
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/teklif-al?hizmet=guvenlik&bolge=${encodeURIComponent(districtName)}`,
        inLanguage: 'tr-TR',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: `${districtName} 5188 Güvenlik Keşif Randevusu`
      }
    }
  };
}

export function districtTechnicalServiceSchema(opts: {
  districtName: string;
  path: string;
  geo?: { lat: number; lng: number };
  neighborhoods?: string[];
}): JsonLdObject {
  const { districtName, path, geo } = opts;
  const url = `${BASE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'EngineeringService',
    '@id': `${url}#technical-service`,
    name: `${districtName} Bina & Site Teknik Bakım, Asansör & Jeneratör Servisi`,
    description: `${districtName} genelinde asansör aylık bakımı, yeşil etiket muayenesi, jeneratör ATS yük testleri ve kompanzasyon panosu yönetimi hizmeti.`,
    url,
    serviceType: 'Tesis ve Bina Teknik Bakım, Onarım ve Mühendislik Hizmetleri',
    category: 'EngineeringService',
    provider: {
      '@type': 'Corporation',
      '@id': ORG_ID,
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      telephone: ORG_PHONE,
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'TMMOB Makina ve Elektrik Mühendisleri Odası Tescilli Teknik Bakım Yeterliliği',
          credentialCategory: 'ProfessionalLicense'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Sanayi ve Teknoloji Bakanlığı Asansör Yetkili Servis Sertifikasyonu',
          credentialCategory: 'GovernmentPermit'
        }
      ]
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${districtName}, İstanbul`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'İstanbul, Türkiye'
      },
      ...(geo ? {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geo.lat,
          longitude: geo.lng
        }
      } : {})
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${districtName} Teknik Bakım ve Mühendislik Çözümleri`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Asansör Aylık Bakımı ve Yıllık Yeşil Etiket Muayene Koordinasyonu'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '7/24 Kesintisiz Jeneratör & Otomatik Transfer Panosu (ATS) Bakımı'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kompanzasyon Panosu Reaktif / Kapasitif Ceza Önleme ve Röle Takibi'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Yangın Pompası, Hidrofor, Su Deposu ve Havalandırma Bakımı'
          }
        }
      ]
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/teklif-al?hizmet=teknik-bakim&bolge=${encodeURIComponent(districtName)}`,
        inLanguage: 'tr-TR',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: `${districtName} Teknik Bakım Keşif Randevusu`
      }
    }
  };
}

export function districtCleaningServiceSchema(opts: {
  districtName: string;
  path: string;
  geo?: { lat: number; lng: number };
  neighborhoods?: string[];
}): JsonLdObject {
  const { districtName, path, geo } = opts;
  const url = `${BASE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'HouseCleaningService',
    '@id': `${url}#cleaning-service`,
    name: `${districtName} Profesyonel Site Temizliği, Dış Cephe Cam Silimi & İlaçlama`,
    description: `${districtName} siteleri ve tesisleri için TSE HYB standartlarında blok kat temizliği, asansör hijyeni, dağcı dış cephe cam silimi ve Sağlık Bakanlığı onaylı biyosidal ilaçlama.`,
    url,
    serviceType: 'Site, Rezidans ve Tesis Profesyonel Temizlik ve Dezenfeksiyon Hizmetleri',
    category: 'HouseCleaningService',
    provider: {
      '@type': 'Corporation',
      '@id': ORG_ID,
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      telephone: ORG_PHONE,
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'TSE HYB 12849 Hizmet Yeterlilik Belgesi (Endüstriyel Temizlik)',
          credentialCategory: 'QualityCertification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'T.C. Sağlık Bakanlığı Biyosidal Ürün Uygulama İzin Belgesi',
          credentialCategory: 'GovernmentPermit'
        }
      ]
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${districtName}, İstanbul`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'İstanbul, Türkiye'
      },
      ...(geo ? {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geo.lat,
          longitude: geo.lng
        }
      } : {})
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${districtName} Profesyonel Temizlik ve Hijyen Hizmetleri`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Günlük Blok Girişi, Kat Koridoru ve Asansör Dezenfeksiyonu'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Endüstriyel Dağcı (İple Erişim) Dış Cephe Cam Yıkama'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kapalı Otopark Zemin Otomat Yıkama ve Çöp Şaftı Sterilizasyonu'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sağlık Bakanlığı Onaylı Biyosidal Haşere & Kemirgen İlaçlaması'
          }
        }
      ]
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/teklif-al?hizmet=temizlik&bolge=${encodeURIComponent(districtName)}`,
        inLanguage: 'tr-TR',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: `${districtName} Site Temizliği Keşif Randevusu`
      }
    }
  };
}

/**
 * İlçe Bazlı Entegre Tesis Yönetimi Zengin Varlık Şeması (ProfessionalService & OfferCatalog)
 */
export function districtFacilityServiceSchema(opts: {
  districtName: string;
  path: string;
  geo?: { lat: number; lng: number };
  neighborhoods?: string[];
}): JsonLdObject {
  const { districtName, path, geo, neighborhoods } = opts;
  const url = `${BASE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}#facility-service`,
    name: `${districtName} Profesyonel Tesis Yönetimi & Entegre Site İşletme Şirketi`,
    description: `${districtName} genelinde apartman, site, plaza ve rezidanslar için 634 sayılı KMK tam uyumlu profesyonel tesis yönetimi, 5188 lisanslı güvenlik, teknik bakım, şeffaf aidat muhasebesi ve temizlik işletmesi.`,
    url,
    serviceType: 'Entegre Tesis ve Mülk Yönetimi',
    category: 'ProfessionalService',
    priceRange: '₺₺',
    about: [
      { '@type': 'Thing', name: 'Facility management', sameAs: 'https://www.wikidata.org/wiki/Q1391515' },
      { '@type': 'Thing', name: 'Property management', sameAs: 'https://www.wikidata.org/wiki/Q1758229' },
      { '@type': 'Thing', name: 'Condominium', sameAs: 'https://www.wikidata.org/wiki/Q161851' },
      { '@type': 'Thing', name: 'Preventive maintenance', sameAs: 'https://www.wikidata.org/wiki/Q183057' }
    ],
    provider: {
      '@type': 'Corporation',
      '@id': ORG_ID,
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      telephone: ORG_PHONE,
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
          credentialCategory: 'QualityCertification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 14001:2015 Çevre Yönetim Sistemi',
          credentialCategory: 'QualityCertification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği',
          credentialCategory: 'QualityCertification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'TSE HYB 12850 Hizmet Yeterlilik Belgesi',
          credentialCategory: 'QualityCertification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'T.C. İçişleri Bakanlığı 5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi',
          credentialCategory: 'GovernmentPermit'
        }
      ]
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${districtName}, İstanbul`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'İstanbul, Türkiye'
      },
      ...(geo ? {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geo.lat,
          longitude: geo.lng
        }
      } : {}),
      ...(neighborhoods && neighborhoods.length ? {
        description: `${neighborhoods.join(', ')} mahallelerinde yerinde 7/24 tesis yönetim masası.`
      } : {})
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${districtName} Entegre Tesis Yönetimi ve İşletme Çözümleri`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '634 Sayılı KMK m.37 Şeffaf Yıllık İşletme Projesi & Bütçe Yönetimi'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '5188 Lisanslı Özel Güvenlik, PTS Plaka Tanıma & 7/24 CCTV İzleme'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Asansör, Jeneratör & Hidrofor 7/24 Mobil Önleyici Teknik Servisi'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TSE 13811 Standartlarında Ortak Alan Temizliği & Biyosidal İlaçlama'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Otomatik SMS/Kredi Kartı ile Aidat Tahsilatı & Anlaşmalı Hukuki İcra Masası'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '4 Mevsim Peyzaj Bakımı, Çim Biçme & Akıllı Otomatik Sulama Sistemleri'
          }
        }
      ]
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/teklif-al?hizmet=tesis-yonetimi&bolge=${encodeURIComponent(districtName)}`,
        inLanguage: 'tr-TR',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: `${districtName} Ücretsiz Tesis & Site Keşif Randevusu`
      }
    }
  };
}

/**
 * Kat Mülkiyeti Hukuku ve İcra Danışmanlığı Şeması (Schema.org LegalService).
 */
export function legalServiceSchema(opts?: {
  name?: string;
  description?: string;
  path?: string;
  areaServed?: string;
}): JsonLdObject {
  const path = opts?.path ?? '/hizmetler/hukuk-ve-icra-danismanligi';
  const name = opts?.name ?? 'Kat Mülkiyeti Hukuku ve Aidat İcra Takibi Danışmanlığı';
  const description =
    opts?.description ??
    '634 Sayılı Kat Mülkiyeti Kanunu (KMK), icra takibi, şeffaf işletme projesi denetimi ve genel kurul hukuki danışmanlık hizmetleri.';

  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${BASE_URL}${path}#legalservice`,
    name,
    description,
    url: `${BASE_URL}${path}`,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    priceRange: ORG_PRICE_RANGE,
    image: `${BASE_URL}/images/hero-poster-v5.webp`,
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    parentOrganization: { '@id': ORG_ID },
    areaServed: opts?.areaServed
      ? { '@type': 'AdministrativeArea', name: opts.areaServed }
      : AREA_SERVED_GEOCIRCLE,
    knowsAbout: [
      { '@type': 'Thing', name: 'Kat Mülkiyeti Kanunu (KMK 634)', sameAs: 'https://www.wikidata.org/wiki/Q161851' },
      { '@type': 'Thing', name: 'İcra ve İflas Hukuku', sameAs: 'https://www.wikidata.org/wiki/Q1148408' },
      { '@type': 'Thing', name: 'İşletme Projesi ve Aidat Borçlandırması', sameAs: 'https://www.wikidata.org/wiki/Q1670988' },
    ],
  };
}
