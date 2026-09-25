"use client";

import React, { useState } from 'react';

interface ComparisonItem {
  criterion: string;
  traditional: string;
  traditionalIcon: string;
  aloVision: string;
  aloVisionIcon: string;
  aloBenefit: string;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    criterion: 'Finansal Şeffaflık & Kasa Denetimi',
    traditional: 'Yılda bir kez genel kurulda dağıtılan karmaşık, kontrolsüz Excel tabloları ve elden toplanan makbuzlar.',
    traditionalIcon: 'cancel',
    aloVision: '7/24 Sakin mobil uygulamasında anlık banka ekstresi, her fatura ve makbuzun dijital aslı ve bağımsız YMM denetimi.',
    aloVisionIcon: 'check_circle',
    aloBenefit: '%100 Kuruşu Kuruşuna Açık Kasa',
  },
  {
    criterion: 'Personel Kıdem Tazminatı Güvencesi',
    traditional: 'Tazminat fonu ayrılmaz; personel ayrıldığında kat maliklerine aniden yüksek ek bütçe ve avans borcu çıkarılır.',
    traditionalIcon: 'cancel',
    aloVision: 'Her ay toplanan kıdem karşılıkları site adına açılan dokunulmaz vadeli bloke banka hesabında nemalandırılır.',
    aloVisionIcon: 'check_circle',
    aloBenefit: 'Sıfır Bütçe Şoku & Hukuki Kalkan',
  },
  {
    criterion: 'Güvenlik Kadrosu & Lisans Denetimi',
    traditional: 'Taşeron firmalardan gönderilen, sabıka ve fiziki yeterliliği belirsiz, 5188 kanunundan bihaber nöbetçiler.',
    traditionalIcon: 'cancel',
    aloVision: 'Kendi resmi akademimizden (guvenlikkursu.com) yetişen, EGM lisanslı, periyodik atış ve kriz simülatörü eğitimli kadrolar.',
    aloVisionIcon: 'check_circle',
    aloBenefit: 'EGM Onaylı Profesyonel Koruma',
  },
  {
    criterion: 'Teknik Arıza & Kestirimci Bakım',
    traditional: 'Asansör veya hidrofor bozulup site susuz/asansörsüz kalınca günlerce dışarıdan fahiş fiyatla usta beklenir.',
    traditionalIcon: 'cancel',
    aloVision: 'IoT sensörleri ile arıza oluşmadan kestirimci bakım tespiti ve 15 dakikada sahaya ulaşan gezici mobil teknik servis filosu.',
    aloVisionIcon: 'check_circle',
    aloBenefit: '15 Dakikada Kesintisiz Müdahale',
  },
  {
    criterion: 'Aidat Tahsilatı & Hukuki Takip',
    traditional: 'Yönetici komşularıyla borç yüzünden tartışır, husumet doğar; ödenmeyen aidatlar yüzünden ortak elektrik ve sular kesilir.',
    traditionalIcon: 'cancel',
    aloVision: '634 KMK m.20 uyarınca hukuk müşavirliğimizce komşuluk ilişkilerini zedelemeden yürütülen profesyonel icra takibi (%99,4 başarı).',
    aloVisionIcon: 'check_circle',
    aloBenefit: '%99,4 Zamanında Tahsilat Başarısı',
  },
  {
    criterion: 'Satın Alma & Tedarik Maliyetleri',
    traditional: 'Piyasa araştırması yapılmadan, tanıdık ustalardan yüksek fiyat ve şişirilmiş faturalarla yapılan şaibeli harcamalar.',
    traditionalIcon: 'cancel',
    aloVision: 'En az 3 bağımsız teklifli ihale şartnamesi ve 45.000 dairelik toplu satın alma gücümüz sayesinde %20-30 doğrudan indirim.',
    aloVisionIcon: 'check_circle',
    aloBenefit: '%28 Doğrudan Bütçe Tasarrufu',
  },
];

export default function VisionComparisonMatrixSeo() {
  const [activeTab, setActiveTab] = useState<'all' | 'financial' | 'operational'>('all');

  const filteredItems = COMPARISON_DATA.filter((item, index) => {
    if (activeTab === 'financial') return index === 0 || index === 1 || index === 4 || index === 5;
    if (activeTab === 'operational') return index === 2 || index === 3;
    return true;
  });

  return (
    <section
      id="yonetim-karsilastirma"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm text-brand-500" aria-hidden="true">
              compare_arrows
            </span>
            <span>2026 Standartları Karşılaştırması</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Geleneksel Apartman Yönetimi vs. Alo Yönetim 2026 Vizyonu
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Neden geleneksel, amatör yönetim modelleri komşuluk bağlarını zedeler ve mülk değerini düşürür? 
            İşte kat maliklerine sunduğumuz somut farklar ve yasal güvenceler:
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'bg-[var(--color-surface-variant)]/60 text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Tüm Kriterler (6)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('financial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'financial'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'bg-[var(--color-surface-variant)]/60 text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Mali Şeffaflık & Bütçe
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('operational')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'operational'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'bg-[var(--color-surface-variant)]/60 text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              Güvenlik & Teknik Bakım
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-4">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xs hover:border-[var(--color-outline)] transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-[var(--color-outline)]/40">
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  <span>{item.criterion}</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-bold">
                  {item.aloBenefit}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Traditional Side */}
                <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
                      <span className="material-symbols-outlined text-base">cancel</span>
                      <span>Geleneksel / Amatör Yönetim</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                      {item.traditional}
                    </p>
                  </div>
                </div>

                {/* Alo Yonetim Side */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                      <span className="material-symbols-outlined text-base">verified</span>
                      <span>Alo Yönetim 2026 Standartları</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--color-primary)] font-medium leading-relaxed">
                      {item.aloVision}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
