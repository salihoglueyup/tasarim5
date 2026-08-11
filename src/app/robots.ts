import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

// SEO Master Plan V4 — Faz 9 + Faz 132 (GEO/AI görünürlük kararı).
// Host ve sitemap adresi tek kaynaktan (BASE_URL) türetilir.
//
// AI crawler politikası (Faz 132): Alo Yönetim'in ChatGPT, Perplexity, Gemini,
// Claude gibi motorların yanıtlarında KAYNAK olarak gösterilmesi hedeflendiği
// için yanıt/tarama botlarına AÇIKÇA İZİN verilir. Yalnız özel alanlar (/admin,
// /api, /_next) tüm botlara kapalıdır. Karar bilinçlidir; llms.txt ile birlikte
// AI'ların markayı doğru temsil etmesi amaçlanır (bkz. GEO_STRATEGY.md).
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/admin', '/api/', '/_next/'];
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        // AI yanıt/tarama botları: içerik taramaya açık (görünürlük için).
        userAgent: AI_BOTS,
        allow: '/',
        disallow,
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/image-sitemap.xml`
    ],
    host: BASE_URL,
  };
}
