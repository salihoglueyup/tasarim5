import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 86400;

/**
 * Google Chrome Private Prefetch Proxy Protocol (traffic-advice)
 * 
 * Google Arama motorunda kullanıcı Alo Yönetim sonuçlarını gördüğünde 
 * Chrome'un sayfayı arka planda 0ms gecikmeyle (Instant Navigation) 
 * güvenli bir şekilde önden yüklemesine (prefetch) izin verir.
 */
export async function GET() {
  const trafficAdvice = [
    {
      user_agent: 'prefetch-proxy',
      fraction: 1.0
    }
  ];

  return new NextResponse(JSON.stringify(trafficAdvice), {
    status: 200,
    headers: {
      'Content-Type': 'application/trafficadvice+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
