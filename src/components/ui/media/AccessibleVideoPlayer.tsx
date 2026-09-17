"use client";

import React, { useState } from 'react';

export interface AccessibleVideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  captionsSrc?: string;
  transcript?: string;
  className?: string;
}

/**
 * Faz 217: Erişilebilir Video Oynatıcı & Altyazı / Metin Deşifresi (WCAG 1.2.2 & 1.2.3)
 */
export default function AccessibleVideoPlayer({
  src,
  title,
  poster,
  captionsSrc,
  transcript,
  className = '',
}: AccessibleVideoPlayerProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-lg">
        <video
          controls
          playsInline
          poster={poster}
          aria-label={title}
          className="w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
          {captionsSrc && (
            <track
              kind="captions"
              src={captionsSrc}
              srcLang="tr"
              label="Türkçe Altyazı"
              default
            />
          )}
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>

      {transcript && (
        <div className="mt-2 text-left">
          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            aria-expanded={showTranscript}
            aria-controls="video-transcript-content"
            className="text-xs font-bold text-brand-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              description
            </span>
            <span>{showTranscript ? 'Video Deşifresini Gizle' : 'Video Deşifresini / Metnini Oku'}</span>
          </button>

          {showTranscript && (
            <div
              id="video-transcript-content"
              role="region"
              aria-label={`${title} Deşifre Metni`}
              className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-h-60 overflow-y-auto"
            >
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Video Deşifresi:</h4>
              <p>{transcript}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
