"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';
import {
  KMK_GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  GlossaryCategory,
  GlossaryTerm,
} from '@/data/kmkGlossaryEncyclopediaData';

export default function KMKGlossaryEncyclopediaSeo() {
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTermId(id);
    setTimeout(() => setCopiedTermId(null), 2500);
  };

  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return KMK_GLOSSARY_TERMS.filter((t) => {
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesQuery =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.snippetDefinition.toLowerCase().includes(q) ||
        t.kmkArticleRef.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Schema.org DefinedTermSet Structured Data for Google Position Zero & Knowledge Graph
  const schemaDefinedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${BASE_URL}/hizmetler/site-yonetimi#kmk-ansiklopedisi`,
    name: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) & Tesis Yönetimi Hukuk Ansiklopedisi',
    description:
      'Apartman, site ve toplu yapı yönetiminde arsa payından gecikme tazminatına, çift çoğunluk yönetici seçiminden 5188 özel güvenliğe kadar tüm terimlerin resmi mevzuat ve Yargıtay emsalleriyle tanımları.',
    url: `${BASE_URL}/hizmetler/site-yonetimi`,
    hasDefinedTerm: KMK_GLOSSARY_TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.snippetDefinition,
      termCode: t.id,
      inDefinedTermSet: `${BASE_URL}/hizmetler/site-yonetimi#kmk-ansiklopedisi`,
      sameAs: t.wikidataUri || undefined,
    })),
  };

  return (
    <section id="kmk-ansiklopedisi" className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      {/* Schema.org DefinedTermSet Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaDefinedTermSet) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 border border-indigo-600/20 dark:border-indigo-400/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">menu_book</span>
            Google Position Zero (0. Sıra) & KMK Hukuk Ansiklopedisi
          </div>
          <h3 className="text-xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Kat Mülkiyeti & Tesis Yönetimi <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-300">Terimler Sözlüğü (52 Terim)</span>
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            634 Sayılı KMK, Yargıtay emsal içtihatları ve ISO 41001 standartlarında bina ve site yönetiminde karşılaşılan tüm kanuni kavramların alıntılanabilir tanımları.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)]">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span>DefinedTermSet V1.0 Aktif</span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4 mb-8">
        {/* Live Search Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)] text-xl" aria-hidden="true">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Terim, madde veya anahtar kelime arayın (Örn: Arsa Payı, KMK 20, Çift Çoğunluk, Asansör)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-sm text-[var(--color-primary)] placeholder-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] px-2 py-1"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border-[var(--color-outline)]/80 hover:border-slate-400'
            }`}
          >
            Tüm Terimler ({KMK_GLOSSARY_TERMS.length})
          </button>
          {GLOSSARY_CATEGORIES.map((cat) => {
            const count = KMK_GLOSSARY_TERMS.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border-[var(--color-outline)]/80 hover:border-slate-400'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">{cat.icon}</span>
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.length === 0 ? (
          <div className="col-span-full py-12 text-center text-sm text-[var(--color-secondary)] bg-[var(--color-surface-variant)] rounded-2xl border border-[var(--color-outline)]">
            Aramanızla eşleşen KMK veya tesis yönetimi terimi bulunamadı. Lütfen farklı bir anahtar kelime deneyin.
          </div>
        ) : (
          filteredTerms.map((item) => {
            const isExpanded = expandedTermId === item.id;
            const isCopied = copiedTermId === item.id;

            return (
              <motion.article
                key={item.id}
                layout
                className="bg-[var(--color-surface-variant)]/60 hover:bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 rounded-2xl p-5 flex flex-col justify-between transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="text-base font-bold text-[var(--color-primary)] tracking-tight">
                        {item.term}
                      </h4>
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        {item.kmkArticleRef}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/5 dark:bg-white/10 text-[var(--color-secondary)] shrink-0">
                      {item.categoryName}
                    </span>
                  </div>

                  {/* Featured Snippet Definition (Google 0. Row Targeted) */}
                  <blockquote className="bg-[var(--color-surface)] border-l-2 border-indigo-600 dark:border-indigo-400 p-3 rounded-r-xl text-xs text-[var(--color-primary)] leading-relaxed mb-3">
                    {item.snippetDefinition}
                  </blockquote>

                  {/* Detailed Explanation Collapsible */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-[var(--color-secondary)] leading-relaxed pt-2 border-t border-[var(--color-outline)]/60 mb-3 space-y-2"
                    >
                      <p>{item.detailedExplanation}</p>
                      {item.relatedTerms?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 text-[11px]">
                          <span className="font-semibold text-[var(--color-primary)]">İlişkili:</span>
                          {item.relatedTerms.map((rt) => (
                            <span key={rt} className="px-2 py-0.5 rounded-md bg-slate-200/50 dark:bg-slate-800/50 text-[var(--color-secondary)]">
                              {rt}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[var(--color-outline)]/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setExpandedTermId(isExpanded ? null : item.id)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Daha Az Göster' : 'Hukuki Detay & Emsal'}</span>
                    <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    {item.wikidataUri && (
                      <a
                        href={item.wikidataUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)] flex items-center gap-0.5"
                        title="Wikidata Varlık Bağlantısı"
                      >
                        <span className="material-symbols-outlined text-[13px]" aria-hidden="true">open_in_new</span>
                        <span>Wikidata</span>
                      </a>
                    )}
                    <button
                      onClick={() => handleCopy(item.id, `${item.term}: ${item.snippetDefinition} (Kaynak: Alo Yönetim — ${item.kmkArticleRef})`)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold transition-colors flex items-center gap-1"
                      aria-label="Tanımı Kopyala"
                    >
                      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                        {isCopied ? 'check' : 'content_copy'}
                      </span>
                      <span>{isCopied ? 'Kopyalandı' : 'Kopyala'}</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })
        )}
      </div>

      {/* Kurumsal Otorite & Tesis Yönetimi Transfer Köprüsü (Internal PageRank Bridge) */}
      <div className="mt-8 p-5 md:p-6 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-slate-900/5 to-indigo-900/10 dark:from-indigo-950/40 dark:via-slate-900/20 dark:to-indigo-950/40 border border-indigo-600/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">apartment</span>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-bold text-[var(--color-primary)]">
              KMK ve Yasal Standartlarda Profesyonel Tesis Yönetimi
            </h4>
            <p className="text-xs text-[var(--color-secondary)] mt-0.5">
              Kat Mülkiyeti Kanunu m.34 ve m.37 uyarınca işletme projesi, 5188 güvenlik ve teknik bakımı kurumsal standartlarda yürütüyoruz.
            </p>
          </div>
        </div>
        <a
          href="/hizmetler/tesis-yonetimi"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow inline-flex items-center gap-1.5"
        >
          <span>Entegre Tesis Yönetimi</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
