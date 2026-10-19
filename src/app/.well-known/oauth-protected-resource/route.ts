import { NextResponse } from 'next/server';
import { buildOAuthProtectedResource, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** RFC 9728 — OAuth 2.0 Protected Resource Metadata (/.well-known/oauth-protected-resource) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildOAuthProtectedResource(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
