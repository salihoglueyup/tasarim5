"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { translations } from '@/i18n/translations';

export type SubItem = {
  nameKey: keyof typeof translations['tr'];
  path: string;
  descKey?: keyof typeof translations['tr'];
  icon?: string;
};

export type MenuItem = {
  nameKey: keyof typeof translations['tr'];
  path?: string;
  subItems?: SubItem[];
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  getLocalizedPath: (path: string) => string;
  openQuoteModal: () => void;
};

export default function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  getLocalizedPath,
  openQuoteModal,
}: MobileMenuProps) {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleMobileLanguageChange = (newLang: 'tr' | 'en' | 'ru' | 'ar') => {
    onClose();
    if (newLang === language) return;
    
    let cleanPath = pathname || '/';
    const langPrefixes = ['/en', '/tr', '/ru', '/ar'];
    
    for (const prefix of langPrefixes) {
      if (cleanPath.startsWith(prefix + '/') || cleanPath === prefix) {
        cleanPath = cleanPath.replace(new RegExp(`^${prefix}`), '') || '/';
        break;
      }
    }
    
    let newUrl = cleanPath;
    if (newLang !== 'tr') {
      newUrl = `/${newLang}${cleanPath === '/' ? '' : cleanPath}`;
    }
    
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    }
    setLanguage(newLang);
    router.push(newUrl);
    router.refresh();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl lg:hidden flex flex-col pt-24 px-6 overflow-y-auto pb-12 font-sans"
        >
          <nav className="flex flex-col gap-2 mt-8">
            {menuItems.map((item, i) => (
              <motion.div 
                key={item.nameKey}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 + ((i + 1) * 0.05) }}
                className="border-b border-slate-200 dark:border-white/10"
              >
                {item.subItems ? (
                  <div className="flex flex-col">
                    <button 
                      onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.nameKey ? null : item.nameKey)}
                      className="flex items-center justify-between py-4 text-xl font-bold text-slate-900 dark:text-white"
                    >
                      {t(item.nameKey)}
                      <span className={`material-symbols-outlined transition-transform duration-300 ${expandedMobileMenu === item.nameKey ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    <AnimatePresence>
                      {expandedMobileMenu === item.nameKey && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pb-6 pl-4 border-l-2 border-slate-200 dark:border-white/10 ml-2">
                            {item.subItems.map((sub) => (
                              <Link 
                                key={sub.nameKey} 
                                href={getLocalizedPath(sub.path)} 
                                onClick={onClose}
                                className="text-lg text-slate-600 dark:text-gray-300 hover:text-[var(--color-primary)] dark:hover:text-white flex items-center gap-3 font-medium"
                              >
                                {sub.icon && <span className="material-symbols-outlined text-[18px] opacity-50">{sub.icon}</span>}
                                {t(sub.nameKey)}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link 
                    href={getLocalizedPath(item.path!)} 
                    onClick={onClose}
                    className="block py-4 text-xl font-bold text-slate-900 dark:text-white"
                  >
                    {t(item.nameKey)}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Mobil Dil Seçimi Barı */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
            <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              Dil Seçimi / Language
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { code: 'tr', label: 'TR', flag: '🇹🇷' },
                { code: 'en', label: 'EN', flag: '🇬🇧' },
                { code: 'ru', label: 'RU', flag: '🇷🇺' },
                { code: 'ar', label: 'AR', flag: '🇸🇦' },
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleMobileLanguageChange(l.code as 'tr' | 'en' | 'ru' | 'ar')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                    language === l.code
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md'
                      : 'bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="text-[11px]">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobil Tema Değiştirici */}
          <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">
                {isDarkMode ? 'dark_mode' : 'light_mode'}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {isDarkMode ? 'Koyu Tema (Aktif)' : 'Açık Tema (Aktif)'}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-extrabold shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              {isDarkMode ? 'Açık Mod' : 'Koyu Mod'}
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-col gap-3"
          >
            <button 
              onClick={() => { onClose(); openQuoteModal(); }}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-lg font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
            >
              {t('btn_get_quote')}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
