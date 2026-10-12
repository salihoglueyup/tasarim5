import { NextResponse } from 'next/server';
import { buildLlmsFullText } from '@/lib/seo/llmsContent';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 Saat ISR

/** /llms-full.txt — https://llmstxt.org/ ; içerik src/lib/seo/llmsContent.ts (yalnızca doğrulanmış bilgiler). */
export async function GET() {
  return new NextResponse(buildLlmsFullText(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
