import { NextRequest, NextResponse } from 'next/server';
import { lintSchemaOrgObject, lintSchemaGraph } from '@/lib/seo/schemaLinter';

export const dynamic = 'force-dynamic';

const RESPONSE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'private, no-cache, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isGraph = Array.isArray(body) || (body && Array.isArray(body['@graph']));
    const report = isGraph ? lintSchemaGraph(body) : lintSchemaOrgObject(body);

    return NextResponse.json(report, { status: 200, headers: RESPONSE_HEADERS });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Invalid JSON schema payload', message: error?.message },
      { status: 400, headers: RESPONSE_HEADERS }
    );
  }
}

export async function GET() {
  // Örnek çoklu şema ve @graph denetim benchmark'ı
  const sampleGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Alo Yönetim',
        legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: 'https://aloyonetim.com.tr',
        logo: 'https://aloyonetim.com.tr/icon.png',
      },
      {
        '@type': 'Service',
        name: 'Profesyonel Tesis Yönetimi',
        serviceType: 'Tesis ve Mülk İşletmeciliği',
        description: 'ISO 41001 standartlarında 5188 güvenlik ve teknik bakım hizmetleri.',
      },
      {
        '@type': 'ItemList',
        name: 'Tesis Yönetimi Yargıtay Emsal Kararları',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Asansör Bakım Ortak Gider Paylaşımı',
          },
        ],
      },
    ],
  };

  const graphReport = lintSchemaGraph(sampleGraph);

  return NextResponse.json(
    {
      status: 'success',
      reportTitle: 'Alo Yönetim Schema.org Linter Benchmark (Multi-Node Graph)',
      graphReport,
    },
    { status: 200, headers: RESPONSE_HEADERS }
  );
}
