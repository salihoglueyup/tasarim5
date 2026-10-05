'use client';

import type { ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * İçeriği yalnızca Türkçe yazılmış blokları (AI Overview/mevzuat hub'ı gibi) diğer dillerde gizler.
 * Böylece en/ru/ar sayfalarında Türkçe metin görünmez. Blok çevrildiğinde sarmalayıcı kaldırılır.
 */
export default function TrOnly({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return language === 'tr' ? <>{children}</> : null;
}
