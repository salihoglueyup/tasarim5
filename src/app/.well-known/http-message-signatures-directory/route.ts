import { NextResponse } from 'next/server';
import { buildWebBotAuthJwks } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** IETF WebBotAuth WG — /.well-known/http-message-signatures-directory (RFC 7517 JWKS) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildWebBotAuthJwks(), null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/jwk-set+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
