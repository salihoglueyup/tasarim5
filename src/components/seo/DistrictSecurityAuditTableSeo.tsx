"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

interface DistrictSecurityAuditTableSeoProps {
  districtName: string;
  districtSlug: string;
  population: number;
  neighborhoods: string[];
  localNeeds: string[];
  className?: string;
}

export default function DistrictSecurityAuditTableSeo({
  districtName,
  districtSlug,
  population,
  neighborhoods,
  localNeeds,
  className = ""
}: DistrictSecurityAuditTableSeoProps) {
  const [activeTab, setActiveTab] = useState<'fiziki' | 'elektronik' | 'hukuki'>('fiziki');

  const formattedPop = new Intl.NumberFormat('tr-TR').format(population);
  const sampleNeighborhoods = neighborhoods.slice(0, 4).join(', ');

  const auditFeatures = {
    fiziki: [
      {
        item: "5188 Belgeli Üniformalı Güvenlik Görevlisi",
        standard: "T.C. İçişleri Bakanlığı ÖGİ Kimlik Kartlı & Adli Sicil Taramalı",
        districtSpec: `${districtName} genelinde 8 ve 12 saatlik vardiya rotasyonu, 7/24 sabit nöbet ve yaya devriye.`,
        status: "Zorunlu"
      },
      {
        item: "Ziyaretçi & Kurye Kimlik Kontrolü",
        standard: "KVKK Uyumlu Dijital Ziyaretçi Kayıt Sistemi",
        districtSpec: `${sampleNeighborhoods} sitelerinde daire sakini mobil onayı olmadan blok girişine izin verilmez.`,
        status: "Standart"
      },
      {
        item: "RFID Noktalı Devriye Tur Kontrolü",
        standard: "Bulut Tabanlı Gerçek Zamanlı GPS/RFID Loglama",
        districtSpec: `Blok çevreleri, yangın merdivenleri ve otopark alanlarında saatlik doğrulanabilir devriye turu.`,
        status: "Aktif"
      }
    ],
    elektronik: [
      {
        item: "Yapay Zeka Destekli PTS (Plaka Tanıma)",
        standard: "Giriş-Çıkış Bariyer Otomasyonu & Misafir Araç Limiti",
        districtSpec: `${districtName} sakinlerinin araçları otomatik tanınır, yabancı ve kaçak parklar anında engellenir.`,
        status: "Akıllı Sistem"
      },
      {
        item: "4K Gece Görüşlü Çevre Güvenlik CCTV",
        standard: "H.265+ Sıkıştırma, 30 Günlük Yasal Kayıt & Kör Noktasız",
        districtSpec: `Site dış çiti, çocuk oyun parkı ve bina girişleri 7/24 izlenir; kayıtlar KVKK 10. maddeye uygundur.`,
        status: "Kesintisiz"
      },
      {
        item: "Kartlı & Biyometrik Yaya Turnikesi",
        standard: "Mifare Şifreli Giriş & Yangın Anında Otomatik Açılma",
        districtSpec: `Toplu taşıma ve ana caddeye yakın ${districtName} sitelerinde yetkisiz geçişler %100 filtrelenir.`,
        status: "Yüksek Emniyet"
      }
    ],
    hukuki: [
      {
        item: "İstanbul Valiliği 5188 Özel Güvenlik İzni",
        standard: "Özel Güvenlik Komisyonu Kararı & Ruhsat Harcı",
        districtSpec: `Alo Yönetim hukuk departmanı ${districtName} İlçe Emniyet ve Valilik başvuru sürecini 15 günde tamamlar.`,
        status: "Resmi İzin"
      },
      {
        item: "Özel Güvenlik Zorunlu Mali Sorumluluk Sigortası",
        standard: "Hazine ve Maliye Bakanlığı Teminat Limitleri",
        districtSpec: `Personelin görev esnasındaki tüm 3. şahıs riskleri ve site demirbaşları tam poliçe güvencesindedir.`,
        status: "Garantili"
      },
      {
        item: "Kat Malikleri Kurulu Karar Defteri Metni",
        standard: "634 Sayılı KMK Madde 34 Uyumlu Şablon",
        districtSpec: `Genel kurulda güvenliğe geçiş için gereken karar metni hazır teslim edilir, yöneticinin hukuki riski sıfırlanır.`,
        status: "Hazır Şablon"
      }
    ]
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: `${districtName} 5188 Özel Güvenlik & Tesis Emniyeti Denetim Standartları`,
    about: `${districtName} bölgesindeki site ve apartmanlar için 5188 sayılı kanun fiziki, elektronik ve hukuki güvenlik gereksinimleri.`,
    description: `${districtName} (~${formattedPop} nüfus) genelinde 5188 belgeli güvenlik, PTS plaka tanıma, CCTV ve Valilik izin süreçleri tablosu.`
  };

  return (
    <div className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-6 md:p-10 flex flex-col gap-8 shadow-lg ${className}`}>
      <JsonLd data={schema} />

      {/* Başlık & Bölge Özeti */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--color-outline)]/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">shield</span>
            {districtName} 5188 Güvenlik & Emniyet Matrisi
          </div>
          <h3 className="text-xl md:text-2xl font-black text-[var(--color-primary)]">
            {districtName}&apos;de Siteniz İçin Standart Güvenlik Denetim Protokolü
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
            İlçe Nüfusu: <strong>{formattedPop}</strong> · Hizmet Verilen Başlıca Mahalleler: <strong>{sampleNeighborhoods}</strong>
          </p>
        </div>

        <Link
          href={`/teklif-al?hizmet=guvenlik&bolge=${encodeURIComponent(districtName)}`}
          className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm shrink-0 shadow-md"
        >
          <span className="material-symbols-outlined text-lg">fact_check</span>
          {districtName} Keşif Raporu İste
        </Link>
      </div>

      {/* Tab Seçiciler */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--color-outline)]/40 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('fiziki')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'fiziki'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
              : 'bg-transparent text-[var(--color-secondary)] hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-lg">badge</span>
          1. Fiziki Güvenlik & Personel
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('elektronik')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'elektronik'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
              : 'bg-transparent text-[var(--color-secondary)] hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-lg">videocam</span>
          2. Elektronik Emniyet (PTS & CCTV)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('hukuki')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'hukuki'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
              : 'bg-transparent text-[var(--color-secondary)] hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-lg">gavel</span>
          3. 5188 Valilik İzni & Hukuk
        </button>
      </div>

      {/* Tablo İçeriği */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-outline)]/60 text-xs uppercase font-extrabold text-[var(--color-secondary)]">
              <th className="py-3 px-4">Kontrol Maddesi</th>
              <th className="py-3 px-4">Yasal / Teknik Standart</th>
              <th className="py-3 px-4">{districtName}&apos;ye Özel Uygulama</th>
              <th className="py-3 px-4 text-center">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-outline)]/40 text-sm">
            {auditFeatures[activeTab].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-500/5 transition-colors">
                <td className="py-4 px-4 font-bold text-[var(--color-primary)]">
                  {row.item}
                </td>
                <td className="py-4 px-4 text-[var(--color-secondary)] font-light">
                  {row.standard}
                </td>
                <td className="py-4 px-4 text-[var(--color-secondary)]">
                  {row.districtSpec}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alt Bilgilendirme & Hukuki Çağrı */}
      <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl shrink-0">verified_user</span>
          <span>
            {districtName} sınırları içerisindeki tüm projelerimizde <strong>5188 Sayılı Kanun</strong> ve <strong>T.C. İstanbul Valiliği</strong> onaylı izin prosedürleri eksiksiz yürütülmektedir.
          </span>
        </div>
        <Link
          href="/api/security/legal-templates"
          target="_blank"
          className="inline-flex items-center gap-1.5 font-bold text-slate-900 dark:text-white hover:underline shrink-0"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          5188 Karar Defteri Şablonunu Al
        </Link>
      </div>
    </div>
  );
}
