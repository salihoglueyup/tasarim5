'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Award,
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Navigation,
  Clock,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';

interface FacilityOfficialEntityTrustProps {
  className?: string;
}

export function FacilityOfficialEntityTrustSeo({
  className = '',
}: FacilityOfficialEntityTrustProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const isoCertificates = [
    {
      code: 'ISO 41001:2018',
      name: 'Entegre Tesis Yönetimi Sistemi',
      desc: 'Uluslararası Tesis İşletim ve Hizmet Seviyesi (SLA) Standardı',
      tag: 'ILAS Akredite',
    },
    {
      code: 'ISO 9001:2015',
      name: 'Kalite Yönetim Sistemi',
      desc: 'Operasyonel Süreç ve Müşteri Memnuniyeti Güvencesi',
      tag: 'BELCERT Onaylı',
    },
    {
      code: 'ISO 45001:2018',
      name: 'İş Sağlığı ve Güvenliği',
      desc: '6331 Sayılı Kanun Uyumlu Saha ve Personel Güvenliği',
      tag: 'Sıfır İş Kazası',
    },
    {
      code: 'ISO 14001:2015',
      name: 'Çevre Yönetim Sistemi',
      desc: 'Sıfır Atık, Enerji Verimliliği ve Yeşil Tesis İlkeleri',
      tag: 'Ekolojik Tesis',
    },
  ];

  return (
    <section
      id="resmi-kurumsal-varlik-kunyesi"
      aria-label="T.C. Resmi Kurumsal Varlık ve Güvenlik Ruhsatı Künyesi"
      itemScope
      itemType="https://schema.org/ProfessionalService"
      className={`rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 shadow-2xl p-6 sm:p-10 relative overflow-hidden ${className}`}
    >
      {/* Arka Plan Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Üst Başlık & Rozet */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            T.C. Resmi Kurum Onaylı Varlık & Güvenlik Künyesi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Doğrulanabilir Kurumsal Kimlik & Yasal Ruhsatlar
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Alo Yönetim, paravan veya fason bir yapı değil; İstanbul Valiliği özel güvenlik faaliyet izin belgesine, 
            İTO ticaret sicil tesciline ve ILAS akreditasyonlu ISO 41001 entegre tesis yönetim standardına sahip 
            resmi kurumsal anonim şirkettir.
          </p>
        </div>

        {/* 15+ Yıl Tecrübe Rozeti */}
        <div className="shrink-0 flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
          <Award className="w-9 h-9 text-blue-100 shrink-0" />
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-blue-100">Kuruluş</div>
            <div className="text-xl font-extrabold tracking-tight">2009&apos;dan Beri</div>
            <div className="text-[11px] text-blue-100 font-medium">15+ Yıl Kesintisiz Faaliyet</div>
          </div>
        </div>
      </div>

      {/* 3 Ana Sütun: Valilik Ruhsatı | Ticaret Sicil & MERSİS | Merkez Ofis & GPS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* 1. T.C. İstanbul Valiliği 5188 Ruhsatı */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-blue-100 dark:border-blue-900/40 shadow-sm hover:shadow-md transition-shadow relative group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                T.C. İstanbul Valiliği
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                5188 Özel Güvenlik İzni
              </h3>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">İzin Belge No:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {CANONICAL_NAP.legal.securityPermitNumber}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">Yasal Dayanak:</span>
              <span className="font-semibold text-slate-900 dark:text-white">5188 Sayılı Kanun</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">Yetkili Makam:</span>
              <span className="font-semibold text-slate-900 dark:text-white">Özel Güvenlik Şb. Md.</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 dark:text-slate-400">Faaliyet Alanı:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> İstanbul 39 İlçe
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Fiziki Güvenlik & Denetim</span>
            <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
              <Lock className="w-3 h-3" /> Emniyet Onaylı
            </span>
          </div>
        </div>

        {/* 2. Ticaret Sicil, MERSİS & Vergi Dairesi */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                İstanbul Ticaret Odası
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sicil & MERSİS Tescili
              </h3>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">Ticaret Sicil No:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {CANONICAL_NAP.legal.tradeRegistryNumber} (İTO)
              </span>
            </div>
            
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">MERSİS No:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {CANONICAL_NAP.legal.mersisNumber}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(CANONICAL_NAP.legal.mersisNumber, 'mersis')}
                  aria-label="MERSİS numarasını kopyala"
                  className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                  title="Kopyala"
                >
                  {copiedKey === 'mersis' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">Vergi Dairesi:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {CANONICAL_NAP.legal.taxOffice} V.D.
              </span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 dark:text-slate-400">Tüzel Şirket Türü:</span>
              <span className="font-semibold text-slate-900 dark:text-white">Anonim Şirket (A.Ş.)</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Yasal Tüzel Kişilik</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {CANONICAL_NAP.legal.legalName}
            </span>
          </div>
        </div>

        {/* 3. Kadıköy Fiziksel Merkez Ofis & GPS Konumu */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-emerald-100 dark:border-emerald-900/40 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Fiziksel Genel Merkez
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Kadıköy / İstanbul
              </h3>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="py-1 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Resmi Merkez Adresi:</span>
              <span 
                itemProp="address" 
                className="font-semibold text-slate-900 dark:text-white leading-relaxed block"
              >
                {CANONICAL_NAP.address.fullDisplayAddress}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">GPS Koordinatları:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {CANONICAL_NAP.geo.latitude}° N, {CANONICAL_NAP.geo.longitude}° E
              </span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 dark:text-slate-400">7/24 Çağrı Merkezi:</span>
              <a
                href={`tel:${CANONICAL_NAP.contact.phoneE164}`}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                {CANONICAL_NAP.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <a
              href={CANONICAL_NAP.geo.googleMapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Haritalarda Aç</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[11px] text-slate-400 font-mono">34714 TR</span>
          </div>
        </div>
      </div>

      {/* ISO Akreditasyonları ve Standartlar Barı */}
      <div className="relative z-10 p-6 rounded-2xl bg-slate-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              BELCERT & ILAS Akredite
            </span>
            <h4 className="text-lg font-extrabold text-white">
              Tesis Yönetiminde Uluslararası Kalite & Güvenlik Standartları
            </h4>
          </div>
          <Link
            href="/kalite-belgelerimiz"
            className="shrink-0 text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Tüm Sertifikaları Doğrula</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isoCertificates.map((cert) => (
            <div
              key={cert.code}
              className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-black text-blue-400">
                  {cert.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-200 border border-blue-700/50">
                  {cert.tag}
                </span>
              </div>
              <div className="text-xs font-bold text-white mb-1">{cert.name}</div>
              <p className="text-[11px] text-slate-400 leading-snug">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hukuki & Güvenlik Beyanı (Footer Dipnot) */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <p>
          © 2009–2026 Alo Yönetim ve Organizasyon A.Ş. — 5188 Sayılı Kanun ve 634 Sayılı KMK kapsamında İstanbul genelinde yetkilendirilmiş tüzel kişilik.
        </p>
        <div className="flex items-center gap-4 shrink-0 font-medium">
          <Link href="/gizlilik-politikasi" className="hover:underline">KVKK Uyum</Link>
          <span>·</span>
          <Link href="/iletisim" className="hover:underline">Resmi Tebligat Adresi</Link>
          <span>·</span>
          <a href="mailto:info@aloyonetim.com.tr" className="hover:underline">info@aloyonetim.com.tr</a>
        </div>
      </div>
    </section>
  );
}
export default FacilityOfficialEntityTrustSeo;
