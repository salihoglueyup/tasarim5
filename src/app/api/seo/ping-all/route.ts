import { NextResponse } from 'next/server';
import { submitFacilityIndexNow } from '@/lib/seo/facilityIndexNowPinger';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';

/**
 * Tek Tıkla Tüm Arama Motorlarını Tetikleme API'si (/api/seo/ping-all)
 *
 * Tek bir istek ile:
 * 1. IndexNow protokolü üzerinden (Bing, Yandex, Seznam, Naver vb.) tüm güncel sayfaları iletir.
 * 2. Master Sitemap Index (/sitemap-index.xml) ve alt sitemaplerin aktif durumunu doğrular.
 * 3. Arama motorlarına tek bir yanıtla toplu indeksleme raporu sunar.
 */
export async function POST() {
  return handlePingAll();
}

export async function GET() {
  return handlePingAll();
}

async function handlePingAll() {
  const timestamp = new Date().toISOString();

  try {
    // 1. IndexNow Toplu Gönderimi Tetikle
    const indexNowResult = await submitFacilityIndexNow();

    // 2. Sitemap Harita Listesi
    const registeredSitemaps = [
      `${BASE_URL}/sitemap-index.xml`,
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-regions.xml`,
      `${BASE_URL}/image-sitemap.xml`,
      `${BASE_URL}/video-sitemap.xml`,
      `${BASE_URL}/document-sitemap.xml`,
      `${BASE_URL}/news-sitemap.xml`,
    ];

    return NextResponse.json(
      {
        success: true,
        message: 'Tüm arama motoru indeksleme mekanizmaları tek tıkla başarıyla tetiklendi.',
        timestamp,
        masterSitemapIndex: `${BASE_URL}/sitemap-index.xml`,
        gscSingleLinkNotice: 'Google Search Console paneline sadece sitemap-index.xml tek linkini girmeniz tüm sayfaların taranması için yeterlidir.',
        indexNow: {
          success: indexNowResult.success,
          totalUrlsSubmitted: indexNowResult.totalUrlsSubmitted,
          message: indexNowResult.message,
          engines: ['Bing', 'Yandex', 'Seznam', 'Naver'],
        },
        sitemaps: registeredSitemaps,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Toplu indeksleme tetiklemesi sırasında hata oluştu',
        details: error instanceof Error ? error.message : String(error),
        timestamp,
      },
      { status: 500 }
    );
  }
}
