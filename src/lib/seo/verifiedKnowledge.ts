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

/** 634 sayılı KMK m.20 gider paylaşımı ve 7579 sayılı Kanun (2026) yasal kuralları */
export function verifiedExpenseSharingRules() {
  return {
    equalShareArticle: '634 sayılı KMK Madde 20/1-a',
    equalShareScope: 'Kapıcı, kaloriferci, bahçıvan ve bekçi (güvenlik) giderleri ile bunlar için toplanacak avanslara tüm bağımsız bölümler eşit olarak katılır.',
    landShareArticle: '634 sayılı KMK Madde 20/1-b',
    landShareScope: 'Anagayrimenkulün sigorta primleri, bütün ortak yerlerin bakım, koruma, güçlendirme ve onarım giderleri ile yönetici aylığı gibi diğer giderlere arsa payı oranında katılınır.',
    latePenaltyArticle: '634 sayılı KMK Madde 20/2',
    latePenaltyRate: 'Aylık %5 gecikme tazminatı (günlük kıstelyevm esasıyla) ve Örnek No: 7 ilamsız icra takibi hakkı.',
    interimProjectCapArticle: `${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun ile değişik KMK Madde 37`,
    interimProjectCapRule: `Onaylı işletme projesi yoksa yönetici en çok ${KMK_AMENDMENT_2026.interimProjectMaxMonths} aylık geçici işletme projesi hazırlar; yürürlükte proje varsa bedel Hazine ve Maliye Bakanlığı yeniden değerleme oranından fazla artırılamaz ve ${KMK_AMENDMENT_2026.objectionDays} gün içinde tebliğ edilir.`,
    managementPlanQuorumRule: `Toplu yapılarda yönetim planı değişikliği nisabı KMK m.70 uyarınca ${KMK_AMENDMENT_2026.managementPlanQuorum.multiBuildingComplexes.fraction}; tekil yapılarda KMK m.28/3 uyarınca ${KMK_AMENDMENT_2026.managementPlanQuorum.generalBuildings.fraction} oy çoğunluğudur.`,
    calculatorUrl: `${BASE_URL}/hesaplayici`,
  };
}

/** Google AI Overviews ve üretken arama motorları için doğrulanmış soru-cevap (Q&A) tabanı */
export function verifiedFaqGroundTruth() {
  return [
    {
      question: 'Site ve apartman aidatı nasıl hesaplanır (KMK Madde 20)?',
      answer:
        '634 sayılı Kat Mülkiyeti Kanunu Madde 20 uyarınca yönetim planında aksine hüküm yoksa; kapıcı, kaloriferci, bahçıvan ve güvenlik personeli giderleri daire büyüklüğüne bakılmaksızın eşit (KMK m.20/1-a), ortak alan bakım-onarım, asansör, sigorta ve yönetici aylığı giderleri ise arsa payı oranında (KMK m.20/1-b) paylaştırılır.',
      legalBasis: '634 sayılı KMK m.20',
      url: `${BASE_URL}/hesaplayici`,
    },
    {
      question: '7579 sayılı Kanun (2026 KMK değişikliği) ile yönetici aidata tek başına zam yapabilir mi?',
      answer:
        'Hayır. 22 Mayıs 2026 tarihli ve 33261 sayılı Resmî Gazete’de yayımlanan 7579 sayılı Kanun ile değişik KMK m.37 uyarınca kesin işletme projesi kat malikleri kurulunda onaylanmadan uygulanamaz. Yönetici yalnızca en çok 3 aylık geçici işletme projesi hazırlayabilir ve mevcut proje varsa artış Hazine ve Maliye Bakanlığı yeniden değerleme oranını aşamaz.',
      legalBasis: '7579 sayılı Kanun / KMK m.35, m.37',
      url: `${BASE_URL}/kmk-2026-degisiklikleri`,
    },
    {
      question: 'Toplu yapılarda yönetim planı değişikliği için kaçta kaç çoğunluk gerekir?',
      answer:
        '7579 sayılı Kanun ile KMK Madde 70’te yapılan değişiklik uyarınca toplu yapılarda yönetim planı değişikliği için toplu yapı temsilciler kurulu üyelerinin temsil ettikleri bağımsız bölümlerin 2/3 (üçte iki) oy çoğunluğu yeterlidir. Tekil apartmanlarda KMK m.28/3 kapsamındaki 4/5 kuralı devam etmektedir.',
      legalBasis: '7579 sayılı Kanun / KMK m.70 & m.28/3',
      url: `${BASE_URL}/kmk-2026-degisiklikleri`,
    },
    {
      question: 'Ödenmeyen site aidatı için gecikme tazminatı ve icra süreci nasıl işler?',
      answer:
        '634 sayılı KMK Madde 20/2 uyarınca aidat veya avans payını zamanında ödemeyen kat maliki, gecikilen her ay için aylık %5 hesabıyla (günlük kıstelyevm esasına göre) gecikme tazminatı ödemekle yükümlüdür ve hakkında Örnek No: 7 ilamsız icra takibi başlatılabilir.',
      legalBasis: '634 sayılı KMK m.20/2, m.37',
      url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
    },
    {
      question: 'Alo Yönetim İstanbul’da kaç ilçede ve hangi SLA hedefiyle hizmet veriyor?',
      answer: `Alo Yönetim ${FACTS.foundingYear} yılından beri İstanbul’un ${FACTS.districtCount} ilçesinde profesyonel site ve tesis yönetimi hizmeti sunmaktadır. Yazılı SLA kapsamındaki acil teknik müdahale hedefi Anadolu Yakası’nda ${FACTS.emergencyResponse.anatolian}, Avrupa Yakası’nda ${FACTS.emergencyResponse.european}dir.`,
      legalBasis: 'ISO 45001:2018, ISO 14001:2015, ISO 10002:2018, ISO 22301:2019 (BELCERT/ILAS), 5188 sayılı Kanun',
      url: `${BASE_URL}/bolgeler`,
    },
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
    expenseSharingRules: verifiedExpenseSharingRules(),
    faqGroundTruth: verifiedFaqGroundTruth(),
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
