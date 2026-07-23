"use client";

import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

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

  return (
    <>
      <PageHeader 
        title={t('tech_title')} 
        description={t('tech_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* SLA Timer Banner */}
        <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-[#122338] text-white p-10 md:p-14 rounded-[3rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
          
          <div className="flex flex-col gap-5 relative z-10">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold text-blue-300 uppercase tracking-widest bg-white/10 border border-white/20 px-4 py-1.5 rounded-full w-fit"
            >
              {t('tech_banner_badge')}
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" dangerouslySetInnerHTML={{ __html: t('tech_banner_title') }} />
            <p className="text-base text-blue-100 font-light max-w-xl leading-relaxed">
              {t('tech_banner_desc')}
            </p>
            <div className="pt-4">
              <Link href="/teklif-al" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-2xl inline-flex items-center gap-2 text-sm shadow-xl transition-all hover:scale-105 hover:shadow-blue-500/25">
                <span className="material-symbols-outlined text-lg">build</span>
                {t('tech_banner_btn')}
              </Link>
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="bg-white/10 p-10 rounded-full border-[8px] border-white/10 text-center shrink-0 w-48 h-48 flex flex-col items-center justify-center relative z-10 backdrop-blur-md shadow-2xl"
          >
            <div className="text-5xl font-extrabold text-blue-400 flex items-baseline">
              <AnimatedCounter from={0} to={20} />
              <span className="text-2xl ml-1">DK</span>
            </div>
            <div className="text-xs text-blue-200 mt-2 font-medium uppercase tracking-wider">{t('tech_banner_box_label')}</div>
          </motion.div>
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
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-primary)]">{item.equipment}</h3>
                    <p className="text-sm text-[var(--color-secondary)] font-light mt-1">{item.interval}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full w-fit whitespace-nowrap">
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

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

function AnimatedCounter({ from, to }: { from: number, to: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to]);

  return <>{count}</>;
}
