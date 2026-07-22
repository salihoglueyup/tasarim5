"use client";

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// A simple counter component that animates from 0 to target
function Counter({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // easeOutQuart curve
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(easeOut * value));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 border-y border-[var(--color-outline)]/30 bg-[var(--color-surface)] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl bg-gradient-to-r from-transparent via-[var(--color-outline)]/20 to-transparent opacity-50 blur-3xl pointer-events-none"></div>

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
