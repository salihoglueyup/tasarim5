'use client';

import { useState, useMemo, useTransition } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';
import { faqPageSchema } from '@/lib/schemas';
import { Search, X, MessageCircle, HelpCircle, Check, Copy, Sparkles } from 'lucide-react';
import { waLink } from '@/lib/cro';

export interface FaqItem {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
  category?: string;
  [key: string]: any;
}

const FAQ_CATEGORIES = [
  { id: 'all', label: 'Tüm Sorular', icon: 'apps' },
  { id: 'tesis', label: 'Tesis & Site Yönetimi', icon: 'domain' },
  { id: 'aidat', label: 'Aidat & İcra Takibi', icon: 'account_balance_wallet' },
  { id: 'guvenlik', label: '5188 Güvenlik', icon: 'shield' },
  { id: 'teknik', label: 'Teknik & Asansör', icon: 'engineering' },
  { id: 'hukuk', label: 'KMK 634 & Hukuk', icon: 'gavel' },
];

export default function Faq({
  dbFaqs,
  lang = 'tr',
}: {
  dbFaqs?: FaqItem[];
  lang?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const { t } = useLanguage();

  const fallbackFaqs: FaqItem[] = useMemo(
    () => [
      {
        question: t('home_faq_1_q'),
        answer: t('home_faq_1_a'),
        category: 'tesis',
      },
      {
        question: t('home_faq_2_q'),
        answer: t('home_faq_2_a'),
        category: 'guvenlik',
      },
      {
        question: t('home_faq_3_q'),
        answer: t('home_faq_3_a'),
        category: 'aidat',
      },
      {
        question: t('home_faq_4_q'),
        answer: t('home_faq_4_a'),
        category: 'teknik',
      },
      {
        question: t('home_faq_5_q'),
        answer: t('home_faq_5_a'),
        category: 'hukuk',
      },
      {
        question: 'Site veya apartman aidatı ödenmezse yasal gecikme faizi ne kadardır?',
        answer:
          'Kat Mülkiyeti Kanunu Madde 20 uyarınca ödenmeyen aidat ve avans borçları için aylık %5 yasal gecikme tazminatı uygulanır. Alo Yönetim hukuk departmanı geciken aidatlar için 2. ihtardan sonra doğrudan icra takibi başlatır.',
        category: 'aidat',
      },
      {
        question: 'Asansör periyodik kontrollerinde yeşil etiket almak zorunlu mudur?',
        answer:
          'Evet, Sanayi ve Teknoloji Bakanlığı Asansör Yönetmeliği gereğince yılda bir kez A tipi akredite muayene kuruluşunca kontrol yapılır. Yeşil etiket can ve mal güvenliğinin tam olduğunu gösterir; kırmızı etiketli asansörler mühürlenir.',
        category: 'teknik',
      },
      {
        question: 'Sitelerde özel güvenlik kimliği olmadan nöbetçi veya bekçi çalıştırılabilir mi?',
        answer:
          '5188 Sayılı Özel Güvenlik Kanunu kapsamında üniformalı ve yetkili güvenlik hizmeti verilebilmesi için Valilik Özel Güvenlik İzni (ÖGİ) ve sertifikalı personel gereklidir. Aksi takdirde site yönetimi ağır idari para cezalarıyla karşılaşabilir.',
        category: 'guvenlik',
      },
    ],
    [t]
  );

  const rawFaqs = dbFaqs && dbFaqs.length > 0 ? dbFaqs : fallbackFaqs;

  // Filtreleme mantığı
  const filteredFaqs = useMemo(() => {
    return rawFaqs.filter((faq) => {
      const q = (faq[`question_${lang}`] || faq.question || faq.q || '').toLowerCase();
      const a = (faq[`answer_${lang}`] || faq.answer || faq.a || '').toLowerCase();
      const cleanSearch = searchQuery.toLowerCase().trim();

      // Kategori kontrolü
      if (activeCategory !== 'all') {
        const cat = (faq.category || '').toLowerCase();
        // Otomatik kategori tahmini
        const matchesCategory =
          cat === activeCategory ||
          (activeCategory === 'aidat' && (q.includes('aidat') || q.includes('icra') || q.includes('tazminat'))) ||
          (activeCategory === 'guvenlik' && (q.includes('güvenlik') || q.includes('5188') || q.includes('kamera'))) ||
          (activeCategory === 'teknik' && (q.includes('asansör') || q.includes('bakım') || q.includes('teknik') || q.includes('jeneratör'))) ||
          (activeCategory === 'hukuk' && (q.includes('kmk') || q.includes('hukuk') || q.includes('mahkeme') || q.includes('genel kurul'))) ||
          (activeCategory === 'tesis' && (q.includes('tesis') || q.includes('site') || q.includes('yönetici')));

        if (!matchesCategory) return false;
      }

      // Arama filtresi
      if (cleanSearch) {
        return q.includes(cleanSearch) || a.includes(cleanSearch);
      }

      return true;
    });
  }, [rawFaqs, activeCategory, searchQuery, lang]);

  const jsonLd = faqPageSchema(
    rawFaqs.map((f: any) => ({
      question: f[`question_${lang}`] || f.question || f.q,
      answer: f[`answer_${lang}`] || f.answer || f.a,
    }))
  );

  const toggleFaq = (index: number) => {
    startTransition(() => {
      setActiveIndex((prev) => (prev === index ? null : index));
    });
  };

  const copyQuestionLink = (text: string, index: number) => {
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const url = `${window.location.origin}${window.location.pathname}#faq-${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(`faq-${index}`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const waHref = waLink(
    'Merhaba, Alo Yönetim SSS bölümünü inceliyordum. Bir konuda detaylı bilgi almak istiyorum.'
  );

  return (
    <section className="py-24 md:py-32 px-[var(--spacing-gutter)] bg-[var(--color-background)]">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>SIKÇA SORULAN SORULAR</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-primary)] mb-4">
            {t('home_faq_title')}
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] font-light max-w-2xl mx-auto">
            {t('home_faq_desc')}
          </p>
        </div>

        {/* 1. Canlı Arama Çubuğu */}
        <div className="relative mb-6">
          <div className="flex items-center px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                const val = e.target.value;
                setSearchInput(val);
                startTransition(() => {
                  setSearchQuery(val);
                });
              }}
              placeholder="Sorularda veya yanıtlarda anında arama yapın (örn: aidat, asansör, güvenlik)..."
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm md:text-base font-normal"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  startTransition(() => {
                    setSearchQuery('');
                  });
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label="Aramayı temizle"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Kategori Filtreleme Sekmeleri */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  startTransition(() => {
                    setActiveCategory(cat.id);
                    setActiveIndex(null);
                  });
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3. Soru Listesi & Akordeon */}
        <div className="flex flex-col border-t border-[var(--color-outline)] divide-y divide-[var(--color-outline)]">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Aradığınız kriterlere uygun soru bulunamadı
              </p>
              <p className="text-xs mt-1">
                Farklı bir anahtar kelime deneyebilir veya aşağıdaki butondan doğrudan bize danışabilirsiniz.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isActive = activeIndex === index;
              const qText = faq[`question_${lang}`] || faq.question || faq.q;
              const aText = faq[`answer_${lang}`] || faq.answer || faq.a;
              const isCopied = copiedId === `faq-${index}`;

              return (
                <div key={index} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span
                      className={`text-lg md:text-xl font-medium transition-colors pr-4 ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]'
                      }`}
                    >
                      {qText}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full border border-[var(--color-outline)] flex items-center justify-center flex-shrink-0 ml-2 group-hover:bg-[var(--color-surface)] transition-transform duration-300 ${
                        isActive ? 'rotate-45' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-[var(--color-primary)] text-xl" aria-hidden="true">
                        add
                      </span>
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pr-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base font-normal">
                        <div dangerouslySetInnerHTML={{ __html: aText }} />

                        {/* Soru Paylaş / Kopyala Butonu */}
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyQuestionLink(qText, index)}
                            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-500 font-medium">
                                  Bağlantı Kopyalandı
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Sorunun Linkini Kopyala</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 4. WhatsApp / Danışman Destek Rozeti */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 justify-center sm:justify-start">
                <span>Sorunuza Yanıt Bulamadınız mı?</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Kat Mülkiyeti Kanunu ve tesis yönetimi uzmanlarımıza anında WhatsApp üzerinden danışın.
              </p>
            </div>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-all shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp ile Danışın</span>
          </a>
        </div>
      </div>
    </section>
  );
}
