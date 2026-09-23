"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import {
  EV_CHARGING_OPTIONS,
  ENERGY_EFFICIENCY_PILLARS,
} from '@/data/facilityEnergyEvChargingData';

export default function FacilityEnergyEvChargingSeo() {
  const [activeTab, setActiveTab] = useState<'ev-charging' | 'energy-efficiency'>('ev-charging');

  // Schema.org TechArticle & Legislation
  const schemaEnergy = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#ev-sarj-ve-ekb-rehberi`,
    name: 'Binalarda Enerji Kimlik Belgesi (EKB) ve Ortak Otopark EV Şarj İstasyonu Kurulum Rehberi',
    description:
      'KMK Madde 42 uyarınca apartman ve site otoparklarına elektrikli araç şarj istasyonu kurma karar nisabı, trafo kapasite şartları ve 5627 sayılı kanun EKB zorunluluğu.',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi#ev-sarj-ve-ekb-rehberi`,
  };

  return (
    <section
      id="ev-sarj-ve-ekb-rehberi"
      aria-label="Binalarda Enerji Kimlik Belgesi (EKB) & Ortak Alan EV Şarj İstasyonu Kurulum Rehberi"
      className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden"
    >
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaEnergy) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">ev_station</span>
            <span>Yeşil Enerji & E-Mobilite Rehberi</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Sitelerde EV Şarj İstasyonu Kurulumu, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-400 dark:via-emerald-300 dark:to-cyan-400">KMK m.42 İzinleri & EKB Standartları</span>
          </h2>
          <p className="text-[var(--color-secondary)] mt-2 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
            Site otoparklarında elektrikli araç şarj ünitesi kurulumu için gereken Genel Kurul karar nisapları, yangın emniyet tedbirleri ve 5627 sayılı Enerji Kimlik Belgesi (EKB) yasal gereklilikleri.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--color-surface-variant)] rounded-xl border border-[var(--color-outline)]/70">
          <button
            onClick={() => setActiveTab('ev-charging')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'ev-charging'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            EV Şarj & KMK 42
          </button>
          <button
            onClick={() => setActiveTab('energy-efficiency')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'energy-efficiency'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            EKB & Enerji Verimliliği
          </button>
        </div>
      </div>

      {/* Tab 1: EV Charging Options */}
      {activeTab === 'ev-charging' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EV_CHARGING_OPTIONS.map((opt) => (
            <div
              key={opt.optionId}
              className="bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/70 hover:border-teal-500/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                    {opt.kmkArticleRef}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-secondary)] bg-[var(--color-surface)] px-2 py-0.5 rounded border border-[var(--color-outline)]/60">
                    Karar: {opt.legalMajorityRequired}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mb-3">
                  {opt.optionTitle}
                </h3>

                <div className="space-y-3 text-xs text-[var(--color-secondary)] mb-4">
                  <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
                    <strong className="text-teal-600 dark:text-teal-400 block mb-0.5 font-bold">Altyapı ve Kablolama Şartı:</strong>
                    <span>{opt.infrastructureRequirement}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60">
                    <strong className="text-teal-600 dark:text-teal-400 block mb-0.5 font-bold">Faturalandırma & Sayaç Usulü:</strong>
                    <span>{opt.billingMethod}</span>
                  </div>
                </div>

                {/* Fire Safety */}
                <div className="mb-4">
                  <strong className="text-[11px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block mb-1.5">
                    🔥 Otopark Yangın Emniyet Tedbirleri:
                  </strong>
                  <ul className="space-y-1 text-xs text-[var(--color-secondary)]">
                    {opt.fireSafetyPrecautions.map((precaution, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500">•</span>
                        <span>{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-outline)]/60 text-xs p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                <strong className="block text-[11px] text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-0.5">
                  🛡️ Alo Yönetim Mühendislik Protokolü:
                </strong>
                <span>{opt.aloYonetimProtocol}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Energy Efficiency & EKB */}
      {activeTab === 'energy-efficiency' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ENERGY_EFFICIENCY_PILLARS.map((pillar) => (
            <div
              key={pillar.pillarCode}
              className="bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/70 rounded-2xl p-5 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    {pillar.targetClassOrSaving}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)] mb-1">
                  {pillar.pillarName}
                </h3>
                <span className="text-[11px] text-[var(--color-tertiary)] font-mono block mb-3">
                  {pillar.legalStandard}
                </span>

                <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-outline)]/60 text-xs">
                <strong className="text-[11px] text-teal-600 dark:text-teal-400 font-bold block mb-1.5">
                  Uygulama Kontrol Listesi:
                </strong>
                <ul className="space-y-1 text-[var(--color-secondary)] text-[11px]">
                  {pillar.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-600 dark:text-teal-400">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 text-xl" aria-hidden="true">energy_savings_leaf</span>
          <span>
            Sitenizin trafo gücünü ve EKB sınıfını yetkili enerji yöneticilerimizle ücretsiz analiz ettirebilirsiniz.
          </span>
        </div>
        <a
          href="/iletisim"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold transition shrink-0 shadow-xs cursor-pointer"
        >
          <span>Enerji Keşfi Talep Edin</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
