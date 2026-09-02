import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';
import { getLinkHeaderString } from './src/lib/performance/resourceHints';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: true, // Standalone Docker ve CDN ortamlarında 404 MIME hatalarını engelle
});

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false,
  },
  // Faz 217: Güvenlik ve bayt tasarrufu için X-Powered-By başlığını kaldır.
  poweredByHeader: false,
  // Faz 124: Gzip/Brotli sıkıştırmasını aktif et.
  compress: true,
  // Faz 216: React Strict Mode ile unhandled render hatalarını yakala.
  reactStrictMode: true,
  // Tek biçim URL: sondaki slash yok (canonical/proxy ile tutarlı — Faz 26).
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    // Faz 81 & Faz 82: App Router staleTimes ile istemci belleği şişmesini önleme ve hızlı geri/ileri navigasyonu
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
    // Faz 87: optimizePackageImports ile barrel export şişkinliğini önleme
    optimizePackageImports: [
      'framer-motion',
      '@next/third-parties',
      'lucide-react',
      'date-fns',
      'clsx',
      'tailwind-merge',
      'canvas-confetti',
      'ioredis',
      'react-hook-form',
      'zod',
      'jose',
      '@hookform/resolvers',
      '@tiptap/react',
      '@tiptap/starter-kit'
    ],
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
        source: '/hizmetler/site-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/site-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/bina-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/apartman-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/mulk-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/site-yonetim-sirketleri',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/site-yonetim-firmalari',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/site-yonetim-sirketi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/site-yonetim-firmasi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/tesis-yonetim-sirketleri',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/tesis-yonetim-firmalari',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/tesis-yonetim-sirketi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/tesis-yonetim-firmasi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/bina-yonetim-sirketleri',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/bina-yonetim-firmalari',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/apartman-yonetim-sirketleri',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/apartman-yonetim-firmalari',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/apartman-yonetim-sirketi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/apartman-yonetim-firmasi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/profesyonel-site-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/entegre-tesis-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/tesis-isletmeciligi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/site-isletme-yonetimi',
        destination: '/hizmetler/tesis-yonetimi',
        permanent: true,
      },
      {
        source: '/hizmetlerimiz',
        destination: '/hizmetler',
        permanent: true,
      },
      {
        source: '/iletisim-gec',
        destination: '/iletisim',
        permanent: true,
      },
      {
        source: '/kurumsal',
        destination: '/hakkimizda',
        permanent: true,
      },
      {
        source: '/kurumsal/hakkimizda',
        destination: '/hakkimizda',
        permanent: true,
      },
      {
        source: '/hizmetler/hasere-kontrol',
        destination: '/hizmetler/hasere-ve-dezenfeksiyon',
        permanent: true,
      },
      {
        source: '/referanslarimiz',
        destination: '/referanslar',
        permanent: true,
      },
      {
        source: '/blog-yazilari',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/servisler',
        destination: '/hizmetler',
        permanent: true,
      },
      // Legacy URL düzeltmeleri — GSC 404 & Otorite Kurtarma
      {
        source: '/kullanim-kosullari',
        destination: '/kullanim-sartlari',
        permanent: true,
      },
      {
        source: '/kullanim-kosullari/:path*',
        destination: '/kullanim-sartlari/:path*',
        permanent: true,
      },
      // Google'da 1. ve 3. sırada olan eski sayfaların otorite aktarımı (SEO Master Plan)
      {
        source: '/site-apartman-guvenligi',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/ozel-guvenlik',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/site-guvenligi',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/apartman-guvenligi',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/site-guvenlik-sirketleri',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/guvenlik-sirketleri',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/fiziki-guvenlik',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/5188-ozel-guvenlik',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/guvenlik-hizmetleri',
        destination: '/hizmetler/guvenlik-yonetimi',
        permanent: true,
      },
      {
        source: '/guvenlik-kursu-egitimi',
        destination: '/guvenlik-akademisi',
        permanent: true,
      },
      {
        source: '/ev-ofis-temizligi',
        destination: '/hizmetler/temizlik-ve-hijyen',
        permanent: true,
      },
      // Yüksek gösterimli eski WordPress tag & kategori arşivleri
      {
        source: '/tag/guvenlik-egitimi',
        destination: '/guvenlik-akademisi',
        permanent: true,
      },
      {
        source: '/tag/guvenlik-kursu',
        destination: '/guvenlik-akademisi',
        permanent: true,
      },
      {
        source: '/tag/:tag*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/:cat*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true,
      },
      // Eski haber/blog linklerini (.html) yeni blog sayfasına yönlendir
      {
        source: '/:id(\\d+)/:slug*.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:id/:slug.html',
        destination: '/blog',
        permanent: true,
      },
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
          // Faz 185: Sıkılaştırılmış İçerik Güvenlik Politikası (Tightened Content Security Policy)
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV !== 'production' ? "'unsafe-eval' " : ''}https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://c.clarity.ms https://connect.facebook.net`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' blob: data: https://images.unsplash.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://www.clarity.ms https://c.bing.com https://www.facebook.com",
              "media-src 'self' blob: data:",
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com https://connect.facebook.net",
              "worker-src 'self' blob:",
              "child-src 'self' blob: https://www.youtube.com",
              "frame-src 'self' https://www.youtube.com https://www.google.com https://www.google.com.tr https://maps.google.com",
              "manifest-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              ...(process.env.NODE_ENV === 'production' ? ["upgrade-insecure-requests"] : []),
            ].join('; '),
          },
          // v9 Hyper-Speed Early Hints (Preconnect & DNS prefetch in HTTP response headers)
          { key: 'Link', value: getLinkHeaderString() },
        ],
      },
      // Teknik dosyalar — Google tarafından HTML sayfa gibi indexlenmesin.
      {
        source: '/(feed|rss)\\.xml',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/manifest.webmanifest',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/image-sitemap.xml',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
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
      {
        source: '/favicon/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' },
        ],
      },
      {
        source: '/api/geo/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/api/tesis-yonetimi/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(withPWA(nextConfig));
