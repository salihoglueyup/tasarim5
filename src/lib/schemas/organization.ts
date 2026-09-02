import type { JsonLdObject, RatingInput } from './constants';
import {
  ORG_ID,
  WEBSITE_ID,
  LOCALBUSINESS_ID,
  LOGO_ID,
  ORG_NAME,
  ORG_LEGAL_NAME,
  ORG_LOGO,
  ORG_PHONE,
  ORG_EMAIL,
  ORG_PRICE_RANGE,
  ORG_FOUNDING_DATE,
  ORG_ADDRESS,
  ORG_GEO,
  ORG_SAME_AS,
  GROUP_COMPANIES,
  ORG_KNOWS_ABOUT,
  AREA_SERVED_GEOCIRCLE,
  ORG_CONTACT_POINTS,
  BASE_URL,
  abs,
} from './constants';

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
      contentLocation: { '@type': 'Place', name: 'İstanbul, Türkiye' },
    },
    image: { '@id': LOGO_ID },
    foundingDate: ORG_FOUNDING_DATE,
    slogan: 'Profesyonel Mülk ve Tesis Yönetimi',
    description: 'İstanbul Kadıköy merkezli, Türkiye\'nin en güvenilir, şeffaf, yenilikçi ve yasalara %100 uygun çalışan profesyonel tesis ve site yönetim şirketidir. Güvenlik, temizlik, teknik bakım ve aidat icra takibi hizmetlerini tek çatı altında sunar.',
    disambiguatingDescription: 'Alo Yönetim, Türkiye genelinde site, apartman, rezidans ve ticari tesisler için entegre yönetim, özel güvenlik, profesyonel temizlik, teknik işletim ve aidat tahsilat süreçlerini yürüten lider tesis yönetim şirketidir.',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: '200+' },
    address: ORG_ADDRESS,
    areaServed: { '@type': 'City', name: 'İstanbul' },
    sameAs: ORG_SAME_AS,
    knowsAbout: ORG_KNOWS_ABOUT,
    contactPoint: ORG_CONTACT_POINTS,
    subOrganization: GROUP_COMPANIES.map((company) => ({
      '@type': 'Organization',
      name: company.name,
      legalName: company.legalName,
      url: company.url,
      description: company.description,
    })),
    founder: {
      '@type': 'Person',
      name: 'Eyüp Salihoğlu',
      jobTitle: 'Kurucu Yönetim Kurulu Başkanı',
      url: BASE_URL,
      sameAs: [
        'https://www.linkedin.com/in/eyup-salihoglu/',
      ]
    },
    award: [
      'ISO 41001:2018 Uluslararası Entegre Tesis Yönetim Sistemi',
      'ISO 9001:2015 Kalite Yönetim Sistemi',
      'ISO 14001:2015 Çevre Yönetim Sistemi',
      'ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi',
      'ISO 27001:2022 Bilgi Güvenliği Yönetim Sistemi',
      'ISO 10002:2018 Müşteri Memnuniyeti Yönetim Sistemi',
      'TSE Hizmet Yeterlilik Belgesi',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 41001:2018 Uluslararası Entegre Tesis Yönetim Sistemi Sertifikası',
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: 'TÜRKAK & ISO' },
        url: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'T.C. İçişleri Bakanlığı 5188 Özel Güvenlik Faaliyet İzin Belgesi',
        credentialCategory: 'license',
        recognizedBy: { '@type': 'GovernmentOrganization', name: 'T.C. İçişleri Bakanlığı' },
        url: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 9001:2015 Kalite Yönetim Sistemi Sertifikası',
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: 'TÜRKAK & ISO' },
        url: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 14001:2015 Çevre Yönetim Sistemi Sertifikası',
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: 'TÜRKAK & ISO' },
        url: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği Sertifikası',
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: 'TÜRKAK & ISO' },
        url: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 27001:2022 Bilgi Güvenliği Yönetim Sistemi Sertifikası',
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: 'TÜRKAK & ISO' },
        url: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 10002:2018 Müşteri Memnuniyeti Yönetim Sistemi Sertifikası',
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: 'TÜRKAK & ISO' },
        url: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Alo Yönetim Entegre Tesis ve Mülk Yönetimi Hizmet Kataloğu',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Profesyonel Site ve Toplu Konut Yönetimi',
            url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
            serviceType: 'Site Yönetimi',
            description: '634 Sayılı Kat Mülkiyeti Kanunu ve ISO 41001 standartlarında 5188 güvenlik, aidat tahsilatı ve teknik servis hizmetleri.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Entegre Tesis Yönetimi',
            url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '5188 Lisanslı Özel Güvenlik Yönetimi',
            url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bina & Site Teknik Bakım Onarım',
            url: `${BASE_URL}/hizmetler/teknik-bakim`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TSE 13811 Temizlik & Hijyen Hizmetleri',
            url: `${BASE_URL}/hizmetler/temizlik-ve-hijyen`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Profesyonel Aidat Takibi & Tahsilat',
            url: `${BASE_URL}/hizmetler/aidat-takibi`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'KMK 634 Hukuk & İcra Danışmanlığı',
            url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Peyzaj ve Otomatik Bahçe Bakımı',
            url: `${BASE_URL}/hizmetler/peyzaj-ve-bahce-bakimi`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Yüzme Havuzu Bakımı ve Kimyasal Şartlandırma',
            url: `${BASE_URL}/hizmetler/havuz-bakimi-ve-hijyen`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sağlık Bakanlığı Ruhsatlı Haşere İlaçlama',
            url: `${BASE_URL}/hizmetler/hasere-ve-dezenfeksiyon`,
          },
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Faz 58 — WebSite + SearchAction
// ---------------------------------------------------------------------------

export function webSiteSchema(): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Alo Yönetim Tesis ve Site Yönetimi',
    alternateName: ['Alo Yönetim', 'Alo Yonetim', 'Alo Yönetim A.Ş.'],
    url: BASE_URL,
    publisher: { '@id': ORG_ID },
    inLanguage: ['tr-TR', 'en-US', 'ru-RU', 'ar-SA'],
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/sozluk?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    ],
  };
}

export function professionalServiceSchema(opts?: {
  name?: string;
  description?: string;
  path?: string;
  areaServed?: string | JsonLdObject;
  aggregateRating?: RatingInput;
  knowsAbout?: any[];
}): JsonLdObject {
  const path = opts?.path ? (opts.path.startsWith('http') ? opts.path : `${BASE_URL}${opts.path}`) : BASE_URL;
  const id = opts?.path ? `${path}#professionalservice` : LOCALBUSINESS_ID;

  return {
    '@type': 'ProfessionalService',
    '@id': id,
    name: opts?.name ?? ORG_NAME,
    image: ORG_LOGO,
    url: path,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    priceRange: ORG_PRICE_RANGE,
    ...(opts?.description ? { description: opts.description } : {}),
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    hasMap: 'https://www.google.com/maps?q=Alo+Yönetim+Kadıköy',
    areaServed: opts?.areaServed
      ? (typeof opts.areaServed === 'string' ? { '@type': 'AdministrativeArea', name: opts.areaServed } : opts.areaServed)
      : AREA_SERVED_GEOCIRCLE,
    parentOrganization: { '@id': ORG_ID },
    knowsAbout: opts?.knowsAbout ?? [
      { '@type': 'Thing', name: 'Tesis Yönetimi (Facility Management)', sameAs: 'https://www.wikidata.org/wiki/Q1391515' },
      { '@type': 'Thing', name: 'ISO 41001 Tesis Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q108846399' },
      { '@type': 'Thing', name: 'Bina Otomasyonu ve Yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q895066' },
    ],
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
      : {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '150',
            bestRating: '5',
            worstRating: '1',
          },
        }),
  };
}

// ---------------------------------------------------------------------------
// Faz 44/45 — Service + hasOfferCatalog + Offer
// ---------------------------------------------------------------------------

export function credentialSchema(): JsonLdObject {
  return {
    '@type': 'ItemList',
    name: 'Alo Yönetim Akreditasyon & Sertifikalar',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 41001:2018 Entegre Tesis Yönetim Sistemi',
          description: 'ISO 41001:2018 standardına uygun entegre tesis yönetim sistemi belgelendirmesi.',
          recognizedBy: { '@type': 'Organization', name: 'Türk Standartları Enstitüsü (TSE)' },
          credentialCategory: 'certificate',
          about: { '@type': 'Thing', name: 'Tesis Yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q108846399' },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'EducationalOccupationalCredential',
          name: '634 Sayılı KMK Uyum Belgesi',
          description: 'Kat Mülkiyeti Kanunu\'na tam uyumlu yönetim protokolü.',
          recognizedBy: { '@type': 'Organization', name: 'T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı' },
          credentialCategory: 'certificate',
          about: { '@type': 'Thing', name: 'Kat Mülkiyeti Kanunu', sameAs: 'https://www.wikidata.org/wiki/Q161851' },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'EducationalOccupationalCredential',
          name: '5188 Sayılı Kanun Özel Güvenlik Faaliyet İzin Belgesi',
          description: 'T.C. İçişleri Bakanlığı onaylı 5188 sayılı kanun kapsamlı özel güvenlik faaliyet izni.',
          recognizedBy: { '@type': 'Organization', name: 'T.C. İçişleri Bakanlığı' },
          credentialCategory: 'license',
          about: { '@type': 'Thing', name: '5188 Özel Güvenlik Kanunu', sameAs: 'https://www.wikidata.org/wiki/Q20967015' },
        },
      },
    ],
  };
}
