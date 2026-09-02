'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);

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

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? `<mark class="bg-brand-500/20 text-brand-700 dark:text-brand-300 rounded px-1">${part}</mark>` 
        : part
    ).join('');
  };

  const getCategoryName = (name: string) => {
    const translation = t(`cat_${name}` as Parameters<typeof t>[0]);
    return translation === `cat_${name}` ? name : translation;
  };

  // Faz 164: 4 Dilde Aranabilir ve Filtrelenebilir SSS Motoru
  const filteredFaqs = filterFaqsByLanguage(faqs, searchQuery, activeCategory, lang);

  return (
    <>
      {/* Sticky Header for Search & Filters */}
      <div className="sticky top-20 z-40 bg-[var(--color-background)]/90 backdrop-blur-xl py-6 -mx-4 px-4 md:mx-0 md:px-0 mb-12 border-b border-[var(--color-outline)]/40 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        {/* Search Bar */}
        <div className="relative mb-6 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[var(--color-secondary)]">search</span>
          </div>
          <input 
            type="text" 
            placeholder={t('sss_search_placeholder')}
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(20); }}
            className="w-full pl-14 pr-6 py-4 bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-[var(--color-primary)] text-lg placeholder:text-[var(--color-secondary)]/70"
          />
        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-3 pb-2 snap-x max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setOpenIndex(null); setVisibleCount(20); }}
              className={`snap-center shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.name
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-[1.02]'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)] hover:border-brand-500/50 hover:text-[var(--color-primary)] hover:bg-brand-500/5'
              }`}
            >
              <span className={`material-symbols-outlined text-lg ${activeCategory === cat.name ? 'text-white' : 'text-[var(--color-secondary)]'}`}>
                {categoryIcons[cat.name] || 'label'}
              </span>
              <span>{getCategoryName(cat.name)}</span>
              <span className={`ml-1.5 text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                activeCategory === cat.name 
                  ? 'bg-black/20 text-white' 
                  : 'bg-[var(--color-background)] text-[var(--color-secondary)]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
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
                    id={`faq-button-${faq.id}`}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    className="w-full p-6 md:p-8 text-left flex items-start sm:items-center justify-between gap-6 cursor-pointer group"
                  >
                    <span 
                      className={`font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white group-hover:text-brand-500'}`}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightText(getLocalized(faq, 'question') || '', searchQuery)) }}
                    />
                    
                    {/* Dynamic Icon */}
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-brand-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-brand-500/10 group-hover:text-brand-500'
                    }`}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {isOpen ? 'remove' : 'add'}
                      </span>
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
