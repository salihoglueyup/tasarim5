"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function GuvenlikYonetimi() {
  const { t } = useLanguage();

  const securityFeatures = [
    {
      title: t('sec_feat_1_title'),
      desc: t('sec_feat_1_desc'),
      icon: "verified_user",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: t('sec_feat_2_title'),
      desc: t('sec_feat_2_desc'),
      icon: "center_focus_strong",
      color: "from-emerald-500 to-teal-600"
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
      color: "from-cyan-500 to-blue-600"
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

  return (
    <>
      <PageHeader 
        title={t('sec_title')} 
        description={t('sec_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Banner Teaser with Radar Effect */}
        <div className="bg-gradient-to-br from-[#081524] via-[#122338] to-blue-950 text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
          
          {/* Radar Background Animation */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-30 mix-blend-screen hidden lg:block">
            <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-8 border border-blue-400/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            <div className="absolute inset-16 border border-emerald-400/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
            <div className="absolute inset-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-left animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-7/12 relative z-10">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full w-fit"
            >
              {t('sec_banner_badge')}
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: `${t('sec_banner_title_1')} <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">${t('sec_banner_title_highlight')}</span> ${t('sec_banner_title_2')}` }} />
            <p className="text-lg text-gray-300 font-light leading-relaxed max-w-xl">
              {t('sec_banner_desc')}
            </p>
          </div>

          <div className="w-full lg:w-5/12 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 flex flex-col gap-4 text-center relative z-10 hover:bg-white/10 transition-colors shadow-2xl">
            <div className="w-20 h-20 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center relative">
               <span className="absolute inset-0 border-2 border-blue-400 rounded-full animate-ping opacity-20"></span>
               <span className="material-symbols-outlined text-4xl text-blue-400 relative z-10">radar</span>
            </div>
            <div className="text-4xl font-black text-white mt-2">{t('sec_banner_box_title')}</div>
            <div className="text-sm font-semibold text-blue-200">{t('sec_banner_box_subtitle')}</div>
            <Link href="/teklif-al" className="mt-4 bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-500 transition-transform hover:scale-105 text-sm flex items-center justify-center gap-2">
              {t('sec_banner_box_btn')}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
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
                  <span className="material-symbols-outlined text-blue-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
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
    </>
  );
}

