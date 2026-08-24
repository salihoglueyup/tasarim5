"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface DistrictFacilityAuditTableSeoProps {
  districtName: string;
  districtSlug: string;
  population: number;
  neighborhoods: string[];
  localNeeds: string[];
  avgDuesM2?: number;
  aloDuesM2?: number;
  savingsRate?: number;
  className?: string;
}

export default function DistrictFacilityAuditTableSeo({
  districtName,
  districtSlug,
  population,
  neighborhoods,
  localNeeds,
  avgDuesM2 = 45,
  aloDuesM2 = 33,
  savingsRate = 25,
  className = ""
}: DistrictFacilityAuditTableSeoProps) {
  const [activeTab, setActiveTab] = useState<'yonetim' | 'teknik-guvenlik' | 'tasarruf'>('yonetim');

  const formattedPop = new Intl.NumberFormat('tr-TR').format(population);
  const sampleNeighborhoods = neighborhoods.slice(0, 4).join(', ');

  const auditFeatures = {
    yonetim: [
      {
        item: "KMK m.37 İşletme Projesi & Bütçe Yönetimi",
        standard: "Yıllık Gelir-Gider Tahmini & Şeffaf Avans Paylaştırma",
        districtSpec: `${districtName} genelinde kat malikleri genel kuruluna sunulacak resmi işletme projesi ve bağımsız denetim raporu hazırlanır.`,
        status: "Yasal Zorunluluk"
      },
      {
        item: "Dijital Aidat Tahsilatı & Otomatik SMS Hatırlatma",
        standard: "Kredi Kartı / Sanal POS / Havale Anlık Eşleşme & %99.2 Tahsilat",
        districtSpec: `${sampleNeighborhoods} sitelerinde aidat gecikmeleri %0'a indirilir; vadesi geçen borçlara yasal %5 gecikme işletilir.`,
        status: "Maksimum Verim"
      },
      {
        item: "Resmi Genel Kurul & Divan Yönetim Danışmanlığı",
        standard: "Hukukçu Eşliğinde Çağrı Mektubu, Hazirun ve Karar Defteri Tasdiki",
        districtSpec: `Kat mülkiyeti kanununa tam uygun toplantı yönetimi ile iptal davası riski %100 bertaraf edilir.`,
        status: "Hukuki Güvence"
      }
    ],
    'teknik-guvenlik': [
      {
        item: "5188 Lisanslı Özel Güvenlik & 7/24 Devriye",
        standard: "Valilik İzinli Üniformalı Personel & PTS Plaka Tanıma",
        districtSpec: `${districtName} sitelerinde yetkisiz araç/yaya girişleri engellenir; 30 günlük KVKK uyumlu CCTV kamera arşivi tutulur.`,
        status: "Üst Düzey Emniyet"
      },
      {
        item: "Asansör, Jeneratör & Hidrofor 7/24 Mobil Servis",
        standard: "Yıllık Yeşil Etiket Muayenesi & Periyodik Teknik Muayene",
        districtSpec: `Kritik mekanik arızalara 45 dakika içinde gezici mühendislik ekibimizce müdahale edilir; kesinti riski sıfırlanır.`,
        status: "Kesintisiz Altyapı"
      },
      {
        item: "TSE 13811 Hijyen & Biyosidal Ortak Alan İlaçlaması",
        standard: "Sağlık Bakanlığı Onaylı Ürünler & Endüstriyel Zemin Otomatları",
        districtSpec: `Blok koridorları, otoparklar ve sosyal tesisler düzenli dezenfekte edilir; fotoğraflı hijyen karnesi sunulur.`,
        status: "Sertifikalı Hijyen"
      }
    ],
    tasarruf: [
      {
        item: "Toplu Satın Alma ile %25-30 İşletme Tasarrufu",
        standard: "Elektrik, Doğalgaz, Kimyasal ve Asansör Bakım İndirimi",
        districtSpec: `${districtName}'deki yüzlerce projelik portföy hacmimiz sayesinde ortak gider kalemlerinde toptan fiyat avantajı sağlanır.`,
        status: "Net Tasarruf"
      },
      {
        item: "Reaktif Güç Cezası Engelleme & Enerji Optimizasyonu",
        standard: "Kompanzasyon Panosu Günlük Sayaç Takibi & LED Aydınlatma",
        districtSpec: `Elektrik faturalarına yansıyabilecek reaktif güç cezaları %100 engellenir ve ortak alan elektrik faturası düşürülür.`,
        status: "%0 Ceza Garantisi"
      },
      {
        item: "Personel Bordro, SGK & İSG Tazminat Muafiyeti",
        standard: "Tüm İş Hukuku ve Kıdem Tazminatı Sorumluluğu Şirketimizde",
        districtSpec: `Kapıcı ve temizlik personeli tazminat riskleri site bütçesine yansıtılmaz; kat malikleri hukuki güvence altına alınır.`,
        status: "Mali Güvence"
      }
    ]
  };

  return (
    <section className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 sm:p-10 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {districtName} Tesis Yönetimi & Denetim Matrisi
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]">
            {districtName} Entegre Tesis & Site Yönetim Standartları
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1 max-w-2xl">
            {districtName} ({formattedPop} nüfus) genelinde 634 sayılı KMK ve TSE standartlarında uyguladığımız kurumsal tesis işletme protokolümüz.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('yonetim')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'yonetim'
                ? 'bg-white dark:bg-zinc-800 text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Bütçe & Yönetim
          </button>
          <button
            onClick={() => setActiveTab('teknik-guvenlik')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'teknik-guvenlik'
                ? 'bg-white dark:bg-zinc-800 text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Teknik & Güvenlik
          </button>
          <button
            onClick={() => setActiveTab('tasarruf')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'tasarruf'
                ? 'bg-white dark:bg-zinc-800 text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Tasarruf & Hukuk
          </button>
        </div>
      </div>

      {/* District Dues & Facility Benchmark Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200/70 dark:border-white/5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-secondary)]">{districtName} Piyasa Ort. Aidat</div>
          <div className="text-xl font-black text-[var(--color-primary)] mt-1">₺{avgDuesM2}<span className="text-xs font-normal text-[var(--color-secondary)]"> / m²</span></div>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/30">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Alo Yönetim Optimize Aidat</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">₺{aloDuesM2}<span className="text-xs font-normal text-emerald-700/70 dark:text-emerald-300/70"> / m²</span></div>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-800/30">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">Ortalama Bütçe Tasarrufu</div>
          <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">%{savingsRate}<span className="text-xs font-normal text-blue-700/70 dark:text-blue-300/70"> Net İndirim</span></div>
        </div>
      </div>

      {/* Table Content */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10 text-xs font-black uppercase text-[var(--color-secondary)]">
              <th className="py-4 px-4">Yönetim Kalemi / Hizmet</th>
              <th className="py-4 px-4">Yasal Standart & Kalite Şartı</th>
              <th className="py-4 px-4">{districtName} Sahası Operasyon Detayı</th>
              <th className="py-4 px-4 text-right">Uyumluluk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm">
            {auditFeatures[activeTab].map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-bold text-[var(--color-primary)]">
                  {row.item}
                </td>
                <td className="py-4 px-4 text-[var(--color-secondary)]">
                  {row.standard}
                </td>
                <td className="py-4 px-4 text-xs font-light text-[var(--color-secondary)] max-w-xs">
                  {row.districtSpec}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Local Needs & Quick CTA Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[var(--color-secondary)]">
          <strong>{districtName} Yerel Öncelikleri:</strong> {localNeeds.join(', ')}.
        </div>
        <Link
          href={`/teklif-al?hizmet=tesis-yonetimi&bolge=${encodeURIComponent(districtSlug)}`}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md"
        >
          <span>{districtName} İçin Ücretsiz Keşif Alın</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
