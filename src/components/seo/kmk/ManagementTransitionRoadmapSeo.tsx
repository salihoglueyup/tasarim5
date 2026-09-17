"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import { TRANSITION_ROADMAP_STAGES, TransitionStageItem } from '@/data/transitionRoadmapData';

export interface ManagementTransitionRoadmapSeoProps {
  pageUrl?: string;
}

export default function ManagementTransitionRoadmapSeo({
  pageUrl = `${BASE_URL}/hizmetler/site-yonetimi`,
}: ManagementTransitionRoadmapSeoProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStage = TRANSITION_ROADMAP_STAGES.find((s) => s.stepNumber === activeStep) || TRANSITION_ROADMAP_STAGES[0];

  // Schema.org HowTo Linked Data for 48-Hour Management Transition Protocol
  const schemaHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${pageUrl}#transition-roadmap`,
    name: 'Amatör Yönetimden Profesyonel Site Yönetimine 48 Saatte Resmi Geçiş Yol Haritası',
    description: 'Kat Mülkiyeti Kanunu Madde 29, 34 ve 36 uyarınca genel kurul çağrısından noter onaylı devir teslime ve Apsiyon entegrasyonuna kadar 6 aşamalı resmi devir protokolü.',
    totalTime: 'P2D',
    step: TRANSITION_ROADMAP_STAGES.map((stage) => ({
      '@type': 'HowToStep',
      position: stage.stepNumber,
      name: `${stage.stageTitle} (${stage.timeframe})`,
      text: `${stage.summary} Yasal Dayanak: ${stage.legalBasis}. Gereken Evraklar: ${stage.requiredDocuments.join(', ')}.`,
      url: `${pageUrl}#step-${stage.stepNumber}`,
    })),
  };

  return (
    <section
      aria-label="48 Saatte Profesyonel Yönetime Devir Teslim Yol Haritası"
      className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden my-8"
    >
      {/* Schema.org HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">sync_alt</span>
          <span>48 Saatte Pürüzsüz & Yasal Devir Teslim</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Amatörden Profesyonel Yönetime Geçiş Rehberi
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed font-normal">
          Komşuluk ilişkilerini zedelemeden, tüm geçmiş borç-alacak mutabakatı ve noter tasdikleriyle 6 resmi adımda sitenizin yönetimini devralıyoruz.
        </p>
      </div>

      {/* 6 Steps Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {TRANSITION_ROADMAP_STAGES.map((s) => {
          const isActive = activeStep === s.stepNumber;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(s.stepNumber)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                isActive
                  ? 'bg-blue-600/30 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s.stepNumber}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {s.timeframe.includes('Saat') ? s.timeframe : 'Ön Hazırlık'}
                </span>
              </div>
              <span className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {s.stageTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                Adım {currentStage.stepNumber} / 6
              </span>
              <span className="text-xs text-slate-400 font-semibold">• {currentStage.timeframe}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentStage.stageTitle}
            </h3>
            <span className="text-xs text-blue-400 font-medium mt-1 inline-block">
              Yasal Dayanak: {currentStage.legalBasis}
            </span>
          </div>

          <Link
            href="/teklif-al"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shrink-0 text-center"
          >
            Siteniz İçin Süreci Başlatın →
          </Link>
        </div>

        <p className="text-sm text-slate-300 mt-5 leading-relaxed font-normal">
          {currentStage.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Action Items */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-400 text-base" aria-hidden="true">checklist</span>
              <span>Bu Aşamada Yapılan Kritik İşlemler</span>
            </h4>
            <ul className="space-y-2">
              {currentStage.actionItems.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-normal">
                  <span className="material-symbols-outlined text-emerald-400 text-sm shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-400 text-base" aria-hidden="true">description</span>
              <span>Gerekli Yasal Evraklar ve Belgeler</span>
            </h4>
            <ul className="space-y-2">
              {currentStage.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-normal">
                  <span className="material-symbols-outlined text-amber-400 text-sm shrink-0 mt-0.5" aria-hidden="true">article</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alo Yönetim Role Banner */}
        <div className="mt-6 p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 flex items-start gap-3">
          <span className="material-symbols-outlined text-blue-400 text-xl shrink-0 mt-0.5" aria-hidden="true">verified_user</span>
          <div>
            <span className="text-xs font-bold text-blue-300 block">Alo Yönetim Kurumsal Güvencesi:</span>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-normal">
              {currentStage.aloYonetimRole}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
