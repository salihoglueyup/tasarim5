import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çevrimdışı | Alo Yönetim',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <title>Çevrimdışı | Alo Yönetim</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
