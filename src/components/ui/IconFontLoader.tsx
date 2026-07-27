"use client";

import { useEffect } from 'react';

/**
 * Material Symbols ikon font'unu render-blocking olmadan yükler (Faz 186).
 * Stylesheet <head>'de blocking <link> yerine hydration sonrası eklenir;
 * böylece ilk boyamayı geciktirmez (SEO araçlarındaki "render-blocking" uyarısı).
 * No-JS fallback layout <head>'inde <noscript> ile sağlanır.
 */
const HREF =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';

export default function IconFontLoader() {
  useEffect(() => {
    const loadFont = () => {
      if (document.getElementById('material-symbols-css')) return;
      const link = document.createElement('link');
      link.id = 'material-symbols-css';
      link.rel = 'stylesheet';
      link.href = HREF;
      document.head.appendChild(link);
    };

    // Faz 56, 58, 62: LCP ve TBT değerlerini bozmamak için boşta veya 1s sonra yükle
    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(() => loadFont(), { timeout: 2000 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(loadFont, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  return null;
}
