import trDefault from './locales/tr/common.json';

export type Language = 'tr' | 'en' | 'ru' | 'ar';

export const translations = {
  tr: trDefault,
  en: trDefault as Record<keyof typeof trDefault, string>,
  ru: trDefault as Record<keyof typeof trDefault, string>,
  ar: trDefault as Record<keyof typeof trDefault, string>,
};
