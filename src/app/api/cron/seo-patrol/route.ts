import { NextResponse } from 'next/server';
import { runFacilitySeoPatrol } from '@/lib/seo/facilitySeoPatrol';

export const dynamic = 'force-dynamic';

export async function GET() {
  const report = runFacilitySeoPatrol();

  return NextResponse.json(
    {
      status: 'success',
      reportTitle: 'Alo Yönetim Tesis Yönetimi SEO Health Patrol Report',
      report,
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'private, no-cache, no-store',
      },
    }
  );
}

export async function POST() {
  return GET();
}
