"use client";

import React, { useState, useId } from 'react';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * Faz 60: Accordion primitifinin Framer Motion'dan arındırılarak
 * saf CSS `grid-template-rows: 0fr -> 1fr` donanım hızlandırmalı geçiş modeline taşınması.
 */
export const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const headerId = `${baseId}-header-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <div
            key={idx}
            className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl overflow-hidden shadow-sm transition-all"
          >
            <button
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-6 text-left font-bold text-lg text-slate-900 dark:text-white cursor-pointer"
            >
              <span>{item.title}</span>
              <span
                className={`material-symbols-outlined text-slate-900 dark:text-white shrink-0 ml-4 transition-transform duration-300 transform-gpu ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                expand_more
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out transform-gpu ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-6 pt-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light border-t border-slate-100 dark:border-white/5">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
