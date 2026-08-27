"use client";

import PageHeader from '@/components/layout/PageHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useRef } from 'react';

export default function VizyonMisyonClient() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const values = [
    { icon: 'visibility', title: t('value_1_title'), desc: t('value_1_desc'), color: 'from-blue-500/20 to-blue-600/5' },
    { icon: 'shield', title: t('value_2_title'), desc: t('value_2_desc'), color: 'from-slate-500/20 to-slate-600/5' },
    { icon: 'lightbulb', title: t('value_3_title'), desc: t('value_3_desc'), color: 'from-amber-500/20 to-amber-600/5' },
    { icon: 'eco', title: t('value_4_title'), desc: t('value_4_desc'), color: 'from-slate-500/20 to-slate-600/5' },
  ];

  const stats = [
    { value: t('stat_1_value'), label: t('stat_1_label') },
    { value: t('stat_2_value'), label: t('stat_2_label') },
    { value: t('stat_3_value'), label: t('stat_3_label') },
    { value: t('stat_4_value'), label: t('stat_4_label') },
  ];

  return (
    <>
      <PageHeader 
        title={t('vision_title')} 
        description={t('vision_desc')} 
      />

      <div className="relative overflow-hidden" ref={containerRef}>
        {/* Background Blobs */}
        <motion.div style={{ y: y1 }} className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-brand-500/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-lighten pointer-events-none" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-slate-500/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-lighten pointer-events-none" />

        <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-32"
          >
            
            {/* Vision & Mission Split Section */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Vision Section */}
              <motion.div variants={itemVariants} className="relative group p-10 md:p-14 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[3rem] shadow-xl shadow-brand-500/5 hover:shadow-brand-500/10 transition-all duration-500">
                <div className="absolute top-8 right-8 text-8xl material-symbols-outlined text-brand-500/10 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700">visibility</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold mb-8">
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  Vizyonumuz
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-6">{t('vision_head')}</h2>
                <p className="text-lg md:text-xl text-[var(--color-secondary)] font-light leading-relaxed">
                  {t('vision_content_1')}
                  <span className="font-semibold text-slate-900 dark:text-white mx-1">{t('vision_highlight_1')}</span>
                  {t('vision_content_2')}
                  <span className="font-semibold text-brand-500 mx-1">{t('vision_highlight_2')}</span>
                  {t('vision_content_3')}
                </p>
              </motion.div>

              {/* Mission Section */}
              <motion.div variants={itemVariants} className="relative group p-10 md:p-14 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[3rem] shadow-xl shadow-slate-500/5 hover:shadow-slate-500/10 transition-all duration-500 mt-12 lg:mt-24">
                <div className="absolute top-8 right-8 text-8xl material-symbols-outlined text-slate-500/10 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700">flag</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 font-semibold mb-8">
                  <span className="material-symbols-outlined text-sm">target</span>
                  Misyonumuz
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-6">{t('mission_head')}</h2>
                <p className="text-lg md:text-xl text-[var(--color-secondary)] font-light leading-relaxed">
                  {t('mission_content_1')}
                  <span className="font-semibold text-slate-600 dark:text-slate-400 mx-1">{t('mission_highlight_1')}</span>
                  {t('mission_content_2')}
                  <span className="font-semibold text-slate-500 mx-1">{t('mission_highlight_2')}</span>
                  {t('mission_content_3')}
                </p>
              </motion.div>
            </div>

            {/* Impact Section (Rakamlarla Biz) */}
            <motion.div variants={itemVariants} className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-brand-500/20 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10 text-center mb-16 max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('impact_title')}</h3>
                <p className="text-slate-400 text-lg md:text-xl">{t('impact_desc')}</p>
              </div>

              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center p-6 border border-slate-700/50 rounded-3xl bg-slate-800/30 backdrop-blur-sm">
                    <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-slate-300 mb-2">{stat.value}</div>
                    <div className="text-slate-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Values Section (Bento Grid) */}
            <motion.div variants={itemVariants} className="flex flex-col gap-12">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">{t('values_title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl">{t('values_desc')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {values.map((val, idx) => (
                  <div key={idx} className={`p-10 rounded-[2.5rem] bg-gradient-to-br ${val.color} border border-slate-200 dark:border-white/5 hover:-translate-y-2 transition-all duration-300 group`}>
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg mb-8 text-slate-800 dark:text-white group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">{val.icon}</span>
                    </div>
                    <h4 className="text-2xl font-bold text-[var(--color-primary)] mb-4">{val.title}</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CEO / Management Message */}
            <motion.div variants={itemVariants} className="max-w-4xl mx-auto w-full">
              <div className="relative p-12 md:p-16 rounded-[3rem] bg-brand-50 dark:bg-slate-900 border border-brand-100 dark:border-white/5">
                <span className="absolute top-8 left-8 text-8xl font-serif text-brand-500/20 leading-none">"</span>
                <div className="relative z-10 text-center">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-500 mb-8">{t('ceo_message_title')}</h4>
                  <p className="text-2xl md:text-3xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic mb-8">
                    {t('ceo_message_quote')}
                  </p>
                  <div className="w-16 h-1 bg-brand-500 mx-auto mb-4 rounded-full"></div>
                  <div className="font-bold text-[var(--color-primary)] text-lg">{t('ceo_name')}</div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </section>
      </div>
    </>
  );
}
