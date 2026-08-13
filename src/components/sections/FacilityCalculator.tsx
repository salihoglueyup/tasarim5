"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import CalculatorLeadForm from './CalculatorLeadForm';

export default function FacilityCalculator() {
  const { t } = useLanguage();
  const [flats, setFlats] = useState(100);
  const [isCalculated, setIsCalculated] = useState(false);
  const [averageDues, setAverageDues] = useState(1500);
  const [savingPercentage, setSavingPercentage] = useState(0.15);

  useEffect(() => {
    fetch('/api/calculator')
      .then(res => res.json())
      .then(data => {
        if (data.baseCostPerUnit) setAverageDues(data.baseCostPerUnit);
        if (data.savingsRate) setSavingPercentage(data.savingsRate);
      })
      .catch(() => {});
  }, []);

  const monthlySavings = flats * averageDues * savingPercentage;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
      {/* Decorative BG - Slate/Titanium Theme */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Controls */}
        <div className="flex-1 space-y-10">
          <div>
            <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">{t('calc_fac_title')}</h3>
            <p className="text-[var(--color-secondary)] font-light">{t('calc_fac_desc')}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[var(--color-primary)]">{t('calc_dues_units')}</label>
                <span className="text-lg font-black text-slate-700 dark:text-slate-300">{flats} Daire</span>
              </div>
              <input 
                type="range" 
                min="10" max="1000" step="10"
                value={flats}
                onChange={(e) => { setFlats(parseInt(e.target.value)); setIsCalculated(true); }}
                className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>10</span>
                <span>1000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Result & CTA */}
        <div className="lg:w-96 flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-[2.5rem] shadow-xl text-center relative border border-slate-500/20">
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-slate-500/10 rounded-3xl pointer-events-none" />
          
          <span className="text-slate-300 text-sm font-bold tracking-wider uppercase mb-4">{t('calc_dues_yearly_savings')}</span>
          
          {isCalculated ? (
            <motion.div 
              key={yearlySavings}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-white mb-2"
            >
              ₺{yearlySavings.toLocaleString('tr-TR')}
            </motion.div>
          ) : (
            <div className="text-4xl md:text-5xl font-black text-white mb-2">
              ₺{yearlySavings.toLocaleString('tr-TR')}
            </div>
          )}
          
          <span className="text-xs text-gray-400 mb-8">{t('calc_disclaimer_dues')}</span>
          
          <CalculatorLeadForm 
            serviceName="Tesis Yönetimi" 
            calcDetails={{ flats, monthlySavings, yearlySavings }}
          />
        </div>

      </div>
    </div>
  );
}
