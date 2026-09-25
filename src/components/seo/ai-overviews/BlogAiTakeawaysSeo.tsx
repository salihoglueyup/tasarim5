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
      className={`bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 my-6 relative overflow-hidden shadow-xs ${className}`}
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Brand Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/15 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider shadow-2xs">
          <span className="material-symbols-outlined text-[15px] text-amber-500 dark:text-amber-400" aria-hidden="true">auto_awesome</span>
          <span>Google AI & Gemini • Önemli Çıkarımlar (Key Takeaways)</span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-colors shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm text-slate-500 dark:text-slate-400" aria-hidden="true">
            {copied ? 'done' : 'content_copy'}
          </span>
          <span>{copied ? 'Kopyalandı' : 'Maddeleri Kopyala'}</span>
        </button>
      </div>

      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 relative z-10">
        Bu Yazıdan Bilmeniz Gereken 4 Temel Hukuki ve Operasyonel Not
      </h3>

      <div id="blog-ai-takeaway-text" className="space-y-2.5 relative z-10">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-slate-50/70 dark:bg-white/[0.02] p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 shadow-xs">
              {index + 1}
            </span>
            <p className="pt-0.5">{item}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
