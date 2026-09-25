"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface GlossaryDefinitionItem {
  slug: string;
  term: string;
  definition: string;
  legalBasis: string;
}

export const TOP_GLOSSARY_TERMS: GlossaryDefinitionItem[] = [
  {
    slug: 'isletme-projesi',
    term: 'İşletme Projesi (KMK 37)',
    definition:
      'Anagayrimenkulün bir yıllık tahmini gelir ve giderlerini, her kat malikine düşen aylık avans tutarını gösteren ve tebliğinden itibaren 7 gün içinde itiraz edilmezse kesinleşip İİK 68 kapsamında doğrudan ilamsız icra gücü kazanan resmi bütçe belgesidir.',
    legalBasis: '634 Sayılı KMK Madde 37 & İİK Madde 68',
  },
  {
    slug: 'kmk-20-gecikme-tazminati',
    term: 'Gecikme Tazminatı (KMK 20/2)',
    definition:
      'Gününde ödenmeyen aidat ve ortak gider avansı borcuna yasal ticari faizden bağımsız olarak aylık yüzde 5 (%5) oranında işletilen emredici kanuni tazminattır. Yargıtay 18. Hukuk Dairesi içtihatlarına göre genel kurul kararıyla dahi indirilemez.',
    legalBasis: '634 Sayılı KMK Madde 20/2',
  },
  {
    slug: 'demirbas-fonu',
    term: 'Demirbaş ve Yenileme Fonu',
    definition:
      'Asansör revizyonu, çatı izolasyonu, merkezi ısıtma kazanı veya hidrofor gibi ortak alan kalıcı tesisatlarının bakım ve yenilenmesi için kiracılardan değil; doğrudan mülk sahiplerinden (kat maliklerinden) arsa payı oranında toplanan sermaye fonudur.',
    legalBasis: '634 Sayılı KMK Madde 20/1-b',
  },
  {
    slug: 'arsa-payi',
    term: 'Arsa Payı ve Masraf Paylaşımı',
    definition:
      'Anagayrimenkulün ortak mülkiyetinde her bir bağımsız bölüme tahsis edilen mülkiyet oranıdır. KMK 20 uyarınca asansör, ortak elektrik ve teknik sigorta masrafları tapudaki arsa payı oranında paylaştırılır.',
    legalBasis: '634 Sayılı KMK Madde 3 & Madde 20',
  },
  {
    slug: 'yonetim-plani',
    term: 'Site Yönetim Planı (KMK 28)',
    definition:
      'Bütün kat maliklerini bağlayan sözleşme hükmündeki ana belgedir. Değiştirilmesi için sitedeki tüm kat maliklerinin beşte dördünün (4/5) oyu yasal zorunluluktur. Tapu sicilinde tescillidir.',
    legalBasis: '634 Sayılı KMK Madde 28',
  },
  {
    slug: 'mali-ibra',
    term: 'Mali ve İdari İbra',
    definition:
      'Yıllık kat malikleri olağan genel kurulunda yöneticinin bir yıllık gelir-gider hesaplarının ve faaliyetlerinin denetçi raporu eşliğinde oylanarak hukuken aklanması işlemidir.',
    legalBasis: '634 Sayılı KMK Madde 39 & Madde 41',
  },
  {
    slug: 'bagimsiz-bolum',
    term: 'Bağımsız Bölüm',
    definition:
      'Anagayrimenkulün ayrı ayrı ve başlı başına kullanılmaya elverişli olan ve üzerinde kat mülkiyeti veya kat irtifakı kurulmuş daire, dükkan veya mağaza gibi bölümleridir.',
    legalBasis: '634 Sayılı KMK Madde 1',
  },
  {
    slug: 'isletme-avansi',
    term: 'İşletme Avansı (Aidat)',
    definition:
      'Sitenin ortak giderlerinin (personel maaşları, enerji, temizlik, asansör bakımı) aksamadan yürütülmesi amacıyla işletme projesine istinaden her ay peşin olarak toplanan cari ödemedir.',
    legalBasis: '634 Sayılı KMK Madde 20/1',
  },
  {
    slug: 'kat-malikleri-kurulu',
    term: 'Kat Malikleri Kurulu (KMK 29)',
    definition:
      'Anagayrimenkulün en üst karar organıdır. Yılda en az bir defa toplanır; yöneticiyi ve denetçiyi seçer, işletme projesini onaylar ve yönetim planı değişikliklerini karara bağlar.',
    legalBasis: '634 Sayılı KMK Madde 27-33',
  },
  {
    slug: 'denetim-raporu',
    term: 'Denetçi Raporu ve Hukuki Denetim',
    definition:
      'KMK Madde 41 uyarınca denetçi veya denetim kurulunun yöneticinin hesap ve işlemlerini en az üç ayda bir inceleyerek olağan genel kurula yazılı olarak sunduğu resmi rapor belgesidir.',
    legalBasis: '634 Sayılı KMK Madde 41',
  },
];

export default function GlossaryAiOverviewSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [activeSlug, setActiveSlug] = useState<string>(TOP_GLOSSARY_TERMS[0].slug);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const selectedTerm = TOP_GLOSSARY_TERMS.find((t) => t.slug === activeSlug) || TOP_GLOSSARY_TERMS[0];

  const handleCopy = (text: string, slug: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const question = 'Kat Mülkiyeti Kanunu ve Tesis Yönetiminde Temel Terimlerin Anlamları Nelerdir?';
  const directAnswer =
    '634 Sayılı Kat Mülkiyeti Kanunu (KMK) çerçevesinde en kritik terimler: 1) İşletme Projesi (KMK 37): Tebliğinden 7 gün sonra kesinleşen ve İİK 68 uyarınca ilamsız icra gücü kazanan yıllık tahmini bütçedir; 2) Gecikme Tazminatı (KMK 20/2): Ödenmeyen aidat borcuna aylık işletilen emredici %5 yasal tazminattır; 3) Demirbaş Fonu: Kalıcı mekanik yenilemeler için yalnızca kat maliklerinden toplanan fondur; 4) Yönetim Planı (KMK 28): Değişmesi için 4/5 oy çoğunluğu aranan tüm malikleri bağlayıcı sözleşmedir; 5) Arsa Payı: Ortak teknik giderlerin paylaşımına esas tapu tescilli mülkiyet oranıdır.';

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Alo Yönetim Kat Mülkiyeti ve Tesis Terimleri Sözlüğü',
      description: 'Kat mülkiyeti ve site işletmeciliği alanında yasal ve operasyonel terimler sözlüğü.',
      hasDefinedTerm: TOP_GLOSSARY_TERMS.map((t) => ({
        '@type': 'DefinedTerm',
        name: t.term,
        description: `${t.definition} (Yasal Dayanak: ${t.legalBasis})`,
        url: `${BASE_URL}/sozluk#${t.slug}`,
      })),
    },
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
      name: 'Site ve Tesis Yönetimi Terimler Sözlüğü | Google AI Overview',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#glossary-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="glossary-ai-grounding"
      aria-label="Google AI Overviews Kat Mülkiyeti ve Tesis Yönetimi Hukuk Terimleri Sözlüğü"
      className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-slate-500/5 via-slate-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px] text-[var(--color-primary)]" aria-hidden="true">menu_book</span>
          <span>Google AI Overviews • KMK 634 Terimler & Hukuki Tanımlar</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-outline)]/60">
            KMK & İİK Uyumlu
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[var(--color-surface)] text-emerald-600 dark:text-emerald-400 border border-[var(--color-outline)]/60">
            Yargıtay İçtihatları
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[var(--color-primary)] tracking-tight mb-3 relative z-10">
        Site ve Tesis Yönetimi Hukuki Terimler Sözlüğü (Ground-Truth)
      </h2>

      {/* Instant Answer (Speakable) */}
      <div className="bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/60 rounded-2xl p-5 sm:p-6 mb-6 relative z-10">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-[var(--color-primary)]">
            Google AI Tanımsal Hızlı Özet & Kanun Özü
          </span>
          <button
            type="button"
            onClick={() => handleCopy(directAnswer, 'general')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] text-[var(--color-primary)] border border-[var(--color-outline)]/70 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              {copiedSlug === 'general' ? 'done' : 'content_copy'}
            </span>
            <span>{copiedSlug === 'general' ? 'Kopyalandı' : 'AI Özetini Kopyala'}</span>
          </button>
        </div>
        <p
          id="glossary-instant-answer-text"
          className="text-xs sm:text-sm text-[var(--color-primary)] font-medium leading-relaxed"
        >
          {directAnswer}
        </p>
      </div>

      {/* Interactive Term Switcher */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {TOP_GLOSSARY_TERMS.map((item) => {
          const isActive = item.slug === activeSlug;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActiveSlug(item.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] border border-[var(--color-outline)]/50'
              }`}
            >
              {item.term}
            </button>
          );
        })}
      </div>

      {/* Selected Term Detail Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 shadow-xs relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 className="text-base sm:text-lg font-black text-[var(--color-primary)]">
            {selectedTerm.term} Nedir?
          </h3>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[var(--color-surface-variant)] text-[var(--color-primary)] border border-[var(--color-outline)]/60">
            {selectedTerm.legalBasis}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4 font-normal">
          {selectedTerm.definition}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-outline)]/40">
          <button
            type="button"
            onClick={() => handleCopy(selectedTerm.definition, selectedTerm.slug)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-surface-variant)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] text-[var(--color-primary)] border border-[var(--color-outline)]/70 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              {copiedSlug === selectedTerm.slug ? 'done' : 'content_copy'}
            </span>
            <span>{copiedSlug === selectedTerm.slug ? 'Kopyalandı' : 'Tanımı Kopyala'}</span>
          </button>

          <a
            href={`/sozluk/${selectedTerm.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] text-xs font-bold hover:opacity-90 transition-all shadow-xs"
          >
            <span>Detaylı Terim Sayfası</span>
            <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
