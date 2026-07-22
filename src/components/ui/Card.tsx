"use client";

import React, { useRef, useState, MouseEvent } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || variant !== 'glow') return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseStyles = "relative rounded-[2.5rem] overflow-hidden transition-all duration-300";

  const variantStyles = {
    glass: "bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-sm",
    glow: "bg-[var(--color-surface)] border border-[var(--color-outline)]/60 shadow-sm",
    outline: "bg-transparent border border-slate-200 dark:border-white/10",
    flat: "bg-gray-50 dark:bg-white/5 border border-transparent",
  };

  const hoverStyles = hoverEffect 
    ? "hover:shadow-xl hover:border-blue-600/40 dark:hover:border-blue-400/40 hover:-translate-y-1" 
    : "";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {variant === 'glow' && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.06), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;
