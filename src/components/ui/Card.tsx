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
  // Jank önleme: rect'i her mousemove'da değil, hover başında bir kez ölç ve önbelleğe al.
  const rectRef = useRef<DOMRect | null>(null);

  // Sıfır Re-Render (Zero Re-Render) Hızlandırması (v6 & v7): State yerine doğrudan MotionValue!
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverOpacity = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(148, 163, 184, 0.12), transparent 80%)`;

  const handleMouseEnter = () => {
    if (variant === 'glow' && cardRef.current) rectRef.current = cardRef.current.getBoundingClientRect();
    hoverOpacity.set(1);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (variant !== 'glow') return;
    let rect = rectRef.current;
    if (!rect) {
      if (!cardRef.current) return;
      rect = cardRef.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    hoverOpacity.set(0);
  };

  const baseStyles = "relative rounded-[2.5rem] overflow-hidden transition-all duration-300";

  const variantStyles = {
    glass: "bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 shadow-sm",
    glow: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm",
    outline: "bg-transparent border border-slate-300 dark:border-slate-700",
    flat: "bg-slate-100 dark:bg-slate-800 border border-transparent",
  };

  const hoverStyles = hoverEffect 
    ? "hover:shadow-xl hover:border-slate-400/60 dark:hover:border-white/30 hover:-translate-y-1" 
    : "";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

