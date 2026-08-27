"use client";

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  description: string;
  category?: string;
  breadcrumbs?: { name: string; url?: string }[];
}

export default function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  // Jank önleme: rect'i her mousemove'da değil, hover başında bir kez ölç ve önbelleğe al.
  const rectRef = useRef<DOMRect | null>(null);

  // Sıfır Re-Render (Zero Re-Render) Hızlandırması (v6): State yerine doğrudan MotionValue!
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(circle 500px at ${mouseX}px ${mouseY}px, rgba(45,45,58,0.04), transparent 80%)`;

  const handleMouseEnter = () => {
    if (containerRef.current) rectRef.current = containerRef.current.getBoundingClientRect();
    setIsHovering(true);
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
    setIsHovering(false);
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-slate-950 text-white border-b border-white/10 overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20 px-[var(--spacing-gutter)] flex flex-col items-center justify-center text-center transition-colors duration-300"
    >
      {/* Zarif arkaplan gradyanı ve dokusu */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#15151C] to-slate-900 -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Spotlight Effect that follows mouse */}
      <motion.div 
        className="absolute pointer-events-none transition-opacity duration-500 z-0 inset-0"
        style={{
          opacity: isHovering ? 1 : 0,
          background,
        }}
      />

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }}></div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        
        {/* Breadcrumbs Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-sm text-xs font-semibold text-slate-300 mb-6 flex-wrap justify-center"
        >
          <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
          
          {finalBreadcrumbs ? (
            finalBreadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-slate-500">/</span>
                {crumb.url ? (
                  <Link href={crumb.url} className="hover:text-white transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-white font-bold">{crumb.name}</span>
                )}
              </span>
            ))
          ) : (
            <>
              <span className="text-slate-500">/</span>
              <span className="text-white font-bold">{title}</span>
            </>
          )}
        </motion.div>

        {/* Title — LCP optimizasyonu: anında boyanır */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      </div>

    </section>
    </>
  );
}
