import { NextResponse } from 'next/server';
import {
  getTopicalAuthoritySummary,
  FACILITY_MANAGEMENT_ENTITIES,
  getFacilityTopicCluster,
} from '@/lib/seoEngine';
import { ORG_NAME, ORG_ID, ORG_KNOWS_ABOUT } from '@/lib/schemas';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET() {
  const authoritySummary = getTopicalAuthoritySummary();
  const topicCluster = getFacilityTopicCluster();

  return NextResponse.json(
    {
      organization: {
        name: ORG_NAME,
        legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
        id: ORG_ID,
        website: BASE_URL,
        telephone: '+90 216 550 48 48',
        logo: `${BASE_URL}/images/logo.png`,
        primaryPillar: 'Tesis Yönetimi',
        standard: 'ISO 41001:2018',
        knowsAbout: ORG_KNOWS_ABOUT,
      },
      entities: FACILITY_MANAGEMENT_ENTITIES,
      topicCluster,
      aiPromptContext: authoritySummary,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
        'X-Topical-Engine': 'Alo-Yonetim-SEO-V4',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    }
  );
}
