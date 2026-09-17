'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK_IMAGE = '/images/hero-poster-v5.webp';

/**
 * Faz 122: Dayanıklı Görsel Sarmalayıcısı (ImageFallback)
 * 
 * Görsel URL'si 404 verdiğinde veya ağ hatasında kırık resim simgesi yerine
 * şık bir kurumsal yedek görsel yükleyerek CLS ve UI kusurlarını sıfırlar.
 */
export default function ImageFallback({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  ...props
}: ImageFallbackProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={hasError ? fallbackSrc : src}
      alt={alt}
      onError={() => {
        if (!hasError) {
          setHasError(true);
        }
      }}
      {...props}
    />
  );
}
