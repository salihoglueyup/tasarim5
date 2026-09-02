import DOMPurify from 'isomorphic-dompurify';

export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttrs?: string[];
}

const DEFAULT_ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'b', 'i', 'strong', 'em', 'span', 'div',
  'ul', 'ol', 'li', 'br', 'hr',
  'a', 'img', 'blockquote',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'code', 'pre', 'mark', 'kbd', 'sub', 'sup'
];

const DEFAULT_ALLOWED_ATTRS = [
  'id', 'class', 'href', 'title', 'target', 'rel',
  'alt', 'src', 'width', 'height', 'loading', 'decoding'
];

/**
 * Faz 186: Merkezi ve Katı XSS Temizleyici (DOMPurify)
 * XSS injection, javascript: URL şemaları ve zararlı event-handler'ları engeller.
 */
export function sanitizeHtml(dirtyHtml: string, options: SanitizeOptions = {}): string {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';

  return DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: options.allowedTags || DEFAULT_ALLOWED_TAGS,
    ALLOWED_ATTR: options.allowedAttrs || DEFAULT_ALLOWED_ATTRS,
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target', 'rel'],
    FORBID_TAGS: ['script', 'style', 'object', 'embed', 'link'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
}
