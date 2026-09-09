import { NextRequest, NextResponse } from 'next/server';
import { notifyWebSubHubs } from '@/lib/seo/webSubPublisher';

export const dynamic = 'force-dynamic';

const RESPONSE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'private, no-cache, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const topicPath = body.topicPath || '/feed/tesis-yonetimi.xml';

    const results = await notifyWebSubHubs(topicPath);

    return NextResponse.json(
      {
        status: 'completed',
        timestamp: new Date().toISOString(),
        topicPath,
        results,
      },
      { status: 200, headers: RESPONSE_HEADERS }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error?.message || 'WebSub notification error' },
      { status: 500, headers: RESPONSE_HEADERS }
    );
  }
}

export async function GET() {
  const results = await notifyWebSubHubs('/feed/tesis-yonetimi.xml');

  return NextResponse.json(
    {
      status: 'completed',
      timestamp: new Date().toISOString(),
      topicPath: '/feed/tesis-yonetimi.xml',
      results,
    },
    { status: 200, headers: RESPONSE_HEADERS }
  );
}
