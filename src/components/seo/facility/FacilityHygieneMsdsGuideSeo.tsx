"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  COLOR_CODED_HYGIENE_ZONES,
  MSDS_MANDATORY_SECTIONS,
  GARBAGE_CHUTE_SANITATION_STEPS,
  CHEMICAL_STORAGE_SAFETY_RULES,
  ColorCodedHygieneZone
} from '@/data/facilityHygieneMsdsData';

interface FacilityHygieneMsdsGuideSeoProps {
  className?: string;
  defaultColorCode?: 'kirmizi' | 'sari' | 'mavi' | 'yesil';
}

export default function FacilityHygieneMsdsGuideSeo({
  className = '',
  defaultColorCode = 'kirmizi'
}: FacilityHygieneMsdsGuideSeoProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'msds' | 'chute' | 'storage'>('colors');
  const [selectedColorKey, setSelectedColorKey] = useState<'kirmizi' | 'sari' | 'mavi' | 'yesil'>(defaultColorCode);

  const activeZone = COLOR_CODED_HYGIENE_ZONES.find(z => z.colorKey === selectedColorKey) || COLOR_CODED_HYGIENE_ZONES[0];

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://aloyonetim.com/#techarticle-facility-hygiene-msds",
        "headline": "Sitelerde 4 Renkli Temizlik Protokolü, Kimyasal GBF/MSDS ve Çöp Şaftı Hijyeni Rehberi",
        "description": "TSE 13811 ve 6331 Sayılı İSG Kanunu kapsamında hastane standardında 4 renk kodlu çapraz bulaşma önleme, 16 başlıklı Güvenlik Bilgi Formu (GBF) ve aktif ozonlu çöp şaftı dezenfeksiyonu.",
        "inLanguage": "tr",
        "author": {
          "@type": "Organization",
          "name": "Alo Yönetim Hijyen & Tesis Sanitasyon Direktörlüğü",
          "url": "https://aloyonetim.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Alo Yönetim",
          "url": "https://aloyonetim.com"
        },
        "about": [
          "TSE 13811 Hijyen ve Sanitasyon Yönetim Sistemi",
          "4 Renk Kodlu Temizlik Standardı",
          "KKDİK Güvenlik Bilgi Formu (GBF/MSDS)",
          "Çöp Şaftı Ozon Dezenfeksiyonu"
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://aloyonetim.com/#howto-cross-contamination-prevention",
        "name": "Sitelerde Çapraz Bulaşmayı Önleyen Renk Kodlu Hijyen Protokolü",
        "description": "Tuvalet, banyo, genel ofis ve yemekhane alanlarında mikropların birbirine geçmesini önleyen 4 renkli mop ve bez ayrımı.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Kırmızı Kod: Tuvalet ve Klozet Alanları",
            "text": "Sadece klozet ve pisuvarlarda kullanılır; kapı dışına çıkarılması ve lavaboya sürülmesi kesinlikle yasaktır."
          },
          {
            "@type": "HowToStep",
            "name": "Sarı Kod: Lavabo ve Banyo Islak Hacimler",
            "text": "Lavabo, batarya, ayna ve fayanslarda nötr sanitasyon dezenfektanı ile uygulanır."
          },
          {
            "@type": "HowToStep",
            "name": "Mavi Kod: Lobi, Asansör ve Koridorlar",
            "text": "Bina ortak alanlarında, yangın merdivenlerinde ve asansör kabinlerinde antistatik yüzey temizliği sağlanır."
          },
          {
            "@type": "HowToStep",
            "name": "Yeşil Kod: Mutfak ve Yemekhane Alanları",
            "text": "Gıda ile temas eden kafeterya ve personel mutfaklarında gıdaya uygun sertifikalı sanitizörlerle temizlik yapılır."
          }
        ]
      }
    ]
  };

  return (
    <section
      aria-label="Sitelerde Ortak Alan Hijyen Standartları, GBF/MSDS & Renk Kodlu Temizlik Protokolü"
      className={`relative my-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden ${className}`}
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 mb-3 border border-indigo-300 dark:border-indigo-700">
          <span className="material-symbols-outlined text-sm">sanitizer</span>
          <span>TSE 13811 & 6331 İSG Uyumlu Hastane Standardı Hijyen</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sitelerde 4 Renkli Hijyen, Kimyasal MSDS & Çöp Şaftı Sanitasyonu
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Siteler ve rezidanslarda çapraz bulaşmayı sıfıra indiren 4 renkli temizlik kodu, 6331 İSG mevzuatında 16 başlıklı Güvenlik Bilgi Formu (GBF/MSDS) arşivi ve aktif ozonlama ile çöp şaftı koku giderimi.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'colors', label: '4 Renkli Çapraz Bulaşma Protokolü', icon: 'palette' },
          { id: 'msds', label: '16 Başlıklı GBF / MSDS İSG Dosyası', icon: 'description' },
          { id: 'chute', label: 'Çöp Şaftı & Ozon Sanitasyonu', icon: 'delete_sweep' },
          { id: 'storage', label: 'Kimyasal Depolama & İSG Güvenliği', icon: 'inventory_2' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: 4 Color-Coded Cross-Contamination Protocol */}
      {activeTab === 'colors' && (
        <div className="relative z-10 space-y-6">
          {/* Color Selector Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COLOR_CODED_HYGIENE_ZONES.map(zone => (
              <button
                key={zone.colorKey}
                type="button"
                onClick={() => setSelectedColorKey(zone.colorKey)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  selectedColorKey === zone.colorKey
                    ? `${zone.badgeBgClass} ${zone.badgeBorderClass} ring-2 ring-indigo-500/40 font-bold`
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
                    style={{ backgroundColor: zone.badgeHex }}
                  />
                  <span className={`text-xs font-bold ${zone.badgeTextClass}`}>
                    {zone.colorKey.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {zone.riskLevel}
                </div>
              </button>
            ))}
          </div>

          {/* Active Zone Detail Card */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full inline-block shadow-md shrink-0"
                  style={{ backgroundColor: activeZone.badgeHex }}
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {activeZone.colorName}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Biyolojik Risk Kategorisi: {activeZone.riskLevel}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Assigned Surfaces */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-sm">
                  <span className="material-symbols-outlined text-indigo-600 text-lg">check_box</span>
                  <span>Temizliğe Tahsis Edilen Yüzeyler:</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {activeZone.assignedSurfaces.map((surface, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{surface}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dedicated Tools */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-sm">
                  <span className="material-symbols-outlined text-indigo-600 text-lg">cleaning_services</span>
                  <span>Zorunlu Renk Kodlu Ekipmanlar:</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {activeZone.dedicatedTools.map((tool, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block mb-0.5">Kullanılan Kimyasal Türü:</strong>
                <span>{activeZone.chemicalType}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-900">
                <strong className="font-semibold block mb-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-rose-600 text-base">dangerous</span>
                  Çapraz Bulaşma (Cross-Contamination) İkazı:
                </strong>
                <span>{activeZone.crossContaminationWarning}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 16-Section MSDS / GBF Safety Document */}
      {activeTab === 'msds' && (
        <div className="relative z-10 space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl text-blue-900 dark:text-blue-200 text-xs md:text-sm flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 text-xl shrink-0 mt-0.5">info</span>
            <div>
              <strong className="font-semibold block mb-1">6331 Sayılı İSG Kanunu ve KKDİK Zorunluluğu:</strong>
              <span>
                Sitelerde ve iş merkezlerinde temizlik personeli tarafından kullanılan her endüstriyel kimyasalın (çamaşır suyu, tuz ruhu, kireç sökücü, cila vb.) 16 başlıklı Türkçe onaylı Güvenlik Bilgi Formu (GBF / MSDS) tesis deposunda fiziki ve dijital olarak arşivlenmek zorundadır.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MSDS_MANDATORY_SECTIONS.map(section => (
              <div
                key={section.sectionNo}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {section.sectionNo}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                      Bölüm {section.sectionNo}: {section.sectionTitle}
                    </h3>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {section.contentSummary}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 text-xs mb-3">
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Mecburi İçerik:</strong>
                    <span>{section.mandatoryInfo}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 text-xs border border-indigo-200 dark:border-indigo-900">
                  <strong className="font-semibold block mb-0.5">Tesis Denetimi ve Kaza Önemi:</strong>
                  <span>{section.facilityInspectionSignificance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Garbage Chute & Ozone Sanitation */}
      {activeTab === 'chute' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GARBAGE_CHUTE_SANITATION_STEPS.map(step => (
              <div
                key={step.stepNo}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-indigo-600/30">
                      {step.stepNo}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                        {step.stageName}
                      </h3>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        Periyot: {step.frequency}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs mb-3">
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-900 dark:text-white mb-0.5">Kullanılan Ekipman:</strong>
                      <span>{step.equipmentUsed}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-900 dark:text-white mb-0.5">Dezenfektan Ajanı:</strong>
                      <span>{step.disinfectantAgent}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 text-xs border border-indigo-200 dark:border-indigo-900">
                  <strong className="font-semibold block mb-0.5">Sanitasyon Hedefi:</strong>
                  <span>{step.objective}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Chemical Storage & OHS Rules */}
      {activeTab === 'storage' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CHEMICAL_STORAGE_SAFETY_RULES.map(rule => (
              <div
                key={rule.ruleId}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2 inline-block">
                    {rule.regulatoryStandard}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {rule.title}
                  </h3>
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs mb-3 border border-rose-200/50">
                    <strong className="font-semibold block mb-0.5">Hayati Kaza Tehlikesi:</strong>
                    <span>{rule.hazardDescription}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 text-xs border border-indigo-200 dark:border-indigo-800">
                  <strong className="font-semibold block mb-1">Alo Yönetim Depolama Standardı:</strong>
                  <span>{rule.aloYonetimStorageProtocol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Alo Yönetim Legal Guarantee Banner */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">verified</span>
          </div>
          <div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
              Alo Yönetim TSE 13811 Hijyen Güvencesi & KKDİK Belgeli Ürünler
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Tesislerimizde merdiven altı kimyasal kullanılmaz; her ürünün barkodlu Türkçe GBF formu panoda ilan edilir.
            </div>
          </div>
        </div>
        <a
          href="/iletisim"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-sm"
        >
          Ortak Alan Hijyen Denetimi İste
        </a>
      </div>
    </section>
  );
}
