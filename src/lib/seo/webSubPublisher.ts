import { BASE_URL } from '@/lib/seo';

export interface WebSubNotificationResult {
  hubUrl: string;
  topicUrl: string;
  success: boolean;
  statusCode?: number;
  error?: string;
}

const DEFAULT_HUBS = [
  'https://pubsubhubbub.appspot.com/',
  'https://pubsubhubbub.superfeedr.com/',
];

/**
 * Google ve arama motorlarının resmi WebSub Hub'larına anlık yayın (Publish) bildirimi gönderir.
 * Bu sayede yeni bir tesis yönetimi yazısı veya ilçe güncellemesi yapıldığında botlar dakikalar içinde tetiklenir.
 */
export async function notifyWebSubHubs(
  topicPath: string = '/feed/tesis-yonetimi.xml',
  customHubs: string[] = DEFAULT_HUBS
): Promise<WebSubNotificationResult[]> {
  const topicUrl = topicPath.startsWith('http') ? topicPath : `${BASE_URL}${topicPath}`;
  const results: WebSubNotificationResult[] = [];

  for (const hubUrl of customHubs) {
    try {
      const bodyParams = new URLSearchParams({
        'hub.mode': 'publish',
        'hub.url': topicUrl,
      });

      const response = await fetch(hubUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'User-Agent': 'Alo-Yonetim-WebSub-Publisher/1.0',
        },
        body: bodyParams.toString(),
        signal: AbortSignal.timeout(5000), // 5 sn timeout
      });

      results.push({
        hubUrl,
        topicUrl,
        success: response.status >= 200 && response.status < 300,
        statusCode: response.status,
      });
    } catch (err: any) {
      results.push({
        hubUrl,
        topicUrl,
        success: false,
        error: err?.message || 'WebSub connection failed',
      });
    }
  }

  return results;
}
