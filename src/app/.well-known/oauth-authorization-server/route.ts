import { NextResponse } from 'next/server';
import { buildOAuthAuthorizationServer, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** RFC 8414 — OAuth 2.0 Authorization Server Metadata (/.well-known/oauth-authorization-server) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildOAuthAuthorizationServer(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
