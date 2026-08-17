"use client";

import React, { useState, useMemo } from 'react';
import JsonLd from './JsonLd';
import { definedTermSetSchema } from '@/lib/schemas';
import { motion, AnimatePresence } from 'framer-motion';

interface TermItem {
  term: string;
  definition: string;
}

interface DefinedTermSetSeoProps {
  name: string;
  description: string;
  path: string;
  terms: TermItem[];
  className?: string;
}

export default function DefinedTermSetSeo({
  name,
  description,
  path,
  terms,
  className = ""
}: DefinedTermSetSeoProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState<string>("TÜMÜ");
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const schema = definedTermSetSchema({
    name,
    description,
    path,
    terms
  });

  // Calculate term counts per letter
  const letterCounts = useMemo(() => {
    const map: Record<string, number> = { TÜMÜ: terms.length };
    terms.forEach((t) => {
      const firstChar = t.term.charAt(0).toLocaleUpperCase('tr-TR');
      map[firstChar] = (map[firstChar] || 0) + 1;
    });
    return map;
  }, [terms]);

  const letters = useMemo(() => {
    const distinct = Array.from(new Set(terms.map((t) => t.term.charAt(0).toLocaleUpperCase('tr-TR')))).sort((a, b) => a.localeCompare(b, 'tr'));
    return ["TÜMÜ", ...distinct];
  }, [terms]);

  const filteredTerms = useMemo(() => {
    const q = searchTerm.trim().toLocaleLowerCase('tr-TR');
    return terms.filter((t) => {
      const matchesSearch =
        !q ||
        t.term.toLocaleLowerCase('tr-TR').includes(q) ||
        t.definition.toLocaleLowerCase('tr-TR').includes(q);
      const matchesLetter =
        activeLetter === "TÜMÜ" ||
        t.term.toLocaleUpperCase('tr-TR').startsWith(activeLetter);
      return matchesSearch && matchesLetter;
    });
  }, [terms, searchTerm, activeLetter]);

  const handleCopyTerm = (term: string, definition: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${term}: ${definition}`);
      setCopiedTerm(term);
      setTimeout(() => setCopiedTerm(null), 2000);
    }
  };

  // Function to highlight search query within text
  const renderHighlighted = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLocaleLowerCase('tr-TR') === query.toLocaleLowerCase('tr-TR') ? (
            <mark key={i} className="bg-amber-300 dark:bg-amber-500/40 text-slate-950 dark:text-amber-200 px-1 rounded-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <>
      <JsonLd data={[schema]} />
      <div className={`flex flex-col gap-10 ${className}`}>
        
        {/* Başlık ve Açıklama */}
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold w-fit mx-auto border border-blue-500/20">
            <span className="material-symbols-outlined text-sm">menu_book</span>
            <span>Resmi Kat Mülkiyeti & Tesis Sözlüğü ({terms.length} Terim)</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-primary)]">{name}</h2>
          <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Filtreleme ve Arama */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Sözlükte terim veya açıklama ara (örn: aidat, işletme projesi, arsa payı)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-14 pr-12 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                title="Aramayı Temizle"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>

          {/* A-Z Harf Barı */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {letters.map((letter) => {
              const count = letterCounts[letter] || 0;
              const isActive = activeLetter === letter;

              return (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  className={`px-3 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md' 
                      : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{letter}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-white/20 dark:bg-black/20' : 'bg-black/5 dark:bg-white/10 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sonuçlar Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredTerms.map((t) => (
              <motion.div
                key={t.term}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between gap-4 relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-[var(--color-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {renderHighlighted(t.term, searchTerm)}
                    </h3>
                    <button
                      onClick={() => handleCopyTerm(t.term, t.definition)}
                      className="p-1.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Tanımı Kopyala"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copiedTerm === t.term ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                  <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
                    {renderHighlighted(t.definition, searchTerm)}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">Kat Mülkiyeti Kanunu (KMK 634)</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Alo Yönetim Sözlüğü</span>
                </div>
              </motion.div>
            ))}
            {filteredTerms.length === 0 && (
              <div className="col-span-full py-20 text-center text-[var(--color-secondary)] font-light text-lg space-y-2">
                <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
                <p>"{searchTerm}" için terim bulunamadı.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
