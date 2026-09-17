"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface BudgetCostItem {
  category: string;
  sharePercent: string;
  minRate: number;
  maxRate: number;
  allocationKey: 'Eşit Dağılım (Daire Başı)' | 'Arsa Payı Oranında' | 'Karma Dağılım';
  legalBasis: string;
  description: string;
}

export const BUDGET_MATRIX_ITEMS: BudgetCostItem[] = [
  {
    category: 'Personel & SGK Bordrolama Giderleri',
    sharePercent: '%60 - %65',
    minRate: 60,
    maxRate: 65,
    allocationKey: 'Eşit Dağılım (Daire Başı)',
    legalBasis: '634 Sayılı KMK Madde 20/1-a',
    description: 'Bina görevlisi, 5188 lisanslı güvenlik, temizlik personeli ve bahçıvan maaşları, SGK primleri ve aylık kıdem fonu.',
  },
  {
    category: 'Ortak Alan Elektrik, Su ve Doğalgaz Tüketimi',
    sharePercent: '%12 - %15',
    minRate: 12,
    maxRate: 15,
    allocationKey: 'Arsa Payı Oranında',
    legalBasis: '634 Sayılı KMK Madde 20/1-b & EPDK',
    description: 'Merkezi ısıtma, ortak aydınlatma, hidrofor ve otopark tüketimleri. Kompanzasyon takibi ile %0 reaktif ceza.',
  },
  {
    category: 'Asansör, Jeneratör & Teknik Bakım Anlaşmaları',
    sharePercent: '%10 - %12',
    minRate: 10,
    maxRate: 12,
    allocationKey: 'Arsa Payı Oranında',
    legalBasis: 'KMK 20/1-b & Asansör Yönetmeliği',
    description: 'Yıllık A Tipi akredite Yeşil Etiket, aylık TSE asansör bakımı, jeneratör ve yangın hidrofor periyodik kontrolleri.',
  },
  {
    category: 'Temizlik, Biyosidal İlaçlama & Sarf Malzemeleri',
    sharePercent: '%5 - %8',
    minRate: 5,
    maxRate: 8,
    allocationKey: 'Eşit Dağılım (Daire Başı)',
    legalBasis: 'KMK 20/1-a & Sağlık Bakanlığı',
    description: 'Ortak alan endüstriyel kimyasallar, 6 ayda bir biyosidal zararlı kontrolü ve 2007/67 su deposu klorlama.',
  },
  {
    category: 'Beklenmedik Onarım & İhtiyat Amortisman Fonu',
    sharePercent: '%5 - %10',
    minRate: 5,
    maxRate: 10,
    allocationKey: 'Arsa Payı Oranında',
    legalBasis: '634 Sayılı KMK Madde 37',
    description: 'Ani hidrofor veya pano arızalarında acil ek bütçe toplanmasını önleyen kurumsal ihtiyat rezervi.',
  },
];

export default function BudgetMatrixAiGroundingSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  const question = 'Apartman ve Sitelerde İşletme Projesi Bütçe Kalemleri ve Yüzde Oranları Nelerdir?';
  const directAnswer =
    '634 Sayılı Kat Mülkiyeti Kanunu Madde 20 ve 37 uyarınca profesyonel bir site bütçesi ortalama 5 temel kalemden oluşur: 1) Personel ve SGK bordro giderleri bütçenin %60 ila %65’ini oluşturur ve KMK 20/1-a uyarınca daire sayısına eşit bölünür; 2) Ortak alan elektrik, su ve doğalgaz tüketimi %12 ila %15 pay alır ve arsa payına göre dağıtılır; 3) Asansör yeşil etiket ve teknik bakım sözleşmeleri %10 ila %12 oranındadır; 4) Temizlik ve biyosidal ilaçlama sarf giderleri %5 ila %8’dir; 5) Ani kriz arızalarını önleyen ihtiyat avans fonu %5 ila %10 oranında bütçeye eklenir. Gününde ödenmeyen aidatlara KMK 20/2 uyarınca aylık %5 gecikme tazminatı işletilir.';

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: directAnswer,
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'KMK 37 Standart İşletme Projesi Bütçe Dağılım Anahtarı',
      description: 'Apartman ve sitelerde yasal bütçe paylaştırma oranları ve mevzuat dayanakları.',
      itemListElement: BUDGET_MATRIX_ITEMS.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: `${item.category} (${item.sharePercent})`,
        description: `${item.description} Dağıtım Anahtarı: ${item.allocationKey}. Yasal Dayanak: ${item.legalBasis}.`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Site İşletme Bütçesi Kalemleri ve KMK 37 Dağılım Matrisi | Google AI Overview',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#budget-matrix-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="budget-matrix-ai-grounding"
      aria-label="Google AI Overviews İşletme Projesi Bütçe Dağılım Matrisi"
      className={`bg-[var(--color-surface)] border border-amber-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-yellow-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">pie_chart</span>
          <span>Google AI Overviews • KMK 37 Bütçe Dağılım Matrisi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-300/40">
            5 Temel Bütçe Kalemi
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            KMK 20/1 Yasal Dağıtım
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[var(--color-heading-text)] tracking-tight mb-3 relative z-10">
        Site İşletme Projesi Bütçe Dağılım Tablosu & Oranları
      </h2>

      {/* Speakable Instant Answer Box */}
      <div className="bg-gradient-to-br from-amber-500/[0.04] to-transparent border border-amber-500/20 rounded-2xl p-5 sm:p-6 mb-6 relative z-10">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
            Google AI Doğrudan Cevap & Formül Özeti
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              {copied ? 'done' : 'content_copy'}
            </span>
            <span>{copied ? 'Kopyalandı' : 'AI Özetini Kopyala'}</span>
          </button>
        </div>
        <p
          id="budget-matrix-instant-answer-text"
          className="text-xs sm:text-sm text-[var(--color-primary)] font-medium leading-relaxed"
        >
          {directAnswer}
        </p>
      </div>

      {/* Structured Cost Table / Progress Cards */}
      <div className="space-y-3 relative z-10">
        {BUDGET_MATRIX_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-black text-sm text-[var(--color-heading-text)]">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300">
                  {item.sharePercent}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[var(--color-secondary)]">
                  {item.allocationKey}
                </span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                {item.legalBasis}
              </div>
              <div className="w-32 bg-slate-200 dark:bg-white/10 h-2 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${item.maxRate}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
