import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS, getDistrictDues } from '@/data/districts';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 saat ISR

/**
 * İstanbul 39 İlçe Tesis Yönetimi & Aidat Açık Veri İndeksi API'si (/api/tesis-yonetimi/dues-index.json)
 * Gazeteciler, gayrimenkul veri analistleri, emlak portalları ve arama motorları için
 * İstanbul'un 39 ilçesindeki m² aidat piyasa verilerini ve Alo Yönetim tasarruf oranlarını yayınlar.
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
    const norm = sideFilter.toLowerCase();
    if (norm === 'anadolu') {
      selectedDistricts = DISTRICTS.filter((d) => d.side === 'Anadolu');
    } else if (norm === 'avrupa') {
      selectedDistricts = DISTRICTS.filter((d) => d.side === 'Avrupa');
    }
  }

  const anatolianDistricts = selectedDistricts.filter((d) => d.side === 'Anadolu');
  const europeanDistricts = selectedDistricts.filter((d) => d.side === 'Avrupa');

  const districtData = selectedDistricts.map((d) => {
    const dues = getDistrictDues(d.slug);
    return {
      district: d.name,
      slug: d.slug,
      side: d.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası',
      population: d.population,
      marketAverageM2Dues: dues.avgDuesM2,
      aloYonetimOptimizedM2Dues: dues.aloDuesM2,
      savingsPercentage: dues.savingsRate,
      annualSavingsEstimatedFor100Units: Math.round(dues.avgDuesM2 * 100 * (dues.savingsRate / 100) * 12 * 80),
      canonicalUrl: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: d.geo.lat,
        longitude: d.geo.lng,
      },
    };
  });

  const avgMarketIstanbul = districtData.length
    ? Math.round(districtData.reduce((sum, d) => sum + d.marketAverageM2Dues, 0) / districtData.length)
    : 0;
  const avgAloIstanbul = districtData.length
    ? Math.round(districtData.reduce((sum, d) => sum + d.aloYonetimOptimizedM2Dues, 0) / districtData.length)
    : 0;
  const avgSavingsRate = districtData.length
    ? Math.round(districtData.reduce((sum, d) => sum + d.savingsPercentage, 0) / districtData.length)
    : 0;

  const payload = {
    title: 'İstanbul 39 İlçe Tesis Yönetimi ve Aidat Açık Veri İndeksi 2026',
    publisher: 'Alo Yönetim ve Organizasyon A.Ş. — Mali Teftiş & Veri Masası',
    license: 'CC BY-SA 4.0 (Açık Kaynak Atıflı Veri)',
    lastUpdated: new Date().toISOString(),
    methodology: '634 Sayılı KMK m.20 ve ISO 41001 standartlarında 340+ aktif yönetilen proje ve bölge saha analizleri.',
    istanbulSummary: {
      totalDistricts: selectedDistricts.length,
      anatolianCount: anatolianDistricts.length,
      europeanCount: europeanDistricts.length,
      istanbulAverageMarketDuesM2: `₺${avgMarketIstanbul}`,
      istanbulAverageAloOptimizedDuesM2: `₺${avgAloIstanbul}`,
      averageCostSavingsRate: `%${avgSavingsRate}`,
      filteredSide: sideFilter || 'All',
    },
    districts: districtData,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'İstanbul 39 İlçe Tesis Yönetimi ve Aidat Açık Veri İndeksi 2026',
      description: 'İstanbul genelindeki 39 ilçenin konut başına ortalama m² aidat piyasa verileri ve profesyonel tesis yönetimi ile sağlanan tasarruf oranları.',
      url: `${BASE_URL}/api/tesis-yonetimi/dues-index.json`,
      inLanguage: 'tr-TR',
      license: 'https://creativecommons.org/licenses/by-sa/4.0/',
      isAccessibleForFree: true,
      temporalCoverage: '2026',
      keywords: [
        'tesis yönetimi',
        'aidat endeksi',
        'istanbul aidat ortalamaları',
        'apartman ve site yönetimi',
        'facility management dues istanbul',
        'konut aidat raporu 2026',
        'kat mülkiyeti kanunu',
      ],
      variableMeasured: [
        'Piyasa Ortalama Aidat (TL/m²)',
        'Alo Yönetim Optimize Aidat (TL/m²)',
        'Maliyet Tasarruf Oranı (%)',
        'İlçe Nüfusu',
      ],
      creator: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Alo Yönetim',
        legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo.png`,
        telephone: '+90 216 755 35 35',
      },
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: `${BASE_URL}/api/tesis-yonetimi/dues-index.json`,
        },
      ],
      spatialCoverage: {
        '@type': 'Place',
        name: 'İstanbul',
        sameAs: 'https://www.wikidata.org/wiki/Q406',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 41.0082,
          longitude: 28.9784,
        },
      },
    },
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
