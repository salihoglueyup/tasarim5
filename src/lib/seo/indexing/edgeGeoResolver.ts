import { DISTRICTS, District, getDistrictDues } from '@/data/districts';
import type { NeighborhoodInfo } from '@/data/districts/types';
import { BASE_URL } from '@/lib/seo';

export interface NearestHubResult {
  nearestDistrict: {
    name: string;
    slug: string;
    side: 'Anadolu' | 'Avrupa';
    canonicalUrl: string;
  };
  nearestNeighborhood?: {
    name: string;
    slug: string;
    canonicalUrl: string;
    distanceKm: number;
    neighborhoodSlaMinutes?: number;
    characteristics: string[];
    geo?: { lat: number; lng: number };
  };
  duesData: {
    avgDuesM2: number;
    aloDuesM2: number;
    savingsRate: number;
  };
  distanceKm: number;
  estimatedSlaMinutes: number;
  emergencyHotline: string;
  schema: {
    '@context': string;
    '@type': string;
    name: string;
    telephone: string;
    url: string;
    priceRange: string;
    currenciesAccepted?: string;
    parentOrganization?: {
      '@type': string;
      '@id': string;
      name: string;
      legalName: string;
      url: string;
    };
    openingHoursSpecification?: {
      '@type': string;
      dayOfWeek: string[];
      opens: string;
      closes: string;
    };
    geo: {
      '@type': string;
      latitude: number;
      longitude: number;
    };
    address: {
      '@type': string;
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
    areaServed?: string[];
  };
}

function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Dünya yarıçapı (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Verilen koordinatlara en yakın Alo Yönetim ilçe ve mahalle operasyon merkezini, yerel aidat verisini ve SLA süresini hesaplar.
 * 169 mahalle koordinatını tarayarak hiper-yerel mobil ekip ve "Near-Me" yerel SEO sinyali üretir.
 */
export function findNearestFacilityHub(lat: number, lng: number): NearestHubResult {
  let nearestDistrict: District = DISTRICTS[0];
  let minDistrictDistance = Infinity;

  let nearestNeighborhoodInfo: NeighborhoodInfo | null = null;
  let nearestNeighborhoodDistrict: District = DISTRICTS[0];
  let minNeighborhoodDistance = Infinity;

  for (const d of DISTRICTS) {
    // 1. İlçe merkez mesafesi
    if (d.geo?.lat && d.geo?.lng) {
      const dist = calculateHaversineDistance(lat, lng, d.geo.lat, d.geo.lng);
      if (dist < minDistrictDistance) {
        minDistrictDistance = dist;
        nearestDistrict = d;
      }
    }

    // 2. 169 Mahalle bağımsız GPS koordinat mesafesi
    if (d.neighborhoodData && d.neighborhoodData.length > 0) {
      for (const n of d.neighborhoodData) {
        if (n.geo?.lat && n.geo?.lng) {
          const nDist = calculateHaversineDistance(lat, lng, n.geo.lat, n.geo.lng);
          if (nDist < minNeighborhoodDistance) {
            minNeighborhoodDistance = nDist;
            nearestNeighborhoodInfo = n;
            nearestNeighborhoodDistrict = d;
          }
        }
      }
    }
  }

  // Eğer en yakın mahalle saptandıysa ve mesafesi makulse, ilçe de bu mahallenin ilçesi olarak hizalanabilir
  if (nearestNeighborhoodInfo && minNeighborhoodDistance < minDistrictDistance) {
    nearestDistrict = nearestNeighborhoodDistrict;
  }

  // SLA süresi: İlçe geneli acil müdahale SLA standardı 25 - 45 dakika arası
  const estimatedSla = Math.min(45, Math.max(25, Math.round(20 + minDistrictDistance * 1.2)));
  // Mahalle düzeyinde direkt mobil ekip SLA süresi: 15 - 25 dakika
  const neighborhoodSla = minNeighborhoodDistance <= 3.5
    ? Math.min(25, Math.max(15, Math.round(15 + minNeighborhoodDistance * 1.5)))
    : estimatedSla;

  const dues = getDistrictDues(nearestDistrict.slug);

  const nearestNeighborhood = nearestNeighborhoodInfo
    ? {
        name: nearestNeighborhoodInfo.name,
        slug: nearestNeighborhoodInfo.slug,
        canonicalUrl: `${BASE_URL}/bolgeler/${nearestDistrict.slug}/mahalleler/${nearestNeighborhoodInfo.slug}`,
        distanceKm: minNeighborhoodDistance === Infinity ? 0 : minNeighborhoodDistance,
        neighborhoodSlaMinutes: neighborhoodSla,
        characteristics: nearestNeighborhoodInfo.characteristics || [],
        geo: nearestNeighborhoodInfo.geo,
      }
    : undefined;

  const finalGeoLat = nearestNeighborhoodInfo?.geo?.lat || nearestDistrict.geo.lat;
  const finalGeoLng = nearestNeighborhoodInfo?.geo?.lng || nearestDistrict.geo.lng;

  const hubDisplayName = nearestNeighborhoodInfo
    ? `Alo Yönetim ${nearestDistrict.name} / ${nearestNeighborhoodInfo.name} Tesis Operasyon Merkezi`
    : `Alo Yönetim ${nearestDistrict.name} Tesis Operasyon Merkezi`;

  const hubUrl = `${BASE_URL}/bolgeler/${nearestDistrict.slug}/tesis-yonetimi`;

  const areaServed = [nearestDistrict.name];
  if (nearestNeighborhoodInfo) {
    areaServed.push(`${nearestNeighborhoodInfo.name} Mahallesi`);
  }

  return {
    nearestDistrict: {
      name: nearestDistrict.name,
      slug: nearestDistrict.slug,
      side: nearestDistrict.side,
      canonicalUrl: `${BASE_URL}/bolgeler/${nearestDistrict.slug}/tesis-yonetimi`,
    },
    nearestNeighborhood,
    duesData: {
      avgDuesM2: dues.avgDuesM2,
      aloDuesM2: dues.aloDuesM2,
      savingsRate: dues.savingsRate,
    },
    distanceKm: minDistrictDistance === Infinity ? 0 : minDistrictDistance,
    estimatedSlaMinutes: estimatedSla,
    emergencyHotline: '+90 (216) 550 48 48',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: hubDisplayName,
      telephone: '+90 216 550 48 48',
      url: hubUrl,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY',
      parentOrganization: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Alo Yönetim',
        legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
      },
      openingHoursSpecification: {
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
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: finalGeoLat,
        longitude: finalGeoLng,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: nearestNeighborhoodInfo ? `${nearestNeighborhoodInfo.name}, ${nearestDistrict.name}` : nearestDistrict.name,
        addressRegion: 'İstanbul',
        addressCountry: 'TR',
      },
      areaServed,
    },
  };
}

