"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import FlagIcon from '@/components/ui/branding/FlagIcon';
import Logo from '@/components/ui/branding/Logo';
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
 * Faz 79 & Faz 97: MobileMenu bileşeninin Framer Motion'dan arındırılarak
 * GPU kompozitöründe saf `transform: translateX` ve `transform-gpu will-change-transform`
 * ile 120 FPS akıcılıkta açılıp kapanan hafif mobil çekmece mimarisi.
 * h-[100dvh] kullanarak mobil adres çubuğu hareketinde zıplamayı önler.
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
      className="fixed inset-0 z-[100] lg:hidden font-sans"
      role="dialog"
      aria-modal="true"
      aria-label="Mobil Menü"
    >
      {/* Karartma Maskesi (Backdrop) - Arka plandaki tüm sayfa ve header'ı örter */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-out transform-gpu animate-in fade-in"
        aria-hidden="true"
      />

      {/* Faz 97: dvh kullanımı ile mobil adres çubuğu açılıp kapandığında zıplamayan 120 FPS çekmece */}
      <div 
        className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md h-[100dvh] max-h-[100dvh] bg-white dark:bg-[#121318] text-slate-900 dark:text-slate-100 shadow-2xl border-l border-slate-200 dark:border-white/10 flex flex-col overflow-hidden transition-transform duration-300 ease-out transform-gpu will-change-transform animate-in slide-in-from-right relative"
      >
        {/* Mobil Çekmece Üst Başlığı: Kristal Netliğinde Logo ve Tekil Kapatma Butonu */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#121318]/95 backdrop-blur-md sticky top-0 z-20 shrink-0">
          <Link 
            href={getLocalizedPath('/')} 
            onClick={onClose}
            aria-label="Alo Yönetim Anasayfa"
            className="flex items-center group py-0.5"
          >
            <Logo variant={isDarkMode ? 'white' : 'auto'} />
          </Link>

          {/* Faz 222: Menü Kapatma Butonu */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Menüyü Kapat"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Kaydırılabilir Menü Gövdesi */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 pb-32">
          {/* Navigasyon Bağlantıları */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <div 
                key={item.nameKey}
                className="border-b border-slate-100 dark:border-white/5 last:border-b-0"
              >
                {item.subItems ? (
                  <div className="flex flex-col">
                    <button 
                      type="button"
                      onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.nameKey ? null : item.nameKey)}
                      className="flex items-center justify-between py-3.5 text-lg font-bold text-slate-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-expanded={expandedMobileMenu === item.nameKey}
                    >
                      <span>{t(item.nameKey)}</span>
                      <span className={`material-symbols-outlined transition-transform duration-200 transform-gpu text-slate-400 dark:text-slate-500 ${expandedMobileMenu === item.nameKey ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`}>
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
                        <div className="flex flex-col gap-3 pb-4 pl-3 border-l-2 border-slate-200 dark:border-white/10 ml-2 mt-1">
                          {item.subItems.map((sub) => (
                            <Link 
                              key={sub.nameKey} 
                              href={getLocalizedPath(sub.path)} 
                              onClick={onClose}
                              className="text-base text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white flex items-center gap-2.5 font-medium transition-colors py-1"
                            >
                              {sub.icon && <span className="material-symbols-outlined text-[17px] opacity-60" aria-hidden="true">{sub.icon}</span>}
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
                    className="block py-3.5 text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t(item.nameKey)}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Hızlı Teklif Al Eylem Butonu */}
          <div className="pt-2">
            <button 
              type="button"
              onClick={() => { onClose(); openQuoteModal(); }}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>{t('btn_get_quote')}</span>
              <span className="material-symbols-outlined text-[19px]" aria-hidden="true">arrow_forward</span>
            </button>
          </div>

          {/* Mobil Dil Seçimi Barı */}
          <div className="pt-5 border-t border-slate-200/80 dark:border-white/10">
            <span className="block text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Dil Seçimi / Language
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { code: 'tr', label: 'TR' },
                { code: 'en', label: 'EN' },
                { code: 'ru', label: 'RU' },
                { code: 'ar', label: 'AR' },
              ].map((l) => {
                const isSelected = language === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => handleMobileLanguageChange(l.code as 'tr' | 'en' | 'ru' | 'ar')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                        : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <FlagIcon code={l.code} size="sm" />
                    <span className="text-[11px] font-mono font-bold">{l.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobil Tema Değiştirici */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-[20px]" aria-hidden="true">
                {isDarkMode ? 'dark_mode' : 'light_mode'}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isDarkMode ? 'Koyu Tema (Aktif)' : 'Açık Tema (Aktif)'}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              {isDarkMode ? 'Açık Mod' : 'Koyu Mod'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
