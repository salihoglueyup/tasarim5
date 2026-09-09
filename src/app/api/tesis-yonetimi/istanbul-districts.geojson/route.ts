import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 Saat ISR

/**
 * İstanbul 39 İlçe Tesis Yönetimi Saha & Operasyon GeoJSON Uç Noktası
 * Standart: RFC 7946 GeoJSON FeatureCollection (https://datatracker.ietf.org/doc/html/rfc7946)
 */
export async function GET(req: Request) {
  let sideFilter: string | null = null;

  if (req && req.url) {
    try {
      const { searchParams } = new URL(req.url);
      sideFilter = searchParams.get('side');
    } catch {
      // noop
    }
  }

  let selectedDistricts = DISTRICTS;
  if (sideFilter) {
    const cleanSide = sideFilter.trim().toLowerCase();
    if (cleanSide === 'anadolu') {
      selectedDistricts = selectedDistricts.filter((d) => d.side === 'Anadolu');
    } else if (cleanSide === 'avrupa') {
      selectedDistricts = selectedDistricts.filter((d) => d.side === 'Avrupa');
    }
  }

  const features = selectedDistricts.map((d) => {
    const slaMinutes = ['kadikoy', 'uskudar', 'besiktas', 'sisli', 'atasehir'].includes(d.slug)
      ? 30
      : ['bakirkoy', 'maltepe', 'umraniye', 'kartal', 'sariyer'].includes(d.slug)
      ? 35
      : 45;

    return {
      type: 'Feature' as const,
      id: d.slug,
      geometry: {
        type: 'Point' as const,
        coordinates: [d.geo.lng, d.geo.lat], // RFC 7946 standardı: [longitude, latitude]
      },
      properties: {
        districtName: d.name,
        slug: d.slug,
        side: d.side,
        population: d.population,
        managedProjects: d.managedProjects,
        slaMinutes,
        emergencyResponseTime: `${slaMinutes} Dakika`,
        primaryNeeds: d.localNeeds.slice(0, 3),
        neighborhoodCount: d.neighborhoods.length,
        canonicalUrl: `${BASE_URL}/bolgeler/${d.slug}`,
        facilityManagementUrl: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
        googleMapsQuery: `https://www.google.com/maps/search/?api=1&query=${d.geo.lat},${d.geo.lng}`,
      },
    };
  });

  const geoJson = {
    type: 'FeatureCollection' as const,
    metadata: {
      title: 'Alo Yönetim İstanbul 39 İlçe Tesis Yönetimi Saha Ağı',
      description: 'İstanbul genelinde 39 ilçe için GPS merkez koordinatları, SLA süreleri ve aktif tesis yönetimi projeleri.',
      license: 'https://opendatacommons.org/licenses/by/1-0/',
      updatedAt: '2026-09-01T00:00:00Z',
      crs: {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
        },
      },
      totalFeatures: features.length,
    },
    features,
  };

  return NextResponse.json(geoJson, {
    status: 200,
    headers: {
      'Content-Type': 'application/geo+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      'X-GeoJSON-Version': 'RFC-7946',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
