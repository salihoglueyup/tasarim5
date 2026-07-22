"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-6 text-left font-bold text-lg text-slate-900 dark:text-white"
            >
              <span>{item.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="material-symbols-outlined text-blue-600 shrink-0 ml-4"
              >
                expand_more
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-6 pt-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light border-t border-slate-100 dark:border-white/5">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
