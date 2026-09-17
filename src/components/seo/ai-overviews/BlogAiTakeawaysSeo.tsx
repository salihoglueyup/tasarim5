"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface BlogAiTakeawaysProps {
  title: string;
  takeaways?: string[];
  slug: string;
  category?: string;
  className?: string;
  lang?: string;
}

export default function BlogAiTakeawaysSeo({
  title,
  takeaways,
  slug,
  category = 'Tesis & Kat Mülkiyeti Hukuku',
  className = '',
  lang = 'tr',
}: BlogAiTakeawaysProps) {
  const [copied, setCopied] = useState(false);

  const defaultTakeaways = [
    '634 Sayılı Kat Mülkiyeti Kanunu ve güncel Yargıtay emsal kararları çerçevesinde kat malikleri hakları güvenceye alınmıştır.',
    'Bütçe ve aidat hesaplamalarında işletme projesinin 7 günlük itiraz süresi sonrası İİK 68 kapsamında icra gücü kazanması esastır.',
    'Ortak teknik alanlar, 5188 lisanslı güvenlik ve asansör periyodik yeşil etiket denetimleri yasal zorunluluktur.',
    'Profesyonel tesis işletmeciliği ile merkezi satın alma ve otomasyon optimizasyonu sayesinde %30 net bütçe tasarrufu sağlanır.',
  ];

  const items = takeaways && takeaways.length > 0 ? takeaways : defaultTakeaways;

  const handleCopy = () => {
    navigator.clipboard.writeText(items.map((it, i) => `${i + 1}. ${it}`).join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${title} — Google AI Önemli Çıkarımlar & Yasal Notlar`,
      description: 'Makaleden derlenen temel kanun maddeleri, operasyonel standartlar ve yapay zeka özet çıkarımları.',
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: `Hukuki Çıkarım ${idx + 1}`,
        description: item,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${title} | Yapay Zeka Özeti ve Anahtar Noktalar`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#blog-ai-takeaway-text'],
      },
    },
  ];

  return (
    <aside
      id="blog-ai-takeaways"
      aria-label="Google AI Önemli Çıkarımlar ve Yasal Hap Bilgiler"
      className={`bg-gradient-to-br from-indigo-500/[0.04] via-[var(--color-surface)] to-transparent border border-indigo-500/25 rounded-2xl p-5 sm:p-6 my-6 relative overflow-hidden ${className}`}
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">auto_awesome</span>
          <span>Google AI & Gemini • Önemli Çıkarımlar (Key Takeaways)</span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            {copied ? 'done' : 'content_copy'}
          </span>
          <span>{copied ? 'Kopyalandı' : 'Maddeleri Kopyala'}</span>
        </button>
      </div>

      <h3 className="text-sm sm:text-base font-black text-[var(--color-heading-text)] tracking-tight mb-3 relative z-10">
        Bu Yazıdan Bilmeniz Gereken 4 Temel Hukuki ve Operasyonel Not
      </h3>

      <div id="blog-ai-takeaway-text" className="space-y-2 relative z-10">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-primary)] font-medium leading-relaxed">
            <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
              {index + 1}
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
