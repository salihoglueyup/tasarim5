import React from 'react';
import { FileText, Download } from 'lucide-react';

interface PdfDownloadBadgeProps {
  href: string;
  title: string;
  fileSize?: string;
  className?: string;
}

/**
 * Faz 116: PDF Doküman İndirme Rozeti (PdfDownloadBadge)
 * 
 * Kullanıcının bağlantıya tıklamadan önce dosya türünü (PDF) ve yaklaşık
 * dosya boyutunu (örn. 1.8 MB) görmesini sağlayarak güven ve UX kalitesini artırır.
 */
export default function PdfDownloadBadge({
  href,
  title,
  fileSize = '1.8 MB',
  className = '',
}: PdfDownloadBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download
      aria-label={`${title} belgesini indir (PDF formatında, dosya boyutu: ${fileSize})`}
      className={`group inline-flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-red-500/50 dark:hover:border-red-500/50 shadow-sm hover:shadow-md transition-all ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <FileText className="w-5 h-5" />
        </div>
        <div className="min-w-0 text-left">
          <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">
            {title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40">
              PDF
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {fileSize}
            </span>
          </div>
        </div>
      </div>

      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
        <Download className="w-4 h-4" />
      </div>
    </a>
  );
}
