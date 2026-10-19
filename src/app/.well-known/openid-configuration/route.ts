import { NextResponse } from 'next/server';
import { buildOAuthAuthorizationServer, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** OpenID Connect Discovery 1.0 (/.well-known/openid-configuration) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildOAuthAuthorizationServer(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
