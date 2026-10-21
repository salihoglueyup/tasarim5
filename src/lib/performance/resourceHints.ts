/**
 * v9 Hyper-Speed Resource Hints Configuration
 * Fontlar ve ikonlar kendi alan adımızdan (public/fonts, public/icons) sunulur.
 * Analitik betikleri (GTM/GA4/Clarity) ilk kullanıcı etkileşimine kadar ertelendiği için
 * ilk SSR HTML'de kullanılmayan dış origin ipucu (dns-prefetch) basılmaz.
 */

export interface ResourceHint {
  rel: 'preconnect' | 'dns-prefetch' | 'preload';
  href: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  as?: string;
}

export const EXTERNAL_CDN_HINTS: ResourceHint[] = [];

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
