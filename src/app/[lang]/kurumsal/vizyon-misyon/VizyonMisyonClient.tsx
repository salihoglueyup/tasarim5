"use client";

import React, { useState } from 'react';
import {
  VisionHeroSeo,
  VisionAiOverviewSeo,
  VisionComparisonMatrixSeo,
  VisionOperationalPillarsSeo,
  VisionManifestoSeo,
  VisionRoadmapSeo,
  VisionEcosystemCtaSeo,
} from '@/components/seo';

interface VizyonMisyonClientProps {
  lang?: string;
}

export default function VizyonMisyonClient({ lang = 'tr' }: VizyonMisyonClientProps) {
  // Alo Güvenlik Eğitim Kurumları & guvenlikkursu.com resmi partnerliği ile 5188 lisanslı güvenlik vizyonu
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      {/* 1. Dark Prestige Hero Section */}
      <VisionHeroSeo lang={lang} />

      {/* 2. Google AI Overviews & 2026 Management Philosophy Snippet */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] -mt-6 sm:-mt-8 mb-6 relative z-20 w-full">
        <VisionAiOverviewSeo />
      </div>

      {/* 3. Traditional Management vs. Alo Yönetim 2026 Standards Matrix */}
      <VisionComparisonMatrixSeo />

      {/* 4. 5 Operational Pillars of the Vision */}
      <VisionOperationalPillarsSeo />

      {/* 5. 5 Transparency Pledges to Property Owners (Manifesto) */}
      <VisionManifestoSeo />

      {/* 6. 2014 — 2030 Strategic Milestone Roadmap */}
      <VisionRoadmapSeo />

      {/* 7. Corporate Ecosystem & Sister Pages Cross-Navigation Hub */}
      <VisionEcosystemCtaSeo />
    </div>
  );
}
