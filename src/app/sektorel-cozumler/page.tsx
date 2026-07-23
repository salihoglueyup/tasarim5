"use client";

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const sectors = [
  {
    id: "rezidans",
    title: "Rezidans & Karma Projeler",
    desc: "Vale hizmetinden resepsiyona, akıllı ev otomasyon entegrasyonundan concierge çözümlerine kadar üst segment yönetim.",
    icon: "apartment",
    kpi: "%99.8 Sakin Memnuniyeti",
    features: [
      "7/24 Resepsiyon & Concierge Karşılama",
      "VVIP Özel Güvenlik Protokolleri",
      "Akıllı Ev & Mobil Sakin Portalı Entegrasyonu",
      "Vale & Kapalı Otopark Yönlendirme Servisi"
    ]
  },
  {
    id: "avm",
    title: "Alışveriş Merkezi & Ticari Alanlar",
    desc: "Yoğun insan trafiği yönetimi, havalandırma santralleri bakımı, 7/24 özel güvenlik ve şeffaf mağaza ortak gider paylaştırımı.",
    icon: "storefront",
    kpi: "7/24 Kesintisiz HVAC & İklimlendirme",
    features: [
      "Şeffaf Mağaza Ortak Gider Paylaşım Bütçesi",
      "Endüstriyel Havalandırma (HVAC) Periyodik Bakımları",
      "X-Ray ve Plaka Tanıma Entegre AVM Güvenliği",
      "Gece Vardiyası Derin Hijyen & Zemin Parlatma"
    ]
  },
  {
    id: "sanayi",
    title: "Sanayi Siteleri & Organize Sanayi (OSB)",
    desc: "Ağır vasıta giriş güvenliği, altyapı trafo ve jeneratör işletimi, yangın koruma hatları denetimi ve hukuki idare.",
    icon: "factory",
    kpi: "Sıfır Güvenlik Zafiyeti & Trafo Sürekliliği",
    features: [
      "Ağır Vasıta ve Kamyon Otomatik Plaka Okuma",
      "Yüksek Gerilim Trafo & Jeneratör Saha İşletimi",
      "İtfaiye Onaylı Yangın Hidrant Hatları Denetimi",
      "Çevre Sağlığı & Sanayi Atık Yönetimi Danışmanlığı"
    ]
  },
  {
    id: "toplukonut",
    title: "Toplu Konut & Uydukent Projeleri",
    desc: "Binlerce dairelik geniş peyzaj alanları, merkezi ısınma sistemleri faturalandırması ve kesintisiz mobil sakin portalı.",
    icon: "location_city",
    kpi: "%22 Net Aidat Tasarrufu",
    features: [
      "Geniş Peyzaj & Sensörlü Otomatik Sulama",
      "Isı Pay Ölçer & Merkezi Isınma Bütçelemesi",
      "%100 Canlı Mobil Aidat Tahsilat ve İcra Takibi",
      "Çocuk Oyun Parkları & Sosyal Tesis Bakımı"
    ]
  }
];

const faqs = [
  {
    q: "Projemize özel sektör ihtiyaç analizi nasıl yapılıyor?",
    a: "Uzman saha mühendislerimiz ve operasyon müdürlerimiz projenizi yerinde inceler. Trafik yoğunluğu, güvenlik risk noktaları ve teknik ekipman envanteri çıkarılarak 24 saat içinde sektöre özel yönetim modeli sunulur."
  },
  {
    q: "AVM ve rezidanslarda ortak gider paylaşımı nasıl hesaplanır?",
    a: "Kat Mülkiyeti Kanunu ve yönetim planına tam uyumlu olarak; bağımsız bölüm arsa payı, m² alanı ve süzme sayaç ölçümleri şeffaf yazılımımızla otomatik hesaplanıp raporlanır."
  },
  {
    q: "Sanayi sitelerinde yüksek gerilim trafo sorumluluğu Alo Yönetim'de midir?",
    a: "Evet, yetkili elektrik mühendislerimiz ve EMO belgeli teknik personelimiz ile trafo periyodik bakımları ve jeneratör senkronizasyon testleri aksatılmadan yürütülür."
  }
];

export default function SektorelCozumler() {
  const [activeTab, setActiveTab] = useState<string>("rezidans");
  const [unitCount, setUnitCount] = useState<number>(150);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic Personnel Estimator Logic based on project size
  const estimatedSecurity = Math.max(2, Math.round(unitCount / 40));
  const estimatedCleaning = Math.max(2, Math.round(unitCount / 50));
  const estimatedTechnical = Math.max(1, Math.round(unitCount / 100));
  const estimatedManager = 1;

  const currentSector = sectors.find(s => s.id === activeTab) || sectors[0];

  return (
    <>
      <PageHeader 
        title="Sektörel Çözümlerimiz" 
        description="Rezidans, AVM, Sanayi ve Toplu Konut projelerine özel terzi usulü profesyonel yönetim modelleri." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">
        
        {/* Interactive Sector Tabs */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === s.id
                    ? 'bg-[var(--color-primary)] text-white shadow-lg scale-105'
                    : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Active Sector Spotlight Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSector.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">{currentSector.icon}</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                    {currentSector.kpi}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">{currentSector.title}</h2>
                <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{currentSector.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {currentSector.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-semibold text-[var(--color-primary)]">
                      <span className="material-symbols-outlined text-blue-600 shrink-0">check_circle</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-xl">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">stars</span>
                  Özel Uzmanlık Güvencesi
                </div>

                <h3 className="text-2xl font-bold">Projenize Tam Uyumlu Hizmet Standardı</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Sektörünüzün dinamiklerine özel geliştirilmiş standart operasyon prosedürlerimiz (SOP) ve 7/24 denetçi kadromuzla yönetim risklerini sıfırlıyoruz.
                </p>

                <Link 
                  href="/teklif-al" 
                  className="w-full bg-white text-blue-900 font-bold py-4 px-6 rounded-2xl text-center text-sm hover:bg-gray-100 transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  {currentSector.title} İçin Teklif Al
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Sector Personnel & Resource Estimator Widget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-500/10 px-4 py-1.5 rounded-full w-fit uppercase tracking-widest">
              İnteraktif Kadro Planlama Simülatörü
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">Projeniz İçin Gerekli Personel İhtiyacını Tahmin Edin</h2>
            <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
              Projenizdeki bağımsız bölüm / daire veya dükkan sayısını seçin; ideal güvenlik, temizlik ve teknik personel kadrosunu görün.
            </p>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[var(--color-primary)]">Bağımsız Bölüm / Daire Sayısı</label>
                <span className="text-xl font-bold text-blue-600 bg-blue-500/10 px-4 py-1 rounded-full">{unitCount} Birim</span>
              </div>
              <input 
                type="range" 
                min={20}
                max={1000}
                step={10}
                value={unitCount}
                onChange={(e) => setUnitCount(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-[#122338] text-white p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-xl">
            <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider">Önerilen İdeal Personel Kadrosu</span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-blue-400">shield</span>
                  Özel Güvenlik
                </span>
                <span className="text-2xl font-bold text-blue-400">{estimatedSecurity} Personel</span>
                <span className="text-[10px] text-gray-400">7/24 Vardiyalı Nöbet</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-emerald-400">cleaning_services</span>
                  Kat Hizmetleri
                </span>
                <span className="text-2xl font-bold text-emerald-400">{estimatedCleaning} Personel</span>
                <span className="text-[10px] text-gray-400">Günlük Blok Temizliği</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-amber-400">build</span>
                  Teknik Personel
                </span>
                <span className="text-2xl font-bold text-amber-400">{estimatedTechnical} Personel</span>
                <span className="text-[10px] text-gray-400">Nöbetçi Bakım Ekibi</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 flex flex-col gap-1">
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-purple-400">badge</span>
                  Site Müdürü
                </span>
                <span className="text-2xl font-bold text-purple-400">{estimatedManager} Müdür</span>
                <span className="text-[10px] text-gray-400">Tam Zamanlı İdare</span>
              </div>
            </div>

            <Link href="/teklif-al" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl text-center text-sm transition-transform hover:scale-105 shadow-lg">
              Bu Kadro Planı İle Özel Fiyat İste 🚀
            </Link>
          </div>
        </div>

        {/* 4 Sector Cards Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 rounded-[2.5rem] flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl transition-all">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                    {s.kpi}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">{s.title}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">{s.desc}</p>

                <div className="flex flex-col gap-2 pt-2">
                  {s.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      <span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/teklif-al" className="w-fit bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-xl text-xs hover:opacity-95 transition-opacity flex items-center gap-2">
                Teklif Al
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">Sektörel Yönetim SSS</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-[var(--color-primary)] flex justify-between items-center bg-gray-50/50 dark:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-blue-600 transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
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

        {/* Bottom Call To Action Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold mb-2">Projenize Özel Yönetim Modeli Oluşturalım</h2>
            <p className="text-sm text-gray-300 font-light max-w-xl">
              Projenizin ölçeği ne olursa olsun, ücretsiz keşif yapıp size özel personel, bütçe ve risk analiz raporu hazırlıyoruz.
            </p>
          </div>
          <Link href="/teklif-al" className="bg-white text-blue-900 font-bold py-4 px-8 rounded-2xl shrink-0 text-sm hover:bg-gray-100 transition-transform hover:scale-105 shadow-md">
            Ücretsiz Sektörel Keşif İste 🚀
          </Link>
        </div>

      </section>
    </>
  );
}


