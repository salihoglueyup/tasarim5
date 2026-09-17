import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { VERIFIED_BELCERT_CREDENTIALS } from '@/components/seo/AccreditedCertificationsTrustSeo';
import { PAA_DEEP_TREE_QUESTIONS } from '@/components/seo/PeopleAlsoAskDeepTreeSeo';
import { CANONICAL_NAP } from '@/lib/seo/napGuardEngine';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

/**
 * Resmi Alo Yönetim Akredite Sertifikasyon & PAA Bilgi Kütüğü API'si
 * (/api/seo/credentials.json)
 * Wave 70: BELCERT Uluslararası Belgelendirme, ILAS-MS-0089 Akreditasyonları ve 40+ PAA Soru-Cevap Grafiği.
 */
export async function GET() {
  try {
    const payload = {
      $schema: 'https://schema.org/docs/jsonldcontext.json',
      credentialsVersion: '1.0.0',
      status: 'active',
      generatedAt: '2026-09-17T11:56:00.000Z',
      authority: {
        legalName: CANONICAL_NAP.legal.legalName,
        brandName: CANONICAL_NAP.legal.brandName,
        mersisNumber: CANONICAL_NAP.legal.mersisNumber,
        centralPhone: CANONICAL_NAP.contact.phoneDisplay,
        canonicalUrl: BASE_URL,
      },
      accreditationRegistry: {
        issuer: 'BELCERT Uluslararası Belgelendirme Şirketi',
        issuerUrl: 'https://www.belcert.com',
        accreditationBody: 'ILAS ACCREDITED (ILAS-MS-0089)',
        verificationPortal: 'https://www.belcert.com',
        totalVerifiedCertificates: VERIFIED_BELCERT_CREDENTIALS.length,
      },
      certificatesList: VERIFIED_BELCERT_CREDENTIALS.map((cert) => ({
        certificateNumber: cert.certificateNumber,
        sealNumber: cert.sealNumber,
        name: cert.name,
        standard: cert.standard,
        issuer: cert.issuer,
        accreditation: cert.accreditation,
        validUntil: cert.validUntil,
        verificationUrl: cert.verificationUrl,
      })),
      paaSummary: {
        totalIndexedQuestions: PAA_DEEP_TREE_QUESTIONS.length,
        categories: [
          { key: 'kmk-hukuku', name: 'KMK Hukuku & Yargıtay Emsalleri', count: 10 },
          { key: 'aidat-butce', name: 'Aidat Hesaplama, Gecikme Tazminatı & Bütçe', count: 10 },
          { key: 'guvenlik-kamera', name: '5188 Özel Güvenlik, Devriye & Kamera Hukuku', count: 10 },
          { key: 'teknik-asansor', name: 'Teknik Bakım, Asansör Yeşil Etiket & Yangın', count: 10 },
        ],
      },
      endpoints: {
        credentialsJson: `${BASE_URL}/api/seo/credentials.json`,
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
        error: 'Failed to generate credentials graph',
        status: 'error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
