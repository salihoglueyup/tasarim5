import { NextResponse } from 'next/server';
import { buildFacilityAuthorityCorpus } from '@/lib/seo/facilityAuthorityCorpusEngine';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'tr';

  const corpus = buildFacilityAuthorityCorpus(lang);

  return NextResponse.json(corpus, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'X-Topical-Authority': 'ISO 41001 & KMK 634 Master Knowledge Corpus',
      'X-Robots-Tag': 'all, max-snippet:-1',
    },
  });
}
