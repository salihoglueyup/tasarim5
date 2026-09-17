import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { LOCAL_BUSINESS_HUBS } from '@/components/seo/ai-overviews/LocalBusinessProfileAiAnchorSeo';
import { CANONICAL_NAP } from '@/lib/seo/napGuardEngine';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

/**
 * Resmi Alo Yönetim Doğrulanmış Yerel Harita ve AI Anchor Kütüğü API'si
 * (/api/seo/local-anchors.json)
 * Wave 69: Google Maps, Apple Maps, Local AI Overviews ve Google 3-Pack için kurumsal NAP ve coğrafi koordinat grafiği.
 */
export async function GET() {
  try {
    const payload = {
      $schema: 'https://schema.org/docs/jsonldcontext.json',
      anchorsVersion: '1.0.0',
      status: 'active',
      generatedAt: '2026-09-17T11:50:00.000Z',
      authority: {
        legalName: CANONICAL_NAP.legal.legalName,
        brandName: CANONICAL_NAP.legal.brandName,
        mersisNumber: CANONICAL_NAP.legal.mersisNumber,
        centralPhone: CANONICAL_NAP.contact.phoneDisplay,
        canonicalUrl: BASE_URL,
      },
      coverageMetrics: {
        totalDistrictsServiced: 39,
        anatolianDistricts: 14,
        europeanDistricts: 25,
        totalStrategicHubs: LOCAL_BUSINESS_HUBS.length,
        averageSlaMinutes: 18,
        guaranteedFreeAuditHours: 48,
      },
      headquarters: LOCAL_BUSINESS_HUBS[0],
      regionalLogisticsHubs: LOCAL_BUSINESS_HUBS.slice(1),
      verifiedAnchorSchemas: LOCAL_BUSINESS_HUBS.map((hub) => ({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: hub.name,
        description: hub.role,
        url: BASE_URL,
        telephone: hub.phone,
        hasMap: hub.mapQueryUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: hub.streetAddress,
          addressLocality: hub.district,
          addressRegion: hub.city,
          postalCode: hub.postalCode,
          addressCountry: 'TR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: hub.latitude,
          longitude: hub.longitude,
        },
        areaServed: hub.areaServed,
        openingHours: hub.openingHours,
      })),
      endpoints: {
        localAnchorsJson: `${BASE_URL}/api/seo/local-anchors.json`,
        botTelemetryJson: `${BASE_URL}/api/seo/bot-telemetry.json`,
        aiTelemetryJson: `${BASE_URL}/api/seo/ai-telemetry.json`,
        aiCitationsJson: `${BASE_URL}/api/seo/ai-citations.json`,
        corporateDnaJson: `${BASE_URL}/api/seo/corporate-dna.json`,
        geoManifestJson: `${BASE_URL}/api/seo/geo-manifest.json`,
      },
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to generate local anchors graph',
        status: 'error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
