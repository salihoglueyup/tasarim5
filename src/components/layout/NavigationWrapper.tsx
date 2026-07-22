"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Cinematic routes where header and footer should be hidden
  const isCinematicRoute = pathname === '/teklif-al';

  if (isCinematicRoute) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
