"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export default function AcademyAiOverviewSeo({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const question = 'Sitelerde Özel Güvenlik Görevlilerinin Yasal Yetkileri ve Arama Sınırları Nelerdir?';
  const directAnswer =
    '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun Madde 7 gereğince sitede görevli güvenlik personeli; kimlik sorma, ziyaretçileri kayıt altına alma, eşyaları X-ray veya el dedektöründen geçirme, site ortak alanlarında devriye gezme ve suçüstü halinde şüpheliyi yakalayarak genel kolluğa teslim etme yetkisine sahiptir. Ancak Türk Ceza Kanunu (TCK) Madde 109 ve 120 gereğince güvenlik personeli kişilerin üzerini, çantasını veya araç torpido/bagajını elle arayamaz; elle arama adli kolluk (Polis/Jandarma) yetkisindedir. Personelin EGM onaylı geçerli 5188 kimlik kartı taşıması kanunen zorunludur.';

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
      '@type': 'EducationalOccupationalProgram',
      name: '5188 Özel Güvenlik Mevzuatı ve Tesis Güvenliği Akademi Rehberi',
      description: 'Site ve tesislerde özel güvenlik personelinin yasal yetki sınırları, EGM denetimleri ve görev standartları.',
      provider: {
        '@type': 'Organization',
        name: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Site Özel Güvenlik Yetki Sınırları & 5188 Kanun Otoritesi | Google AI Overview',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#academy-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="academy-ai-overview"
      aria-label="Google AI Overviews 5188 Özel Güvenlik Yetkileri ve Hukuki Sınırlar Özeti"
      className={`bg-[var(--color-surface)] border border-blue-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">security</span>
          <span>Google AI Overviews & 5188 Yasal Yetki Otoritesi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-300/40">
            5188 Sayılı Kanun
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300/40">
            TCK 109/120 Sınırı
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl mt-0.5 shrink-0" aria-hidden="true">
          shield_person
        </span>
        <span>{question}</span>
      </h2>

      {/* Direct AI Ground Truth Answer */}
      <div
        id="academy-instant-answer-text"
        className="text-[15px] sm:text-base leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-background)]/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] mb-6 relative z-10 font-normal"
      >
        <p>{directAnswer}</p>
      </div>

      {/* Authority Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative z-10">
        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1.5">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span className="text-xs font-bold">Yasal Yetkiler</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Kimlik sorma, ziyaretçi kaydı, detektör ve X-ray kontrolü, suçüstü durumunda kolluğa teslim.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-1.5">
            <span className="material-symbols-outlined text-base">block</span>
            <span className="text-xs font-bold">Elle Arama Yasağı</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            TCK 109 ve 120 uyarınca güvenlik personeli çanta veya araç bagajını elle arayamaz; elle arama adli kolluk yetkisindedir.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1.5">
            <span className="material-symbols-outlined text-base">badge</span>
            <span className="text-xs font-bold">5188 Kimlik Kartı</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            EGM onaylı ve 5 yılda bir yenilenen geçerli kimlik kartı olmadan üniformayla görev yapmak suçtur.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1.5">
            <span className="material-symbols-outlined text-base">domain_verification</span>
            <span className="text-xs font-bold">Valilik ÖGİ İzni</span>
          </div>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            Sitede özel güvenlik hizmeti başlatılabilmesi için İl Özel Güvenlik Komisyonu onaylı Valilik Kararı zorunludur.
          </p>
        </div>
      </div>

      {/* Footer / Copy & Verify */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)] relative z-10">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="material-symbols-outlined text-sm text-blue-500">gavel</span>
          <span>5188 Sayılı Özel Güvenlik Kanunu & EGM Özel Güvenlik Denetleme Standartları</span>
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
            href="https://www.perplexity.ai/search?q=Sitelerde+ozel+guvenlik+gorevlisi+yetkileri+ve+arama+sinirlari+5188"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
