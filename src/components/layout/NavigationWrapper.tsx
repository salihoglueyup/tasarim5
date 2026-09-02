'use client';

import Header from './Header';
import Footer from './Footer';
import GlobalSpotlightSearchSeo from '@/components/seo/GlobalSpotlightSearchSeo';
import LeadQuickModalSeo from '@/components/seo/LeadQuickModalSeo';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes('/admin');

  const { t } = useLanguage();

  return (
    <>
      {/* Faz 202: WCAG 2.1 AA Kural 2.4.1 Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 rtl:focus:left-auto rtl:focus:right-4 focus:z-[99999] focus:px-5 focus:py-3 focus:bg-slate-900 focus:text-white dark:focus:bg-white dark:focus:text-slate-950 focus:font-extrabold focus:text-sm focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-500 transition-all cursor-pointer"
      >
        {t('nav_skip_content') || 'Ana İçeriğe Atla'}
      </a>
      <Header />
      <main id="main-content" className={isAdmin ? 'h-full w-full' : 'flex-grow min-h-[75vh] w-full relative'}>{children}</main>
      {!isAdmin && (
        <>
          <GlobalSpotlightSearchSeo />
          <LeadQuickModalSeo />
          <Footer />
        </>
      )}
    </>
  );
}
