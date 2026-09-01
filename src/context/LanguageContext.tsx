"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/i18n/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['tr']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children, initialLang, initialDictionary }: { children: React.ReactNode, initialLang?: string, initialDictionary?: any }) => {
  const [language, setLanguageState] = useState<Language>((initialLang as Language) || 'tr');
  
  // Initialize with the provided dictionary to prevent SSR flashing
  const initialTransMap = { ...translations };
  if (initialLang && initialDictionary) {
    initialTransMap[initialLang as Language] = initialDictionary;
  }
  
  const [transMap, setTransMap] = useState(initialTransMap);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (initialLang && (initialLang === 'tr' || initialLang === 'en' || initialLang === 'ru' || initialLang === 'ar')) {
        setLanguageState((prev) => (prev !== initialLang ? (initialLang as Language) : prev));
        if (typeof window !== 'undefined') {
          document.documentElement.lang = initialLang;
          document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
        }
      } else if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('app_language') as Language;
        if (savedLang && (savedLang === 'tr' || savedLang === 'en' || savedLang === 'ru' || savedLang === 'ar')) {
          setLanguageState((prev) => (prev !== savedLang ? savedLang : prev));
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [initialLang]);

  useEffect(() => {
    if (language !== 'tr' && transMap[language] === transMap.tr) {
      import(`@/i18n/locales/${language}/common.json`).then((mod) => {
        setTransMap((prev) => ({ ...prev, [language]: mod.default }));
      }).catch(console.error);
    }
  }, [language, transMap]);

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const t = React.useCallback(
    (key: keyof typeof translations['tr']): string => {
      const dictionary = transMap[language] || transMap['tr'];
      return (dictionary as any)[key] || (transMap['tr'] as any)[key] || String(key);
    },
    [language, transMap]
  );

  const value = React.useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
