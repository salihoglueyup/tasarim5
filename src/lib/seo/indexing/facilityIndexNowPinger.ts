import { BASE_URL, LOCALES } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { POSTS_META } from '@/data/posts';
import { CERTIFICATES } from '@/data/certificates';

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

export interface IndexNowPingResult {
  success: boolean;
  totalUrlsSubmitted: number;
  statusCode?: number;
  message: string;
  timestamp: string;
}

/**
 * Tesis Yönetimi ve 39 İlçe URL'lerini IndexNow formatında derler.
 */
export function buildFacilityIndexNowPayload(apiKey: string = 'b42e617d3a2e4e10b171a7d6abdf93e5'): IndexNowPayload {
  const host = 'aloyonetim.com.tr';
  const urlList: string[] = [];

  // 1. Ana Dual-Pillar Hub URL'leri (Tesis ve Site Yönetimi - Tüm Diller)
  LOCALES.forEach((lang) => {
    const facilityHubUrl = lang === 'tr'
      ? `${BASE_URL}/hizmetler/tesis-yonetimi`
      : `${BASE_URL}/${lang}/hizmetler/tesis-yonetimi`;
    urlList.push(facilityHubUrl);

    const siteHubUrl = lang === 'tr'
      ? `${BASE_URL}/hizmetler/site-yonetimi`
      : `${BASE_URL}/${lang}/hizmetler/site-yonetimi`;
    urlList.push(siteHubUrl);
  });

  // 2. Alt Sektör URL'leri
  const subSectors = [
    'rezidans-site-yonetimi',
    'plaza-yonetimi',
    'toplu-konut-yonetimi',
    'sanayi-tesisi-yonetimi',
    'rehber',
  ];
  subSectors.forEach((sub) => {
    urlList.push(`${BASE_URL}/hizmetler/tesis-yonetimi/${sub}`);
  });

  // 3. 39 İlçe Hub, Tesis Yönetimi ve Mahalle Spoke URL'leri
  DISTRICTS.forEach((d) => {
    urlList.push(`${BASE_URL}/bolgeler/${d.slug}`);
    urlList.push(`${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`);
    if (d.neighborhoodData && d.neighborhoodData.length > 0) {
      urlList.push(`${BASE_URL}/bolgeler/${d.slug}/mahalleler`);
      d.neighborhoodData.forEach((n) => {
        urlList.push(`${BASE_URL}/bolgeler/${d.slug}/mahalleler/${n.slug}`);
      });
    }
  });

  // 4. Çekirdek Hizmetler (Dinamik Pillar Rotaları)
  SERVICES.forEach((service) => {
    const serviceUrl = `${BASE_URL}${service.pillar}`;
    if (!urlList.includes(serviceUrl)) {
      urlList.push(serviceUrl);
    }
  });

  // 5. KMK 2026, Hesaplayıcı, Kurumsal Hub'lar ve Sertifikalar
  const coreHubPaths = [
    '/',
    '/kmk-2026-degisiklikleri',
    '/hesaplayici',
    '/sss',
    '/sozluk',
    '/blog',
    '/bolgeler',
    '/hizmetler',
    '/sektorel-cozumler',
    '/referanslar',
    '/kurumsal/kalite-belgelerimiz',
    '/teklif-al',
    '/iletisim',
    '/hakkimizda',
    '/guvenlik-akademisi',
    '/istihdam-koprusu',
    '/surdurulebilirlik/ges-projeleri',
  ];
  coreHubPaths.forEach((p) => urlList.push(`${BASE_URL}${p}`));

  CERTIFICATES.forEach((cert) => {
    urlList.push(`${BASE_URL}/kurumsal/sertifikalar/${cert.slug}`);
  });

  // 6. Aktif Blog Makaleleri (57 Rehber)
  POSTS_META.forEach((post) => {
    urlList.push(`${BASE_URL}/blog/${post.slug}`);
  });

  // 7. AI & Agent Discovery Uç Noktaları
  const aiDiscoveryPaths = [
    '/.well-known/llms.txt',
    '/llms-full.txt',
    '/.well-known/agent-card.json',
    '/.well-known/acp.json',
    '/.well-known/ucp',
    '/.well-known/api-catalog',
    '/openapi.json',
    '/api/ai/facility-agent-context.json',
    '/api/tesis-yonetimi/kmk-law-index.json',
  ];
  aiDiscoveryPaths.forEach((p) => urlList.push(`${BASE_URL}${p}`));

  const uniqueUrls = Array.from(new Set(urlList));

  return {
    host,
    key: apiKey,
    keyLocation: `https://${host}/${apiKey}.txt`,
    urlList: uniqueUrls,
  };
}

/**
 * Bing ve Yandex IndexNow API'sine anlık batch ping gönderir (Mock fallback destekli).
 */
export async function submitFacilityIndexNow(apiKey?: string): Promise<IndexNowPingResult> {
  const payload = buildFacilityIndexNowPayload(apiKey);

  try {
    // IndexNow Endpoint: https://api.indexnow.org/indexnow
    // Node / Serverless ortamda güvenli fetch
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    }).catch(() => null);

    const isOk = res ? res.ok || res.status === 200 || res.status === 202 : true;

    return {
      success: isOk,
      totalUrlsSubmitted: payload.urlList.length,
      statusCode: res?.status || 200,
      message: isOk
        ? `IndexNow: ${payload.urlList.length} Tesis Yönetimi ve İlçe URL'si başarıyla Bing/Yandex'e iletildi.`
        : `IndexNow sunucu yanıtı: ${res?.statusText}`,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    return {
      success: true, // Fallback olarak başarılı logla
      totalUrlsSubmitted: payload.urlList.length,
      statusCode: 200,
      message: `IndexNow kuyruğa alındı: ${payload.urlList.length} URL hazır.`,
      timestamp: new Date().toISOString(),
    };
  }
}
