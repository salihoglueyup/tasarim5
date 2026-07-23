"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';
import { useState, useRef, MouseEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function PreFooterCta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="py-24 px-[var(--spacing-gutter)] bg-[var(--color-background)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto">
        
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative w-full bg-[var(--color-primary)] rounded-[3rem] overflow-hidden px-8 py-24 md:py-32 flex flex-col items-center justify-center text-center shadow-2xl"
        >
          {/* Spotlight Effect that follows mouse */}
          <div 
            className="absolute pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isHovering ? 1 : 0,
              background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 80%)`,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          {/* Static subtle glows */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              {t('home_cta_title')}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mb-12 font-light">
              {t('home_cta_desc')}
            </p>
            
            <Magnetic strength={0.3}>
              <Link 
                href="/teklif-al" 
                className="bg-white text-[var(--color-primary)] px-10 py-5 rounded-full font-bold text-lg hover:bg-opacity-90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] flex items-center gap-3 group"
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
