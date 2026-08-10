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
    primary: "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md shadow-slate-900/15 dark:shadow-white/10 hover:shadow-xl hover:shadow-slate-900/25 hover:bg-slate-800 dark:hover:bg-slate-100 hover:-translate-y-0.5",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 shadow-sm",
    glass: "bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 shadow-sm",
    outline: "border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-slate-900 hover:text-slate-900 dark:hover:border-slate-400 dark:hover:text-white bg-transparent",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/20",
    ghost: "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
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
