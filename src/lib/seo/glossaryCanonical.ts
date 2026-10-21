/**
 * Sözlük kanonik birleştirme haritası (Faz 23).
 *
 * Aynı KMK maddesini/kavramını anlatan birden çok sözlük terimi, GSC'de aynı sorgular için
 * birbiriyle yarışıyordu (ör. "kmk" ~2.300 gösterim / poz. 10; "kmk 20" iki ayrı sayfa).
 * Yinelenen terim sayfaları kaldırılmaz (iç linkler ve geçmiş sinyaller korunur) ancak:
 *  - rel=canonical birincil terime işaret eder,
 *  - sitemap yalnızca birincil terimi listeler.
 * Takma ad (alias) URL'leri (ör. /sozluk/kmk-20) ise sayfada 308 ile birincil adrese yönlendirilir.
 */

export const GLOSSARY_CANONICAL_MAP: Readonly<Record<string, string>> = {
  // KMK genel ("kmk", "kmk nedir", "kmk ne demek", "kmk açılımı")
  'kmk-ne-demek-634-sayili-kat-mulkiyeti-kanunu': 'kat-mulkiyeti-kanunu-kmk',
  // KMK m.20 (aidat ve %5 gecikme tazminatı)
  'kat-mulkiyeti-kanunu-madde-20-aidat-borcu': 'kmk-madde-20-genel-giderlere-katilma-aidat-borcu',
  // KMK m.37 (işletme projesi) — "Geçici İşletme Projesi" ayrı kavram olarak kalır
  'kat-mulkiyeti-kanunu-madde-37-isletme-projesi': 'kmk-37-isletme-projesi-butce-itiraz-suresi',
  // KMK m.66-74 toplu yapı (m.69 "ek madde" değildir)
  'toplu-yapi-yonetimi-kmk-ek-madde-69': 'toplu-yapi-kmk-m66-70',
  'toplu-yapi-yonetimi-kmk-66-74': 'toplu-yapi-kmk-m66-70',
  // Asansör etiketleri ("asansör yeşil etiket nedir", "mavi etiket") tek sayfada
  'yesil-etiket-asansor': 'asansor-kirmizi-sari-mavi-yesil-etiket',
};

/** Verilen terim slug'ının kanonik (birincil) slug'ını döndürür. */
export function getCanonicalTermSlug(slug: string): string {
  return GLOSSARY_CANONICAL_MAP[slug] ?? slug;
}

/** Slug yinelenen (kanonik olmayan) bir terim mi? Sitemap filtrelemesi için. */
export function isNonCanonicalTermSlug(slug: string): boolean {
  return slug in GLOSSARY_CANONICAL_MAP;
}
