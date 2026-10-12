import { NextResponse } from 'next/server';
import { VERIFIED_HEADERS, verifiedKnowledge } from '@/lib/seo/verifiedKnowledge';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** Yalnızca doğrulanmış bilgiler (src/lib/seo/verifiedKnowledge.ts, src/lib/facts.ts). */
export async function GET() {
  return NextResponse.json(verifiedKnowledge(), { headers: VERIFIED_HEADERS });
}
