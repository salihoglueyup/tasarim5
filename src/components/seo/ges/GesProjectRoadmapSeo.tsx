"use client";

import React, { useState } from 'react';

interface Step {
  stepNumber: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  officialDoc: string;
  timeframe: string;
}

const STEPS: Step[] = [
  {
    stepNumber: '01',
    title: 'Ücretsiz Statik Çatı & Güneşlenme Keşfi',
    badge: 'Mühendislik Keşfi',
    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    description:
      'Elektrik ve inşaat mühendislerimiz sitenize gelerek çatı taşıma kapasitesini, rüzgar yükünü, baca ve parapet gölgelemelerini 3D simülasyonla inceler. Siteniz için optimum santral gücünü belirler.',
    officialDoc: 'Statik Taşıma Kapasitesi ve Yıllık Üretim Fizibilite Raporu',
    timeframe: '1 — 2 İş Günü',
  },
  {
    stepNumber: '02',
    title: 'Kat Malikleri Kurulu (Genel Kurul) Karar Protokolü',
    badge: '634 KMK m.42',
    badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    description:
      'Hukuk müşavirliğimizce hazırlanan kanunen kusursuz karar metni, olağan veya olağanüstü kat malikleri kuruluna sunulur. KMK m.42 gereği sayı ve arsa payı çoğunluğuyla karar defterine tescil edilir.',
    officialDoc: 'Noter Onaylı Kat Malikleri Kurulu Karar Metni Sureti',
    timeframe: 'Genel Kurul Süreci',
  },
  {
    stepNumber: '03',
    title: 'Dağıtım Şirketi (BEDAŞ / AYEDAŞ) Çağrı Mektubu',
    badge: 'EPDK 5/1-ç Başvuru',
    badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
    description:
      'EPDK Lisanssız Elektrik Üretim Yönetmeliği uyarınca bölgenizdeki dağıtım şirketine (BEDAŞ, AYEDAŞ vb.) resmi bağlantı başvurusu yapılır. Trafo kapasitesi rezerve edilerek çağrı mektubu çıkartılır.',
    officialDoc: 'Resmi Bağlantı Anlaşmasına Çağrı Mektubu (Dağıtım Şirketi)',
    timeframe: '20 — 30 Gün (Yasal Süre)',
  },
  {
    stepNumber: '04',
    title: 'TEDAŞ Proje Onayı & Belediye Yazısı',
    badge: 'TEDAŞ Akreditasyonu',
    badgeColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20',
    description:
      'TEDAŞ standartlarında tek hat şeması, elektriksel koruma röleleri, statik çatı projesi ve itfaiye yangın güvenlik planı hazırlanır. TEDAŞ Bölge Müdürlüğü’nden resmi proje onayı alınır.',
    officialDoc: 'TEDAŞ Onaylı Elektrik & Yangın Güvenlik Projesi',
    timeframe: '15 — 20 İş Günü',
  },
  {
    stepNumber: '05',
    title: 'Tier-1 Panel Montajı & Membran Su Yalıtım Güvencesi',
    badge: 'Anahtar Teslim Montaj',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    description:
      'Çatıyı delmeyen rüzgar ağırlıklı (balastlı) alüminyum konstrüksiyonla Tier-1 monokristal paneller, akıllı inverter, aşırı gerilim parafudrları ve yangına dayanıklı DC solar kablolar monte edilir.',
    officialDoc: '25 Yıl Lineer Güç & Su Yalıtım Garanti Sertifikası',
    timeframe: '7 — 14 İş Günü',
  },
  {
    stepNumber: '06',
    title: 'Çift Yönlü Sayaç Kabulü & Aylık Mahsuplaşma Başlangıcı',
    badge: 'Aylık Mahsuplaşma',
    badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
    description:
      'TEDAŞ ve dağıtım şirketi mühendisleri sahaya gelerek geçici kabulü gerçekleştirir. Mevcut sayaç yerine çift yönlü üretim/tüketim sayacı takılır. Faturanızda %70-85 net düşüş o ay başlar.',
    officialDoc: 'TEDAŞ Geçici Kabul Tutanağı & Sistem Kullanım Anlaşması',
    timeframe: '1 Gün (Kabul Günü)',
  },
];

export default function GesProjectRoadmapSeo() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      id="ges-izin-sureci"
      className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/20"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm text-amber-500" aria-hidden="true">
              assignment_turned_in
            </span>
            <span>Bürokrasi ve İzin Korkusuna Son</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            6 Aşamalı Anahtar Teslim Proje ve Yasal İzin Yol Haritası
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            Yöneticilerin ve kat maliklerinin bürokrasiyle uğraşmaması için ilk keşiften genel kurul kararına, 
            TEDAŞ proje onayından çift yönlü sayacın açılmasına kadar tüm resmi süreçleri Alo Yönetim mühendisleri yönetir.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`bg-[var(--color-surface)] border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-all cursor-pointer ${
                activeStep === idx
                  ? 'border-amber-500/80 ring-2 ring-amber-500/20 shadow-md'
                  : 'border-[var(--color-outline)]/80 hover:border-[var(--color-outline)]'
              }`}
            >
              <div>
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-6 font-normal">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-outline)]/40 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold">
                  <span className="material-symbols-outlined text-sm text-amber-500 shrink-0">
                    description
                  </span>
                  <span className="truncate">{step.officialDoc}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Tahmini Süre:</span>
                  <span className="font-bold text-[var(--color-primary)]">{step.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
