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
  'DeepSeekBot',
];

export default function robots(): MetadataRoute.Robots {
  const allow = [
    '/',
    '/api/ai-knowledge',
    '/api/knowledge-graph',
    '/api/ai/facility-agent-context.json',
    '/api/tesis-yonetimi/calculate-budget',
    '/api/tesis-yonetimi/dictionary.json',
    '/api/tesis-yonetimi/legal-precedents.json',
    '/api/tesis-yonetimi/rfp-generator',
    '/api/tesis-yonetimi/feed.xml',
    '/api/tesis-yonetimi/llm-facts.json',
    '/api/tesis-yonetimi/entity-graph.jsonld',
    '/api/tesis-yonetimi/compare-districts',
    '/api/tesis-yonetimi/ping-indexnow',
    '/api/tesis-yonetimi/voice-qa.json',
    '/api/tesis-yonetimi/dues-index.json',
    '/api/tesis-yonetimi/verify-credentials',
    '/api/tesis-yonetimi/ai-snippets.json',
    '/api/geo/facility-coverage.geojson',
    '/api/geo/districts.geojson',
    '/api/geo/istanbul.kml',
    '/api/datasets/istanbul-facility-data',
    '/api/facility/districts-feed.xml',
    '/api/facility/legal-templates',
    '/api/tesis-yonetimi/knowledge.json',
    '/api/tesis-yonetimi/benchmark.json',
    '/api/seo/facility-knowledge',
    '/api/seo/facility-audit',
    '/api/seo/facility-rank-score',
    '/api/seo/bot-analytics',
    '/api/seo/audit-page',
    '/api/security/districts-feed.xml',
    '/api/security/legal-templates',
    '/api/summary',
    '/api/terms',
    '/api/search-suggest',
    '/feed/tesis-yonetimi.xml',
    '/video-sitemap.xml',
    '/sitemap-regions.xml',
    '/llms.txt',
    '/llms-full.txt',
    '/opensearch.xml',
    '/.well-known/security.txt',
    '/.well-known/traffic-advice',
  ];

  // Özel/teknik, oturum, form ve exploit deneme yolları botlara kapalıdır
  const disallow = [
    '/admin',
    '/api/admin',
    '/api/auth',
    '/api/calculator',
    '/api/lead',
    '/api/upload',
    '/api/seed-referanslar',
    '/_next/',
    '/@fs/',
    '/.*',
    '/*.php$',
    '/*.env*',
    '/*.sql$',
    '/*.bak$',
    '/*.ini$',
    '/*.conf$'
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow,
        disallow,
      },
      {
        // AI yanıt/tarama botları: içerik ve bilgi tabanlarını taramaya açık
        userAgent: AI_BOTS,
        allow,
        disallow,
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-regions.xml`,
      `${BASE_URL}/image-sitemap.xml`,
      `${BASE_URL}/video-sitemap.xml`,
      `${BASE_URL}/document-sitemap.xml`,
      `${BASE_URL}/feed/tesis-yonetimi.xml`,
      `${BASE_URL}/api/facility/districts-feed.xml`,
      `${BASE_URL}/api/security/districts-feed.xml`,
      `${BASE_URL}/rss.xml`,
      `${BASE_URL}/feed.xml`,
    ],
    host: BASE_URL,
  };
}
