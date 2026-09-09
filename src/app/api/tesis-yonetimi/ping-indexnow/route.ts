import { NextResponse } from 'next/server';
import { submitFacilityIndexNow } from '@/lib/seo/facilityIndexNowPinger';

export const dynamic = 'force-dynamic';

const RESPONSE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'private, no-cache, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

/**
 * Tesis Yönetimi & 39 İlçe IndexNow Anlık Tetikleme API'si (/api/tesis-yonetimi/ping-indexnow)
 */
export async function POST() {
  try {
    const result = await submitFacilityIndexNow();
    return NextResponse.json(result, {
      status: 200,
      headers: RESPONSE_HEADERS,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'IndexNow push failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: RESPONSE_HEADERS }
    );
  }
}

export async function GET() {
  try {
    const result = await submitFacilityIndexNow();
    return NextResponse.json(result, {
      status: 200,
      headers: RESPONSE_HEADERS,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'IndexNow push failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: RESPONSE_HEADERS }
    );
  }
}
