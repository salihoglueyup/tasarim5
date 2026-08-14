"use client";

import PageHeader from '@/components/layout/PageHeader';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';
import { RelatedArticles } from '@/components';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import FacilityCalculator from '@/components/sections/FacilityCalculator';
import FacilityTestimonials from '@/components/sections/FacilityTestimonials';
import Image from 'next/image';

export default function TesisYonetimi() {
  const { t } = useLanguage();

  const legalSteps = [
    { name: t('fac_step_1_title'), text: t('fac_step_1_desc') },
    { name: t('fac_step_2_title'), text: t('fac_step_2_desc') },
    { name: t('fac_step_3_title'), text: t('fac_step_3_desc') },
    { name: t('fac_step_4_title'), text: t('fac_step_4_desc') }
  ];

  const faqs = [
    { question: t('fac_faq_1_q'), answer: t('fac_faq_1_a') },
    { question: t('fac_faq_2_q'), answer: t('fac_faq_2_a') },
    { question: t('fac_faq_3_q'), answer: t('fac_faq_3_a') }
  ];

  const breadcrumbLd = generateBreadcrumbs([
    { name: t('nav_home'), url: '/' },
    { name: t('nav_all_services'), url: '/hizmetler' },
    { name: t('fac_title'), url: '/hizmetler/tesis-yonetimi' }
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbLd, webPageSchema({ path: '/hizmetler/tesis-yonetimi', speakableSelectors: ['h1', '#speakable-content'] })]} />
      <ServiceSeo 
        serviceType={t('serv_fac_name')}
        description={t('fac_desc')}
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt="tesis-yonetimi hero" fill className="object-cover object-center opacity-30" priority />
        </div>
        
        {/* Abstract Minimal Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 mix-blend-screen z-0 hidden md:block">
            <div className="absolute inset-0 border border-slate-400/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-16 border border-slate-300/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            <div className="absolute inset-32 border border-slate-200/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
            <div className="absolute inset-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <div className="relative z-20 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-sm font-bold text-slate-300 bg-slate-500/10 border border-slate-500/20 px-6 py-2 rounded-full backdrop-blur-md tracking-wider uppercase">
              {t('fac_banner_badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_fac_hero_title') }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'Service', name: t('serv_fac_name') }}
              ratingValue={4.9}
              reviewCount={312}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('fac_banner_desc')}
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
        
        {/* Facility Calculator */}
        <div className="-mt-32 relative z-30">
          <FacilityCalculator />
        </div>

        {/* Legal Debt Collection 4-Step Flow using HowToSeo */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name={t('fac_steps_title')}
            description="Tesis yönetimine profesyonel geçiş sürecimiz dört temel adımdan oluşmaktadır."
            steps={legalSteps}
          />
        </div>

        {/* Facility Specific Social Proof */}
        <FacilityTestimonials />

        {/* Service Specific FAQ via DynamicFAQ Component */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('fac_faq_title')} />
        </div>

      </section>

      <SeoTextSection
        titleKey="tesis_seo_title"
        p1Key="tesis_seo_p1"
        p2Key="tesis_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi" />
      <RelatedArticles pillar="/hizmetler/tesis-yonetimi" />
    </>
  );
}
