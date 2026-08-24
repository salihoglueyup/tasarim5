import { NextResponse } from 'next/server';
import { VERIFIED_AUTHORITY_CREDENTIALS, generateVerifiedAuthorityGraph } from '@/lib/seo/eeatAuditor';

export const dynamic = 'force-static';
export const revalidate = 86400; // Günde bir yenile (ISR)

export async function GET() {
  const schema = generateVerifiedAuthorityGraph();

  return NextResponse.json(
    {
      status: 'verified',
      authorityScore: 98.5,
      trustRank: 'MAXIMUM_ENTERPRISE_TRUST',
      provider: 'Alo Yönetim Hukuk ve Kalite Masası',
      credentials: VERIFIED_AUTHORITY_CREDENTIALS,
      schema,
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
        'X-EEAT-Auditor': 'Alo-Yonetim-Verified-Enterprise-Authority',
      },
    }
  );
}
