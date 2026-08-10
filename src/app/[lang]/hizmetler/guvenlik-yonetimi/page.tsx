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
import SecurityCalculator from '@/components/sections/SecurityCalculator';
import SecurityTestimonials from '@/components/sections/SecurityTestimonials';

export default function GuvenlikYonetimi() {
  const { t } = useLanguage();

  const securityFeatures = [
    {
      title: t('sec_feat_1_title'),
      desc: t('sec_feat_1_desc'),
      icon: "verified_user",
      color: "from-slate-700 to-slate-900"
    },
    {
      title: t('sec_feat_2_title'),
      desc: t('sec_feat_2_desc'),
      icon: "center_focus_strong",
      color: "from-slate-600 to-slate-800"
    },
    {
      title: t('sec_feat_3_title'),
      desc: t('sec_feat_3_desc'),
      icon: "qr_code_scanner",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: t('sec_feat_4_title'),
      desc: t('sec_feat_4_desc'),
      icon: "shield_person",
      color: "from-purple-500 to-fuchsia-600"
    },
    {
      title: t('sec_feat_5_title'),
      desc: t('sec_feat_5_desc'),
      icon: "videocam",
      color: "from-red-500 to-rose-600"
    },
    {
      title: t('sec_feat_6_title'),
      desc: t('sec_feat_6_desc'),
      icon: "emergency",
      color: "from-slate-600 to-slate-800"
    }
  ];

  const faqs = [
    {
      q: t('sec_faq_1_q'),
      a: t('sec_faq_1_a')
    },
    {
      q: t('sec_faq_2_q'),
      a: t('sec_faq_2_a')
    },
    {
      q: t('sec_faq_3_q'),
      a: t('sec_faq_3_a')
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4 } }
  };

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('nav_all_services'), url: '/hizmetler' },
    { name: t('sec_title'), url: '/hizmetler/guvenlik-yonetimi' }
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Güvenlik Yönetimi',
    path: '/hizmetler/guvenlik-yonetimi',
    description: t('sec_desc'),
    offers: securityFeatures.map((f) => ({ name: f.title, description: f.desc })),
  });

  const faqLd = faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd]} />
      
      {/* Immersive Full-Width Hero */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        </div>
        
        {/* Radar Animation embedded in background */}
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
              {t('sec_banner_badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: `${t('sec_banner_title_1')} <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">${t('sec_banner_title_highlight')}</span> ${t('sec_banner_title_2')}` }} />
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('sec_banner_desc')}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('sec_banner_box_btn')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Security Calculator */}
        <div className="-mt-32 relative z-30">
          <SecurityCalculator />
        </div>

        {/* 6 Bento Grid Cards with Staggered Animation */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('sec_grid_title')}</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light mt-4">{t('sec_grid_desc')}</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {securityFeatures.map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-5 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden relative"
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-2xl`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary)] relative z-10">{f.title}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed relative z-10">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Security Specific Social Proof */}
        <SecurityTestimonials />

        {/* FAQ Section */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-8">{t('sec_faq_title')}</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
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
        titleKey="guvenlik_seo_title"
        p1Key="guvenlik_seo_p1"
        p2Key="guvenlik_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/guvenlik-yonetimi" />
      <RelatedArticles pillar="/hizmetler/guvenlik-yonetimi" />
    </>
  );
}

