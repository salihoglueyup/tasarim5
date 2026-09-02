"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CalculatorLeadForm from './CalculatorLeadForm';

/**
 * Faz 36: CleaningCalculator içindeki motion.div animasyonlarının
 * saf donanım hızlandırmalı CSS transition'a dönüştürülmesi (Zero-Jank Slider Scrubbing).
 */
export default function CleaningCalculator() {
  const { t } = useLanguage();
  const [area, setArea] = useState(5000);

  // 1 temizlik personeli / 2000m2. 1 personel = 35,000 TL
  const recommendedStaff = Math.max(1, Math.ceil(area / 2000));
  const baseCost = 35000;
  const totalCost = recommendedStaff * baseCost;

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
      {/* Decorative BG - Slate/Titanium Theme */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Controls */}
        <div className="flex-1 space-y-10">
          <div>
            <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">{t('calc_clean_title')}</h3>
            <p className="text-[var(--color-secondary)] font-light">{t('calc_clean_desc')}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="cleaning-area-input" className="text-sm font-bold text-[var(--color-primary)]">{t('calc_clean_area')}</label>
                <span className="text-lg font-black text-slate-700 dark:text-slate-300">{area.toLocaleString('tr-TR')} m²</span>
              </div>
              <input 
                id="cleaning-area-input"
                aria-label="Temizlik Yapılacak Toplam Alan (m²)"
                type="range" 
                min="500" max="25000" step="500"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>500 m²</span>
                <span>25,000 m²+</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
               <span className="material-symbols-outlined text-slate-500 text-3xl">groups</span>
               <div>
                 <p className="text-xs text-gray-500">{t('calc_clean_optimum')}</p>
                 <p className="text-lg font-bold text-slate-800 dark:text-white">{recommendedStaff} Profesyonel</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Result & CTA */}
        <div className="lg:w-96 flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-[2.5rem] shadow-xl text-center relative border border-slate-500/20">
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-slate-500/10 rounded-3xl pointer-events-none" />
          
          <span className="text-slate-300 text-sm font-bold tracking-wider uppercase mb-4">{t('calc_est_budget')}</span>
          
          {/* Faz 36: Sıfır-Jank Donanımsal Sayı Gösterimi */}
          <div className="text-4xl md:text-5xl font-black text-white mb-2 transition-all duration-200 transform-gpu">
            ₺{totalCost.toLocaleString('tr-TR')}
          </div>
          
          <span className="text-xs text-gray-400 mb-8">{t('calc_disclaimer_cleaning')}</span>
          
          <CalculatorLeadForm 
            serviceName="Temizlik Hizmeti" 
            calcDetails={{ area, totalCost }}
          />
        </div>

      </div>
    </div>
  );
}
