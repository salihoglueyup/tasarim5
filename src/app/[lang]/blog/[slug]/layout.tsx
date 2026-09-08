import React from 'react';

interface BlogDetailLayoutProps {
  children: React.ReactNode;
}

/**
 * Blog Detay Sayfa Düzeni (Pass-through Layout)
 * 
 * Veritabanı çiftlemesini önlemek, TTFB yanıt süresini optimize etmek ve
 * tarama bütçesini (Crawl Budget) korumak için metadata üretimi ve veri çekimi
 * doğrudan Redis önbellekli `page.tsx` tarafından yönetilir.
 */
export default function BlogDetailLayout({ children }: BlogDetailLayoutProps) {
  return <>{children}</>;
}
