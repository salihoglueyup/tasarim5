import { NextRequest, NextResponse } from 'next/server';
import { lintSchemaOrgObject } from '@/lib/seo/schemaLinter';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const report = lintSchemaOrgObject(body);

    return NextResponse.json(report, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Invalid JSON schema payload', message: error?.message },
      { status: 400 }
    );
  }
}

export async function GET() {
  // Örnek Tesis Yönetimi şeması denetimi
  const sampleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Profesyonel Tesis Yönetimi',
    serviceType: 'Tesis ve Mülk İşletmeciliği',
    description: 'ISO 41001 standartlarında 5188 güvenlik ve teknik bakım hizmetleri.',
  };

  const report = lintSchemaOrgObject(sampleSchema);

  return NextResponse.json(
    {
      status: 'success',
      reportTitle: 'Alo Yönetim Schema.org Linter Benchmark',
      report,
    },
    { status: 200 }
  );
}
