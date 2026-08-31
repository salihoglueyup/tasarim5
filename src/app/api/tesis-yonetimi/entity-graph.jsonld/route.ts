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
  const districtNodes = DISTRICTS.map((d) => ({
    '@type': 'AdministrativeArea',
    '@id': `${BASE_URL}/bolgeler/${d.slug}#area`,
    name: `${d.name}, İstanbul`,
    containedInPlace: {
      '@type': 'City',
      name: 'İstanbul',
      sameAs: 'https://www.wikidata.org/wiki/Q406',
    },
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
      sameAs: 'https://www.wikidata.org/wiki/Q1544458', // Yargıtay Wikidata
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
        name: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
        logo: `${BASE_URL}/icon.png`,
        foundingDate: '2009',
        telephone: '+902165504848',
        email: 'info@aloyonetim.com.tr',
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
            recognizedBy: {
              '@type': 'Organization',
              name: 'International Organization for Standardization (ISO)',
              sameAs: 'https://www.wikidata.org/wiki/Q108846399',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: '5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi',
            recognizedBy: {
              '@type': 'GovernmentOrganization',
              name: 'T.C. İçişleri Bakanlığı',
              sameAs: 'https://www.wikidata.org/wiki/Q6084013',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'TSE HYB 12850 Tesis Hizmet Yeterlilik Belgesi',
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
      ...precedentsNodes,
    ],
  };

  return NextResponse.json(graphPayload, {
    status: 200,
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all',
    },
  });
}
