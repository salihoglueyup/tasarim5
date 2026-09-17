"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/napGuardEngine';

export interface LocalHubItem {
  id: string;
  name: string;
  role: string;
  streetAddress: string;
  district: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  phone: string;
  openingHours: string;
  areaServed: string;
  slaMinutes: number;
  mapQueryUrl: string;
  badge: string;
}

export const LOCAL_BUSINESS_HUBS: LocalHubItem[] = [
  {
    id: 'kadikoy-headquarters',
    name: 'Alo Yönetim Genel Merkez & Anadolu Ana Masası',
    role: 'Genel Merkez, Hukuk, Muhasebe ve Yönetim Kurulu',
    streetAddress: 'Sahrayıcedit Mah. Atatürk Cad. No:62/4',
    district: 'Kadıköy',
    city: 'İstanbul',
    postalCode: '34734',
    latitude: 40.9856,
    longitude: 29.0839,
    phone: CANONICAL_NAP.contact.phoneDisplay,
    openingHours: 'Pzt-Cmt 08:30 - 18:30 (7/24 Acil Çağrı)',
    areaServed: 'İstanbul Anadolu Yakası (14 İlçe Kapsamı)',
    slaMinutes: 15,
    mapQueryUrl: 'https://www.google.com/maps/search/?api=1&query=40.9856,29.0839',
    badge: 'Genel Merkez (HQ)',
  },
  {
    id: 'atasehir-finans-hub',
    name: 'Alo Yönetim Ataşehir Finans & Rezidans Hub\'ı',
    role: 'Lüks Rezidans, Finans Merkezi ve 7/24 Teknik Nöbetçi İstasyonu',
    streetAddress: 'Barbaros Mah. Mor Sümbül Sok. No:1',
    district: 'Ataşehir',
    city: 'İstanbul',
    postalCode: '34746',
    latitude: 40.9928,
    longitude: 29.1124,
    phone: CANONICAL_NAP.contact.phoneDisplay,
    openingHours: '7/24 Kesintisiz (Mobil Teknik Nöbet)',
    areaServed: 'Ataşehir, Ümraniye, Çekmeköy, Sancaktepe',
    slaMinutes: 15,
    mapQueryUrl: 'https://www.google.com/maps/search/?api=1&query=40.9928,29.1124',
    badge: 'Finans & Rezidans Hub',
  },
  {
    id: 'besiktas-avrupa-hub',
    name: 'Alo Yönetim Beşiktaş & Şişli Avrupa Merkez Hub\'ı',
    role: 'Ticari Plazalar, Kuleler ve Avrupa Yakası Koordinasyon Merkezi',
    streetAddress: 'Büyükdere Cad. No:122 Levent',
    district: 'Beşiktaş',
    city: 'İstanbul',
    postalCode: '34394',
    latitude: 41.0784,
    longitude: 29.0125,
    phone: CANONICAL_NAP.contact.phoneDisplay,
    openingHours: '7/24 Kesintisiz (BMS & Asansör Müdahale)',
    areaServed: 'Beşiktaş, Şişli, Sarıyer, Beyoğlu, Kağıthane',
    slaMinutes: 20,
    mapQueryUrl: 'https://www.google.com/maps/search/?api=1&query=41.0784,29.0125',
    badge: 'Avrupa Merkez Hub',
  },
  {
    id: 'basaksehir-sanayi-hub',
    name: 'Alo Yönetim Başakşehir Sanayi, OSB & Lojistik Masası',
    role: 'Endüstriyel Tesisler, Toplu Konutlar ve Trafo İşletme Birimi',
    streetAddress: 'İkitelli OSB Mah. Enkoop Cad. No:8',
    district: 'Başakşehir',
    city: 'İstanbul',
    postalCode: '34490',
    latitude: 41.0772,
    longitude: 28.7963,
    phone: CANONICAL_NAP.contact.phoneDisplay,
    openingHours: 'Pzt-Cmt 08:00 - 19:00 (7/24 Yangın & Trafo Alarm)',
    areaServed: 'Başakşehir, İkitelli OSB, Beylikdüzü, Esenyurt, Avcılar',
    slaMinutes: 25,
    mapQueryUrl: 'https://www.google.com/maps/search/?api=1&query=41.0772,28.7963',
    badge: 'Sanayi & OSB Hub',
  },
];

export default function LocalBusinessProfileAiAnchorSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [activeHubId, setActiveHubId] = useState<string>(LOCAL_BUSINESS_HUBS[0].id);
  const [copied, setCopied] = useState(false);

  const selectedHub =
    LOCAL_BUSINESS_HUBS.find((h) => h.id === activeHubId) || LOCAL_BUSINESS_HUBS[0];

  const question = 'Alo Yönetim Genel Merkezi Nerededir ve İstanbul Genelinde Hangi Hub\'larla Hizmet Verir?';
  const directAnswer =
    'Alo Yönetim kurumsal genel merkezi Kadıköy Sahrayıcedit Mahallesi Atatürk Caddesi No:62/4 adresinde yer almaktadır. İstanbul’un 39 ilçesine 15-25 dakikalık acil mobil teknik müdahale sağlamak amacıyla Kadıköy Genel Merkez haricinde Ataşehir Finans & Rezidans Hub’ı, Beşiktaş/Levent Avrupa Merkez Hub’ı ve Başakşehir/İkitelli OSB Sanayi Masası olmak üzere 4 stratejik lojistik operasyon merkeziyle 7/24 kesintisiz hizmet vermektedir. Çağrı merkezi: 0216 550 48 48.';

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Alo Yönetim Genel Merkez ve Bölgesel Lojistik Tesis İstasyonları',
      description: 'Google Maps, Apple Maps ve Yerel AI Arama Motorları (Local 3-Pack) için doğrulanmış kurumsal NAP koordinatları.',
      itemListElement: LOCAL_BUSINESS_HUBS.map((hub, i) => ({
        '@type': 'ProfessionalService',
        position: i + 1,
        name: hub.name,
        description: hub.role,
        url: BASE_URL,
        telephone: hub.phone,
        hasMap: hub.mapQueryUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: hub.streetAddress,
          addressLocality: hub.district,
          addressRegion: hub.city,
          postalCode: hub.postalCode,
          addressCountry: 'TR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: hub.latitude,
          longitude: hub.longitude,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: hub.areaServed,
        },
        openingHours: hub.openingHours,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: directAnswer,
          },
        },
      ],
    },
  ];

  return (
    <section
      className={`relative w-full rounded-2xl border border-teal-500/20 bg-gradient-to-br from-slate-900/90 via-teal-950/30 to-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-xl text-slate-100 ${className}`}
      aria-label="Doğrulanmış Yerel Ofis ve Harita AI Zeminlemesi"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-400/30 font-bold text-xl">
            <span className="material-symbols-outlined text-2xl">pin_drop</span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-300 border border-teal-500/30">
                Google Business Profile & Local AI
              </span>
              <span className="inline-flex items-center rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                Doğrulanmış NAP Sinyali
              </span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-white tracking-tight">
              Genel Merkez & 4 Bölgesel Lojistik Operasyon Hub'ı
            </h3>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Adres ve koordinatları kopyala"
          className="inline-flex items-center gap-1.5 rounded-lg border border-teal-400/30 bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-200 transition-colors hover:bg-teal-500/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? 'done' : 'content_copy'}
          </span>
          {copied ? 'Kopyalandı' : 'Harita AI Özetini Kopyala'}
        </button>
      </div>

      {/* Instant Answer Text for Speakable / Local AI */}
      <div className="mt-4 rounded-xl border border-teal-400/20 bg-teal-950/30 p-4">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-teal-400 text-lg shrink-0 mt-0.5">
            distance
          </span>
          <p
            id="local-business-profile-instant-answer-text"
            className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
          >
            {directAnswer}
          </p>
        </div>
      </div>

      {/* Hub Selector Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {LOCAL_BUSINESS_HUBS.map((hub) => (
          <button
            key={hub.id}
            type="button"
            onClick={() => setActiveHubId(hub.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              activeHubId === hub.id
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 border border-teal-400'
                : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50'
            }`}
          >
            {hub.badge}
          </button>
        ))}
      </div>

      {/* Selected Hub Detailed Card */}
      <div className="mt-6 rounded-xl border border-teal-500/30 bg-slate-950/70 p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              {selectedHub.badge}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">
              SLA: {selectedHub.slaMinutes} Dakika Acil Müdahale
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
            {selectedHub.name}
          </h4>

          <p className="text-xs text-slate-300">
            {selectedHub.role}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-teal-400 text-sm mt-0.5">
                location_on
              </span>
              <span>{selectedHub.streetAddress}, {selectedHub.district} / {selectedHub.city}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-400 text-sm">
                call
              </span>
              <a href={`tel:${selectedHub.phone.replace(/\s+/g, '')}`} className="hover:text-teal-300 font-medium">
                {selectedHub.phone}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-400 text-sm">
                schedule
              </span>
              <span>{selectedHub.openingHours}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-400 text-sm">
                my_location
              </span>
              <span className="font-mono text-[11px] text-teal-300">
                {selectedHub.latitude}° N, {selectedHub.longitude}° E
              </span>
            </div>
          </div>
        </div>

        {/* Map Action Button */}
        <div className="md:col-span-4 flex flex-col gap-2.5 items-stretch border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <a
            href={selectedHub.mapQueryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-teal-600/30 transition-all active:scale-95 text-center"
          >
            <span className="material-symbols-outlined text-base">directions</span>
            Google Haritalar'da Aç
          </a>

          <div className="text-[10px] text-slate-400 text-center">
            Apple Maps & Yandex Navigasyon ile uyumludur.
          </div>
        </div>
      </div>
    </section>
  );
}
