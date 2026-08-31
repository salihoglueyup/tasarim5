import { BASE_URL, LOCALES, type Locale } from '@/lib/seo';
import { CANONICAL_NAP } from './napGuardEngine';

export interface EdgeSeoHeaderOptions {
  noindex?: boolean;
  nofollow?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
}

/**
 * RFC 8288 standardında HTTP Link başlığı üretir (Canonical + Hreflangs).
 * Googlebot ve Bingbot henüz HTML DOM'unu parse etmeden önce en üst seviyede
 * kanonik ve çok dilli eşleşmeleri anında okur.
 */
export function buildHttpLinkHeader(pathname: string, currentLang: string = 'tr'): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  
  // Dili path'ten temizle (örn: /en/hizmetler -> /hizmetler)
  const segments = cleanPath.split('/').filter(Boolean);
  const hasLangSegment = LOCALES.includes(segments[0] as Locale);
  const bareSegments = hasLangSegment ? segments.slice(1) : segments;
  const barePath = `/${bareSegments.join('/')}`;

  const canonicalUrl = currentLang === 'tr'
    ? `${BASE_URL}${barePath === '/' ? '' : barePath}`
    : `${BASE_URL}/${currentLang}${barePath === '/' ? '' : barePath}`;

  const linkElements: string[] = [
    `<${canonicalUrl}>; rel="canonical"`,
  ];

  // Alternatif diller için Hreflang Link başlıkları
  LOCALES.forEach((lang) => {
    const langUrl = lang === 'tr'
      ? `${BASE_URL}${barePath === '/' ? '' : barePath}`
      : `${BASE_URL}/${lang}${barePath === '/' ? '' : barePath}`;
    
    linkElements.push(`<${langUrl}>; rel="alternate"; hreflang="${lang}"`);
  });

  // x-default (Türkçe ana sürüm)
  const defaultUrl = `${BASE_URL}${barePath === '/' ? '' : barePath}`;
  linkElements.push(`<${defaultUrl}>; rel="alternate"; hreflang="x-default"`);

  // AI & LLM Arama Motoru Bağlam Keşfi (GEO - Generative Engine Optimization)
  linkElements.push(`<${BASE_URL}/llms.txt>; rel="describedby"; type="text/plain"`);
  linkElements.push(`<${BASE_URL}/api/tesis-yonetimi/entity-graph.jsonld>; rel="alternate"; type="application/ld+json"`);
  linkElements.push(`<${BASE_URL}/api/tesis-yonetimi/geo-feed.xml>; rel="alternate"; type="application/xml"`);

  return linkElements.join(', ');
}

/**
 * X-Robots-Tag başlığı üretir.
 */
export function buildXRobotsTag(options: EdgeSeoHeaderOptions = {}): string {
  if (options.noindex) {
    return options.nofollow ? 'noindex, nofollow' : 'noindex, follow';
  }

  const parts = ['all'];
  parts.push(`max-image-preview:${options.maxImagePreview || 'large'}`);
  parts.push(`max-snippet:${options.maxSnippet !== undefined ? options.maxSnippet : -1}`);
  parts.push(`max-video-preview:${options.maxVideoPreview !== undefined ? options.maxVideoPreview : -1}`);

  return parts.join(', ');
}

/**
 * Edge veya API rotalarında kullanılmak üzere toplu SEO HTTP başlıkları üretir.
 */
export function generateEdgeSeoHeaders(
  pathname: string,
  lang: string = 'tr',
  options: EdgeSeoHeaderOptions = {}
): Record<string, string> {
  const languageTag = lang === 'en' ? 'en-US' : lang === 'ru' ? 'ru-RU' : lang === 'ar' ? 'ar-SA' : 'tr-TR';

  return {
    'Link': buildHttpLinkHeader(pathname, lang),
    'X-Robots-Tag': buildXRobotsTag(options),
    'Content-Language': languageTag,
    'X-Content-Type-Options': 'nosniff',
    'X-SEO-Engine': 'Alo-Yonetim-Edge-SEO-V5',
    'X-AI-Citation': `${CANONICAL_NAP.legal.legalName} (${BASE_URL})`,
    'X-Legal-Entity': `${CANONICAL_NAP.legal.legalName} | MERSIS: ${CANONICAL_NAP.legal.mersisNumber} | ITO: ${CANONICAL_NAP.legal.tradeRegistryNumber}`,
    'X-NAP-Source': `${BASE_URL}/#organization`,
    'X-SLA-Guarantee': '15-25 min emergency response across 39 districts',
  };
}
