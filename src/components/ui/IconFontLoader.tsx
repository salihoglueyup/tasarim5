"use client";

import { useEffect } from 'react';

/**
 * v9 Hyper-Speed İkon Font Yükleyici (Zero-FOIT & Zero-FOUC)
 * Material Symbols ikon font'unu 1-2 saniye gecikmeli (requestIdleCallback) yüklemek yerine,
 * tarayıcı oluşturmayı (render-blocking) engellemeyen asenkron ön-yükleme (preload stylesheet)
 * mantığıyla anında ağa indirir ve DOM'a bağlar.
 */
const HREF =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';

export default function IconFontLoader() {
  useEffect(() => {
    if (document.getElementById('material-symbols-css')) return;

    // 1. Ağ öncelikli indirme için stylesheet bağlama
    const styleLink = document.createElement('link');
    styleLink.id = 'material-symbols-css';
    styleLink.rel = 'stylesheet';
    styleLink.href = HREF;
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
