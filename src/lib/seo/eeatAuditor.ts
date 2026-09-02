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

export interface EEATAuditInput {
  path: string;
  authorName?: string;
  authorBio?: string;
  publishDate?: string;
  modifiedDate?: string;
  text?: string;
  officialCitations?: string[];
}

export interface EEATAuditResult {
  path: string;
  score: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'FAIL';
  checks: {
    authorCredentialCheck: boolean;
    temporalRecencyCheck: boolean;
    officialLegalCitationCheck: boolean;
    accreditationSignalCheck: boolean;
  };
  recommendations: string[];
}

/**
 * Faz 137: Sayfa Başına E-E-A-T (Deneyim, Uzmanlık, Otoriterlik, Güvenilirlik) Denetim Motoru
 */
export function auditPageEEAT(input: EEATAuditInput): EEATAuditResult {
  let score = 0;
  const recommendations: string[] = [];

  // 1. Yazar ve Uzmanlık Denetimi (25 Puan)
  const hasAuthorBio = Boolean(input.authorName && input.authorName.trim().length > 2 && input.authorBio && input.authorBio.length > 20);
  if (hasAuthorBio) {
    score += 25;
  } else if (input.authorName) {
    score += 15;
    recommendations.push('Yazar için doğrulanmış uzmanlık biyografisi ve mezuniyet bilgisi ekleyin.');
  } else {
    recommendations.push('İçeriğe uzman yazar kartı (Person schema + bio) atanmalıdır.');
  }

  // 2. Yayın ve Güncellik (Recency) Denetimi (25 Puan)
  const hasValidDates = Boolean(input.publishDate && !isNaN(Date.parse(input.publishDate)));
  const hasModified = Boolean(input.modifiedDate && !isNaN(Date.parse(input.modifiedDate)));
  if (hasValidDates && hasModified) {
    score += 25;
  } else if (hasValidDates) {
    score += 18;
    recommendations.push('Son güncelleme tarihi (dateModified) ekleyerek tazelik sinyalini güçlendirin.');
  } else {
    recommendations.push('Google için ISO formatında datePublished ve dateModified meta etiketleri eksik.');
  }

  // 3. Resmi Kanun ve Yargıtay Atıf Denetimi (25 Puan)
  const fullText = (input.text || '').toLowerCase();
  const hasOfficialLaws =
    (input.officialCitations && input.officialCitations.length > 0) ||
    fullText.includes('kat mülkiyeti') ||
    fullText.includes('kmk 634') ||
    fullText.includes('5188 sayılı') ||
    fullText.includes('mevzuat.gov.tr');

  if (hasOfficialLaws) {
    score += 25;
  } else {
    recommendations.push('İçeriğe 634 Sayılı KMK veya Resmi Gazete / Yargıtay emsal karar referansı ekleyin.');
  }

  // 4. ISO & Kurumsal Akreditasyon Sinyalleri (25 Puan)
  const hasAccreditation =
    fullText.includes('iso 41001') ||
    fullText.includes('iso 9001') ||
    fullText.includes('türkak') ||
    fullText.includes('tse hyb') ||
    fullText.includes('valilik');

  if (hasAccreditation) {
    score += 25;
  } else {
    recommendations.push('Kurumsal güvenilirlik için ISO 41001 veya TÜRKAK akreditasyon rozetlerine atıfta bulunun.');
  }

  let grade: 'A+' | 'A' | 'B' | 'C' | 'FAIL' = 'FAIL';
  if (score >= 90) grade = 'A+';
  else if (score >= 75) grade = 'A';
  else if (score >= 60) grade = 'B';
  else if (score >= 40) grade = 'C';

  return {
    path: input.path,
    score,
    grade,
    checks: {
      authorCredentialCheck: hasAuthorBio,
      temporalRecencyCheck: hasValidDates,
      officialLegalCitationCheck: hasOfficialLaws,
      accreditationSignalCheck: hasAccreditation,
    },
    recommendations,
  };
}

