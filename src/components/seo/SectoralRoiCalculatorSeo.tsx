"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

export type SectorType = 'rezidans' | 'avm' | 'sanayi' | 'toplukonut';

export default function SectoralRoiCalculatorSeo() {
  const [selectedSector, setSelectedSector] = useState<SectorType>('rezidans');
  const [sizeScale, setSizeScale] = useState<number>(1); // 1x, 1.5x, 2x

  const sectorConfigs = {
    rezidans: {
      title: 'Lüks Rezidans & Karma Kule',
      unitLabel: '150 - 300 Bağımsız Bölüm',
      traditionalAnnualCost: 2850000,
      aloAnnualCost: 2160000,
      energySavingPct: '%28',
      collectionRate: '%99.2',
      personnelCoverage: '7/24 Özel Güvenlik, Resepsiyon, Teknik, Havuz',
      description: 'Konsiyerj, vale, yangın otomasyonu ve bina sakinlerine VIP mobil destek çözümü.'
    },
    avm: {
      title: 'AVM & Ticari Alışveriş Merkezi',
      unitLabel: '60 - 150 Mağaza / 40.000 m²',
      traditionalAnnualCost: 5200000,
      aloAnnualCost: 3950000,
      energySavingPct: '%32',
      collectionRate: '%98.8',
      personnelCoverage: 'Özel Güvenlik, Gece Temizliği, İklimlendirme (HVAC)',
      description: 'Ziyaretçi yoğunluk yönetimi, ortak gider paylaşım projesi ve periyodik soğutma kuleleri bakımı.'
    },
    sanayi: {
      title: 'Sanayi Sitesi & Lojistik Depolama',
      unitLabel: '20 - 80 Fabrika / 60.000 m²',
      traditionalAnnualCost: 3600000,
      aloAnnualCost: 2750000,
      energySavingPct: '%25',
      collectionRate: '%97.5',
      personnelCoverage: 'Devriye Güvenliği, Ağır Araç PTS, Trafo Bakımı',
      description: 'Trafo merkezleri, yangın hidrant hatları ve ağır yük zemin temizliği yönetimi.'
    },
    toplukonut: {
      title: 'Toplu Konut & Uydu Kent Yerleşkesi',
      unitLabel: '400 - 1.200 Konut / 8-15 Blok',
      traditionalAnnualCost: 4100000,
      aloAnnualCost: 3100000,
      energySavingPct: '%30',
      collectionRate: '%98.5',
      personnelCoverage: 'Nizamiye Güvenliği, Blok Görevlileri, Peyzaj Sulama',
      description: 'Geniş açık yeşil alanlar, çocuk parkları, blok temizlik personelleri ve KMK aidat takibi.'
    }
  };

  const current = sectorConfigs[selectedSector];
  const annualSaving = (current.traditionalAnnualCost - current.aloAnnualCost) * sizeScale;
  const threeYearSaving = annualSaving * 3;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${current.title} 3 Yıllık İşletme Bütçesi ve ROI Tasarruf Simülatörü`,
    description: 'Rezidans, AVM, Sanayi ve Toplu Konut tesisleri için geleneksel yönetim ile Alo Yönetim arasındaki 3 yıllık bütçe tasarruf analizi.',
    provider: {
      '@type': 'Organization',
      name: 'Alo Yönetim',
      legalName: 'Alo Yönetim ve Organizasyon A.Ş.'
    }
  };

  return (
    <div className="my-12 bg-[var(--color-surface)] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[var(--color-outline)]/60 relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">trending_up</span>
              3 Yıllık Sektörel ROI & Tasarruf Matrisi
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
            Tesis Tipi Bazlı Bütçe Tasarruf Simülatörü
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
            Tesisinizin türünü seçerek Alo Yönetim entegre modelinde 3 yılda ne kadar bütçe tasarrufu sağlayacağınızı görün.
          </p>
        </div>

        {/* Sector Selector Tabs */}
        <div className="flex flex-wrap bg-[var(--color-surface-variant)] p-1.5 rounded-2xl border border-[var(--color-outline)]/60 shrink-0 gap-1">
          <button
            onClick={() => setSelectedSector('rezidans')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSector === 'rezidans'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-tertiary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Rezidans
          </button>
          <button
            onClick={() => setSelectedSector('avm')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSector === 'avm'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-tertiary)] hover:text-[var(--color-primary)]'
            }`}
          >
            AVM
          </button>
          <button
            onClick={() => setSelectedSector('sanayi')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSector === 'sanayi'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-tertiary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Sanayi / Depo
          </button>
          <button
            onClick={() => setSelectedSector('toplukonut')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSector === 'toplukonut'
                ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-tertiary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Toplu Konut
          </button>
        </div>
      </div>

      {/* Grid: Metrics & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Summary & KPI */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-[var(--color-primary)]">{current.title}</h4>
              <span className="text-xs text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full font-semibold">
                {current.unitLabel}
              </span>
            </div>
            <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
              {current.description}
            </p>
            <div className="pt-2 text-xs text-[var(--color-secondary)] font-mono">
              Kapsam: {current.personnelCoverage}
            </div>
          </div>

          {/* Key SLA Indicators */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-[var(--color-secondary)] block">Aidat Tahsilat Başarısı</span>
              <strong className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{current.collectionRate}</strong>
            </div>

            <div className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-[var(--color-secondary)] block">Ortak Enerji Tasarrufu</span>
              <strong className="text-2xl font-black text-blue-600 dark:text-blue-400">{current.energySavingPct}</strong>
            </div>
          </div>
        </div>

        {/* Right Side: 3-Year Saving Calculation */}
        <div className="lg:col-span-5 bg-[var(--color-surface-variant)] border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6">
          <span className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase block">
            3 Yıllık Net Bütçe Tasarrufu
          </span>

          <div className="space-y-1">
            <span className="text-xs text-[var(--color-secondary)]">Toplam Geri Kazanılan Kaynak:</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              ₺{threeYearSaving.toLocaleString()}
            </div>
            <span className="text-xs text-[var(--color-secondary)] block">
              (Yıllık ortalama: <strong>₺{annualSaving.toLocaleString()}</strong>)
            </span>
          </div>

          <hr className="border-[var(--color-outline)]/40" />

          <div className="space-y-2 text-xs text-[var(--color-secondary)]">
            <div className="flex justify-between">
              <span>Geleneksel Model Maliyeti:</span>
              <span className="text-rose-500 font-semibold line-through">₺{(current.traditionalAnnualCost * sizeScale).toLocaleString()} / yıl</span>
            </div>
            <div className="flex justify-between">
              <span>Alo Yönetim ile Maliyet:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">₺{(current.aloAnnualCost * sizeScale).toLocaleString()} / yıl</span>
            </div>
          </div>

          <Link
            href="/teklif-al"
            className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-102"
          >
            <span>{current.title} İçin Resmi Teklif İste</span>
            <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
