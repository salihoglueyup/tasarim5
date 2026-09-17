import React from 'react';

export interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  showExternalIcon?: boolean;
}

/**
 * Faz 91: Dış bağlantılara (External Links) otomatik `rel="noopener noreferrer"`
 * ve `target="_blank"` eklenmesini garanti eden, reverse-tabnabbing saldırılarını
 * engelleyen ve erişilebilirlik (A11y) standartlarına tam uyumlu bağlantı bileşeni.
 */
export default function ExternalLink({
  href,
  children,
  className = '',
  showExternalIcon = false,
  rel,
  target = '_blank',
  ...rest
}: ExternalLinkProps) {
  // rel değerini güvenli biçimde birleştirir
  const safeRel = rel ? `${rel} noopener noreferrer` : 'noopener noreferrer';

  return (
    <a
      href={href}
      target={target}
      rel={safeRel}
      className={className}
      {...rest}
    >
      {children}
      {showExternalIcon && (
        <span className="material-symbols-outlined text-[14px] inline-block ml-1 opacity-70 align-middle" aria-hidden="true">
          open_in_new
        </span>
      )}
    </a>
  );
}
