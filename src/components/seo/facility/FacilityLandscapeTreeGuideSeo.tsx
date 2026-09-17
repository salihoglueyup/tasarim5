"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SEASONAL_LANDSCAPE_SCHEDULE,
  TREE_PRUNING_PERMIT_RULES,
  SMART_IRRIGATION_STANDARDS,
  LANDSCAPE_LEGAL_DISPUTES,
  LandscapeSeasonalTask
} from '@/data/facilityLandscapeTreeData';

interface FacilityLandscapeTreeGuideSeoProps {
  className?: string;
  defaultSeason?: 'ilkbahar' | 'yaz' | 'sonbahar' | 'kis';
}

export default function FacilityLandscapeTreeGuideSeo({
  className = '',
  defaultSeason = 'ilkbahar'
}: FacilityLandscapeTreeGuideSeoProps) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'pruning' | 'irrigation' | 'disputes'>('calendar');
  const [selectedSeasonKey, setSelectedSeasonKey] = useState<'ilkbahar' | 'yaz' | 'sonbahar' | 'kis'>(defaultSeason);

  const activeSeason = SEASONAL_LANDSCAPE_SCHEDULE.find(s => s.seasonKey === selectedSeasonKey) || SEASONAL_LANDSCAPE_SCHEDULE[0];

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://aloyonetim.com/#techarticle-landscape-tree-guide",
        "headline": "Sitelerde Peyzaj Bakımı, Akıllı Sulama Su Tasarrufu ve Ağaç Budama İzinleri Rehberi",
        "description": "6831 Sayılı Orman Kanunu ve belediye yönetmeliklerinde anıt ağaç koruma, izinsiz ağaç kesme cezaları, 4 mevsim çim bakımı ve %50 su tasarruflu otomatik sulama sistemleri.",
        "inLanguage": "tr",
        "author": {
          "@type": "Organization",
          "name": "Alo Yönetim Peyzaj & Yeşil Alan Yönetim Direktörlüğü",
          "url": "https://aloyonetim.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Alo Yönetim",
          "url": "https://aloyonetim.com"
        },
        "about": [
          "6831 Sayılı Orman Kanunu Şehir Ağaçları",
          "Belediye Park Bahçeler Ağaç Budama İzinleri",
          "Otomatik Sulama Su Tasarrufu",
          "4 Mevsim Çim Havalandırma ve Vertikut"
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://aloyonetim.com/#howto-tree-pruning-permit",
        "name": "Sitelerde Yasal Ağaç Kesme ve Derin Budama Ruhsat Süreci",
        "description": "Kat malikleri kurulu kararı ve belediye park ve bahçeler müdürlüğü teknik keşfiyle yasal ağaç budama prosedürü.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Kat Malikleri Kurulu veya Yönetim Kurulu Kararı",
            "text": "KMK m.42 ve yönetim planı uyarınca budama veya tehlikeli ağacın sökümü için karar defterine tescil yapılır."
          },
          {
            "@type": "HowToStep",
            "name": "Belediye Park ve Bahçeler Müdürlüğü Başvurusu",
            "text": "Ağacın konumu ve fotoğraflarıyla birlikte resmi dilekçe verilir; ziraat mühendisi keşif raporu düzenler."
          },
          {
            "@type": "HowToStep",
            "name": "Ruhsatlı Budama ve Aşı Macunu İzolasyonu",
            "text": "İzin belgesi alındıktan sonra uzman arboristlerce form budaması yapılır ve kesilen yüzeyler mantara karşı macunla kapatılır."
          }
        ]
      }
    ]
  };

  return (
    <section
      aria-label="Sitelerde Peyzaj Bakımı, Otomatik Sulama Su Tasarrufu & Anıt Ağaç Koruma Rehberi"
      className={`relative my-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden ${className}`}
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300 mb-3 border border-lime-300 dark:border-lime-700">
          <span className="material-symbols-outlined text-sm">park</span>
          <span>6831 Orman Kanunu & Akıllı Yeşil Alan Standartları</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Site Peyzaj Bakımı, Su Tasarrufu & Ağaç Koruma Rehberi
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Siteler ve toplu konutlarda 4 mevsim çim sağlığı, anıt ağaç budama ve kesim ruhsatları, akıllı otomatik sulama ile ortak alan su tasarrufu ve komşuluk hukuku ilkeleri.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'calendar', label: '4 Mevsim Peyzaj Takvimi', icon: 'calendar_month' },
          { id: 'pruning', label: 'Ağaç Budama & Kesim İzinleri', icon: 'forest' },
          { id: 'irrigation', label: 'Akıllı Sulama & Su Tasarrufu', icon: 'water_drop' },
          { id: 'disputes', label: 'KMK & Komşuluk Uyuşmazlıkları', icon: 'gavel' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-lime-700 text-white shadow-md shadow-lime-700/30 font-semibold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: 4-Season Landscape Calendar */}
      {activeTab === 'calendar' && (
        <div className="relative z-10 space-y-6">
          {/* Season Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SEASONAL_LANDSCAPE_SCHEDULE.map(season => (
              <button
                key={season.seasonKey}
                type="button"
                onClick={() => setSelectedSeasonKey(season.seasonKey)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  selectedSeasonKey === season.seasonKey
                    ? 'border-lime-600 bg-lime-50 dark:bg-lime-950/40 text-lime-900 dark:text-lime-200 font-bold ring-1 ring-lime-600/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:border-lime-300'
                }`}
              >
                <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  {season.months}
                </div>
                <div className="text-sm md:text-base font-extrabold mt-0.5">
                  {season.seasonName.split('(')[0].trim()}
                </div>
              </button>
            ))}
          </div>

          {/* Active Season Details Card */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {activeSeason.seasonName}
              </h3>
              <p className="text-xs md:text-sm text-lime-800 dark:text-lime-300 font-medium mt-1">
                📌 Temel Odak: {activeSeason.primaryFocus}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lawn Care */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-sm">
                  <span className="material-symbols-outlined text-lime-600 text-lg">grass</span>
                  <span>Çim Alanı & Zemin Operasyonları:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeSeason.lawnCareOperations.map((op, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-lime-600 font-bold">•</span>
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trees & Shrubs */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-sm">
                  <span className="material-symbols-outlined text-lime-600 text-lg">nature</span>
                  <span>Ağaç, Çalı & Bitki Sağlığı:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeSeason.treeAndShrubOperations.map((op, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-lime-600 font-bold">•</span>
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-900/60">
                <strong className="font-semibold block mb-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">water_drop</span>
                  Sulama Programı:
                </strong>
                <span>{activeSeason.irrigationSchedule}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/60">
                <strong className="font-semibold block mb-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">science</span>
                  Gübreleme & Zirai Mücadele:
                </strong>
                <span>{activeSeason.fertilizationAndPesticide}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tree Pruning & Permits */}
      {activeTab === 'pruning' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TREE_PRUNING_PERMIT_RULES.map(rule => (
              <div
                key={rule.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {rule.treeCategory}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      rule.permitRequired
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                    }`}>
                      {rule.permitRequired ? 'Yasal İzin ŞART' : 'İzin Gerekmez'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                    Kapsam: {rule.diameterOrSpecies}
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    <strong className="text-slate-900 dark:text-white">Yetkili Merci & Usul: </strong>
                    {rule.legalProcedure}
                  </p>

                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs mb-3 border border-rose-200/50">
                    <strong className="font-semibold block mb-0.5">İzinsiz Müdahale Cezası:</strong>
                    <span>{rule.unauthorizedPenalty}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-lime-800 dark:text-lime-300 font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-lime-600">verified</span>
                  <span>{rule.aloYonetimProtocol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Smart Irrigation & Water Saving */}
      {activeTab === 'irrigation' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SMART_IRRIGATION_STANDARDS.map((system, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                      {system.efficiencyRating}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {system.waterSavingPercentage}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {system.systemType}
                  </h3>

                  <div className="space-y-2 text-xs mb-3">
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-900 dark:text-white mb-0.5">Sensör Teknolojisi:</strong>
                      <span>{system.sensorTechnology}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-900 dark:text-white mb-0.5">En Uygun Alan:</strong>
                      <span>{system.bestUseArea}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-xs border border-amber-200 dark:border-amber-900">
                  <strong className="font-semibold block mb-0.5">Sitelerde Yapılan Yaygın Hata:</strong>
                  <span>{system.commonMistakeInSites}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: KMK & TMK Legal Disputes */}
      {activeTab === 'disputes' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LANDSCAPE_LEGAL_DISPUTES.map((dispute, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2 inline-block">
                    {dispute.kmkOrCivilCodeRef}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {dispute.issueTitle}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    <strong className="text-slate-800 dark:text-slate-200">Uyuşmazlık Konusu: </strong>
                    {dispute.summaryProblem}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-lime-50 dark:bg-lime-950/40 text-lime-900 dark:text-lime-200 text-xs border border-lime-200 dark:border-lime-800">
                  <strong className="font-semibold block mb-1">Yargıtay İçtihadı & Hukuki Çözüm:</strong>
                  <span>{dispute.legalVerdictAndResolution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Alo Yönetim Legal Guarantee Banner */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lime-500/10 text-lime-600 dark:text-lime-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">eco</span>
          </div>
          <div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
              Alo Yönetim Ziraat & Peyzaj Mühendisliği Güvencesi
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Belediye ruhsatlı ağaç budama, %50 tasarruflu akıllı sulama ve 12 aylık periyodik yeşil alan bakımı.
            </div>
          </div>
        </div>
        <a
          href="/iletisim"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-lime-700 hover:bg-slate-800 dark:hover:bg-lime-600 transition-colors shadow-sm"
        >
          Peyzaj & Sulama Keşfi Talep Et
        </a>
      </div>
    </section>
  );
}
