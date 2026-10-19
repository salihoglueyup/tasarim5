import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { DISTRICTS } from '@/data/districts';
import { HELD_CERTIFICATIONS } from '@/data/certificates';
import { SERVICES } from '@/data/services';
import { REAL_REFERENCES, countBySector } from '@/data/realReferences';
import { FACTS, RESPONSE_TARGET_TEXT } from '@/lib/facts';
import { KMK_AMENDMENT_2026 } from '@/lib/legal/kmkAmendment2026';

/**
 * AI/API uçlarının tek veri kaynağı. YALNIZCA doğrulanmış bilgiler (bkz. src/lib/facts.ts).
 * Oran, puan, vaka, mahkeme kararı numarası ve "garanti" ifadeleri bilerek yoktur; ekleme.
 */

export const VERIFIED_DISCLAIMER =
  'Bu veri genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez. Somut durumlar için avukata danışılmalıdır.';

export function verifiedOrganization() {
  return {
    legalName: CANONICAL_NAP.legal.legalName,
    brandName: 'Alo Yönetim',
    foundingYear: FACTS.foundingYear,
    teamSize: `yaklaşık ${FACTS.teamSize} kişi`,
    mersisNumber: CANONICAL_NAP.legal.mersisNumber,
    tradeRegistryNumber: CANONICAL_NAP.legal.tradeRegistryNumber,
    taxOffice: CANONICAL_NAP.legal.taxOffice,
    address: CANONICAL_NAP.address.fullDisplayAddress,
    geo: { latitude: CANONICAL_NAP.geo.latitude, longitude: CANONICAL_NAP.geo.longitude },
    phone: CANONICAL_NAP.contact.phoneDisplay,
    email: CANONICAL_NAP.contact.email,
    website: BASE_URL,
    languages: ['tr', 'en', 'ru', 'ar'],
  };
}

export function verifiedCertifications() {
  return HELD_CERTIFICATIONS.map(({ standard, title, certBody, certificateNumber, validUntil, url }) => ({
    standard,
    title,
    certBody,
    certificateNumber,
    validUntil,
    url: `${BASE_URL}${url}`,
  }));
}

export function verifiedServices() {
  return SERVICES.map((s) => ({ name: s.name, slug: s.slug, url: `${BASE_URL}${s.pillar}` }));
}

export function verifiedDistricts() {
  return DISTRICTS.map((d) => ({
    name: d.name,
    slug: d.slug,
    side: d.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası',
    url: `${BASE_URL}/bolgeler/${d.slug}`,
    geo: d.geo,
  }));
}

export function verifiedReferences() {
  return {
    count: FACTS.referenceCount,
    bySector: countBySector(),
    url: `${BASE_URL}/referanslar`,
    names: REAL_REFERENCES.map((r) => r.name),
  };
}

export function verifiedCoverage() {
  return {
    districtCount: FACTS.districtCount,
    emergencyResponseTarget: {
      anatolianSide: FACTS.emergencyResponse.anatolian,
      europeanSide: FACTS.emergencyResponse.european,
      note: RESPONSE_TARGET_TEXT.tr,
    },
  };
}

/** Kanun atıfları: yalnızca kanun/madde seviyesinde; mahkeme kararı numarası içermez. */
export function verifiedLegalReferences() {
  return [
    { law: '634 sayılı Kat Mülkiyeti Kanunu', topic: 'Kat malikleri kurulu, yönetici, gider ve avans payları' },
    { law: '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun', topic: 'Özel güvenlik izni ve görevlilerin istihdamı' },
    {
      law: `${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun`,
      topic: 'KMK m.35, 37 ve 70 değişiklikleri',
      gazette: `${KMK_AMENDMENT_2026.gazetteDateTr}, sayı ${KMK_AMENDMENT_2026.gazetteNumber}`,
      url: KMK_AMENDMENT_2026.gazetteUrl,
      detail: `${BASE_URL}/kmk-2026-degisiklikleri`,
    },
  ];
}

export function verifiedFacilitySubsectors() {
  return [
    { name: 'Rezidans ve Site Yönetimi', slug: 'rezidans-site-yonetimi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi` },
    { name: 'Plaza ve İş Merkezi Yönetimi', slug: 'plaza-yonetimi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi` },
    { name: 'Toplu Konut ve Karma Proje Yönetimi', slug: 'toplu-konut-yonetimi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi` },
    { name: 'Sanayi Tesisi ve OSB Yönetimi', slug: 'sanayi-tesisi-yonetimi', url: `${BASE_URL}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi` },
  ];
}

export function verifiedKnowledge() {
  return {
    disclaimer: VERIFIED_DISCLAIMER,
    organization: verifiedOrganization(),
    coverage: verifiedCoverage(),
    certifications: verifiedCertifications(),
    services: verifiedServices(),
    facilitySubsectors: verifiedFacilitySubsectors(),
    districts: verifiedDistricts(),
    references: verifiedReferences(),
    legalReferences: verifiedLegalReferences(),
    resources: {
      llms: `${BASE_URL}/llms.txt`,
      llmsFull: `${BASE_URL}/llms-full.txt`,
      references: `${BASE_URL}/referanslar`,
      kmk2026: `${BASE_URL}/kmk-2026-degisiklikleri`,
      facilityGuide: `${BASE_URL}/hizmetler/tesis-yonetimi/rehber`,
      mobileApp: `${BASE_URL}/app`,
      blog: `${BASE_URL}/blog`,
      glossary: `${BASE_URL}/sozluk`,
      calculator: `${BASE_URL}/hesaplayici`,
      quote: `${BASE_URL}/teklif-al`,
      contact: `${BASE_URL}/iletisim`,
    },
  };
}

export const VERIFIED_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
  'Access-Control-Allow-Origin': '*',
} as const;
