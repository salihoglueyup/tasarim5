import type { CSSProperties } from 'react';

export interface IconProps {
  /** Material Symbols (outlined) simge adı; public/icons/sprite.svg içindeki <symbol id> ile eşleşir. */
  name: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Sayfa metnine ikon adı basmayan SVG ikon.
 *
 * Eski yöntem (`<span class="material-symbols-outlined">arrow_forward</span>`) ikon adını DOM'a metin olarak
 * yazıyordu; arama motorları ve font yüklenmeden önceki ilk boyama bu metni içerik olarak görüyordu.
 * Bu bileşen tek bir önbelleklenebilir sprite dosyasına (`/icons/sprite.svg`) referans verir; DOM'da metin yoktur.
 * Boyut: `.icon` CSS sınıfı (varsayılan 24px, `style.fontSize` ile değiştirilebilir).
 */
export default function Icon({ name, className, style }: IconProps) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
