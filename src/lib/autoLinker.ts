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

// 4. Ekstra Spesifik Tesis Yönetimi ve Sektörel Eşanlamlılar (Pillar Güçlendirici)
const CUSTOM_LINKS: { term: string; href: string }[] = [
  { term: 'tesis ve mülk hizmetleri', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis ve mülk yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'mülk hizmetleri', href: '/hizmetler/tesis-yonetimi' },
  { term: 'mülk yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'gayrimenkul tesis işletmeciliği', href: '/hizmetler/tesis-yonetimi' },
  { term: 'mülk varlık yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'istanbul mülk yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'profesyonel mülk yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'profesyonel tesis yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'entegre tesis yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'istanbul tesis yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis yönetim hizmetleri', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis yönetim şirketi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis yönetim şirketleri', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis yönetim firmaları', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis işletmeciliği', href: '/hizmetler/tesis-yonetimi' },
  { term: 'bina ve tesis yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'site ve tesis yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'iso 41001 tesis yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'rezidans tesis yönetimi', href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi' },
  { term: 'lüks site yönetimi', href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi' },
  { term: 'rezidans yönetim şirketi', href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi' },
  { term: 'plaza tesis yönetimi', href: '/hizmetler/tesis-yonetimi/plaza-yonetimi' },
  { term: 'ofis binası yönetimi', href: '/hizmetler/tesis-yonetimi/plaza-yonetimi' },
  { term: 'ticari bina yönetimi', href: '/hizmetler/tesis-yonetimi/plaza-yonetimi' },
  { term: 'toplu konut yönetimi', href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi' },
  { term: 'toki site yönetimi', href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi' },
  { term: 'büyük site yönetimi', href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi' },
  { term: 'sanayi tesisi yönetimi', href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi' },
  { term: 'fabrika tesis yönetimi', href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi' },
  { term: 'endüstriyel tesis yönetimi', href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi' },
  { term: 'avm tesis yönetimi', href: '/sektorel-cozumler/avm-yonetimi' },
  { term: 'tesis yönetim şirketi nasıl seçilir', href: '/hizmetler/tesis-yonetimi/rehber' },
  { term: 'tesis yönetimi rehberi', href: '/hizmetler/tesis-yonetimi/rehber' },
  { term: 'tesis yönetim sözleşmesi', href: '/hizmetler/tesis-yonetimi/rehber' },
  { term: 'tesis yönetim teklifi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis keşif formu', href: '/hizmetler/tesis-yonetimi' },
  { term: 'yargıtay emsal kararları', href: '/hizmetler/tesis-yonetimi' },
  { term: 'kmk 634 içtihatları', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis yönetim şartnamesi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'rfp şartname oluşturucu', href: '/hizmetler/tesis-yonetimi' },
  { term: 'rezidans yönetimi istanbul', href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi' },
  { term: 'plaza yönetimi istanbul', href: '/hizmetler/tesis-yonetimi/plaza-yonetimi' },
  { term: 'toki site yönetimi istanbul', href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi' },
  { term: 'sanayi tesisi yönetimi istanbul', href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi' },
  { term: 'site aidat tasarrufu', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis bütçe planlaması', href: '/hizmetler/tesis-yonetimi' },
  { term: '5188 tesis güvenliği', href: '/hizmetler/tesis-yonetimi' },
  { term: 'tesis teknik işletme', href: '/hizmetler/tesis-yonetimi' },
  { term: 'güvenlik akademisi', href: '/guvenlik-akademisi' },
  { term: 'aidat hesaplama', href: '/hesaplayici' },
  { term: 'kmk hesaplayıcı', href: '/hesaplayici' },
  { term: 'işletme projesi rehberi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'asansör yeşil etiket', href: '/hizmetler/teknik-bakim' },
  { term: 'asansör arıza', href: '/hizmetler/teknik-bakim' },
  { term: 'asansör arıza servisi', href: '/hizmetler/teknik-bakim' },
  { term: 'asansör bakım', href: '/hizmetler/teknik-bakim' },
  { term: 'asansör periyodik bakım', href: '/hizmetler/teknik-bakim' },
  { term: 'reaktif ceza', href: '/hizmetler/teknik-bakim' },
  { term: 'kompanzasyon panosu', href: '/hizmetler/teknik-bakim' },
  { term: '5188 güvenlik', href: '/hizmetler/guvenlik-yonetimi' },
  { term: '5188 özel güvenlik', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'özel güvenlik şirketi', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'özel güvenlik firması', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'alo böcek', href: '/hizmetler/hasere-ve-dezenfeksiyon' },
  { term: 'alo ilaçlama', href: '/hizmetler/hasere-ve-dezenfeksiyon' },
  { term: 'haşere ilaçlama', href: '/hizmetler/hasere-ve-dezenfeksiyon' },
  { term: 'apartman böcek ilaçlama', href: '/hizmetler/hasere-ve-dezenfeksiyon' },
  { term: 'aidat icra takibi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'kmk 20', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'kmk 634 danışmanlığı', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'apartman temizliği', href: '/hizmetler/temizlik-ve-hijyen' },
  { term: 'merdiven temizliği', href: '/hizmetler/temizlik-ve-hijyen' },
  { term: 'site ortak alan temizliği', href: '/hizmetler/temizlik-ve-hijyen' },
  { term: 'tse 13811 hijyen', href: '/hizmetler/temizlik-ve-hijyen' },
  { term: 'çatı ges', href: '/surdurulebilirlik/ges-projeleri' },
  { term: 'ges amortisman hesaplama', href: '/surdurulebilirlik/ges-projeleri' },
  { term: 'çatı tipi güneş enerjisi', href: '/surdurulebilirlik/ges-projeleri' },
  { term: 'havuz bakımı', href: '/hizmetler/havuz-bakimi-ve-hijyen' },
  { term: 'yüzme havuzu bakımı', href: '/hizmetler/havuz-bakimi-ve-hijyen' },
  { term: 'otomatik sulama sistemleri', href: '/hizmetler/peyzaj-ve-bahce-bakimi' },
  { term: 'çim biçme budama', href: '/hizmetler/peyzaj-ve-bahce-bakimi' },
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

// Regex'ler modül yüklenirken derlenir (Türkçe çekim ekleri toleranslı)
const AUTO_LINK_ENTRIES = AUTO_LINKS_SORTED.map((link) => ({
  ...link,
  regex: new RegExp(
    `(?<![<\\/a-zA-Z0-9ğüşıöçâîûĞÜŞİÖÇÂÎÛ])(${escapeRegExp(link.term)}(?:['’]?(?:ı|i|u|ü|a|e|da|de|dan|den|ın|in|un|ün|lar|ler|ları|leri|ların|lerin|ında|inde|ına|ine|yla|yle|tan|ten|nın|nin|nun|nün|ya|ye|yı|yi|yu|yü))?)(?![a-zA-Z0-9ğüşıöçâîûĞÜŞİÖÇÂÎÛ>])`,
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

  const normalizedCurrentUrl = currentUrl ? currentUrl.replace(/\/+$/, '') : '';
  const usedTerms = new Set<string>();
  const usedUrls = new Set<string>();
  let insertedCount = 0;

  // HTML'i etiketler (<...>) ve düz metin parçalarına böl
  const tokens = html.split(/(<[^>]+>)/g);
  let inAnchor = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token) continue;

    if (token.startsWith('<')) {
      if (/^<a[\s>]/i.test(token)) {
        inAnchor = true;
      } else if (/^<\/a>/i.test(token)) {
        inAnchor = false;
      }
      continue;
    }

    // <a> tag'i içindeyse veya sadece boşluksa link ekleme
    if (inAnchor || !token.trim()) continue;

    let textChunk = token;

    for (const entry of AUTO_LINK_ENTRIES) {
      if (insertedCount >= maxLinks) break;
      if (usedTerms.has(entry.term)) continue;

      // Kendine link vermeyi engelle
      if (normalizedCurrentUrl && (entry.href === normalizedCurrentUrl || entry.href === `${normalizedCurrentUrl}/`)) {
        continue;
      }

      // Aynı hedefe çok fazla link verilmesini sınırla
      if (usedUrls.has(entry.href)) continue;

      if (entry.regex.test(textChunk)) {
        textChunk = textChunk.replace(entry.regex, (m) => {
          usedTerms.add(entry.term);
          usedUrls.add(entry.href);
          insertedCount++;
          return `<a href="${entry.href}" title="${m} hakkında daha fazla bilgi edinin" class="text-brand-600 dark:text-amber-400 font-semibold hover:underline transition-colors tooltip-trigger">${m}</a>`;
        });
      }
    }

    tokens[i] = textChunk;
  }

  return tokens.join('');
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
