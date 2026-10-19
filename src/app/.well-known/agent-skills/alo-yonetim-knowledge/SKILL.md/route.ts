import { NextResponse } from 'next/server';
import { buildAgentSkillMd } from '@/lib/seo/agentReadiness';
import { buildMarkdownResponseHeaders } from '@/lib/seo/markdownViews';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** Agent Skills Discovery RFC v0.2.0 — SKILL.md Artifact (/.well-known/agent-skills/alo-yonetim-knowledge/SKILL.md) */
export async function GET() {
  const skillMd = buildAgentSkillMd();
  return new NextResponse(skillMd, {
    status: 200,
    headers: buildMarkdownResponseHeaders(skillMd),
  });
}
