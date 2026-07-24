import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

// SEO Master Plan V4 — Faz 9: Dinamik robots (public/robots.txt yerine).
// Host ve sitemap adresi tek kaynaktan (BASE_URL) türetilir.
//
// Not: AI crawler'ları (GPTBot, CCBot) engelleme kararı mevcut davranıştan
// korunmuştur. Nihai "izin ver / engelle" kararı GEO/AI görünürlüğü kapsamında
// Faz 132'de gözden geçirilecektir (ClaudeBot, PerplexityBot, Google-Extended...).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/_next/'],
      },
      {
        // AI eğitim/tarama botları (şimdilik engelli — bkz. Faz 132)
        userAgent: ['GPTBot', 'CCBot'],
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
