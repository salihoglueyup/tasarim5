"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useQuote } from '@/context/QuoteContext';

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { openQuoteModal } = useQuote();
  
  useEffect(() => {
    if (pathname === '/teklif-al') {
      // Modalı aç
      openQuoteModal();
      
      // Kullanıcıyı geldiği sayfaya geri gönder veya ana sayfaya at (URL'yi temizle)
      if (window.history.length > 2) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [pathname, router, openQuoteModal]);

  // Teklif al sayfasındayken arayüzü renderlama (redirect beklerken)
  if (pathname === '/teklif-al') {
    return null;
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black">İçeriğe Atla</a>
      <Header />
      <main id="main-content" className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
