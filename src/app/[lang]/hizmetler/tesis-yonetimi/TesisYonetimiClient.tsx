"use client";

import RelatedServices from '@/components/sections/RelatedServices';
import { SeoTextSection, ServiceSeo, AggregateRatingSeo, DynamicFAQ, HowToSeo } from '@/components';
import {
  InstantAnswerCardSeo,
  InteractiveFacilityAuditRadarSeo,
  FacilityComparisonMatrixSeo,
  FacilityLegalTemplateGeneratorSeo,
} from '@/components/seo';
import CaseStudySeo from '@/components/seo/CaseStudySeo';
import ComparisonTableSeo from '@/components/seo/ComparisonTableSeo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { RelatedArticles } from '@/components';
import FacilityCalculator from '@/components/sections/FacilityCalculator';
import FacilityTestimonials from '@/components/sections/FacilityTestimonials';
import Image from 'next/image';

export default function TesisYonetimiClient() {
  const { t } = useLanguage();

  const legalSteps = [
    { name: t('fac_step_1_title') || '1. Ücretsiz Tesis Keşfi ve Risk Analizi', text: t('fac_step_1_desc') || 'Tesisinizin fiziki, teknik, güvenlik ve mali durumunu yerinde inceler, eksikleri raporlarız.' },
    { name: t('fac_step_2_title') || '2. Şeffaf İşletme Projesi ve Bütçe Planı', text: t('fac_step_2_desc') || 'KMK m.37 uyarınca yıllık tahmini gelir-gider ve tasarruf odaklı aidat işletme projesini hazırlarız.' },
    { name: t('fac_step_3_title') || '3. Resmi Kurul Onayı ve Sözleşme', text: t('fac_step_3_desc') || 'Kat malikleri kurulu kararıyla yetkilendirme sonrası noter onaylı devir teslim protokolünü işletiriz.' },
    { name: t('fac_step_4_title') || '4. 7/24 Kesintisiz Entegre Tesis İşletmesi', text: t('fac_step_4_desc') || 'Güvenlik, temizlik, teknik bakım ve dijital aidat yönetimini tek merkezden kesintisiz başlatırız.' }
  ];

  const faqs = [
    {
      question: t('fac_faq_1_q') || 'Profesyonel tesis yönetimi neleri kapsar?',
      answer: t('fac_faq_1_a') || 'Tesis yönetimi; 5188 sayılı kanuna uygun fiziki güvenlik, ortak alan temizliği, asansör ve jeneratör teknik bakımı, aidat takibi, KMK hukuki danışmanlığı, peyzaj ve havuz bakımını tek çatı altında entegre olarak kapsar.'
    },
    {
      question: t('fac_faq_2_q') || 'Tesis yönetimi şirketiyle çalışmak aidatları düşürür mü?',
      answer: t('fac_faq_2_a') || 'Evet. Toplu satın alma gücü, önleyici teknik bakım ve enerji tasarrufu uygulamaları sayesinde Alo Yönetim ile çalışan tesislerde işletme giderlerinde %20 ile %30 arasında somut maliyet tasarrufu sağlanır.'
    },
    {
      question: t('fac_faq_3_q') || 'Yönetim devir süreci ne kadar sürer ve site sakinleri etkilenir mi?',
      answer: t('fac_faq_3_a') || 'Devir teslim süreci ortalama 48 saat içinde tamamlanır. Mevcut hizmetlerde hiçbir kesinti yaşanmadan, tüm sistemler ve personel entegrasyonu pürüzsüzce gerçekleştirilir.'
    },
    {
      question: 'Tesis yönetimi hizmetinin aylık maliyeti nedir?',
      answer: 'Maliyet; bina tipi, daire sayısı ve hizmet kapsamına göre değişir. Rezidanslarda daire başına aylık ₺850-1.600, toplu konutlarda ₺550-1.100 aralığında değişmektedir. Kesin fiyat için ücretsiz keşif talep ediniz.',
    },
    {
      question: 'KMK Madde 37 işletme projesi nedir?',
      answer: 'İşletme projesi; yöneticinin her yıl hazırladığı, 12 aylık tahmini gelir-gider ve her kat malikine düşen avans tutarını gösteren belgedir. Tebliğden 7 gün içinde itiraz edilmezse kesinleşir ve icra takibine dayanak olur.',
    },
    {
      question: 'Asansör yeşil etiket zorunluluğu nedir?',
      answer: 'Asansör Yönetmeliği kapsamında her asansörün yılda en az bir kez periyodik kontrolü ve yeşil etiket onayı zorunludur. Alo Yönetim yetkili A tipi muayene kuruluşlarıyla bu süreci takip eder.',
    },
    {
      question: 'Tesis yönetiminde acil arızalara müdahale süresi ne kadar?',
      answer: 'SLA kapsamında kritik arızalar (su baskını, asansör sıkışması, güvenlik ihlali) için maksimum 45 dakika müdahale süresi taahhüt edilir. 7/24 acil teknik ekibimiz kesintisiz hizmet vermektedir.',
    },
    {
      question: 'Aidatları geciktiren sakinlere nasıl müdahale edilir?',
      answer: 'Otomatik SMS hatırlatma, WhatsApp bildirim ve avukat ihtarının ardından KMK m.20 kapsamında mahkeme kararı beklenmeksizin icra takibi başlatılır. Tahsilat oranı %98\'in üzerinde tutulur.',
    },
    {
      question: 'Tesis yönetim şirketi nasıl seçilir?',
      answer: 'ISO sertifikaları ve 5188 lisansının güncelliğini, en az 3 referans siteyi, sözleşmedeki SLA sürelerini ve aylık raporlama yükümlülüklerini kontrol edin. Detaylı rehberimize göz atın.',
    },
  ];

  const SECTORS = [
    { href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', label: 'Rezidans & Lüks Site', icon: 'apartment', desc: 'Concierge, VIP güvenlik, havuz & spa', color: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:border-amber-400/40' },
    { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza & Ofis Binası', icon: 'business', desc: 'HVAC, enerji optimizasyonu, kiracı yönetimi', color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-400/40' },
    { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut & Site', icon: 'domain', desc: '%25-33 aidat tasarrufu, KMK uyumluluk', color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-400/40' },
    { href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', label: 'Sanayi Tesisi & Fabrika', icon: 'factory', desc: 'ISO 45001, ağır teknik bakım, yangın', color: 'from-orange-500/10 to-orange-600/5 border-orange-500/20 hover:border-orange-400/40' },
  ];

  return (
    <>
      <ServiceSeo 
        serviceType={t('serv_fac_name') || 'Tesis Yönetimi'}
        description={t('fac_desc') || 'İstanbul genelinde profesyonel apartman, site, plaza ve entegre tesis yönetimi hizmetleri.'}
        areaServed={["İstanbul", "Kadıköy", "Ataşehir", "Üsküdar", "Maltepe", "Beşiktaş", "Şişli", "Bakırköy"]}
        priceRange="₺₺"
        sameAs="https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi"
      />
      
      {/* Immersive Full-Width Hero (Titanium & Slate) */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950 z-10" />
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt="Profesyonel Tesis Yönetimi - Alo Yönetim" fill className="object-cover object-center opacity-30" priority />
        </div>
        
        {/* Abstract Minimal Animation */}
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
              {t('fac_banner_badge') || 'ENTEGRE VE DİJİTAL TESİS YÖNETİMİ'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('serv_fac_hero_title') || 'Profesyonel <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400"> Tesis Yönetimi </span>' }} />
            
            <AggregateRatingSeo 
              itemReviewed={{ '@type': 'ProfessionalService', name: `Alo Yönetim - ${t('serv_fac_name') || 'Tesis Yönetimi'}` }}
              ratingValue={4.9}
              reviewCount={312}
              className="mt-2"
            />

            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mt-4">
              {t('fac_banner_desc') || 'Apartman, site, plaza ve tesisler için 7/24 güvenlik, temizlik, teknik bakım, peyzaj ve şeffaf aidat takibi. ISO ve 5188 lisanslı kurumsal güvence.'}
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/teklif-al" className="bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center gap-2">
                {t('btn_get_quote') || 'Ücretsiz Keşif & Teklif Al'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        
        {/* Facility Calculator */}
        <div className="-mt-32 relative z-30">
          <FacilityCalculator />
        </div>

        {/* İnteraktif Tesis Yönetimi Uyumluluk & Tasarruf Radarı */}
        <InteractiveFacilityAuditRadarSeo districtName="İstanbul" />

        {/* AI Overviews & Position Zero Snippet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InstantAnswerCardSeo
            question="Profesyonel Tesis Yönetimi Şirketi ile Çalışmak Aidatları ve Giderleri Nasıl Düşürür?"
            shortAnswer="Profesyonel tesis yönetimi firmaları, yüzlerce projeden oluşan satın alma gücü sayesinde asansör bakımı, jeneratör yakıtı, temizlik kimyasalları ve sigorta gibi ortak gider kalemlerinde %25 ile %35 arasında toptan fiyat avantajı sağlar. Ayrıca önleyici teknik bakım ile büyük arıza masraflarını önler ve reaktif güç cezalarını %100 engelleyerek doğrudan aidat yükünü düşürür."
            bulletPoints={[
              'Toplu tedarik gücü ile malzeme, bakım ve sigorta primlerinde %30 tasarruf.',
              'Kompanzasyon panosu ve sayaç takibiyle elektrikte %0 reaktif ceza güvencesi.',
              'Kapıcı/personel kıdem tazminatı yükü kat maliklerinin üzerinden alınır.',
              'Otomatik SMS ve kredi kartlı tahsilat ile bütçe açığı ve faiz yükü sıfırlanır.'
            ]}
            lawArticle="634 Sayılı Kat Mülkiyeti Kanunu Madde 20 & 37"
            verifiedBy="Alo Yönetim Mali Teftiş & Bütçe Kurulu"
            category="Tesis Bütçesi & Aidat Tasarrufu"
          />
          <InstantAnswerCardSeo
            question="Site Yönetiminde İşletme Projesi (Bütçe) Nasıl Hazırlanır ve İtiraz Süresi Kaç Gündür?"
            shortAnswer="KMK Madde 37 uyarınca yönetici, seçildikten sonra bir yıllık tahmini gelir ve giderleri, her kat malikine düşecek avans tutarını gösteren bir işletme projesi hazırlar. Proje tüm kat maliklerine veya bağımsız bölümden fiilen yararlananlara imza karşılığı ya da taahhütlü mektupla tebliğ edilir. Tebliğden itibaren 7 gün içinde itiraz edilmezse kesinleşir ve doğrudan icra takibine dayanak teşkil eder."
            bulletPoints={[
              'Yıllık tahmini elektrik, su, güvenlik, temizlik ve bakım giderleri kalem kalem hesaplanır.',
              'Giderler KMK m.20 gereği arsa payı veya eşit olarak bağımsız bölümlere paylaştırılır.',
              '7 günlük itiraz süresi içinde itiraz edilirse Kat Malikleri Kurulu toplanarak nihai kararı verir.',
              'Kesinleşen işletme projesi İcra ve İflas Kanunu 68/1 maddesindeki resmi belge hükmündedir.'
            ]}
            lawArticle="634 Sayılı Kat Mülkiyeti Kanunu Madde 37"
            verifiedBy="Alo Yönetim Hukuk & Mevzuat Masası"
            category="KMK Mevzuatı & Bütçe Yönetimi"
          />
        </div>

        {/* Sektör Alt Sayfaları Vitrin */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3 text-center">
            Mülk Tipinize Özel Tesis Yönetimi
          </h2>
          <p className="text-[var(--color-text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Her yapı tipinin kendine özgü gereksinimleri vardır. Mülkünüze özel çözümü keşfedin.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SECTORS.map((s, i) => (
              <motion.a
                key={s.href}
                href={s.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col gap-3 p-6 rounded-2xl border bg-gradient-to-br ${s.color} transition-all group`}
              >
                <span className="material-symbols-outlined text-3xl text-[var(--color-text-primary)] group-hover:scale-110 transition-transform">{s.icon}</span>
                <h3 className="font-bold text-[var(--color-text-primary)]">{s.label}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{s.desc}</p>
                <span className="text-xs font-semibold text-brand-500 mt-auto">Detaylı İncele →</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Kanıtlanmış Sonuçlar — Vaka Çalışmaları (E-E-A-T Faz 6B) */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <CaseStudySeo />
        </div>

        {/* Tesis Yönetimi Karşılaştırma Matrisi (Bireysel vs Alo Yönetim) */}
        <FacilityComparisonMatrixSeo />

        {/* KMK 634 Karar & Şablon Jeneratörü */}
        <FacilityLegalTemplateGeneratorSeo />

        {/* Legal Debt Collection 4-Step Flow using HowToSeo */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo 
            name={t('fac_steps_title') || 'Tesis Yönetimine Profesyonel Geçiş Rehberi'}
            description="Tesis yönetimine profesyonel geçiş sürecimiz dört temel adımdan oluşmaktadır."
            steps={legalSteps}
          />
        </div>

        {/* Facility Specific Social Proof */}
        <FacilityTestimonials />

        {/* Profesyonel vs Bireysel Yönetim Karşılaştırma Tablosu (Faz 7B Featured Snippet) */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <ComparisonTableSeo />
        </div>

        {/* Service Specific FAQ via DynamicFAQ Component */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={faqs} title={t('fac_faq_title') || 'Tesis Yönetimi Hakkında Sıkça Sorulan Sorular'} />
        </div>

      </section>

      <SeoTextSection
        titleKey="tesis_seo_title"
        p1Key="tesis_seo_p1"
        p2Key="tesis_seo_p2"
      />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi" />
      <RelatedArticles pillar="/hizmetler/tesis-yonetimi" />
    </>
  );
}
