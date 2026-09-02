"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const TYPE_ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
};

const TYPE_STYLES: Record<ToastType, string> = {
  success: 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-100',
  error: 'border-rose-200 dark:border-rose-900/40 bg-rose-50/95 dark:bg-rose-950/90 text-rose-900 dark:text-rose-100',
  info: 'border-blue-200 dark:border-blue-900/40 bg-blue-50/95 dark:bg-blue-950/90 text-blue-900 dark:text-blue-100',
  warning: 'border-amber-200 dark:border-amber-900/40 bg-amber-50/95 dark:bg-amber-950/90 text-amber-900 dark:text-amber-100',
};

/**
 * Faz 69: Saf CSS animasyonlu, sıfır Framer Motion bağımlılıklı,
 * hafif donanım hızlandırmalı Toast bildirim sistemi.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 4000) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev.slice(-4), { id, type, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Portalı */}
      <div 
        role="region"
        aria-live="polite"
        aria-label="Bildirimler"
        className="fixed top-5 right-5 z-[110] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none font-sans"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-200 ease-out transform-gpu animate-in fade-in slide-in-from-top-3 ${TYPE_STYLES[toast.type]}`}
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              {TYPE_ICONS[toast.type]}
              <span className="text-xs font-semibold leading-snug">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Kapat"
              className="p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
