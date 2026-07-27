"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Sadece ilk yüklemede mobil/dokunmatik kontrolü için tek bir state kullanılır.
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(false);
  
  const isHoveringRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scaleValue = useMotionValue(1);
  const bgValue = useMotionValue('rgba(255, 255, 255, 0)');
  const opacityValue = useMotionValue(1);
  
  // Anında takip (sıfır gecikme/takılma) ama akıcı mikro-yumuşatma (stiffness: 1200, damping: 35, mass: 0.01)
  const springConfig = { damping: 35, stiffness: 1200, mass: 0.01 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Hover geçişleri için yumuşak yay efekti
  const smoothScale = useSpring(scaleValue, { stiffness: 600, damping: 30 });

  useEffect(() => {
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

    document.body.classList.add('cursor-none');

    // Doğrudan senkron atama: çift rAF gecikmesini ve frame atlamasını tamamen yok eder!
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (opacityValue.get() === 0) {
        opacityValue.set(1);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.tagName) return;

      const shouldHover = Boolean(
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList?.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      );

      // React re-render tamamen iptal edildi! Doğrudan GPU transform/motionValue ataması:
      if (shouldHover !== isHoveringRef.current) {
        isHoveringRef.current = shouldHover;
        scaleValue.set(shouldHover ? 1.5 : 1);
        bgValue.set(shouldHover ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && isHoveringRef.current) {
        isHoveringRef.current = false;
        scaleValue.set(1);
        bgValue.set('rgba(255, 255, 255, 0)');
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, scaleValue, bgValue, opacityValue]);

  if (isTouchOrReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[100] mix-blend-difference block max-md:hidden"
      style={{
        x: smoothX,
        y: smoothY,
        scale: smoothScale,
        backgroundColor: bgValue,
        opacity: opacityValue,
        willChange: 'transform, opacity',
      }}
    />
  );
}

