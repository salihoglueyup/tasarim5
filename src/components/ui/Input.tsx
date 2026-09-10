"use client";

import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="material-symbols-outlined text-[var(--color-tertiary)] absolute left-4 text-xl pointer-events-none" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          className={`w-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] placeholder:text-[var(--color-tertiary)] text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all ${
            icon ? 'pl-11' : ''
          } ${error ? 'border-rose-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs font-bold text-rose-500">{error}</span>}
    </div>
  );
};

export default Input;
