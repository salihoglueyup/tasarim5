"use client";

import React from 'react';
import Link from 'next/link';
import { getDistrictDualCore } from '@/lib/seo/districtDualCoreMatrix';

interface DistrictDualCoreSelectorSeoProps {
  districtSlug: string;
  districtName: string;
  className?: string;
}

export default function DistrictDualCoreSelectorSeo({
  districtSlug,
  districtName,
  className = '',
}: DistrictDualCoreSelectorSeoProps) {
  const dualCore = getDistrictDualCore(districtSlug);

  if (!dualCore) return null;

  const { siteCore, facilityCore, sharedKpis } = dualCore;

  const housingProfileLabels: Record<string, string> = {
    villasite: 'Villa & Müstakil Siteler',
    toplukonut: 'Toplu Konut & Geniş Siteler',
    rezidans: 'Rezidans & Yüksek Katlı Projeler',
    karma: 'Karma Yaşam ve Konut Alanları',
  };

  const commercialProfileLabels: Record<string, string> = {
    plaza: 'A+ Plaza ve İş Merkezleri',
    sanayi: 'Organize Sanayi & Fabrikalar',
    finans: 'Finans ve Kurumsal Merkezler',
    karma: 'Ticari ve Ofis Yapıları',
  };

  return (
    <section
      aria-label={`${districtName} Site ve Tesis Yönetimi Seçim Paneli`}
      className={`w-full flex flex-col gap-8 ${className}`}
    >
      {/* Başlık & Seçim Amacı */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-outline)]/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">hub</span>
            <span>Çift Çekirdekli (Dual-Core) Yönetim Mimarisi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            {districtName}&apos;de İhtiyacınız Olan Yönetim Modeli Hangisi?
          </h2>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1 max-w-2xl">
            {districtName} bölgesindeki mülkünüzün niteliğine göre optimize edilmiş kurumsal yönetim çözümlerimiz:
          </p>
        </div>

        {/* Bölgesel KPI Rozetleri */}
        {sharedKpis && sharedKpis.length > 0 && (
          <div className="flex items-center gap-3 self-start md:self-auto">
            {sharedKpis.slice(0, 2).map((kpi, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-xl px-3.5 py-2 text-center"
              >
                <div className="text-[10px] text-slate-500 uppercase font-semibold">{kpi.label}</div>
                <div className="text-xs sm:text-sm font-black text-brand-600 dark:text-brand-400">{kpi.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* İkili Kart Izgarası (Dual-Core Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SOL KART: B2C / Konut ve Site Yönetimi */}
        <div className="group relative bg-[var(--color-surface)] border-2 border-brand-500/20 hover:border-brand-500/50 rounded-[2.5rem] p-7 sm:p-9 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-500/10 text-brand-700 dark:text-brand-300 text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
            B2C &bull; Konut Yaşam Alanı
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5">
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">apartment</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[var(--color-primary)] mb-2">
              {districtName} Profesyonel Site Yönetimi
            </h3>

            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light leading-relaxed mb-6">
              634 Sayılı Kat Mülkiyeti Kanunu (KMK) standartlarında, Apsiyon mobil entegrasyonu ve %99.2 aidat tahsilat başarısıyla
              komşuluk huzurunu ve site değerini koruyan profesyonel yönetim.
            </p>

            {/* Bölgesel Odak Metrikleri */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-[var(--color-surface-variant)]/40 p-4 rounded-2xl border border-[var(--color-outline)]/40">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Yapı Profili</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {housingProfileLabels[siteCore.housingProfile] || 'Konut Siteleri'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Tahmini Konut Stoğu</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {siteCore.estimatedSiteCount}+ Site & Apartman
                </span>
              </div>
            </div>

            {/* İlçede En Sık Karşılaşılan KMK Problemleri */}
            {siteCore.dominantIssues && siteCore.dominantIssues.length > 0 && (
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                  {districtName}&apos;de Çözdüğümüz Öncelikli Sorunlar:
                </span>
                <div className="flex flex-wrap gap-2">
                  {siteCore.dominantIssues.map((issue, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      <span className="material-symbols-outlined text-[13px] text-brand-500" aria-hidden="true">
                        check_circle
                      </span>
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Aksiyon Butonları */}
          <div className="pt-4 border-t border-[var(--color-outline)]/40 flex flex-col sm:flex-row gap-3">
            <Link
              href="/hizmetler/site-yonetimi"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-all text-center"
            >
              <span>Site Yönetimi Hizmet Kapsamı</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
            <Link
              href="/teklif-al"
              className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-[var(--color-outline)] hover:bg-[var(--color-surface-variant)] text-xs font-semibold text-[var(--color-primary)] transition-all text-center"
            >
              Ücretsiz Keşif
            </Link>
          </div>
        </div>

        {/* SAĞ KART: B2B / Ticari Plaza ve Tesis Yönetimi */}
        <div className="group relative bg-[var(--color-surface)] border-2 border-indigo-500/20 hover:border-indigo-500/50 rounded-[2.5rem] p-7 sm:p-9 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
            B2B &bull; Ticari Gayrimenkul
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">corporate_fare</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[var(--color-primary)] mb-2">
              {districtName} Entegre Tesis Yönetimi
            </h3>

            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-light leading-relaxed mb-6">
              ISO 41001 standartlarında, HVAC/BMS otomasyonu, enerji verimliliği ve reaktif ceza korumasıyla
              ticari gayrimenkul işletme maliyetlerinde %30 tasarruf sağlayan kurumsal tesis yönetimi.
            </p>

            {/* Ticari Odak Metrikleri */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-[var(--color-surface-variant)]/40 p-4 rounded-2xl border border-[var(--color-outline)]/40">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Ticari Profil</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {commercialProfileLabels[facilityCore.buildingProfile] || 'Plaza & İş Merkezleri'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Ticari Bina Stoğu</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {facilityCore.estimatedCommercialCount}+ Plaza & Tesis
                </span>
              </div>
            </div>

            {/* B2B Tesis Çözümleri */}
            {facilityCore.b2bServices && facilityCore.b2bServices.length > 0 && (
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                  {districtName} Kurumsal İşletme Çözümleri:
                </span>
                <div className="flex flex-wrap gap-2">
                  {facilityCore.b2bServices.map((srv, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      <span className="material-symbols-outlined text-[13px] text-indigo-500" aria-hidden="true">
                        verified
                      </span>
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Aksiyon Butonları */}
          <div className="pt-4 border-t border-[var(--color-outline)]/40 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/bolgeler/${districtSlug}/tesis-yonetimi`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all text-center"
            >
              <span>{districtName} Tesis Yönetimi Detayları</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
            <Link
              href="/teklif-al"
              className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-[var(--color-outline)] hover:bg-[var(--color-surface-variant)] text-xs font-semibold text-[var(--color-primary)] transition-all text-center"
            >
              Kurumsal RFP Al
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
