import { NextResponse } from 'next/server';
import {
  CANONICAL_NAP,
  generateLocalBusinessJsonLd,
  generateNapGeoJson,
  validateNapIntegrity,
} from '@/lib/seo/napGuardEngine';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Canlı NAP Doğrulama & Yerel SEO Otorite API'si (/api/seo/nap-profile)
 * 
 * Googlebot, Apple Maps, Perplexity, ChatGPT Search ve Bing için
 * resmi kurumsal kimlik, açık adres, iletişim ve lisans doğrulaması sunar.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  // 1. Format: GeoJSON
  if (format === 'geojson') {
    return NextResponse.json(generateNapGeoJson(), {
      headers: {
        'Content-Type': 'application/geo+json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // 2. Format: JSON-LD
  if (format === 'jsonld') {
    return NextResponse.json(generateLocalBusinessJsonLd(), {
      headers: {
        'Content-Type': 'application/ld+json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // 3. Format: Tam Doğrulanmış NAP Profili (Varsayılan)
  const validation = validateNapIntegrity();

  const responsePayload = {
    status: 'SUCCESS',
    verified: validation.isValid,
    lastAuditTimestamp: new Date().toISOString(),
    nap: CANONICAL_NAP,
    schema: generateLocalBusinessJsonLd(),
    geoJson: generateNapGeoJson(),
    audit: validation,
  };

  return NextResponse.json(responsePayload, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
      'X-NAP-Status': validation.isValid ? 'VERIFIED' : 'INVALID',
    },
  });
}
