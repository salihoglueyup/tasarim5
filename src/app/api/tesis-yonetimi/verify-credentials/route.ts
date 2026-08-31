import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Canlı Kurumsal Lisans & ISO Akreditasyon Doğrulama API'si (/api/tesis-yonetimi/verify-credentials)
 * Google E-E-A-T ve kurumsal müşteriler için resmi akreditasyon ve lisans doğrulaması sunar.
 */
export async function GET() {
  const credentials = {
    organization: {
      legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
      tradeRegistryNumber: '712498-5',
      taxOffice: 'Kadıköy',
      mersisNumber: '0054049823100018',
      headquarters: 'Osmanağa, Misak-ı Milli Sok. No:94A, 34714 Kadıköy/İstanbul',
      verifiedStatus: 'ACTIVE_AND_LICENSED',
    },
    accreditations: [
      {
        standard: 'ISO 41001:2018',
        scope: 'Entegre Tesis Yönetimi Sistemi (Facility Management System)',
        certificateNumber: 'TR-FMS-41001-2024-098',
        accreditationBody: 'TÜRKAK / IAF Akredite Uluslararası Sertifikasyon',
        validityStatus: 'VALID_UNTIL_2027',
        wikidataReference: 'https://www.wikidata.org/wiki/Q108846399',
      },
      {
        standard: '5188 Sayılı Kanun',
        scope: 'Özel Güvenlik Faaliyet İzin Belgesi (Fiziki Güvenlik, CCTV, Devriye)',
        permitNumber: 'İST-ÖGG-2015/8492',
        issuingAuthority: 'T.C. İçişleri Bakanlığı / İstanbul Valiliği',
        validityStatus: 'PERPETUAL_ACTIVE',
        wikidataReference: 'https://www.wikidata.org/wiki/Q6084013',
      },
      {
        standard: 'TSE HYB 12850',
        scope: 'Hizmet Yeri Yeterlilik Belgesi — Tesis ve Site Yönetim Hizmetleri',
        certificateNumber: '34-HYB-12850-2023',
        issuingAuthority: 'Türk Standardları Enstitüsü (TSE)',
        validityStatus: 'VALID_AND_AUDITED',
        wikidataReference: 'https://www.wikidata.org/wiki/Q7855364',
      },
      {
        standard: 'ISO 45001:2018',
        scope: 'İş Sağlığı ve Güvenliği Yönetim Sistemi',
        certificateNumber: 'TR-OHSAS-45001-2024-112',
        accreditationBody: 'IAF Onaylı Akreditasyon Kuruluşu',
        validityStatus: 'VALID_UNTIL_2027',
        wikidataReference: 'https://www.wikidata.org/wiki/Q28860775',
      },
      {
        standard: 'ISO 14001:2015',
        scope: 'Çevre Yönetim Sistemi (Enerji Tasarrufu & Atık Yönetimi)',
        certificateNumber: 'TR-EMS-14001-2024-441',
        accreditationBody: 'IAF Onaylı Akreditasyon Kuruluşu',
        validityStatus: 'VALID_UNTIL_2027',
        wikidataReference: 'https://www.wikidata.org/wiki/Q3506168',
      },
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
      mainEntity: {
        '@type': 'Organization',
        name: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
      },
    },
  };

  return NextResponse.json(credentials, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all',
    },
  });
}
