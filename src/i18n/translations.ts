import { tr } from './tr';

export type Language = 'tr' | 'en';

/**
 * Varsayılan çeviri objesi (Faz 4 & 6: i18n Code-Splitting).
 * Bundle şişkinliğini önlemek için ilk yüklemede sadece TR (varsayılan dil) yüklenir.
 * EN (İngilizce) çevirileri LanguageContext tarafından ihtiyaç duyulduğunda dinamik olarak import edilir.
 */
export const translations = {
  tr,
  // İlk yüklemede ve SSR sırasında fallback olarak tr kullanılır, client'ta en seçilirse asenkron yüklenir.
  en: tr as Record<keyof typeof tr, string>,
};
