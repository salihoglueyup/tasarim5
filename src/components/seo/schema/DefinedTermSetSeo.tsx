"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/seo/schema/JsonLd';
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
  { id: 'all', label: 'Tüm Konular', icon: 'apps', badgeClass: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/60' },
  { id: 'kmk', label: 'KMK & Hukuk', icon: 'gavel', badgeClass: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/60' },
  { id: 'guvenlik', label: '5188 Güvenlik', icon: 'shield', badgeClass: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/60' },
  { id: 'finans', label: 'Aidat & Finans', icon: 'payments', badgeClass: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/60' },
  { id: 'teknik', label: 'Teknik Bakım', icon: 'engineering', badgeClass: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/60' },
  { id: 'hijyen', label: 'Temizlik & Hijyen', icon: 'cleaning_services', badgeClass: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/60' },
  { id: 'tesis', label: 'Tesis Yönetimi', icon: 'domain', badgeClass: 'bg-[var(--color-surface-variant)] text-[var(--color-primary)] border-[var(--color-outline)]/60' },
];

export const POPULAR_QUICK_CHIPS = [
  { label: 'İşletme Projesi (KMK 37)', query: 'işletme projesi' },
  { label: 'Gecikme Tazminatı (%5)', query: 'gecikme tazminatı' },
  { label: 'Demirbaş Fonu', query: 'demirbaş' },
  { label: 'Yönetim Planı (KMK 28)', query: 'yönetim planı' },
  { label: '5188 Güvenlik İzni', query: '5188' },
  { label: 'Mali ve İdari İbra', query: 'ibra' },
  { label: 'Hazirun Cetveli', query: 'hazirun' },
  { label: 'Asansör Bakım Yönetmeliği', query: 'asansör' },
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

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') || params.get('search');
      if (q && q.trim()) {
        setSearchTerm(q.trim());
      }
    }
  }, []);

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
              <span className="material-symbols-outlined text-sm" aria-hidden="true">menu_book</span>
              <span>Resmi Kat Mülkiyeti & Tesis Sözlüğü ({terms.length} Terim)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">{name}</h2>
            <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {/* İnteraktif Arama & Filtreleme Kontrol Paneli */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-5 md:p-7 flex flex-col gap-5 shadow-xs">
          
          {/* Canlı Arama Girişi */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4.5 top-1/2 -translate-y-1/2 text-[var(--color-secondary)] text-xl pointer-events-none" aria-hidden="true">search</span>
            <input 
              id="dictionary-search-input"
              name="q"
              type="text" 
              placeholder="Sözlükte terim, kanun maddesi veya tanım ara (örn: aidat, işletme projesi, 5188, arsa payı)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]/80 rounded-2xl py-3.5 pl-12 pr-12 text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all placeholder:text-[var(--color-secondary)] text-sm font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-[var(--color-secondary)] hover:text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-surface-variant)] transition-colors cursor-pointer"
                title="Aramayı Temizle"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">close</span>
              </button>
            )}
          </div>

          {/* Popüler Terim Hızlı Filtreleri (Quick Chips) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-[var(--color-secondary)] mr-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">trending_up</span>
              <span>Popüler:</span>
            </span>
            {POPULAR_QUICK_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => {
                  setSearchTerm(chip.query);
                  setActiveLetter('TÜMÜ');
                  setActiveCategory('all');
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] border border-[var(--color-outline)]/60 transition-all cursor-pointer shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Kategori Filtre Butonları */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--color-outline)]/40">
            <span className="text-xs font-bold text-[var(--color-secondary)] mr-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">filter_list</span>
              <span>Kategori:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)] shadow-sm scale-[1.02]'
                      : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[var(--color-secondary)]'
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
                  type="button"
                  onClick={() => setActiveLetter(letter)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1 cursor-pointer ${
                    isActive 
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm scale-105' 
                      : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] border border-[var(--color-outline)]/40'
                  }`}
                >
                  <span>{letter}</span>
                  {letter !== 'TÜMÜ' && (
                    <span className={`text-[9px] px-1 py-0.2 rounded ${
                      isActive ? 'bg-white/25 text-white' : 'bg-black/5 dark:bg-white/10 text-[var(--color-secondary)]'
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
        <div className="flex items-center justify-between text-xs text-[var(--color-secondary)] px-2">
          <span>
            Toplam <strong className="text-[var(--color-primary)]">{terms.length}</strong> terimden <strong className="text-[var(--color-primary)]">{filteredTerms.length}</strong> tanesi listeleniyor.
          </span>
          {(searchTerm || activeLetter !== 'TÜMÜ' || activeCategory !== 'all') && (
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setActiveLetter('TÜMÜ'); setActiveCategory('all'); }}
              className="text-[var(--color-primary)] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">restart_alt</span>
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
                  className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:border-[var(--color-primary)]/40 transition-all group flex flex-col justify-between gap-4 relative"
                >
                  <div className="space-y-3">
                    {/* Kategori Rozeti & Kopyala Butonu */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-extrabold border ${cat.badgeClass}`}>
                        <span className="material-symbols-outlined text-[13px]" aria-hidden="true">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCopyTerm(t.term, t.definition)}
                        className="p-1.5 rounded-xl bg-[var(--color-surface-variant)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] text-[var(--color-secondary)] transition-colors cursor-pointer"
                        title="Tanımı Kopyala"
                        aria-label={`${t.term} tanımını kopyala`}
                      >
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">
                          {copiedTerm === t.term ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>

                    {/* Terim Başlığı */}
                    <Link 
                      href={`/sozluk/${slug}`}
                      className="block text-lg font-bold text-[var(--color-primary)] group-hover:underline transition-all leading-snug"
                    >
                      {renderHighlighted(t.term, searchTerm)}
                    </Link>

                    {/* Tanım */}
                    <p className="text-[13.5px] text-[var(--color-secondary)] font-normal leading-relaxed">
                      {renderHighlighted(t.definition, searchTerm)}
                    </p>
                  </div>

                  {/* Alt Çapraz Bağlantı ve Detay Linki */}
                  <div className="pt-3 border-t border-[var(--color-outline)]/40 flex items-center justify-between gap-2 text-xs">
                    {t.link ? (
                      <Link 
                        href={t.link.href}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-primary)] bg-[var(--color-surface-variant)] hover:bg-[var(--color-surface)] px-2.5 py-1 rounded-lg transition-colors border border-[var(--color-outline)]/60"
                      >
                        <span>{t.link.label}</span>
                        <span className="material-symbols-outlined text-[12px]" aria-hidden="true">north_east</span>
                      </Link>
                    ) : (
                      <span className="text-[11px] text-[var(--color-secondary)] font-mono">KMK 634 & Standartlar</span>
                    )}

                    <Link 
                      href={`/sozluk/${slug}`}
                      className="font-bold text-[var(--color-primary)] hover:opacity-80 flex items-center gap-1 group/link transition-opacity text-[11.5px]"
                    >
                      <span>İncele</span>
                      <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true">arrow_forward</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}

            {filteredTerms.length === 0 && (
              <div className="col-span-full py-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/40 rounded-3xl text-center text-[var(--color-secondary)] font-light space-y-3">
                <span className="material-symbols-outlined text-4xl text-slate-400" aria-hidden="true">search_off</span>
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

