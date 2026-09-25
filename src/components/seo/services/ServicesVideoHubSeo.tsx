"use client";

import React from 'react';
import { VideoGroundingAiOverviewSeo } from '@/components/seo';

interface ServicesVideoHubSeoProps {
  lang?: string;
}

export default function ServicesVideoHubSeo({ lang = 'tr' }: ServicesVideoHubSeoProps) {
  return (
    <section id="operasyonel-video-rehberler" className="py-20 md:py-28 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/60">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-sm">smart_display</span>
            Multimodal Operasyon Standartları & Video Rehberleri
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Yönetim Süreçlerini Video Rehberlerle İnceleyin
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed font-light">
            Bireysel yöneticilikten profesyonel yönetime geçiş, KMK 37 bütçe kesinleşmesi ve 
            asansör yeşil etiket muayenesi gibi tüm adımları şeffafça izleyin.
          </p>
        </div>

        {/* Video Grounding Wrapper */}
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <VideoGroundingAiOverviewSeo lang={lang} />
        </div>
      </div>
    </section>
  );
}
