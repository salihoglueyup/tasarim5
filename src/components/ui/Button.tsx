"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {

  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none overflow-hidden";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary: "bg-[var(--color-primary)] text-white shadow-md shadow-blue-900/15 hover:shadow-xl hover:shadow-blue-900/25 hover:-translate-y-0.5",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 shadow-sm",
    glass: "bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200/80 dark:border-white/15 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/20 shadow-sm",
    outline: "border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 bg-transparent",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/20",
    ghost: "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>
      )}
      
      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="shrink-0 flex items-center">{rightIcon}</span>
      )}

      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite] skew-x-12 pointer-events-none" />
      )}
    </motion.button>
  );
};

export default Button;
