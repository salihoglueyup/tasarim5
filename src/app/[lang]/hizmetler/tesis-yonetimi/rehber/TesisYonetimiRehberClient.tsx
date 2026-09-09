"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import {
  FacilityRfpDownloadModalSeo,
  InteractiveFacilityAuditRadarSeo,
  FacilityComparisonMatrixSeo,
  FacilityDownloadableVaultSeo,
} from '@/components/seo';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const SEVEN_FATAL_MISTAKES = [
  {
    num: '01',
    title: 'Sadece En Düşük Fiyata Bakmak & 5188 Lisansını Sorgulamamak',
    mistake: 'Piyasa ortalamasının çok altında teklif veren merdivenaltı taşeronlar, Valilik onaylı 5188 özel güvenlik izin belgesine sahip değildir. Bir olay yaşandığında kat malikleri kurulu doğrudan cezai sorumlulukla karşı karşıya kalır.',
    solution: 'İçişleri Bakanlığı ve İstanbul Valiliği onaylı 5188 faaliyet izin belgesine sahip, üniformalı ve kimlik kartlı personelle çalışan kurumsal şirketleri tercih edin.'
  },
  {
    num: '02',
    title: 'Sözleşmede 45 Dk SLA ve %0 Reaktif Ceza Garantisi Aramamak',
    mistake: 'Teknik arıza oluştuğunda saatlerce servis beklemek veya BEDAŞ/TEDAŞ elektrik faturasında on binlerce lira reaktif enerji cezası ödemek, amatör yönetimin en sık yol açtığı maliyet tuzağıdır.',
    solution: 'Sözleşmeye kritik arızalarda (asansör, hidrofor, jeneratör) 45 dakika müdahale taahhüdü ve kompanzasyon takibiyle %0 reaktif ceza garantisi şartı koydurun.'
  },
  {
    num: '03',
    title: 'Personel Kıdem Tazminatı ve SGK Rücu Riskini Netleştirmemek',
    mistake: 'Yıllarca çalışan kapıcı veya temizlik görevlisinin kıdem tazminatı fonu ayrılmadığında, işten ayrılma anında kat maliklerinden daire başı yüklü ek avans talep edilir.',
    solution: 'Çalışanların tüm SGK primlerini, İSG yükümlülüklerini ve kıdem/ihbar tazminatı risklerini kurumsal tüzel kişiliğiyle üstlenen yönetim firmasıyla anlaşın.'
  },
  {
    num: '04',
    title: 'KMK m.37 İşletme Projesinin Tebliğ Edilmeyip Kesinleşmemesi',
    mistake: 'Hazırlanan bütçe imza karşılığı veya taahhütlü mektupla yasal olarak tebliğ edilmezse, aidatını ödemeyen maliklere karşı açılan icra takipleri mahkemede reddedilir.',
    solution: 'KMK m.37 gereği noter tebliği veya iadeli taahhütlü tebligatı eksiksiz yürüten, 7 gün içinde itiraz edilmeyen kesinleşmiş projeyle %99 tahsilat disiplini sağlayan firmaları seçin.'
  },
  {
    num: '05',
    title: 'Asansör Yeşil Etiket ve Yangın Otomasyonunu Denetimsiz Bırakmak',
    mistake: 'MMO veya TSE akredite A tipi muayene kuruluşunun yıllık periyodik asansör kontrolü yaptırılmazsa asansör kırmızı etiketle mühürlenir ve yöneticinin şahsi hapis sorumluluğu doğar.',
    solution: 'A tipi muayene yeşil etiket koordinasyonunu, haftalık dizel yangın hidroforu testini ve yıllık itfaiye tatbikatını sözleşmeyle güvenceye alın.'
  },
  {
    num: '06',
    title: 'Canlı Dijital Mobil Kasa ve Şeffaf Banka Entegrasyonu Sunulmaması',
    mistake: 'Eski usul elden makbuz kesen veya bütçeyi sadece yılda bir genel kurulda açıklayan yönetimlerde suiistimal, kasa açığı ve komşuluk kavgaları kaçınılmazdır.',
    solution: 'Kat maliklerine 7/24 iOS/Android sakin uygulaması üzerinden tüm faturaları, banka ekstrelerini ve bağımsız denetim raporlarını canlı izleme şeffaflığı sunan firmaları seçin.'
  },
  {
    num: '07',
    title: 'Fesih Şartları ve Devir Teslim Protokolünü Baştan Belirlememek',
    mistake: 'Memnun kalınmadığında şirketi göndermek için 1 yıl beklemek zorunda kalmak veya eski yöneticinin karar defterini ve banka şifrelerini teslim etmemesi süreci kilitler.',
    solution: '90 gün önceden yazılı bildirimle tek taraflı fesih hakkı tanıyan ve noter onaylı devir teslim tutanağıyla çalışan şeffaf sözleşmeleri tercih edin.'
  }
];

const STEPS = [
  { name: '1. İhtiyaç Analizi & Bağımsız Bölüm Sayımı', text: 'Binanızın bağımsız bölüm sayısı, ortak alan büyüklüğü, asansör, jeneratör ve güvenlik ihtiyaçlarını listeleyin.' },
  { name: '2. Resmi RFP / Teknik Şartname Hazırlığı', text: '5188 lisansı, ISO 41001, SLA süreleri ve KMK maddelerini içeren resmi hizmet alım şartnamesini hazırlayın.' },
  { name: '3. En Az 3 Kurumsal Firmadan Teklif Alınması', text: 'Kalem kalem işletme projesi, kıdem tazminatı taahhüdü ve referans site listesi içeren kurumsal teklifleri toplayın.' },
  { name: '4. 10 Maddelik Firma Skorkartı ile Puanlama', text: 'Valilik belgesi, vergi borcu yoktur yazısı, mali mesuliyet sigortası ve mühendislik altyapısını puanlayın.' },
  { name: '5. KMK m.34 Uyarınca Kurul Kararı Alınması', text: 'Kat malikleri kurulunda hem sayı hem arsa payı çoğunluğuyla (%50+1) yönetim şirketinin yetkilendirilmesi kararını alın.' },
  { name: '6. Noter Onaylı Devir Teslim ve Kesintisiz Başlangıç', text: 'Eski yöneticiden banka, karar defteri ve anahtarları tutanakla teslim alarak kurumsal sistemde sıfır kesintiyle başlayın.' },
];

const FAQS = [
  {
    question: 'Tesis yönetim şirketi seçerken en kritik yasal belgeler nelerdir?',
    answer: 'En kritik belgeler: 1) İçişleri Bakanlığı ve Valilik onaylı 5188 Özel Güvenlik Faaliyet İzin Belgesi, 2) ISO 41001 Tesis Yönetimi ve ISO 45001 İSG sertifikaları, 3) Güncel SGK ve Vergi Borcu Yoktur yazıları, 4) Tesis yöneticiliği mesleki sorumluluk sigortası poliçesidir.'
  },
  {
    question: 'KMK m.34 uyarınca yönetim şirketi seçimi nasıl yapılır?',
    answer: 'Kat Mülkiyeti Kanunu m.34/1 gereğince yönetici atanabilmesi için hem kat maliki sayısının hem de arsa payının salt çoğunluğu (%50+1) şarttır. Divan başkanı tutanağına şirketin ticaret unvanı, MERSİS numarası ve sözleşme imzalama yetkisi açıkça yazılmalıdır.'
  },
  {
    question: 'Tesis yönetim sözleşmesinde mutlaka olması gereken SLA maddeleri nelerdir?',
    answer: 'Kritik teknik arızalarda (asansörde kalma, ana hidrofor patlaması) maksimum 45 dakika müdahale süresi, elektrik faturalarında %0 reaktif ceza garantisi, %99 vadesinde aidat tahsilatı ve 90 günlük tek taraflı fesih hakkı mutlaka yer almalıdır.'
  },
  {
    question: 'Eski yönetici hesapları veya karar defterini devretmezse ne yapılmalıdır?',
    answer: 'Yeni yetkilendirilen yönetim şirketi hukuk departmanı aracılığıyla derhal noterden ihtarname çeker ve Sulh Hukuk Mahkemesi nezdinde KMK m.33 kapsamında hakimin müdahalesini talep ederek tedbiren defterlerin ve banka hesaplarının teslimini sağlar.'
  },
  {
    question: 'Sözleşme süresi boyunca şirket denetimi nasıl yapılır?',
    answer: 'Denetim kurulu veya kat malikleri her ayın 1\'inde dijital mobil uygulama üzerinden gelir-gider dökümünü, banka ekstrelerini ve teknik servis loglarını inceler. Yılda en az bir kez bağımsız mali müşavir teftiş raporu düzenlenir.'
  },
];

export default function TesisYonetimiRehberClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[65vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 pt-28 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-indigo-300 border border-indigo-400/30 bg-indigo-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              B2B Karar Verici & Yönetim Kurulu Rehberi 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Tesis Yönetim Şirketi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-500">Nasıl Seçilir?</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl font-light leading-relaxed">
              Sözleşme maddeleri, 5188 güvenlik lisansı, KMK m.34 devir protokolü, teknik şartname hazırlığı (RFP) ve 10 maddelik firma denetim skorkartı ile profesyonel yönetime kusursuz geçiş kılavuzu.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#rfp-section" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-lg" aria-hidden="true">download</span>
                <span>Şartname (RFP) Oluştur & İndir</span>
              </a>
              <Link href="/teklif-al" className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-xl transition-all">
                Ücretsiz Keşif Randevusu Al
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-24">

        {/* 1. BÖLÜM: B2B İhale ve Yönetim Şartnamesi (RFP) İndirme Modalı */}
        <div id="rfp-section" className="scroll-mt-28">
          <FacilityRfpDownloadModalSeo />
        </div>

        {/* 2. BÖLÜM: Şirket Seçiminde Yapılan 7 Ölümcül Hata Kılavuzu */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider bg-rose-50 dark:bg-rose-950/40 px-3.5 py-1.5 rounded-full border border-rose-200/60 dark:border-rose-800/40">
              Yasal & Mali Risk Analizi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)] mt-3">
              Tesis Yönetim Şirketi Seçerken Yapılan 7 Ölümcül Hata
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2 font-light">
              Yüzlerce sitenin yönetim devir sürecinde karşılaştığımız kritik hatalar ve kat malikleri kurulunu koruyan kurumsal çözümler:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEVEN_FATAL_MISTAKES.map((item) => (
              <div
                key={item.num}
                className="p-7 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-rose-400/50 hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-rose-500 font-mono">{item.num}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40">
                      Kritik Hata
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-4">
                    {item.mistake}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-outline)]/40 bg-emerald-500/5 dark:bg-emerald-950/20 p-3.5 rounded-2xl border-emerald-500/20">
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
                    <span>Alo Yönetim Standart Çözümü:</span>
                  </div>
                  <p className="text-xs text-[var(--color-primary)] leading-relaxed font-medium">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. BÖLÜM: İnteraktif Tesis Uyumluluk & Tasarruf Radarı (100 Puanlık Skorkart) */}
        <div>
          <InteractiveFacilityAuditRadarSeo districtName="İstanbul" />
        </div>

        {/* 4. BÖLÜM: Büyük Karşılaştırma Matrisi (Alo Yönetim vs. Bireysel vs. Merdivenaltı) */}
        <div>
          <FacilityComparisonMatrixSeo />
        </div>

        {/* 5. BÖLÜM: 6 Adımda Doğru Şirket Seçim ve Geçiş Süreci */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo
            name="Tesis Yönetim Şirketi Seçim ve Devir Süreci"
            description="Site ve binanızı kurumsal yönetime taşırken izlenmesi gereken 6 resmi adım."
            steps={STEPS}
          />
        </div>

        {/* 6. BÖLÜM: Resmi Hukuki Belge & Şablon İndirme Kasası */}
        <div>
          <FacilityDownloadableVaultSeo />
        </div>

        {/* 7. BÖLÜM: Mülk Tipine Göre Tesis Yönetimi Sektörel Köprüler */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-[var(--color-primary)] mb-6 text-center">
            Yöneteceğiniz Gayrimenkul Tipine Göre Özel Çözümler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', label: 'Rezidans & Lüks Site', desc: '7/24 Concierge, Vale ve Havuz Hijyeni', icon: 'apartment', color: 'amber' },
              { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza & Ofis Binası', desc: 'Yangın Otomasyonu, 3x Jeneratör, Chiller', icon: 'business', color: 'blue' },
              { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut & Site', desc: 'KMK 34 Çift Çoğunluk, 3 Vardiya Güvenlik', icon: 'domain', color: 'emerald' },
              { href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', label: 'Sanayi Tesisi & Fabrika', desc: 'ISO 45001, ATEX, 34.5 kV OG Trafo', icon: 'factory', color: 'orange' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 p-6 border border-[var(--color-outline)]/60 rounded-2xl hover:border-indigo-500/50 hover:shadow-md text-center transition-all group bg-[var(--color-surface-variant)]"
              >
                <span className="material-symbols-outlined text-4xl text-indigo-500 group-hover:scale-110 transition-transform" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-bold text-[var(--color-primary)] mt-1">{item.label}</span>
                <span className="text-xs text-[var(--color-secondary)]">{item.desc}</span>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-2">Detaylı İncele →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 8. BÖLÜM: Sık Sorulan Sorular */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Tesis Yönetim Şirketi Seçimi — Hukuki ve Operasyonel SSS" />
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/rehber" />
      <PreFooterCta />
    </>
  );
}
