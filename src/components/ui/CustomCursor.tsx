"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(false);
  
  const isVisibleRef = useRef(true);
  const isHoveringRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Anında takip (sıfır gecikme/takılma) ama akıcı mikro-yumuşatma (stiffness: 1200, damping: 35, mass: 0.01)
  const springConfig = { damping: 35, stiffness: 1200, mass: 0.01 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

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
      
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
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

      if (shouldHover !== isHoveringRef.current) {
        isHoveringRef.current = shouldHover;
        setIsHovering(shouldHover);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && isHoveringRef.current) {
        isHoveringRef.current = false;
        setIsHovering(false);
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
  }, [cursorX, cursorY]);

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
        willChange: 'transform',
      }}
      transition={{ scale: { duration: 0.15 }, backgroundColor: { duration: 0.15 } }}
    />
  );
}
