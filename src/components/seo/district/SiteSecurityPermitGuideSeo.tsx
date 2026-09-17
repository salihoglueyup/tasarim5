"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import {
  SECURITY_PERMIT_STEPS,
  SECURITY_EMPLOYMENT_COMPARISON,
  SecurityPermitStep,
} from '@/data/siteSecurityCommissionPermitData';

export default function SiteSecurityPermitGuideSeo() {
  const [activeTab, setActiveTab] = useState<'permit-steps' | 'employment-comparison'>('permit-steps');

  // Schema.org GovernmentPermit & TechArticle
  const schemaSecurity = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentPermit',
    '@id': `${BASE_URL}/hizmetler/guvenlik-yonetimi#valilik-ozel-guvenlik-izni`,
    name: '5188 Sayılı Kanun Sitelerde Özel Güvenlik Kurulumu ve Valilik İzinleri Rehberi',
    description:
      'Apartman ve sitelerde özel güvenlik görevlisi istihdam edebilmek için İl Özel Güvenlik Komisyonu başvuru adımları, ÖGNET tescili ve yöneticiyi kıdem tazminatından koruyan yasal kalkan.',
    url: `${BASE_URL}/hizmetler/guvenlik-yonetimi#valilik-ozel-guvenlik-izni`,
    issuedBy: {
      '@type': 'AdministrativeArea',
      name: 'İstanbul Valiliği İl Özel Güvenlik Komisyonu',
    },
  };

  return (
    <section
      id="valilik-ozel-guvenlik-izni"
      aria-label="5188 Sayılı Kanun Sitelerde Özel Güvenlik Kurulum & Valilik İzinleri Rehberi"
      className="my-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSecurity) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">security</span>
            <span>5188 Mevzuat & Valilik İzinleri</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sitelerde Özel Güvenlik Kurulumu, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-400">Valilik İzinleri & Hukuki Sorumluluk</span>
          </h2>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
            İl Özel Güvenlik Komisyonu başvuru prosedürü, 5188 yasal şartları ve yöneticinin şahsi malvarlığını milyonluk kıdem tazminatından koruyan kurumsal hizmet modeli.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('permit-steps')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'permit-steps'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Valilik İzin Süreci (6 Adım)
          </button>
          <button
            onClick={() => setActiveTab('employment-comparison')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'employment-comparison'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Bordrolu vs Taşeron Risk Kıyası
          </button>
        </div>
      </div>

      {/* Tab 1: Permit Steps */}
      {activeTab === 'permit-steps' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECURITY_PERMIT_STEPS.map((step) => (
            <div
              key={step.stepNo}
              className="bg-slate-800/40 border border-slate-800 hover:border-indigo-800/60 rounded-2xl p-5 flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 font-extrabold text-sm flex items-center justify-center">
                    {step.stepNo}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60">
                    {step.timeframe}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition mb-1">
                  {step.stepName}
                </h3>
                <span className="text-[11px] text-indigo-400 font-semibold block mb-2">
                  Yetkili Makam: {step.authority}
                </span>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 text-xs">
                <span className="text-[11px] text-slate-400 font-bold block mb-1">
                  Gereken Resmi Belgeler:
                </span>
                <ul className="space-y-1 text-slate-400 text-[11px]">
                  {step.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-400">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Employment Comparison */}
      {activeTab === 'employment-comparison' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200">
            <strong>Hukuki Uyarı:</strong> 4857 Sayılı İş Kanunu uyarınca doğrudan site bünyesinde çalıştırılan güvenlik personeli, sitenin tüm maliklerini müteselsilen işveren konumuna sokar. Personelin ayrılması halinde kıdem tazminatı doğrudan yönetici ve kat maliklerinden tahsil edilir.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider bg-slate-800/40">
                  <th className="py-3 px-4 rounded-l-xl">Hukuki Risk Boyutu</th>
                  <th className="py-3 px-4">Kendi Bünyesinde Bordrolu İstihdam</th>
                  <th className="py-3 px-4">Alo Yönetim 5188 Kurumsal Hizmet Alımı</th>
                  <th className="py-3 px-4 rounded-r-xl">Risk Derecesi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {SECURITY_EMPLOYMENT_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      {row.aspect}
                    </td>
                    <td className="py-3 px-4 text-slate-300 leading-relaxed">
                      {row.directEmployment}
                    </td>
                    <td className="py-3 px-4 text-emerald-300 leading-relaxed font-medium bg-emerald-950/10">
                      {row.aloYonetimOutsourcing}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          row.riskSeverity === 'Kritik Risk'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {row.riskSeverity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-400" aria-hidden="true">verified_user</span>
          <span>
            Alo Yönetim, Valilik Özel Güvenlik Komisyonu izin dosyasını ve fiziki keşif sürecini siteniz adına A'dan Z'ye ücretsiz yürütür.
          </span>
        </div>
        <a
          href="/iletisim"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition flex-shrink-0"
        >
          <span>5188 Güvenlik Keşfi İsteyin</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
