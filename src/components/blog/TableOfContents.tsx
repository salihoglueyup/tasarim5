'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Select all H2 and H3 elements inside the prose article
    const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
    
    const parsedItems: TocItem[] = elements.map((elem) => {
      // Use the pre-injected ID from DOMPurify
      const id = elem.id || '';
      return {
        id,
        text: elem.textContent || '',
        level: Number(elem.tagName.charAt(1)), // 2 for H2, 3 for H3
      };
    }).filter(item => item.id && item.text);

    setItems(parsedItems);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i] as HTMLElement;
        if (element.offsetTop <= scrollPosition) {
          setActiveId(element.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block custom-scrollbar w-64 shrink-0">
      <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">list_alt</span>
          Bu Yazıda
        </h3>
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-sm transition-colors block ${
                item.level === 3 ? 'ml-4' : 'font-medium'
              } ${
                activeId === item.id
                  ? 'text-brand-600 dark:text-brand-400 font-bold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
