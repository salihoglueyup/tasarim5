"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Faq } from '@/components';
import ItemListSeo from '@/components/seo/schema/ItemListSeo';
import {
  ServicesHeroSeo,
  ServicesBentoGridSeo,
  ALL_SERVICES_CATALOG,
  ServicesMatcherSeo,
  ServicesVideoHubSeo,
  DynamicPriceOfferSeo,
  ServiceComparisonMatrixSeo,
  MevzuatReferenceSeo,
  InstantAnswerCardSeo,
  ServiceAuthorityHubSeo,
} from '@/components/seo';

interface HizmetlerClientProps {
  lang?: string;
}

export default function HizmetlerClient({ lang = 'tr' }: HizmetlerClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Structured schema carousel items covering all 10 services
  const carouselItems = ALL_SERVICES_CATALOG.map((s) => ({
    name: s.title,
    url: `https://aloyonetim.com${s.slug}`,
    description: s.desc,
  }));

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Schema.org ItemList Microdata */}
      <ItemListSeo items={carouselItems} />

      {/* 1. Hero Section with Search & Trust Metrics */}
      <ServicesHeroSeo
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. 10 Services Bento Grid (Flagship Tier + Specialized Operations) */}
      <ServicesBentoGridSeo searchQuery={searchQuery} />

      {/* 3. Interactive Solution Matcher (Wizard) */}
      <ServicesMatcherSeo />

      {/* 4. Multimodal Operational Video Grounding Hub */}
      <ServicesVideoHubSeo lang={lang} />

      {/* 5. Package Pricing & Comparison Matrix */}
      <section className="py-20 md:py-28 bg-[var(--color-background)] border-b border-[var(--color-outline)]/60">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-4">
              <span className="material-symbols-outlined text-sm">compare_arrows</span>
              Şeffaf Fiyatlandırma ve Karşılaştırma
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
              Hizmet Paketleri ve Çözüm Seçenekleri
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-secondary)] font-light leading-relaxed">
              İhtiyacınıza uygun ölçekteki paketi seçebilir, geleneksel amatör yönetimlerle 
              kurumsal Alo Yönetim modeli arasındaki farkları inceleyebilirsiniz.
            </p>
          </div>

          {/* Dynamic Price Offers */}
          <div className="mb-20">
            <DynamicPriceOfferSeo serviceName="Alo Yönetim Profesyonel Tesis Yönetimi" />
          </div>

          {/* Traditional vs Alo Yönetim Matrix */}
          <div>
            <ServiceComparisonMatrixSeo />
          </div>
        </div>
      </section>

      {/* 6. Regulatory Grounding, Instant Answers & E-E-A-T Authority */}
      <section className="py-20 md:py-28 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/60">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
              <span className="material-symbols-outlined text-sm">policy</span>
              Hukuki Güvence ve Mevzuat Standartları
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
              Resmi Mevzuat ve Tesis Standartları
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-secondary)] font-light leading-relaxed">
              Kat Mülkiyeti Kanunu ve 5188 Sayılı Özel Güvenlik Kanunu hükümlerine tam uyumlu yönetim protokolleri.
            </p>
          </div>

          {/* KMK Reference Card */}
          <div className="mb-12">
            <MevzuatReferenceSeo
              kanunAdi="634 Sayılı Kat Mülkiyeti Kanunu"
              maddeNo="Madde 20 & 37"
              maddeBasligi="Ortak Gider Paylaşımı ve İşletme Projesi Zorunluluğu"
              orijinalMetin="Kat maliklerinden her biri aralarında başka türlü anlaşma olmadıkça: Kapıcı, kaloriferci, bahçıvan ve bekçi giderlerine ve bunlar için toplanacak avansa eşit olarak katılmakla yükümlüdür. Yönetici veya yönetim kurulu, kat malikleri kurulunca kabul edilmiş bir işletme projesi yoksa gecikmeksizin bir işletme projesi yapar."
              uzmanYorumu="Alo Yönetim, yönettiği tüm bağımsız bölümlerde KMK standartlarında dijital işletme projesi hazırlayarak tebliğ eder ve aidat tahsilat oranını %98'in üzerine çıkarır."
            />
          </div>

          {/* Google Featured Snippet Instant Answer */}
          <div className="mb-16">
            <InstantAnswerCardSeo
              question="Site ve Apartman Yönetimi Hizmetleri Neleri Kapsar?"
              shortAnswer="Profesyonel site yönetimi; 5188 sayılı kanun kapsamında 7/24 özel güvenlik, ortak alan temizliği, asansör ve jeneratör periyodik teknik bakımı, peyzaj sulama, havuz hijyeni ve KMK 37 uyarınca aidat takibi ile hukuk danışmanlığını tek çatı altında kapsayan entegre tesis işletmesidir."
              bulletPoints={[
                '5188 Sayılı Kanun Uyumlu 7/24 Fiziki Güvenlik ve Plaka Tanıma Sistemi (PTS)',
                'Kazan Dairesi, Asansör, Hidrofor ve Yangın Sistemleri Periyodik Bakımı',
                'Sertifikalı Personelle Günlük Blok Temizliği ve Çöp Toplama Hizmeti',
                'Şeffaf KMK İşletme Projesi, Mobil Sakin Aidat Takip Paneli ve İcra Danışmanlığı',
              ]}
              lawArticle="634 Sayılı Kat Mülkiyeti Kanunu & 5188 Sayılı Özel Güvenlik Kanunu"
              category="Entegre Tesis Yönetimi"
            />
          </div>

          {/* E-E-A-T Service Authority Hub */}
          <div>
            <ServiceAuthorityHubSeo
              serviceName="Site, Rezidans ve Tesis Yönetim Hizmetleri"
              serviceCategory="Entegre Tesis İşletmesi"
              lawReferences={[
                {
                  title: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
                  sourceName: 'T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi',
                  url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
                  badge: 'KMK 634',
                  description:
                    'Kat malikleri hakları, aidat ödeme zorunlulukları, işletme projeleri ve apartman/site yöneticisinin kanuni yetki ve görevleri.',
                },
                {
                  title: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
                  sourceName: 'T.C. İçişleri Bakanlığı & EGM',
                  url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5',
                  badge: '5188 Sayılı Kanun',
                  description:
                    'Özel güvenlik görevlisi istihdamı, valilik komisyon izinleri, üniforma ve yetki kuralları.',
                },
                {
                  title: 'ISO 41001:2018 & TSE HYB 12850 Tesis Yönetim Standartları',
                  sourceName: 'Türk Standardları Enstitüsü (TSE)',
                  url: 'https://www.tse.org.tr',
                  badge: 'ISO 41001 & TSE',
                  description:
                    'Entegre tesis yönetimi hizmet yeterlilik kuralları, kalite yönetim sistemleri ve operasyonel verimlilik kriterleri.',
                },
              ]}
              glossaryTerms={[
                {
                  slug: 'kat-mulkiyeti-kanunu-kmk',
                  term: 'Kat Mülkiyeti Kanunu (KMK)',
                  summary:
                    'Toplu yaşam alanlarında maliklerin ve kiracıların hak ve borçlarını düzenleyen ana mevzuattır.',
                },
                {
                  slug: 'aidat',
                  term: 'Aidat ve Avans Dağıtımı',
                  summary:
                    'Ortak alan işletme, temizlik, güvenlik ve teknik masrafların bağımsız bölümlere paylaştırılmasıdır.',
                },
                {
                  slug: '5188-sayili-kanun',
                  term: '5188 Özel Güvenlik Mevzuatı',
                  summary:
                    'Fiziki güvenlik, CCTV izleme ve plaka tanıma sistemlerinin yasal altyapısını oluşturan kanundur.',
                },
                {
                  slug: 'isletme-projesi',
                  term: 'Resmi İşletme Projesi',
                  summary:
                    'Yıllık tahmini site bütçesi ve her bağımsız bölümün aylık ödeme planını içeren belgedir.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20 md:py-28 bg-[var(--color-background)] border-b border-[var(--color-outline)]/60">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <Faq />
        </div>
      </section>

      {/* 8. Modern Bottom Conversion CTA Banner */}
      <section className="py-20 md:py-28 bg-[var(--color-surface)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 border border-blue-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-4">
                <span className="material-symbols-outlined text-sm">schedule</span>
                24 Saat İçinde Ücretsiz Keşif
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                Sitenizin Bütçesini ve Güvenliğini Ücretsiz Analiz Edelim
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
                Mühendis ve yönetim uzmanlarımız sitenizi ziyaret etsin; asansör, jeneratör, 
                güvenlik ve aidat tahsilat açıklarını ücretsiz raporlayıp 24 saat içinde 
                sitenize özel teklif sunalım.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                  <span>Gizli Maliyet Yok</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                  <span>KMK m.34 Yasal Sözleşme</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                  <span>Bağlayıcılığı Olmayan Ücretsiz Rapor</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <Link
                href="/teklif-al"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-102 text-center"
              >
                Ücretsiz Yönetim Keşfi İste 🚀
              </Link>
              <Link
                href="/hesaplayici"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all text-center"
              >
                Aidat Hesapla 📊
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
