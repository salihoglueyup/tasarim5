"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { generateBreadcrumbs } from '@/lib/schemas';

export default function SektorelCozumler() {
  const { t } = useLanguage();

  const sectors = [
    {
      id: "rezidans",
      title: t('sector_residence_title'),
      desc: t('sector_residence_desc'),
      icon: "apartment",
      kpi: t('sector_residence_kpi'),
      features: [
        t('sector_residence_feat_1'),
        t('sector_residence_feat_2'),
        t('sector_residence_feat_3'),
        t('sector_residence_feat_4')
      ]
    },
    {
      id: "avm",
      title: t('sector_mall_title'),
      desc: t('sector_mall_desc'),
      icon: "storefront",
      kpi: t('sector_mall_kpi'),
      features: [
        t('sector_mall_feat_1'),
        t('sector_mall_feat_2'),
        t('sector_mall_feat_3'),
        t('sector_mall_feat_4')
      ]
    },
    {
      id: "sanayi",
      title: t('sector_industrial_title'),
      desc: t('sector_industrial_desc'),
      icon: "factory",
      kpi: t('sector_industrial_kpi'),
      features: [
        t('sector_industrial_feat_1'),
        t('sector_industrial_feat_2'),
        t('sector_industrial_feat_3'),
        t('sector_industrial_feat_4')
      ]
    },
    {
      id: "toplukonut",
      title: t('sector_housing_title'),
      desc: t('sector_housing_desc'),
      icon: "location_city",
      kpi: t('sector_housing_kpi'),
      features: [
        t('sector_housing_feat_1'),
        t('sector_housing_feat_2'),
        t('sector_housing_feat_3'),
        t('sector_housing_feat_4')
      ]
    }
  ];

  const faqs = [
    {
      q: t('sector_faq_q1'),
      a: t('sector_faq_a1')
    },
    {
      q: t('sector_faq_q2'),
      a: t('sector_faq_a2')
    },
    {
      q: t('sector_faq_q3'),
      a: t('sector_faq_a3')
    }
  ];
  const [activeTab, setActiveTab] = useState<string>("rezidans");
  const [unitCount, setUnitCount] = useState<number>(150);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic Personnel Estimator Logic based on project size
  const estimatedSecurity = Math.max(2, Math.round(unitCount / 40));
  const estimatedCleaning = Math.max(2, Math.round(unitCount / 50));
  const estimatedTechnical = Math.max(1, Math.round(unitCount / 100));
  const estimatedManager = 1;

  const currentSector = sectors.find(s => s.id === activeTab) || sectors[0];

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('sector_page_title'), url: '/sektorel-cozumler' }
  ]);

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: sectors.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      description: s.desc
    }))
  };

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Sektörel Tesis Yönetim Çözümleri',
    description: 'Rezidans, AVM, Sanayi ve Toplu Konut projeleri için özelleştirilmiş entegre tesis yönetimi hizmetleri.',
    brand: {
      '@type': 'Brand',
      name: 'Alo Yönetim'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'TRY',
      lowPrice: '5000',
      highPrice: '50000',
      offerCount: '4'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, itemListLd, productLd]) }}
      />
      <PageHeader 
        title={t('sector_page_title')} 
        description={t('sector_page_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Interactive Sector Tabs */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === s.id
                    ? 'bg-[var(--color-primary)] text-white shadow-lg scale-105'
                    : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Active Sector Spotlight Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSector.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">{currentSector.icon}</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                    {currentSector.kpi}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">{currentSector.title}</h2>
                <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{currentSector.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {currentSector.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-semibold text-[var(--color-primary)]">
                      <span className="material-symbols-outlined text-blue-600 shrink-0">check_circle</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-xl">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">stars</span>
                  {t('sector_specialty_tag')}
                </div>

                <h3 className="text-2xl font-bold">{t('sector_specialty_title')}</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {t('sector_specialty_desc')}
                </p>

                <Link 
                  href="/teklif-al" 
                  className="w-full bg-white text-blue-900 font-bold py-4 px-6 rounded-2xl text-center text-sm hover:bg-gray-100 transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  {currentSector.title} {t('sector_quote_for_sector')}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Sector Personnel & Resource Estimator Widget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-500/10 px-4 py-1.5 rounded-full w-fit uppercase tracking-widest">
              {t('sector_est_tag')}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">{t('sector_est_title')}</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
              {t('sector_est_desc')}
            </p>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)]">{t('sector_est_label')}</label>
                <span className="text-xl font-bold text-blue-600 bg-blue-500/10 px-4 py-1 rounded-full">{unitCount} {t('sector_est_unit')}</span>
              </div>
              <input 
                type="range" 
                min={20}
                max={1000}
                step={10}
                value={unitCount}
                onChange={(e) => setUnitCount(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-[#122338] text-white p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-xl">
            <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider">{t('sector_est_rec_title')}</span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-blue-400">shield</span>
                  {t('sector_est_sec')}
                </span>
                <span className="text-2xl font-bold text-blue-400">{estimatedSecurity} {t('sector_est_sec_val').replace('Personel', '').trim() || t('sector_est_sec_val')}</span>
                <span className="text-[10px] text-gray-400">{t('sector_est_sec_desc')}</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-emerald-400">cleaning_services</span>
                  {t('sector_est_clean')}
                </span>
                <span className="text-2xl font-bold text-emerald-400">{estimatedCleaning} {t('sector_est_clean_val').replace('Personel', '').trim() || t('sector_est_clean_val')}</span>
                <span className="text-[10px] text-gray-400">{t('sector_est_clean_desc')}</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-amber-400">build</span>
                  {t('sector_est_tech')}
                </span>
                <span className="text-2xl font-bold text-amber-400">{estimatedTechnical} {t('sector_est_tech_val').replace('Personel', '').trim() || t('sector_est_tech_val')}</span>
                <span className="text-[10px] text-gray-400">{t('sector_est_tech_desc')}</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-purple-400">badge</span>
                  {t('sector_est_mgr')}
                </span>
                <span className="text-2xl font-bold text-purple-400">{estimatedManager} {t('sector_est_mgr_val').replace('Müdür', '').trim() || t('sector_est_mgr_val')}</span>
                <span className="text-[10px] text-gray-400">{t('sector_est_mgr_desc')}</span>
              </div>
            </div>

            <Link href="/teklif-al" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl text-center text-sm transition-transform hover:scale-105 shadow-lg">
              {t('sector_est_btn')}
            </Link>
          </div>
        </div>

        {/* 4 Sector Cards Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl transition-all">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                    {s.kpi}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">{s.title}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">{s.desc}</p>

                <div className="flex flex-col gap-2 pt-2">
                  {s.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      <span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/teklif-al" className="w-fit bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-xl text-xs hover:opacity-95 transition-opacity flex items-center gap-2">
                {t('sector_get_quote')}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">{t('sector_faq_title')}</h2>
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
                {openFaq === i && (
                  <div className="p-6 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10 text-sm text-[var(--color-secondary)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call To Action Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('sector_cta_title')}</h2>
            <p className="text-sm text-gray-300 font-light max-w-xl">
              {t('sector_cta_desc')}
            </p>
          </div>
          <Link href="/teklif-al" className="bg-white text-blue-900 font-bold py-4 px-8 rounded-2xl shrink-0 text-sm hover:bg-gray-100 transition-transform hover:scale-105 shadow-md">
            {t('sector_cta_btn')}
          </Link>
        </div>

      </section>
    </>
  );
}


