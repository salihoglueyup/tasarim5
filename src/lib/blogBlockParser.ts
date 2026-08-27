import type { PostBlock } from '@/data/posts';

/**
 * Başlık metninden SEO dostu, TOC (İçindekiler) ve Google Sitelinks uyumlu ID üretir.
 */
export function slugifyHeading(text: string): string {
  if (!text) return 'heading-section';
  const clean = text
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/Ğ/g, 'g')
    .replace(/ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/ü/g, 'u')
    .replace(/Ş/g, 's')
    .replace(/ş/g, 's')
    .replace(/Ö/g, 'o')
    .replace(/ö/g, 'o')
    .replace(/Ç/g, 'c')
    .replace(/ç/g, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `heading-${clean || 'section'}`;
}

/**
 * Metin içindeki [metin](url) formatındaki markdown bağlantılarını temiz HTML <a> etiketlerine dönüştürür.
 */
export function parseMarkdownLinks(text: string): string {
  if (!text) return '';
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-amber-600 dark:text-amber-400 font-semibold hover:underline transition-colors">$1</a>'
  );
}

/**
 * JSON formatında saklanan blog bloklarını (PostBlock[]) veya ham string girdiyi
 * semantik, modern ve zengin HTML'e dönüştüren çekirdek derleyici motoru.
 */
export function renderPostBlocksToHtml(rawContent: string | PostBlock[] | any): string {
  if (!rawContent) return '';

  let blocks: PostBlock[] = [];

  if (Array.isArray(rawContent)) {
    blocks = rawContent;
  } else if (typeof rawContent === 'string') {
    const trimmed = rawContent.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          blocks = parsed;
        }
      } catch {
        // Parse edilemezse düz metin kabul et
      }
    } else if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
      // Zaten ham HTML ise doğrudan döndür
      return parseMarkdownLinks(trimmed);
    }
  }

  // Eğer blok dizisi tespit edilemediyse, düz metin paragrafları olarak işle
  if (blocks.length === 0 && typeof rawContent === 'string') {
    return rawContent
      .split('\n\n')
      .filter(Boolean)
      .map((p) => `<p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-base md:text-lg">${parseMarkdownLinks(p)}</p>`)
      .join('\n');
  }

  const htmlParts: string[] = [];

  for (const block of blocks) {
    if (!block || typeof block !== 'object') continue;

    switch (block.type) {
      case 'h2': {
        const id = slugifyHeading(block.text);
        const text = parseMarkdownLinks(block.text);
        htmlParts.push(
          `<h2 id="${id}" class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-5 scroll-mt-24 border-b border-slate-200/60 dark:border-slate-800 pb-3 flex items-center gap-3">
            <span className="w-2 h-7 bg-amber-500 rounded-full inline-block"></span>
            ${text}
          </h2>`
        );
        break;
      }

      case 'h3': {
        const id = slugifyHeading(block.text);
        const text = parseMarkdownLinks(block.text);
        htmlParts.push(
          `<h3 id="${id}" class="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mt-8 mb-4 scroll-mt-24">
            ${text}
          </h3>`
        );
        break;
      }

      case 'p': {
        const text = parseMarkdownLinks(block.text);
        htmlParts.push(
          `<p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-base md:text-lg">
            ${text}
          </p>`
        );
        break;
      }

      case 'ul': {
        if (Array.isArray(block.items) && block.items.length > 0) {
          const itemsHtml = block.items
            .map((item) => {
              const parsedItem = parseMarkdownLinks(item);
              return `<li class="flex items-start gap-3 my-2.5 text-slate-700 dark:text-slate-300 text-base md:text-lg">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold shrink-0 mt-0.5 shadow-sm">✓</span>
                <span class="flex-1">${parsedItem}</span>
              </li>`;
            })
            .join('\n');
          htmlParts.push(`<ul class="my-6 space-y-1 list-none pl-0">${itemsHtml}</ul>`);
        }
        break;
      }

      case 'ol': {
        if (Array.isArray(block.items) && block.items.length > 0) {
          const itemsHtml = block.items
            .map((item, idx) => {
              const parsedItem = parseMarkdownLinks(item);
              return `<li class="flex items-start gap-3 my-2.5 text-slate-700 dark:text-slate-300 text-base md:text-lg">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-bold shrink-0 mt-0.5 shadow-sm">${idx + 1}</span>
                <span class="flex-1">${parsedItem}</span>
              </li>`;
            })
            .join('\n');
          htmlParts.push(`<ol class="my-6 space-y-1 list-none pl-0">${itemsHtml}</ol>`);
        }
        break;
      }

      case 'quote': {
        const text = parseMarkdownLinks(block.text);
        htmlParts.push(
          `<blockquote class="my-8 p-6 md:p-8 bg-gradient-to-r from-amber-500/5 via-slate-50 to-transparent dark:from-amber-500/10 dark:via-slate-800/40 dark:to-transparent border-l-4 border-amber-500 rounded-r-3xl italic text-slate-800 dark:text-slate-200 shadow-sm">
            <p class="text-lg md:text-xl font-medium leading-relaxed m-0">"${text}"</p>
          </blockquote>`
        );
        break;
      }

      case 'cta': {
        const text = parseMarkdownLinks(block.text);
        const label = block.label || 'Hemen İnceleyin';
        const href = block.href || '/hizmetler/tesis-yonetimi';
        htmlParts.push(
          `<div class="my-10 p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700">
            <div class="space-y-1.5 text-center md:text-left">
              <div class="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center md:justify-start gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Alo Yönetim Profesyonel Çözüm
              </div>
              <p class="text-lg md:text-xl font-bold m-0 text-white">${text}</p>
              <p class="text-sm text-slate-300 m-0">Ücretsiz keşif ve 10 dakikada şeffaf bütçe teklifi.</p>
            </div>
            <a href="${href}" class="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 hover:scale-105 whitespace-nowrap text-sm md:text-base no-underline">
              ${label} →
            </a>
          </div>`
        );
        break;
      }

      default:
        // Diğer blok tipleri için güvenli fallback
        if ((block as any).text) {
          htmlParts.push(`<p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">${parseMarkdownLinks((block as any).text)}</p>`);
        }
        break;
    }
  }

  return htmlParts.join('\n\n');
}
