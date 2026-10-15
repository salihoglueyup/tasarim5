import { DISTRICTS } from '@/data/districts';
import { TERMS } from '@/data/dictionary';
import { termToSlug } from '@/lib/content/termSlug';

/**
 * Eski sürümlerde Türkçe karakterleri silerek üretilmiş bozuk slug'ları ("ey-psultan", "-mraniye",
 * "i-sletme-projesi") doğru slug'a eşler. Yalnızca 404 yerine kalıcı yönlendirme için kullanılır.
 */
const lettersOnly = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const DISTRICT_KEYS = new Map<string, string>();
for (const d of DISTRICTS) {
  DISTRICT_KEYS.set(lettersOnly(d.slug), d.slug);
  DISTRICT_KEYS.set(lettersOnly(d.name), d.slug); // "Eyüpsultan" -> "eypsultan" (ü silinmiş)
}
const TERM_KEYS = new Map<string, string>();
for (const t of TERMS) TERM_KEYS.set(lettersOnly(termToSlug(t.term)), termToSlug(t.term));

export function resolveLegacyDistrictSlug(raw: string): string | undefined {
  return DISTRICT_KEYS.get(lettersOnly(decodeURIComponent(raw)));
}
export function resolveLegacyTermSlug(raw: string): string | undefined {
  return TERM_KEYS.get(lettersOnly(decodeURIComponent(raw)));
}

/** Tekrar eden sözlük maddeleri birleştirildi; eski adresler kalıcı yönlendirilir. */
export const RETIRED_TERM_REDIRECTS: Record<string, string> = {
  'kmk-madde-37-isletme-projesi-itiraz-suresi': 'kmk-37-isletme-projesi-butce-itiraz-suresi',
  'kmk-madde-45-onemli-isler-oybirligi-kararlari': 'kmk-45-onemli-isler-oybirligi-kararlari',
};
