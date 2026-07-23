"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function SSS() {
  const { t } = useLanguage();

  const categories = [
    t('faq_cat_all'), 
    t('faq_cat_finance'), 
    t('faq_cat_security'), 
    t('faq_cat_transfer'), 
    t('faq_cat_tech')
  ];

  const faqs = [
    {
      category: t('faq_cat_finance'),
      question: t('faq_1_q'),
      answer: t('faq_1_a')
    },
    {
      category: t('faq_cat_transfer'),
      question: t('faq_2_q'),
      answer: t('faq_2_a')
    },
    {
      category: t('faq_cat_security'),
      question: t('faq_3_q'),
      answer: t('faq_3_a')
    },
    {
      category: t('faq_cat_tech'),
      question: t('faq_4_q'),
      answer: t('faq_4_a')
    },
    {
      category: t('faq_cat_finance'),
      question: t('faq_5_q'),
      answer: t('faq_5_a')
    }
  ];

  const [activeCategory, setActiveCategory] = useState(t('faq_cat_all'));
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = activeCategory === t('faq_cat_all') 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader 
        title={t('faq_page_title')} 
        description={t('faq_page_desc')} 
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-3xl overflow-hidden transition-colors hover:border-[var(--color-primary)]/50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-8 text-left flex items-center justify-between gap-4 font-bold text-xl text-[var(--color-primary)] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                    expand_more
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-lg text-[var(--color-secondary)] font-light leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 to-[#122338] text-white p-10 md:p-14 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('faq_cta_title')}</h3>
            <p className="text-gray-300 font-light">{t('faq_cta_desc')}</p>
          </div>
          <Link 
            href="/iletisim" 
            className="bg-white text-[var(--color-primary)] font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shrink-0"
          >
            {t('faq_cta_btn')}
          </Link>
        </div>

      </section>
    </>
  );
}
