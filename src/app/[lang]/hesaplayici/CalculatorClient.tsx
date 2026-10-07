"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/page/PageHeader';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import CallbackForm from '@/components/cro/CallbackForm';
import ChecklistAuditSeo from '@/components/seo/facility/ChecklistAuditSeo';
import QuizAuditScoreSeo from '@/components/seo/facility/QuizAuditScoreSeo';
import ServiceAuthorityHubSeo from '@/components/seo/facility/ServiceAuthorityHubSeo';
import FacilityAuditReportModal from '@/components/modals/FacilityAuditReportModal';

import { calculateDuesLocalized, CalcConfig } from '@/lib/hesaplayici';

import Icon from '@/components/ui/branding/Icon';
import TrOnly from '@/components/seo/TrOnly';
import { localePath } from '@/lib/i18n/localePath';

const GUIDE_LINKS = [
  { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi' },
  { href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi' },
  { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi' },
  { href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi' },
  { href: '/hizmetler/aidat-takibi' },
  { href: '/hizmetler/teknik-bakim' },
];
const PILLAR_EMOJI = ['🛡️', '🧹', '⚡', '📑'];
const MICRO_ICONS = [
  { icon: 'trending_down', tone: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { icon: 'verified', tone: 'bg-slate-500/10 text-slate-600 dark:text-slate-400' },
  { icon: 'smartphone', tone: 'bg-slate-500/10 text-slate-700 dark:text-slate-300' },
];
export default function CalculatorClient({ initialConfig }: { initialConfig: CalcConfig }) {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [units, setUnits] = useState<number>(45);
  const [blocks, setBlocks] = useState<number>(3);
  const [elevators, setElevators] = useState<number>(6);
  const [hasSecurity, setHasSecurity] = useState<boolean>(true);
  const [hasPool, setHasPool] = useState<boolean>(true);
  const [hasGreenSpace, setHasGreenSpace] = useState<boolean>(true);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);

  // Faz 165: 4 Dilde Yerelleştirilmiş Aidat ve Bütçe Tahmini
  const {
    estimatedDuesPerUnit,
    totalMonthlyBudget,
    estimatedSavings,
    formattedDuesPerUnit,
    formattedTotalMonthlyBudget,
    formattedEstimatedSavings,
  } = calculateDuesLocalized({
    units,
    elevators,
    hasSecurity,
    hasPool,
    hasGreenSpace,
  }, language, initialConfig);

  return (
    <>
      <PageHeader 
        title={t('calc_page_title')} 
        description={t('calc_page_desc')} 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        
        {/* Özet rehber */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
              <Icon name="calculate" className="text-[18px] text-emerald-600 dark:text-emerald-400" />
              <span>{tk('calx_guide_badge')}</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-[var(--color-surface-variant)] px-3 py-1 rounded-lg border border-[var(--color-outline)]/60">
              {tk('calx_guide_tag')}
            </span>
          </div>

          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>{tk('calx_guide_p1')}</p>
            <p>{tk('calx_guide_p2')}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {GUIDE_LINKS.map((l, i) => (
                <Link key={l.href} href={localePath(l.href, language)} className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {tk(`calx_link_${i + 1}`)}
                </Link>
              ))}
            </p>
            <p>{tk('calx_guide_p3')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              {PILLAR_EMOJI.map((emoji, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>{emoji}</span> {tk(`calx_pillar_${i + 1}_title`)}
                  </span>
                  <p className="text-[var(--color-secondary)]">{tk(`calx_pillar_${i + 1}_desc`)}</p>
                </div>
              ))}
            </div>

            <p>{tk('calx_guide_close')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            {MICRO_ICONS.map((m, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                  <span className={`w-8 h-8 rounded-xl ${m.tone} flex items-center justify-center shrink-0`}>
                    <Icon name={m.icon} className="text-lg" />
                  </span>
                  <span>{tk(`calx_micro_${i + 1}_title`)}</span>
                </div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{tk(`calx_micro_${i + 1}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/50 shadow-sm flex flex-col gap-10">
            
            <h2 className="text-2xl font-bold text-[var(--color-primary)] flex items-center gap-3">
              <Icon name="tune" className="text-[var(--color-primary)] text-3xl" />
              {t('calc_params_title')}
            </h2>

            {/* Slider: Daire Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">{t('calc_unit_label')}</label>
                <span className="bg-slate-900/10 dark:bg-white/10 text-[var(--color-primary)] px-4 py-1.5 rounded-full font-bold text-lg">{units} {t('calc_unit_val')}</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={500} 
                step={5}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
            </div>

            {/* Slider: Blok Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">{t('calc_block_label')}</label>
                <span className="bg-slate-900/10 dark:bg-white/10 text-[var(--color-primary)] px-4 py-1.5 rounded-full font-bold text-lg">{blocks} {t('calc_block_val')}</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={30} 
                step={1}
                value={blocks}
                onChange={(e) => setBlocks(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
            </div>

            {/* Slider: Asansör Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">{t('calc_elev_label')}</label>
                <span className="bg-slate-900/10 dark:bg-white/10 text-[var(--color-primary)] px-4 py-1.5 rounded-full font-bold text-lg">{elevators} {t('calc_elev_val')}</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={40} 
                step={1}
                value={elevators}
                onChange={(e) => setElevators(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
              />
            </div>

            <hr className="border-[var(--color-outline)]/30 my-2" />

            {/* Feature Toggles */}
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg text-[var(--color-primary)]">{t('calc_feat_title')}</h3>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60">
                <div className="flex items-center gap-3">
                  <Icon name="shield" className="text-2xl text-[var(--color-primary)]" />
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">{t('calc_feat_sec')}</div>
                    <div className="text-xs text-[var(--color-secondary)]">{t('calc_feat_sec_desc')}</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasSecurity} 
                  onChange={(e) => setHasSecurity(e.target.checked)}
                  className="w-6 h-6 rounded accent-slate-900 dark:accent-white cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60">
                <div className="flex items-center gap-3">
                  <Icon name="pool" className="text-2xl text-[var(--color-primary)]" />
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">{t('calc_feat_pool')}</div>
                    <div className="text-xs text-[var(--color-secondary)]">{t('calc_feat_pool_desc')}</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasPool} 
                  onChange={(e) => setHasPool(e.target.checked)}
                  className="w-6 h-6 rounded accent-slate-900 dark:accent-white cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60">
                <div className="flex items-center gap-3">
                  <Icon name="park" className="text-2xl text-[var(--color-primary)]" />
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">{t('calc_feat_green')}</div>
                    <div className="text-xs text-[var(--color-secondary)]">{t('calc_feat_green_desc')}</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={hasGreenSpace} 
                  onChange={(e) => setHasGreenSpace(e.target.checked)}
                  className="w-6 h-6 rounded accent-slate-900 dark:accent-white cursor-pointer"
                />
              </div>

            </div>

          </div>

          {/* Results Summary Card Sticky */}
          <div className="lg:col-span-5 sticky top-28">
            <motion.div 
              layout
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] p-8 md:p-12 rounded-[2.5rem] shadow-sm flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-[var(--color-primary)]">
                <Icon name="calculate" className="text-9xl" />
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                  {t('calc_report_tag')}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[var(--color-secondary)] text-sm font-light">{t('calc_report_dues_label')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-primary)]">{formattedDuesPerUnit}</span>
                  <span className="text-[var(--color-secondary)] text-lg">{t('calc_report_per_month')}</span>
                </div>
              </div>

              <hr className="border-[var(--color-outline)]/40" />

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[var(--color-secondary)]">{t('calc_report_budget_label')}</span>
                  <span className="text-2xl font-bold text-[var(--color-primary)]">{formattedTotalMonthlyBudget}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{t('calc_report_savings_label')}</span>
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formattedEstimatedSavings}</span>
                </div>
              </div>

              <div className="bg-[var(--color-surface-variant)] p-5 rounded-2xl border border-[var(--color-outline)]/60 flex items-start gap-3">
                <Icon name="verified" className="text-slate-600 dark:text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  {t('calc_report_info')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link 
                  href={localePath('/teklif-al', language)}
                  className="flex-1 bg-[var(--color-primary)] text-[var(--color-surface)] hover:opacity-90 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 shadow-md text-sm"
                >
                  {t('calc_btn_quote')}
                  <Icon name="arrow_forward" className="text-base" />
                </Link>

<TrOnly>
                <button 
                  onClick={() => setIsAuditModalOpen(true)}
                  className="bg-[var(--color-surface-variant)] hover:bg-[var(--color-outline)]/40 border border-[var(--color-outline)]/60 text-[var(--color-primary)] font-bold py-4 px-5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
                  title="Resmi PDF Tesis Sağlık ve Tasarruf Karnesi Oluştur"
                >
                  <Icon name="assessment" className="text-base" />
                  <span>PDF Raporu Al</span>
                </button>
</TrOnly>
              </div>

<TrOnly>
              <button 
                onClick={() => setIsAuditModalOpen(true)}
                className="w-full py-3 bg-[var(--color-surface-variant)] hover:bg-slate-200/60 dark:hover:bg-[var(--color-outline)] border border-[var(--color-outline)]/60 rounded-2xl text-xs font-extrabold text-[var(--color-primary)] flex items-center justify-center gap-2 transition-all"
              >
                <Icon name="verified" className="text-sm text-slate-600 dark:text-slate-400" />
                <span>Yönetim Kurulu İçin Resmi Tasarruf Karnesi Üret</span>
              </button>
</TrOnly>

            </motion.div>

            {/* Hesaplayıcı → lead (CRO Track 2): tahmini görüşmek için geri-arama. */}
            <div className="mt-6">
              <div className="mb-3 px-1">
                <h3 className="font-bold text-[var(--color-primary)]">{t('calc_lead_title')}</h3>
                <p className="text-xs text-[var(--color-secondary)]">{t('calc_lead_desc')}</p>
              </div>
              <CallbackForm
                variant="card"
                meta={{
                  kaynak: 'hesaplayici',
                  bagimsizBolum: units,
                  blok: blocks,
                  asansor: elevators,
                  guvenlik: hasSecurity,
                  havuz: hasPool,
                  yesilAlan: hasGreenSpace,
                  tahminiAidat: estimatedDuesPerUnit,
                  aylikButce: totalMonthlyBudget,
                }}
              />
            </div>
          </div>

        </div>

        {/* İnteraktif Risk Skoru & Yasal Denetim Kontrol Listesi */}
        <div className="mt-16 space-y-12">
<TrOnly>
          <QuizAuditScoreSeo />
          <ChecklistAuditSeo />
</TrOnly>
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
<TrOnly>
        <ServiceAuthorityHubSeo
          serviceName="Site ve Apartman Aidat Bütçe Simülatörü"
          serviceCategory="Finans & Bütçe Yönetimi"
          lawReferences={[
            {
              title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK) — Madde 20 & 37",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
              badge: "KMK m.20/37",
              description: "Kat malikleri arasında işletme projesi tebliği, giderlerin arsa payına göre dağılımı ve resmi itiraz prosedürleri."
            },
            {
              title: "TÜİK Tüketici Fiyat Endeksi (TÜFE/ÜFE) Resmi Veri Tabanı",
              sourceName: "Türkiye İstatistik Kurumu (TÜİK)",
              url: "https://www.tuik.gov.tr",
              badge: "TÜİK Enflasyon Verisi",
              description: "Yıllık aidat ve bakım sözleşmelerinin bütçe artış oranlarında yasal referans olarak alınan resmi enflasyon endeksleri."
            },
            {
              title: "2004 Sayılı İcra ve İflas Kanunu (İİK) — Madde 68",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2004&MevzuatTur=1&MevzuatTertip=5",
              badge: "İİK m.68",
              description: "Kesinleşen site işletme projesine dayalı aidat borçlarının ilamsız icra takibinde itirazın kesin kaldırılması kuralları."
            }
          ]}
          glossaryTerms={[
            {
              slug: "aidat",
              term: "Aidat Nedir?",
              summary: "Ortak giderlerin kat malikleri arasında arsa payı veya eşit bölüşüm esasına göre paylaştırılan yasal katkı payıdır."
            },
            {
              slug: "isletme-projesi",
              term: "İşletme Projesi Nedir?",
              summary: "Sitenin 1 yıllık tahmini gelir-gider bütçesi ve bağımsız bölümlere düşen avans payını gösteren belgedir."
            },
            {
              slug: "arsa-payi",
              term: "Arsa Payı Nedir?",
              summary: "Bağımsız bölümlere ana taşınmazın değerine oranla tahsis edilen mülkiyet ve ortak gider payıdır."
            },
            {
              slug: "gecikme-tazminati-5-yasal-faiz",
              term: "%5 Yasal Gecikme Tazminatı",
              summary: "KMK m.20/2 uyarınca gününde ödenmeyen aidatlara kanun gereği işletilen aylık %5 yasal faizdir."
            }
          ]}
        />
</TrOnly>
      </section>

      {/* Resmi PDF Tesis Sağlık & Tasarruf Karne Modalı */}
      <FacilityAuditReportModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        defaultUnits={units}
      />
    </>
  );
}

