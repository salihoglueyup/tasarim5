"use client";

import { useEffect } from 'react';
import type Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
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
    let lenisInstance: Lenis | null = null;

    // Faz 21 & 22: Lenis sadece masaüstünde ve ihtiyaç anında dinamik indirilir (15 KB Gzip tasarruf)
    import('lenis').then(({ default: Lenis }) => {
      if (!isMounted) return;

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        if (lenisInstance) {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
