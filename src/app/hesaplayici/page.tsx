"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hesaplayici() {
  const [units, setUnits] = useState<number>(45);
  const [blocks, setBlocks] = useState<number>(3);
  const [elevators, setElevators] = useState<number>(6);
  const [hasSecurity, setHasSecurity] = useState<boolean>(true);
  const [hasPool, setHasPool] = useState<boolean>(true);
  const [hasGreenSpace, setHasGreenSpace] = useState<boolean>(true);

  // Simple calculation logic
  const baseCostPerUnit = 350;
  const securityAddon = hasSecurity ? 450 : 0;
  const poolAddon = hasPool ? 180 : 0;
  const greenAddon = hasGreenSpace ? 120 : 0;
  const elevatorAddon = elevators * 40;

  const estimatedDuesPerUnit = Math.round(
    baseCostPerUnit + securityAddon + poolAddon + greenAddon + (elevatorAddon / Math.max(units, 1))
  );

  const totalMonthlyBudget = estimatedDuesPerUnit * units;
  const estimatedSavings = Math.round(totalMonthlyBudget * 0.22); // %22 ortalama tasarruf

  return (
    <>
      <PageHeader 
        title="Aidat & Yönetim Maliyeti Hesaplayıcı" 
        description="Sitenizin parametrelerini girin, tahmini yönetim bütçesini ve Alo Yönetim ile elde edeceğiniz tasarruf oranını anında görün." 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/50 shadow-sm flex flex-col gap-10">
            
            <h2 className="text-2xl font-bold text-[var(--color-primary)] flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 text-3xl">tune</span>
              Site Parametrelerinizi Seçin
            </h2>

            {/* Slider: Daire Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">Daire / Bağımsız Bölüm Sayısı</label>
                <span className="bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full font-bold text-lg">{units} Daire</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={500} 
                step={5}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Slider: Blok Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">Blok Sayısı</label>
                <span className="bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full font-bold text-lg">{blocks} Blok</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={30} 
                step={1}
                value={blocks}
                onChange={(e) => setBlocks(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Slider: Asansör Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">Toplam Asansör Sayısı</label>
                <span className="bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full font-bold text-lg">{elevators} Asansör</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={40} 
                step={1}
                value={elevators}
                onChange={(e) => setElevators(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <hr className="border-[var(--color-outline)]/30 my-2" />

            {/* Feature Toggles */}
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg text-[var(--color-primary)]">Tesis Olanakları</h3>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-blue-600">shield</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">7/24 Fiziki Güvenlik</div>
                    <div className="text-xs text-[var(--color-secondary)]">Vardiyalı özel güvenlik personeli</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasSecurity} 
                  onChange={(e) => setHasSecurity(e.target.checked)}
                  className="w-6 h-6 rounded accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-blue-600">pool</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">Yüzme Havuzu / Sosyal Tesis</div>
                    <div className="text-xs text-[var(--color-secondary)]">Açık/Kapalı havuz kimyasal ve motor bakımı</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasPool} 
                  onChange={(e) => setHasPool(e.target.checked)}
                  className="w-6 h-6 rounded accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-blue-600">park</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">Geniş Peyzaj & Bahçe Alanı</div>
                    <div className="text-xs text-[var(--color-secondary)]">Otomatik sulama ve bahçıvanlık hizmeti</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasGreenSpace} 
                  onChange={(e) => setHasGreenSpace(e.target.checked)}
                  className="w-6 h-6 rounded accent-blue-600 cursor-pointer"
                />
              </div>

            </div>

          </div>

          {/* Results Summary Card Sticky */}
          <div className="lg:col-span-5 sticky top-28">
            <motion.div 
              layout
              className="bg-gradient-to-br from-[var(--color-primary)] to-[#152a42] text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">calculate</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-white/10 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                  Tahmini Analiz Raporu
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-gray-300 text-sm font-light">Daire Başı Tahmini Ortalama Aidat</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold tracking-tight">₺{estimatedDuesPerUnit.toLocaleString()}</span>
                  <span className="text-gray-300 text-lg">/ ay</span>
                </div>
              </div>

              <hr className="border-white/15" />

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400">Toplam Aylık Bütçe</span>
                  <span className="text-2xl font-bold">₺{totalMonthlyBudget.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-emerald-400 font-semibold">Alo Yönetim ile Tasarruf</span>
                  <span className="text-2xl font-bold text-emerald-400">~₺{estimatedSavings.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-400 shrink-0 mt-0.5">verified</span>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Alo Yönetim şeffaf satın alma ve toplu tedarik gücü sayesinde sitelerde ortalama %20'nin üzerinde gider tasarrufu sağlar.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link 
                  href="/teklif-al"
                  className="flex-1 bg-white text-[var(--color-primary)] hover:bg-gray-100 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg text-sm"
                >
                  Resmi Teklif Al
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>

                <button 
                  onClick={() => window.print()}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-4 px-5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
                  title="Hesaplama Özetini PDF / Yazıcıya Aktar"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  <span>Raporu Yazdır</span>
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}

