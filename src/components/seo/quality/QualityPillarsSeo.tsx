import React from 'react';
import Link from 'next/link';
import { QUALITY_STANDARDS, type QualityStandardItem } from './qualityData';
export { QUALITY_STANDARDS, type QualityStandardItem };

export default function QualityPillarsSeo() {
  return (
    <section id="kalite-sutunlari" className="py-20 md:py-28 bg-[var(--color-background)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              TÜRKAK & Uluslararası Akreditasyon
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              6 Temel Kalite Standardı ve Akreditasyon Sütunumuz
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] max-w-lg font-light leading-relaxed">
            Alo Yönetim, apartman ve tesis yönetimini amatör inisiyatiflerden kurtararak 
            dünyanın en prestijli kalite sistemleriyle belgelenmiş kurumsal güvenceye kavuşturur.
          </p>
        </div>

        {/* 6 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {QUALITY_STANDARDS.map((std) => (
            <div
              key={std.id}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-cyan-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div>
                {/* Header Bar */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">{std.icon}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full border ${std.badgeBg}`}>
                    {std.badge}
                  </span>
                </div>

                {/* Standard Code & Title */}
                <div className="mb-3">
                  <span className="text-xs font-black tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
                    {std.code}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mt-0.5 leading-snug">
                    {std.title}
                  </h3>
                </div>

                {/* Scope Description */}
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed mb-5">
                  {std.scope}
                </p>

                {/* Key Deliverables */}
                <div className="pt-4 border-t border-[var(--color-outline)]/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-3">
                    Denetim ve Teslimat Kriterleri:
                  </div>
                  <ul className="space-y-2 text-xs text-[var(--color-primary)] font-medium">
                    {std.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-sm text-emerald-500 shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className="font-light leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Audit Frequency */}
              <div className="pt-4 mt-6 border-t border-[var(--color-outline)]/40 flex items-center justify-between text-[11px] text-[var(--color-secondary)]">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-xs text-amber-500">schedule</span>
                  {std.auditFrequency}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* TÜRKAK Verification Footer Note */}
        <div className="mt-12 p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-[var(--color-secondary)]">
            <span className="material-symbols-outlined text-cyan-600 dark:text-cyan-400 text-2xl shrink-0">
              verified_user
            </span>
            <span>
              Tüm kalite belgelerimiz <strong>TÜRKAK (Türk Akreditasyon Kurumu)</strong> ve uluslararası <strong>IAF (International Accreditation Forum)</strong> veri tabanları üzerinden karekod ile anlık sorgulanabilir.
            </span>
          </div>
          <Link
            href="/kurumsal/kalite-belgelerimiz"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-surface)] font-bold hover:opacity-90 transition-opacity"
          >
            Belgeleri Görüntüle
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
