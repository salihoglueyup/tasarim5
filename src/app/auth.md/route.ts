import { NextResponse } from 'next/server';
import { buildAuthMd } from '@/lib/seo/agentReadiness';
import { buildMarkdownResponseHeaders } from '@/lib/seo/markdownViews';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** Auth.md Agent Registration Discovery (/auth.md) */
export async function GET() {
  const markdown = buildAuthMd();
  return new NextResponse(markdown, {
    status: 200,
    headers: buildMarkdownResponseHeaders(markdown),
  });
}
