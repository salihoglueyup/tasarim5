import "./globals.css";
import "./fonts.css";
import MaterialSymbolsFix from "@/components/ui/branding/MaterialSymbolsFix";
import GlobalNotFound from "@/components/layout/page/GlobalNotFound";

export const metadata = {
  metadataBase: new URL('https://aloyonetim.com.tr'),
  title: 'Sayfa Bulunamadı | Alo Yönetim',
  description: 'Aradığınız sayfa bulunamadı.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..24,400..500,0..1,0&display=block"
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
