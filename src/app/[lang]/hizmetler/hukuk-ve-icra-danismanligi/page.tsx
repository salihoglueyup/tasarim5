"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection } from '@/components';
import { Card, Badge, Button } from '@/components';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { generateBreadcrumbs } from '@/lib/schemas';

export default function HukukVeIcraDanismanligi() {
  const { t } = useLanguage();

  const legalPoints = [
    {
      title: t('legal_feat_1_title'),
      desc: t('legal_feat_1_desc'),
      icon: "gavel"
    },
    {
      title: t('legal_feat_2_title'),
      desc: t('legal_feat_2_desc'),
      icon: "balance"
    },
    {
      title: t('legal_feat_3_title'),
      desc: t('legal_feat_3_desc'),
      icon: "groups"
    },
    {
      title: t('legal_feat_4_title'),
      desc: t('legal_feat_4_desc'),
      icon: "history_edu"
    }
  ];

  const faqs = [
    {
      q: t('legal_faq_1_q'),
      a: t('legal_faq_1_a')
    },
    {
      q: t('legal_faq_2_q'),
      a: t('legal_faq_2_a')
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('nav_all_services'), url: '/hizmetler' },
    { name: t('legal_title'), url: '/hizmetler/hukuk-ve-icra-danismanligi' }
  ]);

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Hukuk ve İcra Danışmanlığı',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Alo Yönetim'
    },
    areaServed: {
      '@type': 'State',
      name: 'İstanbul'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hukuk ve İcra Hizmetleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Aidat İcra Takibi'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Yönetim Hukuk Danışmanlığı'
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <PageHeader 
        title={t('legal_title')} 
        description={t('legal_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-[#1e293b] to-[#0f172a] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <Badge status="neutral">{t('legal_banner_badge')}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              {t('legal_banner_title')}
            </h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              {t('legal_banner_desc')}
            </p>
          </div>
          <Link href="/teklif-al">
            <Button variant="primary" size="lg" className="bg-slate-700 hover:bg-slate-600 text-white shrink-0">
              {t('legal_banner_btn')}
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legalPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

        {/* SSS Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">{t('legal_faq_title')}</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-slate-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="p-6 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10 text-sm text-[var(--color-secondary)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

