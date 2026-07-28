"use client";

import { useInView, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Sayaç bileşeni: 0'dan hedefe animasyon.
// Jank önleme (v10): Her frame React setState yerine MotionValue + animate kullanılır ve sayı
// doğrudan DOM'a (textContent) yazılır — böylece 2sn boyunca ~120 re-render tamamen kalkar.
function Counter({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;

    const node = ref.current;
    const write = (v: number) => {
      if (node) node.textContent = `${Math.floor(v)}${suffix}`;
    };

    // Faz 98, 201: Hareket azaltma tercihi varsa animasyonsuz anında göster
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      write(value);
      return;
    }

    // ease: easeOut (1 - (1-t)^4) ile aynı his; onUpdate DOM'a yazar, React'e dokunmaz.
    const controls = animate(count, value, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: write,
    });

    return () => controls.stop();
  }, [inView, value, duration, suffix, count]);

  // İlk render (SSR/hydration) için başlangıç değeri; animasyon DOM'u ele geçirir.
  return (
    <span ref={ref}>
      {0}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 border-y border-[var(--color-outline)]/30 bg-[var(--color-surface)] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl bg-gradient-to-r from-transparent via-[var(--color-outline)]/20 to-transparent opacity-50 blur-3xl pointer-events-none" style={{ transform: "translateZ(0)" }}></div>

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
