import { NextRequest, NextResponse } from 'next/server';
import { buildLlmsFullText } from '@/lib/seo/llmsContent';
import {
  buildSiteManagementMarkdown,
  buildFacilityManagementMarkdown,
  buildMarkdownResponseHeaders,
} from '@/lib/seo/markdownViews';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Evrensel Markdown Content Negotiation (`Accept: text/markdown`) uç noktası.
 * Cloudflare Markdown for Agents ve llmstxt.org standartları uyarınca
 * `Content-Type: text/markdown; charset=utf-8` ve `x-markdown-tokens` başlığı döner.
 */
export async function GET(request: NextRequest) {
  const path = request?.nextUrl?.searchParams?.get('path') || '/';
  let markdown: string;

  if (path.includes('site-yonetimi')) {
    markdown = buildSiteManagementMarkdown();
  } else if (path.includes('tesis-yonetimi')) {
    markdown = buildFacilityManagementMarkdown();
  } else {
    markdown = buildLlmsFullText();
  }

  return new NextResponse(markdown, {
    status: 200,
    headers: buildMarkdownResponseHeaders(markdown),
  });
}
