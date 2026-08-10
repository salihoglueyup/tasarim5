"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function LandscapeCalculator() {
  const { t } = useLanguage();
  const [greenArea, setGreenArea] = useState(2000);
  const [isCalculated, setIsCalculated] = useState(false);

  // Fake logic: Landscape maintenance = 15 TL per m2 + 10,000 base cost for plants/fertilizers
  const areaCost = greenArea * 15;
  const baseCost = 10000;
  const totalCost = areaCost + baseCost;

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
      {/* Decorative BG - Slate/Titanium Theme */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Controls */}
        <div className="flex-1 space-y-10">
          <div>
            <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">{t('calc_land_title')}</h3>
            <p className="text-[var(--color-secondary)] font-light">{t('calc_land_desc')}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[var(--color-primary)]">{t('calc_land_area')}</label>
                <span className="text-lg font-black text-slate-700 dark:text-slate-300">{greenArea.toLocaleString('tr-TR')} m²</span>
              </div>
              <input 
                type="range" 
                min="500" max="25000" step="500"
                value={greenArea}
                onChange={(e) => { setGreenArea(parseInt(e.target.value)); setIsCalculated(true); }}
                className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>500 m²</span>
                <span>25,000+ m²</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
               <span className="material-symbols-outlined text-slate-500 text-3xl">nature_people</span>
               <div>
                 <p className="text-xs text-gray-500">{t('calc_land_engineer')}</p>
                 <p className="text-sm font-bold text-slate-800 dark:text-white">{t('calc_included_standard')}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Result & CTA */}
        <div className="lg:w-96 flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-[2.5rem] shadow-xl text-center relative border border-slate-500/20">
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-slate-500/10 rounded-3xl pointer-events-none" />
          
          <span className="text-slate-300 text-sm font-bold tracking-wider uppercase mb-4">{t('calc_est_budget')}</span>
          
          {isCalculated ? (
            <motion.div 
              key={totalCost}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-white mb-2"
            >
              ₺{totalCost.toLocaleString('tr-TR')}
            </motion.div>
          ) : (
            <div className="text-4xl md:text-5xl font-black text-white mb-2">
              ₺{totalCost.toLocaleString('tr-TR')}
            </div>
          )}
          
          <span className="text-xs text-gray-400 mb-8">{t('calc_disclaimer_landscape')}</span>
          
          <Link href="/teklif-al" className="w-full bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-6 rounded-xl transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-white/10">
            {t('calc_btn_free_discovery')}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
