"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import CallbackForm from '@/components/cro/CallbackForm';
import { ChecklistAuditSeo, QuizAuditScoreSeo } from '@/components/seo';
import FacilityAuditReportModal from '@/components/modals/FacilityAuditReportModal';
import { calculateDues, CalcConfig } from '@/lib/hesaplayici';

export default function CalculatorClient({ initialConfig }: { initialConfig: CalcConfig }) {
  const { t } = useLanguage();
  const [units, setUnits] = useState<number>(45);
  const [blocks, setBlocks] = useState<number>(3);
  const [elevators, setElevators] = useState<number>(6);
  const [hasSecurity, setHasSecurity] = useState<boolean>(true);
  const [hasPool, setHasPool] = useState<boolean>(true);
  const [hasGreenSpace, setHasGreenSpace] = useState<boolean>(true);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);

  // Aidat tahmini — saf fonksiyon (src/lib/hesaplayici.ts, birim test kapsamında).
  const { estimatedDuesPerUnit, totalMonthlyBudget, estimatedSavings } = calculateDues({
    units,
    elevators,
    hasSecurity,
    hasPool,
    hasGreenSpace,
  }, initialConfig);

  return (
    <>
      <PageHeader 
        title={t('calc_page_title')} 
        description={t('calc_page_desc')} 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/50 shadow-sm flex flex-col gap-10">
            
            <h2 className="text-2xl font-bold text-[var(--color-primary)] flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-900 dark:text-white text-3xl">tune</span>
              {t('calc_params_title')}
            </h2>

            {/* Slider: Daire Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">{t('calc_unit_label')}</label>
                <span className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white px-4 py-1.5 rounded-full font-bold text-lg">{units} {t('calc_unit_val')}</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={500} 
                step={5}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
            </div>

            {/* Slider: Blok Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">{t('calc_block_label')}</label>
                <span className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white px-4 py-1.5 rounded-full font-bold text-lg">{blocks} {t('calc_block_val')}</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={30} 
                step={1}
                value={blocks}
                onChange={(e) => setBlocks(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
            </div>

            {/* Slider: Asansör Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">{t('calc_elev_label')}</label>
                <span className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white px-4 py-1.5 rounded-full font-bold text-lg">{elevators} {t('calc_elev_val')}</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={40} 
                step={1}
                value={elevators}
                onChange={(e) => setElevators(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
            </div>

            <hr className="border-[var(--color-outline)]/30 my-2" />

            {/* Feature Toggles */}
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg text-[var(--color-primary)]">{t('calc_feat_title')}</h3>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">shield</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">{t('calc_feat_sec')}</div>
                    <div className="text-xs text-[var(--color-secondary)]">{t('calc_feat_sec_desc')}</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasSecurity} 
                  onChange={(e) => setHasSecurity(e.target.checked)}
                  className="w-6 h-6 rounded accent-slate-900 dark:accent-white cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">pool</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">{t('calc_feat_pool')}</div>
                    <div className="text-xs text-[var(--color-secondary)]">{t('calc_feat_pool_desc')}</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasPool} 
                  onChange={(e) => setHasPool(e.target.checked)}
                  className="w-6 h-6 rounded accent-slate-900 dark:accent-white cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">park</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">{t('calc_feat_green')}</div>
                    <div className="text-xs text-[var(--color-secondary)]">{t('calc_feat_green_desc')}</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasGreenSpace} 
                  onChange={(e) => setHasGreenSpace(e.target.checked)}
                  className="w-6 h-6 rounded accent-slate-900 dark:accent-white cursor-pointer"
                />
              </div>

            </div>

          </div>

          {/* Results Summary Card Sticky */}
          <div className="lg:col-span-5 sticky top-28">
            <motion.div 
              layout
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">calculate</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-white/10 text-slate-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                  {t('calc_report_tag')}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-gray-300 text-sm font-light">{t('calc_report_dues_label')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold tracking-tight">₺{estimatedDuesPerUnit.toLocaleString()}</span>
                  <span className="text-gray-300 text-lg">{t('calc_report_per_month')}</span>
                </div>
              </div>

              <hr className="border-white/15" />

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400">{t('calc_report_budget_label')}</span>
                  <span className="text-2xl font-bold">₺{totalMonthlyBudget.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-semibold">{t('calc_report_savings_label')}</span>
                  <span className="text-2xl font-bold text-slate-400">~₺{estimatedSavings.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex items-start gap-3">
                <span className="material-symbols-outlined text-slate-400 shrink-0 mt-0.5">verified</span>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {t('calc_report_info')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link 
                  href="/teklif-al"
                  className="flex-1 bg-white text-slate-950 hover:bg-gray-100 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg text-sm"
                >
                  {t('calc_btn_quote')}
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>

                <button 
                  onClick={() => setIsAuditModalOpen(true)}
                  className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold py-4 px-5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
                  title="Resmi PDF Tesis Sağlık ve Tasarruf Karnesi Oluştur"
                >
                  <span className="material-symbols-outlined text-base">assessment</span>
                  <span>PDF Raporu Al</span>
                </button>
              </div>

              <button 
                onClick={() => setIsAuditModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-600/20 via-slate-800 to-blue-600/20 hover:brightness-125 border border-blue-500/30 rounded-2xl text-xs font-extrabold text-blue-300 flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-blue-400">verified</span>
                <span>Yönetim Kurulu İçin Resmi Tasarruf Karnesi Üret</span>
              </button>

            </motion.div>

            {/* Hesaplayıcı → lead (CRO Track 2): tahmini görüşmek için geri-arama. */}
            <div className="mt-6">
              <div className="mb-3 px-1">
                <h3 className="font-bold text-[var(--color-primary)]">{t('calc_lead_title')}</h3>
                <p className="text-xs text-[var(--color-secondary)]">{t('calc_lead_desc')}</p>
              </div>
              <CallbackForm
                variant="card"
                meta={{
                  kaynak: 'hesaplayici',
                  bagimsizBolum: units,
                  blok: blocks,
                  asansor: elevators,
                  guvenlik: hasSecurity,
                  havuz: hasPool,
                  yesilAlan: hasGreenSpace,
                  tahminiAidat: estimatedDuesPerUnit,
                  aylikButce: totalMonthlyBudget,
                }}
              />
            </div>
          </div>

        </div>

        {/* İnteraktif Risk Skoru & Yasal Denetim Kontrol Listesi */}
        <div className="mt-16 space-y-12">
          <QuizAuditScoreSeo />
          <ChecklistAuditSeo />
        </div>
      </section>

      {/* Resmi PDF Tesis Sağlık & Tasarruf Karne Modalı */}
      <FacilityAuditReportModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        defaultUnits={units}
      />
    </>
  );
}

