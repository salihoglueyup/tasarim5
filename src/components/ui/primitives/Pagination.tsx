"use client";

import React from 'react';
import Link from 'next/link';

import Icon from '@/components/ui/branding/Icon';
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

  // Çok sayfada mobilde taşmayı önlemek için pencereli liste: ilk, son ve geçerli sayfanın komşuları
  const visiblePages: (number | "gap")[] = [];
  for (let n = 1; n <= totalPages; n++) {
    const near = n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1;
    if (near) visiblePages.push(n);
    else if (visiblePages[visiblePages.length - 1] !== "gap") visiblePages.push("gap");
  }

  return (
    <nav 
      aria-label="Sayfalama" 
      className="flex flex-wrap items-center justify-center gap-2 mt-16 font-sans"
    >
      {/* Önceki Sayfa */}
      {currentPage > 1 ? (
        <Link
          href={getPageHref(currentPage - 1)}
          onClick={(e) => handleLinkClick(currentPage - 1, e)}
          className="w-11 h-11 shrink-0 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Önceki sayfa"
        >
          <Icon name="arrow_back" className="text-lg" />
        </Link>
      ) : (
        <span 
          aria-disabled="true"
          className="w-11 h-11 shrink-0 rounded-full border border-slate-200/50 dark:border-white/5 flex items-center justify-center opacity-40 cursor-not-allowed"
        >
          <Icon name="arrow_back" className="text-lg" />
        </span>
      )}

      {/* Sayfa Numaraları */}
      {visiblePages.map((n, idx) => {
        if (n === "gap") {
          return (
            <span key={`gap-${idx}`} aria-hidden="true" className="w-6 text-center text-slate-400 select-none">
              …
            </span>
          );
        }
        const isCurrent = currentPage === n;
        return (
          <Link
            key={n}
            href={getPageHref(n)}
            onClick={(e) => handleLinkClick(n, e)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`w-11 h-11 shrink-0 rounded-full text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
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
          className="w-11 h-11 shrink-0 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Sonraki sayfa"
        >
          <Icon name="arrow_forward" className="text-lg" />
        </Link>
      ) : (
        <span 
          aria-disabled="true"
          className="w-11 h-11 shrink-0 rounded-full border border-slate-200/50 dark:border-white/5 flex items-center justify-center opacity-40 cursor-not-allowed"
        >
          <Icon name="arrow_forward" className="text-lg" />
        </span>
      )}
    </nav>
  );
};

export default Pagination;
