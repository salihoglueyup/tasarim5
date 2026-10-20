import { NextRequest, NextResponse } from 'next/server';
import {
  buildRouteAwareMarkdown,
  buildMarkdownResponseHeaders,
  detectMarkdownLocale,
} from '@/lib/seo/markdownViews';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Evrensel Markdown Content Negotiation (`Accept: text/markdown`) uç noktası.
 * Cloudflare Markdown for Agents ve llmstxt.org standartları uyarınca
 * rota-duyarlı ve çok dilli (tr/en/ru/ar) Markdown,
 * `Content-Type: text/markdown; charset=utf-8`, `Content-Language`, `Content-Signal` ve `x-markdown-tokens` başlığı döner.
 */
export async function GET(request: NextRequest) {
  const path = request?.nextUrl?.searchParams?.get('path') || '/';
  const lang = detectMarkdownLocale(path);
  const markdown = buildRouteAwareMarkdown(path);

  return new NextResponse(markdown, {
    status: 200,
    headers: buildMarkdownResponseHeaders(markdown, lang),
  });
}
