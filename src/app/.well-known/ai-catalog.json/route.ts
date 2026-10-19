import { NextResponse } from 'next/server';
import { buildArdCatalog, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** ARD (Agentic Resource Discovery v0.9 / ai-catalog 1.0) — /.well-known/ai-catalog.json */
export async function GET() {
  return new NextResponse(JSON.stringify(buildArdCatalog(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
