"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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

/**
 * Faz 11: Mobil Menü Lazy Split
 * Bu bileşen sadece mobil ekranlarda hamburger butona tıklandığında (isOpen=true) dynamic import ile yüklenir.
 * Masaüstü ziyaretçileri bu ağır animasyonlu ve geniş menü ağacını bundle olarak indirmez.
 */
export default function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  getLocalizedPath,
  openQuoteModal,
}: MobileMenuProps) {
  const { t } = useLanguage();
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

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

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-col gap-3"
          >
            <button 
              onClick={() => { onClose(); openQuoteModal(); }}
              className="flex items-center justify-center gap-2 w-full bg-[#2D2D3A] text-white text-lg font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
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
