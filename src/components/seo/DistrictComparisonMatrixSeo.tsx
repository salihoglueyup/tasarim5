"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DISTRICTS, District } from '@/data/districts';
import JsonLd from './JsonLd';

export default function DistrictComparisonMatrixSeo() {
  const [district1Slug, setDistrict1Slug] = useState<string>('kadikoy');
  const [district2Slug, setDistrict2Slug] = useState<string>('atasehir');

  const d1 = DISTRICTS.find(d => d.slug === district1Slug) || DISTRICTS[0];
  const d2 = DISTRICTS.find(d => d.slug === district2Slug) || DISTRICTS[1];

  const duesMap: Record<string, { avgDuesM2: number; aloDuesM2: number; securityRate: string }> = {
    kadikoy: { avgDuesM2: 48, aloDuesM2: 37, securityRate: '%95 7/24 Güvenlikli' },
    atasehir: { avgDuesM2: 52, aloDuesM2: 39, securityRate: '%98 Rezidans & Site' },
    uskudar: { avgDuesM2: 44, aloDuesM2: 34, securityRate: '%88 Butik ve Orta Ölçek' },
    besiktas: { avgDuesM2: 65, aloDuesM2: 48, securityRate: '%96 Lüks & Tarihi Doku' },
    sariyer: { avgDuesM2: 72, aloDuesM2: 52, securityRate: '%99 Villa & Geniş Peyzaj' },
    sisli: { avgDuesM2: 58, aloDuesM2: 44, securityRate: '%94 Plaza & Rezidans' },
    bakirkoy: { avgDuesM2: 54, aloDuesM2: 41, securityRate: '%92 Sahil Hattı Siteleri' },
    maltepe: { avgDuesM2: 42, aloDuesM2: 32, securityRate: '%90 Çok Bloklu Siteler' },
    kartal: { avgDuesM2: 40, aloDuesM2: 30, securityRate: '%93 Kentsel Dönüşüm Siteleri' },
    pendik: { avgDuesM2: 38, aloDuesM2: 28, securityRate: '%91 Geniş Yerleşkeler' },
    beylikduzu: { avgDuesM2: 36, aloDuesM2: 27, securityRate: '%96 Yüksek Katlı Bloklar' },
    basaksehir: { avgDuesM2: 45, aloDuesM2: 33, securityRate: '%97 Kapalı Devre Siteler' }
  };

  const stat1 = duesMap[d1.slug] || { avgDuesM2: 45, aloDuesM2: 34, securityRate: '%90+' };
  const stat2 = duesMap[d2.slug] || { avgDuesM2: 45, aloDuesM2: 34, securityRate: '%90+' };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: `İstanbul İlçe Tesis Yönetimi ve Aidat Karşılaştırma Matrisi: ${d1.name} vs ${d2.name}`,
    about: [
      {
        '@type': 'Place',
        name: `${d1.name}, İstanbul`,
        description: `${d1.side} Yakası Tesis Yönetimi`
      },
      {
        '@type': 'Place',
        name: `${d2.name}, İstanbul`,
        description: `${d2.side} Yakası Tesis Yönetimi`
      }
    ]
  };

  return (
    <div className="my-12 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
              İlçeler Arası Kıyaslama Motoru
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
            İstanbul İlçe Aidat & Tesis Yönetimi Karşılaştırması
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-1 font-light">
            İki ilçe seçerek m² aidat maliyetlerini, demografik yapıyı ve yönetim gereksinimlerini karşılaştırın.
          </p>
        </div>

        {/* Quick Side Badge */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 p-2 rounded-2xl border border-gray-200 dark:border-white/10">
          <span className="text-xs font-semibold text-[var(--color-secondary)] px-2">Kıyaslanan:</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white px-2.5 py-1 bg-white dark:bg-zinc-800 rounded-xl shadow-xs">
            {d1.name}
          </span>
          <span className="text-xs font-bold text-amber-500">VS</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white px-2.5 py-1 bg-white dark:bg-zinc-800 rounded-xl shadow-xs">
            {d2.name}
          </span>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider">
            1. İlçe Seçin
          </label>
          <select
            value={district1Slug}
            onChange={(e) => setDistrict1Slug(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 font-bold text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {DISTRICTS.map((d) => (
              <option key={d.slug} value={d.slug} disabled={d.slug === district2Slug}>
                {d.name} ({d.side} Yakası)
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider">
            2. İlçe Seçin
          </label>
          <select
            value={district2Slug}
            onChange={(e) => setDistrict2Slug(e.target.value)}
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 font-bold text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {DISTRICTS.map((d) => (
              <option key={d.slug} value={d.slug} disabled={d.slug === district1Slug}>
                {d.name} ({d.side} Yakası)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="py-4 px-4 text-xs font-extrabold uppercase text-[var(--color-secondary)]">Kriter</th>
              <th className="py-4 px-4 text-base font-extrabold text-[var(--color-primary)] bg-amber-500/5 rounded-t-2xl">
                {d1.name}
              </th>
              <th className="py-4 px-4 text-base font-extrabold text-[var(--color-primary)] bg-blue-500/5 rounded-t-2xl">
                {d2.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm">
            <tr>
              <td className="py-4 px-4 font-semibold text-[var(--color-secondary)]">İstanbul Yakası</td>
              <td className="py-4 px-4 font-bold text-[var(--color-primary)] bg-amber-500/5">{d1.side} Yakası</td>
              <td className="py-4 px-4 font-bold text-[var(--color-primary)] bg-blue-500/5">{d2.side} Yakası</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-[var(--color-secondary)]">İlçe Nüfusu</td>
              <td className="py-4 px-4 font-bold text-[var(--color-primary)] bg-amber-500/5">~{d1.population.toLocaleString()} Kişi</td>
              <td className="py-4 px-4 font-bold text-[var(--color-primary)] bg-blue-500/5">~{d2.population.toLocaleString()} Kişi</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-[var(--color-secondary)]">Piyasa Ort. Aidat (m²)</td>
              <td className="py-4 px-4 font-bold text-rose-500 bg-amber-500/5">{stat1.avgDuesM2} ₺ / m²</td>
              <td className="py-4 px-4 font-bold text-rose-500 bg-blue-500/5">{stat2.avgDuesM2} ₺ / m²</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-[var(--color-secondary)]">Alo Yönetim ile Tasarruflu (m²)</td>
              <td className="py-4 px-4 font-extrabold text-emerald-500 bg-amber-500/5">
                {stat1.aloDuesM2} ₺ / m² <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">(-%24)</span>
              </td>
              <td className="py-4 px-4 font-extrabold text-emerald-500 bg-blue-500/5">
                {stat2.aloDuesM2} ₺ / m² <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">(-%25)</span>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-[var(--color-secondary)]">Güvenlik & Site Profili</td>
              <td className="py-4 px-4 text-xs font-medium text-[var(--color-primary)] bg-amber-500/5">{stat1.securityRate}</td>
              <td className="py-4 px-4 text-xs font-medium text-[var(--color-primary)] bg-blue-500/5">{stat2.securityRate}</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-[var(--color-secondary)]">Yönetilen Proje Portföyü</td>
              <td className="py-4 px-4 font-bold text-[var(--color-primary)] bg-amber-500/5">{d1.managedProjects}</td>
              <td className="py-4 px-4 font-bold text-[var(--color-primary)] bg-blue-500/5">{d2.managedProjects}</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-[var(--color-secondary)]">Öne Çıkan Mahalleler</td>
              <td className="py-4 px-4 text-xs text-[var(--color-secondary)] bg-amber-500/5">
                {d1.neighborhoods.slice(0, 4).join(', ')}
              </td>
              <td className="py-4 px-4 text-xs text-[var(--color-secondary)] bg-blue-500/5">
                {d2.neighborhoods.slice(0, 4).join(', ')}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-[var(--color-secondary)]">Detaylı İlçe Sayfası</td>
              <td className="py-4 px-4 bg-amber-500/5 rounded-b-2xl">
                <Link
                  href={`/bolgeler/${d1.slug}`}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>{d1.name} Sayfasına Git</span>
                  <span className="material-symbols-outlined text-xs" aria-hidden="true">arrow_forward</span>
                </Link>
              </td>
              <td className="py-4 px-4 bg-blue-500/5 rounded-b-2xl">
                <Link
                  href={`/bolgeler/${d2.slug}`}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>{d2.name} Sayfasına Git</span>
                  <span className="material-symbols-outlined text-xs" aria-hidden="true">arrow_forward</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
