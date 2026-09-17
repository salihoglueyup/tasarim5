import 'server-only';

const dictionaries: Record<string, () => Promise<any>> = {
  tr: () => import('@/i18n/locales/tr/common.json').then((module) => module.default),
  en: () => import('@/i18n/locales/en/common.json').then((module) => module.default),
  ru: () => import('@/i18n/locales/ru/common.json').then((module) => module.default),
  ar: () => import('@/i18n/locales/ar/common.json').then((module) => module.default),
};

const dictionaryCache: Record<string, any> = {};

export const getDictionary = async (locale: string) => {
  const targetLocale = dictionaries[locale] ? locale : 'tr';
  if (dictionaryCache[targetLocale]) {
    return dictionaryCache[targetLocale];
  }
  const dict = await (dictionaries[targetLocale]?.() ?? dictionaries.tr());
  dictionaryCache[targetLocale] = dict;
  return dict;
};
