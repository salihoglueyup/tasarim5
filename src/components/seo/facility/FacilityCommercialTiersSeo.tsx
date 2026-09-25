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
      className={`rounded-3xl border border-[var(--color-outline)]/80 dark:border-white/10 bg-[var(--color-surface)] p-6 sm:p-10 shadow-sm ${className}`}
    >
      {/* Başlık & Açıklama */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          İhtiyaca Özel Kurumsal B2B Hizmet Mimarisi
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[var(--color-primary)] tracking-tight">
          Tesis Tiplerine Göre Operasyonel Kapsam Matrisi
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-secondary)] mt-3 leading-relaxed">
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
                  ? 'border-[var(--color-primary)] bg-[var(--color-surface)] shadow-md ring-2 ring-[var(--color-primary)]/20'
                  : 'border-[var(--color-outline)]/70 bg-[var(--color-surface-variant)]/60 hover:bg-[var(--color-surface-variant)] text-[var(--color-secondary)]'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2.5 right-4 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs">
                  {tier.badge}
                </span>
              )}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2.5 rounded-xl ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-xs'
                      : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-tertiary)]">
                    {tier.segment}
                  </div>
                  <div className="text-sm font-bold text-[var(--color-primary)] leading-tight">
                    {tier.name}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Seçili Segmentin Detay Kartı (Şeffaf B2B Matris) */}
      <div className="rounded-2xl border border-[var(--color-outline)]/60 bg-[var(--color-surface-variant)]/40 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--color-outline)]/50 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
              {current.segment} Kapsamı
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--color-primary)] mt-1">
              {current.name}
            </h3>
            <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-2xl">
              {current.summary}
            </p>
          </div>

          {/* SLA ve Performans Rozetleri */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 shadow-2xs">
              <Clock className="w-4 h-4 text-[var(--color-primary)]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[var(--color-tertiary)]">SLA Taahhüdü</div>
                <div className="text-xs font-extrabold text-[var(--color-primary)]">{current.sla}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 shadow-2xs">
              <Percent className="w-4 h-4 text-[var(--color-primary)]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[var(--color-tertiary)]">Tahsilat Oranı</div>
                <div className="text-xs font-extrabold text-[var(--color-primary)]">{current.collectionRate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Temel Hizmet Maddesi */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-tertiary)] mb-4">
            Bu Pakette Kesintisiz Sunulan Hizmet Kalemleri
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {current.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 shadow-2xs"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[var(--color-primary)]">
                      {feat.title}
                    </div>
                    <p className="text-[11px] text-[var(--color-secondary)] mt-1 leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Kadro Künyesi Kartı */}
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/80 shadow-2xs">
              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[var(--color-primary)]">
                    Görevlendirilen Uzman Kadro
                  </div>
                  <p className="text-[11px] text-[var(--color-secondary)] mt-1 leading-snug">
                    {current.personnel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aksiyon Alanı: Keşif & Şeffaf Teklif */}
        <div className="pt-6 border-t border-[var(--color-outline)]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[var(--color-tertiary)] text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
            <span>
              Gizli ek ücret yok. 48 saatte yerinde ücretsiz teknik ve mali fizibilite keşfi yapılır.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-xs font-bold transition-all shadow-md hover:shadow-lg"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="tel:+902165504848"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--color-outline)] text-[var(--color-primary)] text-xs font-bold hover:bg-[var(--color-surface-variant)] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>0216 550 48 48</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FacilityCommercialTiersSeo;
