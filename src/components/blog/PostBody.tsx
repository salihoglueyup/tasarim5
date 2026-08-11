import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Blog içerik gövdesi render'ı + otomatik iç linkleme
 * (SEO Master Plan V4 — Faz 151/176).
 *
 * Tiptap'ten gelen raw HTML içeriğini güvenli bir şekilde render eder.
 * Anahtar kelimeleri otomatik olarak ilgili sayfalara linkler.
 */

import { autoLinkHtml } from '@/lib/autoLinker';

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
