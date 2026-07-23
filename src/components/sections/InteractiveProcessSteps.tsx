"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function InteractiveProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  const steps = [
    {
      step: 1,
      title: t('home_process_1_title'),
      desc: t('home_process_1_desc'),
      icon: "search_insights",
      tag: t('home_process_1_tag')
    },
    {
      step: 2,
      title: t('home_process_2_title'),
      desc: t('home_process_2_desc'),
      icon: "request_quote",
      tag: t('home_process_2_tag')
    },
    {
      step: 3,
      title: t('home_process_3_title'),
      desc: t('home_process_3_desc'),
      icon: "gavel",
      tag: t('home_process_3_tag')
    },
    {
      step: 4,
      title: t('home_process_4_title'),
      desc: t('home_process_4_desc'),
      icon: "assignment_turned_in",
      tag: t('home_process_4_tag')
    },
    {
      step: 5,
      title: t('home_process_5_title'),
      desc: t('home_process_5_desc'),
      icon: "phone_android",
      tag: t('home_process_5_tag')
    },
    {
      step: 6,
      title: t('home_process_6_title'),
      desc: t('home_process_6_desc'),
      icon: "verified_user",
      tag: t('home_process_6_tag')
    }
  ];

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
          {t('home_process_badge')}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
          {t('home_process_title')}
        </h2>
        <p className="text-lg text-[var(--color-secondary)] font-light mt-4">
          {t('home_process_desc')}
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeStep === idx
                ? 'bg-[var(--color-primary)] text-white shadow-lg scale-105'
                : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)] hover:border-[var(--color-primary)]'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
              {s.step}
            </span>
            {s.tag}
          </button>
        ))}
      </div>

      {/* Active Step Display Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-10 md:p-16 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-500/10 px-4 py-1.5 rounded-full w-fit">
              {steps[activeStep].tag}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
              {steps[activeStep].title}
            </h3>
            <p className="text-xl text-[var(--color-secondary)] font-light leading-relaxed">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 to-[#122338] text-white p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-4">
            <span className="material-symbols-outlined text-6xl text-blue-400">
              {steps[activeStep].icon}
            </span>
            <div className="font-bold text-lg">{t('home_process_step_label')} {steps[activeStep].step} / 6</div>
            <div className="text-xs text-gray-300 font-light">{t('home_process_guarantee')}</div>
          </div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
}
