"use client";

import React from 'react';

export interface AccessibleProgressBarProps {
  value: number; // 0 - 100
  min?: number;
  max?: number;
  label: string;
  showPercentage?: boolean;
  className?: string;
  barColor?: string;
}

/**
 * Faz 220: WCAG 2.1 AA Uyumlu İlerleme Çubuğu (Progress Bar)
 * `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
 */
export default function AccessibleProgressBar({
  value,
  min = 0,
  max = 100,
  label,
  showPercentage = true,
  className = '',
  barColor = 'bg-amber-500',
}: AccessibleProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, min), max);
  const percentage = Math.round(((clampedValue - min) / (max - min)) * 100);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
        <span>{label}</span>
        {showPercentage && <span>%{percentage}</span>}
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={clampedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        className="w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden"
      >
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
