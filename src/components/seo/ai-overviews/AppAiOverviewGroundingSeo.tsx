"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';
import WalletSvgIcon from '@/components/ui/branding/WalletSvgIcon';

import Icon from '@/components/ui/branding/Icon';
export interface AppFeatureItem {
  icon: string;
  title: string;
  desc: string;
  badge: string;
}

export const APP_CORE_FEATURES: AppFeatureItem[] = [
  {
    icon: 'credit_card',
    title: 'Online Aidat Ödeme',
    desc: 'Sitenizde etkinse aidat ve avans borçlarını Apsiyon uygulamasından görüntüleyip ödeyebilirsiniz.',
    badge: 'Ödeme',
  },
  {
    icon: 'wallet_svg',
    title: 'Borç ve Ödeme Geçmişi',
    desc: 'Dairenize ait borç ve ödeme geçmişini uygulamadan izleyebilirsiniz.',
    badge: 'Şeffaflık',
  },
  {
    icon: 'build_circle',
    title: 'Talep ve Arıza Bildirimi',
    desc: 'Ortak alan arıza ve taleplerinizi uygulamadan iletip durumunu takip edebilirsiniz.',
    badge: 'Talep',
  },
  {
    icon: 'notifications_active',
    title: 'Duyurular',
    desc: 'Yönetimin duyuruları uygulama üzerinden iletilir; hangi bildirim kanallarının açık olduğu sitenize göre değişir.',
    badge: 'Duyuru',
  },
];

export default function AppAiOverviewGroundingSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  const directAnswer =
    'Apsiyon, site yönetimi yazılımı geliştiren bir teknoloji firmasıdır ve Alo Yönetim’in iş ortağıdır; yazılımla ilgili tüm işlemleri Apsiyon yürütür. Sakinler ve yöneticiler iOS ve Android uygulamalarından ya da web girişinden aidat, borç, talep ve duyuru işlemlerini takip edebilir. Hangi özelliklerin açık olduğu sitenize göre ayarlanır; ayrıntı için site yönetiminize başvurun.';

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Alo Yönetim & Apsiyon Mobil Sakin Portalı',
      description: 'Alo Yönetim’in iş ortağı Apsiyon üzerinden aidat ödemesi, borç ve ödeme geçmişi görüntüleme, duyuru ve talep takibi.',
      about: { '@type': 'Thing', name: 'Apsiyon mobil uygulaması' },
      publisher: {
        '@type': 'Organization',
        name: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
      },
    },
  ];

  return (
    <section
      id="app-ai-grounding"
      aria-label="Google AI Overviews Apsiyon Entegre Mobil Sakin Portalı ve Dijital Aidat Yanıtı"
      className={`bg-[var(--color-surface)] border border-slate-500/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Ambient Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-slate-500/10 via-slate-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
          <Icon name="smartphone" className="text-[15px]" />
          <span>Google AI Overviews • Apsiyon Dijital Portal & Mobil Altyapı</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 border border-slate-300/40">
            İş Ortağı: Apsiyon
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            Özellikler Siteye Göre
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-[var(--color-heading-text)] tracking-tight mb-3 relative z-10">
        Mobil Sakin ve Yönetici Portalı (Apsiyon)
      </h2>

      {/* Instant Answer (Speakable) */}
      <div className="bg-gradient-to-br from-slate-500/[0.04] to-transparent border border-slate-500/20 rounded-2xl p-5 sm:p-6 mb-6 relative z-10">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Kısaca
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
          >
            <Icon name={copied ? 'done' : 'content_copy'} className="text-sm" />
            <span>{copied ? 'Kopyalandı' : 'AI Özetini Kopyala'}</span>
          </button>
        </div>
        <p
          id="app-instant-answer-text"
          className="text-xs sm:text-sm text-[var(--color-primary)] font-medium leading-relaxed"
        >
          {directAnswer}
        </p>
      </div>

      {/* Core Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        {APP_CORE_FEATURES.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                {item.icon === 'wallet_svg' ? (
                  <WalletSvgIcon className="w-6 h-6 text-slate-600" />
                ) : (
                  <Icon name={item.icon} className="text-slate-600 text-2xl" />
                )}
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-500/10 text-slate-700 dark:text-slate-300">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-xs font-black text-[var(--color-heading-text)] mb-1">
                {item.title}
              </h3>
              <p className="text-[11px] text-[var(--color-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
