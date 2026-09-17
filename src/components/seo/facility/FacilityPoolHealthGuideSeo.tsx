"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  POOL_WATER_PARAMETERS,
  POOL_REGULATION_RULES,
  POOL_HYGIENE_STEPS,
  POOL_CHEMICAL_DOSING_RULES,
  PoolWaterParameter
} from '@/data/facilityPoolHealthData';

interface FacilityPoolHealthGuideSeoProps {
  className?: string;
  defaultScopeFilter?: 'Tümü' | 'Açık Havuz' | 'Kapalı Havuz';
}

export default function FacilityPoolHealthGuideSeo({
  className = '',
  defaultScopeFilter = 'Tümü'
}: FacilityPoolHealthGuideSeoProps) {
  const [activeTab, setActiveTab] = useState<'parameters' | 'legal' | 'protocol' | 'chemicals'>('parameters');
  const [selectedScope, setSelectedScope] = useState<'Tümü' | 'Açık Havuz' | 'Kapalı Havuz'>(defaultScopeFilter);
  const [expandedParamId, setExpandedParamId] = useState<string | null>(null);

  const filteredParameters = POOL_WATER_PARAMETERS.filter(param => {
    if (selectedScope === 'Tümü') return true;
    return param.scope === selectedScope || param.scope === 'Her İkisi';
  });

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://aloyonetim.com/#techarticle-pool-health-guide",
        "headline": "Yüzme Havuzları Sağlık Esasları, Kimyasal Dezenfeksiyon ve Su Standartları Rehberi",
        "description": "T.C. Sağlık Bakanlığı ve TSE 11899 standartlarında site açık ve kapalı havuzlarında serbest klor, bağlı klor, pH limitleri, kimya kütüğü ve operatör sorumlulukları.",
        "inLanguage": "tr",
        "author": {
          "@type": "Organization",
          "name": "Alo Yönetim Tesis & Havuz Operasyonları Direktörlüğü",
          "url": "https://aloyonetim.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Alo Yönetim",
          "url": "https://aloyonetim.com"
        },
        "about": [
          "Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik",
          "TSE 11899 Yüzme Havuzu Standartları",
          "Havuz Klor ve pH Dengesi",
          "Havuz Suyu Operatörlüğü Sertifikasyonu"
        ]
      },
      {
        "@type": "GovernmentPermit",
        "@id": "https://aloyonetim.com/#permit-pool-operation",
        "name": "Resmi Havuz İşletme ve Denetim İzin Standartları",
        "serviceType": "Havuz Sağlık ve Sanitasyon Uygunluğu",
        "issuedBy": {
          "@type": "GovernmentOrganization",
          "name": "T.C. Sağlık Bakanlığı İl Sağlık Müdürlüğü Halk Sağlığı Hizmetleri"
        },
        "validIn": {
          "@type": "AdministrativeArea",
          "name": "İstanbul, Türkiye"
        }
      }
    ]
  };

  return (
    <section 
      aria-label="Yüzme Havuzları Sağlık Esasları & Kimyasal Dezenfeksiyon Rehberi"
      className={`relative my-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden ${className}`}
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300 mb-3 border border-cyan-300 dark:border-cyan-700">
          <span className="material-symbols-outlined text-sm">pool</span>
          <span>T.C. Sağlık Bakanlığı & TSE 11899 Uyumlu</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Site Yüzme Havuzları Sağlık Esasları & Kimyasal Standartlar
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Siteler ve rezidanslarda toplu kullanılan açık ve kapalı havuzların klor-pH dengesi, mikrobiyolojik su güvenliği, yasal havuz defteri tutulması ve operatörlük sorumlulukları kılavuzu.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'parameters', label: 'Su Parametreleri & Limitler', icon: 'science' },
          { id: 'legal', label: 'Yönetmelik & Yasal Yaptırımlar', icon: 'gavel' },
          { id: 'protocol', label: '4 Aşamalı Bakım Protokolü', icon: 'checklist' },
          { id: 'chemicals', label: 'Kimyasal Güvenlik & Depolama', icon: 'warning' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Water Parameters */}
      {activeTab === 'parameters' && (
        <div className="relative z-10 space-y-6">
          {/* Scope Filters */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-cyan-600">tune</span>
              Havuz Tipine Göre Filtrele:
            </span>
            <div className="flex gap-1.5">
              {(['Tümü', 'Açık Havuz', 'Kapalı Havuz'] as const).map(scope => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => setSelectedScope(scope)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    selectedScope === scope
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {scope}
                </button>
              ))}
            </div>
          </div>

          {/* Parameter Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredParameters.map(param => {
              const isExpanded = expandedParamId === param.id;
              return (
                <div
                  key={param.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900/80 ${
                    isExpanded
                      ? 'border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                          {param.scope}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {param.testFrequency}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">
                        {param.parameterName}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                        {param.idealRange}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {param.unit}
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {param.criticalRiskDescription}
                  </p>

                  <button
                    type="button"
                    onClick={() => setExpandedParamId(isExpanded ? null : param.id)}
                    className="mt-3 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Detayları Kapat' : 'Risk & Düzeltici Eylemi Gör'}</span>
                    <span className="material-symbols-outlined text-sm">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {/* Expandable Health Risk & Action */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs"
                      >
                        <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/50">
                          <strong className="font-semibold block mb-0.5">⚠️ Sapma Durumundaki Sağlık Riski:</strong>
                          <span>{param.healthRiskIfDeviated}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50">
                          <strong className="font-semibold block mb-0.5">✅ Alo Yönetim Düzeltici Protokolü:</strong>
                          <span>{param.correctiveAction}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Legal Regulations */}
      {activeTab === 'legal' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POOL_REGULATION_RULES.map(rule => (
              <div
                key={rule.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      {rule.articleRef}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {rule.requirement}
                  </p>

                  <div className="space-y-2 text-xs mb-4">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                      <strong className="font-semibold text-slate-900 dark:text-white block mb-0.5">Hukuki ve Cezai Sorumluluk:</strong>
                      <span>{rule.legalLiability}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200/50">
                      <strong className="font-semibold block mb-0.5">Resmi İdari Yaptırım:</strong>
                      <span>{rule.penalSanction}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-cyan-700 dark:text-cyan-300 font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-cyan-600">verified</span>
                  <span>{rule.aloYonetimGuarantee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 4-Step Maintenance Protocol */}
      {activeTab === 'protocol' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POOL_HYGIENE_STEPS.map(step => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-cyan-600/30">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{step.operatorRole}</span>
                      <span>•</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">{step.frequency}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {step.details}
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  <span className="material-symbols-outlined text-sm text-cyan-600">description</span>
                  <span>Kayıt Belgesi: {step.recordDocument}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Chemicals & Safety Rules */}
      {activeTab === 'chemicals' && (
        <div className="relative z-10 space-y-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl text-amber-900 dark:text-amber-200 text-xs md:text-sm flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-600 text-xl shrink-0 mt-0.5">warning</span>
            <div>
              <strong className="font-semibold block mb-1">Hayati İSG Uyarısı (Klor ve Asit Teması):</strong>
              <span>
                Sıvı klor ile pH düşürücü asit kesinlikle aynı ortamda depolanmamalı ve asla doğrudan birbirine karıştırılmamalıdır. Temas anında saliseler içinde ölümcül klor gazı (Cl2) açığa çıkarak ciğer ödemi ve solunum durmasına yol açar.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POOL_CHEMICAL_DOSING_RULES.map((chem, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {chem.chemicalName}
                    </h3>
                    <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
                      {chem.chemicalFormulaOrType}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold">Kullanım Amacı:</strong> {chem.purpose}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                    <strong className="font-semibold block text-slate-900 dark:text-white mb-0.5">Depolama Koşulu:</strong>
                    <span>{chem.storageRequirement}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                    <strong className="font-semibold block mb-0.5">Dozajlama Metodu:</strong>
                    <span>{chem.dosingMethod}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900">
                    <strong className="font-semibold block mb-0.5">Kritik Güvenlik Tedbiri:</strong>
                    <span>{chem.safetyWarning}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Alo Yönetim Legal Guarantee Banner */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">verified_user</span>
          </div>
          <div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
              Alo Yönetim Havuz Güvenliği ve Sertifikalı Operatör Teminatı
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Tüm açık/kapalı havuzlarımız MEB/TSSF lisanslı operatörlerimizce yönetilir; aylık TÜRKAK akredite analizler yapılır.
            </div>
          </div>
        </div>
        <a
          href="/iletisim"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 transition-colors shadow-sm"
        >
          Havuz Sağlık Uygunluk Keşfi İste
        </a>
      </div>
    </section>
  );
}
