"use client";

import React from 'react';
import JsonLd from './JsonLd';
import { BASE_URL, ORG_PHONE } from '@/lib/constants';
import { ORG_NAME, ORG_ADDRESS } from '@/lib/schemas';

interface EmergencyServiceBadgeSeoProps {
  phone?: string;
  serviceTitle?: string;
  description?: string;
  showUI?: boolean;
  className?: string;
}

/**
 * 7/24 Acil Müdahale & Çağrı Merkezi Durum Rozeti (EmergencyServiceBadgeSeo)
 * 
 * Google ve Google Haritalar'a 7 gün 24 saat kesintisiz acil müdahale ve teknik destek
 * sunduğumuzu belirten `OpeningHoursSpecification` ve `EmergencyService` şemalarını enjekte eder.
 */
export default function EmergencyServiceBadgeSeo({
  phone = ORG_PHONE,
  serviceTitle = "7/24 Acil Teknik ve Güvenlik Operasyon Merkezi",
  description = "Alo Yönetim bünyesinde İstanbul genelinde apartman, site ve tesislere kesintisiz 7/24 acil arıza, asansör ve güvenlik müdahale desteği.",
  showUI = true,
  className = ""
}: EmergencyServiceBadgeSeoProps) {

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    name: `${ORG_NAME} — ${serviceTitle}`,
    description,
    telephone: phone,
    url: `${BASE_URL}/iletisim`,
    address: ORG_ADDRESS,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      {showUI && (
        <div
          className={`inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-700 dark:text-emerald-300 text-xs md:text-sm font-semibold shadow-sm ${className}`}
        >
          {/* Yanıp Sönen Canlı İndikatör */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          <span className="tracking-wide">
            7/24 Kesintisiz Acil Müdahale & Operasyon Merkezi
          </span>
        </div>
      )}
    </>
  );
}
