"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WATER_TANK_TYPE_STANDARDS,
  WATER_TANK_SANITATION_STEPS,
  LEGIONELLA_SAFETY_PROTOCOLS,
  WATER_LAB_INSPECTION_CRITERIA,
  WaterTankTypeStandard
} from '@/data/facilityWaterTankSanitationData';

interface FacilityWaterTankSanitationSeoProps {
  className?: string;
  defaultTankTypeIndex?: number;
}

export default function FacilityWaterTankSanitationSeo({
  className = '',
  defaultTankTypeIndex = 1
}: FacilityWaterTankSanitationSeoProps) {
  const [activeTab, setActiveTab] = useState<'types' | 'protocol' | 'legionella' | 'lab'>('types');
  const [selectedTankIndex, setSelectedTankIndex] = useState<number>(defaultTankTypeIndex);

  const activeTank = WATER_TANK_TYPE_STANDARDS[selectedTankIndex] || WATER_TANK_TYPE_STANDARDS[0];

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://aloyonetim.com/#techarticle-water-tank-sanitation",
        "headline": "Binalarda Su Deposu Temizliği, Lejyonella Kontrolü ve Dezenfeksiyon Rehberi",
        "description": "T.C. Sağlık Bakanlığı 2007/67 Sayılı Genelgesi kapsamında 6 ayda bir zorunlu su deposu temizliği, 150 Bar basınçlı yıkama, Lejyoner hastalığı termal şoklama ve akredite su analizi standartları.",
        "inLanguage": "tr",
        "author": {
          "@type": "Organization",
          "name": "Alo Yönetim Mekanik Tesisat & Su Güvenliği Direktörlüğü",
          "url": "https://aloyonetim.com"
        }
      },
      {
        "@type": "GovernmentService",
        "@id": "https://aloyonetim.com/#service-water-safety",
        "name": "Bina ve Tesis İçme ve Kullanma Suyu Deposu Dezenfeksiyon Hizmeti",
        "serviceType": "Halk Sağlığı Su Güvenliği",
        "provider": {
          "@type": "Organization",
          "name": "Alo Yönetim",
          "url": "https://aloyonetim.com"
        }
      }
    ]
  };

  return (
    <section
      aria-label="Binalarda Su Deposu Temizliği, Lejyonella Kontrolü & Dezenfeksiyon Rehberi"
      className={`relative my-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden ${className}`}
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300 mb-3 border border-sky-300 dark:border-sky-700">
          <span className="material-symbols-outlined text-sm">water</span>
          <span>Sağlık Bakanlığı 2007/67 Sayılı Genelgesi & TSE 1258 Uyumlu</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bina Su Deposu Temizliği, Dezenfeksiyon & Lejyonella Rehberi
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Siteler ve binalarda içme ve kullanma suyu depolarının 6 ayda bir zorunlu dezenfeksiyonu, boyler hatlarında termal Lejyonella şoklaması ve akredite su analizi standartları.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'types', label: 'Su Deposu Tipleri ve Riskler', icon: 'propane_tank' },
          { id: 'protocol', label: '4 Aşamalı Temizlik Protokolü', icon: 'checklist_rtl' },
          { id: 'legionella', label: 'Lejyonella Termal Şoklama', icon: 'thermostat' },
          { id: 'lab', label: 'Laboratuvar Analiz Kriterleri', icon: 'biotech' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-semibold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Tank Types */}
      {activeTab === 'types' && (
        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {WATER_TANK_TYPE_STANDARDS.map((tank, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTankIndex(idx)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  selectedTankIndex === idx
                    ? 'border-sky-500 bg-sky-50/40 dark:bg-sky-950/30 ring-2 ring-sky-500/30 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
                  {tank.recommendedCleaningFrequency}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                  {tank.tankType.split('(')[0].trim()}
                </div>
              </button>
            ))}
          </div>

          {/* Active Tank Detail Card */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                  {activeTank.tankType}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Malzeme Standardı: {activeTank.materialSpecification}
                </p>
              </div>

              <span className={`text-xs px-3 py-1 rounded-lg font-bold ${
                activeTank.hygieneRiskLevel.includes('Düşük')
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
              }`}>
                {activeTank.hygieneRiskLevel}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs md:text-sm space-y-1.5">
              <strong className="text-slate-900 dark:text-white block">Yapısal Riskler ve Biyolojik Kirlenme:</strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeTank.structuralVulnerabilities}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 text-xs md:text-sm border border-sky-200 dark:border-sky-800 space-y-1">
              <strong className="font-semibold block flex items-center gap-1">
                <span className="material-symbols-outlined text-sky-600 text-base">recommend</span>
                Mühendislik Revizyon ve İyileştirme Tavsiyesi:
              </strong>
              <p className="leading-relaxed">
                {activeTank.replacementOrRetrofitAdvice}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 4-Step Sanitation Protocol */}
      {activeTab === 'protocol' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WATER_TANK_SANITATION_STEPS.map(step => (
              <div
                key={step.stepNo}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-sky-600/30">
                      {step.stepNo}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                        {step.stageTitle}
                      </h3>
                      <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                        Resmi Kayıt: {step.officialRecordType}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {step.technicalProcedure}
                  </p>

                  <div className="space-y-2 text-xs mb-3">
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-900 dark:text-white mb-0.5">Kullanılan Ekipman / Dezenfektan:</strong>
                      <span>{step.disinfectantOrTool}</span>
                    </div>

                    <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/50">
                      <strong className="block mb-0.5">İSG ve Personel Güvenliği:</strong>
                      <span>{step.safetyPrecautions}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Legionella Protocols */}
      {activeTab === 'legionella' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEGIONELLA_SAFETY_PROTOCOLS.map((protocol, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {protocol.riskZone}
                    </h3>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs mb-3 border border-rose-200/50">
                    <strong className="font-semibold block mb-0.5">Üreme Mekanizması & Tehlike:</strong>
                    <span>{protocol.hazardMechanism}</span>
                    <div className="mt-1 font-bold text-rose-700 dark:text-rose-400">
                      Optimum Sıcaklık: {protocol.optimalBacterialGrowthTemp}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-900 dark:text-white mb-0.5">Termal Şoklama Metodu:</strong>
                      <span>{protocol.thermalDisinfectionMethod}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-900 dark:text-white mb-0.5">Kimyasal Standardı:</strong>
                      <span>{protocol.chemicalDisinfectionStandard}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 text-xs border border-sky-200 dark:border-sky-800">
                  <strong className="font-semibold block mb-0.5">Alo Yönetim Otomasyon Garantisi:</strong>
                  <span>{protocol.aloYonetimGuarantee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Water Lab Parameters */}
      {activeTab === 'lab' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WATER_LAB_INSPECTION_CRITERIA.map(criterion => (
              <div
                key={criterion.parameterCode}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs text-slate-400 font-mono block mb-1">
                    {criterion.inspectionFrequency}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    {criterion.parameterName}
                  </h3>
                  <div className="text-base font-extrabold text-sky-600 dark:text-sky-400 font-mono mb-3">
                    {criterion.legalLimit}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 text-xs border border-rose-200 dark:border-rose-900">
                  <strong className="font-semibold block mb-0.5">Sağlık Riski:</strong>
                  <span>{criterion.healthRiskIfContaminated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Alo Yönetim Legal Guarantee Banner */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">sanitizer</span>
          </div>
          <div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
              Alo Yönetim 6 Aylık Sertifikalı Su Deposu Dezenfeksiyon Güvencesi
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Temizliklerimiz Sağlık Bakanlığı onaylı biyosidal ürünlerle yapılır; TÜRKAK akredite analiz raporu teslim edilir.
            </div>
          </div>
        </div>
        <a
          href="/iletisim"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 transition-colors shadow-sm"
        >
          Su Deposu Keşfi ve Analiz İste
        </a>
      </div>
    </section>
  );
}
