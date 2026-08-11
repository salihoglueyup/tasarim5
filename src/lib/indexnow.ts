import { BASE_URL } from './seo';

/**
 * IndexNow API Client (Bing & Yandex Anlık İndeksleme).
 *
 * Yeni veya güncellenen URL'leri Bing ve Yandex arama motorlarına milisaniyeler
 * içinde bildirir. `INDEXNOW_KEY` ortam değişkeni tanımlı olmalıdır.
 */

export const INDEXNOW_HOST = 'aloyonetim.com.tr';

export async function submitUrlsToIndexNow(urls: string[]): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.INDEXNOW_KEY;

  if (!apiKey) {
    return { success: false, message: 'INDEXNOW_KEY ortam değişkeni tanımlı değil.' };
  }

  if (!urls || urls.length === 0) {
    return { success: false, message: 'Gönderilecek URL bulunamadı.' };
  }

  const endpoint = 'https://api.indexnow.org/indexnow';
  const payload = {
    host: INDEXNOW_HOST,
    key: apiKey,
    keyLocation: `${BASE_URL}/${apiKey}.txt`,
    urlList: urls.map((u) => (u.startsWith('http') ? u : `${BASE_URL}${u}`)),
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return { success: true, message: `${urls.length} URL başarıyla IndexNow servisine iletildi.` };
    }

    return {
      success: false,
      message: `IndexNow API yanıt hatası (Status: ${response.status})`,
    };
  } catch (error: any) {
    return { success: false, message: `IndexNow isteği başarısız: ${error?.message || error}` };
  }
}
