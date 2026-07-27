"use client";

import { useEffect } from 'react';

/**
 * v9 Hyper-Speed İkon Font Yükleyici (Zero-FOIT & Zero-FOUC)
 * Material Symbols ikon font'unu 1-2 saniye gecikmeli (requestIdleCallback) yüklemek yerine,
 * tarayıcı oluşturmayı (render-blocking) engellemeyen asenkron ön-yükleme (preload stylesheet)
 * mantığıyla anında ağa indirir ve DOM'a bağlar.
 */
const HREF =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';

export default function IconFontLoader() {
  useEffect(() => {
    if (document.getElementById('material-symbols-css')) return;

    // 1. Ağ öncelikli indirme için preload linki
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'style';
    preloadLink.href = HREF;
    document.head.appendChild(preloadLink);

    // 2. Render-blocking yapmayan asenkron stylesheet bağlama (media="print" -> onload="all")
    const styleLink = document.createElement('link');
    styleLink.id = 'material-symbols-css';
    styleLink.rel = 'stylesheet';
    styleLink.href = HREF;
    styleLink.media = 'print';
    styleLink.onload = () => {
      styleLink.media = 'all';
    };
    document.head.appendChild(styleLink);

    // Yedek (Fallback): Eğer tarayıcı önbelleğinde vs. onload tetiklenmezse 300ms içinde zorla aktif et
    const timer = setTimeout(() => {
      if (styleLink.media !== 'all') {
        styleLink.media = 'all';
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
