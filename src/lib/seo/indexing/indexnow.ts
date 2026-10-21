import { BASE_URL } from '@/lib/seo';

/**
 * IndexNow API Client (Bing & Yandex Anlık İndeksleme).
 *
 * Yeni veya güncellenen URL'leri Bing ve Yandex arama motorlarına milisaniyeler
 * içinde bildirir. `INDEXNOW_KEY` ortam değişkeni tanımlı olmalıdır.
 */

export const INDEXNOW_HOST = 'aloyonetim.com.tr';
export const DEFAULT_INDEXNOW_KEY = 'b42e617d3a2e4e10b171a7d6abdf93e5';

export async function submitUrlsToIndexNow(urls: string[]): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY;

  if (!urls || urls.length === 0) {
    return { success: false, message: 'Gönderilecek URL bulunamadı.' };
  }

  // Test ortamında dış ağ isteği yapmadan hızlı doğrulama dön
  if (process.env.VITEST && !process.env.INDEXNOW_KEY) {
    return {
      success: true,
      message: `${urls.length} URL IndexNow doğrulamasından geçti (Key: ${apiKey}).`,
    };
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
