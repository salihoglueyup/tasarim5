"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CalculatorLeadForm from './CalculatorLeadForm';

type FacilityType = 'site' | 'rezidans' | 'plaza' | 'sanayi';

const FACILITY_TYPES = [
  { id: 'site' as FacilityType, label: 'Konut & Site', multiplier: 1.0, baseDues: 1400, icon: 'domain' },
  { id: 'rezidans' as FacilityType, label: 'Lüks Rezidans', multiplier: 1.35, baseDues: 2400, icon: 'apartment' },
  { id: 'plaza' as FacilityType, label: 'Plaza & Ofis', multiplier: 1.55, baseDues: 3200, icon: 'business' },
  { id: 'sanayi' as FacilityType, label: 'Sanayi & Fabrika', multiplier: 1.75, baseDues: 4500, icon: 'factory' },
];

Object.freeze(FACILITY_TYPES);

/**
 * Faz 38: FacilityCalculator bileşeninin Framer Motion'dan arındırılması,
 * hafifletilmesi ve form slider geçişlerinin sıfır-jank GPU CSS'e taşınması.
 */
export default function FacilityCalculator() {
  const { t } = useLanguage();
  const [facilityType, setFacilityType] = useState<FacilityType>('site');
  const [units, setUnits] = useState(80);
  const [blocks, setBlocks] = useState(2);

  const currentType = FACILITY_TYPES.find((f) => f.id === facilityType) || FACILITY_TYPES[0];
  const duesPerUnit = Math.round(currentType.baseDues * currentType.multiplier);
  const totalMonthlyBudget = units * duesPerUnit;
  const savingPercentage = 0.30; // %30 Net Tasarruf
  const monthlySavings = Math.round(totalMonthlyBudget * savingPercentage);
  const yearlySavings = monthlySavings * 12;

  // Kalem Dökümü
  const securityShare = Math.round(totalMonthlyBudget * 0.40);
  const cleaningShare = Math.round(totalMonthlyBudget * 0.25);
  const technicalShare = Math.round(totalMonthlyBudget * 0.20);
  const accountingShare = Math.round(totalMonthlyBudget * 0.15);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-14 shadow-sm relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/5 rounded-full blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translateZ(0)" }} />

      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        {/* Left Side: Interactive Controls */}
        <div className="flex-1 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-2 border border-slate-900/10 dark:border-white/10">
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              Canlı Bütçe & Tasarruf Simülatörü
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
              {t('calc_fac_title') || 'Tesis Yönetimi Bütçesi ve Tasarruf Analizi'}
            </h3>
            <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
              {t('calc_fac_desc') || 'Tesis tipinizi ve daire sayınızı seçerek tahmini işletme bütçenizi ve Alo Yönetim ile yıllık tasarrufunuzu hesaplayın.'}
            </p>
          </div>

          {/* Facility Type Selector */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-3">
              Tesis Tipi:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {FACILITY_TYPES.map((ft) => {
                const isSelected = ft.id === facilityType;
                return (
                  <button
                    key={ft.id}
                    type="button"
                    onClick={() => setFacilityType(ft.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1 cursor-pointer transform-gpu ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-sm font-bold'
                        : 'bg-[var(--color-surface-variant)] border-[var(--color-outline)]/80 text-[var(--color-secondary)] hover:border-slate-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{ft.icon}</span>
                    <span className="text-xs font-bold">{ft.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders: Daire ve Blok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3 bg-[var(--color-surface-variant)] p-4 rounded-2xl border border-[var(--color-outline)]/60">
              <div className="flex justify-between items-center">
                <label htmlFor="fac-calc-units" className="text-xs font-bold text-[var(--color-primary)]">Bağımsız Bölüm:</label>
                <span className="text-sm font-black text-[var(--color-primary)]">{units} Daire</span>
              </div>
              <input
                id="fac-calc-units"
                aria-label="Bağımsız Bölüm Daire Sayısı"
                type="range"
                min="10"
                max="1000"
                step="10"
                value={units}
                onChange={(e) => setUnits(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
              <div className="flex justify-between text-[10px] text-[var(--color-secondary)] font-medium">
                <span>10</span>
                <span>1000+ Daire</span>
              </div>
            </div>

            <div className="space-y-3 bg-[var(--color-surface-variant)] p-4 rounded-2xl border border-[var(--color-outline)]/60">
              <div className="flex justify-between items-center">
                <label htmlFor="fac-calc-blocks" className="text-xs font-bold text-[var(--color-primary)]">Blok Sayısı:</label>
                <span className="text-sm font-black text-[var(--color-primary)]">{blocks} Blok</span>
              </div>
              <input
                id="fac-calc-blocks"
                aria-label="Blok Sayısı"
                type="range"
                min="1"
                max="20"
                step="1"
                value={blocks}
                onChange={(e) => setBlocks(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
              <div className="flex justify-between text-[10px] text-[var(--color-secondary)] font-medium">
                <span>1 Blok</span>
                <span>20 Blok</span>
              </div>
            </div>
          </div>

          {/* Kalem Bazlı Tahmini Bütçe Dağılımı */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center">
            <div className="bg-[var(--color-surface-variant)] p-2.5 rounded-xl border border-[var(--color-outline)]/60">
              <span className="block text-[10px] text-[var(--color-secondary)]">5188 Güvenlik</span>
              <span className="text-xs font-bold text-[var(--color-primary)]">₺{securityShare.toLocaleString('tr-TR')}</span>
            </div>
            <div className="bg-[var(--color-surface-variant)] p-2.5 rounded-xl border border-[var(--color-outline)]/60">
              <span className="block text-[10px] text-[var(--color-secondary)]">Temizlik & Hijyen</span>
              <span className="text-xs font-bold text-[var(--color-primary)]">₺{cleaningShare.toLocaleString('tr-TR')}</span>
            </div>
            <div className="bg-[var(--color-surface-variant)] p-2.5 rounded-xl border border-[var(--color-outline)]/60">
              <span className="block text-[10px] text-[var(--color-secondary)]">Teknik & Asansör</span>
              <span className="text-xs font-bold text-[var(--color-primary)]">₺{technicalShare.toLocaleString('tr-TR')}</span>
            </div>
            <div className="bg-[var(--color-surface-variant)] p-2.5 rounded-xl border border-[var(--color-outline)]/60">
              <span className="block text-[10px] text-[var(--color-secondary)]">Aidat & KMK Takibi</span>
              <span className="text-xs font-bold text-[var(--color-primary)]">₺{accountingShare.toLocaleString('tr-TR')}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Result & CTA */}
        <div className="lg:w-96 flex flex-col justify-center items-center bg-[var(--color-surface-variant)] p-8 rounded-[2.5rem] shadow-sm text-center relative border border-[var(--color-outline)]/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold tracking-wide uppercase mb-3 border border-emerald-500/20">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            %30 Net Maliyet Tasarrufu
          </div>

          <span className="text-[var(--color-secondary)] text-xs font-semibold uppercase tracking-wider mb-1">
            Yıllık Tahmini Net Tasarrufunuz
          </span>

          {/* Faz 38: Sıfır-Jank Donanımsal GPU Sayı Gösterimi */}
          <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 mb-1 transition-all duration-200 transform-gpu">
            ₺{yearlySavings.toLocaleString('tr-TR')}
          </div>

          <span className="text-[11px] text-[var(--color-tertiary)] mb-6">
            Aylık ortalama ₺{monthlySavings.toLocaleString('tr-TR')} bütçe avantajı
          </span>

          <CalculatorLeadForm
            serviceName="Tesis Yönetimi"
            calcDetails={{ flats: units, monthlySavings, yearlySavings }}
          />
        </div>
      </div>
    </div>
  );
}
