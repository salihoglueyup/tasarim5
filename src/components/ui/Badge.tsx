"use client";

import React from 'react';

export interface BadgeProps {
  status?: 'success' | 'warning' | 'error' | 'info' | 'purple' | 'neutral';
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  status = 'info',
  children,
  pulse = true,
  className = '',
}) => {
  const statusStyles = {
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    error: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
    info: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
    neutral: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
  };

  const dotColor = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-rose-500",
    info: "bg-blue-500",
    purple: "bg-purple-500",
    neutral: "bg-slate-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border tracking-tight ${statusStyles[status]} ${className}`}>
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor[status]}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor[status]}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
