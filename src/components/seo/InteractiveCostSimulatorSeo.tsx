"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

export default function InteractiveCostSimulatorSeo() {
  const [totalUnits, setTotalUnits] = useState<number>(40);
  const [myArsaPayi, setMyArsaPayi] = useState<number>(25); // 25 / 1000 = %2.5
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [hasSecurity, setHasSecurity] = useState<boolean>(true);
  const [hasCentralHeating, setHasCentralHeating] = useState<boolean>(false);

  // KMK Madde 20 Masraf Hesaplaması:
  // 1. Eşit Dağıtılan Masraflar (Kapıcı, Güvenlik, Temizlik): Toplam maliyet / daire sayısı
  // 2. Arsa Payına Göre Dağıtılanlar (Asansör, Kazan, Ortak Alan Sigorta, Bakım Onarım): Toplam maliyet * (Arsa Payı / 1000)

  const securityCost = hasSecurity ? totalUnits * 1100 : 0;
  const cleaningPersonelCost = totalUnits * 450;
  const equalSharedPool = securityCost + cleaningPersonelCost;
  const myEqualShare = Math.round(equalSharedPool / totalUnits);

  const elevatorCost = hasElevator ? 18000 : 0;
  const heatingCommonCost = hasCentralHeating ? 25000 : 0;
  const maintenanceReserveCost = totalUnits * 300;
  const arsaPayiPool = elevatorCost + heatingCommonCost + maintenanceReserveCost;
  const myArsaPayiShare = Math.round(arsaPayiPool * (myArsaPayi / 1000));

  const totalMyMonthlyDues = myEqualShare + myArsaPayiShare;
  const totalSiteMonthlyBudget = equalSharedPool + arsaPayiPool;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'KMK 634 Arsa Payı ve Aidat Dağıtım Simülatörü',
    description: 'Kat Mülkiyeti Kanunu Madde 20 uyarınca bağımsız bölümlere düşen yasal aidat ve işletme projesi masraf dağıtım hesaplayıcısı.',
    provider: {
      '@type': 'Organization',
      name: 'Alo Yönetim Tesis Yönetimi A.Ş.'
    }
  };

  return (
    <div className="my-12 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
              KMK Madde 20 Şeffaflık Motoru
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
            KMK Arsa Payı & İşletme Projesi Masraf Simülatörü
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-1 font-light">
            Sitenizin özelliklerini ve dairenizin arsa payını girerek yasal aidat dağılımını hesaplayın.
          </p>
        </div>

        <Link
          href="/teklif-al"
          className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 shrink-0 self-start md:self-auto shadow-md"
        >
          <span>Ücretsiz İşletme Projesi Keşfi</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </Link>
      </div>

      {/* Simulator Inputs & Result Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders & Switches */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Daire Sayısı */}
          <div className="bg-gray-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[var(--color-primary)]">
                Toplam Bağımsız Bölüm (Daire / Dükkan)
              </label>
              <span className="px-3 py-1 bg-white dark:bg-zinc-800 rounded-lg text-sm font-extrabold text-blue-600 dark:text-blue-400 shadow-xs">
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
              className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Arsa Payı */}
          <div className="bg-gray-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[var(--color-primary)]">
                Dairenizin Arsa Payı (Tapuda Yazan Oran)
              </label>
              <span className="px-3 py-1 bg-white dark:bg-zinc-800 rounded-lg text-sm font-extrabold text-blue-600 dark:text-blue-400 shadow-xs">
                {myArsaPayi} / 1000 Pay (%{(myArsaPayi / 10).toFixed(1)})
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={myArsaPayi}
              onChange={(e) => setMyArsaPayi(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Feature Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setHasSecurity(!hasSecurity)}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                hasSecurity
                  ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                  : 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-[var(--color-secondary)]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">shield</span>
              <span className="text-xs">7/24 Özel Güvenlik</span>
            </button>

            <button
              onClick={() => setHasElevator(!hasElevator)}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                hasElevator
                  ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                  : 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-[var(--color-secondary)]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">elevator</span>
              <span className="text-xs">Çift Asansör & Jeneratör</span>
            </button>

            <button
              onClick={() => setHasCentralHeating(!hasCentralHeating)}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                hasCentralHeating
                  ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                  : 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-[var(--color-secondary)]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">mode_heat</span>
              <span className="text-xs">Merkezi Payölçer</span>
            </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#162032] to-slate-950 text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-white/10 space-y-6">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            KMK Madde 20 Yasal Dağılım Özeti
          </span>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Dairenize Düşen Tahmini Aylık Aidat:</span>
            <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
              ₺{totalMyMonthlyDues.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ ay</span>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Breakdown by KMK Law */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Eşit Dağıtılan Pay (Güvenlik & Temizlik):
              </span>
              <strong className="text-white">₺{myEqualShare.toLocaleString()}</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Arsa Payı Dağıtımı (Asansör & Bakım):
              </span>
              <strong className="text-white">₺{myArsaPayiShare.toLocaleString()}</strong>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-slate-400">Toplam Site Aylık Bütçesi:</span>
              <span className="font-bold text-slate-300">₺{totalSiteMonthlyBudget.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-300 leading-relaxed">
            💡 <strong>Hukuki Not:</strong> Kat Mülkiyeti Kanunu Madde 20 gereğince, yönetim planında aksi bir hüküm yoksa kapıcı/güvenlik eşit; diğer tüm giderler arsa payına göre paylaştırılır.
          </div>
        </div>
      </div>
    </div>
  );
}
