"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';
import {
  KMK_LEGAL_NOTICES_TEMPLATES,
  LegalNoticeTemplateItem,
} from '@/data/kmkLegalNoticesTemplatesData';

type NoticeCategory = 'Tümü' | 'Aidat & İcra' | 'Komşuluk & Mimari' | 'Genel Kurul & Vekalet' | 'Yönetim & Devir Teslim';

export default function KMKLegalNoticesVaultSeo() {
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string>('ihtar-kmk-20-aidat-avans-borcu');

  const categories: NoticeCategory[] = [
    'Tümü',
    'Aidat & İcra',
    'Komşuluk & Mimari',
    'Genel Kurul & Vekalet',
    'Yönetim & Devir Teslim',
  ];

  const filteredTemplates = useMemo(() => {
    return KMK_LEGAL_NOTICES_TEMPLATES.filter((item) => {
      const matchesCat = selectedCategory === 'Tümü' || item.category === selectedCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.statutoryArticle.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.templateContent.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Schema.org DigitalDocument & Legislation
  const schemaNotices = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    '@id': `${BASE_URL}/hizmetler/site-yonetimi#kmk-hukuki-ihtarname-kutuphanesi`,
    name: 'Kat Malikleri ve Yöneticiler İçin KMK Hukuki İhtarname & Tutanak Şablon Kütüphanesi',
    description:
      'Aidat gecikme ihtarnamesi, mimari aykırılık ve cam balkon söküm ihtarı, genel kurul çağrı mektubu, vekaletname ve devir teslim protokolü şablonları.',
    url: `${BASE_URL}/hizmetler/site-yonetimi#kmk-hukuki-ihtarname-kutuphanesi`,
    hasPart: KMK_LEGAL_NOTICES_TEMPLATES.map((t) => ({
      '@type': 'DigitalDocument',
      name: t.title,
      description: t.summary,
      text: t.statutoryArticle,
    })),
  };

  return (
    <section
      id="kmk-hukuki-ihtarname-kutuphanesi"
      aria-label="Kat Malikleri ve Yöneticiler İçin KMK Hukuki İhtarname & Tutanak Şablon Kütüphanesi"
      className="my-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaNotices) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">description</span>
            <span>Hukuki Belge & Tutanak Havuzu</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kat Malikleri & Yöneticiler İçin <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300">KMK İhtarname & Tutanak Kütüphanesi</span>
          </h2>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
            Aidat borcu ihtarnamesinden izinsiz cam balkon uyarısına, genel kurul çağrısından vekaletnameye kadar noter ve mahkeme süreçlerinde yasal geçerliliği olan resmi şablonlar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Tek Tıkla Kopyala & Kullan</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" aria-hidden="true">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İhtarname veya tutanak adı arayın (Örn: Aidat, cam balkon, gürültü, vekaletname, devir teslim)..."
            className="w-full pl-10 pr-10 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Aramayı temizle"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-800/60 rounded-xl border border-slate-700/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates List */}
      <div className="space-y-4">
        {filteredTemplates.map((template) => {
          const isExpanded = expandedId === template.id;
          const isCopied = copiedId === template.id;

          return (
            <div
              key={template.id}
              className="bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-2xl transition overflow-hidden"
            >
              {/* Header trigger */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div
                  className="flex items-start sm:items-center gap-3 cursor-pointer flex-1"
                  onClick={() => setExpandedId(isExpanded ? '' : template.id)}
                >
                  <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm flex-shrink-0 mt-0.5 sm:mt-0">
                    <span className="material-symbols-outlined text-base" aria-hidden="true">gavel</span>
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-700/80 text-amber-300">
                        {template.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {template.dispatchMethod}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition">
                      {template.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleCopy(template.id, template.templateContent)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition shadow"
                  >
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      {isCopied ? 'check' : 'content_copy'}
                    </span>
                    <span>{isCopied ? 'Kopyalandı!' : 'Metni Kopyala'}</span>
                  </button>

                  <button
                    onClick={() => setExpandedId(isExpanded ? '' : template.id)}
                    className="p-1.5 text-slate-400 hover:text-white"
                    aria-label={isExpanded ? 'Detayı Kapat' : 'Detayı Aç'}
                  >
                    <span
                      className={`material-symbols-outlined transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-amber-400' : ''
                      }`}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </button>
                </div>
              </div>

              {/* Collapsible details & template */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-slate-800 px-4 sm:px-6 py-5 bg-slate-900/50 space-y-4 text-xs sm:text-sm"
                  >
                    {/* Summary & Statutory Article */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-0.5">
                          Yasal Dayanak:
                        </span>
                        <strong className="text-white font-mono text-xs">{template.statutoryArticle}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-0.5">
                          Muhatap / Gönderim Kanalı:
                        </span>
                        <span className="text-slate-200 text-xs">
                          {template.targetRecipient} ({template.dispatchMethod})
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed italic bg-slate-800/30 p-3 rounded-xl border border-slate-800">
                      {template.summary}
                    </p>

                    {/* Template Content Box */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Resmi Şablon Metni (Doldurulabilir Taslak)
                        </span>
                        <button
                          onClick={() => handleCopy(template.id, template.templateContent)}
                          className="text-xs text-amber-400 hover:underline font-medium"
                        >
                          {isCopied ? 'Kopyalandı' : 'Panoya Kopyala'}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
                        {template.templateContent}
                      </pre>
                    </div>

                    {/* Practical notes & Alo Guarantee */}
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                        <strong className="text-xs text-amber-300 font-bold block mb-1">
                          📌 Uygulama ve Tebligat İpuçları:
                        </strong>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {template.practicalUsageNotes.map((note, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-400">•</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-base flex-shrink-0" aria-hidden="true">
                          verified
                        </span>
                        <span>{template.aloYonetimLegalAssurance}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-400" aria-hidden="true">info</span>
          <span>
            Şablonlardaki köşeli parantezli [Örn: Tarih, İsim, Tutar] alanları kendi sitenizin bilgilerine göre doldurarak kullanabilirsiniz.
          </span>
        </div>
        <a
          href="/iletisim"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold transition flex-shrink-0"
        >
          <span>Hukuki Destek Talep Edin</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
