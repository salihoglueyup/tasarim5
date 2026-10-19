import { NextResponse } from 'next/server';
import { buildA2aAgentCard, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** A2A Protocol Agent Card (/.well-known/agent-card.json) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildA2aAgentCard(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
