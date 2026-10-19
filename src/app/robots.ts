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
  'Amazonbot',
  'Meta-ExternalAgent',
  'Bytespider',
];

export default function robots(): MetadataRoute.Robots {
  const allow = [
    '/',
    '/api/og',
    '/api/search-suggest',
    '/api/ai/',
    '/api/ai-knowledge',
    '/api/knowledge-graph',
    '/api/markdown/',
    '/api/geo/',
    '/api/tesis-yonetimi/',
    '/api/facility/',
    '/feed/tesis-yonetimi.xml',
    '/image-sitemap.xml',
    '/video-sitemap.xml',
    '/document-sitemap.xml',
    '/news-sitemap.xml',
    '/sitemap-index.xml',
    '/sitemap.xml',
    '/sitemap-regions.xml',
    '/rss.xml',
    '/feed.xml',
    '/llms.txt',
    '/llms-full.txt',
    '/auth.md',
    '/opensearch.xml',
    '/.well-known/',
    '/.well-known/security.txt',
    '/.well-known/traffic-advice',
    '/.well-known/ai-plugin.json',
    '/.well-known/api-catalog',
    '/.well-known/agent-card.json',
    '/.well-known/ai-catalog.json',
    '/.well-known/agent-skills/index.json',
    '/.well-known/mcp/server-card.json',
    '/.well-known/oauth-protected-resource',
    '/.well-known/oauth-authorization-server',
    '/.well-known/openid-configuration',
    '/.well-known/http-message-signatures-directory',
    '/.well-known/poppy.json',
    '/_next/static/',
  ];

  // Özel/teknik, oturum, form ve exploit deneme yolları botlara kapalıdır
  // GSC Crawl Bloat & Parametre Patlaması Kalkanı (Faz 251 & Faz 254: Teklif Al, API & Query Disallow)
  const disallow = [
    '/admin',
    '/api/',
    '/~offline',
    '/teklif-al?*',
    '/*?*hizmet=*',
    '/*?*bolge=*',
    '/*?*skor=*',
    '/*?*filter=*',
    '/*?*sort=*',
    '/*?*utm_*',
    '/*?*fbclid=*',
    '/*?*gclid=*',
    '/*?*source=*',
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

  const contentSignalsOther = {
    'Content-Signal': 'ai-train=yes, search=yes, ai-input=yes',
    Agentmap: `${BASE_URL}/.well-known/ai-catalog.json`,
  };

  return {
    rules: [
      {
        userAgent: '*',
        allow,
        disallow,
        ...({ other: contentSignalsOther } as Record<string, unknown>),
      },
      {
        // Faz 143: AI yanıt/tarama botları için optimize edilmiş crawl-delay ve izinler
        userAgent: AI_BOTS,
        allow,
        disallow,
        crawlDelay: 1,
        ...({ other: contentSignalsOther } as Record<string, unknown>),
      },
    ],
    // Master Sitemap Index tek link ve standart alt sitemap listesi
    sitemap: [
      `${BASE_URL}/sitemap-index.xml`,
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-regions.xml`,
      `${BASE_URL}/image-sitemap.xml`,
      `${BASE_URL}/video-sitemap.xml`,
      `${BASE_URL}/document-sitemap.xml`,
      `${BASE_URL}/news-sitemap.xml`,
    ],
    host: BASE_URL,
  };
}
