import React from 'react';

export interface LocationPinSvgIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * Wave 57: Sıfır Metin Sızıntılı Konum Pini SVG İkonu
 * 
 * Material Symbols "location_on" ligature fontunun Googlebot ve arama motorları
 * tarafından çıplak metin (keyword) olarak taranıp SERP'te indekslenmesini
 * kökten önler. DOM içinde sıfır ham metin üretir, salt SVG grafik olarak render edilir.
 */
export default function LocationPinSvgIcon({
  className = 'w-5 h-5 inline-block',
  size,
  ...props
}: LocationPinSvgIconProps) {
  const customStyle: React.CSSProperties = {
    ...(size ? { width: size, height: size } : {}),
    ...props.style,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={customStyle}
      {...props}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}
