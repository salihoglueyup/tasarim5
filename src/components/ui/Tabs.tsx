"use client";

import React from 'react';

export interface TabsProps {
  items: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

/**
 * Faz 55: Framer Motion layout projection motorundan arındırılmış,
 * saf donanım hızlandırmalı CSS tabanlı sıfır-jank sekme (Tabs) bileşeni.
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div 
      role="tablist"
      className={`flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-full w-fit mx-auto ${className}`}
    >
      {items.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer transform-gpu ${
              isActive 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm scale-[1.02]' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
