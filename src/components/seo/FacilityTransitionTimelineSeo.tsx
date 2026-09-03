"use client";

import React from 'react';
import JsonLd from './JsonLd';

export interface TimelineStep {
  stepNumber: string;
  dayLabel: string;
  title: string;
  description: string;
  actions: string[];
  deliverable: string;
  icon: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    stepNumber: '01',
    dayLabel: '1. Gün · 2 Saat',
    title: 'Ücretsiz Saha Keşfi & Tesis Röntgeni',
    description: 'Uzman mühendis ve mali denetçilerimiz sitenizi fiziki olarak ziyaret eder; asansör, jeneratör, yangın tesisatı ve mevcut aidat bilançosunu inceler.',
    actions: [
      'Elektrik, su ve doğal gaz sayaçları kompanzasyon analizi.',
      'Mevcut personel sözleşmeleri ve güvenlik açıklarının tespiti.',
      '%25 - %35 Tasarruf Potansiyeli ve Şeffaf Bütçe Raporu sunumu.'
    ],
    deliverable: 'Ücretsiz Tesis Durum & Tasarruf Raporu',
    icon: 'search_check'
  },
  {
    stepNumber: '02',
    dayLabel: '2. Gün · 1 Gün',
    title: 'Kat Malikleri Kurulu Karar & İbra Desteği',
    description: 'KMK Madde 34 çift çoğunluk kuralına (%50+1 malik sayısı ve arsa payı) tam uygun genel kurul çağrısı ve divan karar tutanakları hukuk ekibimizce hazırlanır.',
    actions: [
      'Noter onaylı çağrı mektupları ve vekaletname şablonları.',
      'Yönetim planına uygun genel kurul gündem maddeleri.',
      'Eski yönetimin ibra süreçlerinin hukuki olarak tamamlanması.'
    ],
    deliverable: 'Resmi Kat Malikleri Kurulu Karar Tutanağı',
    icon: 'gavel'
  },
  {
    stepNumber: '03',
    dayLabel: '3. Gün · 48. Saat',
    title: 'Noter Tasdiki & Pürüzsüz Devir Teslim',
    description: 'Sitenin karar defteri, banka hesapları, mevcut nakit kasası, arıza logları ve anahtarları noter tasdikli devir teslim protokolüyle eksiksiz teslim alınır.',
    actions: [
      'Mevcut personellerin kıdem hakları korunarak Alo Grup bünyesine geçişi.',
      'Bina girişine resmi yönetici levhası ve acil SLA iletişim panolarının asılması.',
      'Sakin veri tabanının KVKK uyumlu dijital muhasebe paneline aktarımı.'
    ],
    deliverable: 'Noter Onaylı Devir Teslim Protokolü',
    icon: 'assignment_turned_in'
  },
  {
    stepNumber: '04',
    dayLabel: '4. Gün ve Sonrası',
    title: '7/24 Kesintisiz İşletme & Mobil Aktivasyon',
    description: 'Tüm sakinlere SMS ve e-posta ile mobil uygulama şifreleri iletilir. 5188 güvenlik, TSE 13811 temizlik ve 45 dk SLA teknik nöbet sistemi kesintisiz başlar.',
    actions: [
      'iOS & Android Alo Yönetim mobil uygulamasında anlık aidat ödeme aktivasyonu.',
      'Ortak aydınlatma ve kompanzasyon IoT sensörlerinin devreye alınması.',
      'Her ay tüm maliklere şeffaf gelir-gider bağımsız denetim bülteni gönderimi.'
    ],
    deliverable: '7/24 Aktif Entegre Tesis Yönetimi',
    icon: 'rocket_launch'
  }
];

export default function FacilityTransitionTimelineSeo() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Alo Yönetim Profesyonel Tesis Yönetimine 48 Saatte Geçiş Rehberi',
    description: 'Bireysel apartman ve site yönetiminden Alo Yönetim entegre tesis işletmesine 4 adımda pürüzsüz geçiş protokolü.',
    step: TIMELINE_STEPS.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.title,
      text: s.description,
      itemListElement: s.actions.map((act) => ({
        '@type': 'HowToDirection',
        text: act
      }))
    }))
  };

  return (
    <div className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[3rem] p-6 sm:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">schedule</span>
          <span>Sıfır Kesinti & Pürüzsüz Entegrasyon</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
          48 Saatte <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">Tesis Yönetimine Geçiş</span> Yol Haritası
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light mt-2">
          Mevcut yönetiminizden profesyonel Alo Yönetim güvencesine hiçbir hizmet kesintisi ve komşuluk gerginliği yaşamadan 4 adımda geçin.
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {TIMELINE_STEPS.map((step, idx) => (
          <div
            key={step.stepNumber}
            className="p-6 rounded-3xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col justify-between gap-5 relative group hover:border-blue-500/40 transition-all hover:shadow-md"
          >
            {/* Step Top */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-blue-600/40 dark:text-blue-400/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {step.stepNumber}
                </span>
                <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {step.dayLabel}
                </span>
              </div>

              <h4 className="text-base font-bold text-[var(--color-primary)] leading-snug">
                {step.title}
              </h4>

              <p className="text-xs text-[var(--color-secondary)] leading-relaxed font-light">
                {step.description}
              </p>

              <ul className="space-y-1.5 pt-2 border-t border-[var(--color-outline)]/40">
                {step.actions.map((act, aIdx) => (
                  <li key={aIdx} className="text-xs text-[var(--color-secondary)] flex items-start gap-1.5 leading-snug">
                    <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverable Badge */}
            <div className="pt-3 border-t border-[var(--color-outline)]/40">
              <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Çıktı Belgesi:</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
                {step.deliverable}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
