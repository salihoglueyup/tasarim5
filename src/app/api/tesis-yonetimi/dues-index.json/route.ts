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
export async function GET() {
  const anatolianDistricts = DISTRICTS.filter((d) => d.side === 'Anadolu');
  const europeanDistricts = DISTRICTS.filter((d) => d.side === 'Avrupa');

  const districtData = DISTRICTS.map((d) => {
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
    };
  });

  const avgMarketIstanbul = Math.round(
    districtData.reduce((sum, d) => sum + d.marketAverageM2Dues, 0) / districtData.length
  );
  const avgAloIstanbul = Math.round(
    districtData.reduce((sum, d) => sum + d.aloYonetimOptimizedM2Dues, 0) / districtData.length
  );
  const avgSavingsRate = Math.round(
    districtData.reduce((sum, d) => sum + d.savingsPercentage, 0) / districtData.length
  );

  const payload = {
    title: 'İstanbul 39 İlçe Tesis Yönetimi ve Aidat Açık Veri İndeksi 2026',
    publisher: 'Alo Yönetim ve Organizasyon A.Ş. — Mali Teftiş & Veri Masası',
    license: 'CC BY-SA 4.0 (Açık Kaynak Atıflı Veri)',
    lastUpdated: new Date().toISOString(),
    methodology: '634 Sayılı KMK m.20 ve ISO 41001 standartlarında 340+ aktif yönetilen proje ve bölge saha analizleri.',
    istanbulSummary: {
      totalDistricts: DISTRICTS.length,
      anatolianCount: anatolianDistricts.length,
      europeanCount: europeanDistricts.length,
      istanbulAverageMarketDuesM2: `₺${avgMarketIstanbul}`,
      istanbulAverageAloOptimizedDuesM2: `₺${avgAloIstanbul}`,
      averageCostSavingsRate: `%${avgSavingsRate}`,
    },
    districts: districtData,
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all',
    },
  });
}
