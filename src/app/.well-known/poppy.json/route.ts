import { NextResponse } from 'next/server';
import { buildPoppyManifest, AGENT_JSON_HEADERS } from '@/lib/seo/agentReadiness';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** Personal Agent Protocol (Poppy v0.1) — /.well-known/poppy.json */
export async function GET() {
  return new NextResponse(JSON.stringify(buildPoppyManifest(), null, 2), {
    status: 200,
    headers: AGENT_JSON_HEADERS,
  });
}
