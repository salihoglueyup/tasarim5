'use client';

import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes('/admin');

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black">İçeriğe Atla</a>
      <Header />
      <main id="main-content" className={isAdmin ? 'h-full w-full' : 'flex-grow min-h-[75vh] w-full relative'}>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
