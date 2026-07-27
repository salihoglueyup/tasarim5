"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Sadece hassas imleci (mouse/trackpad) olmayan kesin dokunmatik cihazlarda veya hareketi azaltma tercihinde devre dışı bırak
    const hasPrecisePointer = window.matchMedia('(pointer: fine)').matches;
    const motionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;

    if (!hasPrecisePointer || motionCheck || isSmallScreen) {
      const id = window.requestAnimationFrame(() => {
        setIsTouchOrReducedMotion(true);
        document.body.classList.remove('cursor-none');
      });
      return () => window.cancelAnimationFrame(id);
    }

    // İmleç aktif olduğunda masaüstünde varsayılan ok imlecini gizle
    document.body.classList.add('cursor-none');

    let rafId: number | null = null;

    const moveCursor = (e: MouseEvent) => {
      const latestX = e.clientX - 16;
      const latestY = e.clientY - 16;
      
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          cursorX.set(latestX);
          cursorY.set(latestY);
          if (!isVisible) setIsVisible(true);
          rafId = null;
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName?.toLowerCase() === 'a' ||
        target?.tagName?.toLowerCase() === 'button' ||
        target?.closest('a') ||
        target?.closest('button') ||
        target?.classList?.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.body.classList.remove('cursor-none');
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  // SSR hydration mismatch önleme & mobilden kaçış
  if (isTouchOrReducedMotion || !isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[100] mix-blend-difference block max-md:hidden"
      style={{
        x: smoothX,
        y: smoothY,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
      }}
      transition={{ scale: { duration: 0.15 }, backgroundColor: { duration: 0.15 } }}
    />
  );
}
