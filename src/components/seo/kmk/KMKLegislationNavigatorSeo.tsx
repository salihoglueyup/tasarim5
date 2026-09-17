"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';
import { KMK_LEGISLATION_ARTICLES, KmkArticleItem } from '@/data/kmkLegislationArticlesData';

type CategoryFilter = 'Tümü' | 'Mülkiyet & Arsa Payı' | 'Maliye & Aidat' | 'Yönetim Organları' | 'Denetim & Yargı';

export default function KMKLegislationNavigatorSeo() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticles, setExpandedArticles] = useState<number[]>([20, 34]); // Default open KMK 20 and 34

  const categories: CategoryFilter[] = [
    'Tümü',
    'Mülkiyet & Arsa Payı',
    'Maliye & Aidat',
    'Yönetim Organları',
    'Denetim & Yargı',
  ];

  const filteredArticles = useMemo(() => {
    return KMK_LEGISLATION_ARTICLES.filter((item) => {
      const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.articleCode.toLowerCase().includes(q) ||
        item.articleTitle.toLowerCase().includes(q) ||
        item.plainLanguageSummary.toLowerCase().includes(q) ||
        item.originalStatuteSnippet.toLowerCase().includes(q) ||
        item.supremeCourtPrinciple.toLowerCase().includes(q) ||
        item.legalSanctionOrRisk.toLowerCase().includes(q) ||
        item.aloYonetimStandard.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const toggleArticle = (articleNo: number) => {
    setExpandedArticles((prev) =>
      prev.includes(articleNo) ? prev.filter((no) => no !== articleNo) : [...prev, articleNo]
    );
  };

  const expandAll = () => {
    setExpandedArticles(filteredArticles.map((a) => a.articleNo));
  };

  const collapseAll = () => {
    setExpandedArticles([]);
  };

  // Schema.org Legislation Linked Data
  const schemaLegislation = {
    '@context': 'https://schema.org',
    '@type': 'Legislation',
    '@id': `${BASE_URL}/hizmetler/site-yonetimi#kmk-mevzuat-gezgini`,
    name: '634 Sayılı Kat Mülkiyeti Kanunu İnteraktif Mevzuat & Yargıtay Emsal Gezgini',
    legislationType: 'Kanun',
    legislationIdentifier: '634',
    headline: 'Kat Mülkiyeti Kanunu 20 Kritik Madde, Sadeleştirilmiş Açıklamalar ve Yargıtay İlkeleri',
    description:
      "Apartman ve site yönetiminin anayasası olan 634 sayılı KMK'nın aidat, ortak yerler, genel kurul, yönetici ve denetçi sorumluluklarına ilişkin maddelerinin kapsamlı rehberi.",
    url: `${BASE_URL}/hizmetler/site-yonetimi#kmk-mevzuat-gezgini`,
    hasPart: KMK_LEGISLATION_ARTICLES.map((a) => ({
      '@type': 'Legislation',
      name: `${a.articleCode}: ${a.articleTitle}`,
      legislationIdentifier: String(a.articleNo),
      description: a.plainLanguageSummary,
    })),
  };

  return (
    <section
      id="kmk-mevzuat-gezgini"
      aria-label="634 Sayılı Kat Mülkiyeti Kanunu Madde Madde Mevzuat Gezgini"
      className="my-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Schema.org Legislation Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLegislation) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">gavel</span>
            <span>Hukuk & Mevzuat Rehberi</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            634 Sayılı Kat Mülkiyeti Kanunu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">Madde Madde Mevzuat Gezgini</span>
          </h2>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
            Apartman ve sitelerde yaşanan anlaşmazlıkların yasal çözümü: Kanunun orijinal metni, sadeleştirilmiş açıklaması, Yargıtay emsal içtihatları ve Alo Yönetim kurumsal uygulama standartları.
          </p>
        </div>

        {/* Action badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            Tümünü Aç
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            Tümünü Kapat
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" aria-hidden="true">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Madde no veya anahtar kelime arayın (Örn: Aidat, gecikme tazminatı, asansör, genel kurul, yönetici)..."
            className="w-full pl-10 pr-10 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
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

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-800/60 rounded-xl border border-slate-700/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Counter summary */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
        <span>
          Toplam <strong className="text-white">{filteredArticles.length}</strong> madde listeleniyor
        </span>
        <span>634 Sayılı Kanun & 7445 Sayılı Yargı Paketi Güncel</span>
      </div>

      {/* Articles Accordion List */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/30 rounded-2xl border border-slate-800">
            <span className="material-symbols-outlined text-4xl text-slate-500 mb-2" aria-hidden="true">
              search_off
            </span>
            <p className="text-slate-400 text-sm">Aradığınız kriterlere uygun KMK maddesi bulunamadı.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tümü');
              }}
              className="mt-3 text-xs text-blue-400 hover:underline font-medium"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          filteredArticles.map((article) => {
            const isExpanded = expandedArticles.includes(article.articleNo);

            return (
              <div
                key={article.articleNo}
                className="bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-2xl transition overflow-hidden"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleArticle(article.articleNo)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none group"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm group-hover:bg-blue-600 group-hover:text-white transition">
                      m.{article.articleNo}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700/80 text-slate-300">
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-400">{article.articleCode}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-blue-300 transition">
                        {article.articleTitle}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-blue-400' : ''
                    }`}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>

                {/* Accordion Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-800/80 px-4 sm:px-6 py-5 bg-slate-900/40 space-y-4 text-xs sm:text-sm"
                    >
                      {/* Plain Language Summary */}
                      <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-300 font-semibold mb-1">
                          <span className="material-symbols-outlined text-base" aria-hidden="true">lightbulb</span>
                          <span>Pratik Açıklama (Ne Anlama Gelir?)</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{article.plainLanguageSummary}</p>
                      </div>

                      {/* Original Statute Snippet */}
                      <div>
                        <div className="flex items-center gap-2 text-slate-400 font-semibold mb-1.5">
                          <span className="material-symbols-outlined text-base" aria-hidden="true">menu_book</span>
                          <span>Kanun Metni Özeti</span>
                        </div>
                        <blockquote className="italic text-slate-300 border-l-2 border-slate-600 pl-3 py-1 bg-slate-800/30 rounded-r-lg font-mono text-xs leading-relaxed">
                          "{article.originalStatuteSnippet}"
                        </blockquote>
                      </div>

                      {/* Grid for Supreme Court and Legal Sanctions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        {/* Supreme Court Principle */}
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                          <div className="flex items-center gap-2 text-purple-300 font-semibold mb-1">
                            <span className="material-symbols-outlined text-base" aria-hidden="true">balance</span>
                            <span>Yargıtay Emsal Karar İlkesi</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{article.supremeCourtPrinciple}</p>
                        </div>

                        {/* Legal Sanction & Risk */}
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                          <div className="flex items-center gap-2 text-rose-300 font-semibold mb-1">
                            <span className="material-symbols-outlined text-base" aria-hidden="true">warning</span>
                            <span>Uymama Halinde Hukuki Yaptırım & Risk</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{article.legalSanctionOrRisk}</p>
                        </div>
                      </div>

                      {/* Alo Yönetim Standard */}
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1">
                          <span className="material-symbols-outlined text-base" aria-hidden="true">verified</span>
                          <span>Alo Yönetim Kurumsal Standart Güvencesi</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{article.aloYonetimStandard}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info Box */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-xl text-blue-400" aria-hidden="true">info</span>
          <span>
            Hukuki uyuşmazlıklarda 7445 sayılı kanun uyarınca dava açılmadan önce Adliye Arabuluculuk Bürosu başvurusu zorunludur.
          </span>
        </div>
        <a
          href="/iletisim"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition flex-shrink-0"
        >
          <span>Hukuk Müşavirliği Randevusu</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
