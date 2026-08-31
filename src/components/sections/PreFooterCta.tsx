"use client";

import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';
import { useRef, MouseEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function PreFooterCta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Sıfır Re-Render (Zero Re-Render) Hızlandırması: State yerine doğrudan MotionValue!
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverOpacity = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(circle 400px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`;

  // Jank önleme: rect'i her mousemove'da değil, hover başında bir kez ölç ve önbelleğe al.
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (containerRef.current) rectRef.current = containerRef.current.getBoundingClientRect();
    hoverOpacity.set(1);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    let rect = rectRef.current;
    if (!rect) {
      if (!containerRef.current) return;
      rect = containerRef.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    hoverOpacity.set(0);
  };

  return (
    <section className="py-24 px-[var(--spacing-gutter)] bg-[var(--color-background)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto">
        
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full bg-[#2D2D3A] dark:bg-slate-900 border border-slate-700/40 dark:border-slate-800 rounded-[3rem] overflow-hidden px-8 py-24 md:py-32 flex flex-col items-center justify-center text-center shadow-2xl"
        >
          {/* Spotlight Effect that follows mouse (Zero Re-render GPU layer) */}
          <motion.div 
            className="absolute pointer-events-none transition-opacity duration-300 inset-0"
            style={{
              opacity: hoverOpacity,
              background,
            }}
          />

          {/* Static subtle glows */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              {t('home_cta_title')}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mb-12 font-light">
              {t('home_cta_desc')}
            </p>
            
            <Magnetic strength={0.3}>
              <Link 
                href="/teklif-al" 
                className="bg-white text-slate-950 px-10 py-5 rounded-full font-extrabold text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-3 group cursor-pointer"
              >
                {t('home_cta_btn')}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </Magnetic>
          </div>
        </div>

      </div>
    </section>
  );
}
