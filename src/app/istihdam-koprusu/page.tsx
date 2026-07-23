"use client";

import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

export default function IstihdamKoprusu() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader 
        title={t('emp_page_title')} 
        description={t('emp_page_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-16 rounded-[3rem] shadow-sm flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">{t('emp_sec_title')}</h2>
          <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">
            {t('emp_sec_desc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-blue-600 mb-1">{t('emp_stat_1_val')}</div>
              <div className="text-xs text-gray-500 font-medium">{t('emp_stat_1_text')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-emerald-600 mb-1">{t('emp_stat_2_val')}</div>
              <div className="text-xs text-gray-500 font-medium">{t('emp_stat_2_text')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 text-center">
              <div className="text-3xl font-extrabold text-purple-600 mb-1">{t('emp_stat_3_val')}</div>
              <div className="text-xs text-gray-500 font-medium">{t('emp_stat_3_text')}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
