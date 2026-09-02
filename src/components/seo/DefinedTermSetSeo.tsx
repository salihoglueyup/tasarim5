"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';
import { definedTermSetSchema } from '@/lib/schemas';
import { motion, AnimatePresence } from 'framer-motion';

export interface TermItem {
  term: string;
  definition: string;
  link?: { href: string; label: string };
}

export type TermCategory = 'all' | 'kmk' | 'guvenlik' | 'finans' | 'teknik' | 'hijyen' | 'tesis';

interface CategoryConfig {
  id: TermCategory;
  label: string;
  icon: string;
  badgeClass: string;
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'all', label: 'Tüm Konular', icon: 'apps', badgeClass: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20' },
  { id: 'kmk', label: 'KMK & Hukuk', icon: 'gavel', badgeClass: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20' },
  { id: 'guvenlik', label: '5188 Güvenlik', icon: 'shield', badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20' },
  { id: 'finans', label: 'Aidat & Finans', icon: 'account_balance_wallet', badgeClass: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20' },
  { id: 'teknik', label: 'Teknik Bakım', icon: 'engineering', badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' },
  { id: 'hijyen', label: 'Temizlik & Hijyen', icon: 'cleaning_services', badgeClass: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20' },
  { id: 'tesis', label: 'Tesis Yönetimi', icon: 'domain', badgeClass: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20' },
];

export function getTermCategory(t: TermItem): CategoryConfig {
  const termLower = t.term.toLowerCase();
  const text = (t.term + ' ' + t.definition).toLowerCase();

  // 1. Terim başlığına özel doğrudan eşleşme (TR & EN)
  if (termLower.includes('aidat') || termLower.includes('bütçe') || termLower.includes('avans') || termLower.includes('demirbaş') || termLower.includes('finans') || termLower.includes('tazminat') || termLower.includes('pay ölçer') || termLower.includes('dues') || termLower.includes('budget') || termLower.includes('fund') || termLower.includes('financial')) {
    return CATEGORIES[3]; // finans
  }
  if (termLower.includes('temizlik') || termLower.includes('hijyen') || termLower.includes('su deposu') || termLower.includes('havuz') || termLower.includes('ilaçlama') || termLower.includes('peyzaj') || termLower.includes('atık') || termLower.includes('cleaning') || termLower.includes('hygiene')) {
    return CATEGORIES[5]; // hijyen
  }
  if (termLower.includes('güvenlik') || termLower.includes('5188') || termLower.includes('cctv') || termLower.includes('kamera') || termLower.includes('nizamiye') || termLower.includes('pts') || termLower.includes('devriye') || termLower.includes('ögi') || termLower.includes('security') || termLower.includes('surveillance')) {
    return CATEGORIES[2]; // guvenlik
  }
  if (termLower.includes('kmk') || termLower.includes('kat mülkiyeti') || termLower.includes('arsa payı') || termLower.includes('kat irtifakı') || termLower.includes('yönetim planı') || termLower.includes('icra') || termLower.includes('genel kurul') || termLower.includes('ibra') || termLower.includes('sığınak') || termLower.includes('hazirun') || termLower.includes('toplu yapı') || termLower.includes('ortak alan') || termLower.includes('law') || termLower.includes('condominium') || termLower.includes('assembly') || termLower.includes('bylaws')) {
    return CATEGORIES[1]; // kmk
  }
  if (termLower.includes('asansör') || termLower.includes('jeneratör') || termLower.includes('hidrofor') || termLower.includes('bakım') || termLower.includes('bms') || termLower.includes('otomasyon') || termLower.includes('yangın') || termLower.includes('kompanzasyon') || termLower.includes('termal') || termLower.includes('enerji') || termLower.includes('maintenance') || termLower.includes('elevator') || termLower.includes('preventive')) {
    return CATEGORIES[4]; // teknik
  }
  if (termLower.includes('tesis') || termLower.includes('sla') || termLower.includes('tse') || termLower.includes('iso') || termLower.includes('iskan') || termLower.includes('denetçi') || termLower.includes('facility')) {
    return CATEGORIES[6]; // tesis
  }

  // 2. Metin içeriğine göre arama
  if (text.includes('5188') || text.includes('özel güvenlik') || text.includes('kamera') || text.includes('cctv') || text.includes('devriye') || text.includes('nizamiye') || text.includes('pts')) {
    return CATEGORIES[2]; // guvenlik
  }
  if (text.includes('aidat') || text.includes('bütçe') || text.includes('avans') || text.includes('muhasebe') || text.includes('finans')) {
    return CATEGORIES[3]; // finans
  }
  if (text.includes('temizlik') || text.includes('hijyen') || text.includes('peyzaj') || text.includes('havuz') || text.includes('ilaçlama') || text.includes('dezenfeksiyon')) {
    return CATEGORIES[5]; // hijyen
  }
  if (text.includes('asansör') || text.includes('jeneratör') || text.includes('hidrofor') || text.includes('bakım') || text.includes('teknik') || text.includes('tesisat')) {
    return CATEGORIES[4]; // teknik
  }
  if (text.includes('kmk') || text.includes('kat mülkiyeti') || text.includes('kanun') || text.includes('icra') || text.includes('yönetim planı')) {
    return CATEGORIES[1]; // kmk
  }
  return CATEGORIES[6]; // tesis
}

interface DefinedTermSetSeoProps {
  name?: string;
  description?: string;
  path: string;
  terms: TermItem[];
  className?: string;
  hideHeader?: boolean;
}

export default function DefinedTermSetSeo({
  name = "Site ve Tesis Yönetimi Sözlüğü",
  description = "Kat malikleri ve site yöneticileri için yasal ve operasyonel terimler sözlüğü.",
  path,
  terms,
  className = "",
  hideHeader = false,
}: DefinedTermSetSeoProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState<string>("TÜMÜ");
  const [activeCategory, setActiveCategory] = useState<TermCategory>("all");
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

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<TermCategory, number> = {
      all: terms.length,
      kmk: 0,
      guvenlik: 0,
      finans: 0,
      teknik: 0,
      hijyen: 0,
      tesis: 0,
    };
    terms.forEach(t => {
      const cat = getTermCategory(t);
      counts[cat.id] = (counts[cat.id] || 0) + 1;
    });
    return counts;
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
      const matchesCategory =
        activeCategory === "all" ||
        getTermCategory(t).id === activeCategory;

      return matchesSearch && matchesLetter && matchesCategory;
    });
  }, [terms, searchTerm, activeLetter, activeCategory]);

  const handleCopyTerm = (term: string, definition: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${term}: ${definition}`);
      setCopiedTerm(term);
      setTimeout(() => setCopiedTerm(null), 2000);
    }
  };

  const renderHighlighted = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLocaleLowerCase('tr-TR') === query.toLocaleLowerCase('tr-TR') ? (
            <mark key={i} className="bg-amber-300 dark:bg-amber-500/40 text-slate-950 dark:text-amber-200 px-1 rounded font-semibold">
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
      <div className={`flex flex-col gap-8 ${className}`}>
        
        {/* Opsiyonel Başlık ve Açıklama (hideHeader false ise) */}
        {!hideHeader && (
          <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold w-fit mx-auto border border-blue-500/20">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>Resmi Kat Mülkiyeti & Tesis Sözlüğü ({terms.length} Terim)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">{name}</h2>
            <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {/* İnteraktif Arama & Filtreleme Kontrol Paneli */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-5 md:p-7 flex flex-col gap-5 shadow-sm">
          
          {/* Canlı Arama Girişi */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">search</span>
            <input 
              type="text" 
              placeholder="Sözlükte terim, kanun maddesi veya tanım ara (örn: aidat, işletme projesi, 5188, arsa payı)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 text-sm font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                title="Aramayı Temizle"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>

          {/* Kategori Filtre Butonları */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--color-outline)]/40">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>Kategori:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-sm scale-[1.02]'
                      : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 dark:bg-black/20' : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* A-Z Harf Barı */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 border-t border-[var(--color-outline)]/40">
            {letters.map((letter) => {
              const count = letterCounts[letter] || 0;
              const isActive = activeLetter === letter;

              return (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-slate-100/90 text-slate-600 dark:bg-white/5 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{letter}</span>
                  {letter !== 'TÜMÜ' && (
                    <span className={`text-[9px] px-1 py-0.2 rounded ${
                      isActive ? 'bg-white/25' : 'bg-black/5 dark:bg-white/10 text-slate-400'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Sonuç Sayacı & Durum Bilgisi */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
          <span>
            Toplam <strong>{terms.length}</strong> terimden <strong>{filteredTerms.length}</strong> tanesi listeleniyor.
          </span>
          {(searchTerm || activeLetter !== 'TÜMÜ' || activeCategory !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setActiveLetter('TÜMÜ'); setActiveCategory('all'); }}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Filtreleri Temizle</span>
            </button>
          )}
        </div>

        {/* Terim Kartları Grid (Titanium & Slate 2-Kolon) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence>
            {filteredTerms.map((t) => {
              const slug = t.term.toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

              const cat = getTermCategory(t);

              return (
                <motion.div
                  key={t.term}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all group flex flex-col justify-between gap-4 relative"
                >
                  <div className="space-y-3">
                    {/* Kategori Rozeti & Kopyala Butonu */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-extrabold border ${cat.badgeClass}`}>
                        <span className="material-symbols-outlined text-[13px]">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </span>

                      <button
                        onClick={() => handleCopyTerm(t.term, t.definition)}
                        className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Tanımı Kopyala"
                        aria-label={`${t.term} tanımını kopyala`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {copiedTerm === t.term ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>

                    {/* Terim Başlığı */}
                    <Link 
                      href={`/sozluk/${slug}`}
                      className="block text-lg font-bold text-[var(--color-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug"
                    >
                      {renderHighlighted(t.term, searchTerm)}
                    </Link>

                    {/* Tanım */}
                    <p className="text-[13.5px] text-[var(--color-secondary)] font-light leading-relaxed">
                      {renderHighlighted(t.definition, searchTerm)}
                    </p>
                  </div>

                  {/* Alt Çapraz Bağlantı ve Detay Linki */}
                  <div className="pt-3 border-t border-[var(--color-outline)]/40 flex items-center justify-between gap-2 text-xs">
                    {t.link ? (
                      <Link 
                        href={t.link.href}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-2.5 py-1 rounded-lg transition-colors border border-blue-200/50 dark:border-blue-800/40"
                      >
                        <span>{t.link.label}</span>
                        <span className="material-symbols-outlined text-[12px]">north_east</span>
                      </Link>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">KMK 634 & Standartlar</span>
                    )}

                    <Link 
                      href={`/sozluk/${slug}`}
                      className="font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group/link transition-colors text-[11.5px]"
                    >
                      <span>İncele</span>
                      <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-0.5 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}

            {filteredTerms.length === 0 && (
              <div className="col-span-full py-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/40 rounded-3xl text-center text-[var(--color-secondary)] font-light space-y-3">
                <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
                <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                  Aradığınız kriterlere uygun terim bulunamadı.
                </p>
                <p className="text-xs text-slate-400">
                  Farklı bir kelime deneyebilir veya kategori filtrelerini sıfırlayabilirsiniz.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </>
  );
}
