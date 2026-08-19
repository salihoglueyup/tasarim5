"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

interface DistrictCleaningAuditTableSeoProps {
  districtName: string;
  districtSlug: string;
  population: number;
  neighborhoods: string[];
  localNeeds: string[];
  className?: string;
}

export default function DistrictCleaningAuditTableSeo({
  districtName,
  districtSlug,
  population,
  neighborhoods,
  localNeeds,
  className = ""
}: DistrictCleaningAuditTableSeoProps) {
  const [activeCategory, setActiveCategory] = useState<'ortak_alan' | 'dis_cephe' | 'ilaclama'>('ortak_alan');

  const sampleNeighborhoods = neighborhoods.slice(0, 4).join(', ');

  const hygieneMatrix = {
    ortak_alan: [
      {
        item: "Günlük Kat Koridoru & Blok Giriş Temizliği",
        standard: "TSE HYB 12849 Standardı & Çevre Dostu Nötr Kimyasallar",
        districtSpec: `${districtName} sitelerinde her sabah 09:00'a kadar giriş paspasları ve zeminler yıkanır.`,
        frequency: "Hergün"
      },
      {
        item: "Asansör Kabin İçi & Buton Sterilizasyonu",
        standard: "Antibakteriyel Dezenfektan & Paslanmaz Çelik Koruyucu",
        districtSpec: `${sampleNeighborhoods} binalarında temas noktaları günde en az 2 kez sterilize edilir.`,
        frequency: "Günde 2 Kez"
      },
      {
        item: "Kapalı Otopark Zemin Binicili Otomat Yıkama",
        standard: "Endüstriyel Epoksi Zemin Parlatma & Yağ Çözücü",
        districtSpec: `Otopark araç lastik izleri ve egzoz isleri basınçlı otomatlarla arındırılır.`,
        frequency: "Haftalık"
      }
    ],
    dis_cephe: [
      {
        item: "Endüstriyel Dağcı (İple Erişim) Cam Temizliği",
        standard: "IRATA & SPRAT Sertifikalı Uzman İple Erişim Teknisyenleri",
        districtSpec: `${districtName}'deki yüksek katlı kule ve rezidanslarda vinçsiz, sıfır riskli cam silimi.`,
        frequency: "Yılda 2-4 Kez"
      },
      {
        item: "Kompozit & Alüminyum Panel Cephe Yıkama",
        standard: "Saf Su (Deiyonize) ve Karbon Teleskopik Fırça Sistemi",
        districtSpec: `Kireç ve leke bırakmayan saf su teknolojisi ile bina dış yüzeyi ilk günkü parlaklığına kavuşur.`,
        frequency: "Yıllık"
      },
      {
        item: "Giriş Sundurması & Cam Kanopi Temizliği",
        standard: "İş Sağlığı ve Güvenliği (İSG) Yüksekte Çalışma Protokolü",
        districtSpec: `Blok giriş cam sundurmaları ve rüzgarlık camları lekesiz temizlenir.`,
        frequency: "Aylık"
      }
    ],
    ilaclama: [
      {
        item: "Sağlık Bakanlığı Onaylı Biyosidal Haşere İlaçlaması",
        standard: "T.C. Sağlık Bakanlığı Ruhsatlı Kokulu/Kokusuz ULV & Jel Uygulama",
        districtSpec: `${districtName} genelinde haşere, hamam böceği ve tahtakurusu yuvalanmalarına kesin çözüm.`,
        frequency: "Aylık / 3 Aylık"
      },
      {
        item: "Kemirgen & Fare Yemleme İstasyonları",
        standard: "Kilitli ve Uyarı Etiketli İstasyonlar, Çevre Güvenliği Protokolü",
        districtSpec: `Site dış çitleri, sığınak, çöp odaları ve otopark köşelerine yerleştirilip aylık kontrol edilir.`,
        frequency: "Sürekli Takip"
      },
      {
        item: "Çöp Şaftı & Konteyner Odası Dezenfeksiyonu",
        standard: "Koku Nötralize Edici Enzimatik Solüsyonlar",
        districtSpec: `Bakteri ve kötü kokuları kaynağında yok eden yüksek basınçlı sıcak su buharı.`,
        frequency: "Haftalık"
      }
    ]
  };

  const currentList = hygieneMatrix[activeCategory];

  // Schema.org Table JSON-LD
  const tableSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: `${districtName} Site ve Tesis Hijyen, Temizlik & Biyosidal Standartları`,
    description: `${districtName} ilçesinde siteler için TSE HYB uyumlu kat temizliği, dış cephe cam silimi ve Sağlık Bakanlığı onaylı ilaçlama tablosu.`
  };

  return (
    <div className={`my-8 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 sm:p-8 shadow-sm ${className}`}>
      <JsonLd data={tableSchema} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">sanitizer</span>
            {districtName} Tesis Hijyen & Temizlik Matrisi
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
            {districtName} Siteleri İçin Profesyonel Hijyen Standartları
          </h3>
        </div>

        {/* Sekme Değiştirici */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveCategory('ortak_alan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'ortak_alan'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
            }`}
          >
            Ortak Alan & Katlar
          </button>
          <button
            onClick={() => setActiveCategory('dis_cephe')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'dis_cephe'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
            }`}
          >
            Dış Cephe & Cam
          </button>
          <button
            onClick={() => setActiveCategory('ilaclama')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'ilaclama'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
            }`}
          >
            Biyosidal İlaçlama
          </button>
        </div>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4">Hijyen & Temizlik Süreci</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">Kullanılan Ekipman / Standart</th>
              <th className="py-3.5 px-4">{districtName}&apos;ye Özel Uygulama</th>
              <th className="py-3.5 px-4 text-right">Periyot</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            {currentList.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4 font-semibold text-[var(--color-primary)]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-teal-600 text-base shrink-0">check_circle</span>
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
                  <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20">
                    {row.frequency}
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
          * Personelimiz SGK ve İSG belgeli olup, kimyasallar Sağlık Bakanlığı Biyosidal Ürün Ruhsatı kapsamındadır.
        </p>
        <Link
          href={`/teklif-al?hizmet=temizlik&bolge=${encodeURIComponent(districtName)}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md shadow-teal-600/20 shrink-0"
        >
          <span>{districtName} İçin Temizlik Teklifi Al</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
