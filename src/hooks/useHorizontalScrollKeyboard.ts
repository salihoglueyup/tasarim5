import { useEffect, useRef } from 'react';

/**
 * Faz 219: Yatay Kaydırma Alanlarında Klavye Yön Tuşu Desteği (WCAG 2.1.1 Keyboard)
 * `overflow-x: auto` içeren kapsayıcılara odaklanıldığında Ok Tuşları (ArrowLeft / ArrowRight)
 * ile yatayda pürüzsüz kaydırma sağlar.
 */
export function useHorizontalScrollKeyboard<T extends HTMLElement = HTMLDivElement>(
  scrollStep: number = 120
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Kapsayıcının klavyeyle odaklanabilir olmasını sağla
    if (!container.hasAttribute('tabindex')) {
      container.setAttribute('tabindex', '0');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Yalnızca kapsayıcı veya onun doğrudan çocuğu odaktayken çalış
      if (document.activeElement !== container && !container.contains(document.activeElement)) {
        return;
      }

      const isRtl = document.documentElement.dir === 'rtl' || container.dir === 'rtl';

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        container.scrollBy({
          left: isRtl ? -scrollStep : scrollStep,
          behavior: 'smooth',
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        container.scrollBy({
          left: isRtl ? scrollStep : -scrollStep,
          behavior: 'smooth',
        });
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollStep]);

  return containerRef;
}
