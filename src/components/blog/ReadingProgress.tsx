"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Okuma ilerleme çubuğu (SEO Master Plan V4 — Faz 177).
 * Sayfanın en üstünde scroll ilerlemesini gösterir (Sıfır Re-Render v6 Optimizasyonu).
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none" aria-hidden="true">
      <motion.div
        className="h-full bg-slate-900 dark:bg-white origin-left"
        style={{ scaleX, willChange: 'transform' }}
      />
    </div>
  );
}
