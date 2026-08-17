"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';
import JsonLd from './JsonLd';

export interface SemanticTopicClusterProps {
  currentPillar?: string;
  currentDistrict?: string;
}

export default function SemanticTopicClusterSeo({
  currentPillar,
  currentDistrict
}: SemanticTopicClusterProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'districts' | 'legal' | 'calculators'>('services');

  const legalGuides = [
    { title: 'KMK 634 Kanun Maddeleri Rehberi', url: '/hizmetler/hukuk-ve-icra-danismanligi', tag: 'Mevzuat' },
    { title: '5188 Özel Güvenlik Yetki & İzinleri', url: '/guvenlik-akademisi', tag: 'Yasal Ruhsat' },
    { title: 'İşletme Projesi Kesinleşme Süreci', url: '/hizmetler/aidat-takibi', tag: 'İcra & KMK 37' },
    { title: 'Genel Kurul Yönetici Seçimi Şartları', url: '/sss', tag: 'KMK 34' },
    { title: 'Asansör & Yangın Periyodik Kontrolleri', url: '/hizmetler/teknik-bakim', tag: 'TSE & MMO' }
  ];

  const calculators = [
    { title: 'Aidat & Tasarruf Hesaplayıcı', url: '/hesaplayici', tag: 'Bütçe' },
    { title: 'KMK Arsa Payı Masraf Simülatörü', url: '/hesaplayici#kmk-simulator', tag: 'Yasal Dağılım' },
    { title: 'İstanbul 12 İlçe Aidat Isı Haritası', url: '/bolgeler', tag: 'Piyasa Endeksi' },
    { title: 'Bina Afet & Yangın Güvenlik Testi', url: '/guvenlik-akademisi', tag: 'Risk Analizi' },
    { title: 'Resmi PDF Tesis Sağlık Karnesi', url: '/hesaplayici', tag: 'Denetim' }
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Alo Yönetim Semantik Konu Kümeleri ve Dahili Bağlantı Haritası',
    itemListElement: [
      ...SERVICES.map((s, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: s.name,
        url: `https://aloyonetim.com.tr${s.pillar}`
      })),
      ...DISTRICTS.map((d, idx) => ({
        '@type': 'ListItem',
        position: SERVICES.length + idx + 1,
        name: `${d.name} Tesis Yönetimi`,
        url: `https://aloyonetim.com.tr/bolgeler/${d.slug}`
      }))
    ]
  };

  return (
    <div className="my-12 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">hub</span>
              Semantik Konu Kümeleri & Rehber Ağı
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
            Tesis Yönetimi İlgili Konular & Araçlar
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
            İlgili hizmetler, ilçe yönetim merkezleri, yasal rehberler ve interaktif simülatörler.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'services'
                ? 'bg-white dark:bg-zinc-800 text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Hizmetler (9)
          </button>
          <button
            onClick={() => setActiveTab('districts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'districts'
                ? 'bg-white dark:bg-zinc-800 text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            İlçeler (12)
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'legal'
                ? 'bg-white dark:bg-zinc-800 text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            KMK & Hukuk
          </button>
          <button
            onClick={() => setActiveTab('calculators')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'calculators'
                ? 'bg-white dark:bg-zinc-800 text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Hesaplayıcılar (5)
          </button>
        </div>
      </div>

      {/* Tab Content Grid */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={s.pillar}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 group ${
                currentPillar === s.pillar
                  ? 'bg-purple-500/10 border-purple-500 shadow-sm'
                  : 'bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-purple-500/40 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--color-primary)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {s.name}
                </span>
                <span className="material-symbols-outlined text-sm text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] font-light line-clamp-2">
                {s.summary}
              </p>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'districts' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-fade-in">
          {DISTRICTS.map((d) => (
            <Link
              key={d.slug}
              href={`/bolgeler/${d.slug}`}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                currentDistrict === d.slug
                  ? 'bg-purple-500/10 border-purple-500 shadow-sm'
                  : 'bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-purple-500/40 hover:-translate-y-0.5'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-[var(--color-primary)] block group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {d.name}
                </span>
                <span className="text-[10px] text-[var(--color-secondary)]">
                  {d.side} Yakası
                </span>
              </div>
              <span className="material-symbols-outlined text-xs text-[var(--color-secondary)] group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'legal' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {legalGuides.map((g, idx) => (
            <Link
              key={idx}
              href={g.url}
              className="p-5 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500/40 hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-[10px] font-bold">
                  {g.tag}
                </span>
                <span className="material-symbols-outlined text-sm text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
              <span className="text-sm font-bold text-[var(--color-primary)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {g.title}
              </span>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'calculators' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {calculators.map((c, idx) => (
            <Link
              key={idx}
              href={c.url}
              className="p-5 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500/40 hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-bold">
                  {c.tag}
                </span>
                <span className="material-symbols-outlined text-sm text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
              <span className="text-sm font-bold text-[var(--color-primary)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {c.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
