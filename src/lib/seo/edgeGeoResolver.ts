import { DISTRICTS, District, getDistrictDues } from '@/data/districts';
import { BASE_URL } from '@/lib/seo';

export interface NearestHubResult {
  nearestDistrict: {
    name: string;
    slug: string;
    side: 'Anadolu' | 'Avrupa';
    canonicalUrl: string;
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
 * Verilen koordinatlara en yakın Alo Yönetim ilçe operasyon merkezini, yerel aidat verisini ve SLA süresini hesaplar.
 */
export function findNearestFacilityHub(lat: number, lng: number): NearestHubResult {
  let nearestDistrict: District = DISTRICTS[0];
  let minDistance = Infinity;

  for (const d of DISTRICTS) {
    if (d.geo?.lat && d.geo?.lng) {
      const dist = calculateHaversineDistance(lat, lng, d.geo.lat, d.geo.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestDistrict = d;
      }
    }
  }

  // SLA süresi: mesafeye göre 25 - 45 dakika arası
  const estimatedSla = Math.min(45, Math.max(25, Math.round(20 + minDistance * 1.2)));
  const dues = getDistrictDues(nearestDistrict.slug);

  return {
    nearestDistrict: {
      name: nearestDistrict.name,
      slug: nearestDistrict.slug,
      side: nearestDistrict.side,
      canonicalUrl: `${BASE_URL}/bolgeler/${nearestDistrict.slug}/tesis-yonetimi`,
    },
    duesData: {
      avgDuesM2: dues.avgDuesM2,
      aloDuesM2: dues.aloDuesM2,
      savingsRate: dues.savingsRate,
    },
    distanceKm: minDistance === Infinity ? 0 : minDistance,
    estimatedSlaMinutes: estimatedSla,
    emergencyHotline: '+90 (216) 550 48 48',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `Alo Yönetim ${nearestDistrict.name} Tesis Operasyon Merkezi`,
      telephone: '+90 216 550 48 48',
      url: `${BASE_URL}/bolgeler/${nearestDistrict.slug}/tesis-yonetimi`,
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
        latitude: nearestDistrict.geo.lat,
        longitude: nearestDistrict.geo.lng,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: nearestDistrict.name,
        addressRegion: 'İstanbul',
        addressCountry: 'TR',
      },
    },
  };
}
