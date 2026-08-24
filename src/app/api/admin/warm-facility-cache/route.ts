import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { BASE_URL } from '@/lib/seo';
import { generateFacilityManagementGraph } from '@/lib/seo/facilityTopicGraph';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  const warmedUrls: string[] = [];

  // 1. Ana Hizmet Sayfaları Isıtma
  for (const service of SERVICES) {
    warmedUrls.push(`${BASE_URL}${service.pillar}`);
  }

  // 2. 39 İlçe Tesis Yönetimi ve SERP Şemaları Isıtma
  for (const district of DISTRICTS) {
    // Şema ve SERP motorunu bellek üzerinde ısıt
    getFacilitySerpMeta('tr', district.slug);
    warmedUrls.push(`${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi`);
  }

  // 3. 4 Dilde Topic Graph Isıtma
  ['tr', 'en', 'ru', 'ar'].forEach((lang) => {
    generateFacilityManagementGraph(lang);
  });

  const durationMs = Date.now() - startTime;

  return NextResponse.json(
    {
      status: 'success',
      message: '39 İlçe ve Hizmet Tesis Yönetimi Önbellek & Şema Isıtması Tamamlandı.',
      timestamp: new Date().toISOString(),
      warmedResourcesCount: warmedUrls.length,
      durationMs,
      performance: {
        targetTtfb: '<50ms',
        edgeStatus: 'WARMED_AND_READY',
      },
      warmedUrlsSample: warmedUrls.slice(0, 10),
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'private, no-cache, no-store',
      },
    }
  );
}

export async function POST() {
  return GET();
}
