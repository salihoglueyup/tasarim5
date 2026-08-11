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

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // If there are no items or just the home page, don't render breadcrumbs
  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto py-3 no-scrollbar">
      <ol className="flex items-center min-w-max space-x-2 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = pathname === item.url || pathname === `/tr${item.url}`; // Handle localized pathname matching if needed

          return (
            <li key={item.url} className="flex items-center">
              {isLast ? (
                <span className="font-semibold text-slate-900 dark:text-white" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link 
                    href={item.url} 
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-md px-1"
                  >
                    {item.name}
                  </Link>
                  <span className="material-symbols-outlined mx-1 text-slate-400 dark:text-slate-500 text-[18px]">chevron_right</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
