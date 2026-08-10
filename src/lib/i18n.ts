import 'server-only';

const dictionaries: Record<string, () => Promise<any>> = {
  tr: () => import('@/i18n/locales/tr/common.json').then((module) => module.default),
  en: () => import('@/i18n/locales/en/common.json').then((module) => module.default),
  ru: () => import('@/i18n/locales/ru/common.json').then((module) => module.default),
  ar: () => import('@/i18n/locales/ar/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale]?.() ?? dictionaries.tr();
};
