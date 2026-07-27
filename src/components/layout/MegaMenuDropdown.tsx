"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { MenuItem } from './MobileMenu';

type MegaMenuDropdownProps = {
  hoveredMenu: string | null;
  item: MenuItem;
  getLocalizedPath: (path: string) => string;
  closeMenus: () => void;
};

/**
 * Faz 12: Masaüstü Mega Menü Lazy Split
 * Bu açılır menü animasyonları ve büyük DOM ağacı sadece bir menünün üzerine gelindiğinde (hover)
 * veya dinlenildiğinde çalıştırılmak üzere ayrılmıştır.
 */
export default function MegaMenuDropdown({
  hoveredMenu,
  item,
  getLocalizedPath,
  closeMenus,
}: MegaMenuDropdownProps) {
  const { t } = useLanguage();

  if (!item.subItems) return null;

  return (
    <AnimatePresence>
      {hoveredMenu === item.nameKey && (
        <motion.div 
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] pt-3 origin-top z-50"
        >
          <div className="bg-white/95 dark:bg-[#122338]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden grid grid-cols-12 p-5 gap-4">
            
            {/* Sub-items (8 Cols) */}
            <div className="col-span-8 grid grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {item.subItems.map((subItem) => (
                <Link 
                  key={subItem.nameKey} 
                  href={getLocalizedPath(subItem.path)}
                  prefetch={true}
                  onClick={closeMenus}
                  className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors relative"
                >
                  {subItem.icon && (
                    <div className="w-8.5 h-8.5 rounded-lg bg-slate-100 dark:bg-white/10 text-[var(--color-primary)] dark:text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110 shadow-sm">
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{subItem.icon}</span>
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-[12.5px] text-slate-900 dark:text-white mb-0.5 transition-colors group-hover/item:text-[var(--color-primary)]">
                      {t(subItem.nameKey)}
                    </div>
                    {subItem.descKey && (
                      <p className="text-[10px] font-normal text-slate-500/90 dark:text-gray-400 leading-snug line-clamp-1">
                        {t(subItem.descKey)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Featured Callout Promo Card (4 Cols) */}
            <div className="col-span-4 bg-gradient-to-br from-[#2D2D3A] via-[#1f1f2a] to-[#14141d] text-white p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-md">
              <div className="relative z-10 flex flex-col gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 bg-white/10 px-2.5 py-1 rounded-full w-fit border border-white/10">
                  {t('lbl_live_module')}
                </span>
                <div className="font-extrabold text-sm leading-snug mt-1">{t('calc_promo_title')}</div>
                <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                  {t('calc_promo_desc')}
                </p>
              </div>

              <Link 
                href={getLocalizedPath('/hesaplayici')}
                prefetch={true}
                onClick={closeMenus}
                className="relative z-10 mt-4 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1 group/btn"
              >
                {t('calc_start_btn')}
                <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
