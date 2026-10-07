"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DynamicFAQ from '@/components/seo/schema/DynamicFAQ';
import HowToSeo from '@/components/seo/schema/HowToSeo';
import SeoTextSection from '@/components/sections/trust/SeoTextSection';
import FacilityRfpDownloadModalSeo from '@/components/seo/facility/FacilityRfpDownloadModalSeo';
import InteractiveFacilityAuditRadarSeo from '@/components/seo/facility/InteractiveFacilityAuditRadarSeo';
import FacilityComparisonMatrixSeo from '@/components/seo/facility/FacilityComparisonMatrixSeo';
import FacilityDownloadableVaultSeo from '@/components/seo/facility/FacilityDownloadableVaultSeo';
import FacilitySubSectorCrossNav from '@/components/seo/facility/FacilitySubSectorCrossNav';
import AiOverviewStepSolverSeo from '@/components/seo/ai-overviews/AiOverviewStepSolverSeo';
import RelatedServices from '@/components/sections/trust/RelatedServices';
import PreFooterCta from '@/components/sections/core/PreFooterCta';

import Icon from '@/components/ui/branding/Icon';
import TrOnly from '@/components/seo/TrOnly';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';
export default function TesisYonetimiRehberClient() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  const mistakes = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    num: String(n).padStart(2, '0'),
    title: tk(`rhb_m${n}_title`),
    mistake: tk(`rhb_m${n}_mistake`),
    solution: tk(`rhb_m${n}_solution`),
  }));
  const steps = [1, 2, 3, 4, 5, 6].map((n) => ({ name: tk(`rhb_step_${n}_name`), text: tk(`rhb_step_${n}_text`) }));
  const faqs = [1, 2, 3, 4, 5].map((n) => ({ question: tk(`rhb_faq_${n}_q`), answer: tk(`rhb_faq_${n}_a`) }));

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[65vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950/40 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-500 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-slate-300 border border-slate-400/30 bg-slate-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              {tk('rhb_hero_badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {tk('rhb_hero_h1a')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500">{tk('rhb_hero_h1b')}</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              {tk('rhb_hero_p')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
<TrOnly>
              <a href="#rfp-section" className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                <Icon name="download" className="text-lg" />
                <span>{tk('rhb_cta_rfp')}</span>
              </a>
</TrOnly>
              <Link href={localePath('/teklif-al', language)} className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                {tk('rhb_cta_quote')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">

        {/* 1. BÖLÜM: B2B İhale ve Yönetim Şartnamesi (RFP) İndirme Modalı */}
<TrOnly>
        <div id="rfp-section" className="scroll-mt-28">
          <FacilityRfpDownloadModalSeo />
        </div>
</TrOnly>

        {/* 2. BÖLÜM: Şirket Seçiminde Yapılan 7 Ölümcül Hata Kılavuzu */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider bg-rose-50 dark:bg-rose-950/40 px-3.5 py-1.5 rounded-full border border-rose-200/60 dark:border-rose-800/40">
              {tk('rhb_sec_badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)] mt-3">
              {tk('rhb_sec_title')}
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2 font-light">
              {tk('rhb_sec_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mistakes.map((item) => (
              <div
                key={item.num}
                className="p-7 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-rose-400/50 hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-rose-500 font-mono">{item.num}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40">
                      {tk('rhb_mistake_label')}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-4">
                    {item.mistake}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-outline)]/40 bg-emerald-500/5 dark:bg-emerald-950/20 p-3.5 rounded-2xl border-emerald-500/20">
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Icon name="verified" className="text-sm" />
                    <span>{tk('rhb_solution_label')}</span>
                  </div>
                  <p className="text-xs text-[var(--color-primary)] leading-relaxed font-medium">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. BÖLÜM: İnteraktif Tesis Uyumluluk & Tasarruf Radarı (100 Puanlık Skorkart) */}
<TrOnly>
        <div>
          <InteractiveFacilityAuditRadarSeo districtName="İstanbul" />
        </div>
</TrOnly>

        {/* 4. BÖLÜM: Büyük Karşılaştırma Matrisi (Alo Yönetim vs. Bireysel vs. Merdivenaltı) */}
<TrOnly>
        <div>
          <FacilityComparisonMatrixSeo />
        </div>
</TrOnly>

        {/* 5. BÖLÜM: 6 Adımda Doğru Şirket Seçim ve Geçiş Süreci */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo
            name={tk('rhb_howto_name')}
            description={tk('rhb_howto_desc')}
            steps={steps}
          />
        </div>

        {/* 5.5 BÖLÜM: Google AI Overviews Adım Adım Problem Çözücü & Uyuşmazlık Çözümü (HowTo) */}
<TrOnly>
        <AiOverviewStepSolverSeo />
</TrOnly>

        {/* 6. BÖLÜM: Resmi Hukuki Belge & Şablon İndirme Kasası */}
<TrOnly>
        <div>
          <FacilityDownloadableVaultSeo />
        </div>
</TrOnly>

        {/* 7. BÖLÜM: 5'li Alt Sektör Silo Ağı & Bölgesel Hub Çapraz Gezintisi */}
<TrOnly>
        <FacilitySubSectorCrossNav currentSlug="rehber" />
</TrOnly>

        {/* 8. BÖLÜM: Sık Sorulan Sorular */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={tk('rhb_faq_title')} />
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/rehber" />
      <PreFooterCta />
    </>
  );
}
