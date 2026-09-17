"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface ServiceAiOverviewProps {
  serviceSlug: string;
  serviceName?: string;
  className?: string;
}

interface ServiceTruthSpec {
  question: string;
  answer: string;
  legalBasis: string;
  badge: string;
  keyPoints: { label: string; value: string }[];
}

export const SERVICE_GROUND_TRUTH: Record<string, ServiceTruthSpec> = {
  'guvenlik-yonetimi': {
    question: 'Sitelerde 5188 Sayılı Kanun Kapsamında Özel Güvenlik Nasıl Sağlanır ve Yetkileri Nelerdir?',
    answer:
      '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca sitelerde özel güvenlik görevlendirilebilmesi için İl Özel Güvenlik Komisyonu kararı ve Valilik İzni (ÖGİ) zorunludur. EGM onaylı kimlik kartına sahip personelin; X-ray/detektörle arama, kimlik sorma ve suçüstü yakalama yetkisi vardır. Ancak TCK 109 ve 120 gereğince güvenlik personeli araç torpidosunu veya çantaları elle arayamaz; elle arama adli kolluk yetkisindedir.',
    legalBasis: '5188 Sayılı Kanun Madde 3, 7 & TCK Madde 109/120',
    badge: 'Valilik 5188 İzinli',
    keyPoints: [
      { label: 'Yasal İzin', value: 'Valilik ÖGİ Belgesi' },
      { label: 'Kimlik Şartı', value: 'EGM Onaylı 5188 Kartı' },
      { label: 'Arama Yetkisi', value: 'Dedektör / X-Ray ile' },
      { label: 'Denetim', value: 'RFID & QR Anlık Devriye' },
    ],
  },
  'teknik-bakim': {
    question: 'Apartman ve Sitelerde Asansör Yeşil Etiket ve Kompanzasyon Bakımı Zorunlu mudur?',
    answer:
      'Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği gereği yılda bir kez akredite A Tipi muayene kuruluşu denetimiyle Yeşil Etiket alınması can güvenliği ve mühürlenmeme güvencesidir. Kırmızı etiketli asansör 60 gün içinde revize edilmelidir; aksi halde yönetici cezai sorumludur. Ayrıca kompanzasyon takibiyle EPDK sınırları (endüktif %20, kapasitif %15) korunarak faturaya %30-%50 reaktif ceza gelmesi %0’a indirilir.',
    legalBasis: 'Asansör Yönetmeliği (Resmi Gazete 30737) & EPDK Tarifeleri',
    badge: 'A Tipi Yeşil Etiket',
    keyPoints: [
      { label: 'Asansör Denetimi', value: 'Yıllık A Tipi Akredite' },
      { label: 'Kırmızı Etiket', value: 'Maks 60 Günde Revizyon' },
      { label: 'Reaktif Ceza', value: '%0 Ceza Garantisi' },
      { label: 'Acil İntikal', value: '15-20 Dk Mobil SLA' },
    ],
  },
  'temizlik-ve-hijyen': {
    question: 'Sitelerde Su Deposu Temizliği ve Biyosidal İlaçlama Hangi Aralıklarla Yapılmalıdır?',
    answer:
      'Sağlık Bakanlığı 2007/67 Sayılı Genelgesi ve İSKİ mevzuatı uyarınca apartman ve site su depoları yılda en az 2 kez (6 ayda bir) akredite uzmanlarca klor dezenfeksiyonu ile temizlenip bakteriyolojik analizi yapılmalıdır. Haşere kontrolünde ise Biyosidal Ürünler Yönetmeliği gereği yalnızca Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü ruhsatlı ürünler kullanılabilir; toplu alanlarda tarım ilacı kullanılması suç teşkil eder.',
    legalBasis: 'Sağlık Bakanlığı 2007/67 Genelgesi & Biyosidal Yönetmelik (RG 27449)',
    badge: 'Bakanlık Ruhsatlı',
    keyPoints: [
      { label: 'Su Deposu', value: 'Yılda 2 Kez (6 Ayda Bir)' },
      { label: 'Dezenfeksiyon', value: 'Akredite Klorlama & Analiz' },
      { label: 'Haşere İlacı', value: 'Sağlık Bak. Biyosidal Ruhsat' },
      { label: 'MSDS Kaydı', value: '100% Kimyasal Güvenlik Formu' },
    ],
  },
  'aidat-takibi': {
    question: 'Aidatını Ödemeyen Kat Malikine Uygulanan Yasal İşlemler ve Gecikme Tazminatı Nedir?',
    answer:
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 20/2 uyarınca, aidat ve ortak avans borcunu zamanında ödemeyen kat maliki veya kiracıya aylık yüzde beş (%5) oranında yasal gecikme tazminatı işletilir. Kesinleşmiş işletme projesine dayalı alacaklar için noter ihtarnamesi çekme zorunluluğu yoktur; İcra ve İflas Kanunu (İİK) Madde 68 gereği doğrudan ilamsız icra takibi başlatılarak 7 gün içinde borçluya ödeme emri tebliğ edilir.',
    legalBasis: 'KMK Madde 20/2, Madde 37 & İİK Madde 68',
    badge: 'Aylık %5 Yasal Tazminat',
    keyPoints: [
      { label: 'Gecikme Oranı', value: 'Aylık %5 Emredici Yasal' },
      { label: 'İhtarname Şartı', value: 'Noter Şartı Aranmaz' },
      { label: 'İcra Gücü', value: 'İİK 68 Borç İkrarı Belgesi' },
      { label: 'Tahsilat Başarısı', value: '%99.4 Dijital Tahsilat' },
    ],
  },
  'havuz-bakimi-ve-hijyen': {
    question: 'Site Açık ve Kapalı Yüzme Havuzlarında Sağlık Bakanlığı Standartları Nelerdir?',
    answer:
      'T.C. Sağlık Bakanlığı Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik gereğince; açık havuzlarda serbest klor 1.0 - 1.5 ppm, kapalı havuzlarda 1.0 - 2.0 ppm, pH değeri ise 7.2 - 7.6 aralığında tutulmalıdır. Havuz suyu sıcaklığı, klor ve pH ölçümleri günde en az 3 defa yapılıp sakinlerin görebileceği panoya asılmak zorundadır. Aylık mikrobiyolojik su analizleri Sağlık Bakanlığı yetkili laboratuvarında yapılır.',
    legalBasis: 'Yüzme Havuzları Yönetmeliği (27878 Sayılı Resmi Gazete)',
    badge: 'Sağlık Bakanlığı Normu',
    keyPoints: [
      { label: 'Serbest Klor', value: '1.0 - 1.5 ppm (Açık Havuz)' },
      { label: 'pH Seviyesi', value: '7.2 - 7.6 Dengesi' },
      { label: 'Günlük Ölçüm', value: 'Günde En Az 3 Defa Panoda' },
      { label: 'Laboratuvar', value: 'Aylık Mikrobiyolojik Analiz' },
    ],
  },
  'site-yonetimi': {
    question: 'Apartman ve Site Yönetim Şirketleri Nasıl Çalışır ve KMK 35 Yasal Görevleri Nelerdir?',
    answer:
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 34 uyarınca site yöneticisi kat malikleri kurulunun hem sayı hem arsa payı salt çoğunluğu (%50 + 1) ile seçilir. Yöneticinin KMK Madde 35 kapsamındaki yasal görevleri; yıllık tahmini işletme projesini (KMK 37) hazırlayıp tebliğ etmek, site adına banka hesabı açmak, aidat avanslarını toplamak, geciken ödemelere aylık %5 gecikme tazminatı işletmek ve genel kurul divanını sevk ve idare etmektir.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu Madde 34, 35, 37 & İİK Madde 68',
    badge: 'KMK 34 & 35 Uyumlu',
    keyPoints: [
      { label: 'Seçim Nisabı', value: 'Sayı ve Arsa Payı %50+1' },
      { label: 'Yasal Görev', value: 'KMK 35 Şeffaf İşletim' },
      { label: 'İşletme Projesi', value: 'KMK 37 (7 Günde Kesinleşme)' },
      { label: 'Tasarruf', value: '%30 Net Bütçe Tasarrufu' },
    ],
  },
  'tesis-yonetimi': {
    question: 'Entegre Tesis Yönetimi Nedir ve ISO 41001 Standartları Neleri Kapsar?',
    answer:
      'Entegre tesis yönetimi; rezidans, AVM, iş merkezi ve karma yaşam projelerinde uluslararası ISO 41001:2018 standardında teknik bakım, 5188 özel güvenlik, endüstriyel temizlik, enerji otomasyonu (BMS) ve bütçe yönetimini tek çatı altında optimize eden kurumsal disiplindir. Alo Yönetim, 340+ aktif tesiste kurumsal SLA garantileri ve %0 reaktif ceza güvencesiyle 360 derece kesintisiz operasyon yürütmektedir.',
    legalBasis: 'ISO 41001:2018 Entegre Tesis Yönetimi Sistemi & TÜRKAK',
    badge: 'ISO 41001 Akredite',
    keyPoints: [
      { label: 'Uluslararası Standart', value: 'ISO 41001:2018' },
      { label: 'Operasyon Alanı', value: 'Teknik, Güvenlik, Hijyen' },
      { label: 'Enerji Yönetimi', value: '%0 Reaktif Ceza & Otomasyon' },
      { label: 'Acil İntikal', value: '15-20 Dk Mobil Teknik Filo' },
    ],
  },
};

export default function ServiceAiOverviewSnippetSeo({
  serviceSlug,
  serviceName,
  className = '',
}: ServiceAiOverviewProps) {
  const [copied, setCopied] = useState(false);

  const truth =
    SERVICE_GROUND_TRUTH[serviceSlug] || {
      question: `${serviceName || 'Hizmet'} İçin Yasal Standartlar ve Operasyonel Güvenceler Nelerdir?`,
      answer:
        'Alo Yönetim, ISO 41001:2018 uluslararası entegre tesis yönetimi ve 634 Sayılı Kat Mülkiyeti Kanunu standartlarında şeffaf, denetlenebilir ve profesyonel hizmet sunar. Acil durumlarda 15-20 dakika mobil teknik müdahale SLA taahhüdü ve %30 net bütçe tasarrufu garantisi sağlanır.',
      legalBasis: '634 Sayılı KMK & ISO 41001:2018',
      badge: 'ISO 41001 Akredite',
      keyPoints: [
        { label: 'Yasal Standart', value: '634 Sayılı KMK' },
        { label: 'Yönetim Sistemi', value: 'ISO 41001:2018' },
        { label: 'Acil İntikal', value: '15-20 Dk Mobil SLA' },
        { label: 'Bütçe Tasarrufu', value: '%30 Kanıtlanmış Tasarruf' },
      ],
    };

  const handleCopy = () => {
    navigator.clipboard.writeText(truth.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: truth.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: truth.answer,
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName || 'Profesyonel Tesis Hizmeti',
      provider: {
        '@type': 'Organization',
        name: 'Alo Yönetim ve Organizasyon A.Ş.',
        url: BASE_URL,
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'İstanbul',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${serviceName || 'Hizmet'} Yasal Standartları | Google AI Overview Otoritesi`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#service-instant-answer-text'],
      },
    },
  ];

  return (
    <section
      id="service-ai-overview"
      aria-label="Google AI Overviews Hizmet Yasal Standartları ve Doğruluk Özeti"
      className={`bg-[var(--color-surface)] border border-primary/25 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden my-8 ${className}`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">verified</span>
          <span>Google AI Overviews & Mevzuat Standartları</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            {truth.badge}
          </span>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-300/40">
            ISO 41001
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3 relative z-10 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-primary text-2xl mt-0.5 shrink-0" aria-hidden="true">
          help_center
        </span>
        <span>{truth.question}</span>
      </h2>

      {/* Direct AI Ground Truth Answer */}
      <div
        id="service-instant-answer-text"
        className="text-[15px] sm:text-base leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-background)]/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] mb-6 relative z-10 font-normal"
      >
        <p>{truth.answer}</p>
      </div>

      {/* Key Points Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 relative z-10">
        {truth.keyPoints.map((pt, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-center">
            <div className="text-xs text-[var(--color-text-muted)] font-medium mb-1">{pt.label}</div>
            <div className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">{pt.value}</div>
          </div>
        ))}
      </div>

      {/* Footer / Copy & Verify */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)] relative z-10">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="material-symbols-outlined text-sm text-emerald-500">gavel</span>
          <span>Yasal Dayanak: {truth.legalBasis}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--color-background)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] transition-all cursor-pointer"
            aria-label="Metni panoya kopyala"
          >
            <span className="material-symbols-outlined text-sm text-primary">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Kopyalandı!' : 'Özeti Kopyala'}</span>
          </button>

          <a
            href={`https://www.perplexity.ai/search?q=${encodeURIComponent(truth.question)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary hover:opacity-90 text-white transition-all shadow-xs"
          >
            <span>Perplexity&apos;de Doğrula</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
