"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '@/lib/seo';
import {
  OFFICIAL_LEGAL_DOCUMENTS,
  LegalDocumentTemplate,
} from '@/data/officialLegalDocumentsData';

export default function KMKLegalDocumentVaultSeo() {
  const [selectedId, setSelectedId] = useState<string>(OFFICIAL_LEGAL_DOCUMENTS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeDoc = OFFICIAL_LEGAL_DOCUMENTS.find((d) => d.id === selectedId) || OFFICIAL_LEGAL_DOCUMENTS[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredDocs = OFFICIAL_LEGAL_DOCUMENTS.filter(
    (d) => selectedCategory === 'all' || d.category === selectedCategory
  );

  // Schema.org DigitalDocument & Legislation for Google Search
  const schemaDocumentVault = {
    '@context': 'https://schema.org',
    '@graph': OFFICIAL_LEGAL_DOCUMENTS.map((doc) => ({
      '@type': 'DigitalDocument',
      '@id': `${BASE_URL}/hizmetler/site-yonetimi#belge-${doc.id}`,
      name: doc.title,
      description: doc.schemaDescription,
      url: `${BASE_URL}/hizmetler/site-yonetimi#resmi-sablonlar`,
      author: {
        '@type': 'Organization',
        name: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
        url: BASE_URL,
      },
      hasPart: {
        '@type': 'Legislation',
        name: doc.kmkArticleRef,
        legislationType: 'Resmi Kanun & Karar Şablonu',
      },
    })),
  };

  return (
    <section id="resmi-sablonlar" className="my-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      {/* Schema.org DigitalDocument Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaDocumentVault) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-600/10 dark:bg-cyan-400/10 border border-cyan-600/20 dark:border-cyan-400/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">description</span>
            Resmi KMK Hukuk ve Karar Şablonları Kütüphanesi
          </div>
          <h3 className="text-xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Kat Mülkiyeti <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-300">Resmi Belge, Tutanak & İhtarname Şablonları</span>
          </h3>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-3xl">
            634 Sayılı KMK ve İİK 68/1 uyumlu, avukat onaylı yönetici seçim tutanakları, aidat ihtarnameleri ve genel kurul evraklarını ücretsiz kopyalayıp kullanın.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)]">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>8 Resmi Şablon Hazır</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {[
          { id: 'all', name: 'Tüm Şablonlar (8)' },
          { id: 'yonetim-yetki', name: 'Yönetim & Yetki (2)' },
          { id: 'genel-kurul', name: 'Genel Kurul & Çağrı (2)' },
          { id: 'aidat-icra', name: 'Aidat & İcra (2)' },
          { id: 'ortak-alan', name: 'Ortak Alan & Balkon (2)' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border-[var(--color-outline)]/80 hover:border-slate-400'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid: Left Document Selectors, Right Document Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Template List */}
        <div className="lg:col-span-4 space-y-2">
          {filteredDocs.map((doc, idx) => {
            const isSelected = doc.id === selectedId;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedId(doc.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/20 shadow-sm'
                    : 'bg-[var(--color-surface-variant)]/60 border-[var(--color-outline)]/80 hover:border-cyan-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-extrabold text-cyan-600 dark:text-cyan-400">
                    Şablon #{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/5 dark:bg-white/10 text-[var(--color-secondary)]">
                    {doc.kmkArticleRef.split(' ')[2] || 'KMK'}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">
                  {doc.shortTitle}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Document Viewer & Action Box */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDoc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)] rounded-3xl p-6 sm:p-8 space-y-6"
            >
              {/* Document Title & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-outline)]/60">
                <div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                    Yasal Dayanak: {activeDoc.kmkArticleRef}
                  </span>
                  <h3 className="text-base sm:text-xl font-extrabold text-[var(--color-primary)]">
                    {activeDoc.title}
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(activeDoc.id, activeDoc.templateText)}
                  className="shrink-0 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  aria-label="Şablonu Kopyala"
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">
                    {copiedId === activeDoc.id ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedId === activeDoc.id ? 'Metin Kopyalandı!' : 'Şablonu Kopyala'}</span>
                </button>
              </div>

              {/* Purpose & Legal Condition Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70">
                  <span className="font-extrabold text-[var(--color-primary)] block mb-1">Belgenin Amacı:</span>
                  <p className="text-[var(--color-secondary)] leading-relaxed">{activeDoc.purpose}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-900/40">
                  <span className="font-extrabold text-cyan-800 dark:text-cyan-300 block mb-1">Kanuni Geçerlilik Şartı:</span>
                  <p className="text-[var(--color-secondary)] leading-relaxed">{activeDoc.legalValidityCondition}</p>
                </div>
              </div>

              {/* Document Text Box (Monospace Formatted) */}
              <div className="relative">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900/10 dark:bg-white/10 text-[var(--color-secondary)]">
                    Doldurulabilir Şablon Metni
                  </span>
                </div>
                <pre className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 text-xs font-mono text-[var(--color-primary)] whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto scrollbar-thin">
                  {activeDoc.templateText}
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
