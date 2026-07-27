/**
 * v9 Hyper-Speed Resource Hints Configuration
 * Bu modül, tarayıcının sayfa ilk yüklenirken (Cold Start) harici CDN sunucularıyla
 * SSL/TLS el sıkışmasını (handshake) önceden başlatması için merkezi ağ ipuçlarını barındırır.
 * 
 * Amaç: TTFB (Time to First Byte) ve FCP (First Contentful Paint) sürelerinde
 * 100-200 milisaniyelik ağ el sıkışma kazancı sağlamak (Zero-Latency Handshake).
 */

export interface ResourceHint {
  rel: 'preconnect' | 'dns-prefetch' | 'preload';
  href: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  as?: string;
}

export const EXTERNAL_CDN_HINTS: ResourceHint[] = [
  // Google Fonts & Material Symbols CDN (Preconnect — el sıkışmayı hemen başlatır)
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },

  // Unsplash Görsel Sunucuları (Preconnect — görseller için tünel açar)
  { rel: 'preconnect', href: 'https://images.unsplash.com' },

  // Google Analytics & Tag Manager (DNS Prefetch — DNS çözümlemesini arka planda bitirir)
  { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
  { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },

  // Microsoft Clarity & Facebook Analitik CDN (DNS Prefetch)
  { rel: 'dns-prefetch', href: 'https://www.clarity.ms' },
  { rel: 'dns-prefetch', href: 'https://c.bing.com' },
  { rel: 'dns-prefetch', href: 'https://connect.facebook.net' },
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
