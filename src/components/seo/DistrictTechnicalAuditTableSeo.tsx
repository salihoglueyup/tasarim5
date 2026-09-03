"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

interface DistrictTechnicalAuditTableSeoProps {
  districtName: string;
  districtSlug: string;
  population: number;
  neighborhoods: string[];
  localNeeds: string[];
  className?: string;
}

export default function DistrictTechnicalAuditTableSeo({
  districtName,
  districtSlug,
  population,
  neighborhoods,
  localNeeds,
  className = ""
}: DistrictTechnicalAuditTableSeoProps) {
  const [activeTab, setActiveTab] = useState<'asansor' | 'elektrik' | 'mekanik'>('asansor');

  const sampleNeighborhoods = neighborhoods.slice(0, 4).join(', ');

  const auditFeatures = {
    asansor: [
      {
        item: "Asansör Aylık Bakım & Yeşil Etiket Koordinasyonu",
        standard: "T.C. Sanayi ve Teknoloji Bakanlığı & A Tipi Muayene Kuruluşu",
        districtSpec: `${districtName} genelinde aylık yağlama, halat/fren testi ve yıllık etiket revizyonu.`,
        status: "Yasal Zorunluluk"
      },
      {
        item: "7/24 Asansörde Kalma Acil Kurtarma Masası",
        standard: "TSE EN 81-20/50 Standartlarına Uygun Operasyon",
        districtSpec: `${sampleNeighborhoods} lokasyonlarına en geç 30-45 dakikada yerinde müdahale.`,
        status: "SLA Garantili"
      },
      {
        item: "Dijital Ekipman Karnesi & Tescil Defteri",
        standard: "QR Kodlu Anlık Bakım Kaydı ve Parça Değişim Geçmişi",
        districtSpec: `Site yönetim kurulu denetim raporlarına tek tıkla indirilebilir dijital arşiv.`,
        status: "Şeffaf Denetim"
      }
    ],
    elektrik: [
      {
        item: "Kompanzasyon Panosu & Reaktif Ceza Koruması",
        standard: "BEDAŞ / AYEDAŞ %20 Endüktif & %15 Kapasitif Limit Takibi",
        districtSpec: `${districtName} sitelerinde reaktif güç cezalarını %100 engelleyen haftalık sayaç okuma.`,
        status: "Sıfır Ceza"
      },
      {
        item: "Jeneratör ATS & Yük Testi Protokolü",
        standard: "Yangın Yönetmeliği Madde 70 & TSE ISO 8528",
        districtSpec: `Haftalık boşta, aylık yükte çalıştırma; akü, mazot filtresi ve karter ısıtıcı kontrolü.`,
        status: "Kesintisiz Güç"
      },
      {
        item: "EMO Onaylı Topraklama & Paratoner Testi",
        standard: "Elektrik Mühendisleri Odası (EMO) Yıllık Kalibrasyonlu Ölçüm",
        districtSpec: `Ana pano topraklama direnci (max 2 Ohm) ve yıldırımdan korunma test raporlaması.`,
        status: "Yıllık Onay"
      }
    ],
    mekanik: [
      {
        item: "Yangın Hidrantı, Pompa & Sprinkler Testi",
        standard: "Binaların Yangından Korunması Hakkında Yönetmelik",
        districtSpec: `Yangın pompalarının debi ve basınç testleri, jokey pompa basınç ayarı ve sprinkler kontrolleri.`,
        status: "Can Güvenliği"
      },
      {
        item: "Frekans Kontrollü Hidrofor & Su Deposu",
        standard: "İnsani Tüketim Amaçlı Sular Yönetmeliği & TSE",
        districtSpec: `${districtName}'de basınç dalgalanmasını önleyen hidrofor ayarı ve 6 aylık depo dezenfeksiyonu.`,
        status: "Hijyenik Su"
      },
      {
        item: "Merkezi Kazan & Brülör Baca Emisyonu",
        standard: "5627 Enerji Verimliliği Kanunu & Çevre Mevzuatı",
        districtSpec: `Kazan dairesi baca gazı analizi, genleşme tankı azot basıncı ve sirkülasyon pompası bakımı.`,
        status: "Enerji Tasarrufu"
      }
    ]
  };

  const currentList = auditFeatures[activeTab];

  // Schema.org Table JSON-LD
  const tableSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: `${districtName} Bina & Site Teknik Bakım, Asansör ve Enerji Denetim Standartları`,
    description: `${districtName} ilçesinde siteler ve tesisler için zorunlu teknik bakım, asansör yeşil etiket, jeneratör ve kompanzasyon standartları matrisi.`
  };

  return (
    <div className={`my-8 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 sm:p-8 shadow-sm ${className}`}>
      <JsonLd data={tableSchema} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">engineering</span>
            {districtName} Mühendislik & Teknik Standartlar Matrisi
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
            {districtName} Siteleri İçin Yasal Teknik Bakım Kriterleri
          </h3>
        </div>

        {/* Sekme Değiştirici */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('asansor')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'asansor'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            Asansör & Taşıma
          </button>
          <button
            onClick={() => setActiveTab('elektrik')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'elektrik'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            Elektrik & Jeneratör
          </button>
          <button
            onClick={() => setActiveTab('mekanik')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'mekanik'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            Mekanik & Yangın
          </button>
        </div>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4">Teknik Denetim Maddesi</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">Mevzuat & Standart</th>
              <th className="py-3.5 px-4">{districtName}&apos;ye Özel Uygulama</th>
              <th className="py-3.5 px-4 text-right">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            {currentList.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4 font-semibold text-[var(--color-primary)]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500 text-base shrink-0" aria-hidden="true">check_circle</span>
                    <span>{row.item}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-xs text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                  {row.standard}
                </td>
                <td className="py-4 px-4 text-xs sm:text-sm text-[var(--color-secondary)]">
                  {row.districtSpec}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alt Bilgi & CTA */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          * {districtName} bölgesindeki {localNeeds[0] || 'teknik bakım ve altyapı'} ihtiyaçları TMMOB Makina & Elektrik Mühendisleri Odası yönergeleriyle planlanır.
        </p>
        <Link
          href={`/teklif-al?hizmet=teknik-bakim&bolge=${encodeURIComponent(districtName)}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 shrink-0"
        >
          <span>{districtName} İçin Teknik Bakım Teklifi Al</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
