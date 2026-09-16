'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building,
  Home,
  Briefcase,
  Factory,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Percent,
  Users,
  ArrowRight,
  PhoneCall,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface FacilityCommercialTiersProps {
  className?: string;
}

export function FacilityCommercialTiersSeo({
  className = '',
}: FacilityCommercialTiersProps) {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const tiers = [
    {
      id: 0,
      badge: 'Butik Siteler İçin',
      name: 'Butik Site & Apartman Yönetimi',
      segment: '10 – 50 Bağımsız Bölüm',
      icon: Home,
      color: 'blue',
      summary: 'Düşük aidat bütçeli apartmanlar ve butik siteler için şeffaf, denetlenebilir ve hukuka uygun KMK işletme modeli.',
      sla: '45 Dk Acil Müdahale',
      collectionRate: '%99.2 Aidat Tahsilatı',
      features: [
        { title: 'KMK m.37 İşletme Projesi', desc: 'Yıllık tahmini bütçe tanzimi, tebligat ve yasal itiraz takibi' },
        { title: 'Mobil Aidat & Muhasebe', desc: 'Online banka entegrasyonu, şeffaf ekstre ve anlık SMS bilgilendirme' },
        { title: 'Haftalık Rutin Teknik Kontrol', desc: 'Ortak aydınlatma, hidrofor, sığınak ve çatı drenaj kontrolleri' },
        { title: '7/24 Acil Tesisat Desteği', desc: 'Su patlaması, elektrik arızası ve tıkanıklıklarda acil mobil ekip' },
        { title: 'KMK Hukuk ve İcra Desteği', desc: 'Ödenmeyen aidatlara aylık %5 KMK gecikme faizi ile icra takibi' },
      ],
      personnel: 'Gezici Mobil Teknik Ekip + Part-Time Hijyen Personeli + Sözleşmeli Avukat',
      ctaText: 'Butik Site Keşfi İsteyin',
    },
    {
      id: 1,
      badge: 'En Popüler Model',
      name: 'Lüks Rezidans & Yaşam Kompleksi',
      segment: '50 – 300+ Bağımsız Bölüm',
      icon: Building,
      color: 'emerald',
      popular: true,
      summary: 'Sosyal tesisli, kapalı otoparklı ve havuzlu rezidanslar için 5188 lisanslı 7/24 güvenlik ve otel konforunda tesis işletmeciliği.',
      sla: '30 Dk Acil Müdahale',
      collectionRate: '%98.8 Aidat Tahsilatı',
      features: [
        { title: '5188 Lisanslı 7/24 Güvenlik', desc: 'Nizamiye kontrol, devriye tur kalemi ve plaka tanıma sistemi' },
        { title: 'Resepsiyon & Concierge', desc: 'Ziyaretçi kaydı, kargo tasnifi ve 7/24 karşılama santrali' },
        { title: 'Havuz & SPA Sağlık Denetimi', desc: 'Sağlık Bakanlığı 2011/27848 uyumlu klor/pH ve Lejyonella ölçümleri' },
        { title: 'A Tipi Yeşil Etiket Asansör', desc: 'Aylık yetkili servis bakımı ve yıllık muayene tam koordinasyonu' },
        { title: 'Jeneratör & Yangın Sprinkleri', desc: 'Haftalık yük testleri, yangın hidrofor ve duman tahliye denetimleri' },
      ],
      personnel: 'Sabit Tesis Müdürü + 5188 Güvenlik Timi + Tam Zamanlı Tekniker + Hijyen Kadrosu',
      ctaText: 'Rezidans Yönetim Teklifi Al',
    },
    {
      id: 2,
      badge: 'Kurumsal Ofisler',
      name: 'Plaza, AVM & Kurumsal İş Merkezi',
      segment: 'Karma Ticari & Ticari Yapılar',
      icon: Briefcase,
      color: 'indigo',
      summary: 'İş merkezleri ve ticari plazalarda iş sürekliliğini sıfır kesintiyle koruyan BMS otomasyonu ve profesyonel bina işletmesi.',
      sla: '15 Dk Kritik Reaksiyon',
      collectionRate: '%99.5 Tahsilat Garantisi',
      features: [
        { title: 'Merkezi HVAC & Chiller İşletimi', desc: 'Bina otomasyon sistemi (BMS) ile iklimlendirme ve enerji tasarrufu' },
        { title: 'Kartlı Geçiş & Turnike Yönetimi', desc: 'Personel ve ziyaretçi giriş yetkilendirme, X-Ray bagaj tarama' },
        { title: 'Endüstriyel Hijyen & Dış Cephe', desc: 'Dağcı ekiple dış cephe cam silimi ve anti-bakteriyel ortak alan hijyeni' },
        { title: 'Kurumsal Faturalandırma & Kira', desc: 'Payölçer, kalorimetre ve süzme sayaç okuma, e-fatura entegrasyonu' },
        { title: '6331 Sayılı İSG ve Yangın Tatbikatı', desc: 'Bina tahliye planları ve yılda en az 1 zorunlu yangın tatbikatı' },
      ],
      personnel: 'Tesis Direktörü (Mühendis) + BMS Otomasyon Sorumlusu + Özel Güvenlik + Danışma',
      ctaText: 'Plaza Yönetim Şartnamesi İncele',
    },
    {
      id: 3,
      badge: 'Sanayi & Üretim',
      name: 'Sanayi Sitesi & Endüstriyel Tesis',
      segment: 'OSB, Fabrika ve Lojistik Tesisler',
      icon: Factory,
      color: 'amber',
      summary: 'OSB ve sanayi sitelerinde ağır yük zemin bakımı, çevre izinleri, trafo ölçümleri ve 6331 İSG acil ekiplerinin yönetimi.',
      sla: '20 Dk Mobil Reaksiyon',
      collectionRate: '%99.0 Bütçe Uyum Oranı',
      features: [
        { title: 'Ağır Vasıta & Lojistik Güvenlik', desc: 'Kamyon/TIR tartı, plaka tanıma ve yetkili sevkiyat kapı kontrolü' },
        { title: 'Çevre & Atık Yönetimi Uyum', desc: 'Sıfır Atık Yönetmeliği, tehlikeli atık depolama ve ÇED takibi' },
        { title: 'Trafo & Kompanzasyon Ölçümleri', desc: 'Yüksek gerilim işletme sorumluluğu ve reaktif ceza önleme sistemi' },
        { title: '6331 İSG 4 Acil Durum Ekibi', desc: 'Söndürme, Kurtarma, Koruma ve İlkyardım ekiplerinin tatbikatı' },
        { title: 'Saha Çevre & Yağmur Hattı', desc: 'Sanayi drenajı, yağ tutucu temizliği ve saha süpürme araçları' },
      ],
      personnel: 'İSG Uzmanı + Çevre Mühendisi + Yüksek Gerilim Teknikeri + 5188 Güvenlik Ekibi',
      ctaText: 'Endüstriyel Tesis Teklifi Al',
    },
  ];

  const current = tiers[selectedTier];

  return (
    <section
      id="b2b-tesis-yonetim-paketleri"
      aria-label="Kurumsal Tesis Yönetimi Hizmet Segmentleri ve Kapsam Matrisi"
      className={`rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl ${className}`}
    >
      {/* Başlık & Açıklama */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          İhtiyaca Özel Kurumsal B2B Hizmet Mimarisi
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Tesis Tiplerine Göre Operasyonel Kapsam Matrisi
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          Tüm binalar aynı değildir; butik bir apartmanın ihtiyaçları ile 300 konutluk bir rezidansın 
          ya da AVM&apos;nin operasyonel standartları farklıdır. Tesisinizin ölçeğine uygun resmi kapsamı seçin.
        </p>
      </div>

      {/* 4 Segment Butonu (Tab Bar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {tiers.map((tier) => {
          const IconComponent = tier.icon;
          const isActive = selectedTier === tier.id;

          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTier(tier.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                isActive
                  ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2.5 right-4 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                  {tier.badge}
                </span>
              )}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2.5 rounded-xl ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {tier.segment}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {tier.name}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Seçili Segmentin Detay Kartı (Şeffaf B2B Matris) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {current.segment} Kapsamı
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {current.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
              {current.summary}
            </p>
          </div>

          {/* SLA ve Performans Rozetleri */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">SLA Taahhüdü</div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white">{current.sla}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Percent className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Tahsilat Oranı</div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white">{current.collectionRate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Temel Hizmet Maddesi */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Bu Pakette Kesintisiz Sunulan Hizmet Kalemleri
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {current.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {feat.title}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Kadro Künyesi Kartı */}
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60">
              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-blue-900 dark:text-blue-200">
                    Görevlendirilen Uzman Kadro
                  </div>
                  <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-1 leading-snug">
                    {current.personnel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aksiyon Alanı: Keşif & Şeffaf Teklif */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              Gizli ek ücret yok. 48 saatte yerinde ücretsiz teknik ve mali fizibilite keşfi yapılır.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="tel:+902165504848"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>0216 550 48 48</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FacilityCommercialTiersSeo;
