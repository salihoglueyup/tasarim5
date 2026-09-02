import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Faz 239: Web Vitals Beacon Alıcı Uç Noktası (/api/analytics/vitals)
 * Tarayıcıdan gönderilen Core Web Vitals metriklerini sessizce kabul eder (204 No Content).
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (rawBody) {
      const metrics = JSON.parse(rawBody);
      // Metrikleri prodüksiyon loglarına veya telemetriye yönlendirebiliriz
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals Beacon] ${metrics.url}: LCP=${metrics.lcp}ms, CLS=${metrics.cls}, FCP=${metrics.fcp}ms`);
      }
    }
  } catch {
    // Beacon hatası sessizce yutulur
  }

  return new NextResponse(null, { status: 204 });
}
