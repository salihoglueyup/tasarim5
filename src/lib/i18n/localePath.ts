/**
 * Locale-siz bir yoldan, dile uygun URL yolu üretir. Varsayılan dil (tr) önek ALMAZ:
 * "/tr/..." linkleri middleware'de 301 ile önek'siz hâline yönlendirilir; iç linkte ve
 * JSON-LD'de bunu üretmek "Yönlendirmeli sayfa" ve çift-entity sorunlarına yol açar.
 */
export const DEFAULT_LANG = 'tr';

export function localePath(path: string, lang?: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!lang || lang === DEFAULT_LANG) return p;
  return p === '/' ? `/${lang}` : `/${lang}${p}`;
}
