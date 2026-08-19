"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';

interface CleaningScheduleGeneratorSeoProps {
  districtName?: string;
  className?: string;
}

export default function CleaningScheduleGeneratorSeo({
  districtName = "İstanbul",
  className = ""
}: CleaningScheduleGeneratorSeoProps) {
  const [blockCount, setBlockCount] = useState<number>(2);
  const [floorCount, setFloorCount] = useState<number>(8);
  const [unitCount, setUnitCount] = useState<number>(40);
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [hasParking, setHasParking] = useState<boolean>(true);
  const [hasPoolFitness, setHasPoolFitness] = useState<boolean>(false);
  const [hasGarbageChute, setHasGarbageChute] = useState<boolean>(true);

  const [copied, setCopied] = useState<boolean>(false);

  // Hesaplanmış Tahmini Günlük/Haftalık Rutin
  const dailyTasks = [
    `${blockCount} Blok Girişleri, Rüzgarlıklar ve Paspas Alanlarının Süpürülüp Paspaslanması`,
    hasElevator ? 'Asansör Kabin İçi Aynaları, Butonları ve Paslanmaz Zeminlerin Antibakteriyel Dezenfeksiyonu' : null,
    `${unitCount} Dairenin Kat Koridorları ve Çöp Toplama Operasyonu (Sabah 08:30 / Akşam 19:30)`,
    'Nizamiye / Güvenlik Kulübesi ve Ana Yaya Giriş Yollarının Temizliği',
    'Ortak Alan Çöp Kutularının Boşaltılması ve Yeni Hijyenik Poşet Takılması'
  ].filter(Boolean) as string[];

  const weeklyTasks = [
    `${floorCount * blockCount} Kat Merdivenlerinin ve Yangın Kaçış Merdivenlerinin Detaylı Yıkanması/Silinmesi`,
    'Tırabzan Korkulukları, Yangın Dolapları ve Elektrik Sayaç Panolarının Nemli Bezle Tozunun Alınması',
    hasParking ? 'Kapalı Otopark Zeminlerinin Binicili Otomatla Süpürülüp Yıkanması' : null,
    hasPoolFitness ? 'Fitness Salonu Aletleri, Duşlar ve Havuz Çevresinin Klor/Antifungal Hijyeni' : null,
    hasGarbageChute ? 'Çöp Şaftı ve Ana Konteyner Odasının Basınçlı Sıcak Suyla Yıkanması ve Koku Önleyici İlaçlama' : null,
    'Sığınak ve Tesisat Odalarının Süpürülmesi'
  ].filter(Boolean) as string[];

  const monthlyTasks = [
    'Tüm Blokların Dış Giriş Camlarının ve Zemin Kat Vitrinlerinin Çekçekle Yıkanması',
    'T.C. Sağlık Bakanlığı Onaylı Biyosidal Ürünlerle Kemirgen ve Haşere İlaçlaması (ULV Sistemi)',
    'Çöp Odası ve Mazgalların Dezenfeksiyonu & Kireçlenmesi',
    'Su Deposu ve Hidrofor Dairesi Hijyenik Yüzey Temizliği'
  ];

  const fullScheduleText = `=== ALO YÖNETİM ${districtName.toUpperCase()} SİTE TEMİZLİK & HİJYEN ÇİZELGESİ ===
Kapsam: ${blockCount} Blok | ${floorCount} Kat | ${unitCount} Daire | ${districtName}

[GÜNLÜK RUTİN]
${dailyTasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

[HAFTALIK RUTİN]
${weeklyTasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

[AYLIK & PERİYODİK HİJYEN STANDARDI]
${monthlyTasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

* TSE HYB Hizmet Yeterlilik Belgesi ve Sağlık Bakanlığı Biyosidal İlaçlama Yönetmeliği Esas Alınmıştır.
* Alo Yönetim Kurumsal Tesis & Site Temizlik Hizmetleri: 0216 550 48 48`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullScheduleText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Schema.org HowTo JSON-LD
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${districtName} Site ve Apartman Profesyonel Temizlik & Hijyen Planı`,
    description: `${districtName} genelindeki apartman, rezidans ve siteler için kat koridorları, asansör, otopark ve çöp şaftı periyodik temizlik standardı.`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Günlük Blok ve Asansör Hijyeni',
        text: dailyTasks.join(', ')
      },
      {
        '@type': 'HowToStep',
        name: 'Haftalık Kat Merdiveni ve Otopark Yıkama',
        text: weeklyTasks.join(', ')
      },
      {
        '@type': 'HowToStep',
        name: 'Aylık Biyosidal İlaçlama ve Detaylı Sterilizasyon',
        text: monthlyTasks.join(', ')
      }
    ]
  };

  return (
    <section className={`my-10 bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-3xl p-6 sm:p-10 shadow-sm ${className}`}>
      <JsonLd data={howToSchema} />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">cleaning_services</span>
          TSE HYB Onaylı Hijyen Standartları Oluşturucu
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          2026 Mevzuat Uyumu
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mb-3">
        {districtName} Site & Apartman Temizlik Çizelgesi Hesaplayıcı
      </h3>
      <p className="text-sm sm:text-base text-[var(--color-secondary)] max-w-3xl leading-relaxed mb-8">
        Sitenizin blok, kat ve daire parametrelerini seçin; 
        <strong> Günlük, Haftalık ve Aylık resmi temizlik görev çizelgesini</strong> anında oluşturup yönetim panolarınıza asın.
      </p>

      {/* Parametre Girişleri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-8">
        <div>
          <label className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
            Blok Sayısı
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBlockCount((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              -
            </button>
            <span className="font-extrabold text-base text-[var(--color-primary)] px-2">
              {blockCount} Blok
            </span>
            <button
              onClick={() => setBlockCount((p) => Math.min(20, p + 1))}
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
            Kat Sayısı (Blok Başına)
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFloorCount((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              -
            </button>
            <span className="font-extrabold text-base text-[var(--color-primary)] px-2">
              {floorCount} Kat
            </span>
            <button
              onClick={() => setFloorCount((p) => Math.min(40, p + 1))}
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
            Toplam Daire Sayısı
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUnitCount((p) => Math.max(4, p - 10))}
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              -
            </button>
            <span className="font-extrabold text-base text-[var(--color-primary)] px-2">
              {unitCount} Daire
            </span>
            <button
              onClick={() => setUnitCount((p) => Math.min(500, p + 10))}
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--color-primary)] mb-1.5">
            Özel Alanlar
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setHasParking(!hasParking)}
              className={`px-2 py-1 rounded text-[11px] font-semibold border ${hasParking ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'}`}
            >
              Otopark
            </button>
            <button
              onClick={() => setHasElevator(!hasElevator)}
              className={`px-2 py-1 rounded text-[11px] font-semibold border ${hasElevator ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'}`}
            >
              Asansör
            </button>
            <button
              onClick={() => setHasGarbageChute(!hasGarbageChute)}
              className={`px-2 py-1 rounded text-[11px] font-semibold border ${hasGarbageChute ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'}`}
            >
              Çöp Şaftı
            </button>
            <button
              onClick={() => setHasPoolFitness(!hasPoolFitness)}
              className={`px-2 py-1 rounded text-[11px] font-semibold border ${hasPoolFitness ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'}`}
            >
              Havuz/Fitness
            </button>
          </div>
        </div>
      </div>

      {/* Görev Kartları (Günlük / Haftalık / Aylık) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Günlük */}
        <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/50 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-extrabold text-sm">
            <span className="material-symbols-outlined text-base">today</span>
            <span>GÜNLÜK GÖREVLER (Hergün)</span>
          </div>
          <ul className="flex flex-col gap-2 text-xs text-[var(--color-secondary)]">
            {dailyTasks.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Haftalık */}
        <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-extrabold text-sm">
            <span className="material-symbols-outlined text-base">calendar_view_week</span>
            <span>HAFTALIK GÖREVLER (Haftada 1-2)</span>
          </div>
          <ul className="flex flex-col gap-2 text-xs text-[var(--color-secondary)]">
            {weeklyTasks.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Aylık */}
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-extrabold text-sm">
            <span className="material-symbols-outlined text-base">pest_control</span>
            <span>AYLIK & BİYOSİDAL İLAÇLAMA</span>
          </div>
          <ul className="flex flex-col gap-2 text-xs text-[var(--color-secondary)]">
            {monthlyTasks.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Butonlar & Eylemler */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Çizelge Kopyalandı!' : 'Çizelgeyi Kopyala (Yönetim Panosu)'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/teklif-al?hizmet=temizlik&bolge=${encodeURIComponent(districtName)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md shadow-teal-600/20"
          >
            <span className="material-symbols-outlined text-sm">handshake</span>
            <span>{districtName} İçin Profesyonel Personel & Temizlik Teklifi</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
