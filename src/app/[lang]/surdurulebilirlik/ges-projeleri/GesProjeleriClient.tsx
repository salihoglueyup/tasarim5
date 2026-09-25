"use client";

import React, { useState } from 'react';
import {
  GesHeroSeo,
  GesAiOverviewSeo,
  GesRoiCalculatorSeo,
  GesProjectRoadmapSeo,
  GesEvChargingHubSeo,
  GesNetMeteringSeo,
  GesAuthorityFaqSeo,
  GesConversionCtaSeo,
} from '@/components/seo';

interface GesProjeleriClientProps {
  lang?: string;
}

export default function GesProjeleriClient({ lang = 'tr' }: GesProjeleriClientProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      {/* 1. Prestige Solar Hero Section */}
      <GesHeroSeo lang={lang} />

      {/* 2. Google AI Overviews & Legal Net-Metering Snippet */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] -mt-6 sm:-mt-8 mb-6 relative z-20 w-full">
        <GesAiOverviewSeo />
      </div>

      {/* 3. Interactive Solar & EV ROI Payback Simulator */}
      <GesRoiCalculatorSeo />

      {/* 4. 6-Stage Turnkey Permitting & Engineering Roadmap */}
      <GesProjectRoadmapSeo />

      {/* 5. Electric Vehicle (EV) Charging Station Integration */}
      <GesEvChargingHubSeo />

      {/* 6. Self-Consumption vs Grid Export Net-Metering Guide */}
      <GesNetMeteringSeo />

      {/* 7. Authority FAQs & Downloadable Decision Template */}
      <GesAuthorityFaqSeo />

      {/* 8. Conversion Banner & Free Aerial Discovery CTA */}
      <GesConversionCtaSeo />
    </div>
  );
}
