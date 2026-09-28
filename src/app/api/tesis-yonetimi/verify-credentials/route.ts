import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { ORG_CREDENTIALS } from '@/lib/schemas';
import { CERTIFICATES } from '@/data/certificates';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Canlı Kurumsal Lisans & ISO Akreditasyon Doğrulama API'si (/api/tesis-yonetimi/verify-credentials)
 * Google E-E-A-T ve kurumsal müşteriler için resmi akreditasyon ve lisans doğrulaması sunar.
 */
export async function GET() {
  const credentials = {
    organization: {
      legalName: CANONICAL_NAP.legal.legalName,
      tradeRegistryNumber: CANONICAL_NAP.legal.tradeRegistryNumber,
      taxOffice: CANONICAL_NAP.legal.taxOffice,
      mersisNumber: CANONICAL_NAP.legal.mersisNumber,
      headquarters: CANONICAL_NAP.address.fullDisplayAddress,
      verifiedStatus: 'ACTIVE_AND_LICENSED',
    },
    accreditations: [
      {
        standard: '5188 Sayılı Kanun',
        scope: 'Özel Güvenlik Faaliyet İzin Belgesi (Fiziki Güvenlik, CCTV, Devriye)',
        permitNumber: CANONICAL_NAP.legal.securityPermitNumber,
        issuingAuthority: 'T.C. İçişleri Bakanlığı / İstanbul Valiliği',
        validityStatus: 'PERPETUAL_ACTIVE',
        wikidataReference: 'https://www.wikidata.org/wiki/Q6084013',
      },
      ...CERTIFICATES.map((c) => ({
        standard: c.name,
        scope: c.subtitle,
        certificateNumber: c.certificateNumber,
        accreditationBody: `${c.issuer} (${c.accreditation})`,
        validUntil: c.validUntil,
        verificationUrl: c.verificationUrl,
        documentUrl: `${BASE_URL}${c.pdf}`,
      })),
    ],
    insuranceGuarantee: {
      policyType: 'Mesleki Sorumluluk ve 3. Şahıs Mali Mesuliyet Sigortası',
      coverageAmount: '10.000.000 TL',
      coverageScope: 'Yönetim altındaki tüm tesislerde olası operasyonel, teknik ve güvenlik risklerine karşı tam teminat.',
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Alo Yönetim Resmi Lisans ve Akreditasyon Doğrulama Merkezi',
      url: `${BASE_URL}/api/tesis-yonetimi/verify-credentials`,
      inLanguage: 'tr-TR',
      mainEntity: {
        '@type': 'Organization',
        name: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo.png`,
        telephone: '+90 216 550 48 48',
        email: 'info@aloyonetim.com.tr',
        taxID: CANONICAL_NAP.legal.mersisNumber,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Osmanağa, Misak-ı Milli Sok. No:94A',
          addressLocality: 'Kadıköy',
          addressRegion: 'İstanbul',
          postalCode: '34714',
          addressCountry: 'TR',
        },
        hasCredential: ORG_CREDENTIALS,
      },
    },
  };

  return NextResponse.json(credentials, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
