"use client";

import React, { useState, useEffect } from 'react';
import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';

export interface TocItem {
  id: string;
  title: string;
  level?: 2 | 3;
}

interface TableOfContentsSeoProps {
  items: TocItem[];
  currentUrl?: string;
  title?: string;
  className?: string;
}

/**
 * Zengin İçindekiler Tablosu & SERP Jump-to Sitelinks Motoru (TableOfContentsSeo)
 * 
 * Canlı okuma ilerleme çubuğu (Reading Progress Bar), yapışkan başlık kaydırması,
 * tek tıkla bölüm linki kopyalama ve Google Sitelinks için `SiteNavigationElement` / `ItemList` şeması.
 */
export default function TableOfContentsSeo({
  items,
  currentUrl = '',
  title = "İçindekiler & Hızlı Erişim",
  className = ""
}: TableOfContentsSeoProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Reading Progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setReadingProgress(progress);
      }

      // 2. Active Section detection
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (!items || items.length === 0) return null;

  const absoluteBase = currentUrl.startsWith('http')
    ? currentUrl
    : `${BASE_URL}${currentUrl.startsWith('/') ? '' : '/'}${currentUrl}`;

  // Google SERP Jump-To Anchor Şeması
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: `${absoluteBase}#${item.id}`,
    })),
  };

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const fullUrl = `${window.location.origin}${window.location.pathname}#${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label={title}
        className={`bg-slate-50/90 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm relative overflow-hidden ${className}`}
      >
        {/* Top Reading Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4 text-[var(--color-primary)] font-bold text-base">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">
              toc
            </span>
            <h3>{title}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[var(--color-secondary)] bg-white/50 dark:bg-white/5 px-2 py-0.5 rounded-md border border-gray-200 dark:border-white/10">
              %{readingProgress} okundu
            </span>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              title={isCollapsed ? 'Genişlet' : 'Daralt'}
            >
              <span className="material-symbols-outlined text-sm">
                {isCollapsed ? 'expand_more' : 'expand_less'}
              </span>
            </button>
          </div>
        </div>

        {/* Links List */}
        {!isCollapsed && (
          <ul className="space-y-1.5 text-sm">
            {items.map((item) => {
              const isActive = activeId === item.id;
              const isSub = item.level === 3;

              return (
                <li
                  key={item.id}
                  className={`${isSub ? 'ml-4' : ''} transition-all group flex items-center justify-between`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToHeading(e, item.id)}
                    className={`flex-1 py-1.5 px-3 rounded-xl transition-all leading-snug truncate ${
                      isActive
                        ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold border-l-2 border-blue-600'
                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.title}
                  </a>

                  <button
                    onClick={(e) => handleCopyLink(e, item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity ml-1"
                    title="Bölüm linkini kopyala"
                  >
                    <span className="material-symbols-outlined text-xs">
                      {copiedId === item.id ? 'check' : 'link'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </>
  );
}
