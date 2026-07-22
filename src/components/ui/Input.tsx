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
          <span className="material-symbols-outlined text-gray-400 absolute left-4 text-xl pointer-events-none">
            {icon}
          </span>
        )}
        <input
          className={`w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-900 dark:text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all ${
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
