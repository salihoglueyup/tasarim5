import { BASE_URL, LOCALES } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';

export interface FacilityEdgeHeaders {
  'Cache-Control': string;
  'Surrogate-Control'?: string;
  'ETag': string;
  'Last-Modified': string;
  'Link': string;
  'X-Robots-Tag': string;
  'X-Facility-Authority-Score': string;
  'X-Facility-Coverage': string;
}

/**
 * Tesis Yönetimi verilerinin (39 İlçe, KMK, Yargıtay emsalleri) checksum'ını hesaplar.
 */
export function generateFacilityContentHash(): string {
  const payload = JSON.stringify({
    districtsCount: DISTRICTS.length,
    precedentsCount: YARGITAY_LEGAL_PRECEDENTS.length,
    firstPrecedent: YARGITAY_LEGAL_PRECEDENTS[0]?.id || '',
    version: '2026-v2',
  });

  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 32bit integer
  }
  return `W/"fac-${Math.abs(hash).toString(36)}"`
}

/**
 * Tesis yönetimi ana ve ilçe sayfaları için Edge ve Bot seviyesinde HTTP başlıkları üretir.
 */
export function buildFacilityEdgeHeaders(
  pathname: string = '/hizmetler/tesis-yonetimi',
  lang: string = 'tr',
  isBot: boolean = false
): FacilityEdgeHeaders {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = lang === 'tr'
    ? `${BASE_URL}${cleanPath}`
    : `${BASE_URL}/${lang}${cleanPath}`;

  // RFC 8288 standardında Link başlıkları
  const linkParts: string[] = [
    `<${canonicalUrl}>; rel="canonical"`,
  ];

  LOCALES.forEach((l) => {
    const altUrl = l === 'tr'
      ? `${BASE_URL}${cleanPath}`
      : `${BASE_URL}/${l}${cleanPath}`;
    linkParts.push(`<${altUrl}>; rel="alternate"; hreflang="${l}"`);
  });
  linkParts.push(`<${BASE_URL}${cleanPath}>; rel="alternate"; hreflang="x-default"`);

  const nowUtc = new Date().toUTCString();
  const etag = generateFacilityContentHash();

  const cacheControl = isBot
    ? 'public, max-age=7200, s-maxage=86400, stale-while-revalidate=604800'
    : 'public, max-age=3600, s-maxage=14400, stale-while-revalidate=86400';

  return {
    'Cache-Control': cacheControl,
    'Surrogate-Control': 'max-age=86400',
    'ETag': etag,
    'Last-Modified': nowUtc,
    'Link': linkParts.join(', '),
    'X-Robots-Tag': 'all, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'X-Facility-Authority-Score': '99.4',
    'X-Facility-Coverage': 'Istanbul-39-Districts',
  };
}
