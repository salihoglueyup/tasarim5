export const SUPPORTED_LOCALES = ['tr', 'en', 'ru', 'ar'] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export interface LocaleInfo {
  code: SupportedLocale;
  bcp47: string;
  direction: 'ltr' | 'rtl';
  name: string;
}

export const LOCALE_METADATA: Record<SupportedLocale, LocaleInfo> = {
  tr: { code: 'tr', bcp47: 'tr-TR', direction: 'ltr', name: 'Türkçe' },
  en: { code: 'en', bcp47: 'en-US', direction: 'ltr', name: 'English' },
  ru: { code: 'ru', bcp47: 'ru-RU', direction: 'ltr', name: 'Русский' },
  ar: { code: 'ar', bcp47: 'ar-SA', direction: 'rtl', name: 'العربية' },
};

/**
 * Faz 218: Dinamik HTML lang ve dir Nitelik Doğrulayıcısı (WCAG 3.1.1)
 */
export function validateHtmlLangDirection(lang: string): {
  isValid: boolean;
  code: string;
  direction: 'ltr' | 'rtl';
  bcp47: string;
} {
  const meta = LOCALE_METADATA[lang as SupportedLocale] || LOCALE_METADATA.tr;

  return {
    isValid: SUPPORTED_LOCALES.includes(lang as SupportedLocale),
    code: meta.code,
    direction: meta.direction,
    bcp47: meta.bcp47,
  };
}
