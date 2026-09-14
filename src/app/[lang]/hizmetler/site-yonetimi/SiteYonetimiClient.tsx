"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo, RelatedArticles } from '@/components';
import {
  InstantAnswerCardSeo,
  FacilityComparisonMatrixSeo,
  FacilityGroupSecurityTrustSeo,
  IstanbulDuesHeatmapSeo,
  ChecklistAuditSeo,
  TrustVerificationAuditSeo,
  FacilityCorporateSlaGuaranteesSeo,
  FacilityOperationalPillarsSeo,
  SiteVsFacilityComparisonSeo,
  FacilityLegalPrecedentsBrowserSeo,
  SiteAiSearchGroundingSeo,
  SiteLegalClaimReviewsSeo,
  KMKGlossaryEncyclopediaSeo,
  ThreeWayManagementComparisonSeo,
  KMKLegalDocumentVaultSeo,
  VoiceSearchSpeakableSeo,
  AcademicCitationBoxSeo,
  ServicePricingCatalogSeo,
  KMKAuditProtocolSeo,
  ManagementTransitionRoadmapSeo,
  KMKLegalDisputesQAPageSeo,
  KMKLegislationNavigatorSeo,
  KMKLegalNoticesVaultSeo,
} from '@/components/seo';
import ApsiyonLogo from '@/components/ui/ApsiyonLogo';
import FacilityTestimonials from '@/components/sections/FacilityTestimonials';

export default function SiteYonetimiClient() {
  const { t } = useLanguage();

  const legalSteps = [
    {
      name: '1. Ücretsiz Site Keşfi ve Mali Durum Analizi',
      text: 'Sitenizin fiziki, teknik altyapı, güvenlik, mevcut aidat borçluluk ve personel durumunu yerinde inceler, kat malikleri için kapsamlı durum raporu hazırlarız.'
    },
    {
      name: '2. KMK Madde 37 Uyumlu Şeffaf İşletme Projesi',
      text: '634 Sayılı KMK m.37 uyarınca yıllık tahmini gelir-gider bütçesini hazırlar, toplu satın alma gücümüzle aidatlarda %20-30 tasarruf hedefini netleştiririz.'
    },
    {
      name: '3. Genel Kurul Kararı ve Resmi Devir Teslim',
      text: 'Kat Malikleri Genel Kurulu veya Temsilciler Kurulu yetkilendirmesiyle noter onaylı devir teslim protokolünü işletir, eski borç-alacak mutabakatını sağlarız.'
    },
    {
      name: '4. Apsiyon Entegrasyonu ve 7/24 Kesintisiz Yönetim',
      text: 'Tüm sakinlere Apsiyon mobil erişim şifrelerini iletir; 5188 güvenlik, ortak alan temizliği ve 45 dk acil teknik müdahale operasyonunu tek elden başlatırız.'
    }
  ];

  const faqs = [
    {
      question: 'Site yönetimi şirketi ne iş yapar ve neleri kapsar?',
      answer: 'Profesyonel site yönetimi; 634 Sayılı Kat Mülkiyeti Kanunu (KMK) çerçevesinde aidat tahsilatı, bütçe işletme projesi hazırlama, 5188 lisanslı güvenlik personeli istihdamı, asansör ve jeneratör periyodik teknik bakımı, ortak alan temizliği, peyzaj bakımı ve genel kurul toplantı organizasyonunu tek elden yürütür.'
    },
    {
      question: 'Site yönetim şirketine geçmek aidatları düşürür mü?',
      answer: 'Evet. Alo Yönetim ile çalışan konut sitelerinde toplu malzeme alımı, asansör ve teknik servis sözleşmelerindeki kurumsal indirimler ve reaktif ceza önleyici enerji takibi sayesinde aidat işletme bütçelerinde %20 ile %30 arasında net tasarruf sağlanır.'
    },
    {
      question: 'Aidatını ödemeyen komşulara karşı yasal süreç nasıl işletilir?',
      answer: 'KMK Madde 20 uyarınca geciken aidatlara aylık yasal %5 gecikme tazminatı uygulanır. SMS ve WhatsApp hatırlatmalarına rağmen ödenmeyen borçlar için avukatlarımız aracılığıyla mahkeme kararı beklenmeksizin doğrudan ilamsız icra takibi (İİK m.68) başlatılır.'
    },
    {
      question: 'Amatör yönetimden profesyonel site yönetimine nasıl geçilir?',
      answer: 'Kat Malikleri Olağan veya Olağanüstü Genel Kurulu’nda toplantıya katılanların oy çokluğu veya yönetim planında belirtilen oranla profesyonel bir yönetim firmasıyla sözleşme imzalanması yönünde karar alınır. Devir teslim süreci Alo Yönetim uzmanlarınca 48 saatte tamamlanır.'
    },
    {
      question: 'KMK Madde 37 İşletme Projesi zorunlu mudur?',
      answer: 'Evet. Yöneticinin her takvim yılı için tahmini gelir ve giderleri, her kat malikinin arsa payına göre ödeyeceği aylık avans tutarını gösteren işletme projesini hazırlayıp tebliğ etmesi kanuni zorunluluktur. İtiraz edilmeyen proje icra takibine kesin delil teşkil eder.'
    },
    {
      question: 'Site sakinleri gelir-gider ve banka hesaplarını nasıl denetler?',
      answer: 'Alo Yönetim, Apsiyon altyapısı ile tam şeffaflık sunar. Her kat maliki ve kiracı Apsiyon mobil uygulaması üzerinden sitenin anlık banka bakiyesini, harcama faturalarını, ödenen aidatları ve denetim raporlarını 7/24 canlı olarak inceleyebilir.'
    },
    {
      question: 'Acil teknik arızalarda (asansör, hidrofor, su basması) müdahale süresi nedir?',
      answer: 'SLA taahhüdümüz kapsamında 7/24 hazır bekleyen mobil teknik acil servis ekiplerimiz en geç 45 dakika içinde arızaya yerinde müdahale eder.'
    },
    {
      question: '5188 sayılı güvenlik personeli yasal olarak nasıl temin edilir?',
      answer: 'Alo Yönetim, İçişleri Bakanlığı 5188 Sayılı Özel Güvenlik Hizmetleri Kanunu uyarınca valilik onaylı güvenlik izin belgesine ve kimlik kartına sahip resmi sertifikalı güvenlik görevlilerini yasal sorumlulukları üstlenerek görevlendirir.'
    }
  ];

  return (
    <>
      <ServiceSeo 
        serviceType="Site Yönetimi"
        description="İstanbul genelinde 634 Sayılı KMK uyumlu profesyonel site ve apartman yönetimi, Apsiyon mobil entegrasyonu, şeffaf aidat tahsilatı ve 5188 güvenlik hizmetleri."
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
            alt="Profesyonel Site ve Apartman Yönetimi - Alo Yönetim" 
            fill 
            className="object-cover object-center opacity-25" 
            priority 
          />
        </div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Üst Rozet: KMK & Apsiyon Güvencesi */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>634 Sayılı KMK Tam Hukuki Güvencesi & Apsiyon Entegre Sakin Portalı</span>
          </div>

          <h1 
            id="site-management-hero-h1" 
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6"
          >
            İstanbul Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">Site ve Apartman Yönetimi</span> Şirketi
          </h1>

          <p 
            id="site-management-kmk-summary" 
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            150+ Konut Sitesi ve 34.000+ Bağımsız Bölümde sıfır aidat kaosu, %99.2 tahsilat başarısı, 5188 lisanslı güvenlik, 45 dakika acil teknik servis ve %30 somut bütçe tasarrufu.
          </p>

          {/* CTA Buton Grubu */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link 
              href="/teklif-al" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-base shadow-xl shadow-blue-900/30 hover:shadow-cyan-900/40 transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              Ücretsiz Site Keşfi & Teklif Al →
            </Link>
            <Link 
              href="/app" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 text-center"
            >
              <ApsiyonLogo width={90} height={20} className="text-white" />
              <span>Mobil Portalı İncele</span>
            </Link>
          </div>

          {/* 4 Temel Güven Metriği */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">150+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Aktif Yönetilen Site</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">%99.2</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Yıllık Aidat Tahsilatı</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">45 Dk</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Acil Teknik Servis SLA</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">4.9 ★</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Apsiyon Sakin Puanı</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BÖLÜM: Google Sıfırıncı Sıra (Featured Snippet) & Hızlı Yanıt Kartı */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
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

      {/* 3. BÖLÜM: 4 Adımlı Profesyonel Site Yönetimine Geçiş Süreci (HowToSeo) */}
      <div className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Amatör Yönetimden Profesyonel Yönetime 4 Adımda Pürüzsüz Geçiş
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              Kat malikleri kurulunuzun aldığı karar sonrasında mevcut düzeniniz bozulmadan, hiçbir hizmette kesinti yaşanmadan 48 saatte devir teslim tamamlanır.
            </p>
          </div>

          <HowToSeo
            name="Profesyonel Site Yönetimine Geçiş Süreci"
            description="Kat Mülkiyeti Kanunu standartlarında amatör apartman yöneticiliğinden Alo Yönetim kurumsal hizmetine geçiş rehberi."
            steps={legalSteps}
          />
        </div>
      </div>

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

      {/* 11.9. BÖLÜM: Google Fact Check & AI Doğrulamaları (ClaimReview) */}
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

      {/* 12. BÖLÜM: Sıkça Sorulan Sorular (DynamicFAQ & Schema.org FAQPage) */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Site ve Apartman Yönetimi Sıkça Sorulan Sorular
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Kat Mülkiyeti Kanunu, aidat tahsilat süreçleri ve yönetim devrine dair merak ettiğiniz tüm yasal ve operasyonel cevaplar.
            </p>
          </div>
          <DynamicFAQ faqs={faqs} />
        </div>
      </div>

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
