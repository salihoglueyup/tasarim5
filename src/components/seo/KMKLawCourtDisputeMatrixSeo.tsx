"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';

export interface KMKCourtDisputeItem {
  id: string;
  suitName: string;
  court: string;
  statuteOfLimitations: string;
  precedentNumber: string;
  lawArticle: string;
  proofRequirements: string;
  summary: string;
  consequence: string;
}

const KMK_DISPUTES: KMKCourtDisputeItem[] = [
  {
    id: 'hakimin-mudahalesi',
    suitName: 'Hakimin Müdahalesi Davası',
    court: 'Sulh Hukuk Mahkemesi',
    statuteOfLimitations: 'Uyuşmazlık sürdüğü müddetçe her zaman',
    precedentNumber: 'Yargıtay 20. H.D. 2018/1120 E., 2019/3301 K.',
    lawArticle: '634 Sayılı KMK Madde 33',
    proofRequirements: 'Yönetim planı, noter ihtarname sureti, kolluk/belediye tespit tutanağı',
    summary: 'Kat maliklerinin borç ve yükümlülüklerini yerine getirmemesi (gürültü, evcil hayvan tahliyesi, ortak alana zarar, yönetim planı ihlali) halinde hakimin emir ve tedbir koyması talebidir.',
    consequence: 'Mahkemenin verdiği süreye uymayan malike idari para cezası ve zorla icra uygulanır.',
  },
  {
    id: 'genel-kurul-iptali',
    suitName: 'Genel Kurul Kararının İptali Davası',
    court: 'Sulh Hukuk Mahkemesi',
    statuteOfLimitations: 'Toplantıda bulunanlara 1 ay, bulunmayanlara 6 ay',
    precedentNumber: 'Yargıtay 18. H.D. 2015/1429 E., 2016/2210 K.',
    lawArticle: '634 Sayılı KMK Madde 38 & 33',
    proofRequirements: 'Muhalefet şerhi içeren divan tutanağı, hazirun cetveli, çağrı tebligat belgeleri',
    summary: 'Yasal çağrı usulüne uyulmadan yapılan, yetersiz çoğunlukla karar alan veya kanunun emredici hükümlerine aykırı genel kurul kararlarının iptali davasıdır.',
    consequence: 'Karar iptal edildiğinde hukuka aykırı aidat zammı veya yönetici seçimi hükümsüz kalır.',
  },
  {
    id: 'itirazin-iptali-icra',
    suitName: 'Aidat İtirazının İptali Davası',
    court: 'Sulh Hukuk / Asliye Hukuk Mahkemesi',
    statuteOfLimitations: 'İtiraz tebliğinden itibaren 1 yıl',
    precedentNumber: 'Yargıtay Hukuk Genel Kurulu 2019/18-204 E., 2021/880 K.',
    lawArticle: 'İcra ve İflas Kanunu m.67 & KMK m.20',
    proofRequirements: 'Tebliğ edilmiş işletme projesi, karar defteri, banka aidat ekstresi',
    summary: 'İlamsız icra takibine borçlu malik veya kiracının haksız itiraz etmesi durumunda takibin devamı ve %20 icra inkar tazminatı talepli davadır.',
    consequence: 'Borçlu asıl borç + %20 icra inkar tazminatı + aylık %5 kanuni gecikme tazminatı ödemeye mahkum edilir.',
  },
  {
    id: 'eski-hale-getirme',
    suitName: "Müdahalenin Men'i & Eski Hale Getirme",
    court: 'Sulh Hukuk Mahkemesi',
    statuteOfLimitations: 'Zamanaşımı yoktur (mülkiyet hakkı)',
    precedentNumber: 'Yargıtay Hukuk Genel Kurulu 2016/18-854 E., 2019/312 K.',
    lawArticle: '634 Sayılı KMK Madde 19/2',
    proofRequirements: 'Belediye onaylı mimari proje, keşif ve bilirkişi raporu, fotoğraf kayıtları',
    summary: '4/5 kat maliki yazılı rızası alınmadan yapılan kaçak cam balkon, sığınak/otopark işgali veya ortak bahçeye yapılan izinsiz yapıların yıktırılarak eski haline getirilmesi davasıdır.',
    consequence: 'Mahkemece verilen sürede sökülmezse davacı tarafından yıktırılıp masrafı davalıdan tahsil edilir.',
  },
  {
    id: 'yonetici-azli',
    suitName: 'Yöneticinin Haklı Nedenle Azli Davası',
    court: 'Sulh Hukuk Mahkemesi',
    statuteOfLimitations: 'Görev süresi içinde her zaman',
    precedentNumber: 'Yargıtay 18. H.D. 2014/19820 E., 2015/3104 K.',
    lawArticle: '634 Sayılı KMK Madde 34/6',
    proofRequirements: 'Denetim raporu, kasa açığı belgeleri, fatura ibraz etmeme tutanağı',
    summary: 'Hesap vermekten kaçınan, işletme projesini tebliğ etmeyen veya site parasını zimmetine geçirme şüphesi bulunan yöneticinin mahkemece görevden alınıp kayyım atanması davasıdır.',
    consequence: 'Yönetici azledilir, mahkemece resen tarafsız profesyonel yönetici atanır.',
  },
  {
    id: 'kat-mulkiyeti-tescili',
    suitName: 'Kat İrtifakından Kat Mülkiyetine Tescil Davası',
    court: 'Sulh Hukuk Mahkemesi / Tapu Müdürlüğü',
    statuteOfLimitations: 'İskan alındıktan sonra her zaman',
    precedentNumber: 'Yargıtay 20. H.D. 2017/8892 E., 2018/1420 K.',
    lawArticle: '634 Sayılı KMK Madde 10 & 12',
    proofRequirements: 'Yapı Kullanma İzin Belgesi (İskan), onaylı mimari proje, bağımsız bölüm tapuları',
    summary: 'İskanı alınmış binada müteahhidin veya maliklerin imza atmaması nedeniyle kat mülkiyetine resen geçişin mahkemece sağlanması davasıdır.',
    consequence: 'Mahkeme kararı tapu siciline doğrudan tescil edilir ve cins tashihi tamamlanır.',
  },
];

export default function KMKLawCourtDisputeMatrixSeo({ className = '' }: { className?: string }) {
  const [activeId, setActiveId] = useState<string>(KMK_DISPUTES[0].id);

  const activeDispute = KMK_DISPUTES.find((d) => d.id === activeId) || KMK_DISPUTES[0];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Alo Yönetim Kat Mülkiyeti Hukuk ve Dava Yönetim Masası',
    url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
    serviceType: 'Kat Mülkiyeti Hukuku Dava ve İcra Danışmanlığı',
    areaServed: 'İstanbul',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'KMK Dava Türleri ve Mahkeme Protokolleri',
      itemListElement: KMK_DISPUTES.map((d) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: d.suitName,
          description: `${d.summary} Görevli Mahkeme: ${d.court}, Hak Düşürücü Süre: ${d.statuteOfLimitations}`,
        },
      })),
    },
  };

  return (
    <section
      id="kmk-court-matrix"
      aria-label="Kat Mülkiyeti Dava Türleri ve Mahkeme AI Matrisi"
      className={`bg-[var(--color-surface)] border border-indigo-500/30 rounded-[3rem] p-6 sm:p-10 md:p-12 shadow-sm relative overflow-hidden my-16 ${className}`}
    >
      {/* Schema.org LegalService */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 border border-indigo-600/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">gavel</span>
            Google AI Overviews & Yargıtay Hukuk Matrisi
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Kat Mülkiyetinde <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-300">6 Temel Dava Türü & Görevli Mahkemeler</span>
          </h2>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            Sulh Hukuk Mahkemeleri, hak düşürücü yasal süreler, ispat külfeti ve Yargıtay yerleşik içtihatlarıyla uyuşmazlık rehberi.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-300/40 shrink-0">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">policy</span>
          <span>7445 SK Zorunlu Arabuluculuk</span>
        </div>
      </div>

      {/* Dispute Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-8 relative z-10">
        {KMK_DISPUTES.map((item) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`text-left p-4 rounded-2xl border transition-all text-xs flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.01]'
                  : 'bg-[var(--color-surface-variant)]/60 border-[var(--color-outline)]/60 hover:border-indigo-400 text-[var(--color-primary)]'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                }`}>
                  {item.court}
                </span>
                <span className={`text-[11px] font-mono ${isSelected ? 'text-indigo-100' : 'text-[var(--color-secondary)]'}`}>
                  {item.lawArticle.split(' ')[item.lawArticle.split(' ').length - 1]}
                </span>
              </div>
              <div className="font-bold text-xs leading-snug line-clamp-1">
                {item.suitName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Dispute Details (Speakable) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDispute.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 relative z-10 space-y-5"
        >
          {/* Dispute Title & Court */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-outline)]/60">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[var(--color-primary)]">
                {activeDispute.suitName}
              </h3>
              <p className="text-xs text-[var(--color-secondary)] mt-0.5">
                Yasal Dayanak: <strong className="text-[var(--color-primary)]">{activeDispute.lawArticle}</strong> · Emsal: <span className="text-blue-600 dark:text-blue-400 font-mono">{activeDispute.precedentNumber}</span>
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold shrink-0">
              <span className="material-symbols-outlined text-sm text-amber-600" aria-hidden="true">schedule</span>
              <span>Hak Düşürücü Süre: {activeDispute.statuteOfLimitations}</span>
            </div>
          </div>

          {/* Core Summary (Speakable) */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-base" aria-hidden="true">gavel</span>
              Dava Konusu & Hukuki Çerçeve:
            </div>
            <p id="legal-court-matrix-text" className="text-sm sm:text-base text-[var(--color-primary)] leading-relaxed font-normal">
              {activeDispute.summary}
            </p>
          </div>

          {/* 2-Column Proof & Consequence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[var(--color-surface-variant)]/60 p-4 rounded-xl border border-[var(--color-outline)]/60">
              <div className="text-[var(--color-secondary)] font-medium mb-1">Gerekli Delil ve İspat Belgeleri:</div>
              <div className="font-bold text-[var(--color-primary)] leading-relaxed">{activeDispute.proofRequirements}</div>
            </div>
            <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
              <div className="text-emerald-700 dark:text-emerald-300 font-medium mb-1">Dava Sonucu & Yaptırım:</div>
              <div className="font-bold text-emerald-950 dark:text-emerald-100 leading-relaxed">{activeDispute.consequence}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
