"use client";

import React from 'react';
import QualityHeroSeo from '@/components/seo/quality/QualityHeroSeo';
import QualityAiOverviewSeo from '@/components/seo/quality/QualityAiOverviewSeo';
import QualityPillarsSeo from '@/components/seo/quality/QualityPillarsSeo';
import QualityPdcaCycleSeo from '@/components/seo/quality/QualityPdcaCycleSeo';
import QualityComparisonMatrixSeo from '@/components/seo/quality/QualityComparisonMatrixSeo';
import QualityAuthorityFaqSeo from '@/components/seo/quality/QualityAuthorityFaqSeo';
import QualityConversionCtaSeo from '@/components/seo/quality/QualityConversionCtaSeo';

interface KalitePolitikamizClientProps {
  lang?: string;
}

export default function KalitePolitikamizClient({ lang = 'tr' }: KalitePolitikamizClientProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* 1. Hero Section with ISO Badges + 4 Live KPIs */}
      <QualityHeroSeo />

      {/* 2. Google AI Overviews & Speakable Regulatory Grounding */}
      <QualityAiOverviewSeo />

      {/* 3. 6 Core Quality Standards Bento Grid (ISO 41001, 9001, 27001, 45001, 14001, TSE) */}
      <QualityPillarsSeo />

      {/* 4. Interactive PDCA (PUKÖ) Continuous Improvement Kaizen Cycle */}
      <QualityPdcaCycleSeo />

      {/* 5. Traditional Amateur vs Certified Alo Yönetim Quality Matrix */}
      <QualityComparisonMatrixSeo />

      {/* 6. Authority FAQ Section with Schema.org FAQPage */}
      <QualityAuthorityFaqSeo />

      {/* 7. Unannounced Audit & Free Discovery CTA Banner */}
      <QualityConversionCtaSeo />
    </div>
  );
}
