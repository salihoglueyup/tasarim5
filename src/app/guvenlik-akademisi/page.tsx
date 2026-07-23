"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function GuvenlikAkademisi() {
  const { t } = useLanguage();

  const academyFeatures = [
    {
      title: t('aca_feat_1_title'),
      desc: t('aca_feat_1_desc'),
      icon: "gavel",
      duration: t('aca_feat_1_dur'),
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: t('aca_feat_2_title'),
      desc: t('aca_feat_2_desc'),
      icon: "local_fire_department",
      duration: t('aca_feat_2_dur'),
      color: "from-red-500 to-rose-600"
    },
    {
      title: t('aca_feat_3_title'),
      desc: t('aca_feat_3_desc'),
      icon: "psychology",
      duration: t('aca_feat_3_dur'),
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: t('aca_feat_4_title'),
      desc: t('aca_feat_4_desc'),
      icon: "forum",
      duration: t('aca_feat_4_dur'),
      color: "from-amber-500 to-orange-600"
    }
  ];

  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <>
      <PageHeader 
        title={t('aca_page_title')} 
        description={t('aca_page_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Intro Teaser */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-10 md:p-14 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
           <div className="flex flex-col gap-5 max-w-2xl relative z-10">
             <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full w-fit border border-blue-500/20">
               {t('aca_intro_tag')}
             </span>
             <h2 className="text-3xl md:text-5xl font-extrabold leading-tight" dangerouslySetInnerHTML={{ __html: t('aca_intro_title') }} />
             <p className="text-blue-100 font-light leading-relaxed max-w-xl">
               {t('aca_intro_desc')}
             </p>
           </div>
           <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center shrink-0 w-48 relative z-10">
             <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{t('aca_intro_badge_val')}</div>
             <div className="text-xs text-blue-200 mt-2 font-medium">{t('aca_intro_badge_text')}</div>
           </div>
        </div>

        {/* Curriculum Timeline Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('aca_cur_title')}</h2>
             <p className="text-sm text-[var(--color-secondary)] font-light mt-4">{t('aca_cur_desc')}</p>
          </div>

          <div className="relative border-l-2 border-gray-200 dark:border-white/10 pl-6 md:pl-10 space-y-8 ml-4 md:ml-0">
            {academyFeatures.map((f, i) => {
              const isActive = activeStep === i;
              
              return (
                <div key={i} className="relative">
                  {/* Timeline Node */}
                  <div className={`absolute -left-[35px] md:-left-[51px] top-4 w-6 h-6 rounded-full border-4 ${isActive ? 'bg-blue-600 border-blue-200 dark:border-blue-900/50 scale-125' : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-white/20'} transition-all duration-300 z-10 flex items-center justify-center`}>
                    {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  {/* Accordion Card */}
                  <motion.div 
                    layout
                    onClick={() => setActiveStep(isActive ? null : i)}
                    className={`bg-[var(--color-surface)] border ${isActive ? 'border-blue-500/50 shadow-xl' : 'border-[var(--color-outline)]/60 shadow-sm'} p-6 md:p-8 rounded-[2rem] cursor-pointer transition-all duration-300 group overflow-hidden relative`}
                  >
                    {isActive && <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} opacity-10 blur-2xl rounded-full`} />}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${f.color} shadow-lg ${isActive ? 'scale-110' : ''} transition-transform`}>
                          <span className="material-symbols-outlined">{f.icon}</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{t('aca_cur_mod')} 0{i + 1}</div>
                          <h3 className="text-xl font-bold text-[var(--color-primary)] pr-8">{f.title}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                        <span className="text-xs font-bold text-[var(--color-secondary)] bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full whitespace-nowrap">
                          {f.duration}
                        </span>
                        <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-blue-500' : ''}`}>
                          expand_more
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: "1.5rem" }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="relative z-10"
                        >
                          <div className="w-full h-px bg-gray-100 dark:bg-white/5 mb-6" />
                          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light leading-relaxed pl-2 border-l-2 border-blue-500/30">
                            {f.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </section>
    </>
  );
}
