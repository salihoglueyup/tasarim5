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
        id: ORG_ID,
        website: BASE_URL,
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
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-Topical-Engine': 'Alo-Yonetim-SEO-V4',
      },
    }
  );
}
