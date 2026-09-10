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

      {/* Faz 97: dvh kullanımı ile mobil adres çubuğu açılıp kapandığında zıplamayan 120 FPS çekmece */}
      <div 
        className="fixed inset-y-0 right-0 w-full max-w-sm h-[100dvh] max-h-[100dvh] bg-[var(--color-surface)] backdrop-blur-2xl shadow-2xl border-l border-[var(--color-outline)]/60 flex flex-col pt-24 px-6 overflow-y-auto pb-12 transition-transform duration-300 ease-out transform-gpu will-change-transform animate-in slide-in-from-right relative"
      >
        {/* Faz 222: Menü Kapatma Butonu */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Menüyü Kapat"
          className="absolute top-6 right-6 p-2 rounded-xl text-[var(--color-tertiary)] hover:text-[var(--color-primary)] bg-[var(--color-surface-variant)] hover:opacity-80 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">close</span>
        </button>

        <nav className="flex flex-col gap-2 mt-4">
          {menuItems.map((item) => (
            <div 
              key={item.nameKey}
              className="border-b border-[var(--color-outline)]/40"
            >
              {item.subItems ? (
                <div className="flex flex-col">
                  <button 
                    type="button"
                    onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.nameKey ? null : item.nameKey)}
                    className="flex items-center justify-between py-4 text-xl font-bold text-[var(--color-primary)] cursor-pointer"
                    aria-expanded={expandedMobileMenu === item.nameKey}
                  >
                    <span>{t(item.nameKey)}</span>
                    <span className={`material-symbols-outlined transition-transform duration-200 transform-gpu text-[var(--color-tertiary)] ${expandedMobileMenu === item.nameKey ? 'rotate-180 text-[var(--color-primary)]' : ''}`}>
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
                      <div className="flex flex-col gap-4 pb-6 pl-4 border-l-2 border-[var(--color-outline)]/60 ml-2">
                        {item.subItems.map((sub) => (
                          <Link 
                            key={sub.nameKey} 
                            href={getLocalizedPath(sub.path)} 
                            onClick={onClose}
                            className="text-lg text-[var(--color-secondary)] hover:text-[var(--color-primary)] flex items-center gap-3 font-medium transition-colors"
                          >
                            {sub.icon && <span className="material-symbols-outlined text-[18px] opacity-50" aria-hidden="true">{sub.icon}</span>}
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
                  className="block py-4 text-xl font-bold text-[var(--color-primary)] hover:opacity-80 transition-opacity"
                >
                  {t(item.nameKey)}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobil Dil Seçimi Barı */}
        <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/40">
          <span className="block text-xs font-bold text-[var(--color-tertiary)] uppercase tracking-widest mb-3">
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
                    ? 'bg-[var(--color-primary)] text-[var(--color-surface)] border-[var(--color-primary)] shadow-md'
                    : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border-[var(--color-outline)]/60'
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="text-[11px]">{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobil Tema Değiştirici */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[var(--color-primary)]" aria-hidden="true">
              {isDarkMode ? 'dark_mode' : 'light_mode'}
            </span>
            <span className="text-xs font-bold text-[var(--color-primary)]">
              {isDarkMode ? 'Koyu Tema (Aktif)' : 'Açık Tema (Aktif)'}
            </span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-surface)] text-xs font-extrabold shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            {isDarkMode ? 'Açık Mod' : 'Koyu Mod'}
          </button>
        </div>

        {/* Teklif Al Eylem Butonu */}
        <div className="mt-6 flex flex-col gap-3">
          <button 
            type="button"
            onClick={() => { onClose(); openQuoteModal(); }}
            className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] text-[var(--color-surface)] text-lg font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <span>{t('btn_get_quote')}</span>
            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
