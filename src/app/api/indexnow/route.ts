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

const INDEXNOW_KEY = '5a2b1c3d4e5f6g7h8i9j0k1l2m3n4o5p'; // Güvenlik için statik bir anahtar (32+ karakter)
const HOST = 'aloyonetim.com.tr';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL parametresi eksik.' }, { status: 400 });
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
