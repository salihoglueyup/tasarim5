import type { Metadata } from 'next';
import NotFoundClient from './NotFoundClient';

// 404 sayfası ana sayfanın başlığını miras almamalı; benzersiz başlık ve noindex (soft-404 sinyalini önler).
export const metadata: Metadata = {
  title: { absolute: 'Sayfa Bulunamadı | Alo Yönetim' },
  description: 'Aradığınız sayfa bulunamadı.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundClient />;
}
