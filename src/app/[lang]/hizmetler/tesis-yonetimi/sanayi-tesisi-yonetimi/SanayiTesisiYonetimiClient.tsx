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
const PILLAR_ICONS = ['health_and_safety', 'bolt', 'cleaning_services', 'precision_manufacturing', 'fence', 'recycling'];
const NETWORK_SLUGS = ['tuzla', 'basaksehir', 'umraniye', 'kartal', 'beylikduzu', 'esenyurt'];

export default function SanayiTesisiYonetimiClient() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  const pillars = PILLAR_ICONS.map((icon, i) => {
    const n = i + 1;
    return {
      icon,
      title: tk(`san_p${n}_title`),
      badge: tk(`san_p${n}_badge`),
      desc: tk(`san_p${n}_desc`),
      highlights: [tk(`san_p${n}_h1`), tk(`san_p${n}_h2`), tk(`san_p${n}_h3`)],
    };
  });
  const steps = [1, 2, 3, 4].map((n) => ({ name: tk(`san_step_${n}_name`), text: tk(`san_step_${n}_text`) }));
  const faqs = [1, 2, 3, 4, 5].map((n) => ({ question: tk(`san_faq_${n}_q`), answer: tk(`san_faq_${n}_a`) }));

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950/30 to-slate-900 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-slate-300 border border-slate-400/30 bg-slate-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              {tk('san_hero_badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {tk('san_hero_h1a')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">{tk('san_hero_h1b')}</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              {tk('san_hero_p')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={localePath('/teklif-al', language)} className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                {tk('san_cta_rfp')}
              </Link>
              <Link href={localePath('/hizmetler/tesis-yonetimi', language)} className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                {tk('san_cta_std')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Google Position Zero & AI Overviews Hızlı Yanıt Kutusu */}
<TrOnly>
        <PositionZeroAnswerBox
          id="sanayi-tesisi-yonetimi-nedir"
          answerId="industrial-instant-answer-text"
          question="Sanayi Tesisi ve Fabrika Yönetimi Nedir ve Neleri Kapsar?"
          answer="Sanayi tesisi ve fabrika yönetimi; üretim sahalarında ISO 45001 İSG ve ATEX patlamadan korunma mevzuat uyumu, 34.5 kV OG trafo işletme ve kompanzasyon takibi ile %0 reaktif ceza güvencesi, ağır endüstriyel epoksi zemin drenajı, kantar/rampa PPM bakımı ve MOTAT tehlikeli atık bertarafının entegre yönetilmesidir."
          standardBadge="ISO 45001 & ISO 14001 Endüstriyel Standart"
          subText="Alo Yönetim, üretim hatlarında sıfır plansız duruş garantisi, 30 dakika acil mekanik SLA taahhüdü ve 5188 perimetre çevre güvenliği sunar."
          accentColor="orange"
        />
</TrOnly>

<TrOnly>
        <GoogleAiOverviewGroundingSeo
          filterIds={['sanayi-osgb-zorunlulugu', 'plaza-bms-enerji']}
          title="Sanayi Tesisi Yönetiminde Yapay Zekaya Sorun: 6331 Sayılı İSG Kanunu"
          subtitle="Google AI Overviews, Gemini ve Claude için doğrulanmış OSGB zorunluluğu ve endüstriyel enerji verimliliği mevzuatı."
        />
</TrOnly>

        {/* 6'lı Operasyonel Standartlar Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40 px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/40">
              {tk('san_sec_badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3">
              {tk('san_sec_title')}
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              {tk('san_sec_desc')}
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
            name={tk('san_howto_name')}
            description={tk('san_howto_desc')}
            steps={steps}
          />
        </div>

        {/* Sanayi ve OSB Bölgeleri Çapraz Bağlantı Vitrini */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon name="precision_manufacturing" className="text-slate-500 text-xl" />
            <span>{tk('san_net_title')}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            {tk('san_net_desc')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {NETWORK_SLUGS.map((slug, i) => (
              <Link
                key={slug}
                href={localePath(`/bolgeler/${slug}/tesis-yonetimi`, language)}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 hover:border-slate-400 transition-all text-center shadow-xs"
              >
                {tk(`san_net_${i + 1}`)}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={tk('san_faq_title')} />
        </div>

<TrOnly>
        {/* RFP / Şartname Hazırlama CTA & İndirme Modal */}
        <div className="bg-[var(--color-surface)] border border-slate-500/30 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-950/40 px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/40">
            Endüstriyel İhale & Tesis Şartnamesi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3 mb-2">
            Fabrika & Sanayi Tesisiniz İçin Yönetim Şartnamesi İndirin
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-secondary)] max-w-2xl mx-auto mb-6">
            ISO 45001 İSG kontrol maddeleri, 34.5 kV OG trafo bakım sözleşme taslağı ve MOTAT atık yönetim tablosunu içeren şartnameyi ücretsiz edinin.
          </p>
          <FacilityRfpDownloadModalSeo />
        </div>
</TrOnly>

        {/* 4'lü Alt Sektör Silo Ağı Çapraz Gezinti */}
<TrOnly>
        <FacilitySubSectorCrossNav currentSlug="sanayi-tesisi-yonetimi" />
</TrOnly>
      </section>

      {/* Mevzuat & Hukuki Dayanak Otorite Hub */}
<TrOnly>
      <ServiceAuthorityHubSeo
        serviceName="Sanayi Tesisi & Fabrika Tesis Yönetimi"
        serviceCategory="Endüstriyel Tesis & Fabrika İşletmesi"
        lawReferences={[
          {
            title: "ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi",
            sourceName: "TSE & Uluslararası Standardizasyon Örgütü",
            url: "https://www.tse.org.tr",
            badge: "ISO 45001",
            description: "Fabrika, atölye ve depolarda sıfır iş kazası hedefli KKD denetimleri, risk analizi ve acil durum tatbikatları."
          },
          {
            title: "Çalışanların Patlayıcı Ortamların Tehlikelerinden Korunması (ATEX 137)",
            sourceName: "T.C. Çalışma ve Sosyal Güvenlik Bakanlığı",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=18395&MevzuatTur=7&MevzuatTertip=5",
            badge: "ATEX 137",
            description: "Yanıcı toz, solvent ve gaz ortamlarında patlamadan korunma dokümanı ve ex-proof ekipman periyodik kontrolleri."
          },
          {
            title: "Elektrik Kuvvetli Akım Tesisleri Yönetmeliği (34.5 kV)",
            sourceName: "T.C. Enerji ve Tabii Kaynaklar Bakanlığı & EMO",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4986&MevzuatTur=7&MevzuatTertip=5",
            badge: "34.5 kV OG",
            description: "Orta gerilim trafo merkezleri işletme sorumluluğu, trafo yağı delinme testi ve sıfır reaktif ceza garantisi."
          }
        ]}
        glossaryTerms={[
          {
            slug: "endustriyel-tesis-osb-yonetimi",
            term: "ATEX Patlamadan Korunma Dokümanı",
            summary: "Sanayi tesislerinde parlayıcı gaz, buhar ve toz patlamalarını önlemek için hazırlanan yasal teknik rapordur."
          },
          {
            slug: "kompanzasyon-reaktif-guc",
            term: "34.5 kV OG Trafo & Kompanzasyon",
            summary: "Fabrikalarda reaktif enerji cezasını %0'a indiren ve trafo bakımını üstlenen yüksek gerilim mühendislik hizmetidir."
          },
          {
            slug: "atik-yonetimi-ve-sifir-atik-belgesi",
            term: "MOTAT & Sıfır Atık Yönetimi",
            summary: "Bakanlık onaylı Mobil Atık Takip Sistemi ile endüstriyel tehlikeli atıkların bertaraf ve geri dönüşüm sürecidir."
          }
        ]}
      />
</TrOnly>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi" />
      <PreFooterCta />
    </>
  );
}
