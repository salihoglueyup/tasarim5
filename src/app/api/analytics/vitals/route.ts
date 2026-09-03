import { NextRequest, NextResponse } from 'next/server';
import {
  recordRumMetric,
  getWebVitalsRumSummary,
  VitalMetricName,
} from '@/lib/performance/webVitalsRumEngine';

export const dynamic = 'force-dynamic';

/**
 * Faz 239 & Faz 242: Web Vitals RUM (Real User Monitoring) Beacon ve Analiz Uç Noktası
 * POST /api/analytics/vitals -> Beacon ile metrik toplar (204 No Content)
 * GET /api/analytics/vitals  -> Gerçek kullanıcı CWV özetini ve p75 metriklerini döner
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (rawBody) {
      const data = JSON.parse(rawBody);

      // Metrik adı eşleşmesi (name veya metric alanı)
      const metricName = (data.name || data.metric || 'LCP').toUpperCase() as VitalMetricName;
      const value = typeof data.value === 'number' ? data.value : parseFloat(data.value || '0');

      if (!isNaN(value)) {
        recordRumMetric({
          name: metricName,
          value,
          rating: data.rating,
          url: data.url || '/',
          id: data.id,
          delta: data.delta,
          navigationType: data.navigationType,
        });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`[RUM Web Vitals] ${data.url || '/'}: ${metricName}=${value}`);
      }
    }
  } catch {
    // Beacon hataları istemciyi etkilememesi için sessizce yönetilir
  }

  return new NextResponse(null, { status: 204 });
}

export async function GET() {
  const summary = getWebVitalsRumSummary();

  return NextResponse.json(
    {
      status: 'success',
      reportTitle: 'Alo Yönetim Real User Monitoring (RUM) Core Web Vitals (Faz 242)',
      summary,
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
