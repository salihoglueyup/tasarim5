"use client";

import { motion } from 'framer-motion';
import { useState, useRef, MouseEvent, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  description: string;
  category?: string;
  breadcrumbs?: { name: string; url?: string }[];
}

export default function PageHeader({ title, description, category = "Alo Yönetim", breadcrumbs }: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const pathname = usePathname() || '';
  
  const generateAutoBreadcrumbs = () => {
    if (breadcrumbs) return breadcrumbs;
    if (!pathname || pathname === '/') return null;
    
    const paths = pathname.split('/').filter(p => p);
    const autoBreadcrumbs = [];
    
    let currentUrl = '';
    for (let i = 0; i < paths.length; i++) {
      currentUrl += `/${paths[i]}`;
      if (i === paths.length - 1) {
        autoBreadcrumbs.push({ name: title });
      } else {
        let name = paths[i].charAt(0).toUpperCase() + paths[i].slice(1).replace(/-/g, ' ');
        if (paths[i] === 'hizmetler') name = 'Hizmetlerimiz';
        else if (paths[i] === 'kurumsal') name = 'Kurumsal';
        autoBreadcrumbs.push({ name, url: currentUrl });
      }
    }
    return autoBreadcrumbs;
  };

  const finalBreadcrumbs = generateAutoBreadcrumbs();
  
  return (
    <>
      <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full bg-gradient-to-b from-slate-100/90 via-slate-50/70 to-white dark:from-[#0a192b] dark:via-[#0c2038] dark:to-[#071322] border-b border-slate-200/60 dark:border-white/10 overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20 px-[var(--spacing-gutter)] flex flex-col items-center justify-center text-center transition-colors duration-300"
    >
      {/* Spotlight Effect that follows mouse */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(45,45,58,0.04), transparent 80%)`,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-slate-400/10 dark:bg-white/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        
        {/* Breadcrumbs Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/10 border border-slate-200 dark:border-white/15 shadow-sm text-xs font-semibold text-slate-600 dark:text-gray-300 mb-6 flex-wrap justify-center"
        >
          <Link href="/" className="hover:text-[var(--color-primary)] dark:hover:text-white transition-colors">Anasayfa</Link>
          
          {finalBreadcrumbs ? (
            finalBreadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                {crumb.url ? (
                  <Link href={crumb.url} className="hover:text-[var(--color-primary)] dark:hover:text-white transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-[var(--color-primary)] dark:text-white font-bold">{crumb.name}</span>
                )}
              </span>
            ))
          ) : (
            <>
              <span className="text-slate-400">/</span>
              <span className="text-[var(--color-primary)] dark:text-white font-bold">{title}</span>
            </>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl font-light leading-relaxed"
        >
          {description}
        </motion.p>
      </div>

    </section>
    </>
  );
}
