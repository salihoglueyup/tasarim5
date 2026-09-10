"use client";

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'glow' | 'outline' | 'flat';
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES = {
  glass: "bg-[var(--color-surface)]/90 backdrop-blur-xl border border-[var(--color-outline)]/60 shadow-sm",
  glow: "bg-[var(--color-surface)] border border-[var(--color-outline)]/60 shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:border-slate-400/60 dark:hover:border-white/20",
  outline: "bg-transparent border border-[var(--color-outline)]/80 dark:border-white/15",
  flat: "bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/40",
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
