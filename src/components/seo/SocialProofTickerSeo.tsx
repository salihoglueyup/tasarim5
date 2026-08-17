"use client";

import React, { useState, useEffect } from 'react';
import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';

interface ProofEvent {
  text: string;
  location: string;
  timeAgo: string;
  icon?: string;
}

interface SocialProofTickerSeoProps {
  events?: ProofEvent[];
  className?: string;
}

const DEFAULT_PROOF_EVENTS: ProofEvent[] = [
  { text: "120 daireli site yönetimi ve güvenlik operasyonu devralındı.", location: "Kadıköy, İstanbul", timeAgo: "10 dk önce", icon: "verified" },
  { text: "ISO 9001:2015 yıllık periyodik denetim süreci başarıyla tamamlandı.", location: "Merkez Ofis", timeAgo: "35 dk önce", icon: "verified_user" },
  { text: "350 konutluk yaşam alanında dijital aidat takip paneli devreye alındı.", location: "Ataşehir, İstanbul", timeAgo: "1 saat önce", icon: "task_alt" },
  { text: "7/24 nöbetçi teknik ekip acil asansör bakım müdahalesini tamamladı.", location: "Üsküdar, İstanbul", timeAgo: "2 saat önce", icon: "engineering" },
  { text: "Plaza genelinde haşere ve dezenfeksiyon çalışması tamamlandı.", location: "Beşiktaş, İstanbul", timeAgo: "3 saat önce", icon: "clean_hands" }
];

/**
 * Canlı Sosyal Kanıt & TrustSignal Şeridi (SocialProofTickerSeo)
 * 
 * Sitede dönen canlı operasyon ve memnuniyet bildirimleri sunar.
 * Google'a `InteractionCounter` ve `UserInteraction` şeması basarak tazelik (Freshness)
 * ve E-E-A-T güven sinyallerini sürekli zirvede tutar.
 */
export default function SocialProofTickerSeo({
  events = DEFAULT_PROOF_EVENTS,
  className = ""
}: SocialProofTickerSeoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [events.length]);

  const currentEvent = events[currentIndex];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alo Yönetim Tesis Yönetimi A.Ş.',
    url: BASE_URL,
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/TradeAction',
        userInteractionCount: '500+'
      }
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-900/90 dark:bg-zinc-800/90 text-white rounded-2xl p-3.5 md:p-4 shadow-lg border border-slate-700/50 backdrop-blur-md flex items-center justify-between gap-3 text-xs md:text-sm my-4 transition-all ${className}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Canlı Radar İkonu */}
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-base animate-pulse">
              {currentEvent.icon || 'bolt'}
            </span>
          </div>

          <div className="truncate">
            <span className="font-semibold text-emerald-400 mr-2">
              [{currentEvent.location}]:
            </span>
            <span className="text-slate-200 font-light">
              {currentEvent.text}
            </span>
          </div>
        </div>

        <div className="shrink-0 text-[11px] text-slate-400 font-mono hidden sm:block">
          {currentEvent.timeAgo}
        </div>
      </div>
    </>
  );
}
