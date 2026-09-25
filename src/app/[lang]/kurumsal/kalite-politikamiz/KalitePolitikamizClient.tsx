"use client";

import React from 'react';
import {
  QualityHeroSeo,
  QualityAiOverviewSeo,
  QualityPillarsSeo,
  QualityPdcaCycleSeo,
  QualityComparisonMatrixSeo,
  QualityAuthorityFaqSeo,
  QualityConversionCtaSeo,
} from '@/components/seo/quality';

interface KalitePolitikamizClientProps {
  lang?: string;
}

export default function KalitePolitikamizClient({ lang = 'tr' }: KalitePolitikamizClientProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* 1. Hero Section with ISO & TÜRKAK Badges + 4 Live KPIs */}
      <QualityHeroSeo />

      {/* 2. Google AI Overviews & Speakable Regulatory Grounding */}
      <QualityAiOverviewSeo />

      {/* 3. 6 Core Quality Standards Bento Grid (ISO 41001, 9001, 27001, 45001, 14001, TSE) */}
      <QualityPillarsSeo />

      {/* 4. Interactive PDCA (PUKÖ) Continuous Improvement Kaizen Cycle */}
      <QualityPdcaCycleSeo />

      {/* 5. Traditional Amateur vs TÜRKAK-Accredited Alo Yönetim Quality Matrix */}
      <QualityComparisonMatrixSeo />

      {/* 6. Authority FAQ Section with Schema.org FAQPage */}
      <QualityAuthorityFaqSeo />

      {/* 7. Unannounced Audit & Free Discovery CTA Banner */}
      <QualityConversionCtaSeo />
    </div>
  );
}
