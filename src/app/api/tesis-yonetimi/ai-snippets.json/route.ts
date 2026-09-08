import { NextResponse } from 'next/server';
import { generateFacilityAiSnippets } from '@/lib/seo/facilityAiSnippetEngine';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Google AI Overviews & SGE Yapılandırılmış Snippet API'si (/api/tesis-yonetimi/ai-snippets.json)
 */
export async function GET(req: Request) {
  try {
    let lang = 'tr';
    if (req && req.url) {
      try {
        const { searchParams } = new URL(req.url);
        lang = searchParams.get('lang') || 'tr';
      } catch {
        // noop
      }
    }

    const payload = generateFacilityAiSnippets(lang);
    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'AI snippets generation failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
