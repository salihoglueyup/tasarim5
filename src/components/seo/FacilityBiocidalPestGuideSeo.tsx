"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PEST_SPECIES_PROTOCOLS,
  BIOCIDAL_REGULATION_REQUIREMENTS,
  IPM_APPLICATION_STEPS,
  RESIDENTIAL_PEST_SAFETY_CHECKLIST,
  PestSpeciesProtocol
} from '@/data/facilityBiocidalPestData';

interface FacilityBiocidalPestGuideSeoProps {
  className?: string;
}

export default function FacilityBiocidalPestGuideSeo({
  className = ''
}: FacilityBiocidalPestGuideSeoProps) {
  const [activeTab, setActiveTab] = useState<'species' | 'regulations' | 'ipm' | 'safety'>('species');
  const [selectedPestId, setSelectedPestId] = useState<string>(PEST_SPECIES_PROTOCOLS[0].id);

  const activePest = PEST_SPECIES_PROTOCOLS.find(p => p.id === selectedPestId) || PEST_SPECIES_PROTOCOLS[0];

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://aloyonetim.com/#service-biocidal-pest-control",
        "name": "Sitelerde Biyosidal Haşere İlaçlama ve Dezenfeksiyon Hizmeti",
        "serviceType": "Entegre Zararlı Yönetimi (IPM)",
        "description": "T.C. Sağlık Bakanlığı onaylı biyosidal ürünlerle kokusuz hamamböceği jeli, kilitli kemirgen istasyonları ve ULV soğuk sisleme uygulamaları.",
        "provider": {
          "@type": "Organization",
          "name": "Alo Yönetim Çevre Sağlığı ve İlaçlama Birimi",
          "url": "https://aloyonetim.com"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "İstanbul, Türkiye"
        }
      },
      {
        "@type": "GovernmentPermit",
        "@id": "https://aloyonetim.com/#permit-biocidal-application",
        "name": "Biyosidal Ürün Uygulama İzin Belgesi ve Mesul Müdürlük Standardı",
        "serviceType": "Halk Sağlığı Alanında İlaçlama Yetkisi",
        "issuedBy": {
          "@type": "GovernmentOrganization",
          "name": "T.C. Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü"
        }
      }
    ]
  };

  return (
    <section
      aria-label="Sitelerde Biyosidal Haşere İlaçlama & Sağlık Bakanlığı Ruhsat Rehberi"
      className={`relative my-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden ${className}`}
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 mb-3 border border-emerald-300 dark:border-emerald-700">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span>Sağlık Bakanlığı Ruhsatlı & WHO IPM Standartlarında</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sitelerde Biyosidal Haşere İlaçlama & Yasal Mevzuat Kılavuzu
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Siteler, rezidanslar ve ortak tesislerde haşere ve kemirgenlerle mücadelede yasal Biyosidal Uygulama İzin Belgesi, mesul müdürlük şartı, kilitli yem istasyonları ve 48 saat önceden bildirim kuralları.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'species', label: 'Zararlı Türleri & Mücadele', icon: 'pest_control' },
          { id: 'regulations', label: 'Yasal Ruhsat & Mevzuat', icon: 'shield' },
          { id: 'ipm', label: 'Entegre Yönetim (IPM) Adımları', icon: 'account_tree' },
          { id: 'safety', label: 'Sakin & Hayvan Güvenliği', icon: 'pets' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Pest Species Protocols */}
      {activeTab === 'species' && (
        <div className="relative z-10 space-y-6">
          {/* Quick Select Buttons */}
          <div className="flex flex-wrap gap-2">
            {PEST_SPECIES_PROTOCOLS.map(pest => (
              <button
                key={pest.id}
                type="button"
                onClick={() => setSelectedPestId(pest.id)}
                className={`px-3 py-2 text-xs md:text-sm rounded-xl font-medium transition-all ${
                  selectedPestId === pest.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {pest.pestName.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Active Pest Detail Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {activePest.activeMethod}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {activePest.pestName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {activePest.scientificName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-lg font-semibold flex items-center gap-1 ${
                  activePest.evacuationNeeded
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                    : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                }`}>
                  <span className="material-symbols-outlined text-sm">
                    {activePest.evacuationNeeded ? 'door_front' : 'check_circle'}
                  </span>
                  {activePest.evacuationNeeded
                    ? `Tahliye Şart (${activePest.evacuationDurationHours} Saat)`
                    : 'Evden Çıkmaya Gerek Yok (Kokusuz Jel)'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <strong className="text-slate-900 dark:text-white block mb-1">Yuvalanma ve Hedef Noktalar:</strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activePest.targetLocations.map((loc, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs border border-slate-200 dark:border-slate-600">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <strong className="text-slate-900 dark:text-white block mb-1">Ruhsatlı Kimyasal Formülasyonu:</strong>
                <span className="text-slate-600 dark:text-slate-300 text-xs">
                  {activePest.chemicalCategory}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs md:text-sm">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                <span className="material-symbols-outlined text-emerald-600 text-base">verified</span>
                <span>Alo Yönetim Kurumsal Uygulama Protokolü & Periyot:</span>
              </div>
              <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                {activePest.aloYonetimProtocol}
              </p>
              <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                Tekrar Periyodu: {activePest.reapplicationCycle}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Legal Regulations */}
      {activeTab === 'regulations' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BIOCIDAL_REGULATION_REQUIREMENTS.map(req => (
              <div
                key={req.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2 inline-block">
                    {req.issuingAuthority}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {req.documentOrRule}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {req.legalMandate}
                  </p>
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs mb-3 border border-rose-200/50">
                    <strong className="font-semibold block mb-0.5">Yasadışı / Ruhsatsız Uygulama Yaptırımı:</strong>
                    <span>{req.penaltyForUnlicensed}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>
                  <span>{req.aloYonetimCompliance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Integrated Pest Management (IPM) Steps */}
      {activeTab === 'ipm' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {IPM_APPLICATION_STEPS.map(step => (
              <div
                key={step.stepNo}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-emerald-600/30">
                    {step.stepNo}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                      {step.phaseName}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Sorumlu: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{step.responsibleTitle}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {step.actionSummary}
                </p>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">Teknik Ekipman: </span>
                    <span>{step.technicalEquipment}</span>
                  </div>
                  {step.residentNoticeRequired && (
                    <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-medium">
                      📢 48 Saat Önceden Kat Maliklerine SMS & Pano Bildirimi Zorunludur.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Residents & Pets Safety Checklist */}
      {activeTab === 'safety' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESIDENTIAL_PEST_SAFETY_CHECKLIST.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-emerald-600 text-xl">health_and_safety</span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {item.riskType}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-2 inline-block">
                    Hedef: {item.targetGroup}
                  </span>
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs mb-3 border border-rose-200/50">
                    <strong className="font-semibold block mb-0.5">Olası Tehlike:</strong>
                    <span>{item.hazardDescription}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs border border-emerald-200/60 dark:border-emerald-800">
                  <strong className="font-semibold block mb-0.5">Alo Yönetim Emniyet Protokolü:</strong>
                  <span>{item.precautionInstruction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Alo Yönetim Legal Guarantee Banner */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">security</span>
          </div>
          <div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
              Alo Yönetim Biyosidal Güvencesi & 21 Gün Kontrol Garantisi
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Uygulamalarımız resmi Sağlık Bakanlığı Ek-1 tutanağı ile belgelenir; 21 gün içinde ücretsiz kontrol sağlanır.
            </div>
          </div>
        </div>
        <a
          href="/iletisim"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors shadow-sm"
        >
          Ücretsiz Haşere & Rögar Keşfi İste
        </a>
      </div>
    </section>
  );
}
