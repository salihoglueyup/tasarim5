"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export default function SustainabilityAiOverviewSeo({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const question = 'Sitelerde Çatı GES ve Elektrikli Araç Şarj Ünitesi Kurulumunda Yasal Şartlar Nelerdir?';
  const directAnswer =
    '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 42 uyarınca ortak alan çatılarına güneş enerjisi santrali (Çatı GES) kurulabilmesi için kat malikleri kurulunun hem sayı hem arsa payı bakımından salt çoğunluğu (%50 + 1) yeterlidir. Elektrikli araç (EV) şarj ünitesi kurulumunda ise ortak alana yapılacak istasyonlar için yine salt çoğunluk; bağımsız bölüme tahsisli otoparklarda ise ana panodan çekilecek müstakil hat için Tip B kaçak akım koruma rölesi ve yangın algılama uygunluk raporu zorunludur. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Sıfır Atık Yönetmeliği kapsamında sitelerde ikili ve dörtlü atık ayrıştırma altyapısının kurulması yasal yükümlülüktür.';

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
      '@type': 'WebPage',
      name: 'Sitelerde Çatı GES & Elektrikli Araç Şarjı Yasal Mevzuatı | Google AI Overview',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#sustainability-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="sustainability-ai-overview"
      aria-label="Google AI Overviews Sürdürülebilirlik ve Yeşil Tesis Mevzuatı Özeti"
      className={`bg-[var(--color-surface)] border border-emerald-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/10 dark:bg-emerald-400/10 border border-emerald-600/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">eco</span>
          <span>Google AI Overviews & Yeşil Tesis Mevzuatı</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            KMK Madde 42 (%50+1)
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-300/40">
            ISO 14001:2015
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-2xl mt-0.5 shrink-0" aria-hidden="true">
          energy_savings_leaf
        </span>
        <span>{question}</span>
      </h2>

      {/* Direct AI Ground Truth Answer */}
      <div
        id="sustainability-instant-answer-text"
        className="text-[15px] sm:text-base leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-background)]/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] mb-6 relative z-10 font-normal"
      >
        <p>{directAnswer}</p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative z-10">
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1.5">
            <span className="material-symbols-outlined text-base">solar_power</span>
            <span className="text-xs font-bold">Çatı GES Kararı</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            KMK 42 gereğince hem sayı hem arsa payı çoğunluğu (%50+1) ile ortak alan elektriğinde %70 tasarruf.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1.5">
            <span className="material-symbols-outlined text-base">ev_station</span>
            <span className="text-xs font-bold">EV Şarj Güvenliği</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Müstakil pano hattı, Tip B kaçak akım koruması ve bina yangın algılama panosu entegrasyonu zorunludur.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1.5">
            <span className="material-symbols-outlined text-base">recycling</span>
            <span className="text-xs font-bold">Sıfır Atık Altyapısı</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Çevre Bakanlığı mevzuatına uygun renk kodlu ayrıştırma kumbaraları ve lisanslı geri dönüşüm tahliyesi.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 mb-1.5">
            <span className="material-symbols-outlined text-base">water_drop</span>
            <span className="text-xs font-bold">Gri Su & Yağmur Hasadı</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Peyzaj sulamasında şebeke suyu yerine yağmur sarnıcı kullanımıyla peyzaj su giderinde %80 tasarruf.
          </p>
        </div>
      </div>

      {/* Footer / Copy & Verify */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)] relative z-10">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="material-symbols-outlined text-sm text-emerald-500">gavel</span>
          <span>KMK Madde 42 & Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Standartları</span>
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
            <span>{copied ? 'Kopyalandı!' : 'Özeti Kopyala'}</span>
          </button>

          <a
            href="https://www.perplexity.ai/search?q=Sitelerde+cati+GES+ve+elektrikli+arac+sarj+istasyonu+kurulumu+KMK+42"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
