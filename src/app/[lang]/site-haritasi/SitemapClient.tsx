"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export type SitemapLink = { name: string; path: string };
export type SitemapCategory = { title: string; links: SitemapLink[] };

type Props = {
  data: SitemapCategory[];
  highlights: SitemapLink[];
};

export default function SitemapClient({ data, highlights }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    data.reduce((acc, cat) => ({ ...acc, [cat.title]: true }), {})
  );

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Filtreleme
  const filteredData = data.map((cat) => ({
    ...cat,
    links: cat.links.filter((link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((cat) => cat.links.length > 0);

  return (
    <div className="flex flex-col gap-16">
      
      {/* 1. Canlı Arama (Live Search) */}
      <div className="w-full max-w-2xl mx-auto relative -mt-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-brand-500 transition-colors" aria-hidden="true">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Site haritasında arayın (Örn: Aidat, Temizlik, Kadıköy...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* 2. Popüler / Öne Çıkan Linkler */}
      {searchTerm === '' && highlights.length > 0 && (
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/5 border border-brand-200 dark:border-brand-500/20 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-brand-500" aria-hidden="true">star</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Popüler Sayfalar</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {highlights.map((link, idx) => (
              <Link
                key={idx}
                href={link.path}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                {link.name}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. Hiyerarşik Site Haritası Ağacı */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        <AnimatePresence>
          {filteredData.length > 0 ? (
            filteredData.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="break-inside-avoid bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-white/5"
                >
                  <h2 className="text-lg font-bold text-[var(--color-primary)] flex items-center gap-3">
                    {category.title}
                    <span className="text-xs font-normal text-[var(--color-secondary)] bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-full">
                      {category.links.length}
                    </span>
                  </h2>
                  <span className="material-symbols-outlined text-[var(--color-secondary)] transition-transform duration-300"
                    style={{ transform: openCategories[category.title] ? 'rotate(180deg)' : 'rotate(0)' }}
                   aria-hidden="true">
                    expand_more
                  </span>
                </button>

                {/* Nested Links */}
                <AnimatePresence initial={false}>
                  {openCategories[category.title] && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col p-6 gap-3 overflow-hidden"
                    >
                      {category.links.map((link, linkIdx) => (
                        <li key={linkIdx} className="group flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mt-2 shrink-0 group-hover:bg-brand-500 transition-colors"></span>
                          <Link
                            href={link.path}
                            className="text-[var(--color-secondary)] hover:text-brand-600 dark:hover:text-brand-400 font-medium leading-tight transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700" aria-hidden="true">search_off</span>
              <p className="text-lg text-[var(--color-secondary)] font-medium">"{searchTerm}" için sonuç bulunamadı.</p>
              <button onClick={() => setSearchTerm('')} className="text-brand-500 font-semibold hover:underline">
                Aramayı Temizle
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
