"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('home_faq_1_q'),
      answer: t('home_faq_1_a')
    },
    {
      question: t('home_faq_2_q'),
      answer: t('home_faq_2_a')
    },
    {
      question: t('home_faq_3_q'),
      answer: t('home_faq_3_a')
    },
    {
      question: t('home_faq_4_q'),
      answer: t('home_faq_4_a')
    },
    {
      question: t('home_faq_5_q'),
      answer: t('home_faq_5_a')
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-32 px-[var(--spacing-gutter)] bg-[var(--color-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-primary)] mb-4">
            {t('home_faq_title')}
          </h2>
          <p className="text-xl text-[var(--color-secondary)] font-light">
            {t('home_faq_desc')}
          </p>
        </div>

        <div className="flex flex-col border-t border-[var(--color-outline)]">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div key={index} className="border-b border-[var(--color-outline)] overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`text-xl md:text-2xl font-medium transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]'}`}>
                    {faq.question}
                  </span>
                  <motion.div 
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full border border-[var(--color-outline)] flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-[var(--color-surface)]"
                  >
                    <span className="material-symbols-outlined text-[var(--color-primary)]">add</span>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pb-8 pr-12 text-[var(--color-secondary)] leading-relaxed text-lg font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
