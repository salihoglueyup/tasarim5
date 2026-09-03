"use client";

import React from 'react';
import JsonLd from './JsonLd';
import { personSchema } from '@/lib/schemas';
import Image from 'next/image';
import Link from 'next/link';

interface PersonSeoProps {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  worksForName?: string;
  className?: string;
}

export default function PersonSeo({
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs = [],
  worksForName = "Alo Yönetim",
  className = ""
}: PersonSeoProps) {
  
  const schema = personSchema({
    name,
    jobTitle,
    image,
    sameAs,
  });

  return (
    <>
      <JsonLd data={[schema]} />
      <div className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm ${className}`}>
        
        {/* Avatar */}
        <div className="shrink-0 relative">
          {image ? (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-100 dark:border-white/10 shadow-xl relative z-10">
              <Image 
                src={image} 
                alt={name} 
                width={160} 
                height={160} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-100 dark:border-white/10 shadow-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white flex items-center justify-center text-5xl font-black relative z-10">
              {name.charAt(0)}
            </div>
          )}
          
          {/* Süsleme */}
          <div className="absolute -inset-4 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-full blur-2xl z-0 -z-10" />
        </div>

        {/* Bilgiler */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[var(--color-primary)]">{name}</h3>
            <div className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mt-1">{jobTitle} • {worksForName}</div>
          </div>
          
          <p className="text-[var(--color-secondary)] font-light leading-relaxed max-w-2xl">
            {description}
          </p>

          {sameAs && sameAs.length > 0 && (
            <div className="flex items-center gap-3 mt-2">
              {sameAs.map((link, i) => {
                let icon = "link";
                if (link.includes("linkedin.com")) icon = "work"; // Linkedin placeholder icon
                if (link.includes("twitter.com") || link.includes("x.com")) icon = "tag";
                
                return (
                  <a 
                    key={i} 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">{icon}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
