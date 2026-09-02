"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CalculatorLeadForm from './CalculatorLeadForm';

/**
 * Faz 44: SecurityCalculator hesaplama algoritmasının ve arayüzünün optimize edilmesi,
 * Framer Motion kaldırılıp donanım hızlandırmalı CSS geçişlerine geçilmesi.
 */
export default function SecurityCalculator() {
  const { t } = useLanguage();
  const [personnel, setPersonnel] = useState(2);
  const [cameras, setCameras] = useState(10);

  // 5188 Özel Güvenlik maliyeti: Personel başı 35.000 TL + kamera başı 500 TL periyodik CCTV bakımı
  const basePersonnelCost = 35000;
  const baseCameraCost = 500;
  const totalCost = (personnel * basePersonnelCost) + (cameras * baseCameraCost);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Controls */}
        <div className="flex-1 space-y-10">
          <div>
            <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">{t('calc_sec_title')}</h3>
            <p className="text-[var(--color-secondary)] font-light">{t('calc_sec_desc')}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="sec-calc-pers" className="text-sm font-bold text-[var(--color-primary)]">{t('calc_sec_personnel')}</label>
                <span className="text-lg font-black text-slate-700 dark:text-slate-300">{personnel} {t('calc_unit_person')}</span>
              </div>
              <input 
                id="sec-calc-pers"
                aria-label="Güvenlik Personeli Sayısı"
                type="range" 
                min="1" max="20" step="1"
                value={personnel}
                onChange={(e) => setPersonnel(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="sec-calc-cam" className="text-sm font-bold text-[var(--color-primary)]">{t('calc_sec_cameras')}</label>
                <span className="text-lg font-black text-slate-700 dark:text-slate-300">{cameras} {t('calc_unit_item')}</span>
              </div>
              <input 
                id="sec-calc-cam"
                aria-label="Güvenlik Kamerası Sayısı"
                type="range" 
                min="0" max="100" step="5"
                value={cameras}
                onChange={(e) => setCameras(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Result & CTA */}
        <div className="lg:w-96 flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-[2.5rem] shadow-xl text-center relative border border-slate-500/20">
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-slate-500/10 rounded-3xl pointer-events-none" />
          
          <span className="text-slate-300 text-sm font-bold tracking-wider uppercase mb-4">{t('calc_est_budget')}</span>
          
          {/* Faz 44: Sıfır-Jank GPU CSS Sayı Gösterimi */}
          <div className="text-4xl md:text-5xl font-black text-white mb-2 transition-all duration-200 transform-gpu">
            ₺{totalCost.toLocaleString('tr-TR')}
          </div>
          
          <span className="text-xs text-gray-400 mb-8">{t('calc_disclaimer_standard')}</span>
          
          <CalculatorLeadForm 
            serviceName="Güvenlik Yönetimi" 
            calcDetails={{ personnel, cameras, totalCost }}
          />
        </div>

      </div>
    </div>
  );
}
