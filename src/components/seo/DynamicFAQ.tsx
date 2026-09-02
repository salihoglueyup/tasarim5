"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JsonLd from './JsonLd';
import { faqPageSchema } from '@/lib/schemas';

interface FAQItem {
  question: string;
  answer: string;
}

interface DynamicFAQProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

/**
 * SEO Faz 11: Zengin Arama Sonuçları için Dinamik FAQ
 * Görsel olarak erişilebilir (a11y) bir akordeon sunarken,
 * arka planda Google'a otomatik olarak FAQPage JSON-LD şemasını basar.
 */
export default function DynamicFAQ({ faqs, title, className = '' }: DynamicFAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* Google FAQPage JSON-LD Injection */}
      <JsonLd data={faqPageSchema(faqs)} />

      {title && (
        <h3 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">
          {title}
        </h3>
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div 
              key={index}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-shadow hover:shadow-md"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() => setActiveIndex(isActive ? null : index)}
                aria-expanded={isActive}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-left text-slate-800 dark:text-slate-100">
                  {faq.question}
                </span>
                <span className="ml-4 flex-shrink-0 text-slate-400">
                  <svg
                    width="20"
                    height="20"
                    aria-hidden="true"
                    className={`w-5 h-5 transform transition-transform duration-300 ${isActive ? 'rotate-180 text-blue-500' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
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
  );
}
