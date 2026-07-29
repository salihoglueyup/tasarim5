import Link from 'next/link';
import type { PostBlock } from '@/data/posts';

/**
 * Blog içerik gövdesi render'ı + otomatik iç linkleme
 * (SEO Master Plan V4 — Faz 151/176).
 *
 * PostBlock dizisini semantik HTML'e çevirir (sunucu tarafı, AI/crawler dostu).
 * Paragraflarda anahtar terimlerin İLK geçişini ilgili sözlük/hizmet sayfasına
 * bağlar (aşırı linklemeyi önlemek için terim başına tek link, paragraf başına
 * en çok 2 link).
 */

// Terim → hedef URL (küçük harf eşleşir). Uzun terimler önce gelmeli.
const AUTO_LINKS: { term: string; href: string }[] = [
  { term: 'kat mülkiyeti kanunu', href: '/sozluk#kat-m-lkiyeti-kanunu-kmk' },
  { term: 'işletme projesi', href: '/sozluk#i-letme-projesi' },
  { term: 'aidat icra takibi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'icra takibi', href: '/hizmetler/hukuk-ve-icra-danismanligi' },
  { term: 'teknik bakım', href: '/hizmetler/teknik-bakim' },
  { term: 'havuz bakımı', href: '/hizmetler/havuz-bakimi-ve-hijyen' },
  { term: 'tesis yönetimi', href: '/hizmetler/tesis-yonetimi' },
  { term: 'demirbaş', href: '/sozluk#demirba' },
  { term: 'aidat', href: '/sozluk#aidat' },
];

function linkify(text: string, used: Set<string>, keyPrefix: string): React.ReactNode[] {
  // Bu paragrafta en çok 2 otomatik link.
  let linksInParagraph = 0;
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  outer: while (remaining.length > 0) {
    if (linksInParagraph >= 2) break;
    let best: { term: string; href: string; pos: number } | null = null;
    for (const l of AUTO_LINKS) {
      if (used.has(l.term)) continue;
      const pos = remaining.toLowerCase().indexOf(l.term);
      if (pos !== -1 && (best === null || pos < best.pos)) {
        best = { term: l.term, href: l.href, pos };
      }
    }
    if (!best) break outer;
    nodes.push(remaining.slice(0, best.pos));
    const matched = remaining.slice(best.pos, best.pos + best.term.length);
    nodes.push(
      <Link key={`${keyPrefix}-${idx++}`} href={best.href} className="text-slate-900 dark:text-white underline decoration-slate-400 hover:decoration-slate-900 dark:hover:decoration-white font-semibold transition-colors">
        {matched}
      </Link>,
    );
    used.add(best.term);
    linksInParagraph++;
    remaining = remaining.slice(best.pos + best.term.length);
  }
  nodes.push(remaining);
  return nodes;
}

export default function PostBody({ blocks }: { blocks: PostBlock[] }) {
  const used = new Set<string>();

  return (
    <div className="flex flex-col gap-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-light">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'html':
            return (
              <div 
                key={i} 
                className="prose prose-invert prose-brand max-w-none text-slate-700 dark:text-slate-300 w-full"
                dangerouslySetInnerHTML={{ __html: b.body }} 
              />
            );
          case 'h2':
            return (
              <h2 key={i} className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-6">
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                {b.text}
              </h3>
            );
          case 'p':
            return <p key={i}>{linkify(b.text, used, `p${i}`)}</p>;
          case 'ul':
            return (
              <ul key={i} className="list-disc pl-6 flex flex-col gap-2">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="list-decimal pl-6 flex flex-col gap-2">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote key={i} className="border-l-4 border-slate-900 dark:border-white pl-6 italic text-slate-800 dark:text-slate-200 my-2">
                {b.text}
              </blockquote>
            );
          case 'cta':
            return (
              <div key={i} className="my-4 bg-slate-900 text-white dark:bg-white/5 border border-slate-800 dark:border-white/10 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center gap-4 shadow-xl">
                <p className="text-base font-semibold text-white dark:text-white">{b.text}</p>
                <Link href={b.href} className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-3 rounded-full font-semibold transition-colors shadow-md">
                  {b.label}
                </Link>
              </div>
            );
        }
      })}
    </div>
  );
}
