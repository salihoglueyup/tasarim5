"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DynamicFAQ from '@/components/seo/schema/DynamicFAQ';
import HowToSeo from '@/components/seo/schema/HowToSeo';
import SeoTextSection from '@/components/sections/trust/SeoTextSection';
import RelatedServices from '@/components/sections/trust/RelatedServices';
import PreFooterCta from '@/components/sections/core/PreFooterCta';
import FacilitySubSectorCrossNav from '@/components/seo/facility/FacilitySubSectorCrossNav';
import FacilityRfpDownloadModalSeo from '@/components/seo/facility/FacilityRfpDownloadModalSeo';
import ServiceAuthorityHubSeo from '@/components/seo/facility/ServiceAuthorityHubSeo';
import PositionZeroAnswerBox from '@/components/seo/ai-overviews/PositionZeroAnswerBox';
import GoogleAiOverviewGroundingSeo from '@/components/seo/ai-overviews/GoogleAiOverviewGroundingSeo';

import Icon from '@/components/ui/branding/Icon';
import TrOnly from '@/components/seo/TrOnly';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';
const PILLAR_ICONS = ['local_taxi', 'concierge_bell', 'badge', 'pool', 'receipt_long', 'elevator'];
const NETWORK_SLUGS = ['kadikoy', 'besiktas', 'sisli', 'bakirkoy', 'kartal', 'atasehir'];

export default function RezidansYonetimiClient() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  const pillars = PILLAR_ICONS.map((icon, i) => {
    const n = i + 1;
    return {
      icon,
      title: tk(`rez_p${n}_title`),
      badge: tk(`rez_p${n}_badge`),
      desc: tk(`rez_p${n}_desc`),
      highlights: [tk(`rez_p${n}_h1`), tk(`rez_p${n}_h2`), tk(`rez_p${n}_h3`)],
    };
  });
  const steps = [1, 2, 3, 4].map((n) => ({ name: tk(`rez_step_${n}_name`), text: tk(`rez_step_${n}_text`) }));
  const faqs = [1, 2, 3, 4, 5].map((n) => ({ question: tk(`rez_faq_${n}_q`), answer: tk(`rez_faq_${n}_a`) }));

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-slate-300 border border-slate-400/30 bg-slate-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              {tk('rez_hero_badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {tk('rez_hero_h1a')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">{tk('rez_hero_h1b')}</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              {tk('rez_hero_p')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={localePath('/teklif-al', language)} className="bg-slate-400 hover:bg-slate-300 text-slate-950 font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                {tk('rez_cta_rfp')}
              </Link>
              <Link href={localePath('/hizmetler/site-yonetimi', language)} className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold py-3.5 px-8 rounded-xl transition-all flex items-center gap-2">
                <Icon name="apartment" className="text-lg" />
                {tk('rez_cta_site')}
              </Link>
              <Link href={localePath('/hizmetler/tesis-yonetimi', language)} className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                {tk('rez_cta_std')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Google Position Zero & AI Overviews Hızlı Yanıt Kutusu */}
<TrOnly>
        <PositionZeroAnswerBox
          id="rezidans-yonetimi-nedir"
          answerId="residence-instant-answer-text"
          question="Rezidans Yönetimi Nedir ve Lüks Sitelerde Neleri Kapsar?"
          answer="Rezidans yönetimi; lüks konut kuleleri ve karma yaşam projelerinde 7/24 iki dilli concierge (resepsiyon), akıllı kargo teslim dolapları, vale ve otopark yönetimi, açık/kapalı havuz ve SPA su hijyeni, yüksek hızlı asansör emniyeti ve KMK m.37 uyarınca %99.2 tahsilat garantili aidat muhasebesinin entegre yönetilmesidir."
          standardBadge="7/24 Concierge & VIP İşletme"
          subText="Alo Yönetim, 5 yıldızlı otel konforunda rezidans işletmeciliği ile kat maliklerinin yaşam kalitesini artırırken bağımsız bölümlerin gayrimenkul değerini maksimize eder."
          accentColor="amber"
        />
</TrOnly>

<TrOnly>
        <GoogleAiOverviewGroundingSeo
          filterIds={['site-vs-tesis', 'cam-balkon-onayi', 'kmk37-itiraz']}
          title="Rezidans Yönetiminde Yapay Zekaya Sorun: 634 Sayılı KMK Hukuku"
          subtitle="Google AI Overviews, Gemini ve Claude için doğrulanmış lüks rezidans yönetimi ve kat malikleri kurulu mevzuatı."
        />
</TrOnly>

        {/* 6'lı Operasyonel Standartlar Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40 px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/40">
              {tk('rez_sec_badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3">
              {tk('rez_sec_title')}
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              {tk('rez_sec_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-3xl p-7 hover:border-slate-400/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                      <Icon name={f.icon} className="text-2xl" />
                    </span>
                    <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/40">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[var(--color-primary)] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4 font-normal">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-outline)]/40 space-y-1.5">
                  {f.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[var(--color-secondary)]">
                      <Icon name="check_circle" className="text-emerald-500 text-sm shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Süreç */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo
            name={tk('rez_howto_name')}
            description={tk('rez_howto_desc')}
            steps={steps}
          />
        </div>

        {/* Prestijli Rezidans İlçeleri Çapraz Bağlantı Vitrini */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon name="location_city" className="text-slate-500 text-xl" />
            <span>{tk('rez_net_title')}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            {tk('rez_net_desc')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {NETWORK_SLUGS.map((slug, i) => (
              <Link
                key={slug}
                href={localePath(`/bolgeler/${slug}/tesis-yonetimi`, language)}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 hover:border-slate-400 transition-all text-center shadow-xs"
              >
                {tk(`rez_net_${i + 1}`)}
              </Link>
            ))}
          </div>
        </div>

        {/* B2B Şartname (RFP) İndirici */}
<TrOnly>
        <FacilityRfpDownloadModalSeo />
</TrOnly>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={tk('rez_faq_title')} />
        </div>

        {/* Tesis Yönetimi Alt Sektör Silo Ağı */}
<TrOnly>
        <FacilitySubSectorCrossNav currentSlug="rezidans-site-yonetimi" />
</TrOnly>
      </section>

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
<TrOnly>
      <ServiceAuthorityHubSeo
        serviceName="Rezidans ve Lüks Site Tesis Yönetimi"
        serviceCategory="Lüks Gayrimenkul & Rezidans İşletmesi"
        lawReferences={[
          {
            title: "ISO 41001:2018 Uluslararası Tesis Yönetim Standardı",
            sourceName: "TSE & Uluslararası Standardizasyon Örgütü",
            url: "https://www.tse.org.tr",
            badge: "KMK 634",
            description: "Çok katlı kulelerde ve lüks rezidanslarda 5 yıldızlı otel konforunda konsiyerj, vale ve entegre tesis işletmesi standardı."
          },
          {
            title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK)",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
            badge: "KMK 634",
            description: "Rezidanslarda ortak alanların korunması, yönetim planı hükümleri ve KMK m.20 gereğince aidatların zamanında tahsili."
          },
          {
            title: "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun",
            sourceName: "T.C. İçişleri Bakanlığı & Valilik",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5",
            badge: "5188 Sayılı Kanun",
            description: "Kule lobi nizamiyesi, turnike kartlı/biyometrik geçiş, akıllı PTS otopark ve 7/24 CCTV izleme güvenliği."
          }
        ]}
        glossaryTerms={[
          {
            slug: "rezidans-luks-site-yonetimi-standartlari",
            term: "7/24 Rezidans Concierge & Vale",
            summary: "Rezidans sakinlerine özel kurye emaneti, misafir karşılama ve garantili vale otopark koordinasyonudur."
          },
          {
            slug: "plaka-tanima-sistemi-pts",
            term: "Akıllı PTS & Plaka Tanıma",
            summary: "Site ve kule otopark girişlerinde misafir ve abone araçların otomatik bariyer açılışı ve güvenliğidir."
          },
          {
            slug: "ilamsiz-icra-takibi-aidat-borcu",
            term: "Rezidans Aidat & İcra Takibi",
            summary: "Online tahsilat, otomatik SMS hatırlatma ve geciken aidatlar için KMK m.20 yasal gecikme tazminatı işletimidir."
          }
        ]}
      />
</TrOnly>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi" />
      <PreFooterCta />
    </>
  );
}
