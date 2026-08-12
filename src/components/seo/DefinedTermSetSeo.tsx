"use client";

import React, { useState } from 'react';
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

  const schema = definedTermSetSchema({
    name,
    description,
    path,
    terms
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState<string>("TÜMÜ");

  const filteredTerms = terms.filter(t => {
    const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase()) || t.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = activeLetter === "TÜMÜ" || t.term.toUpperCase().startsWith(activeLetter);
    return matchesSearch && matchesLetter;
  });

  const letters = ["TÜMÜ", ...Array.from(new Set(terms.map(t => t.term.charAt(0).toUpperCase())))].sort();

  return (
    <>
      <JsonLd data={[schema]} />
      <div className={`flex flex-col gap-10 ${className}`}>
        
        {/* Başlık ve Açıklama */}
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
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
              placeholder="Sözlükte terim veya açıklama ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {letters.map(letter => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                  activeLetter === letter 
                    ? 'bg-brand-500 text-white shadow-lg' 
                    : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                } ${letter === "TÜMÜ" ? 'w-auto px-4' : ''}`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Sonuçlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredTerms.map((t, i) => (
              <motion.div
                key={t.term}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow group"
              >
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {t.term}
                </h3>
                <p className="text-[var(--color-secondary)] font-light leading-relaxed">
                  {t.definition}
                </p>
              </motion.div>
            ))}
            {filteredTerms.length === 0 && (
              <div className="col-span-full py-20 text-center text-[var(--color-secondary)] font-light text-lg">
                "{searchTerm}" için sonuç bulunamadı.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
