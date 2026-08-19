import { TERMS } from '@/data/dictionary';

import { SERVICES } from '@/data/services';

// Dinamik Hizmet Linkleri (Faz 22: Örümcek Ağı Linkleme)
const SERVICE_LINKS = SERVICES.map(s => ({
  term: s.name.toLowerCase(),
  href: s.pillar // e.g. '/hizmetler/aidat-takibi'
}));

// Ekstra spesifik eşanlamlılar ve yüksek niyetli SEO anahtar kelimeleri
const CUSTOM_LINKS: { term: string; href: string }[] = [
  { term: 'aidat icra takibi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'icra takibi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'özel güvenlik şirketi', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'özel güvenlik firmaları', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'özel güvenlik firması', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'site güvenliği', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'özel güvenlik', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'apartman güvenliği', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'güvenlik personeli', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'güvenlik görevlisi', href: '/hizmetler/guvenlik-yonetimi' },
  { term: '5188 sayılı kanun', href: '/hizmetler/guvenlik-yonetimi' },
  { term: '5188 özel güvenlik', href: '/hizmetler/guvenlik-yonetimi' },
  { term: 'güvenlik akademisi', href: '/guvenlik-akademisi' },
  ...SERVICE_LINKS
];

const DICTIONARY_LINKS = TERMS.map(t => ({
  term: t.term.toLowerCase().replace(/ \([^)]*\)/g, ''), // "Kat Mülkiyeti Kanunu (KMK)" -> "kat mülkiyeti kanunu"
  href: `/sozluk#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}));

const EXTRA_DICTIONARY_LINKS = TERMS
  .filter(t => t.term.includes('('))
  .map(t => {
    const match = t.term.match(/\(([^)]+)\)/);
    return match ? {
      term: match[1].toLowerCase(),
      href: `/sozluk#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    } : null;
  })
  .filter(Boolean) as { term: string; href: string }[];

const AUTO_LINKS_SORTED = [...CUSTOM_LINKS, ...DICTIONARY_LINKS, ...EXTRA_DICTIONARY_LINKS]
  .sort((a, b) => b.term.length - a.term.length);

// Regex'ler modül yüklenirken bir kez derlenir — her çağrıda yeniden oluşturulmaz.
const AUTO_LINK_ENTRIES: { term: string; href: string; regex: RegExp }[] =
  AUTO_LINKS_SORTED.map(link => ({
    ...link,
    regex: new RegExp(
      `(?![^<]*>|[^<>]*<\\/a>)(?:^|(?<=\\s|\\p{P}))(${link.term})(?:(?=\\s|\\p{P})|$)`,
      'iu'
    ),
  }));

export const AUTO_LINKS = AUTO_LINKS_SORTED;

/**
 * Verilen HTML metni içerisindeki anahtar kelimeleri bulup,
 * belirlenen sayfalara/sozluk maddelerine otomatik SEO linkleri yerleştirir.
 */
export function autoLinkHtml(html: string): string {
  if (!html) return '';
  let result = html;
  const used = new Set<string>();

  for (const entry of AUTO_LINK_ENTRIES) {
    if (used.has(entry.term)) continue;
    const match = result.match(entry.regex);
    if (match) {
      result = result.replace(entry.regex, (m) => {
        used.add(entry.term);
        return `<a href="${entry.href}" title="${m} hakkında daha fazla bilgi edinin" class="text-brand-600 dark:text-brand-400 font-semibold hover:underline transition-colors tooltip-trigger">${m}</a>`;
      });
    }
  }
  return result;
}
