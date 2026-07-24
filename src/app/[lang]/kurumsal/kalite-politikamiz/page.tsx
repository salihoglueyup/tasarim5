"use client";

import PageHeader from '@/components/layout/PageHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { generateBreadcrumbs } from '@/lib/schemas';

export default function KalitePolitikamiz() {
  const { t } = useLanguage();

  const qualityCards = [
    {
      title: t('quality_card_1_title'),
      subtitle: t('quality_card_1_sub'),
      desc: t('quality_card_1_desc'),
      icon: "verified",
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: t('quality_card_2_title'),
      subtitle: t('quality_card_2_sub'),
      desc: t('quality_card_2_desc'),
      icon: "security",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: t('quality_card_3_title'),
      subtitle: t('quality_card_3_sub'),
      desc: t('quality_card_3_desc'),
      icon: "health_and_safety",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: t('quality_card_4_title'),
      subtitle: t('quality_card_4_sub'),
      desc: t('quality_card_4_desc'),
      icon: "eco",
      color: "from-green-500 to-emerald-700"
    },
    {
      title: t('quality_card_5_title'),
      subtitle: t('quality_card_5_sub'),
      desc: t('quality_card_5_desc'),
      icon: "fact_check",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('nav_corporate'), url: '/kurumsal' },
    { name: t('quality_title'), url: '/kurumsal/kalite-politikamiz' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHeader 
        title={t('quality_title')} 
        description={t('quality_desc')} 
      />

      <section ref={containerRef} className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
          
          {/* Left Sticky Manifesto */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 flex flex-col gap-8">
              <span className="text-xs font-bold text-blue-600 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full w-fit uppercase tracking-widest">
                {t('quality_manifest_badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] leading-tight tracking-tight">
                {t('quality_manifest_title_1')} <br />{t('quality_manifest_title_2')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t('quality_manifest_title_3')}</span>
              </h2>
              <div className="space-y-6 text-[var(--color-secondary)] font-light leading-relaxed">
                <p>
                  {t('quality_manifest_p1')}
                </p>
                <p>
                  {t('quality_manifest_p2')}
                </p>
              </div>

              {/* Stats Box */}
              <div className="mt-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-8 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-4xl font-black text-blue-600">{t('quality_stat_1_val')}</div>
                  <div className="text-xs font-bold text-[var(--color-secondary)] uppercase mt-1">{t('quality_stat_1_label')}</div>
                </div>
                <div className="w-px h-12 bg-[var(--color-outline)]/50"></div>
                <div>
                  <div className="text-4xl font-black text-emerald-500">{t('quality_stat_2_val')}</div>
                  <div className="text-xs font-bold text-[var(--color-secondary)] uppercase mt-1">{t('quality_stat_2_label')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Scroll-Animated Cards Timeline */}
          <div className="lg:col-span-7 relative">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-[3.5rem] top-0 bottom-0 w-1 bg-[var(--color-outline)]/30 rounded-full hidden sm:block" />
            <motion.div 
              className="absolute left-6 md:left-[3.5rem] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-emerald-500 rounded-full hidden sm:block origin-top"
              style={{ scaleY: progressBarHeight }}
            />

            <div className="flex flex-col gap-10">
              {qualityCards.map((q, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative flex items-start gap-6 md:gap-10"
                >
                  {/* Timeline Dot */}
                  <div className="hidden sm:flex z-10 w-14 h-14 bg-[var(--color-surface)] border-4 border-white dark:border-slate-900 rounded-full shadow-lg items-center justify-center shrink-0 relative -left-1">
                    <span className={`material-symbols-outlined text-transparent bg-clip-text bg-gradient-to-br ${q.color}`}>
                      {q.icon}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-3 shadow-sm hover:shadow-xl transition-all w-full group relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${q.color} opacity-5 rounded-bl-[100px] -z-0 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <span className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${q.color} tracking-widest uppercase mb-1`}>
                      {q.title}
                    </span>
                    <h3 className="text-2xl font-bold text-[var(--color-primary)] relative z-10">{q.subtitle}</h3>
                    <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed mt-2 relative z-10">{q.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
