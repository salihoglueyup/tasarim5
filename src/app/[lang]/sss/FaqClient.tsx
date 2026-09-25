'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Copy, Check, ChevronDown, Sparkles } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { useLanguage } from '@/context/LanguageContext';
import { ServiceAuthorityHubSeo } from '@/components/seo';

/**
 * Faz 164: 4 Dilde SSS Arama ve Filtreleme Motoru
 */
export function filterFaqsByLanguage(
  faqs: any[],
  query: string,
  category: string,
  lang: string = 'tr'
): any[] {
  const getLocalized = (item: any, field: string) => {
    if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`];
    if (lang === 'ru' && item[`${field}_ru`]) return item[`${field}_ru`];
    if (lang === 'ar' && item[`${field}_ar`]) return item[`${field}_ar`];
    return item[field];
  };

  const searchLower = (query || '').toLowerCase().trim();
  const isAll =
    !category ||
    category === 'Tümü' ||
    category === 'all' ||
    category === 'All' ||
    category === 'Все' ||
    category === 'الكل';

  return faqs.filter((faq) => {
    const matchesCategory = isAll || faq.category === category;
    if (!matchesCategory) return false;

    if (!searchLower) return true;

    const q = (getLocalized(faq, 'question') || '').toLowerCase();
    const a = (getLocalized(faq, 'answer') || '').toLowerCase();

    return q.includes(searchLower) || a.includes(searchLower);
  });
}

export default function FaqClient({ 
  faqs, 
  categories,
  lang
}: { 
  faqs: any[], 
  categories: { name: string; count: number }[],
  lang: string
}) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Tümü');
  
  const getLocalized = (item: any, field: string) => {
    if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`];
    if (lang === 'ru' && item[`${field}_ru`]) return item[`${field}_ru`];
    if (lang === 'ar' && item[`${field}_ar`]) return item[`${field}_ar`];
    return item[field];
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(20);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryIcons: Record<string, string> = {
    'Tümü': 'apps',
    'Finans': 'account_balance',
    'Güvenlik': 'security',
    'Hukuk': 'gavel',
    'Teknik': 'engineering',
    'Temizlik': 'cleaning_services',
    'Yönetim': 'admin_panel_settings',
    'Tesis Yönetimi': 'apartment',
    'Aidat Takibi': 'receipt_long',
    'Havuz Bakımı': 'pool',
    'Peyzaj ve Bahçe': 'park',
    'Haşere Kontrolü': 'bug_report',
  };

  const POPULAR_CHIPS = [
    { label: 'Aidat İcra', query: 'icra' },
    { label: 'Yönetici Seçimi', query: 'seçim' },
    { label: 'Asansör Kırmızı Etiket', query: 'asansör' },
    { label: 'Balkon Kapatma', query: 'balkon' },
    { label: 'Yönetim Planı', query: 'yönetim planı' },
    { label: 'Ortak Giderler', query: 'ortak gider' },
  ];

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? `<mark class="bg-amber-500/20 text-amber-800 dark:text-amber-300 rounded px-1 font-bold">${part}</mark>` 
        : part
    ).join('');
  };

  const getCategoryName = (name: string) => {
    const translation = t(`cat_${name}` as Parameters<typeof t>[0]);
    return translation === `cat_${name}` ? name : translation;
  };

  const toggleAccordion = (id: string) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopyAnswer = (e: React.MouseEvent, question: string, answerHtml: string, id: string) => {
    e.stopPropagation();
    const cleanAnswer = answerHtml.replace(/<[^>]+>/g, '').trim();
    navigator.clipboard.writeText(`${question}\n\n${cleanAnswer}\n\nKaynak: Alo Yönetim KMK 634 Rehberi (https://aloyonetim.com.tr/sss)`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Faz 164: 4 Dilde Aranabilir ve Filtrelenebilir SSS Motoru
  const filteredFaqs = filterFaqsByLanguage(faqs, searchQuery, activeCategory, lang);
  const visibleFaqs = filteredFaqs.slice(0, visibleCount);

  const areAllOpen = visibleFaqs.length > 0 && visibleFaqs.every((f) => openIndices.has(f.id));

  const toggleAll = () => {
    if (areAllOpen) {
      setOpenIndices(new Set());
    } else {
      setOpenIndices(new Set(visibleFaqs.map((f) => f.id)));
    }
  };

  return (
    <div className="space-y-16 md:space-y-20">
      {/* 2 KOLONLU MODERN BİLGİ BANKASI DÜZENİ */}
      <div className="relative">
        
        {/* MOBİL GÖRÜNÜM: Arama Konsolu & Yatay Kategori Slider (< lg) */}
        <div className="lg:hidden mb-8 space-y-4">
          {/* Mobil Arama Çubuğu */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <input 
              type="text" 
              placeholder={t('sss_search_placeholder') || 'Sorunuzu arayın (Örn: Aidat, İcra, Asansör)...'}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(20); }}
              className="w-full pl-12 pr-11 py-3.5 bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
                aria-label="Aramayı Temizle"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobil Popüler Çipler */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <span className="text-slate-600 dark:text-slate-400 shrink-0 font-semibold flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Popüler:
            </span>
            {POPULAR_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => { setSearchQuery(chip.query); setVisibleCount(20); }}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-[var(--color-surface)] dark:bg-[#15161E] hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400 text-slate-600 dark:text-slate-300 transition-colors text-[11px] font-medium border border-[var(--color-outline)]/60 dark:border-white/10 shadow-2xs"
              >
                #{chip.label}
              </button>
            ))}
          </div>

          {/* Mobil Kategori Şeridi (Yumuşak Yatay Kaydırma) */}
          <div className="relative">
            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-2 py-1 snap-x">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => { setActiveCategory(cat.name); setOpenIndices(new Set()); setVisibleCount(20); }}
                    className={`snap-center shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                        : 'bg-[var(--color-surface)] dark:bg-[#15161E] text-slate-600 dark:text-slate-300 border border-[var(--color-outline)]/80 dark:border-white/10 hover:border-amber-500/50'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-sm ${isActive ? 'text-amber-400 dark:text-amber-600' : 'text-slate-400'}`}>
                      {categoryIcons[cat.name] || 'label'}
                    </span>
                    <span>{getCategoryName(cat.name)}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 dark:bg-white/10 text-slate-500'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 12 SÜTUNLU MASAÜSTÜ GRID */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
          
          {/* SOL KOLON - lg:col-span-4 (Sticky / Sabit Gezinti Paneli) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
            
            {/* 1. Kategori Gezgini */}
            <div className="bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[var(--color-outline)]/60 dark:border-white/10">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-amber-500">category</span>
                  Konu Başlıkları
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {faqs.length} Soru
                </span>
              </div>

              <div className="flex flex-col gap-1.5 max-h-[420px] overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => { setActiveCategory(cat.name); setOpenIndices(new Set()); setVisibleCount(20); }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm font-bold scale-[1.01]'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-amber-600 dark:hover:text-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`material-symbols-outlined text-base shrink-0 ${isActive ? 'text-amber-400 dark:text-amber-600' : 'text-slate-400'}`}>
                          {categoryIcons[cat.name] || 'label'}
                        </span>
                        <span className="truncate">{getCategoryName(cat.name)}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                        isActive
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Trend Hukuki Etiketler */}
            <div className="bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-3xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Popüler KMK Aramaları
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => { setSearchQuery(chip.query); setVisibleCount(20); }}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400 text-slate-600 dark:text-slate-300 text-[11px] font-medium border border-[var(--color-outline)]/60 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    #{chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hızlı Danışma & Destek Kartı */}
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">support_agent</span>
                Hukuki Danışmanlık
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Apartmanınız veya siteniz için özel yönetim planı ve bütçe danışmanlığına mı ihtiyacınız var?
              </p>
              <a
                href={lang === 'tr' ? '/iletisim' : `/${lang}/iletisim`}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs transition-colors shadow-xs"
              >
                <span>Uzmanımıza Danışın</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </aside>

          {/* SAĞ KOLON - lg:col-span-8 (Arama Konsolu + Akordiyon Akışı) */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Masaüstü Arama Konsolu (Sticky) */}
            <div className="hidden lg:block sticky top-20 z-20 bg-[var(--color-background)]/90 backdrop-blur-xl py-3 -mx-2 px-2 border-b border-[var(--color-outline)]/40 mb-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input 
                  type="text" 
                  placeholder={t('sss_search_placeholder') || 'Sorunuzu arayın (Örn: Aidat, İcra, Asansör, Yönetici Seçimi)...'}
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(20); }}
                  className="w-full pl-12 pr-12 py-3.5 bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-white text-sm md:text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 cursor-pointer"
                    aria-label="Aramayı Temizle"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Sonuç Sayacı & Tümünü Aç/Kapat Butonları */}
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-3 px-1">
                <div className="flex items-center gap-2">
                  <span>
                    Toplam <strong>{filteredFaqs.length}</strong> soru listeleniyor
                    {searchQuery && ` ("${searchQuery}" için)`}
                  </span>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-amber-600 dark:text-amber-400 hover:underline font-semibold ml-1 cursor-pointer"
                    >
                      Temizle
                    </button>
                  )}
                </div>

                {visibleFaqs.length > 0 && (
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {areAllOpen ? 'unfold_less' : 'unfold_more'}
                    </span>
                    <span>{areAllOpen ? 'Tümünü Kapat' : 'Tümünü Aç'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Soru Listesi (Akordiyon) */}
            <div className="flex flex-col gap-3.5">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-16 px-6 rounded-3xl bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 text-slate-500">
                  <span className="material-symbols-outlined text-5xl mb-3 text-slate-400 opacity-60" aria-hidden="true">search_off</span>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{t('sss_not_found') || 'Aradığınız kriterlere uygun soru bulunamadı.'}</p>
                  <p className="text-sm text-slate-500 mt-1">Farklı bir anahtar kelime deneyebilir veya doğrudan uzmanımıza danışabilirsiniz.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('Tümü'); }}
                    className="mt-4 px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-bold cursor-pointer"
                  >
                    Tüm Soruları Göster
                  </button>
                </div>
              ) : (
                <>
                  {visibleFaqs.map((faq) => {
                    const isOpen = openIndices.has(faq.id);
                    const questionText = getLocalized(faq, 'question') || '';
                    const answerHtml = getLocalized(faq, 'answer') || '';
                    const isCopied = copiedId === faq.id;

                    return (
                      <div 
                        key={faq.id}
                        className={`bg-[var(--color-surface)] dark:bg-[#15161E] border rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-200 ${
                          isOpen 
                            ? 'border-amber-500/60 dark:border-amber-400/60 shadow-sm ring-1 ring-amber-500/15' 
                            : 'border-[var(--color-outline)]/80 dark:border-white/10 hover:border-amber-500/40 dark:hover:border-amber-500/40 shadow-2xs hover:shadow-xs'
                        }`}
                      >
                        <button
                          id={`faq-button-${faq.id}`}
                          type="button"
                          onClick={() => toggleAccordion(faq.id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${faq.id}`}
                          className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer group"
                        >
                          <div className="flex items-start sm:items-center gap-3.5">
                            <span className={`w-1.5 h-6 rounded-full transition-colors shrink-0 mt-0.5 sm:mt-0 ${isOpen ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-amber-500'}`} />
                            <div className="space-y-1">
                              {/* Kategori Önizleme Rozeti */}
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                                  {faq.category || 'Mevzuat'}
                                </span>
                              </div>
                              <h3 
                                className={`font-bold text-base sm:text-lg transition-colors ${isOpen ? 'text-slate-900 dark:text-white' : 'text-[var(--color-heading-text)] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400'}`}
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightText(questionText, searchQuery)) }}
                              />
                            </div>
                          </div>
                          
                          {/* Dinamik Ok İkonu */}
                          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isOpen ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 rotate-180' : 'bg-slate-100 dark:bg-white/5 text-slate-500 group-hover:bg-amber-500/10 group-hover:text-amber-600'
                          }`}>
                            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              id={`faq-panel-${faq.id}`}
                              role="region"
                              aria-labelledby={`faq-button-${faq.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-6 md:px-8 pb-6 pt-2 border-t border-[var(--color-outline)]/40 dark:border-white/5 space-y-4">
                                <div 
                                  className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base space-y-2 [&_strong]:text-slate-900 dark:[&_strong]:text-white [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1"
                                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answerHtml) }}
                                />

                                {/* Soru İçi Bilgi & Kopyalama Barı */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/5 text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold text-[11px] border border-amber-500/20">
                                      {faq.category || 'Mevzuat'}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                                      <span className="material-symbols-outlined text-xs" aria-hidden="true">verified</span>
                                      634 Sayılı KMK Doğrulandı
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={(e) => handleCopyAnswer(e, questionText, answerHtml, faq.id)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                                    title="Cevabı panoya kopyala"
                                  >
                                    {isCopied ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">Kopyalandı!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Cevabı Kopyala</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  
                  {filteredFaqs.length > visibleCount && (
                    <div className="flex justify-center mt-6">
                      <button 
                        onClick={() => setVisibleCount(prev => prev + 20)}
                        className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                      >
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        <span>{t('sss_load_more') || 'Daha Fazla Soru Yükle'}</span>
                        <span className="text-xs opacity-75 font-normal">
                          ({visibleCount} / {filteredFaqs.length})
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>

        </div>
      </div>

      {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
      <ServiceAuthorityHubSeo
        serviceName="Tesis ve Site Yönetimi Soru & Cevap Bankası"
        serviceCategory="Mevzuat & Bilgi Bankası"
        lawReferences={[
          {
            title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK) — Resmi Metin",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
            badge: "KMK 634",
            description: "Site yöneticisinin görevleri, kat malikleri kurulu toplantı nisapları, işletme projeleri ve aidat gecikme faizi kanun maddeleri."
          },
          {
            title: "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun",
            sourceName: "T.C. İçişleri Bakanlığı EGM",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5",
            badge: "5188 Sayılı Kanun",
            description: "Sitelerde fiziki güvenlik personeli istihdamı, valilik güvenlik izinleri ve kamera izleme yasal prosedürleri."
          },
          {
            title: "2004 Sayılı İcra ve İflas Kanunu (İİK)",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=2004&MevzuatTur=1&MevzuatTertip=5",
            badge: "İİK 2004",
            description: "Ödenmeyen ortak gider borçlarının ilamsız icra yoluyla tahsili ve itirazın kaldırılması süreçleri."
          }
        ]}
        glossaryTerms={[
          {
            slug: "kat-mulkiyeti-kanunu-kmk",
            term: "Kat Mülkiyeti Kanunu (KMK)",
            summary: "Toplu yaşam alanlarında malik ve kiracıların haklarını, ortak alan kullanımını düzenleyen ana kanundur."
          },
          {
            slug: "aidat",
            term: "Aidat Borcu ve Dağıtımı",
            summary: "Apartman ve sitelerde ortak giderlerin paylaştırılması ve ödenmesi zorunlu katkı payıdır."
          },
          {
            slug: "gecikme-tazminati-5-yasal-faiz",
            term: "%5 Yasal Gecikme Faizi",
            summary: "Gününde ödenmeyen aidatlara KMK m.20/2 uyarınca işletilen aylık %5 gecikme tazminatıdır."
          },
          {
            slug: "isletme-projesi",
            term: "İşletme Projesi Nedir?",
            summary: "Sitenin 1 yıllık tahmini bütçesi ve her daireye düşen aylık avans payını gösteren resmi projedir."
          }
        ]}
      />
    </div>
  );
}
