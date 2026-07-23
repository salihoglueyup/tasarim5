"use client";

import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

export default function Surdurulebilirlik() {
  const { t } = useLanguage();

  const ecoPoints = [
    {
      title: t('eco_point_1_title'),
      desc: t('eco_point_1_desc')
    },
    {
      title: t('eco_point_2_title'),
      desc: t('eco_point_2_desc')
    },
    {
      title: t('eco_point_3_title'),
      desc: t('eco_point_3_desc')
    },
    {
      title: t('eco_point_4_title'),
      desc: t('eco_point_4_desc')
    }
  ];
  return (
    <>
      <PageHeader 
        title={t('sustainability_title')} 
        description={t('sustainability_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ecoPoints.map((p, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
