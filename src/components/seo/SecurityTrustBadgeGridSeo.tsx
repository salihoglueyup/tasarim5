"use client";

import React from 'react';
import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';

interface TrustBadge {
  title: string;
  authority: string;
  licenseNo: string;
  description: string;
  icon: string;
}

interface SecurityTrustBadgeGridSeoProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_BADGES: TrustBadge[] = [
  {
    title: "Özel Güvenlik Şirketi Faaliyet İzin Belgesi",
    authority: "T.C. İçişleri Bakanlığı",
    licenseNo: "5188 Sayılı Kanun Kapsamında Onaylı",
    description: "5188 sayılı kanun uyarınca özel güvenlik personeli istihdam etme ve tesis koruma yasal yetki belgesi.",
    icon: "shield_with_heart"
  },
  {
    title: "Özel Güvenlik Hizmetleri Valilik Ruhsatı",
    authority: "T.C. İstanbul Valiliği",
    licenseNo: "Valilik Komisyon Onaylı Ruhsat",
    description: "İstanbul genelinde apartman, site, plaza ve etkinlik alanlarında koruma ve denetim icra izni.",
    icon: "verified_user"
  },
  {
    title: "Mesleki ve Mali Sorumluluk Sigortası",
    authority: "Hazine ve Maliye Bakanlığı Akredite",
    licenseNo: "Tam Kapsamlı Kusur ve Tazminat Teminatı",
    description: "Yönetilen tüm tesislerde personelden ve operasyondan kaynaklanabilecek zararları teminat altına alan kurumsal poliçe.",
    icon: "gavel"
  },
  {
    title: "TSE Hizmet Yeterlilik Belgesi (HYB)",
    authority: "Türk Standardları Enstitüsü (TSE)",
    licenseNo: "TSE HYB Standart No: 12850",
    description: "Tesis yönetimi ve güvenlik hizmetlerinde ulusal hizmet yeterlilik ve kalite uygunluk sertifikasyonu.",
    icon: "award_star"
  }
];

/**
 * 5188 Valilik İzin Belgesi & Yasal Güvenlik Şeması (SecurityTrustBadgeGridSeo)
 * 
 * Şirketin İçişleri Bakanlığı ve Valilik özel güvenlik izinlerini `GovernmentPermit`
 * ve `Certification` şemasıyla Google ve arama motorlarına tanıtır.
 */
export default function SecurityTrustBadgeGridSeo({
  title = "Yasal Ruhsatlar & Resmi Güvenlik Akreditasyonları",
  subtitle = "Alo Yönetim, 5188 sayılı Özel Güvenlik Kanunu ve 634 sayılı KMK kapsamında tam ruhsatlı çalışır.",
  className = ""
}: SecurityTrustBadgeGridSeoProps) {

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alo Yönetim ve Organizasyon A.Ş.',
    url: BASE_URL,
    hasCredential: DEFAULT_BADGES.map((b) => ({
      '@type': 'GovernmentPermit',
      name: b.title,
      permitAudience: {
        '@type': 'Audience',
        audienceType: 'Tesis ve Site Sakinleri'
      },
      validIn: {
        '@type': 'AdministrativeArea',
        name: 'İstanbul, Türkiye'
      },
      issuedBy: {
        '@type': 'GovernmentOrganization',
        name: b.authority
      }
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className={`my-10 ${className}`}>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>%100 Yasal Uygunluk & Sıfır Hukuki Risk</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-primary)]">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-[var(--color-secondary)] font-light mt-1">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEFAULT_BADGES.map((badge, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                  {badge.authority}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-2 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>{badge.licenseNo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
