"use client";

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    // Doğal donanım imlecinin aktif kalmasını sağla
    document.body.classList.remove('cursor-none');
  }, []);

  // JS tabanlı fare imleci (mouse listener + spring animation) kaldırıldı;
  // 144Hz/240Hz ekranlarda 0ms gecikmeli doğal donanım imleci devrede.
  return null;
}
