"use client";

import { useEffect } from 'react';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics';

/**
 * Wave 56: Global GA4 Dönüşüm Dinleyicisi (Delegated Conversion Tracker)
 * 
 * Sitedeki tüm dinamik veya statik `tel:` ve `whatsapp` bağlantılarını
 * otomatik olarak yakalar, tıklandığı DOM hiyerarşisini (header, footer, modal, vb.)
 * tespit ederek GA4'e `telefon_tikla` ve `whatsapp_tikla` etkinliklerini iletir.
 */
export default function ConversionTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a') as HTMLAnchorElement | null;
      if (!link || !link.href) return;

      const href = link.href.trim();

      // 1. Telefon (tel:) Linkleri
      if (href.startsWith('tel:')) {
        const phone = href.replace('tel:', '').trim();
        let konum = 'body';

        if (link.closest('header') || link.closest('[role="banner"]')) {
          konum = 'header';
        } else if (link.closest('footer') || link.closest('[role="contentinfo"]')) {
          konum = 'footer';
        } else if (link.closest('[role="dialog"]') || link.closest('.modal')) {
          konum = 'modal';
        } else if (link.closest('.floating-cta') || link.closest('#quick-call-widget')) {
          konum = 'floating';
        } else if (link.closest('#contact-info') || link.closest('.contact-section')) {
          konum = 'contact_page';
        }

        trackPhoneClick(konum, phone);
      }

      // 2. WhatsApp Linkleri
      if (href.includes('wa.me') || href.includes('whatsapp.com') || href.includes('api.whatsapp.com')) {
        let konum = 'floating';

        if (link.closest('header')) {
          konum = 'header';
        } else if (link.closest('footer')) {
          konum = 'footer';
        } else if (link.closest('#contact-info') || link.closest('.contact-section')) {
          konum = 'contact_page';
        }

        trackWhatsAppClick(konum);
      }
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  return null;
}
