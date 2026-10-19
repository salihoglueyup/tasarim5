import { NextResponse } from 'next/server';
import { buildSiteManagementMarkdown, buildMarkdownResponseHeaders } from '@/lib/seo/markdownViews';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** AI arama motorları için site yönetimi Markdown görünümü (yalnızca doğrulanmış bilgiler). */
export async function GET() {
  const markdown = buildSiteManagementMarkdown();
  return new NextResponse(markdown, {
    status: 200,
    headers: buildMarkdownResponseHeaders(markdown),
  });
}

