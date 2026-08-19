import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 saat önbellek

/**
 * RFC 7946 Programmatic GeoJSON Regional Map API (/api/geo/districts.geojson)
 * 
 * Google Maps, Apple Maps, OpenStreetMap ve yerel coğrafi arama motorları için
 * İstanbul'un tüm ilçelerindeki Alo Yönetim tesis ve özel güvenlik hizmet masalarını
 * standart GeoJSON FeatureCollection formatında sunar.
 */
export async function GET() {
  const features = DISTRICTS.map((d) => ({
    type: 'Feature' as const,
    id: `aloyonetim-region-${d.slug}`,
    geometry: {
      type: 'Point' as const,
      coordinates: [d.geo.lng, d.geo.lat] // GeoJSON formatı: [boylam, enlem]
    },
    properties: {
      name: d.name,
      slug: d.slug,
      side: d.side,
      population: d.population,
      managedProjects: d.managedProjects,
      priority: d.priority,
      title: `Alo Yönetim ${d.name} Şubesi & 5188 Güvenlik Masası`,
      description: d.intro,
      url: `${BASE_URL}/bolgeler/${d.slug}`,
      securityServiceUrl: `${BASE_URL}/bolgeler/${d.slug}/guvenlik-yonetimi`,
      facilityServiceUrl: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
      cleaningServiceUrl: `${BASE_URL}/bolgeler/${d.slug}/temizlik-ve-hijyen`,
      duesServiceUrl: `${BASE_URL}/bolgeler/${d.slug}/aidat-takibi`,
      neighborhoods: d.neighborhoods,
      localNeeds: d.localNeeds,
      phone: '+902165504848',
      provider: 'Alo Yönetim ve Organizasyon A.Ş.'
    }
  }));

  const geoJson = {
    type: 'FeatureCollection' as const,
    name: 'AloYonetim_Istanbul_Service_Districts',
    crs: {
      type: 'name' as const,
      properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
      }
    },
    metadata: {
      provider: 'Alo Yönetim ve Organizasyon A.Ş.',
      website: BASE_URL,
      totalDistricts: DISTRICTS.length,
      coverage: 'İstanbul (Anadolu ve Avrupa Yakası)',
      generatedAt: new Date().toISOString()
    },
    features
  };

  return NextResponse.json(geoJson, {
    status: 200,
    headers: {
      'Content-Type': 'application/geo+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
