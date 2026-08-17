"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';
import JsonLd from './JsonLd';

export interface SearchResultItem {
  title: string;
  category: 'Hizmet' | 'Bölge' | 'Mevzuat' | 'Hesaplayıcı' | 'Kurumsal';
  url: string;
  description: string;
  icon: string;
}

export default function GlobalSpotlightSearchSeo() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search dataset
  const searchIndex: SearchResultItem[] = useMemo(() => [
    ...SERVICES.map((s) => ({
      title: s.name,
      category: 'Hizmet' as const,
      url: s.pillar,
      description: s.summary,
      icon: s.icon || 'home_repair_service'
    })),
    ...DISTRICTS.map((d) => ({
      title: `${d.name} Tesis Yönetimi`,
      category: 'Bölge' as const,
      url: `/bolgeler/${d.slug}`,
      description: `${d.side} Yakası — ${d.intro.slice(0, 80)}...`,
      icon: 'location_on'
    })),
    {
      title: 'KMK 634 & 5188 Yasal Mevzuat Akıllı Danışmanı',
      category: 'Mevzuat' as const,
      url: '/hizmetler/hukuk-ve-icra-danismanligi',
      description: 'Asansör muafiyeti, cam balkon, %5 gecikme faizi ve Yargıtay emsal kararları.',
      icon: 'gavel'
    },
    {
      title: 'KMK Madde 20 Arsa Payı ve Aidat Masraf Simülatörü',
      category: 'Hesaplayıcı' as const,
      url: '/hizmetler/aidat-takibi',
      description: 'Bağımsız bölüm arsa payına göre eşit ve hisseli yasal gider dağılımı.',
      icon: 'calculate'
    },
    {
      title: 'İstanbul İlçe Aidat & Tasarruf Isı Haritası (2026)',
      category: 'Hesaplayıcı' as const,
      url: '/bolgeler',
      description: '12 İstanbul ilçesinin ortalama m² aidat endeksi ve tasarruf simülasyonu.',
      icon: 'map'
    },
    {
      title: 'Resmi PDF Tesis Sağlık & Tasarruf Karnesi',
      category: 'Hesaplayıcı' as const,
      url: '/hesaplayici',
      description: 'Kat malikleri ve yöneticiler için anında üretilen resmi PDF denetim raporu.',
      icon: 'assessment'
    },
    {
      title: 'Bina Deprem, Yangın & Afet Güvenliği Denetim Portalı',
      category: 'Mevzuat' as const,
      url: '/guvenlik-akademisi',
      description: '6 maddelik yasal afet hazırlık kontrol listesi ve afet hazırlık puanı.',
      icon: 'emergency'
    },
    {
      title: 'TÜRKAK & ISO Kalite Belgelerimiz',
      category: 'Kurumsal' as const,
      url: '/kurumsal/kalite-belgelerimiz',
      description: 'ISO 9001, 14001, 45001, 27001, 10002 ve 5188 güvenlik faaliyet izinleri.',
      icon: 'verified'
    },
    {
      title: 'Sıkça Sorulan Sorular (SSS)',
      category: 'Kurumsal' as const,
      url: '/sss',
      description: 'Site yönetimi, aidat takibi ve güvenlik hizmetleri hakkında tüm sorular.',
      icon: 'help'
    },
    {
      title: 'Site Yönetimi Sözlüğü',
      category: 'Kurumsal' as const,
      url: '/sozluk',
      description: 'KMK, işletme projesi, arsa payı ve tesis terimleri tanımları.',
      icon: 'menu_book'
    },
    {
      title: 'Ücretsiz Teklif Al',
      category: 'Kurumsal' as const,
      url: '/teklif-al',
      description: 'Siteniz veya tesisiniz için 48 saatte şeffaf işletme projesi ve teklif.',
      icon: 'request_quote'
    }
  ], []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) & Custom Event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-spotlight-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-spotlight-search', handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 6);
    const q = query.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, searchIndex]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex].url);
    }
  };

  // Google Sitelinks Searchbox JSON-LD
  const sitelinksSearchboxSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://aloyonetim.com.tr',
    name: 'Alo Yönetim',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://aloyonetim.com.tr/arama?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <JsonLd data={sitelinksSearchboxSchema} />

      {/* Search Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Bar */}
            <div className="p-5 border-b border-slate-100 dark:border-white/10 flex items-center gap-3.5 bg-slate-50/50 dark:bg-slate-950/40">
              <span className="material-symbols-outlined text-2xl text-slate-400 dark:text-slate-400">search</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Hizmet, ilçe, KMK maddesi veya hesaplayıcı arayın..."
                className="w-full bg-transparent text-slate-900 dark:text-white text-base md:text-lg placeholder:text-slate-400 focus:outline-none focus:ring-0 border-0 font-medium"
                style={{ outline: 'none', boxShadow: 'none' }}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                title="Kapat (Esc)"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-4 space-y-2 flex-1">
              {filteredResults.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">"{query}" ile ilgili sonuç bulunamadı.</p>
                  <p className="text-xs text-slate-400">
                    Örnek aramalar: <em>Kadıköy, Aidat, Güvenlik, Asansör, KMK 20, GES</em>
                  </p>
                </div>
              ) : (
                filteredResults.map((item, idx) => {
                  const isSelected = selectedIndex === idx;

                  return (
                    <div
                      key={item.url + idx}
                      onClick={() => handleSelect(item.url)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all flex items-start gap-4 ${
                        isSelected
                          ? 'bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100/70 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md font-bold'
                            : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {item.icon}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                              isSelected
                                ? 'bg-slate-200 text-slate-800 dark:bg-white/20 dark:text-white'
                                : 'bg-slate-200/60 text-slate-500 dark:bg-white/5 dark:text-slate-400'
                            }`}
                          >
                            {item.category}
                          </span>
                          <h4 className="text-sm font-bold truncate">{item.title}</h4>
                        </div>
                        <p
                          className={`text-xs line-clamp-1 font-light ${
                            isSelected ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>

                      <span
                        className={`material-symbols-outlined text-sm self-center transition-all ${
                          isSelected ? 'text-slate-900 dark:text-white translate-x-0.5 font-bold' : 'text-slate-400 dark:text-slate-600'
                        }`}
                      >
                        arrow_forward
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Helper */}
            <div className="p-4 bg-slate-100/70 dark:bg-slate-950/90 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-4">
                <span>
                  <kbd className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono font-bold px-1.5 py-0.5 rounded shadow-2xs mr-1">↑↓</kbd> Gezin
                </span>
                <span>
                  <kbd className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono font-bold px-1.5 py-0.5 rounded shadow-2xs mr-1">Enter</kbd> Seç
                </span>
                <span>
                  <kbd className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono font-bold px-1.5 py-0.5 rounded shadow-2xs mr-1">Esc</kbd> Kapat
                </span>
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">manage_search</span>
                <span>Alo Yönetim Akıllı Arama</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
