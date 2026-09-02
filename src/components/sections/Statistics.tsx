"use client";

import { useEffect, useRef } from 'react';

/**
 * Faz 28: Framer Motion'dan arındırılmış, saf IntersectionObserver ve
 * requestAnimationFrame (RAF) tabanlı sıfır-jank sayaç bileşeni.
 * React re-render'ı tetiklemeden doğrudan DOM textContent'e yazar.
 */
function Counter({ value, suffix = "", duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Kullanıcı hareket azaltma tercih ettiyse doğrudan hedef değeri göster
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = `${value}${suffix}`;
      return;
    }

    let animationFrameId: number;
    let observer: IntersectionObserver | null = null;
    let started = false;

    const startCounting = () => {
      if (started) return;
      started = true;

      const startTime = performance.now();

      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Cubic ease-out eğrisi: 1 - (1 - t)^3
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * value);

        if (node) {
          node.textContent = `${current}${suffix}`;
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else if (node) {
          node.textContent = `${value}${suffix}`;
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startCounting();
            if (observer) observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(node);
    } else {
      startCounting();
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, suffix, duration]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 border-y border-[var(--color-outline)]/30 bg-[var(--color-surface)] relative overflow-hidden">
      {/* Decorative background element */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl bg-gradient-to-r from-transparent via-[var(--color-outline)]/20 to-transparent opacity-50 blur-3xl pointer-events-none transform-gpu" 
        style={{ transform: "translateZ(0)" }} 
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center divide-x-0 md:divide-x divide-[var(--color-outline)]/50">
          
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-primary)]">
              <Counter value={15} suffix="+" />
            </span>
            <span className="text-[var(--color-secondary)] font-medium text-sm md:text-base uppercase tracking-widest mt-2">
              Yıllık Tecrübe
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-primary)]">
              <Counter value={50} suffix="+" />
            </span>
            <span className="text-[var(--color-secondary)] font-medium text-sm md:text-base uppercase tracking-widest mt-2">
              Yönetilen Site
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-primary)]">
              <Counter value={10} suffix="k+" />
            </span>
            <span className="text-[var(--color-secondary)] font-medium text-sm md:text-base uppercase tracking-widest mt-2">
              Mutlu Sakin
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-primary)]">
              <Counter value={100} suffix="%" />
            </span>
            <span className="text-[var(--color-secondary)] font-medium text-sm md:text-base uppercase tracking-widest mt-2">
              Şeffaflık
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
