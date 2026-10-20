import { NextRequest, NextResponse } from 'next/server';
import {
  buildRouteAwareMarkdown,
  buildMarkdownResponseHeaders,
} from '@/lib/seo/markdownViews';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Evrensel Markdown Content Negotiation (`Accept: text/markdown`) uç noktası.
 * Cloudflare Markdown for Agents ve llmstxt.org standartları uyarınca
 * rota-duyarlı (ilçe, hizmet, sözlük, KMK 2026, referanslar) Markdown,
 * `Content-Type: text/markdown; charset=utf-8`, `Content-Signal` ve `x-markdown-tokens` başlığı döner.
 */
export async function GET(request: NextRequest) {
  const path = request?.nextUrl?.searchParams?.get('path') || '/';
  const markdown = buildRouteAwareMarkdown(path);

  return new NextResponse(markdown, {
    status: 200,
    headers: buildMarkdownResponseHeaders(markdown),
  });
}
