"use client";

import React from 'react';
import Link from 'next/link';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
}

/**
 * Faz 74: Sayfalama (Pagination) bileşenini client-side butonlar yerine
 * arama motorlarının (Googlebot) tarayabileceği URL searchParams (?page=X)
 * ve SSR dostu semantik `<Link>` mimarisine bağlama.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath = '',
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageHref = (page: number) => {
    if (page === 1) return basePath || '?';
    const separator = basePath.includes('?') ? '&' : '?';
    return `${basePath}${separator}page=${page}`;
  };

  const handleLinkClick = (page: number, e: React.MouseEvent) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <nav 
      aria-label="Sayfalama" 
      className="flex items-center justify-center gap-2 mt-16 font-sans"
    >
      {/* Önceki Sayfa */}
      {currentPage > 1 ? (
        <Link
          href={getPageHref(currentPage - 1)}
          onClick={(e) => handleLinkClick(currentPage - 1, e)}
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Önceki sayfa"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_back</span>
        </Link>
      ) : (
        <span 
          aria-disabled="true"
          className="w-10 h-10 rounded-full border border-slate-200/50 dark:border-white/5 flex items-center justify-center opacity-40 cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_back</span>
        </span>
      )}

      {/* Sayfa Numaraları */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
        const isCurrent = currentPage === n;
        return (
          <Link
            key={n}
            href={getPageHref(n)}
            onClick={(e) => handleLinkClick(n, e)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
              isCurrent
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md'
                : 'border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {n}
          </Link>
        );
      })}

      {/* Sonraki Sayfa */}
      {currentPage < totalPages ? (
        <Link
          href={getPageHref(currentPage + 1)}
          onClick={(e) => handleLinkClick(currentPage + 1, e)}
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Sonraki sayfa"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
        </Link>
      ) : (
        <span 
          aria-disabled="true"
          className="w-10 h-10 rounded-full border border-slate-200/50 dark:border-white/5 flex items-center justify-center opacity-40 cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
        </span>
      )}
    </nav>
  );
};

export default Pagination;
