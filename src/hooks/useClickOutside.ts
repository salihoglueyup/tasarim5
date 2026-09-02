"use client";

import { useEffect, useRef, RefObject } from 'react';

/**
 * Faz 65: Dropdown menülerde tıklandığında dışarı tıklama (click-outside) dinleyicisini optimize etme.
 * - Yalnızca dropdown açıkken (`enabled === true`) dinleyici ekler. Kapalıyken sıfır dinleyici çalışır.
 * - `mousedown` ve `touchstart` yerine modern, birleşik `pointerdown` kullanır.
 * - Pasif dinleyici (`{ passive: true }`) ile ana iş parçacığında kaydırmayı bloke etmez.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: PointerEvent) => void,
  enabled: boolean = true
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: PointerEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      savedHandler.current(event);
    };

    // passive: true ile kaydırma ve dokunma jestlerini geciktirmez
    document.addEventListener('pointerdown', listener, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', listener);
    };
  }, [ref, enabled]);
}

export default useClickOutside;
