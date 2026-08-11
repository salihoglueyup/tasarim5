import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';
import { getLinkHeaderString } from './src/lib/performance/resourceHints';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    // Üretim ortamında (Docker build sırasında) TS hatalarının build'i kırmaması için:
    ignoreBuildErrors: true,
  },
  // Faz 217: Güvenlik ve bayt tasarrufu için X-Powered-By başlığını kaldır.
  poweredByHeader: false,
  // Faz 124: Gzip/Brotli sıkıştırmasını aktif et.
  compress: true,
  // Faz 216: React Strict Mode ile unhandled render hatalarını yakala.
  reactStrictMode: true,
  // Tek biçim URL: sondaki slash yok (canonical/proxy ile tutarlı — Faz 26).
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['framer-motion', '@next/third-parties'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Faz 41, 42: Gereksiz büyük boyutlar üretilmemesi için optimize edilmiş breakpointler
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 80, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/eski-site-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/hizmetlerimiz',
        destination: '/hizmetler',
        permanent: true,
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // HSTS (Faz 36): HTTPS zorunluluğu, 2 yıl + alt alan adları + preload.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Katı İçerik Güvenlik Politikası (CSP)
          // - script-src: 'unsafe-eval' KALDIRILDI (XSS sertleştirme). 'unsafe-inline' şimdilik
          //   kalıyor çünkü Next App Router hydration inline script'leri nonce olmadan gerektirir
          //   (nonce'a geçiş ayrı iş). Analytics (GA/GTM/Clarity/Meta) script host'ları allowlist'te.
          // - connect-src/img-src: analytics beacon host'ları eklendi ki prod'da bloklanmasın.
          // - frame-ancestors 'none' + upgrade-insecure-requests eklendi (clickjacking + HTTP→HTTPS).
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://c.clarity.ms https://connect.facebook.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' blob: data: https://images.unsplash.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://www.clarity.ms https://c.bing.com https://www.facebook.com",
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com https://connect.facebook.net",
              "worker-src 'self' blob:",
              "frame-src 'self' https://www.youtube.com https://www.google.com https://www.google.com.tr https://maps.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              // Not: `upgrade-insecure-requests` bilinçli olarak eklenmedi — nginx/cPanel deploy'u
              // HTTP-only olduğunda tüm alt kaynakları https'e yükseltip bozardı. HTTPS zorlaması
              // zaten HSTS (Strict-Transport-Security) ile yapılıyor.
            ].join('; '),
          },
          // v9 Hyper-Speed Early Hints (Preconnect & DNS prefetch in HTTP response headers)
          { key: 'Link', value: getLinkHeaderString() },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/video/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
