import { NextResponse } from 'next/server';

/**
 * IndexNow API Endpoint (SEO Faz 5)
 * 
 * Microsoft (Bing), Yandex ve diğer arama motorlarına anında indeksleme talebi (ping) gönderir.
 * 
 * @example
 * POST /api/indexnow
 * Body: { url: "https://aloyonetim.com.tr/tr/blog/yeni-makale" }
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? '';
const HOST = 'aloyonetim.com.tr';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL parametresi eksik.' }, { status: 400 });
    }

    if (!INDEXNOW_KEY) {
      return NextResponse.json({ error: 'IndexNow key yapılandırılmamış.' }, { status: 503 });
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: [url]
    };

    // IndexNow API'ye gönder
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Ping başarıyla gönderildi.' });
    } else {
      return NextResponse.json({ success: false, error: response.statusText }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
