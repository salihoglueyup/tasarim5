"use client";

import React, { useState, useEffect } from 'react';
import JsonLd from './JsonLd';

interface VoiceSearchSpeakableSeoProps {
  question: string;
  directAnswer: string;
  lang?: string;
  selectorClass?: string;
  badgeLabel?: string;
  className?: string;
}

/**
 * Sesli Arama & Google Assistant / Siri Motoru (VoiceSearchSpeakableSeo)
 * 
 * Web Speech API ile canlı sesli dinleme, ses dalgası animasyonu ve
 * Google'ın sesli arama algoritmaları için `SpeakableSpecification` şemasını içerir.
 */
export default function VoiceSearchSpeakableSeo({
  question,
  directAnswer,
  lang = "tr-TR",
  selectorClass = "voice-search-snippet",
  badgeLabel = "Sesli Arama & Hızlı Yanıt",
  className = ""
}: VoiceSearchSpeakableSeoProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setHasSpeechSupport(true);
    }
  }, []);

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const textToRead = `${question}. ${directAnswer}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = lang;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${question}\n\n${directAnswer}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [`.${selectorClass}-q`, `.${selectorClass}-a`]
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-gradient-to-br from-blue-500/5 via-slate-50 to-indigo-500/5 dark:from-blue-950/20 dark:via-zinc-900 dark:to-indigo-950/20 border border-blue-500/20 dark:border-blue-400/20 rounded-3xl p-6 md:p-8 shadow-sm my-6 relative overflow-hidden ${selectorClass} ${className}`}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <span className={`material-symbols-outlined text-lg ${isSpeaking ? 'animate-bounce' : ''}`}>
                mic
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {badgeLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Audio Playback Button */}
            {hasSpeechSupport && (
              <button
                onClick={handleToggleSpeech}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isSpeaking
                    ? 'bg-rose-500 text-white shadow-md animate-pulse'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                }`}
                title={isSpeaking ? 'Okumayı Durdur' : 'Cevabı Sesli Dinle'}
              >
                <span className="material-symbols-outlined text-base">
                  {isSpeaking ? 'stop_circle' : 'volume_up'}
                </span>
                <span>{isSpeaking ? 'Durdur' : 'Sesli Dinle'}</span>
              </button>
            )}

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-xl bg-gray-200/60 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 transition-colors text-xs flex items-center"
              title="Metni Kopyala"
            >
              <span className="material-symbols-outlined text-base">
                {isCopied ? 'check' : 'content_copy'}
              </span>
            </button>
          </div>
        </div>

        {/* Audio Wave Visualizer during speech */}
        {isSpeaking && (
          <div className="flex items-center gap-1 mb-3 py-1 px-3 bg-blue-500/10 rounded-lg w-fit">
            <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" />
            <span className="w-1 h-5 bg-blue-600 rounded-full animate-bounce" />
            <span className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="w-1 h-6 bg-blue-700 rounded-full animate-bounce" />
            <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-300 ml-2">
              Google Asistan formatında okunuyor...
            </span>
          </div>
        )}

        <h3 className={`text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 ${selectorClass}-q`}>
          {question}
        </h3>

        <p className={`text-sm md:text-base text-slate-700 dark:text-slate-200 font-light leading-relaxed ${selectorClass}-a`}>
          {directAnswer}
        </p>
      </div>
    </>
  );
}
