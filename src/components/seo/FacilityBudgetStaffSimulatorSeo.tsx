"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export type SimulatorPropertyType = 'site' | 'rezidans' | 'plaza' | 'sanayi';

export default function FacilityBudgetStaffSimulatorSeo() {
  const [propertyType, setPropertyType] = useState<SimulatorPropertyType>('site');
  const [unitCount, setUnitCount] = useState<number>(120);
  const [areaM2, setAreaM2] = useState<number>(18000);

  // Dinamik norm kadro ve bütçe hesaplaması
  const calculations = useMemo(() => {
    let securityStaff = 0;
    let cleaningStaff = 0;
    let technicalStaff = 0;
    let baseDuesPerUnit = 0;

    switch (propertyType) {
      case 'rezidans':
        // Lüks rezidans: 7/24 lobi + nizamiye + devriye (min 5 personel = 3 vardiya + joker)
        securityStaff = Math.max(5, Math.ceil(unitCount / 40) * 2 + 1);
        cleaningStaff = Math.max(3, Math.ceil(areaM2 / 4500));
        technicalStaff = Math.max(2, Math.ceil(areaM2 / 12000));
        baseDuesPerUnit = 2400 + Math.round((areaM2 / unitCount) * 4.5);
        break;

      case 'plaza':
        // Plaza: Turnike güvenlik + CCTV + otopark
        securityStaff = Math.max(4, Math.ceil(areaM2 / 6000) * 2);
        cleaningStaff = Math.max(3, Math.ceil(areaM2 / 3500));
        technicalStaff = Math.max(2, Math.ceil(areaM2 / 8000));
        baseDuesPerUnit = 3200 + Math.round((areaM2 / unitCount) * 6.2);
        break;

      case 'sanayi':
        // Sanayi: Çevre güvenlik + ağır teknik bakım + zemin
        securityStaff = Math.max(4, Math.ceil(areaM2 / 10000) * 2);
        cleaningStaff = Math.max(2, Math.ceil(areaM2 / 8000));
        technicalStaff = Math.max(2, Math.ceil(areaM2 / 7000));
        baseDuesPerUnit = 4500 + Math.round((areaM2 / unitCount) * 5.0);
        break;

      case 'site':
      default:
        // Konut sitesi: 3 vardiya nizamiye (min 4 kişi)
        securityStaff = Math.max(4, Math.ceil(unitCount / 70) * 2);
        cleaningStaff = Math.max(2, Math.ceil(unitCount / 60));
        technicalStaff = Math.max(1, Math.ceil(unitCount / 150));
        baseDuesPerUnit = 1450 + Math.round((areaM2 / unitCount) * 2.8);
        break;
    }

    const totalStaff = securityStaff + cleaningStaff + technicalStaff;
    const monthlyTotalBudget = unitCount * baseDuesPerUnit;
    const savingRate = propertyType === 'plaza' ? 0.32 : propertyType === 'rezidans' ? 0.28 : 0.30;
    const monthlySavings = Math.round(monthlyTotalBudget * savingRate);
    const annualSavings = monthlySavings * 12;

    return {
      securityStaff,
      cleaningStaff,
      technicalStaff,
      totalStaff,
      baseDuesPerUnit,
      monthlyTotalBudget,
      savingRatePercent: Math.round(savingRate * 100),
      monthlySavings,
      annualSavings,
    };
  }, [propertyType, unitCount, areaM2]);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[3rem] p-6 sm:p-12 shadow-sm relative overflow-hidden my-16">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">calculate</span>
          <span>İnteraktif Kadro & Bütçe Simülatörü</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
          Tesisinizin Norm Kadro ve <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400">Tasarruf Potansiyelini Hesaplayın</span>
        </h2>
        <p className="text-xs sm:text-base text-[var(--color-secondary)] font-normal mt-2 leading-relaxed">
          Mülk tipinizi, bağımsız bölüm sayınızı ve kapalı alanınızı girin; yasal gereksinimlere uygun 5188 güvenlik, temizlik, teknik kadro ihtiyacını ve tahmini yıllık aidat tasarrufunuzu anında görün.
        </p>

        {/* Property Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-8 max-w-2xl mx-auto">
          {[
            { id: 'site', label: 'Konut Sitesi', icon: 'domain' },
            { id: 'rezidans', label: 'Lüks Rezidans', icon: 'apartment' },
            { id: 'plaza', label: 'Plaza & İş Merkezi', icon: 'business' },
            { id: 'sanayi', label: 'Sanayi & Fabrika', icon: 'factory' },
          ].map((item) => {
            const isSelected = propertyType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPropertyType(item.id as SimulatorPropertyType)}
                className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-md scale-[1.02]'
                    : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:border-slate-400'
                }`}
              >
                <span className="material-symbols-outlined text-xl" aria-hidden="true">{item.icon}</span>
                <span className="text-xs font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Col: Sliders (6 cols) */}
        <div className="lg:col-span-6 space-y-6 p-6 sm:p-8 rounded-3xl bg-[var(--color-surface-variant)]/50 border border-[var(--color-outline)]/60">
          <h3 className="font-bold text-base text-[var(--color-primary)] flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400" aria-hidden="true">tune</span>
            <span>Tesis Parametreleri</span>
          </h3>

          {/* Slider 1: Daire / Bağımsız Bölüm Sayısı */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="unit-slider" className="text-xs sm:text-sm font-semibold text-[var(--color-secondary)]">
                Bağımsız Bölüm (Daire / Ofis) Sayısı:
              </label>
              <span className="font-mono font-black text-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-xl border border-blue-200/60 dark:border-blue-800/40">
                {unitCount} Adet
              </span>
            </div>
            <input
              id="unit-slider"
              type="range"
              min={20}
              max={1500}
              step={10}
              value={unitCount}
              onChange={(e) => setUnitCount(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[var(--color-tertiary)] font-mono">
              <span>20 (Butik Site)</span>
              <span>500 (Büyük Site)</span>
              <span>1.500+ (Mega Proje)</span>
            </div>
          </div>

          {/* Slider 2: Toplam Kapalı Alan (m2) */}
          <div className="space-y-3 pt-4 border-t border-[var(--color-outline)]/40">
            <div className="flex items-center justify-between">
              <label htmlFor="area-slider" className="text-xs sm:text-sm font-semibold text-[var(--color-secondary)]">
                Toplam İnşaat / Kapalı Alan:
              </label>
              <span className="font-mono font-black text-lg text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40">
                {areaM2.toLocaleString('tr-TR')} m²
              </span>
            </div>
            <input
              id="area-slider"
              type="range"
              min={2000}
              max={120000}
              step={2000}
              value={areaM2}
              onChange={(e) => setAreaM2(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[var(--color-tertiary)] font-mono">
              <span>2.000 m²</span>
              <span>50.000 m²</span>
              <span>120.000+ m²</span>
            </div>
          </div>

          {/* Key Advantages Checklist */}
          <div className="pt-4 border-t border-[var(--color-outline)]/40 space-y-2 text-xs text-[var(--color-secondary)]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500 text-base" aria-hidden="true">check_circle</span>
              <span>Tüm personel kıdem/ihbar tazminatları Alo Yönetim garantisindedir.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500 text-base" aria-hidden="true">check_circle</span>
              <span>Kompanzasyon takibi ile %0 reaktif elektrik cezası taahhüdü verilir.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500 text-base" aria-hidden="true">check_circle</span>
              <span>KMK m.37 resmi tebliğli işletme projesi 7 günde kesinleştirilir.</span>
            </div>
          </div>
        </div>

        {/* Right Col: Calculated Results Card (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Önerilen Norm Kadro</span>
              <h4 className="text-xl font-extrabold text-white">Toplam {calculations.totalStaff} Uzman Personel</h4>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              %{calculations.savingRatePercent} Tasarruf
            </div>
          </div>

          {/* 3 Staff Blocks */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="material-symbols-outlined text-blue-400 text-2xl block mb-1" aria-hidden="true">shield_person</span>
              <div className="text-xl sm:text-2xl font-black text-white">{calculations.securityStaff}</div>
              <div className="text-[11px] text-slate-300 mt-0.5">5188 Güvenlik</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="material-symbols-outlined text-emerald-400 text-2xl block mb-1" aria-hidden="true">cleaning_services</span>
              <div className="text-xl sm:text-2xl font-black text-white">{calculations.cleaningStaff}</div>
              <div className="text-[11px] text-slate-300 mt-0.5">Temizlik Ekibi</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="material-symbols-outlined text-amber-400 text-2xl block mb-1" aria-hidden="true">engineering</span>
              <div className="text-xl sm:text-2xl font-black text-white">{calculations.technicalStaff}</div>
              <div className="text-[11px] text-slate-300 mt-0.5">Teknik & Bakım</div>
            </div>
          </div>

          {/* Estimated Monthly Dues & Annual Savings */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-300">Tahmini Daire Başına Aidat:</span>
              <span className="font-mono font-bold text-white text-base">
                ₺{calculations.baseDuesPerUnit.toLocaleString('tr-TR')} / Ay
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-300">Aylık Toplam İşletme Bütçesi:</span>
              <span className="font-mono font-bold text-slate-200">
                ₺{calculations.monthlyTotalBudget.toLocaleString('tr-TR')}
              </span>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 block">Alo Yönetim ile Yıllık Tasarruf:</span>
                <span className="text-[11px] text-slate-400 font-light">Toplu satın alma + reaktif muafiyeti</span>
              </div>
              <span className="font-mono font-black text-emerald-400 text-xl sm:text-2xl">
                ~₺{calculations.annualSavings.toLocaleString('tr-TR')}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href="/teklif-al"
            className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm text-center transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Bu Kadro & Bütçe İçin Resmi Keşif İste</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
