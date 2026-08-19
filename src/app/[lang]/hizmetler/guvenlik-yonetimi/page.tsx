"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RelatedServices from '@/components/sections/RelatedServices';
import { 
  SeoTextSection, 
  ServiceSeo, 
  AggregateRatingSeo, 
  DynamicFAQ, 
  HowToSeo,
  SecurityTrustBadgeGridSeo,
  SecurityComparisonTableSeo,
  SecurityTechMatrixSeo,
  DistrictSecurityClusterSeo,
  InteractiveSecurityRiskRadarSeo,
  InstantAnswerCardSeo
} from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';
import { RelatedArticles } from '@/components';
import { generateBreadcrumbs, serviceSchema, faqPageSchema, webPageSchema } from '@/lib/schemas';
import SecurityCalculator from '@/components/sections/SecurityCalculator';
import SecurityTestimonials from '@/components/sections/SecurityTestimonials';
import EmergencyDisasterAuditSeo from '@/components/seo/EmergencyDisasterAuditSeo';

export default function GuvenlikYonetimi() {
  const { t } = useLanguage();

  const securityFeatures = [
    {
      title: t('sec_feat_1_title') || '5188 Lisanslı Özel Güvenlik',
      desc: t('sec_feat_1_desc') || 'Emniyet Genel Müdürlüğü ve Valilik onaylı, 5188 sayılı kanun kapsamında yetkilendirilmiş uzman güvenlik personeli.',
      icon: "verified_user",
      color: "from-slate-700 to-slate-900"
    },
    {
      title: t('sec_feat_2_title') || '7/24 CCTV & Kamera İzleme Merkezi',
      desc: t('sec_feat_2_desc') || 'Kör nokta bırakmayan yüksek çözünürlüklü IP kamera sistemleri, yapay zeka destekli hareket ve sınır ihlal alarmları.',
      icon: "center_focus_strong",
      color: "from-slate-600 to-slate-800"
    },
    {
      title: t('sec_feat_3_title') || 'Plaka Tanıma & Turnike Geçiş Sistemi',
      desc: t('sec_feat_3_desc') || 'Site sakinleri ve misafir araçlar için otomatik PTS (Plaka Tanıma Sistemi) ve RFID kartlı/biyometrik yaya geçiş kontrolü.',
      icon: "qr_code_scanner",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: t('sec_feat_4_title') || 'Devriye Tur Kontrol ve Raporlama',
      desc: t('sec_feat_4_desc') || 'Karekodlu ve GPS destekli gece/gündüz devriye turları ile ortak alanların, otoparkların ve çevre duvarlarının anlık denetimi.',
      icon: "shield_person",
      color: "from-purple-500 to-fuchsia-600"
    },
    {
      title: t('sec_feat_5_title') || 'Yangın & Acil Durum Tahliye Yönetimi',
      desc: t('sec_feat_5_desc') || 'Sığınak, yangın merdiveni ve kaçış yollarının sürekli açık tutulması; periyodik tahliye tatbikatları ve kriz yönetimi.',
      icon: "videocam",
      color: "from-red-500 to-rose-600"
    },
    {
      title: t('sec_feat_6_title') || 'Hızlı Müdahale ve Emniyet Koordinasyonu',
      desc: t('sec_feat_6_desc') || 'Olası asayiş, hırsızlık veya acil sağlık durumlarında polis ve 112 acil çağrı merkezleriyle entegre alarm protokolü.',
      icon: "emergency",
      color: "from-slate-600 to-slate-800"
    }
  ];

  const securitySteps = [
    { name: '1. Güvenlik ve Risk Analizi Keşfi', text: 'Sitenizin çevre duvarları, kapı girişleri, otopark ve kör noktaları yerinde incelenir; detaylı güvenlik açığı raporu çıkarılır.' },
    { name: '2. 5188 Sayılı Kanun İzin & Valilik Süreci', text: 'Özel güvenlik komisyonu onayları, valilik izin belgeleri ve güvenlik noktası planlaması yasal mevzuata tam uyumlu hazırlanır.' },
    { name: '3. Lisanslı ve Üniformalı Personel Görevlendirmesi', text: 'Sabıka kaydı temiz, fiziki ve psikolojik testlerden geçmiş, yangın ve ilk yardım sertifikalı profesyonel güvenlik ekibi atanır.' },
    { name: '4. 7/24 Dijital Devriye ve Denetim', text: 'GPS destekli tur kontrol kalemi, plaka tanıma sistemi ve nöbetçi amir teftişleri ile sıfır güvenlik zafiyeti sağlanır.' }
  ];

  const faqs = [
    {
      question: 'Sitemizde özel güvenlik görevlendirmek için yasal prosedür nedir?',
      answer: '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca, sitede özel güvenlik istihdam edilebilmesi için İl Özel Güvenlik Komisyonu\'na başvuru yapılarak Valilik izni alınmalıdır. Alo Yönetim olarak tüm başvuru, izin ve onay süreçlerini site adına anahtar teslim yürütüyoruz.'
    },
    {
      question: 'Güvenlik görevlilerinin yetki ve sorumlulukları nelerdir?',
      answer: 'Güvenlik görevlileri 5188 sayılı kanun kapsamında; siteye giriş yapan ziyaretçilerin kimlik kontrolünü yapma, eşyaları X-ray/dedektörden geçirme, suçüstü durumunda yakalama ve genel kolluk kuvvetlerine teslim etme yetkisine sahiptir.'
    },
    {
      question: 'Gece devriyeleri ve nöbet denetimleri nasıl yapılıyor?',
      answer: 'Güvenlik personeli belirlenen kritik noktalardaki RFID/QR devriye istasyonlarını saat başı okutur. Turlar dijital yönetim panelimize anlık aktarılır; nöbet uykusu veya tur aksaması yaşanmaması için merkez denetim ekiplerimizce habersiz gece teftişleri yapılır.'
    },
    {
      question: 'Güvenlik kameraları ve kayıt saklama süresi nedir?',
      answer: 'Site ortak alan güvenlik kameraları 7/24 kesintisiz kayıt altına alınır. KVKK (Kişisel Verilerin Korunması Kanunu) Aydınlatma Metni çerçevesinde görüntüler şifreli NVR sunucularında en az 30 gün yasal saklama süresiyle muhafaza edilir.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4 } }
  };

  const breadcrumbLd = generateBreadcrumbs([
    { name: t('nav_home') || 'Anasayfa', url: '/' },
    { name: t('nav_all_services') || 'Hizmetler', url: '/hizmetler' },
    { name: t('sec_title') || 'Güvenlik Yönetimi', url: '/hizmetler/guvenlik-yonetimi' }
  ]);

  const serviceLd = serviceSchema({
    serviceType: 'Profesyonel Güvenlik Yönetimi',
    path: '/hizmetler/guvenlik-yonetimi',
    description: '5188 sayılı Özel Güvenlik Kanunu uyumlu, 7/24 CCTV kamera takibi, plaka tanıma ve lisanslı güvenlik personeli ile profesyonel site güvenlik yönetimi.',
    offerCatalogName: 'Özel Güvenlik ve Tesis Emniyet Hizmetleri',
    offers: securityFeatures.map((f) => ({ name: f.title, description: f.desc })),
    sameAs: 'https://tr.wikipedia.org/wiki/%C3%96zel_g%C3%BCvenlik_g%C3%B6revlisi',
  });

  const faqLd = faqPageSchema(faqs);

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, faqLd, webPageSchema({ path: '/hizmetler/guvenlik-yonetimi', speakableSelectors: ['h1', '#speakable-content'] })]} />
      <ServiceSeo 
        serviceType="Profesyonel Güvenlik Yönetimi"
        description="5188 sayılı Özel Güvenlik Kanunu uyumlu, 7/24 CCTV kamera takibi, plaka tanıma ve lisanslı güvenlik personeli ile profesyonel site güvenlik yönetimi."
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Başakşehir", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/%C3%96zel_g%C3%BCvenlik_g%C3%B6revlisi"
      />
      
      {/* Immersive Full-Width Hero */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        </div>
        
        {/* Radar Animation embedded in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 mix-blend-screen z-0 hidden md:block">
            <div className="absolute inset-0 border border-slate-400/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-16 border border-slate-300/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            <div className="absolute inset-32 border border-slate-200/40 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />
            <div className="absolute inset-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent origin-left animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <div className="relative z-20 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-sm font-bold text-slate-300 bg-slate-500/10 border border-slate-500/20 px-6 py-2 rounded-full backdrop-blur-md tracking-wider uppercase">
              {t('sec_banner_badge') || '5188 Sayılı Kanun Güvencesi'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: `${t('sec_banner_title_1') || 'Profesyonel'} <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">${t('sec_banner_title_highlight') || 'Güvenlik Yönetimi'}</span> ${t('sec_banner_title_2') || 've Tesis Emniyeti'}` }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: 'Alo Yönetim - Profesyonel Güvenlik Yönetimi' }}
              ratingValue={4.9}
              reviewCount={284}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('sec_banner_desc') || 'Sertifikalı güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri ile sitenizi veya tesisinizi güvence altına alıyoruz.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('sec_banner_box_btn') || 'Ücretsiz Güvenlik Keşfi'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Security Calculator */}
        <div className="-mt-32 relative z-30">
          <SecurityCalculator />
        </div>

        {/* 5188 Yasal Ruhsatlar & Akreditasyon Şeması */}
        <SecurityTrustBadgeGridSeo />

        {/* 6 Bento Grid Cards with Staggered Animation */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('sec_grid_title') || 'Entegre Güvenlik Standartlarımız'}</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light mt-4">{t('sec_grid_desc') || '5188 sayılı kanun standartlarında, teknoloji ve disiplin odaklı koruma kalkanı.'}</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {securityFeatures.map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-5 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden relative"
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-2xl`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary)] relative z-10">{f.title}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed relative z-10">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* İnteraktif 5188 Güvenlik & Risk Analiz Testi */}
        <InteractiveSecurityRiskRadarSeo />

        {/* Karar Matrisi: Bireysel Bekçi vs 5188 Lisanslı Özel Güvenlik */}
        <SecurityComparisonTableSeo />

        {/* Yapay Zeka & Donanım Teknolojileri Ekosistemi */}
        <SecurityTechMatrixSeo />

        {/* Güvenlik Akademisi E-E-A-T Spotlight Kartı */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-700/50 rounded-[3rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-slate-300">
              <span className="material-symbols-outlined text-sm">school</span>
              <span>Kendi Akademimizde Yetişen Uzman Kadro</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Alo Güvenlik Akademisi: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Sürekli Hizmet İçi Eğitim Güvencesi</span>
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
              Tesislerinizde görev alan tüm özel güvenlik personeli; 5188 mevzuat, yangın söndürme, ilk yardım, yakın savunma, şüpheli profil analizi ve etkili iletişim eğitimlerini akademimizde tamamlar.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">✓ 5188 Kanun Eğitimi</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">✓ AFAD Yangın Tatbikatı</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">✓ Sağlık Bakanlığı İlk Yardım</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">✓ Kriz & Öfke Kontrolü</span>
            </div>
          </div>
          <div className="relative z-10 shrink-0">
            <Link 
              href="/guvenlik-akademisi" 
              className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-3 text-sm"
            >
              <span>Akademi Müfredatını İnceleyin</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* 4-Step HowTo Process */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name="5188 Sayılı Kanun Uyumlu Site Güvenlik Kurulum Süreci"
            description="Site ve tesislerde özel güvenlik hizmetine geçiş ve operasyonel entegrasyon için 4 adımlı standart sürecimiz."
            steps={securitySteps}
          />
        </div>

        {/* Afet, Yangın & Sığınak Güvenliği Denetim Motoru */}
        <EmergencyDisasterAuditSeo />

        {/* İstanbul İlçelerine Göre Güvenlik Kümeleri */}
        <DistrictSecurityClusterSeo />

        {/* Google AI Overviews & Doğrudan Yanıt Kartları (Featured Snippet) */}
        <div className="space-y-8">
          <InstantAnswerCardSeo 
            question="Site ve Apartmanlara Özel Güvenlik Nasıl Tutulur?"
            shortAnswer="Site ve apartmanlarda özel güvenlik personeli istihdam etmek için 5188 Sayılı Kanun uyarınca kat malikleri genel kurul kararı alınmalı ve İl Valiliği Özel Güvenlik Komisyonu'na başvuru yapılmalıdır. Valilik Özel Güvenlik İzni (ÖGİ) onaylandıktan sonra lisanslı bir özel güvenlik şirketi ile sözleşme imzalanarak hizmet başlatılır."
            bulletPoints={[
              "Genel kurulda oy çokluğu ile özel güvenlik istihdam kararı alınır.",
              "İl Valiliği Özel Güvenlik Komisyonu'na ÖGİ ruhsat başvurusu yapılır.",
              "5188 faaliyet izin belgeli kurumsal özel güvenlik şirketi seçilir.",
              "Görev yapacak personelin adli sicil ve Özel Güvenlik Kimlik Kartı doğrulanır.",
              "Zorunlu Mali Sorumluluk Sigortası poliçesi düzenlenerek nizamiyede görev başlar."
            ]}
            lawArticle="5188 Sayılı Kanun Madde 3, 7 ve 21"
            verifiedBy="Alo Yönetim Hukuk & Güvenlik Operasyon Masası"
            lastUpdated="2026 Güncel"
            category="5188 Özel Güvenlik Mevzuatı"
          />

          <InstantAnswerCardSeo 
            question="Özel Güvenlik Görevlilerinin Yasal Yetkileri Nelerdir?"
            shortAnswer="Özel güvenlik görevlileri, 5188 Sayılı Kanun Madde 7 uyarınca koruma alanına giren kişilerin kimliklerini sorma, duyarlı kapı veya dedektörle üst/bagaj arama, suçüstü halinde şüpheliyi yakalama ve olay yerindeki delilleri muhafaza ederek derhal genel kolluğa (Polis/Jandarma) teslim etme yetkisine sahiptir."
            bulletPoints={[
              "Site girişlerinde kimlik kontrolü ve ziyaretçi kayıt defteri tutma yetkisi.",
              "Metal dedektörü, X-ray ve el dedektörü ile eşyaları tarama hakkı.",
              "Hırsızlık, saldırı veya suç anında şüpheliyi yakalama ve kolluğa teslim etme yetkisi.",
              "Yangın, deprem gibi acil durumlarda tesise girme ve tahliyeyi yönetme yetkisi."
            ]}
            lawArticle="5188 Sayılı Kanun Madde 7 (Özel Güvenlik Görevlilerinin Yetkileri)"
            verifiedBy="Alo Yönetim Hukuk & Güvenlik Operasyon Masası"
            lastUpdated="2026 Güncel"
            category="Yasal Yetki ve Sorumluluklar"
          />
        </div>

        {/* Security Specific Social Proof */}
        <SecurityTestimonials />

        {/* Dynamic FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('sec_faq_title') || 'Güvenlik Yönetimi Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      <SeoTextSection
        titleKey="guvenlik_seo_title"
        p1Key="guvenlik_seo_p1"
        p2Key="guvenlik_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/guvenlik-yonetimi" />
      <RelatedArticles pillar="/hizmetler/guvenlik-yonetimi" />
    </>
  );
}



