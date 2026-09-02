"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CalculatorLeadForm from './CalculatorLeadForm';

/**
 * Faz 40: LegalCalculator form elemanlarının ve sonuç gösteriminin sadeleştirilmesi,
 * Framer Motion bağımlılığının kaldırılarak saf donanım hızlandırmalı CSS transition'a geçirilmesi.
 */
export default function LegalCalculator() {
  const { t } = useLanguage();
  const [debtAmount, setDebtAmount] = useState(50000);

  // KMK ve İcra: Tahsilat süreci borçludan karşılanır, yönetime maliyet 0 TL
  const costToManagement = 0;
  const recoveredAmount = debtAmount * 1.09; // %9 yasal faiz ve gecikme tazminatı

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
      {/* Decorative BG - Slate/Titanium Theme */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Controls */}
        <div className="flex-1 space-y-10">
          <div>
            <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">{t('calc_legal_title')}</h3>
            <p className="text-[var(--color-secondary)] font-light">{t('calc_legal_desc')}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="legal-calc-debt" className="text-sm font-bold text-[var(--color-primary)]">{t('calc_legal_debt')}</label>
                <span className="text-lg font-black text-slate-700 dark:text-slate-300">₺{debtAmount.toLocaleString('tr-TR')}</span>
              </div>
              <input 
                id="legal-calc-debt"
                aria-label="Toplam İcralık Aidat Alacağı"
                type="range" 
                min="10000" max="1000000" step="10000"
                value={debtAmount}
                onChange={(e) => setDebtAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>10.000 ₺</span>
                <span>1.000.000+ ₺</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
               <span className="material-symbols-outlined text-slate-500 text-3xl">balance</span>
               <div>
                 <p className="text-xs text-gray-500">{t('calc_legal_cost')}</p>
                 <p className="text-sm font-bold text-slate-800 dark:text-white">{t('calc_legal_zero_cost')}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Result & CTA */}
        <div className="lg:w-96 flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-[2.5rem] shadow-xl text-center relative border border-slate-500/20">
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-slate-500/10 rounded-3xl pointer-events-none" />
          
          <span className="text-slate-300 text-sm font-bold tracking-wider uppercase mb-4">{t('calc_legal_recovery')}</span>
          
          {/* Faz 40: Sıfır-Jank Donanımsal Sayı Gösterimi */}
          <div className="text-4xl md:text-5xl font-black text-white mb-2 transition-all duration-200 transform-gpu">
            ₺{Math.round(recoveredAmount).toLocaleString('tr-TR')}
          </div>
          
          <span className="text-xs text-slate-400 mb-8 font-medium">{t('calc_legal_included')}</span>
          
          <CalculatorLeadForm 
            serviceName="Hukuk ve İcra" 
            calcDetails={{ debtAmount, costToManagement, recoveredAmount }}
          />
        </div>

      </div>
    </div>
  );
}
