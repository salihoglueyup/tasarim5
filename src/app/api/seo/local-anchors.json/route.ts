import { NextResponse } from 'next/server';
import { VERIFIED_HEADERS, VERIFIED_DISCLAIMER, verifiedCoverage, verifiedDistricts, verifiedOrganization } from '@/lib/seo/verifiedKnowledge';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/** /api/seo/local-anchors.json — merkez ofis ve hizmet verilen ilçeler (yalnızca doğrulanmış bilgiler). */
export async function GET() {
  return NextResponse.json(
    { disclaimer: VERIFIED_DISCLAIMER, organization: verifiedOrganization(), coverage: verifiedCoverage(), districts: verifiedDistricts() },
    { headers: VERIFIED_HEADERS },
  );
}
