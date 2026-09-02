"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function WhyUsBentoGrid() {
  const { t } = useLanguage();

  const bentoItems = [
    {
      span: "lg:col-span-8",
      title: t('home_why_1_title'),
      desc: t('home_why_1_desc'),
      icon: "videocam",
      tag: t('home_why_1_tag')
    },
    {
      span: "lg:col-span-4",
      title: t('home_why_2_title'),
      desc: t('home_why_2_desc'),
      icon: "savings",
      tag: t('home_why_2_tag')
    },
    {
      span: "lg:col-span-4",
      title: t('home_why_3_title'),
      desc: t('home_why_3_desc'),
      icon: "engineering",
      tag: t('home_why_3_tag')
    },
    {
      span: "lg:col-span-8",
      title: t('home_why_4_title'),
      desc: t('home_why_4_desc'),
      icon: "phone_iphone",
      tag: t('home_why_4_tag')
    },
    {
      span: "lg:col-span-6",
      title: t('home_why_5_title'),
      desc: t('home_why_5_desc'),
      icon: "gavel",
      tag: t('home_why_5_tag')
    },
    {
      span: "lg:col-span-6",
      title: t('home_why_6_title'),
      desc: t('home_why_6_desc'),
      icon: "eco",
      tag: t('home_why_6_tag')
    }
  ];

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full">
          {t('home_why_badge')}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          {t('home_why_title')}
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          {t('home_why_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {bentoItems.map((item, index) => (
          <div
            key={index}
            className={`${item.span} bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between gap-6 shadow-sm hover:border-[var(--color-primary)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Dekoratif dev ikon (arkaplan) */}
            <div className="absolute -bottom-8 -right-8 text-slate-100 dark:text-slate-800/50 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 z-0">
              <span className="material-symbols-outlined" style={{ fontSize: '180px' }}>{item.icon}</span>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-widest uppercase bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full">
                {item.tag}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{item.title}</h3>
              <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
