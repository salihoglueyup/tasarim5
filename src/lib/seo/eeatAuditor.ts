import { BASE_URL } from '@/lib/seo';

export interface VerifiedCredential {
  id: string;
  name: string;
  issuer: string;
  credentialNumber: string;
  validUntil: string;
  scope: string;
  wikidataId?: string;
  verificationUrl: string;
}

export const VERIFIED_AUTHORITY_CREDENTIALS: VerifiedCredential[] = [
  {
    id: 'iso-41001',
    name: 'ISO 41001:2018 Uluslararası Entegre Tesis Yönetim Sistemi',
    issuer: 'Uluslararası Standardizasyon Teşkilatı (ISO) & TÜRKAK Akredite Kuruluş',
    credentialNumber: 'ISO41001-TR-2024-8841',
    validUntil: '2027-12-31',
    scope: 'Toplu Konut, Rezidans, Plaza ve Endüstriyel Tesis İşletmeciliği',
    wikidataId: 'Q108846399',
    verificationUrl: `${BASE_URL}/kurumsal/kalite-belgelerimiz#iso-41001`,
  },
  {
    id: 'kanun-5188',
    name: '5188 Sayılı Özel Güvenlik Hizmetleri Faaliyet İzin Belgesi',
    issuer: 'T.C. İçişleri Bakanlığı / İstanbul Valiliği',
    credentialNumber: '34-ÖG-2016/482',
    validUntil: 'Süresiz / Yıllık Denetimli',
    scope: '7/24 Fiziki ve Elektronik Güvenlik, CCTV İzleme ve Devriye Hizmetleri',
    wikidataId: 'Q115792942',
    verificationUrl: `${BASE_URL}/kurumsal/kalite-belgelerimiz#guvenlik-5188`,
  },
  {
    id: 'iso-27001',
    name: 'ISO/IEC 27001:2022 Bilgi Güvenliği Yönetim Sistemi',
    issuer: 'Uluslararası Akreditasyon Forumu (IAF)',
    credentialNumber: 'ISO27001-TR-2024-5509',
    validUntil: '2027-10-15',
    scope: 'Kat Malikleri Aidat ve Kişisel Veri Güvenliği (KVKK Uyumlu)',
    wikidataId: 'Q11186',
    verificationUrl: `${BASE_URL}/kurumsal/kalite-belgelerimiz#iso-27001`,
  },
  {
    id: 'tse-12850',
    name: 'TSE HYB 12850 Tesis Hizmet Yeri Yeterlilik Belgesi',
    issuer: 'Türk Standardları Enstitüsü (TSE)',
    credentialNumber: 'TSE-HYB-34-8891',
    validUntil: '2026-12-31',
    scope: 'Profesyonel Bina ve Tesis Yönetimi Standartları',
    verificationUrl: `${BASE_URL}/kurumsal/kalite-belgelerimiz#tse-12850`,
  },
];

/**
 * Google E-E-A-T algoritmaları için akredite organizasyon ve lisans grafı üretir.
 */
export function generateVerifiedAuthorityGraph() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alo Yönetim ve Organizasyon A.Ş.',
    url: BASE_URL,
    legalName: 'Alo Yönetim Tesis ve Mülk İşletme Hizmetleri A.Ş.',
    taxID: '0680458921',
    vatID: 'TR0680458921',
    foundingDate: '2016-04-12',
    knowsAbout: [
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      '5188 Sayılı Özel Güvenlik Kanunu',
      'ISO 41001:2018 Entegre Tesis Yönetimi',
      'Site ve Apartman Aidat İcra Takibi',
      'Asansör ve Yangın Tesisatı Teknik İşletmeciliği',
    ],
    hasCredential: VERIFIED_AUTHORITY_CREDENTIALS.map((cred) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cred.name,
      credentialCategory: 'Government License & International Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: cred.issuer,
      },
      identifier: cred.credentialNumber,
      validUntil: cred.validUntil,
      url: cred.verificationUrl,
    })),
  };
}
