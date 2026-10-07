"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DynamicFAQ from '@/components/seo/schema/DynamicFAQ';
import HowToSeo from '@/components/seo/schema/HowToSeo';
import SeoTextSection from '@/components/sections/trust/SeoTextSection';
import FacilitySubSectorCrossNav from '@/components/seo/facility/FacilitySubSectorCrossNav';
import FacilityRfpDownloadModalSeo from '@/components/seo/facility/FacilityRfpDownloadModalSeo';
import ServiceAuthorityHubSeo from '@/components/seo/facility/ServiceAuthorityHubSeo';
import PositionZeroAnswerBox from '@/components/seo/ai-overviews/PositionZeroAnswerBox';
import GoogleAiOverviewGroundingSeo from '@/components/seo/ai-overviews/GoogleAiOverviewGroundingSeo';
import RelatedServices from '@/components/sections/trust/RelatedServices';
import PreFooterCta from '@/components/sections/core/PreFooterCta';

import Icon from '@/components/ui/branding/Icon';
import TrOnly from '@/components/seo/TrOnly';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';
const PILLAR_ICONS = ['gavel', 'receipt_long', 'security', 'water_drop', 'sports_soccer', 'savings'];
const NETWORK_SLUGS = ['basaksehir', 'beylikduzu', 'kartal', 'maltepe', 'umraniye', 'kucukcekmece'];

export default function TopluKonutYonetimiClient() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  const pillars = PILLAR_ICONS.map((icon, i) => {
    const n = i + 1;
    return {
      icon,
      title: tk(`tkn_p${n}_title`),
      badge: tk(`tkn_p${n}_badge`),
      desc: tk(`tkn_p${n}_desc`),
      highlights: [tk(`tkn_p${n}_h1`), tk(`tkn_p${n}_h2`), tk(`tkn_p${n}_h3`)],
    };
  });
  const steps = [1, 2, 3, 4].map((n) => ({ name: tk(`tkn_step_${n}_name`), text: tk(`tkn_step_${n}_text`) }));
  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({ question: tk(`tkn_faq_${n}_q`), answer: tk(`tkn_faq_${n}_a`) }));

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-emerald-300 border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              {tk('tkn_hero_badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {tk('tkn_hero_h1a')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">{tk('tkn_hero_h1b')}</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              {tk('tkn_hero_p')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={localePath('/teklif-al', language)} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                {tk('tkn_cta_rfp')}
              </Link>
              <Link href={localePath('/hizmetler/site-yonetimi', language)} className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold py-3.5 px-8 rounded-xl transition-all flex items-center gap-2">
                <Icon name="apartment" className="text-lg" />
                {tk('tkn_cta_site')}
              </Link>
              <Link href={localePath('/hizmetler/tesis-yonetimi', language)} className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                {tk('tkn_cta_std')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Google Position Zero & AI Overviews Hızlı Yanıt Kutusu */}
<TrOnly>
        <PositionZeroAnswerBox
          id="toplu-konut-yonetimi-nedir"
          answerId="toplukonut-instant-answer-text"
          question="Toplu Konut ve Uydukent Yönetimi Nedir ve Nasıl İşletilir?"
          answer="Toplu konut ve uydukent yönetimi; 200 ile 5.000+ bağımsız bölümlü çok bloklu sitelerde KMK m.66-74 Toplu Yapı Temsilciler Kurulu hukuki organizasyonu, ada ve parsel bazlı ayrıştırılmış işletme bütçesi, 3 vardiya 5188 lisanslı güvenlik devriyesi, merkezi sulama/hidrofor otomasyonu ve toplu satınalma gücüyle %25-33 aidat tasarrufu sağlayan mega tesis işletmeciliğidir."
          standardBadge="KMK m.66-74 Toplu Yapı Standartları"
          subText="Alo Yönetim, devasa konut komplekslerinde blok temsilcileri divan yönetimi, Apsiyon dijital şeffaf mizan ve nöbetçi teknik müdahale kadroları ile sıfır bütçe açığı garantisi sunar."
          accentColor="emerald"
        />
</TrOnly>

<TrOnly>
        <GoogleAiOverviewGroundingSeo
          filterIds={['toplu-yapi-kmk66', 'aidat-gecikme-faizi', 'kmk37-itiraz']}
          title="Toplu Konut Yönetiminde Yapay Zekaya Sorun: KMK m.66-74 Toplu Yapı Hukuku"
          subtitle="Google AI Overviews, Gemini ve Claude için doğrulanmış toplu yapı temsilciler kurulu ve mega site bütçe mevzuatı."
        />
</TrOnly>

        {/* Tasarruf Banner */}
        <div className="bg-gradient-to-r from-emerald-950/50 via-slate-950/40 to-slate-900/60 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 text-center shadow-lg">
          <p className="text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">{tk('tkn_banner_label')}</p>
          <p className="text-5xl sm:text-6xl font-black text-white mb-2 tracking-tight">{tk('tkn_banner_value')}</p>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            {tk('tkn_banner_desc')}
          </p>
        </div>

        {/* 6'lı Operasyonel Standartlar Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
              {tk('tkn_sec_badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3">
              {tk('tkn_sec_title')}
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              {tk('tkn_sec_desc')}
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
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-3xl p-7 hover:border-emerald-400/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Icon name={f.icon} className="text-2xl" />
                    </span>
                    <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
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
            name={tk('tkn_howto_name')}
            description={tk('tkn_howto_desc')}
            steps={steps}
          />
        </div>

        {/* Yoğun Toplu Konut İlçeleri Çapraz Bağlantı Vitrini */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon name="domain" className="text-emerald-500 text-xl" />
            <span>{tk('tkn_net_title')}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            {tk('tkn_net_desc')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {NETWORK_SLUGS.map((slug, i) => (
              <Link
                key={slug}
                href={localePath(`/bolgeler/${slug}/tesis-yonetimi`, language)}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-400 transition-all text-center shadow-xs"
              >
                {tk(`tkn_net_${i + 1}`)}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={tk('tkn_faq_title')} />
        </div>

<TrOnly>
        {/* RFP / Şartname Hazırlama CTA & İndirme Modal */}
        <div className="bg-[var(--color-surface)] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
            Toplu Yapı İhale & Yönetici Değişimi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3 mb-2">
            Mega Siteniz İçin Profesyonel Tesis Yönetim Şartnamesi İndirin
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-secondary)] max-w-2xl mx-auto mb-6">
            KMK m.34 çift çoğunluk tutanağı, 5188 güvenlik vardiya planı ve ortak gider bütçe şablonunu içeren şartname taslağını ücretsiz edinin.
          </p>
          <FacilityRfpDownloadModalSeo />
        </div>
</TrOnly>

        {/* 4'lü Alt Sektör Silo Ağı Çapraz Gezinti */}
<TrOnly>
        <FacilitySubSectorCrossNav currentSlug="toplu-konut-yonetimi" />
</TrOnly>
      </section>

      {/* Mevzuat & Hukuki Dayanak Otorite Hub */}
<TrOnly>
      <ServiceAuthorityHubSeo
        serviceName="Toplu Konut & Mega Site Tesis Yönetimi"
        serviceCategory="Toplu Konut & Çok Bloklu Site İşletmesi"
        lawReferences={[
          {
            title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK m.34 & m.37)",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
            badge: "KMK 634",
            description: "Toplu yapılarda sayı ve arsa payı çift çoğunluğu ile yönetici seçimi, kesinleşen işletme projesi ve aidat tahsilat takvimi."
          },
          {
            title: "ISO 41001:2018 Uluslararası Tesis Yönetim Sistemi Standardı",
            sourceName: "TSE & Uluslararası Standardizasyon Örgütü",
            url: "https://www.tse.org.tr",
            badge: "KMK 634",
            description: "Mega sitelerde ölçek ekonomisi, toplu tedarik avantajları ve ortak alan teknik altyapısının sürdürülebilir işletimi."
          },
          {
            title: "Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği",
            sourceName: "T.C. Sanayi ve Teknoloji Bakanlığı",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=25804&MevzuatTur=7&MevzuatTertip=5",
            badge: "Asansör Bakım",
            description: "Çok katlı bloklarda yeşil etiket yıllık periyodik muayene, 7/24 asansör kurtarma servisi ve mekanik güvenlik."
          }
        ]}
        glossaryTerms={[
          {
            slug: "toplu-yapi-yonetimi-kmk-66-74",
            term: "Toplu Yapı Çift Çoğunluk Kuralı",
            summary: "KMK m.34 uyarınca 200+ konutlu sitelerde yönetici seçiminde aranan hem kat maliki sayısı hem de arsa payı çoğunluğudur."
          },
          {
            slug: "isletme-projesi",
            term: "KMK m.37 İşletme Projesi & %5 Faiz",
            summary: "Site bütçesinin kesinleşmesi sonrası ödenmeyen aidatlara aylık %5 yasal gecikme tazminatı uygulanmasıdır."
          },
          {
            slug: "hidrofor-ve-basinc-dengeleme-sistemi",
            term: "Merkezi Hidrofor & Dalgıç Pompa",
            summary: "Geniş peyzaj ve yüksek katlara kesintisiz basınçlı su sağlayan enerji tasarruflu hidrofor ve kuyu otomasyonudur."
          }
        ]}
      />
</TrOnly>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi" />
      <PreFooterCta />
    </>
  );
}
