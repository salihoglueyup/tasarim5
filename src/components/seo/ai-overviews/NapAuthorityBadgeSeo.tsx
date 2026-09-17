'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Clock,
  ShieldCheck,
  Award,
  Copy,
  Check,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import { CANONICAL_NAP } from '@/lib/seo/napGuardEngine';

interface NapAuthorityBadgeProps {
  className?: string;
  showMapButton?: boolean;
  showCopyActions?: boolean;
}

export function NapAuthorityBadgeSeo({
  className = '',
  showMapButton = true,
  showCopyActions = true,
}: NapAuthorityBadgeProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <section
      aria-label="Kurumsal Kimlik ve Doğrulanmış NAP Künyesi"
      itemScope
      itemType="https://schema.org/LocalBusiness"
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                itemProp="name"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                {CANONICAL_NAP.legal.brandName}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Doğrulanmış Merkez
              </span>
            </div>
            <p
              itemProp="legalName"
              className="text-xs text-slate-500 dark:text-slate-400"
            >
              {CANONICAL_NAP.legal.legalName} (Kuruluş: {CANONICAL_NAP.legal.foundingYear})
            </p>
          </div>
        </div>

        {showMapButton && (
          <a
            href={CANONICAL_NAP.geo.googleMapsPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all shadow-md shadow-blue-600/20 active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            Haritada Yol Tarifi Al
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        )}
      </div>

      {/* Grid: Address, Contact, Legal, Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        {/* 1. Address */}
        <div
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
          className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Resmi Adres</span>
            </div>
            {showCopyActions && (
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    CANONICAL_NAP.address.fullDisplayAddress,
                    'address'
                  )
                }
                title="Adresi Kopyala"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {copiedKey === 'address' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
            <span itemProp="streetAddress">
              {CANONICAL_NAP.address.streetAddress}
            </span>
            ,<br />
            <span itemProp="addressLocality">
              {CANONICAL_NAP.address.addressLocality}
            </span>{' '}
            /{' '}
            <span itemProp="addressRegion">
              {CANONICAL_NAP.address.addressRegion}
            </span>
            , Posta Kodu:{' '}
            <span itemProp="postalCode">
              {CANONICAL_NAP.address.postalCode}
            </span>
          </p>
          <meta
            itemProp="addressCountry"
            content={CANONICAL_NAP.address.addressCountry}
          />
        </div>

        {/* 2. Direct Contact */}
        <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>İletişim & Santral</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="text-slate-400">Genel Merkez:</span>{' '}
              <a
                itemProp="telephone"
                href={`tel:${CANONICAL_NAP.contact.phoneE164}`}
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {CANONICAL_NAP.contact.phoneDisplay}
              </a>
            </div>
            <div>
              <span className="text-slate-400">E-Posta:</span>{' '}
              <a
                itemProp="email"
                href={`mailto:${CANONICAL_NAP.contact.email}`}
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {CANONICAL_NAP.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* 3. Legal Registry */}
        <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Sicil & Vergi</span>
            </div>
            {showCopyActions && (
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(CANONICAL_NAP.legal.mersisNumber, 'mersis')
                }
                title="MERSİS Kopyala"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {copiedKey === 'mersis' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <p>
              <span className="text-slate-400">MERSİS:</span>{' '}
              <code className="font-mono text-slate-900 dark:text-slate-100">
                {CANONICAL_NAP.legal.mersisNumber}
              </code>
            </p>
            <p>
              <span className="text-slate-400">Ticaret Sicil:</span>{' '}
              {CANONICAL_NAP.legal.tradeRegistryNumber} (İTO)
            </p>
            <p>
              <span className="text-slate-400">Vergi Dairesi:</span>{' '}
              {CANONICAL_NAP.legal.taxOffice} V.D.
            </p>
          </div>
        </div>

        {/* 4. Working Hours & Emergency SLA */}
        <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Çalışma & SLA</span>
          </div>
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <p>
              <span className="text-slate-400">Ofis Saatleri:</span> Hafta içi{' '}
              {CANONICAL_NAP.openingHours.opens} - {CANONICAL_NAP.openingHours.closes}
            </p>
            <p className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              7/24 Nöbetçi Santral Aktif
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              5188 Özel Güvenlik & ISO 41001 Lisanslı
            </p>
          </div>
        </div>
      </div>

      {/* Lat/Lon Geo Hidden Microdata for Schema.org validation */}
      <div
        itemProp="geo"
        itemScope
        itemType="https://schema.org/GeoCoordinates"
        className="hidden"
      >
        <meta itemProp="latitude" content={String(CANONICAL_NAP.geo.latitude)} />
        <meta
          itemProp="longitude"
          content={String(CANONICAL_NAP.geo.longitude)}
        />
      </div>
    </section>
  );
}
