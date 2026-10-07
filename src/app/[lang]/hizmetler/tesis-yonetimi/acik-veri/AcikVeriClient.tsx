"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FacilitySubSectorCrossNav from '@/components/seo/facility/FacilitySubSectorCrossNav';
import { BASE_URL } from '@/lib/seo';
import TrOnly from '@/components/seo/TrOnly';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';
import PositionZeroAnswerBox from '@/components/seo/ai-overviews/PositionZeroAnswerBox';

import Icon from '@/components/ui/branding/Icon';
interface ApiEndpointInfo {
  id: string;
  path: string;
  icon: string;
  accept: string;
  fields: { name: string; type: string }[];
}

const API_ENDPOINTS: ApiEndpointInfo[] = [
  {
    id: "dues-index",
    path: "/api/tesis-yonetimi/dues-index.json",
    icon: "payments",
    accept: "application/json",
    fields: [
      { name: "districts", type: "array" },
      { name: "marketAverageM2Dues", type: "number" },
      { name: "aloYonetimOptimizedM2Dues", type: "number" },
      { name: "istanbulSummary", type: "object" },
      { name: "license", type: "string" },
    ],
  },
  {
    id: "benchmark",
    path: "/api/tesis-yonetimi/benchmark.json",
    icon: "analytics",
    accept: "application/json",
    fields: [
      { name: "data.districts", type: "array" },
      { name: "data.propertyTypes", type: "array" },
      { name: "data.industryBenchmarks", type: "array" },
      { name: "license", type: "string" },
    ],
  },
  {
    id: "kmk-law-index",
    path: "/api/tesis-yonetimi/kmk-law-index.json",
    icon: "menu_book",
    accept: "application/json",
    fields: [
      { name: "articles", type: "array" },
      { name: "articleNumber", type: "number" },
      { name: "summary", type: "string" },
      { name: "practicalApplication", type: "string" },
    ],
  },
  {
    id: "legal-precedents",
    path: "/api/tesis-yonetimi/legal-precedents.json",
    icon: "gavel",
    accept: "application/json",
    fields: [
      { name: "precedents", type: "array" },
      { name: "court", type: "string" },
      { name: "docketNumber", type: "string" },
      { name: "kmkArticle", type: "string" },
      { name: "rulingSummary", type: "string" },
    ],
  },
  {
    id: "dictionary",
    path: "/api/tesis-yonetimi/dictionary.json",
    icon: "translate",
    accept: "application/json",
    fields: [
      { name: "terms", type: "array" },
      { name: "termCode", type: "string" },
      { name: "legalBasis", type: "string" },
      { name: "wikidataUri", type: "string" },
    ],
  },
  {
    id: "faq",
    path: "/api/tesis-yonetimi/faq.json",
    icon: "quiz",
    accept: "application/json",
    fields: [
      { name: "faqs", type: "array" },
      { name: "group", type: "string" },
      { name: "question", type: "string" },
      { name: "answer", type: "string" },
    ],
  },
  {
    id: "districts-geojson",
    path: "/api/tesis-yonetimi/istanbul-districts.geojson",
    icon: "map",
    accept: "application/geo+json",
    fields: [
      { name: "features", type: "array" },
      { name: "geometry.coordinates", type: "[lng, lat]" },
      { name: "properties.districtName", type: "string" },
      { name: "properties.population", type: "number" },
    ],
  },
  {
    id: "openapi-spec",
    path: "/openapi.json",
    icon: "integration_instructions",
    accept: "application/json",
    fields: [
      { name: "openapi", type: "string" },
      { name: "info", type: "object" },
      { name: "paths", type: "object" },
      { name: "components", type: "object" },
    ],
  },
];

export default function AcikVeriClient({ lang }: { lang: string }) {
  const { t, language } = useLanguage();
  const tk = (key: string) => t(key as Parameters<typeof t>[0]);
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => {
      setCopiedEndpoint(null);
    }, 2500);
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] relative z-10">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400">
              <Icon name="api" className="text-[15px]" />
              {tk('acv_hero_badge1')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {tk('acv_hero_badge2')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
              <Icon name="lock_open" className="text-[15px]" />
              {tk('acv_hero_badge3')}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mb-6">
            {tk('acv_hero_h1a')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-600">{tk('acv_hero_h1b')}</span>
          </h1>

          <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mb-8">
            {tk('acv_hero_p')}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-md group"
            >
              <Icon name="code" className="text-lg" />
              <span>{tk('acv_cta_spec')}</span>
              <Icon name="open_in_new" className="text-sm group-hover:translate-x-0.5 transition-transform" />
            </a>

            <Link
              href={localePath('/hizmetler/tesis-yonetimi/rehber', language)}
              className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/15 transition-all border border-slate-200 dark:border-white/10"
            >
              <Icon name="menu_book" className="text-lg" />
              <span>{tk('acv_cta_guide')}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Google Position Zero (Featured Snippet) & Hızlı Yanıt Kutusu */}
      <section className="py-8">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <TrOnly>
          <PositionZeroAnswerBox
            id="acik-veri-portali-nedir"
            answerId="opendata-instant-answer-text"
            question="Tesis Yönetimi Açık Veri Portalı Nedir ve Kimler Kullanabilir?"
            answer="Açık Veri Portalı; Alo Yönetim'in İstanbul ilçe aidat endeksi, KMK madde dizini, Yargıtay emsal özetleri, sözlük ve SSS verilerini kimlik doğrulama gerektirmeden JSON olarak sunduğu uç noktalardır. OpenAPI açıklaması /openapi.json adresindedir."
            standardBadge="Açık JSON Uç Noktaları"
            subText="Her uç noktanın lisansı yanıtın içindeki license alanında belirtilir; kullanımdan önce ilgili alanı kontrol edin."
            accentColor="slate"
          />
          </TrOnly>
        </div>
      </section>

      {/* Info & Value Proposition Grid */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-4">
                <Icon name="visibility" className="text-2xl" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                {tk('acv_info1_title')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {tk('acv_info1_desc')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Icon name="smart_toy" className="text-2xl" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                {tk('acv_info2_title')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {tk('acv_info2_desc')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-4">
                <Icon name="verified_user" className="text-2xl" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                {tk('acv_info3_title')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {tk('acv_info3_desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Endpoints Section */}
      <section className="py-16">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                {tk('acv_sec_badge')}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {tk('acv_sec_title')}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Content-Type: application/json; charset=utf-8
            </span>
          </div>

          <div className="space-y-6">
            {API_ENDPOINTS.map((endpoint) => {
              const curl = `curl -X GET "${BASE_URL}${endpoint.path}" -H "Accept: ${endpoint.accept}"`;
              const isCopied = copiedEndpoint === endpoint.id;

              return (
                <div
                  key={endpoint.id}
                  className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-500/30"
                >
                  {/* Top Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 flex items-center justify-center shrink-0">
                        <Icon name={endpoint.icon} className="text-2xl" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            GET
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {tk(`acv_e_${endpoint.id}_cat`)}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                          {tk(`acv_e_${endpoint.id}_name`)}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleCopy(curl, endpoint.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
                        title={tk('acv_copy_title')}
                      >
                        <Icon name={isCopied ? 'check' : 'content_copy'} className="text-sm" />
                        <span>{isCopied ? tk('acv_copied') : tk('acv_copy_curl')}</span>
                      </button>

                      <a
                        href={endpoint.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-500/10 hover:bg-slate-500/20 text-slate-700 dark:text-slate-400 border border-slate-500/20 transition-colors"
                      >
                        <span>{tk('acv_open')}</span>
                        <Icon name="open_in_new" className="text-sm" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 my-5 font-light leading-relaxed">
                    {tk(`acv_e_${endpoint.id}_desc`)}
                  </p>

                  {/* cURL Snippet Box */}
                  <div className="mb-5 p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto flex items-center justify-between gap-4">
                    <span className="text-emerald-400">$</span>
                    <span className="truncate flex-1">{curl}</span>
                    <button
                      onClick={() => handleCopy(curl, endpoint.id)}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label={tk('acv_copy_aria')}
                    >
                      <Icon name="content_copy" className="text-sm" />
                    </button>
                  </div>

                  {/* Schema Fields */}
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{tk('acv_fields')}</span>
                      {endpoint.fields.map((f) => (
                        <span key={f.name} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 font-mono text-[11px]">
                          {f.name} ({f.type})
                        </span>
                      ))}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Sub-Sector Cross Navigation */}
      <section className="py-8">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <TrOnly>
            <FacilitySubSectorCrossNav currentSlug="acik-veri" />
          </TrOnly>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-[var(--spacing-gutter)] text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Icon name="shield" className="text-sm" />
            {tk('acv_final_badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            {tk('acv_final_h2')}
          </h2>
          <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            {tk('acv_final_p')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={localePath('/teklif-al', language)}
              className="bg-slate-500 hover:bg-slate-600 text-slate-950 px-8 py-4 rounded-xl font-extrabold text-sm transition-all shadow-lg"
            >
              {tk('acv_final_cta1')}
            </Link>
            <Link
              href={localePath('/hizmetler/tesis-yonetimi/rehber', language)}
              className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-sm transition-all"
            >
              {tk('acv_final_cta2')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
