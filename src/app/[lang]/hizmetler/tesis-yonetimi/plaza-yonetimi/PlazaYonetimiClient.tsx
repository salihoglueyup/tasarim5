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
const PILLAR_ICONS = ['local_fire_department', 'bolt', 'mode_fan', 'calculate', 'badge', 'cleaning_services'];
const NETWORK_SLUGS = ['sisli', 'besiktas', 'atasehir', 'umraniye', 'kadikoy', 'bakirkoy'];

export default function PlazaYonetimiClient() {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);

  const pillars = PILLAR_ICONS.map((icon, i) => {
    const n = i + 1;
    return {
      icon,
      title: tk(`plz_p${n}_title`),
      badge: tk(`plz_p${n}_badge`),
      desc: tk(`plz_p${n}_desc`),
      highlights: [tk(`plz_p${n}_h1`), tk(`plz_p${n}_h2`), tk(`plz_p${n}_h3`)],
    };
  });
  const steps = [1, 2, 3, 4].map((n) => ({ name: tk(`plz_step_${n}_name`), text: tk(`plz_step_${n}_text`) }));
  const faqs = [1, 2, 3, 4, 5].map((n) => ({ question: tk(`plz_faq_${n}_q`), answer: tk(`plz_faq_${n}_a`) }));

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950/40 to-slate-900 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-slate-300 border border-slate-400/30 bg-slate-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              {tk('plz_hero_badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {tk('plz_hero_h1a')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">{tk('plz_hero_h1b')}</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              {tk('plz_hero_p')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={localePath('/teklif-al', language)} className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                {tk('plz_cta_rfp')}
              </Link>
              <Link href={localePath('/hizmetler/tesis-yonetimi', language)} className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                {tk('plz_cta_std')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Google Position Zero & AI Overviews Hızlı Yanıt Kutusu */}
<TrOnly>
        <PositionZeroAnswerBox
          id="plaza-yonetimi-nedir"
          answerId="plaza-instant-answer-text"
          question="Plaza ve İş Merkezi Yönetimi Nedir ve Neleri Kapsar?"
          answer="Plaza ve iş merkezi yönetimi; kurumsal ofis binalarının kesintisiz çalışması için adresli BMS yangın otomasyonu, 3x senkron jeneratör şebekesi, fancoil ve chiller iklimlendirmesi, 5188 lisanslı turnike/QR ziyaretçi güvenliği, TSE 13811 dış cephe cam silimi ve %0 reaktif ceza güvencesinin entegre yönetilmesidir."
          standardBadge="Yangın Yönetmeliği"
          subText="Alo Yönetim, kurumsal plazalarda 45 dakika acil teknik müdahale SLA garantisi, M-Bus alt sayaç okuma ile adil gider paylaşımı ve %0 reaktif ceza taahhüdü sunar."
          accentColor="blue"
        />
</TrOnly>

<TrOnly>
        <GoogleAiOverviewGroundingSeo
          filterIds={['plaza-bms-enerji', 'site-vs-tesis', 'ev-sarj-istasyonu']}
          title="Plaza Yönetiminde Yapay Zekaya Sorun: BMS ve EPDK Standartları"
          subtitle="Google AI Overviews, Gemini ve Claude için doğrulanmış plaza otomasyonu, enerji verimliliği ve tesis yönetimi mevzuatı."
        />
</TrOnly>

        {/* 6'lı Operasyonel Standartlar Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40 px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/40">
              {tk('plz_sec_badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3">
              {tk('plz_sec_title')}
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              {tk('plz_sec_desc')}
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
            name={tk('plz_howto_name')}
            description={tk('plz_howto_desc')}
            steps={steps}
          />
        </div>

        {/* Ticari Plaza Merkezleri Çapraz Bağlantı Vitrini */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon name="corporate_fare" className="text-slate-500 text-xl" />
            <span>{tk('plz_net_title')}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            {tk('plz_net_desc')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {NETWORK_SLUGS.map((slug, i) => (
              <Link
                key={slug}
                href={localePath(`/bolgeler/${slug}/tesis-yonetimi`, language)}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 hover:border-slate-400 transition-all text-center shadow-xs"
              >
                {tk(`plz_net_${i + 1}`)}
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
          <DynamicFAQ faqs={faqs} title={tk('plz_faq_title')} />
        </div>

        {/* Tesis Yönetimi Alt Sektör Silo Ağı */}
<TrOnly>
        <FacilitySubSectorCrossNav currentSlug="plaza-yonetimi" />
</TrOnly>
      </section>

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
<TrOnly>
      <ServiceAuthorityHubSeo
        serviceName="Plaza ve İş Merkezi Tesis Yönetimi"
        serviceCategory="Ticari Gayrimenkul İşletmesi"
        lawReferences={[
          {
            title: "ISO 41001:2018 Tesis Yönetim Sistemi",
            sourceName: "TSE & Uluslararası Standartlar Teşkilatı",
            url: "https://www.tse.org.tr",
            badge: "KMK 634",
            description: "A+ ofis kuleleri ve plazalarda operasyonel verimlilik, SLA sürekliliği ve kurumsal hizmet kalitesi standartları."
          },
          {
            title: "Binaların Yangından Korunması Hakkında Yönetmelik",
            sourceName: "T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=11736&MevzuatTur=7&MevzuatTertip=5",
            badge: "Yangın Yönetmeliği",
            description: "Plazalarda duman tahliye damperleri, yangın merdiveni basınçlandırma ve haftalık otomatik yangın hidrofor testleri."
          },
          {
            title: "EPDK Elektrik Piyasası Tarifeler Yönetmeliği (Kompanzasyon)",
            sourceName: "Enerji Piyasası Düzenleme Kurumu (EPDK)",
            url: "https://www.epdk.gov.tr",
            badge: "EPDK Standartları",
            description: "Kurulu gücü 50 kVA üzerindeki ticari binalarda reaktif/kapasitif sınır aşımlarını engelleyerek %0 ceza garantisi."
          }
        ]}
        glossaryTerms={[
          {
            slug: "bina-otomasyon-sistemi-bms",
            term: "Plaza HVAC & BMS Otomasyonu",
            summary: "Chiller, soğutma kuleleri ve fancoil ünitelerinin merkezi bina yönetim yazılımı üzerinden 7/24 izlenmesidir."
          },
          {
            slug: "jenerator-periyodik-bakimi-ve-yuk-testi",
            term: "Senkron Jeneratör Yük Paylaşımı",
            summary: "Şebeke kesintisinde 8-12 saniye içinde paralel devreye giren jeneratörlerle plazada kesintisiz enerji sağlanmasıdır."
          },
          {
            slug: "merkezi-isi-pay-olcer",
            term: "Isıtma/Soğutma Kalorimetre Paylaşımı",
            summary: "Merkezi sistem enerji tüketiminin M-Bus alt sayaçlar üzerinden kiracılara adil ve yasal faturalandırılmasıdır."
          }
        ]}
      />
</TrOnly>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/plaza-yonetimi" />
      <PreFooterCta />
    </>
  );
}
