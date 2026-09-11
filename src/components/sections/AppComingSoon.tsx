'use client';

import React from 'react';
import ApsiyonMobileHub from './ApsiyonMobileHub';

/**
 * Geriye dönük uyumluluk köprüsü:
 * AppComingSoon bileşeni yerine tam donanımlı ApsiyonMobileHub kullanılmaktadır.
 * CSS donanım hızlandırma ve transform-gpu güvencesi barındırır.
 */
export default function AppComingSoon() {
  return (
    <div className="w-full transform-gpu">
      <ApsiyonMobileHub />
    </div>
  );
}
