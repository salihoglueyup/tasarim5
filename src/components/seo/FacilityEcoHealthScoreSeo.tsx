"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

export default function FacilityEcoHealthScoreSeo() {
  const [roofAreaM2, setRoofAreaM2] = useState<number>(600);
  const [totalUnits, setTotalUnits] = useState<number>(50);
  const [hasLedRetrofit, setHasLedRetrofit] = useState<boolean>(true);
  const [hasRainwaterHarvest, setHasRainwaterHarvest] = useState<boolean>(true);

  // GES & Enerji Hesaplaması:
  // 1 m² çatı alanı yılda ortalama 180 kWh güneş enerjisi üretir (İstanbul verisi).
  // 1 kWh ticari ortak alan elektrik bedeli ~4.20 TL (2026 ortalaması).
  // LED aydınlatma dönüşümü ortak aydınlatmada %65 tasarruf sağlar (~3.500 kWh/yıl).
  // Yağmur suyu hasadı peyzaj sulama faturasını %40 düşürür.

  const solarGenerationKWh = Math.round(roofAreaM2 * 175);
  const solarSavingsTL = Math.round(solarGenerationKWh * 4.2);
  const ledSavingsTL = hasLedRetrofit ? totalUnits * 480 : 0;
  const rainwaterSavingsTL = hasRainwaterHarvest ? totalUnits * 320 : 0;

  const totalAnnualEcoSavingsTL = solarSavingsTL + ledSavingsTL + rainwaterSavingsTL;
  const totalPerUnitMonthlySavingsTL = Math.round(totalAnnualEcoSavingsTL / totalUnits / 12);
  const co2OffsetTonnes = ((solarGenerationKWh * 0.45) / 1000).toFixed(1);
  const treesEquivalent = Math.round(Number(co2OffsetTonnes) * 45);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Yeşil Tesis & Çatı GES Sürdürülebilirlik Tasarruf Hesaplayıcısı',
    description: 'Site ve tesis çatılarında Güneş Enerjisi Santrali (GES) ve LED otomasyonu ile sağlanacak yıllık elektrik ve aidat tasarrufu simülatörü.',
    provider: {
      '@type': 'Organization',
      name: 'Alo Yönetim Tesis Yönetimi A.Ş.'
    }
  };

  return (
    <div className="my-12 bg-gradient-to-br from-slate-900 via-[#10221c] to-slate-950 text-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-emerald-500/30 relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">solar_power</span>
              Sıfır Karbon & Yeşil Tesis İnovasyonu
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">
            Çatı GES & Yeşil Bina Tasarruf Simülatörü
          </h3>
          <p className="text-sm text-slate-300 font-light mt-1">
            Sitenizin çatı alanını ve daire sayısını girerek ortak elektrik faturanızdaki yıllık tasarrufu hesaplayın.
          </p>
        </div>

        <Link
          href="/kurumsal/surdurulebilirlik"
          className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-xs font-bold text-white flex items-center gap-2 transition-all shrink-0 self-start md:self-auto"
        >
          <span>GES Proje Detayları</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </Link>
      </div>

      {/* Grid: Inputs & Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Çatı Alanı */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-200">
                Kullanılabilir Çatı Alanı (m²)
              </label>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-sm font-extrabold">
                {roofAreaM2} m²
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={2500}
              step={50}
              value={roofAreaM2}
              onChange={(e) => setRoofAreaM2(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Daire Sayısı */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-200">
                Toplam Bağımsız Bölüm (Daire)
              </label>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-sm font-extrabold">
                {totalUnits} Daire
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={300}
              step={5}
              value={totalUnits}
              onChange={(e) => setTotalUnits(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setHasLedRetrofit(!hasLedRetrofit)}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                hasLedRetrofit
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">lightbulb</span>
              <div className="text-xs">
                <span className="block font-bold">Akıllı LED & Sensör</span>
                <span className="text-[10px] opacity-80">%65 Aydınlatma Tasarrufu</span>
              </div>
            </button>

            <button
              onClick={() => setHasRainwaterHarvest(!hasRainwaterHarvest)}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                hasRainwaterHarvest
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">water_drop</span>
              <div className="text-xs">
                <span className="block font-bold">Yağmur Suyu Depolama</span>
                <span className="text-[10px] opacity-80">%40 Peyzaj Sulama Tasarrufu</span>
              </div>
            </button>
          </div>
        </div>

        {/* Results Showcase Card */}
        <div className="lg:col-span-5 bg-black/40 border border-emerald-500/30 rounded-3xl p-6 md:p-8 space-y-6">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Yıllık Yeşil Enerji & Bütçe Kazanımı
          </span>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Site Ortak Elektrik Tasarrufu:</span>
            <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight">
              ₺{totalAnnualEcoSavingsTL.toLocaleString()}{' '}
              <span className="text-sm font-normal text-slate-400">/ yıl</span>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 block">Daire Başı Aylık Düşüş:</span>
              <strong className="text-lg text-white font-extrabold">
                -₺{totalPerUnitMonthlySavingsTL.toLocaleString()} / ay
              </strong>
            </div>

            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 block">Yıllık Güneş Enerjisi:</span>
              <strong className="text-lg text-emerald-300 font-extrabold">
                {solarGenerationKWh.toLocaleString()} kWh
              </strong>
            </div>
          </div>

          {/* Eco Impact Badges */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-base">park</span>
              <span><strong>{treesEquivalent}</strong> Ağaç Dikimine Eşdeğer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-400 text-base">cloud_done</span>
              <span><strong>{co2OffsetTonnes}</strong> Ton CO₂ Engellendi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
