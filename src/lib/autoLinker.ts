import { TERMS } from '@/data/dictionary';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';
import { FACILITY_MANAGEMENT_ENTITIES } from '@/lib/seoEngine';

/**
 * Gelişmiş Dinamik İç Linkleme ve Semantik Örümcek Ağı Motoru (Alo Yönetim).
 *
 * Bu motor:
 * 1. Hizmet sütunları (Pillars),
 * 2. 12 İlçe x Hizmet kombinasyonları (Spokes),
 * 3. 10+ Tesis Yönetimi Semantik Varlığı (Entities & ISO/KMK Standartları),
 * 4. KMK ve Tesis Yönetimi Sözlük terimlerini,
 * sayfa içeriğindeki metne doğal ve dengeli biçimde bağlar.
 *
 * Self-referencing link döngülerini (sayfanın kendine link vermesini) önler.
 */

// 1. Dinamik Hizmet Linkleri
const SERVICE_LINKS = SERVICES.map((s) => ({
  term: s.name.toLowerCase(),
  href: s.pillar,
}));

// 2. İlçe x Hizmet Semantik Kombinasyonları (Yerel SEO Siloları)
const DISTRICT_SERVICE_LINKS: { term: string; href: string }[] = [];
for (const district of DISTRICTS) {
  const dName = district.name.toLowerCase();

  // İlçe ana sayfası
  DISTRICT_SERVICE_LINKS.push({
    term: `${dName} tesis yönetimi`,
    href: `/bolgeler/${district.slug}/tesis-yonetimi`,
  });
  DISTRICT_SERVICE_LINKS.push({
    term: `${dName} site yönetimi`,
    href: `/bolgeler/${district.slug}/tesis-yonetimi`,
  });
  DISTRICT_SERVICE_LINKS.push({
    term: `${dName} apartman yönetimi`,
    href: `/bolgeler/${district.slug}/tesis-yonetimi`,
  });
  DISTRICT_SERVICE_LINKS.push({
    term: `${dName} güvenlik`,
    href: `/bolgeler/${district.slug}/guvenlik-yonetimi`,
  });
  DISTRICT_SERVICE_LINKS.push({
    term: `${dName} teknik bakım`,
    href: `/bolgeler/${district.slug}/teknik-bakim`,
  });
  DISTRICT_SERVICE_LINKS.push({
    term: `${dName} temizlik`,
    href: `/bolgeler/${district.slug}/temizlik-ve-hijyen`,
  });
}

// 3. Varlık (Entity) Linkleri
const ENTITY_LINKS: { term: string; href: string }[] = [];
for (const entity of FACILITY_MANAGEMENT_ENTITIES) {
  for (const variation of entity.variations) {
    ENTITY_LINKS.push({
      term: variation.toLowerCase(),
      href: entity.pillarUrl,
    });
  }
}

// 4. Ekstra Spesifik Eşanlamlılar
const CUSTOM_LINKS: { term: string; href: string }[] = [
  { term: 'güvenlik akademisi', href: '/guvenlik-akademisi' },
  { term: 'aidat hesaplama', href: '/hesaplayici' },
  { term: 'kmk hesaplayıcı', href: '/hesaplayici' },
  { term: 'işletme projesi rehberi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'asansör yeşil etiket', href: '/hizmetler/teknik-bakim' },
  { term: 'tse 13811 hijyen', href: '/hizmetler/temizlik-ve-hijyen' },
];

// 5. Sözlük Terimleri
const DICTIONARY_LINKS = TERMS.map((t) => ({
  term: t.term.toLowerCase().replace(/ \([^)]*\)/g, ''),
  href: `/sozluk#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
}));

const EXTRA_DICTIONARY_LINKS = TERMS.filter((t) => t.term.includes('('))
  .map((t) => {
    const match = t.term.match(/\(([^)]+)\)/);
    return match
      ? {
          term: match[1].toLowerCase(),
          href: `/sozluk#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        }
      : null;
  })
  .filter(Boolean) as { term: string; href: string }[];

// Tüm link havuzunu tekilleştir ve en uzun terimden en kısaya sırala
const RAW_LINKS = [
  ...DISTRICT_SERVICE_LINKS,
  ...ENTITY_LINKS,
  ...CUSTOM_LINKS,
  ...SERVICE_LINKS,
  ...DICTIONARY_LINKS,
  ...EXTRA_DICTIONARY_LINKS,
];

const UNIQUE_MAP = new Map<string, string>();
for (const item of RAW_LINKS) {
  const cleanTerm = item.term.trim().toLowerCase();
  if (cleanTerm && !UNIQUE_MAP.has(cleanTerm)) {
    UNIQUE_MAP.set(cleanTerm, item.href);
  }
}

const AUTO_LINKS_SORTED = Array.from(UNIQUE_MAP.entries())
  .map(([term, href]) => ({ term, href }))
  .sort((a, b) => b.term.length - a.term.length);

// Regex'ler modül yüklenirken derlenir
const AUTO_LINK_ENTRIES = AUTO_LINKS_SORTED.map((link) => ({
  ...link,
  regex: new RegExp(
    `(?<![<\\/a-zA-Z0-9ğüşıöçâîûĞÜŞİÖÇÂÎÛ])(${escapeRegExp(link.term)})(?![a-zA-Z0-9ğüşıöçâîûĞÜŞİÖÇÂÎÛ>])`,
    'iu'
  ),
}));

export const AUTO_LINKS = AUTO_LINKS_SORTED;

/**
 * Verilen HTML metni içerisindeki anahtar kelimeleri bulup,
 * belirlenen sayfalara/sözlük maddelerine otomatik SEO linkleri yerleştirir.
 *
 * @param html Kaynak HTML metni
 * @param currentUrl Bulunulan sayfa yolu (self-referencing döngüleri engeller)
 * @param maxLinks Sayfa başına maksimum yerleştirilecek otomatik link sayısı (varsayılan: 8)
 */
export function autoLinkHtml(
  html: string,
  currentUrl?: string,
  maxLinks: number = 8
): string {
  if (!html) return '';
  let result = html;
  const usedTerms = new Set<string>();
  const usedUrls = new Set<string>();
  let insertedCount = 0;

  const normalizedCurrentUrl = currentUrl ? currentUrl.replace(/\/+$/, '') : '';

  for (const entry of AUTO_LINK_ENTRIES) {
    if (insertedCount >= maxLinks) break;
    if (usedTerms.has(entry.term)) continue;

    // Kendine link vermeyi engelle
    if (normalizedCurrentUrl && (entry.href === normalizedCurrentUrl || entry.href === `${normalizedCurrentUrl}/`)) {
      continue;
    }

    // Aynı hedefe çok fazla link verilmesini sınırla
    if (usedUrls.has(entry.href)) continue;

    const match = result.match(entry.regex);
    if (match) {
      result = result.replace(entry.regex, (m) => {
        usedTerms.add(entry.term);
        usedUrls.add(entry.href);
        insertedCount++;
        return `<a href="${entry.href}" title="${m} hakkında daha fazla bilgi edinin" class="text-brand-600 dark:text-brand-400 font-semibold hover:underline transition-colors tooltip-trigger">${m}</a>`;
      });
    }
  }

  return result;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
