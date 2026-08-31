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
}

export function TableOfContents({
  contentSelector = '#article-content',
  headings: initialHeadings,
  className = '',
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>(initialHeadings || []);
  const [activeId, setActiveId] = useState<string>('');

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
      className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm">
        <List className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>İçindekiler</span>
      </div>

      <ul className="space-y-1.5 text-xs">
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
                  }
                }}
                className={`flex items-start gap-1.5 py-1 rounded transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform ${
                    isActive ? 'rotate-90 text-blue-600 dark:text-blue-400' : 'text-slate-400'
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
