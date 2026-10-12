import { NextResponse } from 'next/server';
import { VERIFIED_HEADERS, VERIFIED_DISCLAIMER, verifiedKnowledge, verifiedLegalReferences, verifiedOrganization, verifiedCoverage, verifiedCertifications } from '@/lib/seo/verifiedKnowledge';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** /api/seo/geo-manifest.json — yalnızca doğrulanmış bilgiler (src/lib/seo/verifiedKnowledge.ts, src/lib/facts.ts). */
export async function GET() {
  const body = verifiedKnowledge();
  return NextResponse.json(body, { headers: VERIFIED_HEADERS });
}
