import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '../audits/napGuardEngine';

export interface EdgeSeoHeaderOptions {
  noindex?: boolean;
  nofollow?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
}

/**
 * RFC 8288 HTTP Link başlığı (keşif bağlantıları).
 * Canonical ve hreflang bilinçli olarak burada YOK: yalnızca HTML <head> içinde,
 * indeksleme politikasına (lib/seo/indexPolicy.ts) uygun biçimde üretilirler.
 * İki kaynaktan farklı canonical/hreflang göndermek Google'ın ikisini de yok saymasına yol açar.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildHttpLinkHeader(_pathname: string, _currentLang: string = 'tr'): string {
  const linkElements: string[] = [];

  // AI & LLM Arama Motoru Bağlam Keşfi (GEO - Generative Engine Optimization)
  linkElements.push(`<${BASE_URL}/llms.txt>; rel="describedby"; type="text/plain"`);
  linkElements.push(`<${BASE_URL}/api/tesis-yonetimi/entity-graph.jsonld>; rel="alternate"; type="application/ld+json"`);
  linkElements.push(`<${BASE_URL}/api/tesis-yonetimi/geo-feed.xml>; rel="alternate"; type="application/xml"`);
  linkElements.push(`<${BASE_URL}/opensearch.xml>; rel="search"; type="application/opensearchdescription+xml"`);
  linkElements.push(`<${BASE_URL}/feed.xml>; rel="alternate"; type="application/rss+xml"; title="Alo Yönetim RSS"`);
  linkElements.push(`<https://pubsubhubbub.appspot.com/>; rel="hub"`);

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
    'X-Coverage-Scope': '39 Districts, 169 Neighborhoods across Istanbul',
    'Server-Timing': 'edge;desc="Alo-Edge-Cache";dur=1, seo;desc="Metadata-Resolved";dur=1',
  };
}
