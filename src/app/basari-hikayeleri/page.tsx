"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function BasariHikayeleri() {
  const { t } = useLanguage();

  const cases = [
    {
      title: t('case_1_title'),
      tag: t('case_1_tag'),
      desc: t('case_1_desc'),
      stats: [t('case_1_stat_1'), t('case_1_stat_2'), t('case_1_stat_3')]
    },
    {
      title: t('case_2_title'),
      tag: t('case_2_tag'),
      desc: t('case_2_desc'),
      stats: [t('case_2_stat_1'), t('case_2_stat_2'), t('case_2_stat_3')]
    },
    {
      title: t('case_3_title'),
      tag: t('case_3_tag'),
      desc: t('case_3_desc'),
      stats: [t('case_3_stat_1'), t('case_3_stat_2'), t('case_3_stat_3')]
    }
  ];
  return (
    <>
      <PageHeader 
        title={t('case_page_title')} 
        description={t('case_page_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="flex flex-col gap-12">
          {cases.map((c, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:border-[var(--color-primary)] transition-all">
              <div className="flex flex-col gap-4 max-w-2xl">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit">
                  {c.tag}
                </span>
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">{c.title}</h2>
                <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
              </div>

              <div className="flex flex-col gap-4 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/10 w-full lg:w-72 shrink-0">
                {c.stats.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-[var(--color-primary)]">
                    <span className="material-symbols-outlined text-blue-600">check_circle</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
