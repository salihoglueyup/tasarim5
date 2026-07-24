"use client";

import React from 'react';

export interface StatCardProps {
  value: string;
  label: string;
  trend?: string;
  icon?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  trend,
  icon,
  className = '',
}) => {
  return (
    <div className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col gap-3 shadow-sm hover:shadow-xl transition-all ${className}`}>
      <div className="flex items-center justify-between">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/10 text-[var(--color-primary)] dark:text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">{icon}</span>
          </div>
        )}
        {trend && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mt-2">{value}</div>
      <div className="text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default StatCard;
