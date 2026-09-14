"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  OHS_HAZARD_CLASSES,
  OHS_MANDATORY_DOCUMENTS,
  EMERGENCY_RESPONSE_TEAMS,
  OHS_ADMINISTRATIVE_PENALTIES,
  OhsHazardClassRule
} from '@/data/facilityOccupationalHealthSafetyData';

interface FacilityOccupationalHealthSafetySeoProps {
  className?: string;
  defaultHazardClass?: 'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli';
}

export default function FacilityOccupationalHealthSafetySeo({
  className = '',
  defaultHazardClass = 'Az Tehlikeli'
}: FacilityOccupationalHealthSafetySeoProps) {
  const [activeTab, setActiveTab] = useState<'hazard' | 'documents' | 'teams' | 'penalties'>('hazard');
  const [selectedHazard, setSelectedHazard] = useState<'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli'>(defaultHazardClass);

  const activeHazard = OHS_HAZARD_CLASSES.find(h => h.hazardClass === selectedHazard) || OHS_HAZARD_CLASSES[0];

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://aloyonetim.com/#techarticle-ohs-guide",
        "headline": "Sitelerde 6331 Sayılı İSG Kanunu, Risk Analizi ve Acil Durum Ekipleri Rehberi",
        "description": "Bina ve sitelerde çalışan personelin iş sağlığı ve güvenliği yükümlülükleri, 6 yıllık risk değerlendirmesi, 4 zorunlu acil ekip ve yöneticinin şahsi cezai sorumlulukları.",
        "inLanguage": "tr",
        "author": {
          "@type": "Organization",
          "name": "Alo Yönetim İSG ve Tesis Güvenliği Direktörlüğü",
          "url": "https://aloyonetim.com"
        }
      },
      {
        "@type": "GovernmentPermit",
        "@id": "https://aloyonetim.com/#permit-ohs-compliance",
        "name": "İş Sağlığı ve Güvenliği Mevzuat Uygunluk Standartları",
        "serviceType": "6331 İSG Yasal Uygunluk",
        "issuedBy": {
          "@type": "GovernmentOrganization",
          "name": "T.C. Çalışma ve Sosyal Güvenlik Bakanlığı İş Teftiş Kurulu"
        }
      }
    ]
  };

  return (
    <section
      aria-label="Sitelerde 6331 Sayılı İSG Kanunu, Risk Analizi & Acil Ekipler Rehberi"
      className={`relative my-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden ${className}`}
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 mb-3 border border-orange-300 dark:border-orange-700">
          <span className="material-symbols-outlined text-sm">health_and_safety</span>
          <span>6331 Sayılı İSG Kanunu & T.C. Çalışma Bakanlığı Mevzuatı</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sitelerde İSG Kanunu, Risk Analizi & Acil Durum Ekipleri
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Sitelerin işveren sıfatı, 6 yıllık risk değerlendirmesi, 4 zorunlu acil ekip, personel periyodik sağlık raporları ve iş kazalarında yöneticinin şahsi malvarlığı ile hapis cezası riskleri.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'hazard', label: 'Tehlike Sınıfları Kriterleri', icon: 'warning' },
          { id: 'documents', label: 'Zorunlu 5 İSG Belgesi', icon: 'folder_managed' },
          { id: 'teams', label: '4 Acil Durum Ekibi', icon: 'group_work' },
          { id: 'penalties', label: 'Yöneticinin Şahsi Cezaları', icon: 'shield_with_heart' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Hazard Classes */}
      {activeTab === 'hazard' && (
        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {OHS_HAZARD_CLASSES.map(hazard => (
              <button
                key={hazard.hazardClass}
                type="button"
                onClick={() => setSelectedHazard(hazard.hazardClass)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedHazard === hazard.hazardClass
                    ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 ring-2 ring-orange-500/30 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2 inline-block">
                  Yenileme: {hazard.riskAssessmentValidityYears} Yıl
                </span>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  {hazard.hazardClass}
                </div>
              </button>
            ))}
          </div>

          {/* Active Hazard Detail Card */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeHazard.hazardClass} Kapsamındaki Siteler ve Binalar
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1">
                {activeHazard.siteScopeDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <strong className="text-slate-900 dark:text-white block mb-1">İSG Uzmanı Görevlendirme Kriteri:</strong>
                <span className="text-slate-600 dark:text-slate-300">{activeHazard.isgUzmaniRequirement}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <strong className="text-slate-900 dark:text-white block mb-1">İşyeri Hekimi ve Sağlık Muayeneleri:</strong>
                <span className="text-slate-600 dark:text-slate-300">{activeHazard.isyeriHekimiRequirement}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 text-xs border border-orange-200 dark:border-orange-800">
              <strong className="font-semibold block mb-0.5">Alo Yönetim Kurumsal İSG Kalkanı:</strong>
              <span>{activeHazard.aloYonetimProtocol}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 5 Mandatory Documents */}
      {activeTab === 'documents' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OHS_MANDATORY_DOCUMENTS.map(doc => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2 inline-block">
                    {doc.statutoryBasis}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {doc.documentTitle}
                  </h3>
                  <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-2">
                    Zorunlu Periyot: {doc.mandatoryFrequency}
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    <strong className="text-slate-900 dark:text-white">Denetim Önemi: </strong>
                    {doc.criticalInspectionSignificance}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs border border-rose-200/50">
                  <strong className="font-semibold block mb-0.5">Eksiklik Cezası:</strong>
                  <span>{doc.nonCompliancePenalty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 4 Emergency Teams */}
      {activeTab === 'teams' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EMERGENCY_RESPONSE_TEAMS.map(team => (
              <div
                key={team.teamCode}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {team.teamName}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300">
                      {team.minimumStaffRatio}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
                    Gerekli Belge: {team.requiredCertification}
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 mb-3">
                    <strong className="text-slate-900 dark:text-white block mb-1">Acil Durum Görevleri:</strong>
                    {team.primaryDutiesInSite.map((duty, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>{duty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                  <strong className="font-semibold block mb-0.5 text-slate-900 dark:text-white">Zorunlu Donanım:</strong>
                  <span>{team.mandatoryEquipment.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Penalties and Personal Liability */}
      {activeTab === 'penalties' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OHS_ADMINISTRATIVE_PENALTIES.map((penalty, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                      {penalty.penaltySeverityLevel}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {penalty.kanunArticleRef}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-2">
                    {penalty.violationDescription}
                  </h3>

                  <div className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-3">
                    {penalty.penaltyAmountRange}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 text-xs border border-rose-200 dark:border-rose-900">
                  <strong className="font-semibold block mb-0.5">Yöneticinin Şahsi Sorumluluğu:</strong>
                  <span>{penalty.managementPersonalLiability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Alo Yönetim Legal Guarantee Banner */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">security</span>
          </div>
          <div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
              Alo Yönetim İSG Kalkanı & %100 Yasal Sorumluluk Güvencesi
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Personel hizmet alımı ile yöneticinin şahsi hapis ve SGK rücu tazminatı riskleri tamamen sıfırlanır.
            </div>
          </div>
        </div>
        <a
          href="/iletisim"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-orange-600 hover:bg-slate-800 dark:hover:bg-orange-500 transition-colors shadow-sm"
        >
          Site İSG Risk Denetimi İste
        </a>
      </div>
    </section>
  );
}
