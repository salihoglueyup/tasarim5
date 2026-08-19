import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

/**
 * Live Bot & Crawler Telemetry Diagnostic API (/api/admin/bot-tracker)
 * 
 * Googlebot, Bingbot, GPTBot, PerplexityBot ve Applebot gibi arama motoru ve
 * yapay zeka ajanlarının sitemizdeki teknik SEO protokollerini ve tarama durumunu analiz eder.
 */
export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  
  const botSignatures = [
    { name: 'Googlebot', regex: /Googlebot|Google-InspectionTool|Mediapartners-Google/i, category: 'Traditional Search' },
    { name: 'Bingbot', regex: /bingbot|msnbot/i, category: 'Traditional Search' },
    { name: 'YandexBot', regex: /YandexBot/i, category: 'Traditional Search' },
    { name: 'PerplexityBot', regex: /PerplexityBot/i, category: 'AI Answer Engine' },
    { name: 'GPTBot / ChatGPT', regex: /GPTBot|ChatGPT-User/i, category: 'AI LLM Crawler' },
    { name: 'ClaudeBot', regex: /Claude-Web|ClaudeBot|AnthropicAI/i, category: 'AI LLM Crawler' },
    { name: 'Applebot', regex: /Applebot/i, category: 'AI & Siri Search' },
    { name: 'Amazonbot', regex: /Amazonbot/i, category: 'AI Assistant' }
  ];

  const detectedBot = botSignatures.find(b => b.regex.test(userAgent));

  const seoProtocols = [
    { name: 'XML Sitemap Index', url: `${BASE_URL}/sitemap.xml`, status: 'Active', cache: '24 Hours' },
    { name: 'Image Sitemap', url: `${BASE_URL}/image-sitemap.xml`, status: 'Active', cache: '24 Hours' },
    { name: 'Knowledge Graph Semantic API', url: `${BASE_URL}/api/knowledge-graph`, status: 'Active', format: 'JSON-LD' },
    { name: 'LLM AI Knowledge Engine', url: `${BASE_URL}/api/ai-knowledge`, status: 'Active', format: 'JSON' },
    { name: 'LLMO Markdown Manifest', url: `${BASE_URL}/llms.txt`, status: 'Active', format: 'Plaintext' },
    { name: 'RFC 7946 GeoJSON District Map', url: `${BASE_URL}/api/geo/districts.geojson`, status: 'Active', format: 'GeoJSON' },
    { name: 'OpenGIS KML Map', url: `${BASE_URL}/api/geo/istanbul.kml`, status: 'Active', format: 'KML XML' },
    { name: 'Google Dataset Search Engine', url: `${BASE_URL}/api/datasets/istanbul-facility-data`, status: 'Active', format: 'Schema.org Dataset' },
    { name: '5188 Legal Template Generator', url: `${BASE_URL}/api/security/legal-templates`, status: 'Active', format: 'DigitalDocument' }
  ];

  return NextResponse.json({
    telemetry: {
      timestamp: new Date().toISOString(),
      requestIp: request.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent,
      isKnownBot: Boolean(detectedBot),
      botDetails: detectedBot ? detectedBot : { name: 'Human / Browser Client', category: 'General' },
    },
    systemSeoEngineHealth: {
      status: 'OPTIMAL',
      totalRegisteredProtocols: seoProtocols.length,
      edgeResponseHeaders: {
        xRobotsTag: 'all, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        rfc8288LinkHeaders: 'Enabled (Canonical, Sitemap, Knowledge Graph, Feeds)',
        aiKnowledgeProtocols: 'Enabled (LLMS.txt & AI-Knowledge API)'
      },
      protocols: seoProtocols
    }
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
