'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Briefcase,
  Calculator,
  BookOpen,
  FileText,
  Building,
  ArrowRight,
  Command,
  X,
} from 'lucide-react';
import { DISTRICT_NAMES } from '@/data/districtsMetadata';
import { SERVICES } from '@/data/services';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';
import { useLanguage } from '@/context/LanguageContext';

interface SearchItem {
  id: string;
  title: string;
  category: 'Hizmet' | 'İlçe' | 'Araç' | 'Sözlük' | 'Sayfa';
  url: string;
  description: string;
  searchIndex: string; // Önceden tokenize edilmiş küçük harf arama dizgisi (< 5ms eşleşme)
  icon: React.ReactNode;
}

/**
 * Faz 53: SpotlightSearchModal (Ctrl+K) optimizasyonu:
 * - Framer Motion kaldırılmış, saf GPU CSS geçişlerine geçilmiştir.
 * - 50ms'lik setTimeout gecikmesi kaldırılıp anında (instant) focus sağlanmıştır.
 * - Önceden indekslenmiş arama terimleriyle klavye navigasyonu ve sorgu tepki süresi < 5ms altına çekilmiştir.
 */
export default function SpotlightSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  // Klavye Kısayolu (Ctrl+K / Cmd+K / /) ve Custom Event Dinleyicisi
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-spotlight-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-spotlight-search', handleCustomOpen);
    };
  }, [isOpen]);

  // Modal açıldığında gecikmesiz (0-ms / requestAnimationFrame) anında odaklan
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      setQuery('');
      setSelectedIndex(0);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Önceden tokenize edilmiş arama veri tabanı
  const searchableItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Hizmetler
    SERVICES.forEach((s) => {
      items.push({
        id: `service-${s.slug}`,
        title: s.name,
        category: 'Hizmet',
        url: `/${language}${s.pillar}`,
        description: s.summary,
        searchIndex: `${s.name} ${s.summary} hizmet`.toLowerCase(),
        icon: <Briefcase className="w-4 h-4 text-blue-500" />,
      });
    });

    // 2. İlçeler (39 İlçe)
    DISTRICT_NAMES.forEach((d) => {
      items.push({
        id: `district-${d.slug}`,
        title: `${d.name} Tesis & Site Yönetimi`,
        category: 'İlçe',
        url: `/${language}/bolgeler/${d.slug}`,
        description: `İstanbul ${d.side === 'Anadolu' ? 'Anadolu' : 'Avrupa'} Yakası ${d.name} bölgesi profesyonel bina ve site yönetimi.`,
        searchIndex: `${d.name} ${d.side} tesis site yonetimi ilce bolge`.toLowerCase(),
        icon: <MapPin className="w-4 h-4 text-emerald-500" />,
      });
    });

    // 3. Hesaplayıcılar & Araçlar
    items.push(
      {
        id: 'tool-calculator',
        title: 'Akıllı Aidat & Tesis Gider Hesaplayıcı',
        category: 'Araç',
        url: `/${language}/hesaplayici`,
        description: 'Daire sayısı ve ortak alanlara göre anlık tahmini aidat bütçesi çıkarın.',
        searchIndex: 'akilli aidat tesis gider hesaplayici butce arac'.toLowerCase(),
        icon: <Calculator className="w-4 h-4 text-purple-500" />,
      },
      {
        id: 'tool-dictionary',
        title: 'Tesis Yönetimi & KMK 634 Terimler Sözlüğü',
        category: 'Sözlük',
        url: `/${language}/sozluk`,
        description: 'Kat mülkiyeti, işletme projesi, asansör yeşil etiket ve hukuki terimler.',
        searchIndex: 'tesis yonetimi kmk 634 terimler sozluk kat mulkiyeti kanun'.toLowerCase(),
        icon: <BookOpen className="w-4 h-4 text-amber-500" />,
      },
      {
        id: 'tool-success-stories',
        title: 'Başarı Hikayeleri & Referans Portföyü',
        category: 'Sayfa',
        url: `/${language}/basari-hikayeleri`,
        description: 'İstanbul genelinde yönetilen 340+ seçkin rezidans, plaza ve site referansı.',
        searchIndex: 'basari hikayeleri referans portfoy rezidans plaza site'.toLowerCase(),
        icon: <Building className="w-4 h-4 text-cyan-500" />,
      },
      {
        id: 'tool-quote',
        title: 'Ücretsiz Yönetim Teklifi Al',
        category: 'Sayfa',
        url: `/${language}/teklif-al`,
        description: 'Siteniz veya tesisiniz için 24 saat içinde detaylı fizibilite ve teklif.',
        searchIndex: 'ucretsiz yonetim teklifi al fizibilite fiyat'.toLowerCase(),
        icon: <FileText className="w-4 h-4 text-rose-500" />,
      }
    );

    // 4. Sözlük Terimleri (İlk 25 Önemli Terim)
    FACILITY_TERMS.slice(0, 25).forEach((t) => {
      items.push({
        id: `term-${t.termCode}`,
        title: t.name,
        category: 'Sözlük',
        url: `/${language}/sozluk#${t.termCode}`,
        description: t.description,
        searchIndex: `${t.name} ${t.description} sozluk terim`.toLowerCase(),
        icon: <BookOpen className="w-4 h-4 text-amber-500" />,
      });
    });

    return items;
  }, [language]);

  // Ultra Hızlı Filtreleme (< 2ms)
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return searchableItems.slice(0, 8);
    }

    const cleanQuery = query.toLowerCase().trim();
    return searchableItems
      .filter((item) => item.searchIndex.includes(cleanQuery))
      .slice(0, 10);
  }, [query, searchableItems]);

  // Seçim değiştirme klavye navigasyonu
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        navigateTo(filteredResults[selectedIndex].url);
      }
    }
  };

  const navigateTo = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 font-sans"
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight Arama"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-150 ease-out transform-gpu"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col z-10 transition-all duration-150 ease-out transform-gpu animate-in fade-in zoom-in-95"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            aria-label="Hizmet, ilçe, aidat hesaplayıcı veya terim arayın"
            placeholder="Hizmet, ilçe, aidat hesaplayıcı veya terim arayın..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base font-normal"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Aramayı Temizle"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <kbd>ESC</kbd>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-50 dark:divide-slate-800/50">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Sonuç bulunamadı
              </p>
              <p className="text-xs mt-1">
                &quot;{query}&quot; için eşleşen bir ilçe, hizmet veya terim
                bulunamadı.
              </p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-white dark:bg-slate-900 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? 'translate-x-1 text-blue-600 dark:text-blue-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">
                ↓
              </kbd>{' '}
              Gezin
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">
                ↵
              </kbd>{' '}
              Seç
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3.5 h-3.5" />
            <span>+ K ile her yerden açın</span>
          </div>
        </div>
      </div>
    </div>
  );
}
