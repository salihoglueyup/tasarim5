'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 origin-left z-[100]"
      style={{ scaleX }}
      aria-label="Okuma İlerlemesi"
    />
  );
}

export default ReadingProgressBar;
