"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';
import { BASE_URL } from '@/lib/constants';

interface FacilityManagementCalculatorSeoProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * İnteraktif Aidat & Tesis Bütçe Hesaplayıcı Şeması (FacilityManagementCalculatorSeo)
 * 
 * Kullanıcıların daire sayısı ve hizmet türüne göre anında yönetim bütçesi simüle etmesini sağlar.
 * Google'a `WebApplication` ve `SoftwareApplication` şeması basarak SERP'te interaktif araç
 * rozeti kazandırır.
 */
export default function FacilityManagementCalculatorSeo({
  title = "Hızlı Aidat & Yönetim Maliyeti Hesaplayıcı",
  subtitle = "Apartman veya sitenizin ölçeğine göre anında tahmini yönetim ve personel maliyetini hesaplayın.",
  className = ""
}: FacilityManagementCalculatorSeoProps) {
  const [units, setUnits] = useState(30);
  const [hasSecurity, setHasSecurity] = useState(true);
  const [hasCleaning, setHasCleaning] = useState(true);
  const [hasTechnical, setHasTechnical] = useState(true);

  // Basit ortalama maliyet simülasyonu
  const baseManagement = units * 120;
  const securityCost = hasSecurity ? (units > 50 ? 45000 : 28000) : 0;
  const cleaningCost = hasCleaning ? (units > 50 ? 16000 : 9000) : 0;
  const technicalCost = hasTechnical ? (units > 50 ? 12000 : 6500) : 0;

  const totalEstimate = baseManagement + securityCost + cleaningCost + technicalCost;
  const perUnitEstimate = Math.round(totalEstimate / Math.max(units, 1));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Alo Yönetim Aidat ve Tesis Maliyeti Hesaplama Aracı',
    url: `${BASE_URL}/hesaplayici`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'Apartman, site ve plazalar için Kat Mülkiyeti Kanunu standartlarında işletme projesi ve aidat payı hesaplama uygulaması.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'TRY',
      description: 'Ücretsiz Çevrimiçi Hesaplama Aracı'
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-50/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm my-8 ${className}`}
      >
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            İnteraktif Web Uygulaması
          </span>
          <h3 className="text-xl md:text-2xl font-black text-[var(--color-primary)] mt-1">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-[var(--color-secondary)] font-light mt-1">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Giriş Parametreleri */}
          <div className="space-y-5 bg-white dark:bg-zinc-800/60 p-5 rounded-2xl border border-slate-100 dark:border-white/5">
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-700 dark:text-slate-200">Bağımsız Bölüm (Daire) Sayısı:</span>
                <span className="text-brand-600 dark:text-brand-400 text-sm font-black">{units} Daire</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10 Daire</span>
                <span>100 Daire</span>
                <span>200+ Daire</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">
                İhtiyaç Duyulan Hizmetler:
              </span>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSecurity}
                  onChange={(e) => setHasSecurity(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
                />
                <span>5188 Sayılı Kanun Kapsamında Özel Güvenlik</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCleaning}
                  onChange={(e) => setHasCleaning(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
                />
                <span>Rutin Temizlik & Kat Hizmetleri</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTechnical}
                  onChange={(e) => setHasTechnical(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
                />
                <span>7/24 Acil Teknik Bakım & Asansör Takibi</span>
              </label>
            </div>
          </div>

          {/* Sonuç Kartı */}
          <div className="bg-gradient-to-br from-brand-600 to-indigo-700 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-brand-200 text-xs font-semibold mb-3">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">calculate</span>
                <span>Tahmini Aylık Bütçe Simülasyonu</span>
              </div>

              <div className="mb-4">
                <div className="text-xs text-brand-100">Daire Başı Ortalama Pay:</div>
                <div className="text-3xl md:text-4xl font-black mt-1">
                  ~{perUnitEstimate.toLocaleString('tr-TR')} ₺ <span className="text-xs font-light text-brand-200">/ ay</span>
                </div>
              </div>

              <div className="text-xs text-brand-100 pt-3 border-t border-white/10 space-y-1">
                <div className="flex justify-between">
                  <span>Toplam Tahmini Tesis Bütçesi:</span>
                  <span className="font-bold">~{totalEstimate.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="text-[10px] text-brand-200 opacity-80 mt-1">
                  * Kesin teklif ücretsiz yerinde keşif sonrasında hazırlanır.
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/teklif-al"
                className="w-full py-3 px-4 bg-white text-brand-900 hover:bg-brand-50 rounded-xl text-xs font-bold text-center block transition-all shadow-md"
              >
                Bu Simülasyon İçin Resmi Teklif İste
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
