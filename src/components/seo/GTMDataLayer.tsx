"use client";

import { useEffect } from 'react';

interface GTMDataLayerProps {
  event: string;
  data?: Record<string, any>;
}

/**
 * SEO Faz 6: GTM Data Layer Zenginleştirmesi
 * Belirli sayfalara yerleştirilerek Google Tag Manager'a özel veri gönderilmesini sağlar.
 * Dönüşüm ölçümü (Remarketing, Custom Events) için hayati öneme sahiptir.
 */
export default function GTMDataLayer({ event, data }: GTMDataLayerProps) {
  useEffect(() => {
    // DataLayer henüz initialize edilmemiş olsa bile güvenle push yapabiliriz
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event,
      ...data
    });
  }, [event, data]);

  return null;
}
