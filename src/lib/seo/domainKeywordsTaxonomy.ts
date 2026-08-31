/**
 * Çok Boyutlu Semantik Kelime Taksonomisi ve Arama Niyeti Motoru (Alo Yönetim)
 * 
 * Bu motor; 'Site Yönetimi', 'Tesis Yönetimi' ve 'Hukuk & Finans' dikeyindeki
 * tüm ticari, hukuki, yerel ve uzun kuyruklu anahtar kelimeleri tek çatı altında
 * sınıflandırır ve arama niyetine (Search Intent) göre dinamik içerik/SERP eşleştirmesi yapar.
 */

export type DomainPillar = 'site' | 'facility' | 'legal' | 'hybrid';

export interface KeywordTaxonomyItem {
  term: string;
  pillar: DomainPillar;
  intent: 'transactional' | 'commercial' | 'informational' | 'legal';
  priority: 'critical' | 'high' | 'medium';
  targetSlug: string;
  monthlySearchVolumeTier: '10K+' | '5K-10K' | '1K-5K' | 'LongTail';
}

/**
 * 🏢 1. Site ve Konut Yönetimi Taksonomisi (35+ Kritik Kelime)
 */
export const SITE_MANAGEMENT_TAXONOMY: KeywordTaxonomyItem[] = [
  { term: 'site yönetimi', pillar: 'site', intent: 'commercial', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '10K+' },
  { term: 'profesyonel site yönetimi', pillar: 'site', intent: 'transactional', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'site yönetim şirketi', pillar: 'site', intent: 'transactional', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'site yönetim şirketleri', pillar: 'site', intent: 'commercial', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '10K+' },
  { term: 'site yönetim şirketleri istanbul', pillar: 'site', intent: 'transactional', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'site yönetim firmaları', pillar: 'site', intent: 'commercial', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'apartman ve site yönetimi', pillar: 'site', intent: 'commercial', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '10K+' },
  { term: 'apartman yöneticiliği', pillar: 'site', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'site yöneticiliği', pillar: 'site', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'apartman yönetim şirketleri', pillar: 'site', intent: 'transactional', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'site yönetimi teklif al', pillar: 'site', intent: 'transactional', priority: 'critical', targetSlug: 'teklif-al', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site yönetimi fiyatları', pillar: 'site', intent: 'commercial', priority: 'high', targetSlug: 'hesaplayici', monthlySearchVolumeTier: '5K-10K' },
  { term: 'apartman yönetimi fiyatları', pillar: 'site', intent: 'commercial', priority: 'high', targetSlug: 'hesaplayici', monthlySearchVolumeTier: '1K-5K' },
  { term: 'toplu konut site yönetimi', pillar: 'site', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi/toplu-konut-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'rezidans site yönetimi', pillar: 'site', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi/rezidans-site-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'lüks site yönetimi', pillar: 'site', intent: 'commercial', priority: 'medium', targetSlug: 'tesis-yonetimi/rezidans-site-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'kat mülkiyeti site yönetimi', pillar: 'site', intent: 'legal', priority: 'high', targetSlug: 'tesis-yonetimi/rehber', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site yönetim planı', pillar: 'site', intent: 'legal', priority: 'high', targetSlug: 'sozluk', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site yönetim kurulu', pillar: 'site', intent: 'informational', priority: 'medium', targetSlug: 'sozluk', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site denetim kurulu', pillar: 'site', intent: 'informational', priority: 'medium', targetSlug: 'sozluk', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site işletme projesi', pillar: 'site', intent: 'legal', priority: 'high', targetSlug: 'hizmetler/aidat-takibi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site aidat yönetimi', pillar: 'site', intent: 'transactional', priority: 'critical', targetSlug: 'hizmetler/aidat-takibi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'site güvenliği şirketi', pillar: 'site', intent: 'transactional', priority: 'critical', targetSlug: 'hizmetler/guvenlik-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'site temizlik şirketi', pillar: 'site', intent: 'transactional', priority: 'high', targetSlug: 'hizmetler/temizlik-ve-hijyen', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site teknik servis bakım', pillar: 'site', intent: 'transactional', priority: 'high', targetSlug: 'hizmetler/teknik-bakim', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site bahçe peyzaj bakımı', pillar: 'site', intent: 'commercial', priority: 'medium', targetSlug: 'hizmetler/peyzaj-ve-bahce-bakimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site havuz bakım şirketi', pillar: 'site', intent: 'commercial', priority: 'medium', targetSlug: 'hizmetler/havuz-bakimi-ve-hijyen', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site böcek ilaçlama servisi', pillar: 'site', intent: 'commercial', priority: 'medium', targetSlug: 'hizmetler/hasere-ve-dezenfeksiyon', monthlySearchVolumeTier: '1K-5K' },
  { term: 'büyük sitelerde yönetim nasıl yapılır', pillar: 'site', intent: 'informational', priority: 'medium', targetSlug: 'tesis-yonetimi/toplu-konut-yonetimi', monthlySearchVolumeTier: 'LongTail' },
  { term: 'apartman yöneticisi nasıl seçilir', pillar: 'site', intent: 'informational', priority: 'medium', targetSlug: 'sozluk', monthlySearchVolumeTier: 'LongTail' },
  { term: 'site yönetim şirketi nasıl seçilir', pillar: 'site', intent: 'informational', priority: 'high', targetSlug: 'tesis-yonetimi/rehber', monthlySearchVolumeTier: 'LongTail' },
];

/**
 * 🏭 2. Tesis & Kurumsal İşletme Taksonomisi (30+ Kritik Kelime)
 */
export const FACILITY_MANAGEMENT_TAXONOMY: KeywordTaxonomyItem[] = [
  { term: 'tesis yönetimi', pillar: 'facility', intent: 'commercial', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '10K+' },
  { term: 'entegre tesis yönetimi', pillar: 'facility', intent: 'transactional', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'profesyonel tesis yönetimi', pillar: 'facility', intent: 'transactional', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'istanbul tesis yönetimi', pillar: 'facility', intent: 'transactional', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'tesis yönetim şirketi', pillar: 'facility', intent: 'transactional', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'tesis yönetim şirketleri', pillar: 'facility', intent: 'commercial', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'tesis yönetim firmaları', pillar: 'facility', intent: 'commercial', priority: 'critical', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'tesis işletmeciliği', pillar: 'facility', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'bina ve tesis yönetimi', pillar: 'facility', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'iso 41001 tesis yönetimi', pillar: 'facility', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'facility management istanbul', pillar: 'facility', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'plaza yönetimi', pillar: 'facility', intent: 'transactional', priority: 'high', targetSlug: 'tesis-yonetimi/plaza-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'iş merkezi yönetimi', pillar: 'facility', intent: 'transactional', priority: 'high', targetSlug: 'tesis-yonetimi/plaza-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'ofis binası yönetimi', pillar: 'facility', intent: 'commercial', priority: 'medium', targetSlug: 'tesis-yonetimi/plaza-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'sanayi tesisi yönetimi', pillar: 'facility', intent: 'transactional', priority: 'high', targetSlug: 'tesis-yonetimi/sanayi-tesisi-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'fabrika tesis yönetimi', pillar: 'facility', intent: 'transactional', priority: 'medium', targetSlug: 'tesis-yonetimi/sanayi-tesisi-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'organize sanayi tesis bakımı', pillar: 'facility', intent: 'commercial', priority: 'medium', targetSlug: 'tesis-yonetimi/sanayi-tesisi-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'mülk yönetimi', pillar: 'facility', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'tesis ve mülk hizmetleri', pillar: 'facility', intent: 'commercial', priority: 'high', targetSlug: 'tesis-yonetimi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'teknik işletme yönetimi', pillar: 'facility', intent: 'transactional', priority: 'high', targetSlug: 'hizmetler/teknik-bakim', monthlySearchVolumeTier: '1K-5K' },
  { term: 'önleyici teknik bakım', pillar: 'facility', intent: 'commercial', priority: 'high', targetSlug: 'hizmetler/teknik-bakim', monthlySearchVolumeTier: '1K-5K' },
  { term: 'tesis keşif formu', pillar: 'facility', intent: 'transactional', priority: 'medium', targetSlug: 'teklif-al', monthlySearchVolumeTier: 'LongTail' },
  { term: 'tesis yönetim şartnamesi rfp', pillar: 'facility', intent: 'transactional', priority: 'medium', targetSlug: 'tesis-yonetimi/rehber', monthlySearchVolumeTier: 'LongTail' },
];

/**
 * ⚖️ 3. Hukuk, Mevzuat ve Finans Taksonomisi (20+ Kritik Kelime)
 */
export const LEGAL_FINANCE_TAXONOMY: KeywordTaxonomyItem[] = [
  { term: 'kat mülkiyeti kanunu', pillar: 'legal', intent: 'legal', priority: 'critical', targetSlug: 'sozluk', monthlySearchVolumeTier: '10K+' },
  { term: 'kmk 634', pillar: 'legal', intent: 'legal', priority: 'critical', targetSlug: 'sozluk', monthlySearchVolumeTier: '5K-10K' },
  { term: 'aidat icra takibi', pillar: 'legal', intent: 'legal', priority: 'critical', targetSlug: 'hizmetler/hukuk-ve-icra-danismanligi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'site aidat gecikme tazminatı', pillar: 'legal', intent: 'legal', priority: 'high', targetSlug: 'hizmetler/aidat-takibi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'kmk madde 20 aidat faizi', pillar: 'legal', intent: 'legal', priority: 'high', targetSlug: 'hizmetler/aidat-takibi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'kmk madde 34 yönetici atanması', pillar: 'legal', intent: 'legal', priority: 'high', targetSlug: 'sozluk', monthlySearchVolumeTier: '1K-5K' },
  { term: 'kmk madde 37 işletme projesi', pillar: 'legal', intent: 'legal', priority: 'high', targetSlug: 'sozluk', monthlySearchVolumeTier: '1K-5K' },
  { term: 'kmk madde 28 yönetim planı', pillar: 'legal', intent: 'legal', priority: 'high', targetSlug: 'sozluk', monthlySearchVolumeTier: '1K-5K' },
  { term: 'genel kurul iptal davası', pillar: 'legal', intent: 'legal', priority: 'medium', targetSlug: 'hizmetler/hukuk-ve-icra-danismanligi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'site yönetimi avukatı istanbul', pillar: 'legal', intent: 'transactional', priority: 'high', targetSlug: 'hizmetler/hukuk-ve-icra-danismanligi', monthlySearchVolumeTier: '1K-5K' },
  { term: '5188 özel güvenlik kanunu', pillar: 'legal', intent: 'legal', priority: 'high', targetSlug: 'hizmetler/guvenlik-yonetimi', monthlySearchVolumeTier: '5K-10K' },
  { term: 'yargıtay emsal kararları site yönetimi', pillar: 'legal', intent: 'legal', priority: 'high', targetSlug: 'hizmetler/hukuk-ve-icra-danismanligi', monthlySearchVolumeTier: '1K-5K' },
  { term: 'zemin kat asansör masrafı yargıtay kararı', pillar: 'legal', intent: 'legal', priority: 'medium', targetSlug: 'hizmetler/hukuk-ve-icra-danismanligi', monthlySearchVolumeTier: 'LongTail' },
  { term: 'cam balkon 4/5 rıza yargıtay kararı', pillar: 'legal', intent: 'legal', priority: 'medium', targetSlug: 'hizmetler/hukuk-ve-icra-danismanligi', monthlySearchVolumeTier: 'LongTail' },
];

export const ALL_TAXONOMY_KEYWORDS: KeywordTaxonomyItem[] = [
  ...SITE_MANAGEMENT_TAXONOMY,
  ...FACILITY_MANAGEMENT_TAXONOMY,
  ...LEGAL_FINANCE_TAXONOMY,
];

/**
 * Verilen metin veya sorgunun hangi ana dikey (pillar) arama niyetine ait olduğunu tespit eder.
 */
export function detectPillarIntent(text: string): DomainPillar {
  const normalized = text.toLowerCase();

  let siteScore = 0;
  let facilityScore = 0;
  let legalScore = 0;

  SITE_MANAGEMENT_TAXONOMY.forEach((item) => {
    if (normalized.includes(item.term)) siteScore += item.priority === 'critical' ? 3 : 1;
  });

  FACILITY_MANAGEMENT_TAXONOMY.forEach((item) => {
    if (normalized.includes(item.term)) facilityScore += item.priority === 'critical' ? 3 : 1;
  });

  LEGAL_FINANCE_TAXONOMY.forEach((item) => {
    if (normalized.includes(item.term)) legalScore += item.priority === 'critical' ? 3 : 1;
  });

  if (legalScore > siteScore && legalScore > facilityScore) return 'legal';
  if (siteScore > 0 && facilityScore > 0 && Math.abs(siteScore - facilityScore) <= 2) return 'hybrid';
  if (siteScore > facilityScore) return 'site';
  if (facilityScore > siteScore) return 'facility';

  return 'hybrid';
}

/**
 * İlgili dikey için tüm anahtar kelimeleri string dizisi olarak döner.
 */
export function getKeywordsByPillar(pillar: DomainPillar): string[] {
  if (pillar === 'site') return SITE_MANAGEMENT_TAXONOMY.map((k) => k.term);
  if (pillar === 'facility') return FACILITY_MANAGEMENT_TAXONOMY.map((k) => k.term);
  if (pillar === 'legal') return LEGAL_FINANCE_TAXONOMY.map((k) => k.term);
  return ALL_TAXONOMY_KEYWORDS.map((k) => k.term);
}

/**
 * Belirli bir dikey ve ilçe için özel optimize edilmiş SERP Başlığı üretir.
 */
export function getPillarTitleTemplate(pillar: DomainPillar, districtName?: string): string {
  const prefix = districtName ? `${districtName} ` : 'İstanbul ';

  switch (pillar) {
    case 'site':
      return `${prefix}Profesyonel Site ve Apartman Yönetimi Şirketi | Alo Yönetim`;
    case 'facility':
      return `${prefix}Entegre Tesis Yönetimi ve İşletmeciliği — ISO 41001 | Alo Yönetim`;
    case 'legal':
      return `${prefix}Site Yönetimi Hukuku & KMK 634 İcra Danışmanlığı | Alo Yönetim`;
    case 'hybrid':
    default:
      return `${prefix}Tesis Yönetimi & Site Yönetimi — Profesyonel Yönetim Şirketi | Alo Yönetim`;
  }
}

/**
 * Belirli bir dikey ve ilçe için özel optimize edilmiş SERP Açıklaması üretir.
 */
export function getPillarDescriptionTemplate(pillar: DomainPillar, districtName?: string): string {
  const loc = districtName ? `${districtName} ilçesinde` : 'İstanbul genelinde 39 ilçede';

  switch (pillar) {
    case 'site':
      return `${loc} konut siteleri ve apartmanlar için KMK 634 uyumlu profesyonel site yönetimi. 5188 güvenlik, aidat icra takibi, %30 tasarruf ve 15-25 dk SLA!`;
    case 'facility':
      return `${loc} plaza, iş merkezi ve ticari gayrimenkuller için ISO 41001 sertifikalı entegre tesis yönetimi, önleyici teknik bakım ve %99.2 verimlilik.`;
    case 'legal':
      return `${loc} kat mülkiyeti uyuşmazlıkları, aidat icra takibi, işletme projesi tanzimi ve Yargıtay emsal kararlarıyla tam hukuki danışmanlık.`;
    case 'hybrid':
    default:
      return `${loc} apartman, site ve rezidanslar için KMK 634 uyumlu profesyonel site ve tesis yönetimi. 5188 güvenlik, aidat icra takibi ve %30 maliyet tasarrufu!`;
  }
}
