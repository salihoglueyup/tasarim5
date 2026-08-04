import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Blog içerik gövdesi render'ı + otomatik iç linkleme
 * (SEO Master Plan V4 — Faz 151/176).
 *
 * Tiptap'ten gelen raw HTML içeriğini güvenli bir şekilde render eder.
 * Anahtar kelimeleri otomatik olarak ilgili sayfalara linkler.
 */

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

function autoLinkHtml(html: string): string {
  if (!html) return '';
  let result = html;
  const used = new Set<string>();

  for (const link of AUTO_LINKS) {
    if (used.has(link.term)) continue;
    
    // HTML tagleri (özellikle <a> tagleri) içindeki metinleri es geçmek için regex
    // Bu regex, kelimenin önünde kapanmamış bir < veya arkasında kapanmamış bir </a> olmadığını varsayar.
    const regex = new RegExp(`(?![^<]*>|[^<>]*<\\/a>)\\b(${link.term})\\b`, 'i');
    
    // Her terim makale boyunca sadece 1 kez linklensin (aşırı linklemeyi önlemek için)
    const match = result.match(regex);
    if (match) {
      result = result.replace(regex, (m) => {
        used.add(link.term);
        return `<a href="${link.href}" class="text-brand-400 underline decoration-brand-400/50 hover:decoration-brand-400 font-semibold transition-colors">${m}</a>`;
      });
    }
  }
  return result;
}

export default function PostBody({ htmlContent }: { htmlContent: string }) {
  // İçeriği otomatik linkle
  const processedHtml = autoLinkHtml(htmlContent);

  return (
    <div 
      className="prose prose-slate prose-lg max-w-none text-slate-900 w-full prose-headings:text-slate-950 prose-a:text-brand-600 prose-strong:text-slate-900 prose-img:rounded-2xl prose-img:shadow-lg"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(processedHtml) }} 
    />
  );
}
