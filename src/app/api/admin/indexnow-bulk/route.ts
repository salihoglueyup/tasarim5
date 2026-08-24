import { NextResponse } from 'next/server';
import { pushFacilityUrlsBulkToIndexNow } from '@/lib/seo/indexNowQueue';

export const dynamic = 'force-dynamic';

export async function POST() {
  const result = await pushFacilityUrlsBulkToIndexNow();

  return NextResponse.json(
    {
      status: result.success ? 'success' : 'partial_or_mock',
      timestamp: new Date().toISOString(),
      summary: `${result.totalUrlsCollected} Tesis Yönetimi ve Yerel URL IndexNow servisine iletildi.`,
      result,
    },
    { status: 200 }
  );
}

export async function GET() {
  return POST();
}
