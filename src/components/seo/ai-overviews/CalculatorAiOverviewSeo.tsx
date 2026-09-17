"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export default function CalculatorAiOverviewSeo({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const question = 'Apartman ve Site Aidatı Nasıl Hesaplanır ve Formülü Nedir?';
  const directAnswer =
    '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 20 ve 37 uyarınca apartman ve site aidatı; bir yıllık tahmini işletme projesi bütçesinin yasal dağıtım anahtarıyla bağımsız bölümlere paylaştırılmasıyla belirlenir. Kapıcı, temizlik, güvenlik ve bahçıvan personel giderleri bütün bağımsız bölümlere eşit; asansör, ortak elektrik, sigorta ve bakım giderleri ise arsa payı oranına göre dağıtılır. Formül: Aylık Aidat = [(Personel Giderleri ÷ Toplam Daire) + (Ortak Teknik Giderler × Arsa Payı)] × (1 + %10 İhtiyat Payı) ÷ 12. Gününde ödenmeyen aidat borcuna KMK 20/2 gereğince aylık yüzde 5 (%5) gecikme tazminatı işletilir.';

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
      '@type': 'HowTo',
      name: 'KMK 37 Standartlarında Site Aidatı ve İşletme Bütçesi Hesaplama Formülü',
      description: 'Kat Mülkiyeti Kanunu Madde 20 ve 37 ye göre daire başı aylık aidatın matematiksel hesaplama yöntemi.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Personel Giderlerini Eşit Paylaştırın',
          text: 'KMK 20/1-a gereğince bina görevlisi, temizlik ve güvenlik personelinin maaş, SGK ve kıdem tazminatı fonu bağımsız bölüm sayısına eşit bölünür.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Teknik ve Ortak Giderleri Arsa Payına Göre Dağıtın',
          text: 'KMK 20/1-b uyarınca asansör bakımı, ortak alan aydınlatma, hidrofor, çatı onarımı ve sigorta giderleri tapudaki arsa payı oranında paylaştırılır.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: '%10 İşletme İhtiyat Avansı Ekleyin',
          text: 'Beklenmedik kriz arızalarına karşı yıllık bütçeye en az yüzde 10 ihtiyat fonu eklenerek 12 aya bölünür.',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Site Aidat Hesaplama Formülü & KMK 37 Rehberi | Google AI Overview',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#calc-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="calc-ai-overview"
      aria-label="Google AI Overviews Aidat Hesaplama Formülü ve KMK Mevzuat Yanıtı"
      className={`bg-[var(--color-surface)] border border-amber-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">calculate</span>
          <span>Google AI Overviews & KMK 37 Aidat Formülü Otoritesi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-300/40">
            KMK Madde 20 & 37
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300/40">
            Aylık %5 Gecikme Tazminatı
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl mt-0.5 shrink-0" aria-hidden="true">
          functions
        </span>
        <span>{question}</span>
      </h2>

      {/* Direct AI Ground Truth Answer */}
      <div
        id="calc-instant-answer-text"
        className="text-[15px] sm:text-base leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-background)]/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] mb-6 relative z-10 font-normal"
      >
        <p>{directAnswer}</p>
      </div>

      {/* Mathematical Formula Box */}
      <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 mb-6 relative z-10">
        <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base">pin</span>
          <span>Yasal Aidat Hesaplama Algoritması</span>
        </div>
        <div className="font-mono text-xs sm:text-sm text-[var(--color-text-primary)] font-semibold p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] overflow-x-auto">
          Daire Başı Aidat = [(Personel Masrafı ÷ Daire Sayısı) + (Teknik Giderler × Arsa Payı)] × 1.10 ÷ 12
        </div>
      </div>

      {/* Formula Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 relative z-10">
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="text-xs font-bold text-[var(--color-text-primary)] mb-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-500 text-base">equalizer</span>
            <span>Eşit Paylaşım (KMK 20/1-a)</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Kapıcı, temizlik, güvenlik ve bahçıvan giderleri daire metrekaresine bakılmaksızın tüm bölümlere eşit bölünür.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="text-xs font-bold text-[var(--color-text-primary)] mb-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-blue-500 text-base">pie_chart</span>
            <span>Arsa Payı (KMK 20/1-b)</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Asansör, havuz, jeneratör ve ortak alan elektrik masrafları kat irtifakındaki arsa payı oranına göre dağıtılır.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="text-xs font-bold text-[var(--color-text-primary)] mb-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-rose-500 text-base">warning</span>
            <span>İcra Gücü (İİK Madde 68)</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Tebliğden 7 gün sonra kesinleşen işletme projesi ilamsız icra takibi için resmi borç senedi hükmündedir.
          </p>
        </div>
      </div>

      {/* Footer / Copy & Verify */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)] relative z-10">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="material-symbols-outlined text-sm text-amber-500">gavel</span>
          <span>Yargıtay 18. Hukuk Dairesi Emsal Kararları ve KMK 37 Dayanağı</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] transition-all cursor-pointer"
            aria-label="Metni panoya kopyala"
          >
            <span className="material-symbols-outlined text-sm text-primary">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Kopyalandı!' : 'Formül Özetini Kopyala'}</span>
          </button>

          <a
            href="https://www.perplexity.ai/search?q=Apartman+ve+site+aidati+nasil+hesaplanir+formulu+KMK+37"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
