/**
 * v9 Hyper-Speed Resource Hints Configuration
 * Fontlar ve ikonlar kendi alan adımızdan (public/fonts, public/icons) sunulur.
 * Canlı ortamda Cloudflare Web Analytics (static.cloudflareinsights.com) betiği
 * kullanıldığı için yalnızca bu kritik dış origin için preconnect/dns-prefetch tanımlanır.
 */

export interface ResourceHint {
  rel: 'preconnect' | 'dns-prefetch' | 'preload';
  href: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  as?: string;
}

export const EXTERNAL_CDN_HINTS: ResourceHint[] = [
  { rel: 'preconnect', href: 'https://static.cloudflareinsights.com', crossOrigin: 'anonymous' },
  { rel: 'dns-prefetch', href: 'https://static.cloudflareinsights.com' },
];

/**
 * Next.js HTTP Response Headers için formatlayıcı yardımcı (next.config.ts veya ara katman kullanımına uygun)
 */
export function getLinkHeaderString(): string {
  return EXTERNAL_CDN_HINTS.map((hint) => {
    let str = `<${hint.href}>; rel="${hint.rel}"`;
    if (hint.crossOrigin) {
      str += `; crossorigin`;
    }
    return str;
  }).join(', ');
}
