"use client";

import { motion } from 'framer-motion';
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
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
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
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className={`${item.span} bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between gap-6 shadow-sm hover:border-[var(--color-primary)] transition-all`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-500/10 px-4 py-1.5 rounded-full">
                {item.tag}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{item.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
