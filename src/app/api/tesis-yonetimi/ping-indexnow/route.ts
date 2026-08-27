import { NextResponse } from 'next/server';
import { submitFacilityIndexNow } from '@/lib/seo/facilityIndexNowPinger';

export const dynamic = 'force-dynamic';

/**
 * Tesis Yönetimi & 39 İlçe IndexNow Anlık Tetikleme API'si (/api/tesis-yonetimi/ping-indexnow)
 */
export async function POST() {
  try {
    const result = await submitFacilityIndexNow();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'IndexNow push failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const result = await submitFacilityIndexNow();
  return NextResponse.json(result, { status: 200 });
}
