"use client";

import React from 'react';
import { BASE_URL } from '@/lib/seo';
import { getDistrictGeo, DistrictGeoInfo } from '@/data/districtGeoCoordinatesData';

export interface DistrictLocalPackProofSeoProps {
  districtSlug: string;
}

export default function DistrictLocalPackProofSeo({ districtSlug }: DistrictLocalPackProofSeoProps) {
  const geo: DistrictGeoInfo = getDistrictGeo(districtSlug);
  const pageUrl = `${BASE_URL}/bolgeler/${districtSlug}`;

  // Schema.org LocalBusiness & GeoCoordinates for Google Map Pack & Local SEO
  const schemaLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${pageUrl}#localbusiness`,
    name: `Alo Yönetim - ${geo.name} Profesyonel Site ve Tesis Yönetimi`,
    url: pageUrl,
    telephone: '+90 216 550 48 48',
    priceRange: '₺₺',
    image: `${BASE_URL}/icon.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: geo.localHubAddress,
      addressLocality: geo.name,
      addressRegion: 'İstanbul',
      postalCode: geo.postalCode,
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: geo.googleMapsUrl,
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
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${geo.name}, İstanbul`,
    },
  };

  return (
    <section className="my-8 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
      {/* Schema.org LocalBusiness Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px]" aria-hidden="true">pin_drop</span>
            Google Maps & Local Pack Doğrulanmış Saha Ağı
          </div>
          <h4 className="text-base sm:text-lg font-extrabold text-[var(--color-primary)]">
            {geo.name} Yerel Saha Operasyon Merkezi & 45 Dk Acil Servis
          </h4>
          <p className="text-xs text-[var(--color-secondary)] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-slate-500" aria-hidden="true">location_on</span>
            <span>{geo.localHubAddress} (Posta Kodu: {geo.postalCode})</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden md:block">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
              7/24 Kesintisiz Nöbet
            </span>
            <span className="text-[10px] text-[var(--color-secondary)]">
              {Math.round(geo.serviceRadiusMeters / 1000)} km Kapsama Yarıçapı
            </span>
          </div>

          <a
            href={geo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all hover:opacity-90 flex items-center gap-1.5 shadow-xs"
            aria-label={`${geo.name} harita konumunu aç`}
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">map</span>
            <span>Haritada Aç</span>
          </a>
        </div>
      </div>
    </section>
  );
}
