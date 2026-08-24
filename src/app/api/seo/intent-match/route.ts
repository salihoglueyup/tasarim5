import { NextRequest, NextResponse } from 'next/server';
import { classifySearchIntent } from '@/lib/seo/intentClassifier';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || searchParams.get('query') || '';

  const result = classifySearchIntent(query);

  return NextResponse.json(result, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Intent-Classifier': 'Alo-Yonetim-Semantic-Intent-Engine',
    },
  });
}
