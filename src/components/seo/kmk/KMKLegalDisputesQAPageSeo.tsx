"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import { KMK_LEGAL_QA_DISPUTES, KmkLegalQaDispute } from '@/data/kmkLegalQaDisputesData';

export interface KMKLegalDisputesQAPageSeoProps {
  pageUrl?: string;
}

export default function KMKLegalDisputesQAPageSeo({
  pageUrl = `${BASE_URL}/hizmetler/site-yonetimi`,
}: KMKLegalDisputesQAPageSeoProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(KMK_LEGAL_QA_DISPUTES[0].id);

  const categories = ['all', 'Ortak Alan & Tadilat', 'Genel Kurul & Oy Hakkı', 'Mali & Aidat Muafiyeti', 'Yönetici Hakları', 'Adli İptal Davaları'];

  const filteredDisputes = selectedCategory === 'all'
    ? KMK_LEGAL_QA_DISPUTES
    : KMK_LEGAL_QA_DISPUTES.filter((d) => d.category === selectedCategory);

  // Schema.org QAPage with Question & AcceptedAnswer for Google SGE & Rich Results
  const schemaQAPage = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    '@id': `${pageUrl}#legal-disputes-qa`,
    mainEntity: KMK_LEGAL_QA_DISPUTES.map((item) => ({
      '@type': 'Question',
      name: item.questionTitle,
      text: item.questionDetail,
      answerCount: 1,
      upvoteCount: item.upvoteCount,
      dateCreated: item.answerDate,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.acceptedAnswerText} (Yasal Dayanak: ${item.statutoryArticle} - Emsal: ${item.yargitayCaseRef})`,
        dateCreated: item.answerDate,
        upvoteCount: item.upvoteCount,
        url: `${pageUrl}#${item.id}`,
        author: {
          '@type': 'Organization',
          name: item.answeredBy,
          url: BASE_URL,
        },
      },
    })),
  };

  return (
    <section
      aria-label="KMK Emsal Hukuki Soru-Cevap ve Uyuşmazlıklar Dizini"
      className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden my-8"
    >
      {/* Schema.org QAPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaQAPage) }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">gavel</span>
          <span>Google QAPage & Yargıtay İçtihatları</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          KMK Emsal Hukuki Uyuşmazlıklar ve Çözümleri
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed font-normal">
          Kat malikleri ve yöneticiler arasında en sık dava konusu olan 8 kritik uyuşmazlığın kanuni dayanakları ve Yargıtay Hukuk Genel Kurulu emsal kararları.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'Tüm Uyuşmazlıklar (8)' : cat}
          </button>
        ))}
      </div>

      {/* Dispute Questions List */}
      <div className="space-y-4">
        {filteredDisputes.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              id={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-950/90 border-amber-500/50 shadow-lg'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-400 text-xl shrink-0 mt-0.5" aria-hidden="true">help</span>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      {item.category} • {item.statutoryArticle}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {item.questionTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400 font-semibold">
                    <span className="material-symbols-outlined text-emerald-400 text-sm" aria-hidden="true">thumb_up</span>
                    <span>{item.upvoteCount}</span>
                  </span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-amber-400' : ''}`} aria-hidden="true">
                    expand_more
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-800/80 space-y-4">
                  {/* Real-world Scenario / Detail */}
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-slate-400 block mb-1">Yaşanan Somut Olay:</span>
                    <p className="italic font-normal">{item.questionDetail}</p>
                  </div>

                  {/* Accepted Answer */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base" aria-hidden="true">verified</span>
                        Uzman Hukuki Çözüm & Karar:
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Cevaplayan: {item.answeredBy}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {item.acceptedAnswerText}
                    </p>
                  </div>

                  {/* Legal Citation & Precedent */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                      <span className="font-bold text-slate-400 block mb-1">Kanuni Dayanak Madde:</span>
                      <span className="text-white font-semibold">{item.statutoryArticle}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                      <span className="font-bold text-slate-400 block mb-1">Yargıtay Emsal Karar Bilgisi:</span>
                      <span className="text-amber-400 font-semibold">{item.yargitayCaseRef}</span>
                    </div>
                  </div>

                  {/* Practical Guidelines */}
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                    <span className="font-bold text-xs text-slate-300 uppercase tracking-wider block mb-2">
                      Kat Malikleri ve Yöneticiler İçin Altın Kurallar:
                    </span>
                    <ul className="space-y-1.5">
                      {item.practicalGuidelines.map((guide, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-normal">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{guide}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
