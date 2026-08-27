import DOMPurify from 'isomorphic-dompurify';
import { autoLinkHtml } from '@/lib/autoLinker';
import { renderPostBlocksToHtml } from '@/lib/blogBlockParser';

// Inject IDs into H2 and H3 tags for SEO Table of Contents (Sitelinks)
if (typeof DOMPurify.addHook === 'function') {
  DOMPurify.addHook('afterSanitizeAttributes', function(node) {
    if (node.tagName === 'H2' || node.tagName === 'H3') {
      if (!node.getAttribute('id')) {
        const text = node.textContent || '';
        const id = 'heading-' + text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (id !== 'heading-') {
          node.setAttribute('id', id);
        }
      }
    }
  });
}

export default function PostBody({
  htmlContent,
  title = 'Alo Yönetim',
  currentUrl,
}: {
  htmlContent: string;
  title?: string;
  currentUrl?: string;
}) {
  // 1. JSON bloklarını veya ham metni semantik zengin HTML'e dönüştür
  const parsedHtml = renderPostBlocksToHtml(htmlContent);

  // 2. İçeriği otomatik linkle (self-referencing döngüleri engelleyerek)
  const processedHtml = autoLinkHtml(parsedHtml, currentUrl);

  // 3. Otomatik Alt Etiketi Enjeksiyonu (Görsel SEO)
  const seoHtml = processedHtml.replace(/<img(?![^>]*alt=)[^>]*>/gi, (match) => { 
    return match.replace('<img', `<img alt="${title}"`); 
  });

  // 4. DOMPurify ile güvenli temizlik (class ve id korumalı)
  const sanitizedHtml = DOMPurify.sanitize(seoHtml, {
    ADD_ATTR: ['id', 'class', 'target', 'rel', 'title', 'alt', 'src', 'width', 'height'],
    ADD_TAGS: ['iframe', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote'],
  });

  return (
    <div 
      className="prose prose-slate prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 w-full prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-brand-600 dark:prose-a:text-amber-400 prose-a:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-white prose-blockquote:border-amber-500 prose-img:rounded-2xl prose-img:shadow-lg leading-relaxed"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
    />
  );
}
