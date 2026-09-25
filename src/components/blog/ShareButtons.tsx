"use client";

import { BASE_URL } from '@/lib/constants';

/**
 * Sosyal paylaşım butonları (SEO Master Plan V4 — Faz 178).
 * OG/Twitter kartları Bölüm A ile hizalı; paylaşımda doğru kart görünür.
 */
export default function ShareButtons({ path, title }: { path: string; title: string }) {
  const url = `${BASE_URL}${path}`;
  const enc = encodeURIComponent;
  const links = [
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, icon: 'share' },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, icon: 'work' },
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc(title + ' ' + url)}`, icon: 'chat' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 border-y border-[var(--color-outline)]/60 dark:border-white/10 my-1">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
        <span className="material-symbols-outlined text-sm text-amber-500" aria-hidden="true">share</span>
        <span>Paylaş:</span>
      </span>
      <div className="flex items-center gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${l.label} üzerinde paylaş`}
            title={`${l.label}'da Paylaş`}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white dark:bg-white/10 dark:hover:bg-white dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">{l.icon}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
