"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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

/**
 * Faz 79: MobileMenu bileşeninin Framer Motion'dan arındırılarak
 * GPU kompozitöründe saf `transform: translateX` (0 -> 100%) ve `transform-gpu will-change-transform`
 * ile 120 FPS akıcılıkta açılıp kapanan hafif mobil çekmece mimarisine taşınması.
 */
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  // Escape tuşu ile kapanma
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40 lg:hidden font-sans"
      role="dialog"
      aria-modal="true"
      aria-label="Mobil Menü"
    >
      {/* Karartma Maskesi (Backdrop) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out transform-gpu animate-in fade-in"
        aria-hidden="true"
      />

      {/* 120 FPS GPU Hızlandırmalı Çekmece */}
      <div 
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-950 backdrop-blur-2xl shadow-2xl flex flex-col pt-24 px-6 overflow-y-auto pb-12 transition-transform duration-300 ease-out transform-gpu will-change-transform animate-in slide-in-from-right"
      >
        <nav className="flex flex-col gap-2 mt-4">
          {menuItems.map((item) => (
            <div 
              key={item.nameKey}
              className="border-b border-slate-200 dark:border-white/10"
            >
              {item.subItems ? (
                <div className="flex flex-col">
                  <button 
                    type="button"
                    onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.nameKey ? null : item.nameKey)}
                    className="flex items-center justify-between py-4 text-xl font-bold text-slate-900 dark:text-white cursor-pointer"
                    aria-expanded={expandedMobileMenu === item.nameKey}
                  >
                    <span>{t(item.nameKey)}</span>
                    <span className={`material-symbols-outlined transition-transform duration-200 transform-gpu ${expandedMobileMenu === item.nameKey ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  
                  {/* CSS Grid Rows tabanlı akıcı alt menü */}
                  <div 
                    className={`grid transition-[grid-template-rows] duration-200 ease-out transform-gpu ${
                      expandedMobileMenu === item.nameKey ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-4 pb-6 pl-4 border-l-2 border-slate-200 dark:border-white/10 ml-2">
                        {item.subItems.map((sub) => (
                          <Link 
                            key={sub.nameKey} 
                            href={getLocalizedPath(sub.path)} 
                            onClick={onClose}
                            className="text-lg text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white flex items-center gap-3 font-medium transition-colors"
                          >
                            {sub.icon && <span className="material-symbols-outlined text-[18px] opacity-50">{sub.icon}</span>}
                            <span>{t(sub.nameKey)}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  href={getLocalizedPath(item.path!)} 
                  onClick={onClose}
                  className="block py-4 text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t(item.nameKey)}
                </Link>
              )}
            </div>
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

        {/* Teklif Al Eylem Butonu */}
        <div className="mt-6 flex flex-col gap-3">
          <button 
            type="button"
            onClick={() => { onClose(); openQuoteModal(); }}
            className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-lg font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <span>{t('btn_get_quote')}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
