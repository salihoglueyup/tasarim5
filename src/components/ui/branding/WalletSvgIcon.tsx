import React from 'react';

export interface WalletSvgIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * Wave 56: Sıfır Metin Sızıntılı Cüzdan & Bütçe SVG İkonu
 * 
 * Material Symbols "account_balance_wallet" ligature fontunun botlar ve Googlebot
 * tarafından ham metin olarak indekslenmesini kökten önlemek için kullanılır.
 * DOM içinde sıfır ham metin üretir, salt SVG grafik olarak render edilir.
 */
export default function WalletSvgIcon({
  className = 'w-5 h-5 inline-block',
  size,
  ...props
}: WalletSvgIconProps) {
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
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}
