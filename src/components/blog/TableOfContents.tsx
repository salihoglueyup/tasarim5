'use client';

import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
  headings?: TocHeading[];
  className?: string;
  collapsibleOnMobile?: boolean;
}

export function TableOfContents({
  contentSelector = '#article-content',
  headings: initialHeadings,
  className = '',
  collapsibleOnMobile = true,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>(initialHeadings || []);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  // DOM üzerinden H2 ve H3 başlıklarını dinamik ayrıştır
  useEffect(() => {
    if (initialHeadings && initialHeadings.length > 0) {
      setHeadings(initialHeadings);
      return;
    }

    const container = document.querySelector(contentSelector);
    if (!container) return;

    const elements = container.querySelectorAll('h2, h3');
    const parsed: TocHeading[] = [];

    elements.forEach((el, index) => {
      let id = el.id;
      if (!id) {
        id = `heading-${index}-${el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}`;
        el.id = id;
      }
      parsed.push({
        id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });

    setHeadings(parsed);
  }, [contentSelector, initialHeadings]);

  // IntersectionObserver ile aktif başlığı takip et
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Makale İçindekiler Tablosu"
      className={`p-5 rounded-3xl bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 shadow-sm ${className}`}
    >
      <div
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className="flex items-center justify-between cursor-pointer lg:cursor-default pb-3.5 border-b border-[var(--color-outline)]/60 dark:border-white/10 text-slate-900 dark:text-white font-bold text-sm"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>İçindekiler</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 font-bold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-2xs">
            {headings.length}
          </span>
        </div>
        <button
          type="button"
          className="lg:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white p-1"
          aria-expanded={isOpenMobile}
          aria-label="İçindekiler tablosunu aç/kapat"
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-200 ${isOpenMobile ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      <ul
        className={`${
          isOpenMobile ? 'block pt-3' : 'hidden pt-3'
        } lg:block max-h-[55vh] overflow-y-auto space-y-1 text-xs pr-1 scrollbar-thin`}
      >
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li
              key={h.id}
              className={`${h.level === 3 ? 'pl-3' : 'pl-0'}`}
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(h.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveId(h.id);
                    if (collapsibleOnMobile) setIsOpenMobile(false);
                  }
                }}
                className={`flex items-start gap-1.5 py-1.5 px-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-500/10 dark:bg-amber-500/15 text-slate-900 dark:text-amber-300 font-bold border-l-2 border-amber-500 dark:border-amber-400 pl-2 rounded-r-xl shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform ${
                    isActive ? 'rotate-90 text-amber-500 dark:text-amber-400' : 'text-slate-400'
                  }`}
                />
                <span className="leading-snug">{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
