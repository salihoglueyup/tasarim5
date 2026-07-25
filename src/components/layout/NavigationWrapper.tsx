import Header from './Header';
import Footer from './Footer';

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black">İçeriğe Atla</a>
      <Header />
      <main id="main-content" className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
