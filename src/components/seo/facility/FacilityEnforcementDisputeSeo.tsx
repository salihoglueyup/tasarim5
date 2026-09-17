"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ENFORCEMENT_DISPUTE_ROUTES,
  ENFORCEMENT_PROCEDURE_STAGES,
  ENFORCEMENT_PENALTIES,
  TENANT_LIABILITY_RULES,
  EnforcementDisputeRoute
} from '@/data/facilityEnforcementDisputeData';

interface FacilityEnforcementDisputeSeoProps {
  className?: string;
  defaultRoute?: 'itirazin_kaldirilmasi' | 'itirazin_iptali';
}

export default function FacilityEnforcementDisputeSeo({
  className = '',
  defaultRoute = 'itirazin_kaldirilmasi'
}: FacilityEnforcementDisputeSeoProps) {
  const [activeTab, setActiveTab] = useState<'routes' | 'stages' | 'penalties' | 'tenant'>('routes');
  const [selectedRouteCode, setSelectedRouteCode] = useState<'itirazin_kaldirilmasi' | 'itirazin_iptali'>(defaultRoute);

  const activeRoute = ENFORCEMENT_DISPUTE_ROUTES.find(r => r.routeCode === selectedRouteCode) || ENFORCEMENT_DISPUTE_ROUTES[0];

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://aloyonetim.com/#service-enforcement-disputes",
        "name": "Sitelerde Aidat İcra Takibi ve İtirazın İptali Hukuk Danışmanlığı",
        "serviceType": "Kat Mülkiyeti İcra Hukuku",
        "description": "2004 Sayılı İİK m.68 itirazın kaldırılması, İİK m.67 itirazın iptali davaları, %20 icra inkar tazminatı ve aylık %5 gecikme faizi tahsilat yönetimi.",
        "provider": {
          "@type": "Organization",
          "name": "Alo Yönetim İcra ve Hukuk Müşavirliği",
          "url": "https://aloyonetim.com"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "İstanbul, Türkiye"
        }
      },
      {
        "@type": "TechArticle",
        "@id": "https://aloyonetim.com/#techarticle-enforcement-guide",
        "headline": "İcra İtirazının İptali ve %20 İcra İnkar Tazminatı Rehberi",
        "description": "Ödenmeyen site aidatlarında İcra Hukuk Mahkemesi ile Sulh Hukuk Mahkemesi arasındaki farklar, 6 aylık ve 1 yıllık hak düşürücü süreler ve kiracının KMK m.22 sorumluluk sınırları.",
        "inLanguage": "tr",
        "author": {
          "@type": "Organization",
          "name": "Alo Yönetim Hukuk Direktörlüğü",
          "url": "https://aloyonetim.com"
        }
      }
    ]
  };

  return (
    <section
      aria-label="Sitelerde Aidat İcra Takibi, İtirazın İptali & İcra İnkar Tazminatı Rehberi"
      className={`relative my-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden ${className}`}
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 mb-3 border border-amber-300 dark:border-amber-700">
          <span className="material-symbols-outlined text-sm">gavel</span>
          <span>İİK Madde 67/68 & KMK Madde 20 Kapsamında İcra Rehberi</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Aidat İcra Takibi, İtirazın İptali & %20 Tazminat Kılavuzu
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Borçlunun takibe itirazı halinde İcra Hukuk (İİK m.68) vs Sulh Hukuk (İİK m.67) yolları, %20 icra inkar tazminatı, aylık %5 gecikme cezası ve kiracının yasal koruma sınırları.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'routes', label: 'İki Hukuki Yolun Kıyası', icon: 'compare_arrows' },
          { id: 'stages', label: '5 Aşamalı İcra Akışı', icon: 'timeline' },
          { id: 'penalties', label: 'Borçlu Tazminatları (%20)', icon: 'percent' },
          { id: 'tenant', label: 'Kiracı Sorumluluk Sınırı', icon: 'key' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 font-semibold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Two Enforcement Dispute Routes */}
      {activeTab === 'routes' && (
        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ENFORCEMENT_DISPUTE_ROUTES.map(route => {
              const isSelected = selectedRouteCode === route.routeCode;
              return (
                <div
                  key={route.routeCode}
                  onClick={() => setSelectedRouteCode(route.routeCode)}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/20 dark:bg-amber-950/20 ring-2 ring-amber-500/30 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                        {route.competentCourt}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Süre: {route.statutoryTimeLimit}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {route.routeName}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                        <span className="text-slate-500 dark:text-slate-400 block">Dava Süresi:</span>
                        <strong className="text-slate-900 dark:text-white font-semibold">{route.litigationDurationMonths}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                        <span className="text-slate-500 dark:text-slate-400 block">İnkar Tazminatı:</span>
                        <strong className="text-amber-700 dark:text-amber-400 font-bold">{route.executionDenialIndemnityPercentage}</strong>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 mb-4">
                      <strong className="text-slate-900 dark:text-white block mb-1">Mecburi Delil Belgeleri:</strong>
                      {route.requiredProofDocuments.map((doc, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs border border-amber-200 dark:border-amber-900">
                    <strong className="font-semibold block mb-0.5">Avukat Değerlendirmesi:</strong>
                    <span>{route.advocateEvaluation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: 5-Stage Enforcement Timeline */}
      {activeTab === 'stages' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENFORCEMENT_PROCEDURE_STAGES.map(stage => (
              <div
                key={stage.stageNumber}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-amber-600/30">
                      {stage.stageNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                        {stage.stageTitle}
                      </h3>
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                        {stage.timeframe}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {stage.proceduralAction}
                  </p>

                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs mb-3 border border-rose-200/50">
                    <strong className="block mb-0.5 font-semibold">Kritik Hukuki Risk:</strong>
                    <span>{stage.criticalLegalRisk}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-amber-800 dark:text-amber-300 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-amber-600">verified</span>
                  <span>{stage.aloYonetimProtocol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Penalties and Indemnity */}
      {activeTab === 'penalties' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ENFORCEMENT_PENALTIES.map((penalty, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2 inline-block">
                    {penalty.legalBasis}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {penalty.penaltyType}
                  </h3>
                  <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400 font-mono mb-2">
                    {penalty.rateOrAmount}
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    <strong className="text-slate-900 dark:text-white">Uygulanma Şartı: </strong>
                    {penalty.applicabilityCondition}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 text-xs border border-rose-200 dark:border-rose-900">
                  <strong className="font-semibold block mb-0.5">Borçluya Ağır Mali Yükü:</strong>
                  <span>{penalty.debtorImpact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Tenant Liability & Statutory Mortgage */}
      {activeTab === 'tenant' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TENANT_LIABILITY_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mb-2 inline-block">
                    {rule.kmkArticleRef}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {rule.liabilityAspect}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    <strong className="text-slate-900 dark:text-white">Yasal Kural: </strong>
                    {rule.legalRule}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs border border-amber-200 dark:border-amber-800">
                  <strong className="font-semibold block mb-1">Koruma & Uygulama Mekanizması:</strong>
                  <span>{rule.protectionMechanism}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Alo Yönetim Legal Guarantee Banner */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">account_balance</span>
          </div>
          <div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
              Alo Yönetim Hukuk Departmanı & Sıfır Tahsilat Riski
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              İcra takiplerimiz UYAP entegrasyonuyla yönetilir; haksız itirazlar %20 tazminatla sonuçlandırılır.
            </div>
          </div>
        </div>
        <a
          href="/iletisim"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 transition-colors shadow-sm"
        >
          İcra & Hukuki Takip Başlat
        </a>
      </div>
    </section>
  );
}
