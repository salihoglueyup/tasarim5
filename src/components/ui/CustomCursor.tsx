"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Faz 94, 203: Mobil veya hareketi azaltma tercihi varsa devre dışı bırak
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    const motionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touchCheck || motionCheck || window.innerWidth < 768) {
      const id = window.requestAnimationFrame(() => setIsTouchOrReducedMotion(true));
      return () => window.cancelAnimationFrame(id);
    }

    let rafId: number | null = null;
    let latestX = -100;
    let latestY = -100;

    // Faz 92: rAF throttle ile INP ve TBT darboğazını önle
    const moveCursor = (e: MouseEvent) => {
      latestX = e.clientX - 16;
      latestY = e.clientY - 16;
      
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
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[100] mix-blend-difference hidden md:block"
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
