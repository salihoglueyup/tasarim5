import { BASE_URL } from '@/lib/constants';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? 'aloyonetim-indexnow-key';

/**
 * Otomatik IndexNow Bildirim Motoru (Auto-IndexNow)
 * 
 * Veritabanında yeni bir içerik eklendiğinde veya güncellendiğinde
 * arama motorlarına (Bing, Yandex, Seznam, Naver) anında tarama sinyali gönderir.
 * 
 * @param paths Gönderilecek URL yolları veya tam linkler (Örn: `['/blog/yeni-yazi', '/sss']`)
 */
export async function notifyIndexNow(paths: string | string[]): Promise<boolean> {
  try {
    const rawList = Array.isArray(paths) ? paths : [paths];
    if (rawList.length === 0) return false;

    const fullUrls = rawList.map((p) =>
      p.startsWith('http') ? p : `${BASE_URL}${p.startsWith('/') ? '' : '/'}${p}`
    );

    const host = new URL(BASE_URL).host;

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: fullUrls,
    };

    // Faz 141: Bing, Yandex ve IndexNow küresel API uçlarına eşzamanlı bildirim
    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ];

    Promise.allSettled(
      endpoints.map((endpoint) =>
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        })
      )
    ).catch((err) => {
      console.error('Auto-IndexNow broadcast ping error:', err);
    });

    return true;
  } catch (error) {
    console.error('Auto-IndexNow execution error:', error);
    return false;
  }
}
