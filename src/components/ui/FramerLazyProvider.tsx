import React from 'react';

/**
 * Faz 63: Framer Motion root provider'ının kaldırılması.
 * Sayfa ağacındaki tüm bileşenler saf CSS donanım hızlandırmalı mimariye
 * geçirildiğinden LazyMotion domAnimation kök sarmalayıcısı gereksizleşmiştir.
 * Geriye dönük uyumluluk için sıfır maliyetli Fragment olarak korunur.
 */
export default function FramerLazyProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
