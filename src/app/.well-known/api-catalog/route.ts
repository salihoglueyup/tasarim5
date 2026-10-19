import { NextResponse } from 'next/server';
import { buildApiCatalog } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** RFC 9727 — API Catalog (/.well-known/api-catalog) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildApiCatalog(), null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
