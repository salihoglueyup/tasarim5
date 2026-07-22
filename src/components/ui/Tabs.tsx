"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface TabsProps {
  items: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-full w-fit mx-auto ${className}`}>
      {items.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`relative px-5 py-2 rounded-full text-xs font-bold transition-colors z-10 ${
              isActive ? 'text-white dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="tabs-active-pill"
                className="absolute inset-0 bg-[var(--color-primary)] rounded-full -z-10 shadow-sm"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
