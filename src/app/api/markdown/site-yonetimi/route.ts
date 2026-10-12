import { NextResponse } from 'next/server';
import { buildSiteManagementMarkdown } from '@/lib/seo/markdownViews';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** AI arama motorları için site yönetimi Markdown görünümü (yalnızca doğrulanmış bilgiler). */
export async function GET() {
  return new NextResponse(buildSiteManagementMarkdown(), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
