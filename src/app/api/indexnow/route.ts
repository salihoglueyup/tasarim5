import { NextResponse } from 'next/server';

/**
 * IndexNow API Endpoint (SEO Motoru - Anında İndeksleme Tetikleyicisi)
 * 
 * Microsoft (Bing), Yandex, Seznam ve IndexNow destekleyen tüm arama motorlarına
 * tekli veya toplu URL için anında tarama talebi (ping) gönderir.
 * 
 * @example
 * POST /api/indexnow
 * Body: { url: "https://aloyonetim.com.tr/kurumsal/kalite-belgelerimiz" }
 * veya
 * Body: { urls: ["https://aloyonetim.com.tr/bolgeler/kadikoy", "https://aloyonetim.com.tr/guvenlik-akademisi"] }
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? 'aloyonetim-indexnow-key';
const HOST = 'aloyonetim.com.tr';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawUrls = body.urls || body.urlList || (body.url ? [body.url] : []);

    if (!Array.isArray(rawUrls) || rawUrls.length === 0) {
      return NextResponse.json(
        { error: 'Geçerli bir "url" veya "urls" dizisi parametresi zorunludur.' },
        { status: 400 }
      );
    }

    // URL'leri filtrele ve doğrula
    const validUrls = rawUrls.filter(
      (u) => typeof u === 'string' && u.startsWith('http')
    );

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'En az bir geçerli mutlak HTTP/HTTPS URL girilmelidir.' },
        { status: 400 }
      );
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: validUrls,
    };

    // IndexNow API'ye gönder
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `${validUrls.length} URL için IndexNow anında indeksleme talebi başarıyla iletildi.`,
        submittedUrls: validUrls,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `IndexNow API yanıtı: ${response.statusText}`,
          statusCode: response.status,
        },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Bilinmeyen hata.' }, { status: 500 });
  }
}

/**
 * GET /api/indexnow?scope=security | all
 * Otomatik olarak Güvenlik Yönetimi ana sayfası, akademisi ve tüm 48 ilçe güvenlik URL'lerini IndexNow'a bildirir.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const scope = searchParams.get('scope') || 'security';

    const { DISTRICTS } = await import('@/data/districts');

    let urlsToPing: string[] = [];

    if (scope === 'security' || scope === 'all') {
      urlsToPing.push(
        `https://${HOST}/hizmetler/guvenlik-yonetimi`,
        `https://${HOST}/guvenlik-akademisi`,
        `https://${HOST}/blog/site-guvenligi-icin-5188-kanunu-kapsami-2026`,
        `https://${HOST}/blog/guvenlik-yonetimi-hizmeti-rehberi-2026`
      );

      DISTRICTS.forEach((d) => {
        urlsToPing.push(`https://${HOST}/bolgeler/${d.slug}/guvenlik-yonetimi`);
      });
    }

    if (scope === 'all') {
      urlsToPing.push(
        `https://${HOST}/`,
        `https://${HOST}/hizmetler`,
        `https://${HOST}/bolgeler`,
        `https://${HOST}/sozluk`,
        `https://${HOST}/hesaplayici`,
        `https://${HOST}/teklif-al`
      );
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urlsToPing,
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: response.ok || response.status === 200 || response.status === 202,
      scope,
      totalUrls: urlsToPing.length,
      sampleUrls: urlsToPing.slice(0, 5),
      status: response.status,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Bilinmeyen hata.' }, { status: 500 });
  }
}
