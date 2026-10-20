import { NextResponse } from 'next/server';
import { buildUcpDiscovery, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** Universal Commerce Protocol (UCP) Discovery (/.well-known/ucp) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildUcpDiscovery(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
