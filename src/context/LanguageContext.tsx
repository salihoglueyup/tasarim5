"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/i18n/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['tr']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children, initialLang }: { children: React.ReactNode, initialLang?: string }) => {
  const [language, setLanguageState] = useState<Language>((initialLang as Language) || 'tr');
  const [transMap, setTransMap] = useState(translations);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (initialLang && (initialLang === 'tr' || initialLang === 'en')) {
        setLanguageState((prev) => (prev !== initialLang ? (initialLang as Language) : prev));
        if (typeof window !== 'undefined') {
          document.documentElement.lang = initialLang;
        }
      } else if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('app_language') as Language;
        if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
          setLanguageState((prev) => (prev !== savedLang ? savedLang : prev));
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [initialLang]);

  useEffect(() => {
    // Eğer aktif dil 'en' ise ve en henüz gerçek modülle güncellenmediyse arka planda dinamik import et (Faz 4 & 6)
    if (language === 'en' && transMap.en === transMap.tr) {
      import('@/i18n/en').then((mod) => {
        setTransMap((prev) => ({ ...prev, en: mod.en }));
      });
    }
  }, [language, transMap]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: keyof typeof translations['tr']): string => {
    return transMap[language][key] || transMap['tr'][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
