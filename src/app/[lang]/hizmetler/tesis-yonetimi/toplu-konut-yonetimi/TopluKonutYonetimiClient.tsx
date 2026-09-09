"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import { FacilitySubSectorCrossNav, FacilityRfpDownloadModalSeo, ServiceAuthorityHubSeo } from '@/components/seo';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const OPERATIONAL_PILLARS = [
  {
    icon: 'gavel',
    title: 'KMK m.34 Yönetici Seçimi & Çift Çoğunluk',
    badge: '%50+1 Sayı ve Arsa Payı',
    desc: '200+ ve 1000+ bağımsız bölümlü mega sitelerde KMK m.34 uyarınca hem kat maliki sayısı hem de arsa payı çoğunluğuyla hukuka tam uygun yönetici seçimi, divan tutanakları ve noter onaylı devir protokolü.',
    highlights: ['KMK m.34/1 çift çoğunluk kuralı', 'Noter onaylı işletme defteri ve karar defteri', 'Vekalet denetimi ve divan hukuki rehberliği']
  },
  {
    icon: 'receipt_long',
    title: 'KMK m.20 İcra Takibi & Aylık %5 Gecikme Faizi',
    badge: '%99.1 Tahsilat Güvencesi',
    desc: 'KMK m.20 ve m.37 gereği kesinleşen işletme projesine istinaden ödenmeyen aidatlarda aylık %5 kanuni gecikme tazminatı, noter ihtarı ve ilamsız icra takibi ile sıfır bütçe açığı.',
    highlights: ['KMK m.20/2 aylık %5 gecikme tazminatı', 'Otomatik SMS/WhatsApp tahsilat ve sanal POS', 'Hukuk departmanı doğrudan icra dosyası açılışı']
  },
  {
    icon: 'security',
    title: '5188 Lisanslı 3 Vardiya 7/24 Devriye Güvenliği',
    badge: '8 Saatlik 3 Vardiya & CCTV',
    desc: 'Site ana nizamiyesinde araç PTS bariyeri, yaya turnikesi, 8 saatlik 3 vardiya usulü eğitimli güvenlik görevlileri ve kör nokta bırakmayan dijital devriye tur kalemi sistemi.',
    highlights: ['İçişleri Bakanlığı 5188 lisanslı güvenlik personeli', 'Bekçi tur kalemi ile RFID noktalı devriye kontrolü', 'Misafir araç plaka ve kimlik sorgulama protokolü']
  },
  {
    icon: 'water_drop',
    title: 'Merkezi Sulama, Hidrofor & Dalgıç Pompa',
    badge: 'Sıfır Su Kesintisi & Tasarruf',
    desc: 'Geniş peyzaj alanları için artezyen kuyu otomasyonu, frekans konvertörlü hidrofor istasyonu, dalgıç pompa periyodik bakımı ve mevsimsel yağmurlama sulama takvimi.',
    highlights: ['Frekans kontrollü hidrofor basınç optimizasyonu', 'Dalgıç pompa ve su deposu ozon dezenfeksiyonu', 'Mevsimsel akıllı sulama ile %40 su tasarrufu']
  },
  {
    icon: 'sports_soccer',
    title: 'Sosyal Tesis, Spor Alanları & Çocuk Parkı',
    badge: 'TSE Standartlarında Güvenlik',
    desc: 'Site sakinlerine özel açık/kapalı havuz, fitness salonu, tenis kortu, basketbol sahası ve TSE EN 1176 uyumlu çocuk oyun parklarının günlük dezenfeksiyonu ve teknik bakımı.',
    highlights: ['Çocuk oyun grubu TSE EN 1176 periyodik kontrolü', 'Fitness ekipmanları haftalık yağlama ve mekanik kontrol', 'Sosyal tesis mobil rezervasyon ve kartlı giriş sistemi']
  },
  {
    icon: 'savings',
    title: 'Toplu Satınalma ile %25-33 Aidat Tasarrufu',
    badge: 'Toplu Tedarik Ölçek Avantajı',
    desc: 'Elektrik ikili anlaşmaları, asansör bakım sözleşmeleri, sarf temizlik kimyasalları ve peyzaj gübrelerinde yüzlerce sitenin birleşik hacmiyle %25-33 maliyet indirimi.',
    highlights: ['Serbest tüketici toptan elektrik ikili sözleşmesi', 'Asansör ve jeneratör kurumsal bakım indirimi', 'Şeffaf e-ihale ve kat malikleri mobil harcama ekranı']
  },
];

const STEPS = [
  { name: '1. Saha Keşfi & Bütçe Röntgeni', text: 'Sitenin bağımsız bölüm sayısı, ortak alanları, hidrofor/jeneratör altyapısı ve geçmiş harcama kalemleri yerinde incelenir.' },
  { name: '2. %25-33 Tasarruflu İşletme Projesi', text: 'KMK m.37 uyarınca toplu tedarik avantajları, enerji tasarrufu ve personel optimizasyonu içeren gerçekçi işletme bütçesi hazırlanır.' },
  { name: '3. Genel Kurul & Noter Onaylı Devir', text: 'KMK m.34 kapsamında kat malikleri kurulunda çift çoğunluk kararı alınarak noter huzurunda yasal devir teslim protokolü işletilir.' },
  { name: '4. Kesintisiz 3 Vardiya Entegre İşletme', text: '5188 güvenlik, temizlik, teknik servis ve sosyal tesis işletmesi ilk günden itibaren kurumsal sistemde başlatılır.' },
];

const FAQS = [
  { question: 'Toplu konut ve mega sitelerde yönetici seçimi nasıl yapılır?', answer: 'Kat Mülkiyeti Kanunu (KMK) m.34 gereğince yöneticinin seçilebilmesi için hem kat maliki sayısının hem de arsa payının salt çoğunluğu (%50+1) şarttır. Alo Yönetim, genel kurul divan yönetiminden vekalet kontrolüne kadar tüm yasal prosedürü eksiksiz yürütür.' },
  { question: 'Büyük sitelerde aidat tahsilatı ve gecikme faizi nasıl işletilir?', answer: 'KMK m.20/2 uyarınca gününde ödenmeyen aidat ve ortak gider avansları için aylık %5 kanuni gecikme tazminatı hesaplanır. Mobil uygulama ve SMS entegrasyonuyla tahsilat %99.1 seviyesinde tutulur; ödenmeyen alacaklar için doğrudan ilamsız icra takibi başlatılır.' },
  { question: '5188 lisanslı güvenlik kaç vardiya çalışır?', answer: 'Geniş açık alana ve çoklu bloklara sahip sitelerde 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca 8 saatlik 3 vardiya çalışma modeli uygulanır. Nizamiye girişleri, otopark bariyerleri ve kör noktalarda RFID bekçi tur kalemi ile devriye atılır.' },
  { question: 'Geniş peyzaj ve ortak alanlarda sulama nasıl optimize edilir?', answer: 'Artezyen kuyu sularının filtrasyonu, frekans konvertörlü dalgıç pompalar ve otomatik zaman ayarlı damlama/yağmurlama sulama sistemleriyle şebeke suyu kullanımı sıfırlanır, aidatlara yansıyan su faturası %40 oranında düşürülür.' },
  { question: 'Toplu satınalma gücüyle %25-33 tasarruf nasıl elde edilir?', answer: 'Yönettiğimiz yüzlerce sitenin toplam satın alma gücünü birleştirerek jeneratör mazotu, asansör periyodik bakımı, elektrik serbest tüketici tarifesi ve endüstriyel temizlik kimyasallarını toptan fiyatlarla temin ediyoruz.' },
];

export default function TopluKonutYonetimiClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-emerald-300 border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              Büyük Ölçekli Site & Toplu Konut Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Toplu Konut &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">Site Tesis Yönetimi</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              200+ ve 1000+ bağımsız bölümlü sitelerde KMK m.34 çift çoğunluk yönetici seçimi, KMK m.20 aidat tahsilat garantisi, 5188 lisanslı 3 vardiya güvenlik ve toplu satın alma ile %25-33 aidat tasarrufu.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/teklif-al" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                Tasarruf Analizi Talep Et
              </Link>
              <Link href="/hizmetler/tesis-yonetimi" className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                Tesis Yönetimi Standartları
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Tasarruf Banner */}
        <div className="bg-gradient-to-r from-emerald-950/50 via-teal-950/40 to-slate-900/60 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 text-center shadow-lg">
          <p className="text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">Ortalama Aidat Tasarrufu</p>
          <p className="text-5xl sm:text-6xl font-black text-white mb-2 tracking-tight">%25 - 33</p>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Toplu tedarik sözleşmeleri, enerji verimliliği ve 3 vardiya personel optimizasyonu ile büyük sitelerde daire başına sağlanan yıllık tasarruf.
          </p>
        </div>

        {/* 6'lı Operasyonel Standartlar Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
              Operasyonel Derinlik & Hukuki Disiplin
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3">
              Mega Sitelerde Tam Kapsamlı Tesis Yönetim Standartlarımız
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              Genel kurul divan yönetiminden artezyen hidroforuna, 3 vardiya güvenlikten KMK m.20 icra prosedürüne kadar uçtan uca kurumsal işletme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPERATIONAL_PILLARS.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-3xl p-7 hover:border-emerald-400/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl" aria-hidden="true">{f.icon}</span>
                    </span>
                    <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[var(--color-primary)] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed mb-4 font-normal">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-outline)]/40 space-y-1.5">
                  {f.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[var(--color-secondary)]">
                      <span className="material-symbols-outlined text-emerald-500 text-sm shrink-0" aria-hidden="true">check_circle</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Süreç */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo
            name="Toplu Konut Profesyonel Yönetime Geçiş Süreci"
            description="Büyük sitenizi Alo Yönetim güvencesiyle kurumsal yönetime taşımak 4 adımda tamamlanır."
            steps={STEPS}
          />
        </div>

        {/* Yoğun Toplu Konut İlçeleri Çapraz Bağlantı Vitrini */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-xl" aria-hidden="true">domain</span>
            <span>Mega Sitelerin Yoğun Olduğu Hizmet Bölgelerimiz</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Geniş peyzajlı, binlerce konutluk sitelere özel yerel teknik ekiplerimiz ve mobil destek araçlarımızla hizmetinizdeyiz:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'Başakşehir Siteleri', slug: 'basaksehir' },
              { name: 'Beylikdüzü Toplu Konut', slug: 'beylikduzu' },
              { name: 'Kartal Siteler', slug: 'kartal' },
              { name: 'Maltepe Konutları', slug: 'maltepe' },
              { name: 'Ümraniye Siteleri', slug: 'umraniye' },
              { name: 'Küçükçekmece Siteleri', slug: 'kucukcekmece' },
            ].map((d) => (
              <Link
                key={d.slug}
                href={`/bolgeler/${d.slug}/tesis-yonetimi`}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-400 transition-all text-center shadow-xs"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Toplu Konut & Site Yönetimi — Sık Sorulan Sorular" />
        </div>

        {/* RFP / Şartname Hazırlama CTA & İndirme Modal */}
        <div className="bg-[var(--color-surface)] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
            Toplu Yapı İhale & Yönetici Değişimi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] mt-3 mb-2">
            Mega Siteniz İçin Profesyonel Tesis Yönetim Şartnamesi İndirin
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-secondary)] max-w-2xl mx-auto mb-6">
            KMK m.34 çift çoğunluk tutanağı, 5188 güvenlik vardiya planı ve ortak gider bütçe şablonunu içeren şartname taslağını ücretsiz edinin.
          </p>
          <FacilityRfpDownloadModalSeo />
        </div>

        {/* 4'lü Alt Sektör Silo Ağı Çapraz Gezinti */}
        <FacilitySubSectorCrossNav currentSlug="toplu-konut-yonetimi" />
      </section>

      {/* Mevzuat & Hukuki Dayanak Otorite Hub */}
      <ServiceAuthorityHubSeo
        serviceName="Toplu Konut & Mega Site Tesis Yönetimi"
        serviceCategory="Toplu Konut & Çok Bloklu Site İşletmesi"
        lawReferences={[
          {
            title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK m.34 & m.37)",
            sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
            badge: "KMK 634",
            description: "Toplu yapılarda sayı ve arsa payı çift çoğunluğu ile yönetici seçimi, kesinleşen işletme projesi ve aidat tahsilat takvimi."
          },
          {
            title: "ISO 41001:2018 Uluslararası Tesis Yönetim Sistemi Standardı",
            sourceName: "TSE & Uluslararası Standardizasyon Örgütü",
            url: "https://www.tse.org.tr",
            badge: "ISO 41001",
            description: "Mega sitelerde ölçek ekonomisi, toplu tedarik avantajları ve ortak alan teknik altyapısının sürdürülebilir işletimi."
          },
          {
            title: "Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği",
            sourceName: "T.C. Sanayi ve Teknoloji Bakanlığı",
            url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=25804&MevzuatTur=7&MevzuatTertip=5",
            badge: "Asansör Bakım",
            description: "Çok katlı bloklarda yeşil etiket yıllık periyodik muayene, 7/24 asansör kurtarma servisi ve mekanik güvenlik."
          }
        ]}
        glossaryTerms={[
          {
            slug: "toplu-yapi-cift-cogunluk-kmk",
            term: "Toplu Yapı Çift Çoğunluk Kuralı",
            summary: "KMK m.34 uyarınca 200+ konutlu sitelerde yönetici seçiminde aranan hem kat maliki sayısı hem de arsa payı çoğunluğudur."
          },
          {
            slug: "isletme-projesi-ve-gecikme-tazminati",
            term: "KMK m.37 İşletme Projesi & %5 Faiz",
            summary: "Site bütçesinin kesinleşmesi sonrası ödenmeyen aidatlara aylık %5 yasal gecikme tazminatı uygulanmasıdır."
          },
          {
            slug: "frekans-konvertorlu-hidrofor-otomasyonu",
            term: "Merkezi Hidrofor & Dalgıç Pompa",
            summary: "Geniş peyzaj ve yüksek katlara kesintisiz basınçlı su sağlayan enerji tasarruflu hidrofor ve kuyu otomasyonudur."
          }
        ]}
      />

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi" />
      <PreFooterCta />
    </>
  );
}
