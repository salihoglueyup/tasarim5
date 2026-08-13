import type { JsonLdObject } from '@/lib/schemas';
import { graph } from '@/lib/schemas';

/**
 * Tek JSON-LD render bileşeni (SEO V4 Faz 41).
 *
 * `data` tek bir node ya da node dizisi olabilir. Dizi verildiğinde otomatik
 * olarak `@graph` altında paketlenir; böylece `@context` yalnız bir kez çıkar
 * ve node'lar `@id` üzerinden birbirine bağlanabilir.
 *
 * Not: Client bileşenlerde de güvenle kullanılır (yalnız <script> döndürür).
 */
export default function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const payload = Array.isArray(data)
    ? graph(...data)
    : '@graph' in data || '@context' in data
      ? data
      : { '@context': 'https://schema.org', ...data };

  // SEO Validator (Linter) - Sadece Geliştirme Ortamında Çalışır
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const checkSchema = (schema: any) => {
      if (!schema) return;
      const type = schema['@type'];
      if (!type) return;

      const warn = (msg: string) => {
        console.warn(`[SEO Validator] 🚨 %c${type} Şeması Hatası:%c ${msg}`, 'font-weight: bold; color: #ff9800;', 'color: inherit;');
      };

      if (type === 'Article' || type === 'BlogPosting') {
        if (!schema.image) warn('Google Zengin Sonuçlar için "image" alanı zorunludur.');
        if (!schema.datePublished) warn('"datePublished" eksik.');
      }
      if (type === 'LocalBusiness' || type === 'Organization') {
        if (!schema.image && !schema.logo) warn('"logo" veya "image" eksik.');
        if (!schema.address) warn('"address" alanı eksik (Bölgesel SEO için kritik).');
      }
      if (type === 'ItemList') {
        if (!schema.itemListElement || schema.itemListElement.length === 0) {
          warn('Carousel için "itemListElement" dizisi boş olamaz.');
        }
      }
    };

    if (Array.isArray((payload as any)['@graph'])) {
      (payload as any)['@graph'].forEach(checkSchema);
    } else {
      checkSchema(payload);
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
