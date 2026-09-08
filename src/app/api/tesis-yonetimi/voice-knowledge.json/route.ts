import { NextResponse } from 'next/server';
import { buildFacilityVoiceKnowledge } from '@/lib/seo/facilityVoiceKnowledgeEngine';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET(request: Request) {
  let lang = 'tr';
  let intent: string | undefined = undefined;

  if (request && request.url) {
    try {
      const { searchParams } = new URL(request.url);
      lang = searchParams.get('lang') || 'tr';
      intent = searchParams.get('intent') || undefined;
    } catch {
      // noop
    }
  }

  const knowledge = buildFacilityVoiceKnowledge(lang, intent);

  return NextResponse.json(knowledge, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Voice-Search-Protocol': 'Speakable-v1',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
