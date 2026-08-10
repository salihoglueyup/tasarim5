"use client";

import { useState } from 'react';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection } from '@/components';
import { Card } from '@/components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';
import { RelatedArticles } from '@/components';;
import { generateBreadcrumbs, serviceSchema, faqPageSchema } from '@/lib/schemas';
import DuesCalculator from '@/components/sections/DuesCalculator';
import DuesTestimonials from '@/components/sections/DuesTestimonials';

export default function AidatTakibi() {
  const { t } = useLanguage();

  const duesPoints = [
    {
      title: t('dues_feat_1_title'),
      desc: t('dues_feat_1_desc'),
      icon: "smartphone"
    },
    {
      title: t('dues_feat_2_title'),
      desc: t('dues_feat_2_desc'),
      icon: "account_balance_wallet"
    },
    {
      title: t('dues_feat_3_title'),
      desc: t('dues_feat_3_desc'),
      icon: "notifications_active"
    },
    {
      title: t('dues_feat_4_title'),
      desc: t('dues_feat_4_desc'),
      icon: "gavel"
    }
  ];

  const faqs = [
    {
      q: t('dues_faq_1_q'),
      a: t('dues_faq_1_a')
    },
    {
      q: t('dues_faq_2_q'),
      a: t('dues_faq_2_a')
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t('nav_home'), url: '/' },
    { name: t('nav_all_services'), url: '/hizmetler' },
    { name: t('dues_title'), url: '/hizmetler/aidat-takibi' }
  ]);

  const serviceLd = serviceSchema({
    serviceType: t('serv_dues_name'),
    path: '/hizmetler/aidat-takibi',
    description: t('dues_desc'),
    offerCatalogName: 'Aidat ve Finansal Yönetim Hizmetleri',
    offers: duesPoints.map((p) => ({ name: p.title, description: p.desc })),
  });

  const faqLd = faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd]} />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
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
              {t('dues_banner_badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_dues_hero_title') }} />
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('dues_banner_desc')}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Dues Calculator */}
        <div className="-mt-32 relative z-30">
          <DuesCalculator />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {duesPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

        {/* Dues Specific Social Proof */}
        <DuesTestimonials />

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">{t('dues_faq_title')}</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-slate-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="p-6 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10 text-sm text-[var(--color-secondary)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </section>

      <SeoTextSection
        titleKey="dues_seo_title"
        p1Key="dues_seo_p1"
        p2Key="dues_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/aidat-takibi" />
      <RelatedArticles pillar="/hizmetler/aidat-takibi" />
    </>
  );
}
