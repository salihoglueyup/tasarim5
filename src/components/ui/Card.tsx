"use client";

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'glow' | 'outline' | 'flat';
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES = {
  glass: "bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 shadow-sm",
  glow: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-blue-500/10 dark:hover:shadow-white/5",
  outline: "bg-transparent border border-slate-300 dark:border-slate-700",
  flat: "bg-slate-100 dark:bg-slate-800 border border-transparent",
};

/**
 * Faz 62: Card bileşenindeki motion.div wrapper'ının kaldırılarak
 * saf CSS hover ve donanım hızlandırmalı (GPU) sınıflarına bağlanması.
 */
export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  hoverEffect = true,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "relative rounded-[2.5rem] overflow-hidden transition-all duration-300 transform-gpu";

  const hoverStyles = hoverEffect 
    ? "hover:shadow-xl hover:border-slate-400/60 dark:hover:border-white/30 hover:-translate-y-1" 
    : "";

  return (
    <div
      className={`${baseStyles} ${VARIANT_STYLES[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Card;
