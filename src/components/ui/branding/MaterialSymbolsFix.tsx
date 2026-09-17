'use client';
import { useEffect } from 'react';

export default function MaterialSymbolsFix() {
  useEffect(() => {
    // Tüm sayfada bulunan material-symbols-outlined sınıflı elementlere translate="no" ekle
    const fixTranslation = () => {
      document.querySelectorAll('.material-symbols-outlined').forEach(el => {
        if (el.getAttribute('translate') !== 'no') {
          el.setAttribute('translate', 'no');
          el.classList.add('notranslate');
        }
      });
    };

    fixTranslation();
    
    // MutationObserver ile sayfaya dinamik olarak eklenenleri de yakala
    const observer = new MutationObserver((mutations) => {
      let shouldFix = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldFix = true;
          break;
        }
      }
      if (shouldFix) fixTranslation();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
