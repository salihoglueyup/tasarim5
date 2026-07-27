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
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Paylaş:</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.label} üzerinde paylaş`}
          className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg">{l.icon}</span>
        </a>
      ))}
    </div>
  );
}
