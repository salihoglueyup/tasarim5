'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Send } from 'lucide-react';

interface ShareArticleHubProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareArticleHub({ title, url, className = '' }: ShareArticleHubProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    url || (typeof window !== 'undefined' ? window.location.href : 'https://aloyonetim.com.tr');

  const copyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - ${shareUrl}`
  )}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(shareUrl)}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;
  const shareTelegram = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(title)}`;

  return (
    <div
      className={`flex flex-wrap items-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mr-2">
        <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>Paylaş:</span>
      </div>

      {/* WhatsApp */}
      <a
        href={shareWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp ile Paylaş"
        className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
      >
        <MessageCircle className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinkedIn}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn'de Paylaş"
        className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-600 hover:text-white transition-all active:scale-95 flex items-center justify-center"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.22a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
        </svg>
      </a>

      {/* Twitter / X */}
      <a
        href={shareTwitter}
        target="_blank"
        rel="noopener noreferrer"
        title="X (Twitter)'da Paylaş"
        className="p-2 rounded-xl bg-slate-900/10 dark:bg-slate-700/30 text-slate-800 dark:text-slate-200 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all active:scale-95 flex items-center justify-center"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Telegram */}
      <a
        href={shareTelegram}
        target="_blank"
        rel="noopener noreferrer"
        title="Telegram'da Paylaş"
        className="p-2 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all active:scale-95"
      >
        <Send className="w-4 h-4" />
      </a>

      {/* Bağlantıyı Kopyala */}
      <button
        type="button"
        onClick={copyLink}
        title="Bağlantıyı Kopyala"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-medium transition-all active:scale-95 ml-auto"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Kopyalandı</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Linki Kopyala</span>
          </>
        )}
      </button>
    </div>
  );
}

export default ShareArticleHub;
