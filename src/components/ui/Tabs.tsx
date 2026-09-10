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
      className={`flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 rounded-full w-fit mx-auto ${className}`}
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
                ? 'bg-[var(--color-primary)] text-[var(--color-surface)] shadow-sm scale-[1.02]' 
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
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
