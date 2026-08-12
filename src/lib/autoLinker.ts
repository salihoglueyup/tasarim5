import { TERMS } from '@/data/dictionary';

// Statik özel linkler ve ekstra eşanlamlı kelimeler (isteğe bağlı)
const CUSTOM_LINKS: { term: string; href: string }[] = [
  { term: 'aidat icra takibi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'icra takibi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'teknik bakım', href: '/hizmetler/teknik-bakim' },
  { term: 'havuz bakımı', href: '/hizmetler/havuz-bakimi-ve-hijyen' },
  { term: 'tesis yönetimi', href: '/hizmetler/tesis-yonetimi' },
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

export const AUTO_LINKS = [...CUSTOM_LINKS, ...DICTIONARY_LINKS, ...EXTRA_DICTIONARY_LINKS]
  .sort((a, b) => b.term.length - a.term.length);

/**
 * Verilen HTML metni içerisindeki anahtar kelimeleri bulup,
 * belirlenen sayfalara/sozluk maddelerine otomatik SEO linkleri yerleştirir.
 */
export function autoLinkHtml(html: string): string {
  if (!html) return '';
  let result = html;
  const used = new Set<string>();

  for (const link of AUTO_LINKS) {
    if (used.has(link.term)) continue;
    
    // JavaScript \\b does not support Turkish characters (ı,ğ,ü,ş,ö,ç).
    // Using positive lookbehinds and lookaheads for word boundaries or start/end of string.
    // (?![^<]*>|[^<>]*<\\/a>) ensures we don't replace inside HTML tags or existing links.
    const regex = new RegExp(`(?![^<]*>|[^<>]*<\\/a>)(?:^|(?<=\\s|\\p{P}))(${link.term})(?:(?=\\s|\\p{P})|$)`, 'iu');
    
    const match = result.match(regex);
    if (match) {
      // Use global replace to link all occurrences, or just the first? The prompt said "if (used.has(link.term)) continue;", so it links once per term.
      result = result.replace(regex, (m) => {
        used.add(link.term);
        // SEO ve Erişilebilirlik için title eklendi
        return `<a href="${link.href}" title="${m} hakkında daha fazla bilgi edinin" class="text-brand-600 dark:text-brand-400 font-semibold hover:underline transition-colors tooltip-trigger">${m}</a>`;
      });
    }
  }
  return result;
}
