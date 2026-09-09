import { NextResponse } from 'next/server';
import { generateOpenApiSpec } from '@/lib/seo/openApiSpec';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 Saat ISR

/**
 * Açık Veri & OpenAPI 3.1.0 Spesifikasyon Uç Noktası (/api/openapi.json)
 * Standart: https://spec.openapis.org/oas/v3.1.0
 */
export async function GET() {
  const spec = generateOpenApiSpec();

  return NextResponse.json(spec, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      'X-OpenAPI-Version': '3.1.0',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
