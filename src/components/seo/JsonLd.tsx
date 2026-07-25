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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
