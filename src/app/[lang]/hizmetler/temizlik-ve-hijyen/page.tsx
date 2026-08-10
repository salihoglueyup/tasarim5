"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection } from '@/components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';
import { RelatedArticles } from '@/components';;
import { generateBreadcrumbs, serviceSchema, faqPageSchema } from '@/lib/schemas';
import CleaningCalculator from '@/components/sections/CleaningCalculator';
import CleaningTestimonials from '@/components/sections/CleaningTestimonials';

export default function TemizlikVeHijyen() {
  const { t } = useLanguage();

  const cleaningHighlights = [
    {
      title: t('clean_feat_1_title'),
      desc: t('clean_feat_1_desc'),
      icon: "eco",
      color: "from-slate-500 to-slate-700"
    },
    {
      title: t('clean_feat_2_title'),
      desc: t('clean_feat_2_desc'),
      icon: "cleaning_services",
      color: "from-slate-700 to-slate-900"
    },
    {
      title: t('clean_feat_3_title'),
      desc: t('clean_feat_3_desc'),
      icon: "calendar_month",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: t('clean_feat_4_title'),
      desc: t('clean_feat_4_desc'),
      icon: "sanitizer",
      color: "from-purple-500 to-fuchsia-600"
    }
  ];

  const seasonalMatrix = [
    { 
      id: "ilkbahar",
      season: t('clean_matrix_season_1'), 
      task: t('clean_matrix_task_1'),
      icon: "local_florist",
      color: "text-slate-500",
      bg: "bg-slate-500/10"
    },
    { 
      id: "yaz",
      season: t('clean_matrix_season_2'), 
      task: t('clean_matrix_task_2'),
      icon: "light_mode",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    { 
      id: "sonbahar",
      season: t('clean_matrix_season_3'), 
      task: t('clean_matrix_task_3'),
      icon: "air",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    { 
      id: "kis",
      season: t('clean_matrix_season_4'), 
      task: t('clean_matrix_task_4'),
      icon: "ac_unit",
      color: "text-slate-400 dark:text-slate-300",
      bg: "bg-slate-400/10 dark:bg-slate-300/10"
    }
  ];

  const faqs = [
    {
      q: t('clean_faq_1_q'),
      a: t('clean_faq_1_a')
    },
    {
      q: t('clean_faq_2_q'),
      a: t('clean_faq_2_a')
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSeason, setActiveSeason] = useState(seasonalMatrix[0]);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('nav_all_services'), url: '/hizmetler' },
    { name: t('clean_title'), url: '/hizmetler/temizlik-ve-hijyen' }
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Temizlik ve Hijyen',
    path: '/hizmetler/temizlik-ve-hijyen',
    description: t('clean_desc'),
    offers: cleaningHighlights.map((c) => ({ name: c.title, description: c.desc })),
  });

  const faqLd = faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd]} />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        </div>
        
        {/* Abstract Minimal Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 mix-blend-screen z-0 hidden md:block">
            <div className="absolute inset-0 border border-slate-400/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-16 border border-slate-300/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            <div className="absolute inset-32 border border-slate-200/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
            <div className="absolute inset-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <div className="relative z-20 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20">
          <div className="flex flex-col items-center gap-6">
            <span className="text-sm font-bold text-slate-300 bg-slate-500/10 border border-slate-500/20 px-6 py-2 rounded-full backdrop-blur-md tracking-wider uppercase">
              {t('clean_banner_badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Profesyonel <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
                Temizlik ve Hijyen
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('clean_banner_desc')}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                Hemen Teklif Al <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Cleaning Calculator */}
        <div className="-mt-32 relative z-30">
          <CleaningCalculator />
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cleaningHighlights.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col gap-5 shadow-sm group hover:shadow-xl transition-all overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-full`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{c.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{c.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Seasonal Matrix Widget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-10">
            <div className="max-w-lg">
              <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
                {t('clean_matrix_badge')}
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('clean_matrix_title')}</h2>
            </div>
            <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-white/5 p-2 rounded-2xl">
              {seasonalMatrix.map(season => (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(season)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    activeSeason.id === season.id 
                      ? 'bg-white dark:bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm' 
                      : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-sm ${activeSeason.id === season.id ? season.color : ''}`}>
                    {season.icon}
                  </span>
                  {season.season}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 sm:h-48 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeason.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-12 h-12 rounded-full ${activeSeason.bg} ${activeSeason.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{activeSeason.icon}</span>
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)]">{activeSeason.season} {t('clean_matrix_period')}</h3>
                </div>
                <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed max-w-3xl">
                  {activeSeason.task}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Cleaning Specific Social Proof */}
        <CleaningTestimonials />

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-8">{t('clean_faq_title')}</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-slate-900 dark:text-white transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
                    expand_more
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10"
                    >
                      <div className="p-6 text-sm text-[var(--color-secondary)] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </section>

      <SeoTextSection
        titleKey="temizlik_seo_title"
        p1Key="temizlik_seo_p1"
        p2Key="temizlik_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/temizlik-ve-hijyen" />
      <RelatedArticles pillar="/hizmetler/temizlik-ve-hijyen" />
    </>
  );
}

