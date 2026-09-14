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
      className="my-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaEnergy) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">ev_station</span>
            <span>Yeşil Enerji & E-Mobilite Rehberi</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sitelerde EV Şarj İstasyonu Kurulumu, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">KMK m.42 İzinleri & EKB Standartları</span>
          </h2>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
            Site otoparklarında elektrikli araç şarj ünitesi kurulumu için gereken Genel Kurul karar nisapları, yangın emniyet tedbirleri ve 5627 sayılı Enerji Kimlik Belgesi (EKB) yasal gereklilikleri.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('ev-charging')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'ev-charging'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            EV Şarj & KMK 42
          </button>
          <button
            onClick={() => setActiveTab('energy-efficiency')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'energy-efficiency'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-300 hover:text-white'
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
              className="bg-slate-800/40 border border-slate-800 hover:border-teal-800/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300">
                    {opt.kmkArticleRef}
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Karar: {opt.legalMajorityRequired}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                  {opt.optionTitle}
                </h3>

                <div className="space-y-3 text-xs text-slate-300 mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <strong className="text-teal-400 block mb-0.5">Altyapı ve Kablolama Şartı:</strong>
                    <span>{opt.infrastructureRequirement}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <strong className="text-teal-400 block mb-0.5">Faturalandırma & Sayaç Usulü:</strong>
                    <span>{opt.billingMethod}</span>
                  </div>
                </div>

                {/* Fire Safety */}
                <div className="mb-4">
                  <strong className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block mb-1.5">
                    🔥 Otopark Yangın Emniyet Tedbirleri:
                  </strong>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {opt.fireSafetyPrecautions.map((precaution, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <strong className="block text-[11px] text-emerald-400 font-bold uppercase mb-0.5">
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
              className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {pillar.targetClassOrSaving}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  {pillar.pillarName}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono block mb-3">
                  {pillar.legalStandard}
                </span>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 text-xs">
                <strong className="text-[11px] text-teal-400 font-bold block mb-1.5">
                  Uygulama Kontrol Listesi:
                </strong>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {pillar.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-400">✔</span>
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
      <div className="mt-8 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-teal-400" aria-hidden="true">energy_savings_leaf</span>
          <span>
            Sitenizin trafo gücünü ve EKB sınıfını yetkili enerji yöneticilerimizle ücretsiz analiz ettirebilirsiniz.
          </span>
        </div>
        <a
          href="/iletisim"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold transition flex-shrink-0"
        >
          <span>Enerji Keşfi Talep Edin</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
