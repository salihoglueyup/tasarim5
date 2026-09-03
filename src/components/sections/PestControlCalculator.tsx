"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CalculatorLeadForm from './CalculatorLeadForm';

/**
 * Faz 42: PestControlCalculator form alanlarının CSS tabanlı durumlara bağlanması
 * ve Framer Motion bağımlılığının kaldırılarak GPU geçişlerine geçilmesi.
 */
export default function PestControlCalculator() {
  const { t } = useLanguage();
  const [blocks, setBlocks] = useState(5);

  // Haşere ve Dezenfeksiyon: Blok başı 500 TL + 1.500 TL sabit Sağlık Bakanlığı onaylı biyosidal maliyeti
  const blockCost = blocks * 500;
  const baseCost = 1500;
  const totalCost = blockCost + baseCost;

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
      {/* Decorative BG - Slate/Titanium Theme */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Controls */}
        <div className="flex-1 space-y-10">
          <div>
            <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">{t('calc_pest_title')}</h3>
            <p className="text-[var(--color-secondary)] font-light">{t('calc_pest_desc')}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="pest-calc-blocks" className="text-sm font-bold text-[var(--color-primary)]">{t('calc_pest_blocks')}</label>
                <span className="text-lg font-black text-slate-700 dark:text-slate-300">{blocks} Blok</span>
              </div>
              <input 
                id="pest-calc-blocks"
                aria-label="Toplam Blok Sayısı"
                type="range" 
                min="1" max="100" step="1"
                value={blocks}
                onChange={(e) => setBlocks(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>1 Blok</span>
                <span>100+ Blok</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
               <span className="material-symbols-outlined text-slate-500 text-3xl" aria-hidden="true">pest_control</span>
               <div>
                 <p className="text-xs text-gray-500">{t('calc_pest_products')}</p>
                 <p className="text-sm font-bold text-slate-800 dark:text-white">{t('calc_pest_eco')}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Result & CTA */}
        <div className="lg:w-96 flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-[2.5rem] shadow-xl text-center relative border border-slate-500/20">
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-slate-500/10 rounded-3xl pointer-events-none" />
          
          <span className="text-slate-300 text-sm font-bold tracking-wider uppercase mb-4">{t('calc_est_budget')}</span>
          
          {/* Faz 42: Sıfır-Jank GPU CSS Sayı Gösterimi */}
          <div className="text-4xl md:text-5xl font-black text-white mb-2 transition-all duration-200 transform-gpu">
            ₺{totalCost.toLocaleString('tr-TR')}
          </div>
          
          <span className="text-xs text-gray-400 mb-8">{t('calc_disclaimer_pest')}</span>
          
          <CalculatorLeadForm 
            serviceName="Haşere Kontrol" 
            calcDetails={{ blocks, totalCost }}
          />
        </div>

      </div>
    </div>
  );
}
