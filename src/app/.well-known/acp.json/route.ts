import { NextResponse } from 'next/server';
import { buildAcpDiscovery, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** Agentic Commerce Protocol (ACP) Discovery (/.well-known/acp.json) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildAcpDiscovery(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
