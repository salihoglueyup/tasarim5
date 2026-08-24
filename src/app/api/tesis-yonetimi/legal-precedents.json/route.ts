import { NextResponse } from 'next/server';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tesis Yönetimi ve Kat Mülkiyeti Hukuku Yargıtay Emsal Kararları',
    description: '634 sayılı KMK kapsamında asansör, cam balkon, %5 gecikme faizi ve ortak alanlara dair bağlayıcı içtihatlar.',
    itemListElement: YARGITAY_LEGAL_PRECEDENTS.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Legislation',
        name: `${item.court} — ${item.subject}`,
        legislationType: 'Yargıtay Emsal Kararı',
        legislationIdentifier: `${item.docketNumber} / ${item.decisionNumber}`,
        legislationDate: item.decisionDate,
        legislationJurisdiction: 'TR',
        url: item.canonicalUrl,
        abstract: item.rulingSummary,
      },
    })),
  };

  return NextResponse.json(
    {
      metadata: {
        title: 'Alo Yönetim Tesis Yönetimi & KMK 634 Hukuki Emsal Karar Bilgi Tabanı',
        provider: 'Alo Yönetim Hukuk Müşavirliği',
        totalPrecedents: YARGITAY_LEGAL_PRECEDENTS.length,
        scope: 'Kat Mülkiyeti Hukuku & Tesis İşletmeciliği E-E-A-T Kaynağı',
        version: '2026.1',
      },
      precedents: YARGITAY_LEGAL_PRECEDENTS,
      schema: schemaLd,
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
        'X-Legal-Database': 'Yargitay-KMK-634-Facility-Precedents',
      },
    }
  );
}
