import { Inter, Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "./globals.css";
import MaterialSymbolsFix from "@/components/ui/MaterialSymbolsFix";
import GlobalNotFound from "@/components/layout/GlobalNotFound";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: 'swap',
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: 'swap',
});

export const metadata = {
  title: 'Sayfa Bulunamadı | Alo Yönetim',
  description: 'Aradığınız sayfa bulunamadı.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <html lang="tr" className={`${inter.variable} ${plusJakarta.variable} ${cairo.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-brand-500/30">
        <MaterialSymbolsFix />
        <GlobalNotFound />
      </body>
    </html>
  );
}
