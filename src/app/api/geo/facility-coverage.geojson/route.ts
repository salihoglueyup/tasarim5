import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400; // Günde bir yenile (ISR)

const DISTRICT_SLA_MINUTES: Record<string, number> = {
  kadikoy: 25,
  besiktas: 25,
  sisli: 30,
  uskudar: 30,
  atasehir: 30,
  bakirkoy: 35,
  maltepe: 35,
  kartal: 35,
  umraniye: 35,
  fatih: 35,
  beyoglu: 35,
  zeytinburnu: 40,
  eyupsultan: 40,
  basaksehir: 40,
  beylikduzu: 45,
  pendik: 45,
  cekmekoy: 45,
  sancaktepe: 45,
  tuzla: 50,
  esenyurt: 45,
  sariyer: 40,
};

export async function GET() {
  const features = DISTRICTS.map((district) => {
    const slaMinutes = DISTRICT_SLA_MINUTES[district.slug] || 45;
    const lat = district.geo?.lat || 41.0082;
    const lng = district.geo?.lng || 28.9784;

    return {
      type: 'Feature',
      id: `TR-34-${district.slug.toUpperCase()}`,
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
      properties: {
        districtName: district.name,
        slug: district.slug,
        region: district.side,
        coverageStatus: 'Full Operational Coverage (Aktif Tam Kapsama)',
        serviceLevelAgreement: {
          emergencyResponseTimeMinutes: slaMinutes,
          standardResponseTimeHours: 2,
          routineMaintenanceFrequency: 'Haftalık / Aylık Periyodik',
        },
        accreditations: [
          'ISO 41001:2018 Uluslararası Entegre Tesis Yönetimi',
          'ISO 9001:2015 Kalite Yönetim Sistemi',
          '5188 Sayılı Kanun Valilik Lisanslı Özel Güvenlik',
          'TSE HYB 12850 Tesis Bakım Hizmet Yeri Yeterlilik',
        ],
        canonicalUrls: {
          facilityManagement: `${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi`,
          securityManagement: `${BASE_URL}/bolgeler/${district.slug}/guvenlik-yonetimi`,
          technicalMaintenance: `${BASE_URL}/bolgeler/${district.slug}/teknik-bakim`,
          cleaningHygiene: `${BASE_URL}/bolgeler/${district.slug}/temizlik-ve-hijyen`,
          districtHub: `${BASE_URL}/bolgeler/${district.slug}`,
        },
        sampleNeighborhoods: district.neighborhoods.slice(0, 5),
        primaryLocalNeeds: district.localNeeds,
      },
    };
  });

  const geoJsonData = {
    type: 'FeatureCollection',
    name: 'Alo Yonetim 39 Ilce Tesis Yonetimi Operasyonel Kapsama Agi',
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
      },
    },
    metadata: {
      generatedAt: new Date().toISOString(),
      organization: 'Alo Yönetim ve Organizasyon A.Ş.',
      headquarters: 'Kadıköy, İstanbul, Türkiye',
      totalDistrictsCovered: DISTRICTS.length,
      scope: 'İstanbul (39 İlçe)',
      standard: 'ISO 41001:2018 Facility Management Spatial Grid',
      contactPhone: '+902165504848',
      officialWebsite: BASE_URL,
    },
    features,
  };

  return NextResponse.json(geoJsonData, {
    status: 200,
    headers: {
      'Content-Type': 'application/geo+json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'X-Geo-Standard': 'RFC-7946-GeoJSON',
    },
  });
}
