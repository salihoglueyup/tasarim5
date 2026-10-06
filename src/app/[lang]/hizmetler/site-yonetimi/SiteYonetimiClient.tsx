"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import RelatedServices from '@/components/sections/trust/RelatedServices';
import SeoTextSection from '@/components/sections/trust/SeoTextSection';
import ServiceSeo from '@/components/seo/schema/ServiceSeo';
import AggregateRatingSeo from '@/components/seo/schema/AggregateRatingSeo';
import DynamicFAQ from '@/components/seo/schema/DynamicFAQ';
import HowToSeo from '@/components/seo/schema/HowToSeo';
import RelatedArticles from '@/components/blog/RelatedArticles';
import InstantAnswerCardSeo from '@/components/seo/ai-overviews/InstantAnswerCardSeo';
import FacilityComparisonMatrixSeo from '@/components/seo/facility/FacilityComparisonMatrixSeo';
import FacilityGroupSecurityTrustSeo from '@/components/seo/facility/FacilityGroupSecurityTrustSeo';
import IstanbulDuesHeatmapSeo from '@/components/seo/district/IstanbulDuesHeatmapSeo';
import ChecklistAuditSeo from '@/components/seo/facility/ChecklistAuditSeo';
import TrustVerificationAuditSeo from '@/components/seo/facility/TrustVerificationAuditSeo';
import FacilityCorporateSlaGuaranteesSeo from '@/components/seo/facility/FacilityCorporateSlaGuaranteesSeo';
import FacilityOperationalPillarsSeo from '@/components/seo/facility/FacilityOperationalPillarsSeo';
import SiteVsFacilityComparisonSeo from '@/components/seo/kmk/SiteVsFacilityComparisonSeo';
import FacilityLegalPrecedentsBrowserSeo from '@/components/seo/facility/FacilityLegalPrecedentsBrowserSeo';
import SiteAiSearchGroundingSeo from '@/components/seo/ai-overviews/SiteAiSearchGroundingSeo';
import SiteLegalClaimReviewsSeo from '@/components/seo/kmk/SiteLegalClaimReviewsSeo';
import KMKGlossaryEncyclopediaSeo from '@/components/seo/kmk/KMKGlossaryEncyclopediaSeo';
import ThreeWayManagementComparisonSeo from '@/components/seo/kmk/ThreeWayManagementComparisonSeo';
import KMKLegalDocumentVaultSeo from '@/components/seo/kmk/KMKLegalDocumentVaultSeo';
import { VoiceSearchSpeakableSeo } from '@/components/seo/schema/VoiceSearchSpeakableSeo';
import AcademicCitationBoxSeo from '@/components/seo/kmk/AcademicCitationBoxSeo';
import ServicePricingCatalogSeo from '@/components/seo/facility/ServicePricingCatalogSeo';
import KMKAuditProtocolSeo from '@/components/seo/kmk/KMKAuditProtocolSeo';
import ManagementTransitionRoadmapSeo from '@/components/seo/kmk/ManagementTransitionRoadmapSeo';
import KMKLegalDisputesQAPageSeo from '@/components/seo/kmk/KMKLegalDisputesQAPageSeo';
import KMKLegislationNavigatorSeo from '@/components/seo/kmk/KMKLegislationNavigatorSeo';
import KMKLegalNoticesVaultSeo from '@/components/seo/kmk/KMKLegalNoticesVaultSeo';
import PositionZeroAnswerBox from '@/components/seo/ai-overviews/PositionZeroAnswerBox';
import GoogleAiOverviewGroundingSeo from '@/components/seo/ai-overviews/GoogleAiOverviewGroundingSeo';
import ApsiyonLogo from '@/components/ui/branding/ApsiyonLogo';
import TrOnly from '@/components/seo/TrOnly';
import { localePath } from '@/lib/i18n/localePath';
import FacilityTestimonials from '@/components/sections/testimonials/FacilityTestimonials';

export default function SiteYonetimiClient() {
  const { t, language } = useLanguage();

  const legalSteps = [1, 2, 3, 4].map((n) => ({
    name: t(`sy_step_${n}_name` as Parameters<typeof t>[0]),
    text: t(`sy_step_${n}_text` as Parameters<typeof t>[0]),
  }));

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    question: t(`sy_faq_${n}_q` as Parameters<typeof t>[0]),
    answer: t(`sy_faq_${n}_a` as Parameters<typeof t>[0]),
  }));

  return (
    <>
      <ServiceSeo 
        serviceType={t('sy_svc_type')}
        description={t('sy_svc_desc')}
        areaServed={[
          "İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", 
          "Bakırköy", "Sarıyer", "Başakşehir", "Beylikdüzü", "Kartal", "Pendik", "Çekmeköy"
        ]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Site_y%C3%B6netimi"
      />

      <VoiceSearchSpeakableSeo
        cssSelectors={[
          '#site-management-instant-answer',
          '#site-management-hero-h1',
          '#site-management-kmk-summary'
        ]}
      />
      
      {/* 1. BÖLÜM: Hero & Değer Önerisi (Titanium, Deep Blue & Ice Accents) */}
      <div className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop" 
            alt={t('sy_hero_alt')} 
            fill 
            className="object-cover object-center opacity-25" 
            priority 
          />
        </div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Üst Rozet: KMK & Apsiyon Güvencesi */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
            <span>{t('sy_hero_badge')}</span>
          </div>

          <h1 
            id="site-management-hero-h1" 
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6"
          >
            {t('sy_hero_h1_pre')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-300 to-slate-300">{t('sy_hero_h1_hl')}</span>{t('sy_hero_h1_post')}
          </h1>

          <p 
            id="site-management-kmk-summary" 
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            {t('sy_hero_p')}
          </p>

          {/* CTA Buton Grubu */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link 
              href={localePath('/teklif-al', language)} 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-slate-600 to-slate-600 hover:from-slate-500 hover:to-slate-500 text-white font-bold text-base shadow-xl shadow-slate-900/30 hover:shadow-slate-900/40 transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              {t('sy_cta_quote')}
            </Link>
            <Link 
              href={localePath('/app', language)} 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 text-center"
            >
              <ApsiyonLogo width={90} height={20} className="text-white" />
              <span>{t('sy_cta_portal')}</span>
            </Link>
          </div>

          {/* 4 Temel Güven Metriği */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-slate-400">150+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{t('sy_metric_1')}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">%99.2</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{t('sy_metric_2')}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-slate-400">45 Dk</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{t('sy_metric_3')}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-slate-400">4.9 ★</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{t('sy_metric_4')}</div>
            </div>
          </div>
        </div>
      </div>

<TrOnly>
      {/* 2. BÖLÜM: Google Sıfırıncı Sıra (Featured Snippet) & Hızlı Yanıt Kartı */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        <PositionZeroAnswerBox
          id="site-yonetimi-nedir"
          answerId="site-instant-answer-text"
          question="Profesyonel Site Yönetimi Nedir ve Neleri Kapsar?"
          answer="Profesyonel site yönetimi; 634 Sayılı Kat Mülkiyeti Kanunu (KMK) kapsamında kat malikleri kurulunca onaylanan işletme projesinin yürütülmesi, %99.2 aidat tahsilat garantisi, 5188 lisanslı güvenlik, periyodik teknik bakım ve temizlik hizmetlerinin tek elden, şeffaf ve kurumsal olarak idare edilmesidir."
          standardBadge="634 Sayılı KMK & %99.2 Tahsilat"
          subText="Alo Yönetim, Apsiyon dijital entegrasyonu, KMK m.20 aylık %5 gecikme faizi takibi ve 45 dakika SLA acil teknik servisiyle sitelerde kusursuz huzur sağlar."
          accentColor="indigo"
          className="mb-8"
        />
        <div id="site-management-instant-answer">
          <InstantAnswerCardSeo
            question="Site yönetimi nedir ve neleri kapsar?"
            shortAnswer="Site yönetimi; 634 Sayılı Kat Mülkiyeti Kanunu (KMK) kapsamında çok bağımsız bölümlü konut siteleri ve apartmanların aidat tahsilatı, bütçe işletme projesi tanzimi, 5188 lisanslı fiziki güvenlik, asansör/hidrofor teknik bakımı, ortak alan temizliği ve yasal genel kurul süreçlerini tek elden yürüten profesyonel yönetim organizasyonudur."
            bulletPoints={[
              "634 Sayılı KMK Madde 34-40 kapsamında tam kanuni güvence ve işletme projesi tanzimi",
              "Apsiyon entegrasyonu ile 7/24 şeffaf banka hesapları, canlı gelir-gider dökümü ve online kartla ödeme",
              "KMK Madde 20 uyarınca geciken aidatlara aylık yasal %5 faiz işletimi ve hızlı icra takibi (%99.2 başarı)",
              "7/24 hazır bekleyen gezici mobil teknik servis ile 45 dakikada yerinde arıza müdahale garantisi"
            ]}
            lawArticle="634 Sayılı KMK Madde 34 & Madde 20"
          />
        </div>
      </div>
</TrOnly>

      {/* 3. BÖLÜM: 4 Adımlı Profesyonel Site Yönetimine Geçiş Süreci (HowToSeo) */}
      <div className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('sy_steps_title')}
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              {t('sy_steps_desc')}
            </p>
          </div>

          <HowToSeo
            name={t('sy_howto_name')}
            description={t('sy_howto_desc')}
            steps={legalSteps}
          />
        </div>
      </div>

<TrOnly>
      {/* 4. BÖLÜM: İstanbul 39 İlçe Aidat ve Yönetim Maliyeti Isı Haritası */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <IstanbulDuesHeatmapSeo />
        </div>
      </div>

      {/* 5. BÖLÜM: Site Yönetimi ile Tesis Yönetimi Arasındaki Fark Nedir? (SERP Tablosu) */}
      <div className="py-20 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteVsFacilityComparisonSeo currentPillar="site" />
        </div>
      </div>

      {/* 6. BÖLÜM: Geleneksel Yönetici vs Alo Yönetim Kıyaslama Matrisi */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FacilityComparisonMatrixSeo />
        </div>
      </div>

      {/* 7. BÖLÜM: 6 Operasyonel Temel Direk (Mali, Hukuki, Teknik, Güvenlik, Hijyen, Peyzaj) */}
      <div className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FacilityOperationalPillarsSeo />
        </div>
      </div>

      {/* 8. BÖLÜM: 5188 Güvenlik ve Kurumsal Güvence Paketi */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FacilityGroupSecurityTrustSeo />
        </div>
      </div>

      {/* 9. BÖLÜM: Kurumsal Hizmet Düzeyi Taahhütleri (SLA) */}
      <div className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FacilityCorporateSlaGuaranteesSeo />
        </div>
      </div>

      {/* 10. BÖLÜM: Doğrulama & Denetim Kontrol Listesi */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChecklistAuditSeo />
        </div>
      </div>

      {/* 11. BÖLÜM: Güven Doğrulama Denetimi */}
      <div className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustVerificationAuditSeo />
        </div>
      </div>

      {/* 11.5. BÖLÜM: 634 KMK Yargıtay Emsal Kararları ve Hukuk Kütüphanesi */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FacilityLegalPrecedentsBrowserSeo
            basePath="/hizmetler/site-yonetimi"
            title="Site ve Apartman Yönetiminde Yargıtay Emsal Kararları"
            badge="634 KMK & Yargıtay İçtihat Kütüphanesi"
            subtitle="Aidat borcu, asansör ortak giderleri, yönetici seçimi ve mimari tadilat ihtilaflarında bağlayıcı yüksek mahkeme kararları."
          />
        </div>
      </div>

      {/* 11.8. BÖLÜM: Yapay Zekaya Sorun (SearchGPT & Perplexity Doğrulanmış Prompt ve Yanıtlar) */}
      <div className="py-16 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteAiSearchGroundingSeo />
        </div>
      </div>

      {/* 11.9. BÖLÜM: Hukuki doğrulamalar */}
      <div className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteLegalClaimReviewsSeo />
        </div>
      </div>

      {/* 11.10. BÖLÜM: 3-Yönlü Yönetim Modeli Kıyaslama Matrisi (Bireysel vs Dışarıdan vs Alo Yönetim) */}
      <div className="py-16 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ThreeWayManagementComparisonSeo />
        </div>
      </div>

      {/* 11.11. BÖLÜM: Google Position Zero Hukuk Ansiklopedisi (DefinedTermSet & 52 Terim) */}
      <div className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <KMKGlossaryEncyclopediaSeo />
        </div>
      </div>

      {/* 11.12. BÖLÜM: KMK Karar & İhtarname Şablonları Resmi Kütüphanesi (DigitalDocument & Legislation) */}
      <div className="py-16 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <KMKLegalDocumentVaultSeo />
        </div>
      </div>

      {/* 11.13. BÖLÜM: Akademik & Hukuki Atıf Oluşturucu (ScholarlyArticle & Citation Authority Engine) */}
      <div className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AcademicCitationBoxSeo
            pageUrl="/hizmetler/site-yonetimi"
            pageTitle="634 Sayılı KMK ve ISO 41001 Standartlarında Profesyonel Site Yönetimi Uygulama Rehberi"
          />
        </div>
      </div>

      {/* 11.14. BÖLÜM: Şeffaf Hizmet & Fiyatlandırma Paket Kataloğu (OfferCatalog & PriceSpecification) */}
      <div className="py-16 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicePricingCatalogSeo
            pageUrl="/hizmetler/site-yonetimi"
            categoryFilter="residential"
          />
        </div>
      </div>

      {/* 11.15. BÖLÜM: KMK Madde 41 Denetim Kurulu Resmi Protokolü (HowTo & Audit Checklist) */}
      <div className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <KMKAuditProtocolSeo
            pageUrl="/hizmetler/site-yonetimi"
          />
        </div>
      </div>

      {/* 11.16. BÖLÜM: 48 Saatte Profesyonel Yönetime Devir Teslim Protokolü (Schema.org HowTo) */}
      <div className="py-16 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ManagementTransitionRoadmapSeo
            pageUrl="/hizmetler/site-yonetimi"
          />
        </div>
      </div>

      {/* 11.17. BÖLÜM: KMK Emsal Hukuki Uyuşmazlıklar & Uzman Çözüm Dizini (Schema.org QAPage) */}
      <div className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <KMKLegalDisputesQAPageSeo
            pageUrl="/hizmetler/site-yonetimi"
          />
        </div>
      </div>

      {/* 11.18. BÖLÜM: 634 Sayılı Kat Mülkiyeti Kanunu Madde Madde Mevzuat Gezgini (Schema.org Legislation) */}
      <div className="py-16 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <KMKLegislationNavigatorSeo />
        </div>
      </div>

      {/* 11.19. BÖLÜM: KMK Hukuki İhtarname ve Tutanak Şablon Kütüphanesi (DigitalDocument & Legislation) */}
      <div className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <KMKLegalNoticesVaultSeo />
        </div>
      </div>
</TrOnly>

      {/* 12. BÖLÜM: Sıkça Sorulan Sorular (DynamicFAQ & Schema.org FAQPage) */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('sy_faq_title')}
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              {t('sy_faq_desc')}
            </p>
          </div>
          <DynamicFAQ faqs={faqs} />
        </div>
      </div>

<TrOnly>
      {/* 12.5. BÖLÜM: Google AI Overviews, SGE & Gemini Grounding Otorite Merkezi */}
      <div className="py-8 px-4 max-w-6xl mx-auto">
        <GoogleAiOverviewGroundingSeo
          filterIds={['kmk37-itiraz', 'aidat-gecikme-faizi', '5188-ozel-guvenlik', 'kidem-tazminati', 'cam-balkon-onayi', 'ev-sarj-istasyonu']}
          title="Site Yönetiminde Yapay Zekaya Sorun: 634 Sayılı KMK Hukuku"
          subtitle="Google AI Overviews (SGE), Gemini ve Perplexity için doğrulanmış apartman/site yönetimi, aidat takibi ve kat malikleri kurulu yasal mevzuatı."
        />
      </div>
</TrOnly>

      {/* 13. BÖLÜM: Müşteri Referansları ve Yorumları */}
      <FacilityTestimonials />

      {/* 14. BÖLÜM: İlgili Hizmetler ve Çapraz İç Bağlantılar */}
      <div className="py-16 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedServices currentPath="/hizmetler/site-yonetimi" />
        </div>
      </div>

      {/* 15. BÖLÜM: İlgili Blog Yazıları & KMK Makaleleri */}
      <div className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedArticles pillar="site" />
        </div>
      </div>

      {/* 16. BÖLÜM: Alt Değerlendirme Puanı (AggregateRating) */}
      <div className="py-12 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AggregateRatingSeo
            itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Site Yönetimi' }}
            ratingValue={4.9}
            reviewCount={340}
          />
        </div>
      </div>
    </>
  );
}
