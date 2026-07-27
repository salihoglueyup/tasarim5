import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';
import { getLinkHeaderString } from './src/lib/performance/resourceHints';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Faz 217: Güvenlik ve bayt tasarrufu için X-Powered-By başlığını kaldır.
  poweredByHeader: false,
  // Faz 124: Gzip/Brotli sıkıştırmasını aktif et.
  compress: true,
  // Faz 216: React Strict Mode ile unhandled render hatalarını yakala.
  reactStrictMode: true,
  // Tek biçim URL: sondaki slash yok (canonical/proxy ile tutarlı — Faz 26).
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'date-fns', '@next/third-parties'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Faz 41, 42: Gereksiz büyük boyutlar üretilmemesi için optimize edilmiş breakpointler
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
