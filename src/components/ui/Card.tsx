"use client";

import React, { useRef, MouseEvent } from 'react';
import { motion, HTMLMotionProps, useMotionValue, useMotionTemplate } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'glass' | 'glow' | 'outline' | 'flat';
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  hoverEffect = true,
  children,
  className = '',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Sıfır Re-Render (Zero Re-Render) Hızlandırması (v6 & v7): State yerine doğrudan MotionValue!
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverOpacity = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(148, 163, 184, 0.12), transparent 80%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || variant !== 'glow') return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const baseStyles = "relative rounded-[2.5rem] overflow-hidden transition-all duration-300";

  const variantStyles = {
    glass: "bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-sm",
    glow: "bg-[var(--color-surface)] border border-[var(--color-outline)]/60 shadow-sm",
    outline: "bg-transparent border border-slate-200 dark:border-white/10",
    flat: "bg-gray-50 dark:bg-white/5 border border-transparent",
  };

  const hoverStyles = hoverEffect 
    ? "hover:shadow-xl hover:border-slate-400/60 dark:hover:border-white/30 hover:-translate-y-1" 
    : "";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => hoverOpacity.set(1)}
      onMouseLeave={() => hoverOpacity.set(0)}
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      style={{
        willChange: variant === 'glass' || variant === 'glow' ? 'transform' : undefined,
        transform: 'translateZ(0)',
      }}
      {...props}
    >
      {variant === 'glow' && (
        <motion.div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hoverOpacity,
            background,
            willChange: 'opacity, background',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;

