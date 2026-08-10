'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import DOMPurify from 'isomorphic-dompurify';
import { useLanguage } from '@/context/LanguageContext';

export default function FaqClient({ 
  faqs, 
  categories,
  lang
}: { 
  faqs: any[], 
  categories: string[],
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
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);

  // Filtreleme mantığı
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'Tümü' || faq.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    
    const q = getLocalized(faq, 'question') || '';
    const a = getLocalized(faq, 'answer') || '';
    
    const matchesSearch = 
      q.toLowerCase().includes(searchLower) || 
      a.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search Bar */}
      <div className="relative mb-12 max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-slate-400">search</span>
        </div>
        <input 
          type="text" 
          placeholder={t('sss_search_placeholder')}
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(20); }}
          className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white text-lg placeholder-slate-400"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIndex(null); setVisibleCount(20); }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 scale-105'
                : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-brand-500 hover:text-brand-500'
            }`}
          >
            {t(`cat_${cat}`) || cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="flex flex-col gap-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <span className="material-symbols-outlined text-5xl mb-4 opacity-50">search_off</span>
            <p className="text-lg">{t('sss_not_found')}</p>
          </div>
        ) : (
          <>
            {filteredFaqs.slice(0, visibleCount).map((faq) => {
              const isOpen = openIndex === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`bg-white dark:bg-slate-900 border rounded-3xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-brand-500 shadow-lg shadow-brand-500/5' : 'border-slate-200 dark:border-white/10 hover:border-brand-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                    className="w-full p-6 md:p-8 text-left flex items-start sm:items-center justify-between gap-6 cursor-pointer group"
                  >
                    <span className={`font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white group-hover:text-brand-500'}`}>
                      {getLocalized(faq, 'question')}
                    </span>
                    
                    {/* Dynamic Icon */}
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-brand-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-brand-500/10 group-hover:text-brand-500'
                    }`}>
                      <span className="material-symbols-outlined">
                        {isOpen ? 'remove' : 'add'}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div 
                          className="px-6 md:px-8 pb-8 prose prose-slate prose-lg max-w-none text-slate-700 dark:text-slate-300 prose-a:text-brand-500 prose-p:leading-relaxed border-t border-slate-100 dark:border-white/5 pt-6"
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getLocalized(faq, 'answer') || '') }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            {filteredFaqs.length > visibleCount && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 20)}
                  className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-brand-500 text-slate-700 dark:text-slate-200 rounded-full shadow-sm hover:shadow-md transition-all font-semibold flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
                  {t('sss_load_more')}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA Banner */}
      <div className="mt-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-brand-950 dark:to-slate-900 text-white p-10 md:p-14 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{t('sss_cta_title')}</h3>
          <p className="text-slate-300 font-light text-lg max-w-xl">
            {t('sss_cta_desc')}
          </p>
        </div>
        <Link 
          href={`/${lang}/iletisim`} 
          className="relative z-10 bg-white text-slate-900 font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-xl transition-all shrink-0"
        >
          {t('sss_cta_btn')}
        </Link>
      </div>
    </>
  );
}
