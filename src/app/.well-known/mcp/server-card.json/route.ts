import { NextResponse } from 'next/server';
import { buildMcpServerCard, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** SEP-1649 — MCP Server Card (/.well-known/mcp/server-card.json) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildMcpServerCard(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
