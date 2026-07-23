"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ComparisonTable() {
  const { t } = useLanguage();

  const comparisonRows = [
    {
      title: t('home_comparison_1_title'),
      alo: t('home_comparison_1_alo'),
      trad: t('home_comparison_1_trad')
    },
    {
      title: t('home_comparison_2_title'),
      alo: t('home_comparison_2_alo'),
      trad: t('home_comparison_2_trad')
    },
    {
      title: t('home_comparison_3_title'),
      alo: t('home_comparison_3_alo'),
      trad: t('home_comparison_3_trad')
    },
    {
      title: t('home_comparison_4_title'),
      alo: t('home_comparison_4_alo'),
      trad: t('home_comparison_4_trad')
    },
    {
      title: t('home_comparison_5_title'),
      alo: t('home_comparison_5_alo'),
      trad: t('home_comparison_5_trad')
    },
    {
      title: t('home_comparison_6_title'),
      alo: t('home_comparison_6_alo'),
      trad: t('home_comparison_6_trad')
    },
    {
      title: t('home_comparison_7_title'),
      alo: t('home_comparison_7_alo'),
      trad: t('home_comparison_7_trad')
    },
    {
      title: t('home_comparison_8_title'),
      alo: t('home_comparison_8_alo'),
      trad: t('home_comparison_8_trad')
    }
  ];

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
          {t('home_comparison_badge')}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          {t('home_comparison_title')}
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          {t('home_comparison_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Alo Yönetim */}
        <div className="bg-gradient-to-b from-blue-900 via-[#122338] to-[#0a1829] text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-blue-500/30 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-400">{t('home_comparison_left_title')}</h3>
              <span className="text-xs text-gray-300 font-light">{t('home_comparison_left_sub')}</span>
            </div>
            <span className="material-symbols-outlined text-4xl text-emerald-400">verified</span>
          </div>

          <div className="flex flex-col gap-6">
            {comparisonRows.map((row, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="material-symbols-outlined text-emerald-400 shrink-0 mt-1">check_circle</span>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">{row.title}</h4>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">{row.alo}</p>
                </div>
              </div>
            ))}
          </div>

          <Link 
            href="/teklif-al" 
            className="w-full bg-white text-[var(--color-primary)] font-bold py-4 rounded-xl text-center hover:bg-gray-100 transition-colors mt-4"
          >
            {t('home_comparison_btn')}
          </Link>
        </div>

        {/* Right Column: Geleneksel Yönetim */}
        <div className="bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/60 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[var(--color-outline)]/40 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-500">{t('home_comparison_right_title')}</h3>
              <span className="text-xs text-[var(--color-secondary)] font-light">{t('home_comparison_right_sub')}</span>
            </div>
            <span className="material-symbols-outlined text-4xl text-red-400">cancel</span>
          </div>

          <div className="flex flex-col gap-6">
            {comparisonRows.map((row, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200/60 dark:border-white/10">
                <span className="material-symbols-outlined text-red-400 shrink-0 mt-1">cancel</span>
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 text-base mb-1">{row.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{row.trad}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
