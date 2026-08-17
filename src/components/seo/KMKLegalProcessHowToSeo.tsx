"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export interface ProcessStep {
  stepNumber: number;
  title: string;
  duration: string;
  lawRef: string;
  description: string;
  criticalPoints: string[];
}

export interface LegalProcessScenario {
  id: string;
  name: string;
  totalDuration: string;
  summary: string;
  lawName: string;
  steps: ProcessStep[];
}

export default function KMKLegalProcessHowToSeo() {
  const scenarios: LegalProcessScenario[] = [
    {
      id: 'aidat_icra',
      name: 'Ödenmeyen Aidat İcra Takibi ve Borç Tahsilat Süreci',
      totalDuration: '30 - 45 Gün',
      lawName: '634 Sayılı KMK Madde 20 & 2004 Sayılı İcra ve İflas Kanunu',
      summary: 'Kat Mülkiyeti Kanunu uyarınca geciken aidat borçlarının hukuki yoldan, %5 aylık gecikme faizi ve avukatlık vekalet ücreti ile tahsil edilme yol haritası.',
      steps: [
        {
          stepNumber: 1,
          title: 'Yazılı Hatırlatma ve Dijital Bildirim',
          duration: '1. - 15. Gün',
          lawRef: 'KMK Madde 20',
          description: 'Gecikmeye giren aidat borcu, SMS ve e-posta yoluyla ilgili kat maliki ve kiracıya detaylı hesap dökümü ile bildirilir.',
          criticalPoints: ['İşletme projesindeki kesinleşen aidat tutarı', 'Ödeme için tanınan makul 7 günlük süre']
        },
        {
          stepNumber: 2,
          title: 'Noter Aracılığıyla İhtarname Çekilmesi',
          duration: '16. - 25. Gün',
          lawRef: 'KMK Madde 20/2',
          description: 'Ödeme yapılmaması halinde noter kanalıyla ihtarname gönderilir ve aylık %5 gecikme tazminatı resmen başlatılır.',
          criticalPoints: ['Aylık %5 yasal gecikme tazminatı işletimi', 'Tebligat Kanunu kurallarına tam uyum']
        },
        {
          stepNumber: 3,
          title: 'İcra Dairesinde İlamsız Takip Başlatılması',
          duration: '26. - 35. Gün',
          lawRef: 'İİK Madde 68 uyarınca',
          description: 'Alo Yönetim hukuk müşavirliği tarafından İcra Müdürlüğü nezdinde Örnek No: 7 ilamsız icra takibi açılır.',
          criticalPoints: ['İşletme projesi ve işletme defteri takibe eklenir', '7 gün içinde itiraz edilmezse takip kesinleşir']
        },
        {
          stepNumber: 4,
          title: 'Banka/Maaş Haczi ve Tahsilat',
          duration: '36. - 45. Gün',
          lawRef: 'İİK Haciz Hükümleri & KMK 22',
          description: 'Kesinleşen icra takibi sonrasında borçlunun banka hesapları, araç ve taşınmazlarına haciz konularak borç site hesabına aktarılır.',
          criticalPoints: ['Ana gayrimenkul üzerindeki yasal ipotek hakkı (KMK 22)', 'Tüm avukatlık ve icra masrafları borçluya yükletilir']
        }
      ]
    },
    {
      id: 'yonetici_secimi',
      name: 'Kat Malikleri Kurulu Yönetici Seçimi & Devir-Teslim Süreci',
      totalDuration: '15 - 20 Gün',
      lawName: '634 Sayılı KMK Madde 29 & Madde 34',
      summary: 'Site veya apartmanda mevcut yönetimin profesyonel tesis yönetimine devredilmesi veya yeni yöneticinin seçilmesi yasal prosedürü.',
      steps: [
        {
          stepNumber: 1,
          title: 'Genel Kurul Çağrısı ve Gündem Tebliği',
          duration: 'Toplantıdan 15 Gün Önce',
          lawRef: 'KMK Madde 29',
          description: 'Tüm kat maliklerine taahhütlü mektupla veya imza karşılığı toplantı tarihi, saati ve gündem maddeleri tebliğ edilir.',
          criticalPoints: ['Toplantı gündeminde "Yönetici Seçimi" mutlaka yer almalıdır', 'İlk toplantıda çoğunluk sağlanamazsa 2. toplantı tarihi belirtilmelidir']
        },
        {
          stepNumber: 2,
          title: 'Genel Kurulda Çift Çoğunluk ile Oylama',
          duration: 'Toplantı Günü',
          lawRef: 'KMK Madde 34',
          description: 'Yönetici seçimi için kat maliklerinin hem sayı (kişi) hem de arsa payı bakımından salt çoğunluğu (%50 + 1) aranır.',
          criticalPoints: ['Vekaletnameler yasal sınırlara uygun olmalıdır', 'Seçim kararı Karar Defteri\'ne anında yazılır']
        },
        {
          stepNumber: 3,
          title: 'Noter Karar Tasdiki ve Banka Yetki Devri',
          duration: 'Toplantıdan Sonraki 3 Gün',
          lawRef: 'KMK Madde 35 & Noterlik Kanunu',
          description: 'Alınan karar noterden tasdik ettirilir; vergi dairesi ve banka hesap yetkileri yeni profesyonel yönetime devredilir.',
          criticalPoints: ['Karar defteri noter kapanış/açılış tasdikleri kontrol edilir', 'Banka çift imza yetki protokolü imzalanır']
        },
        {
          stepNumber: 4,
          title: 'Demirbaş, Kasa ve Arşiv Devir Teslimi',
          duration: 'Toplantıdan Sonraki 7 Gün',
          lawRef: 'KMK Madde 38',
          description: 'Eski yönetimden kasa bakiyesi, fatura koçanları, asansör ruhsatları, personel dosyaları ve anahtarlar tutanakla teslim alınır.',
          criticalPoints: ['Eksiksiz devir teslim tutanağı tanzim edilir', 'Mali müşavir eşliğinde geçmiş 12 ayın hesap denetimi yapılır']
        }
      ]
    }
  ];

  const [activeScenarioId, setActiveScenarioId] = useState<string>('aidat_icra');
  const active = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: active.name,
    description: active.summary,
    totalTime: `P${active.totalDuration.replace(/\s+/g, '')}`,
    step: active.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.stepNumber,
      name: s.title,
      text: `${s.description} Yasal Dayanak: ${s.lawRef}. ${s.criticalPoints.join(', ')}`
    }))
  };

  return (
    <div className="my-12 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">account_tree</span>
              Google HowTo Şemalı Yasal Süreç Motoru
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
            KMK Yasal Süreç & İcra Yol Haritası
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
            Kat Mülkiyeti Kanunu ve İcra İflas Kanunu standartlarında resmi adım adım uygulama rehberi.
          </p>
        </div>

        {/* Scenario Toggle */}
        <div className="flex bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 shrink-0">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeScenarioId === sc.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {sc.id === 'aidat_icra' ? 'Aidat İcra Süreci' : 'Yönetici Seçimi & Devir'}
            </button>
          ))}
        </div>
      </div>

      {/* Meta Bar */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 md:p-6 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div>
          <span className="text-[var(--color-secondary)] block">Yasal Çerçeve:</span>
          <strong className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">{active.lawName}</strong>
        </div>
        <div>
          <span className="text-[var(--color-secondary)] block">Tahmini Tamamlanma:</span>
          <strong className="text-[var(--color-primary)] text-sm font-bold">{active.totalDuration}</strong>
        </div>
        <div>
          <span className="text-[var(--color-secondary)] block">Operasyon Yetkilisi:</span>
          <strong className="text-[var(--color-primary)] text-sm font-bold">Alo Yönetim Hukuk Departmanı</strong>
        </div>
      </div>

      {/* Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {active.steps.map((step) => (
          <div
            key={step.stepNumber}
            className="bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4 relative group hover:border-emerald-500/40 transition-all"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-sm flex items-center justify-center shadow-sm">
                0{step.stepNumber}
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                {step.duration}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider block">
                {step.lawRef}
              </span>
              <h4 className="text-base font-bold text-[var(--color-primary)] leading-snug">
                {step.title}
              </h4>
              <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Critical Checklist */}
            <div className="pt-3 border-t border-gray-200/60 dark:border-white/10 space-y-1.5 text-[11px] text-[var(--color-secondary)]">
              {step.criticalPoints.map((pt, pIdx) => (
                <div key={pIdx} className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-xs text-emerald-500 shrink-0 mt-0.5">
                    check
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
