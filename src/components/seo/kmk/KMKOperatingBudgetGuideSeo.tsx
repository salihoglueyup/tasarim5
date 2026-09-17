"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BUDGET_ESTIMATED_EXPENSES,
  EXPENSE_ALLOCATION_RULES,
  BUDGET_NOTIFICATION_TIMELINE,
  BUDGET_LEGAL_PRECEDENTS,
  BudgetItemDefinition
} from '@/data/kmkOperatingBudgetData';

interface KMKOperatingBudgetGuideSeoProps {
  className?: string;
  defaultCategory?: string;
}

export default function KMKOperatingBudgetGuideSeo({
  className = '',
  defaultCategory = 'tumu'
}: KMKOperatingBudgetGuideSeoProps) {
  const [activeTab, setActiveTab] = useState<'expenses' | 'rules' | 'timeline' | 'precedents'>('expenses');
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [copiedTimelineStep, setCopiedTimelineStep] = useState<number | null>(null);

  const filteredExpenses = BUDGET_ESTIMATED_EXPENSES.filter(item => {
    if (selectedCategory === 'tumu') return true;
    return item.category === selectedCategory;
  });

  const copyStepDetails = (step: any) => {
    const textToCopy = `KMK m.37 İşletme Projesi Prosedürü: ${step.phaseName}\nSüre: ${step.timeframe}\nYasal Usul: ${step.legalProcedure}\nGeçerli Tebliğ: ${step.validNotificationMethods.join(', ')}\nHukuki Sonuç: ${step.legalConsequence}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedTimelineStep(step.stepNo);
      setTimeout(() => setCopiedTimelineStep(null), 2500);
    }
  };

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Legislation",
        "@id": "https://aloyonetim.com/#legislation-kmk-m37",
        "name": "634 Sayılı Kat Mülkiyeti Kanunu Madde 37 - İşletme Projesinin Yapılması ve Tebliği",
        "legislationType": "Statute",
        "legislationJurisdiction": {
          "@type": "AdministrativeArea",
          "name": "Türkiye"
        },
        "description": "Kat mülkiyetine tabi binalarda 1 yıllık tahmini bütçe tanzimi, bağımsız bölümlere paylaştırma, 7 günlük itiraz süresi ve İİK m.68 uyarınca ilam niteliğinde belge kesinleşmesi."
      },
      {
        "@type": "TechArticle",
        "@id": "https://aloyonetim.com/#techarticle-operating-budget-guide",
        "headline": "Sitelerde İşletme Projesi Hazırlama, Tebliğ ve Kesinleşme Rehberi",
        "description": "KMK m.20 ve m.37 uyarınca eşit ve arsa payına göre gider dağıtımı, tebligat usulleri ve itirazın iptali davalarında delil niteliği.",
        "inLanguage": "tr",
        "author": {
          "@type": "Organization",
          "name": "Alo Yönetim Mali ve Hukuki İşler Direktörlüğü",
          "url": "https://aloyonetim.com"
        }
      }
    ]
  };

  return (
    <section
      aria-label="KMK Madde 37 İşletme Projesi ve Aidat Dağıtım Rehberi"
      className={`relative my-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden ${className}`}
    >
      {/* Schema.org Linked Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 mb-3 border border-blue-300 dark:border-blue-700">
          <span className="material-symbols-outlined text-sm">balance</span>
          <span>KMK Madde 37 & İİK Madde 68 İlam Hükmünde Belge</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          İşletme Projesi Hazırlama, Tebliğ & Kesinleşme Rehberi
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Sitelerde tahmini bütçenin tanzimi, KMK m.20 eşit ve arsa payı paylaştırma kuralları, 7 günlük yasal itiraz süresi ve icra takibinde borçluyu durduran ilam gücü standardı.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'expenses', label: 'Bütçe Gider Kalemleri', icon: 'receipt_long' },
          { id: 'rules', label: 'KMK m.20 Dağıtım Esasları', icon: 'pie_chart' },
          { id: 'timeline', label: 'Tebliğ ve Kesinleşme Süreci', icon: 'hourglass_top' },
          { id: 'precedents', label: 'Yargıtay Emsal İçtihatları', icon: 'gavel' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Budget Expenses */}
      {activeTab === 'expenses' && (
        <div className="relative z-10 space-y-6">
          {/* Category Filter */}
          <div className="flex items-center justify-between flex-wrap gap-2 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-blue-600">filter_alt</span>
              Kategori Filtresi:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: 'tumu', label: 'Tümü' },
                { key: 'personel', label: 'Personel' },
                { key: 'enerji_altyapi', label: 'Enerji & Altyapı' },
                { key: 'periyodik_bakim', label: 'Teknik Bakım' },
                { key: 'yonetim_guvenlik', label: 'Yönetim / Yazılım' },
                { key: 'yatirim_avans', label: 'Demirbaş Fonu' }
              ].map(cat => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    selectedCategory === cat.key
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expenses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExpenses.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {item.kmkDistributionBasis}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.categoryTitle}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {item.expenseName}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {item.expenseDescription}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 mb-3">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">Yasal Dağıtım Mantığı:</strong>
                    <span>{item.calculationRationale}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs border border-amber-200 dark:border-amber-900">
                  <strong className="font-semibold block mb-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-600 text-sm">warning</span>
                    Sitelerde En Sık Yapılan Hata:
                  </strong>
                  <span>{item.budgetingPitfall}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Allocation Rules (KMK m.20) */}
      {activeTab === 'rules' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXPENSE_ALLOCATION_RULES.map(rule => (
              <div
                key={rule.ruleCode}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                      {rule.kmkArticleRef}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {rule.title}
                  </h3>
                  <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 font-mono text-xs font-semibold mb-3 border border-blue-200/50 dark:border-blue-900/40">
                    Formül: {rule.distributionMethod}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
                    <strong className="text-slate-900 dark:text-white block mb-1">Bu Maddeye Giren Giderler:</strong>
                    {rule.coveredExpenseTypes.map((type, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700">
                  <strong className="font-semibold block mb-0.5 text-slate-900 dark:text-white">Yasal İstisna ve Kural:</strong>
                  <span>{rule.exemptionsOrSpecialCases}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Timeline & Delivery (KMK m.37) */}
      {activeTab === 'timeline' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUDGET_NOTIFICATION_TIMELINE.map(step => (
              <div
                key={step.stepNo}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-600/30">
                        {step.stepNo}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                          {step.phaseName}
                        </h3>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {step.timeframe}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyStepDetails(step)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-300 font-medium transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copiedTimelineStep === step.stepNo ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedTimelineStep === step.stepNo ? 'Kopyalandı' : 'Kopyala'}</span>
                    </button>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {step.legalProcedure}
                  </p>

                  <div className="space-y-2 text-xs mb-3">
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <strong className="block text-slate-900 dark:text-white mb-0.5">Geçerli Tebliğ Usulleri:</strong>
                      <span>{step.validNotificationMethods.join(', ')}</span>
                    </div>

                    <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200/50">
                      <strong className="block mb-0.5">Hukuki Sonuç:</strong>
                      <span>{step.legalConsequence}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-blue-700 dark:text-blue-300 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-blue-600">verified</span>
                  <span>{step.aloYonetimStandard}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Supreme Court Precedents */}
      {activeTab === 'precedents' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUDGET_LEGAL_PRECEDENTS.map((precedent, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2 inline-block font-mono">
                    {precedent.courtAndEmsalNo}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {precedent.caseTitle}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    <strong className="text-slate-800 dark:text-slate-200">Uyuşmazlık: </strong>
                    {precedent.summaryDispute}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 mb-3 border border-slate-200/80 dark:border-slate-700">
                    <strong className="font-semibold block mb-1 text-slate-900 dark:text-white">Yargıtay Hükmü:</strong>
                    <span>{precedent.courtVerdict}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 text-xs border border-blue-200 dark:border-blue-800">
                  <strong className="font-semibold block mb-0.5">Alo Yönetim Hukuk Zırhı:</strong>
                  <span>{precedent.managementShieldAdvice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Alo Yönetim Legal Guarantee Banner */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">verified_user</span>
          </div>
          <div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
              Alo Yönetim Kusursuz Bütçe & Kesinleşme Güvencesi
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              İşletme projelerimiz İİK m.68 ilam şartlarına uygun tebliğ edilir; icra takipleriniz itirazla durdurulamaz.
            </div>
          </div>
        </div>
        <a
          href="/iletisim"
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors shadow-sm"
        >
          İşletme Projesi Danışmanlığı İste
        </a>
      </div>
    </section>
  );
}
