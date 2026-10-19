import { NextResponse } from 'next/server';
import { buildAgentSkillsIndex, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** Agent Skills Discovery RFC v0.2.0 (/.well-known/agent-skills/index.json) */
export async function GET() {
  return new NextResponse(JSON.stringify(buildAgentSkillsIndex(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
