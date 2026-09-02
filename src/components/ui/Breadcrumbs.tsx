'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Faz 73: Breadcrumb navigasyonunda tıklanabilir alanları (tap targets)
 * genişletilmiş (min-h-[36px] px-2.5), erişilebilir ve akıcı bağlantılar.
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // If there are no items or just the home page, don't render breadcrumbs
  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto py-2.5 no-scrollbar">
      <ol className="flex items-center min-w-max space-x-1 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.url} className="flex items-center">
              {isLast ? (
                <span className="font-semibold text-slate-900 dark:text-white px-2.5 py-1.5" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link 
                    href={item.url} 
                    className="inline-flex items-center min-h-[36px] px-2.5 py-1.5 rounded-lg font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {item.name}
                  </Link>
                  <span 
                    aria-hidden="true" 
                    className="material-symbols-outlined mx-0.5 text-slate-400 dark:text-slate-600 text-[18px] select-none"
                  >
                    chevron_right
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
