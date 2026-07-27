"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Sayfa değiştiğinde (route change) Lenis'in eski sayfa konumunda animasyon yapmaya çalışmasını (scroll stutter) engelle
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      // Yeni sayfanın DOM yüksekliğinin hesaplanması için mikro gecikmeyle resize tetikle
      requestAnimationFrame(() => {
        lenisRef.current?.resize();
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Faz 91, 94, 202: Hareket azaltma tercihi veya mobil dokunmatik cihaz varsa Lenis'i indirme ve başlatma (INP ve FPS).
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
       window.matchMedia('(pointer: coarse)').matches ||
       window.innerWidth < 768)
    ) {
      return;
    }

    let isMounted = true;
    let rafId: number;

    // Faz 21 & 22: Lenis sadece masaüstünde ve ihtiyaç anında dinamik indirilir (15 KB Gzip tasarruf)
    import('lenis').then(({ default: Lenis }) => {
      if (!isMounted) return;

      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenisInstance;

      function raf(time: number) {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}

