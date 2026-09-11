import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Google Knowledge Graph ve Linked Data Robotları için
 * 39 İlçe, ISO 41001, KMK 634 ve Wikidata Varlıklarını bağlayan devasa JSON-LD Graph.
 */
export async function GET() {
  const neighborhoodNodes = DISTRICTS.flatMap((d) =>
    (d.neighborhoodData || []).map((n) => ({
      '@type': 'Neighborhood',
      '@id': `${BASE_URL}/bolgeler/${d.slug}/mahalleler/${n.slug}#neighborhood`,
      name: `${n.name}, ${d.name}, İstanbul`,
      containedInPlace: {
        '@id': `${BASE_URL}/bolgeler/${d.slug}#area`,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: n.geo?.lat ?? d.geo.lat,
        longitude: n.geo?.lng ?? d.geo.lng,
      },
      url: `${BASE_URL}/bolgeler/${d.slug}/mahalleler/${n.slug}`,
      description: n.intro,
    }))
  );

  const districtNodes = DISTRICTS.map((d) => ({
    '@type': 'AdministrativeArea',
    '@id': `${BASE_URL}/bolgeler/${d.slug}#area`,
    name: `${d.name}, İstanbul`,
    containedInPlace: {
      '@type': 'City',
      name: 'İstanbul',
      sameAs: 'https://www.wikidata.org/wiki/Q406',
    },
    containsPlace: (d.neighborhoodData || []).map((n) => ({
      '@id': `${BASE_URL}/bolgeler/${d.slug}/mahalleler/${n.slug}#neighborhood`,
    })),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: d.geo.lat,
      longitude: d.geo.lng,
    },
    url: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
  }));

  const precedentsNodes = YARGITAY_LEGAL_PRECEDENTS.map((p) => ({
    '@type': 'Legislation',
    '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#${p.id}`,
    name: p.subject,
    legislationType: 'Court Precedent',
    legislationPassedBy: {
      '@type': 'GovernmentOrganization',
      name: p.court,
      sameAs: 'https://www.wikidata.org/wiki/Q1549429', // Yargıtay Wikidata (T.C. Yargıtay Başkanlığı)
    },
    legislationIdentifier: `${p.docketNumber} / ${p.decisionNumber}`,
    datePublished: p.decisionDate,
  }));

  const graphPayload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Alo Yönetim',
        legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
        alternateName: ['Alo Yönetim', 'Alo Tesis Yönetimi', 'Alo Yönetim A.Ş.'],
        url: BASE_URL,
        logo: `${BASE_URL}/icon.png`,
        foundingDate: '2009',
        telephone: '+90 216 550 48 48',
        email: 'info@aloyonetim.com.tr',
        publishingPrinciples: `${BASE_URL}/hakkimizda`,
        knowsAbout: [
          'https://www.wikidata.org/wiki/Q1273919', // Entegre Tesis Yönetimi
          'https://www.wikidata.org/wiki/Q1391515', // Gayrimenkul / Mülk Yönetimi
          'https://www.wikidata.org/wiki/Q11440',   // Özel Güvenlik
          'https://www.wikidata.org/wiki/Q161851',  // Kat Mülkiyeti Kanunu (KMK 634)
          'https://www.wikidata.org/wiki/Q6085270', // İcra ve İflas Kanunu (İİK 68)
          'https://www.wikidata.org/wiki/Q381156',  // Enerji Verimliliği ve Bina Yalıtımı
          'https://www.wikidata.org/wiki/Q1065908', // Yangın Güvenliği ve Acil Durum Yönetimi
        ],
        sameAs: [
          'https://www.instagram.com/aloyonetim',
          'https://www.linkedin.com/company/aloyonetim',
          'https://www.facebook.com/aloyonetim',
          'https://twitter.com/aloyonetim',
          'https://www.youtube.com/@aloyonetim',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: 340,
          bestRating: '5',
          worstRating: '1',
          itemReviewed: {
            '@type': 'Organization',
            name: 'Alo Yönetim',
            telephone: '+90 216 550 48 48',
          },
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Misak-ı Milli Sok. No:94A',
          addressLocality: 'Kadıköy',
          addressRegion: 'İstanbul',
          postalCode: '34714',
          addressCountry: 'TR',
        },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'ISO 41001:2018 Entegre Tesis Yönetim Sistemi',
            url: `${BASE_URL}/kurumsal/kalite-belgelerimiz#iso-41001`,
            credentialCategory: 'FacilityManagementSystem',
            recognizedBy: {
              '@type': 'Organization',
              name: 'International Organization for Standardization (ISO)',
              sameAs: 'https://www.wikidata.org/wiki/Q108846399',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'ISO 9001:2015 Kalite Yönetim Sistemi',
            url: `${BASE_URL}/kurumsal/kalite-belgelerimiz#iso-9001`,
            credentialCategory: 'QualityManagementSystem',
            recognizedBy: {
              '@type': 'Organization',
              name: 'International Organization for Standardization (ISO)',
              sameAs: 'https://www.wikidata.org/wiki/Q11029',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'ISO 14001:2015 Çevre Yönetim Sistemi',
            url: `${BASE_URL}/kurumsal/sertifikalar/iso-14001`,
            credentialCategory: 'EnvironmentalManagementSystem',
            recognizedBy: {
              '@type': 'Organization',
              name: 'International Organization for Standardization (ISO)',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi',
            url: `${BASE_URL}/kurumsal/sertifikalar/iso-45001`,
            credentialCategory: 'OccupationalHealthAndSafety',
            recognizedBy: {
              '@type': 'Organization',
              name: 'International Organization for Standardization (ISO)',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'ISO 27001:2022 Bilgi Güvenliği Yönetimi',
            url: `${BASE_URL}/kurumsal/kalite-belgelerimiz#iso-27001`,
            credentialCategory: 'InformationSecurityManagement',
            recognizedBy: {
              '@type': 'Organization',
              name: 'International Organization for Standardization (ISO)',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'ISO 10002:2018 Müşteri Memnuniyeti Yönetimi',
            url: `${BASE_URL}/kurumsal/sertifikalar/iso-10002`,
            credentialCategory: 'CustomerSatisfactionManagement',
            recognizedBy: {
              '@type': 'Organization',
              name: 'International Organization for Standardization (ISO)',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: '5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi',
            url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
            credentialCategory: 'PrivateSecurityLicense',
            recognizedBy: {
              '@type': 'GovernmentOrganization',
              name: 'T.C. İçişleri Bakanlığı',
              sameAs: 'https://www.wikidata.org/wiki/Q6084013',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'TSE HYB 12850 Tesis Hizmet Yeterlilik Belgesi',
            url: `${BASE_URL}/kurumsal/kalite-belgelerimiz#tse-12850`,
            credentialCategory: 'ServicePlaceCompetence',
            recognizedBy: {
              '@type': 'GovernmentOrganization',
              name: 'Türk Standardları Enstitüsü (TSE)',
              sameAs: 'https://www.wikidata.org/wiki/Q7855364',
            },
          },
        ],
        areaServed: districtNodes.map((d) => ({ '@id': d['@id'] })),
      },
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#service`,
        name: 'Entegre Tesis Yönetimi',
        serviceType: 'Facility Management',
        provider: { '@id': `${BASE_URL}/#organization` },
        sameAs: 'https://www.wikidata.org/wiki/Q1273919', // Facility Management Wikidata
        termsOfService: `${BASE_URL}/kullanim-sartlari`,
        areaServed: districtNodes.map((d) => ({ '@id': d['@id'] })),
      },
      ...districtNodes,
      ...neighborhoodNodes,
      ...precedentsNodes,
    ],
  };

  return NextResponse.json(graphPayload, {
    status: 200,
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
