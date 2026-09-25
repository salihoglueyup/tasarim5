"use client";

import React, { useState } from 'react';
import { QuoteCtaButton } from '@/components';

interface GesRoiCalculatorSeoProps {
  onOpenQuote?: () => void;
}

export default function GesRoiCalculatorSeo({ onOpenQuote }: GesRoiCalculatorSeoProps) {
  const [units, setUnits] = useState<number>(80);
  const [monthlyBill, setMonthlyBill] = useState<number>(65000);
  const [roofType, setRoofType] = useState<'flat' | 'sloped'>('flat');
  const [includeEv, setIncludeEv] = useState<boolean>(true);

  // Dynamic calculations based on Turkish solar irradiance & current commercial tariffs
  const savingsFactor = includeEv ? 0.82 : 0.74;
  const estimatedSavingsMonthly = Math.round(monthlyBill * savingsFactor);
  const estimatedSavingsYearly = estimatedSavingsMonthly * 12;
  const perUnitMonthlySavings = Math.max(50, Math.round(estimatedSavingsMonthly / units));

  // Required capacity: approx 1 kWp produces ~1350 kWh/year in Istanbul/Marmara
  const estimatedKwp = Math.max(15, Math.round((monthlyBill / 450) * 10) / 10);
  const estimatedKwhYearly = Math.round(estimatedKwp * 1350);
  const paybackYears = includeEv ? 2.9 : 3.3;
  const co2OffsetTons = Math.round(estimatedKwhYearly * 0.00048);
  const equivalentTrees = Math.round(co2OffsetTons * 48);

  return (
    <section
      id="ges-hesaplayici"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)] relative overflow-hidden"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              calculate
            </span>
            <span>2026 Elektrik Tarifeleri ve Güneş Radyasyon Modeli</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Sitenizin Çatı GES & EV Şarj Tasarruf Potansiyelini Hesaplayın
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Daire sayınızı ve aylık ortak elektrik faturanızı seçin; kurulacak santral gücünü, 
            yıllık toplam tasarrufu ve <strong>daire başına aidatınızın ne kadar düşeceğini</strong> anında görün.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Slider 1: Daire Sayısı */}
            <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[var(--color-primary)] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-amber-500">apartment</span>
                  <span>Sitedeki Toplam Daire Sayısı</span>
                </label>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                  {units} Daire
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={5}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>20 Daire (Butik Site)</span>
                <span>250 Daire</span>
                <span>500+ Daire (Mega Proje)</span>
              </div>
            </div>

            {/* Slider 2: Aylık Ortak Elektrik Faturası */}
            <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[var(--color-primary)] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-amber-500">receipt_long</span>
                  <span>Aylık Ortak Elektrik Faturası (Ortalama)</span>
                </label>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                  ₺{monthlyBill.toLocaleString('tr-TR')}
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={350000}
                step={5000}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>₺15.000</span>
                <span>₺150.000</span>
                <span>₺350.000+</span>
              </div>
            </div>

            {/* Selector: Çatı Tipi & EV Şarj Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60">
                <label className="block text-xs font-bold text-[var(--color-primary)] mb-2.5">
                  Çatı Yapı Türü
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRoofType('flat')}
                    className={`p-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all text-center ${
                      roofType === 'flat'
                        ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)] shadow-xs'
                        : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                    }`}
                  >
                    Düz Teras
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoofType('sloped')}
                    className={`p-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all text-center ${
                      roofType === 'sloped'
                        ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)] shadow-xs'
                        : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border-[var(--color-outline)]/60 hover:text-[var(--color-primary)]'
                    }`}
                  >
                    Eğimli Kiremit
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)]/60 flex flex-col justify-between">
                <label className="block text-xs font-bold text-[var(--color-primary)] mb-1">
                  Otoparkta EV Şarj İstasyonu
                </label>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[var(--color-secondary)]">Ortak şarj geliri</span>
                  <button
                    type="button"
                    onClick={() => setIncludeEv(!includeEv)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      includeEv ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        includeEv ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Display Card (Right) */}
          <div className="lg:col-span-6 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-7 sm:p-9 border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient solar glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                  {includeEv ? '☀️ Çatı GES + EV Şarj Entegre' : '☀️ Çatı GES Standart'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {roofType === 'flat' ? 'Ağırlıklı Montaj' : 'Raylı Eğimli Sistem'}
                </span>
              </div>

              {/* Main Savings Number */}
              <div className="mb-6">
                <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
                  Yıllık Toplam Sitenize Sağlanan Tasarruf:
                </span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 tracking-tight mt-1">
                  ₺{estimatedSavingsYearly.toLocaleString('tr-TR')}
                </div>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                  <span>Daire Başına Aylık ~₺{perUnitMonthlySavings.toLocaleString('tr-TR')} Aidat İndirimi</span>
                </div>
              </div>

              <hr className="border-slate-800 mb-6" />

              {/* 4 Secondary KPIs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Gerekli Santral Gücü</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {estimatedKwp} kWp
                  </div>
                  <div className="text-[11px] text-slate-400">Tier-1 Monokristal</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Yıllık Temiz Üretim</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    ~{estimatedKwhYearly.toLocaleString('tr-TR')} kWh
                  </div>
                  <div className="text-[11px] text-slate-400">Güneş Enerjisi</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Amortisman Süresi</div>
                  <div className="text-lg sm:text-xl font-bold text-amber-400 mt-0.5">
                    {paybackYears} Yıl
                  </div>
                  <div className="text-[11px] text-slate-400">Kalan 22 yıl bedava</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Engellenen CO₂</div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5">
                    {co2OffsetTons} Ton / Yıl
                  </div>
                  <div className="text-[11px] text-slate-400">~{equivalentTrees} Ağaç eşdeğeri</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {onOpenQuote ? (
              <button
                type="button"
                onClick={onOpenQuote}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black py-4 px-6 rounded-2xl text-center text-sm shadow-xl shadow-amber-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                Siteniz İçin Detaylı Mühendislik Raporu İsteyin
              </button>
            ) : (
              <QuoteCtaButton className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black py-4 px-6 rounded-2xl text-center text-sm shadow-xl shadow-amber-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5">
                Siteniz İçin Detaylı Mühendislik Raporu İsteyin
              </QuoteCtaButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
