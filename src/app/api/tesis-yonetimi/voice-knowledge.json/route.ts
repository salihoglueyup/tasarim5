import { NextResponse } from 'next/server';
import { buildFacilityVoiceKnowledge } from '@/lib/seo/facilityVoiceKnowledgeEngine';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'tr';

  const knowledge = buildFacilityVoiceKnowledge(lang);

  return NextResponse.json(knowledge, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'X-Voice-Search-Protocol': 'Speakable-v1',
      'X-Robots-Tag': 'all, max-snippet:-1',
    },
  });
}
