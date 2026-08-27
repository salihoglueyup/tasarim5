"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import CallbackForm from '@/components/cro/CallbackForm';
import { ChecklistAuditSeo, QuizAuditScoreSeo, ServiceAuthorityHubSeo } from '@/components/seo';
import FacilityAuditReportModal from '@/components/modals/FacilityAuditReportModal';

import { calculateDues, CalcConfig } from '@/lib/hesaplayici';

export default function CalculatorClient({ initialConfig }: { initialConfig: CalcConfig }) {
  const { t } = useLanguage();
  const [units, setUnits] = useState<number>(45);
  const [blocks, setBlocks] = useState<number>(3);
  const [elevators, setElevators] = useState<number>(6);
  const [hasSecurity, setHasSecurity] = useState<boolean>(true);
  const [hasPool, setHasPool] = useState<boolean>(true);
  const [hasGreenSpace, setHasGreenSpace] = useState<boolean>(true);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);

  // Aidat tahmini — saf fonksiyon (src/lib/hesaplayici.ts, birim test kapsamında).
  const { estimatedDuesPerUnit, totalMonthlyBudget, estimatedSavings } = calculateDues({
    units,
    elevators,
    hasSecurity,
    hasPool,
    hasGreenSpace,
  }, initialConfig);

  return (
    <>
      <PageHeader 
        title={t('calc_page_title')} 
        description={t('calc_page_desc')} 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-16">
        
        {/* ========================================================================= */}
        {/* GOOGLE POSITION ZERO — STRATEJİK MASTER ÖZET REHBER & MEVZUAT OTORİTESİ   */}
        {/* ========================================================================= */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-emerald-600 dark:text-emerald-400">calculate</span>
              <span>Özet Rehber: Profesyonel Tesis & Site Aidat Bütçesi Nasıl Hesaplanır?</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              KMK m.20 & m.37 Yasal Bütçe Standardı
            </span>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">Profesyonel Tesis ve Site Aidat Bütçesi Hesaplama</strong>;{' '}
              <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                konut siteleri
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                iş merkezleri ve plazalar
              </Link>
              {' '}ile{' '}
              <Link href="/sektorel-cozumler/sanayi-ve-lojistik-tesis-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                sanayi tesislerinde
              </Link>{' '}
              634 Sayılı Kat Mülkiyeti Kanunu (KMK) çerçevesinde bağımsız bölüm sayısı, asansör adedi, güvenlik ve temizlik personeli ihtiyacı ile enerji tüketim parametreleri analiz edilerek yıllık tahmini işletme projesinin (KMK m.37) hazırlanması sürecidir.
            </p>
            <p>
              Bütçeleme algoritmamız;{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                634 Sayılı KMK Madde 20 (Ortak Giderlere Katılma)
              </Link>
              ,{' '}
              <Link href="/sozluk/aidat" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                KMK Madde 37 (İşletme Projesi Hazırlama Usulü)
              </Link>
              ,{' '}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2004&MevzuatTur=1&MevzuatTertip=3" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-0.5">
                2004 Sayılı İcra ve İflas Kanunu (İİK m.68)
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              {' '}ve ISO 41001 Entegre Tesis Maliyet Yönetimi standartlarına tam uyumlu olarak yapılandırılmıştır.
            </p>
            <p>
              Hesaplanan bütçe;{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Entegre Tesis Yönetimi
              </Link>
              ,{' '}
              <Link href="/hizmetler/guvenlik-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                5188 Lisanslı Özel Güvenlik
              </Link>
              ,{' '}
              <Link href="/hizmetler/aidat-takibi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Şeffaf Aidat Takibi
              </Link>
              ,{' '}
              <Link href="/hizmetler/teknik-bakim" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Teknik Bakım Servisi
              </Link>
              {' '}ve{' '}
              <Link href="/hizmetler/hukuk-ve-icra-danismanligi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                KMK Hukuk Danışmanlığı
              </Link>{' '}
              ile entegre olarak dört ana maliyet kaleminde optimize edilir:
            </p>

            {/* 4 Ana Bütçe Sütunu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🛡️</span> 5188 Özel Güvenlik & Resepsiyon Bütçesi
                </span>
                <p className="text-[var(--color-secondary)]">
                  7/24 vardiyalı özel güvenlik görevlileri, SGK primleri, yemek, yol, kıyafet, teçhizat ve Valilik izin harçları kalemleri.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🧹</span> Endüstriyel Temizlik, Hijyen & Peyzaj Giderleri
                </span>
                <p className="text-[var(--color-secondary)]">
                  Ortak alan kat personelleri, zemin yıkama otomatı amortismanı, TSE onaylı kimyasal sarfiyatı ve otomatik bahçe sulama bakımları.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>⚡</span> Asansör, Jeneratör & Elektromekanik Bakım
                </span>
                <p className="text-[var(--color-secondary)]">
                  A Tipi Muayene Kuruluşu MMO yeşil etiket harçları, jeneratör yakıt/filtreleri, kompanzasyon %0 reaktif ceza ve hidrofor periyodik bakımları.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>📑</span> İdari Yazılım, Muhasebe & KMK Hukuk Masası
                </span>
                <p className="text-[var(--color-secondary)]">
                  Canlı mobil aidat yazılımı lisansı, SMS bildirimleri, noter onaylı tebligatlar, genel kurul divan yönetimi ve ilamsız icra takibi.
                </p>
              </div>
            </div>

            <p>
              Alo Yönetim ölçek ekonomisi ve kurumsal satın alma gücü sayesinde sitelerin bütçelerinde %30'a varan net tasarruf sağlanır, yönetim kurullarının hukuki sorumlulukları sıfırlanır ve tüm sakinlere şeffaf hesap dökümü sunulur.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">trending_down</span>
                </span>
                <span>%30 Net Bütçe Tasarrufu</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Toplu satın alma gücüyle asansör, güvenlik, temizlik ve elektrik maliyetlerinde doğrudan tasarruf.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">verified</span>
                </span>
                <span>%100 KMK 37 Uyumlu Bilanço</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Genel kurullarda itiraz edilemez, mahkemede kesin delil teşkil eden şeffaf işletme projesi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">smartphone</span>
                </span>
                <span>7/24 Canlı Mobil Takip</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Her kat malikinin aidat, harcama makbuzu ve banka ekstresini anlık izleyebildiği dijital şeffaflık.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/50 shadow-sm flex flex-col gap-10">
            
            <h2 className="text-2xl font-bold text-[var(--color-primary)] flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-900 dark:text-white text-3xl">tune</span>
              {t('calc_params_title')}
            </h2>

            {/* Slider: Daire Sayısı */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)] text-lg">{t('calc_unit_label')}</label>
                <span className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white px-4 py-1.5 rounded-full font-bold text-lg">{units} {t('calc_unit_val')}</span>
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
                <span className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white px-4 py-1.5 rounded-full font-bold text-lg">{blocks} {t('calc_block_val')}</span>
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
                <span className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white px-4 py-1.5 rounded-full font-bold text-lg">{elevators} {t('calc_elev_val')}</span>
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
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">shield</span>
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

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">pool</span>
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

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">park</span>
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
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">calculate</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-white/10 text-slate-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                  {t('calc_report_tag')}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-gray-300 text-sm font-light">{t('calc_report_dues_label')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold tracking-tight">₺{estimatedDuesPerUnit.toLocaleString()}</span>
                  <span className="text-gray-300 text-lg">{t('calc_report_per_month')}</span>
                </div>
              </div>

              <hr className="border-white/15" />

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400">{t('calc_report_budget_label')}</span>
                  <span className="text-2xl font-bold">₺{totalMonthlyBudget.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-semibold">{t('calc_report_savings_label')}</span>
                  <span className="text-2xl font-bold text-slate-400">~₺{estimatedSavings.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex items-start gap-3">
                <span className="material-symbols-outlined text-slate-400 shrink-0 mt-0.5">verified</span>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {t('calc_report_info')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link 
                  href="/teklif-al"
                  className="flex-1 bg-white text-slate-950 hover:bg-gray-100 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg text-sm"
                >
                  {t('calc_btn_quote')}
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>

                <button 
                  onClick={() => setIsAuditModalOpen(true)}
                  className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold py-4 px-5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
                  title="Resmi PDF Tesis Sağlık ve Tasarruf Karnesi Oluştur"
                >
                  <span className="material-symbols-outlined text-base">assessment</span>
                  <span>PDF Raporu Al</span>
                </button>
              </div>

              <button 
                onClick={() => setIsAuditModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-600/20 via-slate-800 to-blue-600/20 hover:brightness-125 border border-blue-500/30 rounded-2xl text-xs font-extrabold text-blue-300 flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-blue-400">verified</span>
                <span>Yönetim Kurulu İçin Resmi Tasarruf Karnesi Üret</span>
              </button>

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
          <QuizAuditScoreSeo />
          <ChecklistAuditSeo />
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
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

