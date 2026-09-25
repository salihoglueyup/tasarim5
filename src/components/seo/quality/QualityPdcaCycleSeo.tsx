"use client";

import React, { useState } from 'react';

interface PdcaStep {
  step: string;
  name: string;
  turkishName: string;
  icon: string;
  color: string;
  badgeBg: string;
  title: string;
  desc: string;
  actions: string[];
  kpi: string;
}

const PDCA_STEPS: PdcaStep[] = [
  {
    step: 'P',
    name: 'Plan',
    turkishName: 'Planla',
    icon: 'assignment',
    color: 'from-blue-600 to-cyan-500 text-blue-500',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    title: 'Saha Keşfi, Risk Analizi ve KMK Bütçe Planlaması',
    desc: 'Yönetim devralınmadan önce sitenin tüm mekanik sistemleri, güvenlik açıkları ve finansal yapısı mühendislik disipliniyle haritalandırılır.',
    actions: [
      'Asansör, jeneratör, hidrofor ve yangın sistemlerinde teknik durum tespiti',
      'KMK Madde 37 uyarınca gerçekçi ve dengeli yıllık işletme projesi bütçesi',
      '5188 Sayılı Kanun kapsamında kör nokta analizi ve güvenlik nöbet planı',
      'Site sakinlerinin geçmiş şikayet ve beklenti analizi'
    ],
    kpi: '%100 Eksiksiz Risk Haritası ve Şeffaf Bütçe'
  },
  {
    step: 'D',
    name: 'Do',
    turkishName: 'Uygula',
    icon: 'engineering',
    color: 'from-cyan-500 to-emerald-500 text-cyan-500',
    badgeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
    title: 'Standartlaştırılmış Saha Operasyonları ve Dijital Süreçler',
    desc: 'Yazılı ISO 9001 iş talimatlarına göre eğitilmiş kadrolarla temizlik, güvenlik ve teknik bakım günlük disiplinle icra edilir.',
    actions: [
      '5188 lisanslı güvenlik ile RFID devriye tur kontrolü ve akıllı PTS geçişi',
      'Binicili zemin otomatları ve ekolojik kimyasallarla günlük ortak alan hijyeni',
      'Mobil sakin portali üzerinden online aidat ödeme ve anlık talep kaydı',
      'Asansör ve hidroforlarda 7/24 kesintisiz teknik operasyon ve periyodik bakım'
    ],
    kpi: '20 Dk Acil Teknik Müdahale SLA'
  },
  {
    step: 'C',
    name: 'Check',
    turkishName: 'Kontrol Et',
    icon: 'fact_check',
    color: 'from-amber-500 to-orange-500 text-amber-500',
    badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    title: 'Habersiz Çapraz Teftiş ve Bağımsız Denetim',
    desc: 'Hizmet kalitesinin rehavete kapılmaması için bağımsız kalite kontrolörleri tarafından düzenli habersiz denetimler gerçekleştirilir.',
    actions: [
      'Ayda 4 kez habersiz gece ve gündüz gizli müşteri / saha denetimi',
      'Sanayi Bakanlığı akredite A Tipi muayene kuruluşu onaylı asansör yeşil etiket takibi',
      'Bağımsız SMMM tarafından her ay düzenli mali denetim ve banka mutabakatı',
      'Mobil uygulama üzerinden her çeyrekte sakin memnuniyet anketleri'
    ],
    kpi: 'Yılda 48 Habersiz Çapraz Denetim'
  },
  {
    step: 'A',
    name: 'Act',
    turkishName: 'Önlem Al (Kaizen)',
    icon: 'sync',
    color: 'from-purple-500 to-indigo-500 text-purple-500',
    badgeBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
    title: 'Sürekli İyileştirme ve Düzeltici / Önleyici Faaliyetler',
    desc: 'Tespit edilen aksaklıklar ertelenmez; Kaizen ilkeleriyle kök neden analizi yapılır ve kalıcı önlemler derhal devreye alınır.',
    actions: [
      'Denetimlerde aksayan süreçler için derhal DÖF (Düzeltici Önleyici Faaliyet) açılışı',
      'SLA şartlarını karşılamayan taşeronlara anında cezai şart ve hak ediş kesintisi',
      'Teknoloji ve yapay zeka otomasyonları ile enerji tasarruf optimizasyonu',
      'Tesis yönetimi yıllık faaliyet raporunun kat malikleri kuruluna şeffafça sunumu'
    ],
    kpi: '%99.4 SLA Karşılama ve Sıfır Tekrar Eden Hata'
  }
];

export default function QualityPdcaCycleSeo() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PDCA_STEPS[activeStepIndex];

  return (
    <section id="puko-dongusu" className="py-20 md:py-28 bg-[var(--color-surface)] border-y border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-sm">all_inclusive</span>
            Deming / Kaizen Kalite Modeli
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Sürekli İyileştirme: 4 Aşamalı PUKÖ Kalite Çarkı
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            Alo Yönetim&apos;in kalitesi rastlantı değildir. Her site ve tesisimiz; Planla, Uygula, 
            Kontrol Et ve Önlem Al (PUKÖ) adımlarıyla sürekli kendini yenileyen bir mekanizmayla işletilir.
          </p>
        </div>

        {/* 4 Step Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {PDCA_STEPS.map((step, idx) => (
            <button
              key={step.step}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                activeStepIndex === idx
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg scale-102 border-slate-900 dark:border-white'
                  : 'bg-[var(--color-background)] border-[var(--color-outline)]/60 text-[var(--color-secondary)] hover:border-[var(--color-primary)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xl sm:text-2xl font-black ${activeStepIndex === idx ? 'text-cyan-400 dark:text-cyan-600' : 'text-[var(--color-primary)]'}`}>
                  {step.step}
                </span>
                <span className="material-symbols-outlined text-xl">
                  {step.icon}
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold">
                  {step.turkishName}
                </div>
                <div className="text-[10px] opacity-75">
                  ({step.name})
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-[var(--color-background)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${activeStep.badgeBg}`}>
                Aşama {activeStepIndex + 1} / 4 • {activeStep.turkishName} ({activeStep.name})
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                {activeStep.kpi}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] leading-tight">
              {activeStep.title}
            </h3>

            <p className="text-sm text-[var(--color-secondary)] leading-relaxed font-light">
              {activeStep.desc}
            </p>

            <div className="pt-4 border-t border-[var(--color-outline)]/40 mt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-3">
                Bu Aşamada Yürütülen Operasyonel Adımlar:
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-primary)]">
                {activeStep.actions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-base text-cyan-500 shrink-0 mt-0.5">
                      task_alt
                    </span>
                    <span className="leading-snug">{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                KALİTE TAAHHÜDÜMÜZ
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                Sıfır Hata ve Şeffaf Hesap Verebilirlik
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                Alo Yönetim&apos;de hiçbir sorun halının altına süpürülmez. Tüm denetim bulguları, 
                asansör yeşil etiket raporları ve mali tablolar sakinlerin mobil paneline anlık yüklenir.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Yıllık Habersiz Teftiş:</span>
                  <span className="font-bold text-cyan-400">48 Denetim</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Şikayet Çözüm Süresi:</span>
                  <span className="font-bold text-emerald-400">Maks. 24 Saat</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Mali Şeffaflık:</span>
                  <span className="font-bold text-amber-400">Canlı Kasa / Banka</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href="/teklif-al"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-md transition-all text-center"
              >
                Siteniz İçin Kalite Raporu İsteyin
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
