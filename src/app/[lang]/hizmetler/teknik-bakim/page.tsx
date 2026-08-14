"use client";
import JsonLd from '@/components/seo/JsonLd';
import { RelatedArticles } from '@/components';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection } from '@/components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { generateBreadcrumbs, serviceSchema, faqPageSchema, webPageSchema } from '@/lib/schemas';
import MaintenanceCalculator from '@/components/sections/MaintenanceCalculator';
import MaintenanceTestimonials from '@/components/sections/MaintenanceTestimonials';
import Image from 'next/image';

export default function TeknikBakim() {
  const { t } = useLanguage();

  const techIntervals = [
    { equipment: t('tech_grid_1_eq'), interval: t('tech_grid_1_int'), status: t('tech_grid_1_status') },
    { equipment: t('tech_grid_2_eq'), interval: t('tech_grid_2_int'), status: t('tech_grid_2_status') },
    { equipment: t('tech_grid_3_eq'), interval: t('tech_grid_3_int'), status: t('tech_grid_3_status') },
    { equipment: t('tech_grid_4_eq'), interval: t('tech_grid_4_int'), status: t('tech_grid_4_status') }
  ];

  const faqs = [
    {
      q: t('tech_faq_1_q'),
      a: t('tech_faq_1_a')
    },
    {
      q: t('tech_faq_2_q'),
      a: t('tech_faq_2_a')
    },
    {
      q: t('tech_faq_3_q'),
      a: t('tech_faq_3_a')
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t('nav_home'), url: '/' },
    { name: t('nav_all_services'), url: '/hizmetler' },
    { name: t('tech_title'), url: '/hizmetler/teknik-bakim' }
  ]);

  const serviceLd = serviceSchema({
    serviceType: t('serv_maint_name'),
    path: '/hizmetler/teknik-bakim',
    description: t('tech_desc'),
  });

  const faqLd = faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, webPageSchema({ path: '/hizmetler/teknik-bakim', speakableSelectors: ['h1', '#speakable-content'] })]} />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop" alt="teknik-bakim hero" fill className="object-cover object-center opacity-30" priority />
        </div>
        
        {/* Abstract Minimal Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 mix-blend-screen z-0 hidden md:block">
            <div className="absolute inset-0 border border-slate-400/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-16 border border-slate-300/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            <div className="absolute inset-32 border border-slate-200/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
            <div className="absolute inset-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <div className="relative z-20 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-sm font-bold text-slate-300 bg-slate-500/10 border border-slate-500/20 px-6 py-2 rounded-full backdrop-blur-md tracking-wider uppercase">
              {t('tech_banner_badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_maint_hero_title') }} />
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('tech_banner_desc')}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Maintenance Calculator */}
        <div className="-mt-32 relative z-30">
          <MaintenanceCalculator />
        </div>

        {/* Maintenance Intervals Table */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-8">{t('tech_grid_title')}</h2>
          <div className="flex flex-col gap-4">
            {techIntervals.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 gap-4 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-primary)]">{item.equipment}</h3>
                    <p className="text-sm text-[var(--color-secondary)] font-light mt-1">{item.interval}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-500/10 border border-slate-500/20 px-4 py-2 rounded-full w-fit whitespace-nowrap">
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Maintenance Specific Social Proof */}
        <MaintenanceTestimonials />

        {/* FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-8">{t('tech_faq_title')}</h2>
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
        titleKey="teknik_seo_title"
        p1Key="teknik_seo_p1"
        p2Key="teknik_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/teknik-bakim" />
      <RelatedArticles pillar="/hizmetler/teknik-bakim" />
    </>
  );
}

function AnimatedCounter({ from, to }: { from: number, to: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    // Faz 98: Hareketi azaltma tercihi varsa animasyonsuz anında bitir (INP/Erişilebilirlik)
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = window.requestAnimationFrame(() => setCount(to));
      return () => window.cancelAnimationFrame(id);
    }

    let startTimestamp: number | null = null;
    let rafId: number;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);

    // Faz 98, 100: Memory & CPU rAF leak iptali (Unmount cleanup)
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [from, to]);

  return <>{count}</>;
}
