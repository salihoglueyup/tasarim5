"use client";

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  className?: string;
}

/**
 * Faz 71: Donanım hızlandırmalı saf CSS shimmer efektine sahip,
 * JS çalıştırmayan, sıfır-jank hafif Skeleton yükleme iskeleti bileşeni.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantClass = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 w-full my-1',
  }[variant];

  const customStyle: React.CSSProperties = {
    ...style,
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
  };

  return (
    <div
      role="status"
      aria-label="Yükleniyor..."
      aria-busy="true"
      className={`skeleton-shimmer ${variantClass} ${className}`}
      style={customStyle}
      {...props}
    >
      <span className="sr-only">Yükleniyor...</span>
    </div>
  );
};

export default Skeleton;
