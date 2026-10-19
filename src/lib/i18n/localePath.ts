import { isLocaleIndexable } from '@/lib/seo/indexPolicy';

/**
 * Locale-siz bir yoldan, dile uygun URL yolu üretir. Varsayılan dil (tr) önek ALMAZ:
 * "/tr/..." linkleri middleware'de 301 ile önek'siz hâline yönlendirilir; iç linkte ve
 * JSON-LD'de bunu üretmek "Yönlendirmeli sayfa" ve çift-entity sorunlarına yol açar.
 * Çevrilmemiş (yalnızca Türkçe indekslenen) yollarda da yabancı dil öneki eklenmez.
 */
export const DEFAULT_LANG = 'tr';

export function localePath(path: string, lang?: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!lang || lang === DEFAULT_LANG) return p;
  if (!p.startsWith('/admin') && !isLocaleIndexable(p, lang)) return p;
  return p === '/' ? `/${lang}` : `/${lang}${p}`;
}

