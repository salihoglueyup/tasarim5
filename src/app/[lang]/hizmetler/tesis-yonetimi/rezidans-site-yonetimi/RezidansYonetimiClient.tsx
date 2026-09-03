"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const FEATURES = [
  { icon: 'security', title: '7/24 VIP Güvenlik', desc: '5188 lisanslı personel, PTS plaka tanıma ve CCTV izleme.' },
  { icon: 'concierge_bell', title: 'Concierge Hizmeti', desc: 'Lobi yönetimi, ziyaretçi koordinasyonu ve sakin destek hattı.' },
  { icon: 'pool', title: 'Havuz & Spa Yönetimi', desc: 'Sağlık Bakanlığı standartlarında günlük klor/pH ölçümü ve analiz.' },
  { icon: 'elevator', title: 'Asansör Bakımı', desc: 'Yıllık yeşil etiket, periyodik kontrol ve acil müdahale.' },
  { icon: 'receipt_long', title: 'Aidat Yönetimi', desc: 'KMK m.37 işletme projesi, SMS & kredi kartı tahsilat.' },
  { icon: 'landscape', title: 'Peyzaj & Bahçe', desc: 'Mevsimlik bitki bakımı, çim biçme ve otomatik sulama sistemi.' },
];

const STEPS = [
  { name: '1. Ücretsiz Keşif', text: 'Rezidansınızı yerinde inceliyor, mevcut hizmet durumunu ve ihtiyaçlarını raporluyoruz.' },
  { name: '2. Kişiselleştirilmiş Teklif', text: 'Rezidansınızın standardına uygun premium hizmet paketi ve şeffaf fiyatlandırmayı sunuyoruz.' },
  { name: '3. Kurul Onayı', text: 'Kat malikleri kurulunda yetkilendirme sonrası noter onaylı devir protokolü imzalanır.' },
  { name: '4. Kesintisiz Premium Hizmet', text: 'Tüm hizmetler 24 saat içinde devreye girer; sakinler herhangi bir kesinti yaşamaz.' },
];

const FAQS = [
  { question: 'Rezidans tesis yönetimi normal site yönetiminden nasıl farklıdır?', answer: 'Rezidanslarda concierge hizmetleri, valet park, lobi yönetimi, VIP güvenlik protokolleri ve sakin memnuniyet anketleri standart olarak uygulanır. Hizmet kalitesi, mülk değerini doğrudan etkiler.' },
  { question: 'Lüks rezidanslarda güvenlik nasıl sağlanır?', answer: '5188 lisanslı güvenlik personeli, 24 saat lobi görevlisi, CCTV izleme, araç plaka tanıma (PTS) ve ziyaretçi kayıt sistemleri entegre olarak çalışır.' },
  { question: 'Havuz ve spa alanları nasıl yönetilir?', answer: 'Sağlık Bakanlığı Yüzme Havuzları Yönetmeliği kapsamında günlük klor/pH ölçümü, haftalık temizlik, aylık su analizi ve yıllık filtre bakımı gerçekleştirilir.' },
  { question: 'Rezidans aidat yönetimi nasıl işler?', answer: 'KMK m.37 işletme projesi hazırlanır; SMS ve kredi kartı ile online tahsilat sağlanır. Geciken ödemeler için yasal ihtar ve icra süreci otomatik olarak başlatılır.' },
  { question: 'Rezidans yönetiminde mülk değerini nasıl korursunuz?', answer: 'Önleyici teknik bakım, yüksek standartlı temizlik, peyzaj ve dış cephe bakımı ile düzenli denetim raporları, rezidansın piyasa değerini ve sakin memnuniyetini üst seviyede tutar.' },
];

export default function RezidansYonetimiClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20 flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-amber-300 border border-amber-400/30 bg-amber-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              Premium Tesis Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Rezidans & Lüks Site{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Yönetimi</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl font-light">
              İstanbul&apos;un prestijli rezidansları için 7/24 concierge, VIP güvenlik, havuz & spa yönetimi ve şeffaf aidat takibi. Mülk değerinizi koruyoruz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/teklif-al" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 px-8 rounded-xl transition-all hover:scale-105">
                Ücretsiz Keşif Talep Et
              </Link>
              <Link href="/hizmetler/tesis-yonetimi" className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-xl transition-all">
                Tesis Yönetimi Ana Sayfa
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Features Grid */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3 text-center">Rezidans Yönetim Hizmetlerimiz</h2>
          <p className="text-[var(--color-text-muted)] text-center mb-12 max-w-2xl mx-auto">Lüks yaşam standartlarınıza uygun, eksiksiz tesis yönetimi paketleri.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6 hover:border-amber-400/40 transition-all">
                <span className="material-symbols-outlined text-amber-400 text-3xl mb-3 block" aria-hidden="true">{f.icon}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Süreç */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo
            name="Rezidans Yönetimine Profesyonel Geçiş Süreci"
            description="Alo Yönetim ile rezidansınızı profesyonel yönetime taşımak 4 adımda tamamlanır."
            steps={STEPS}
          />
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Rezidans Tesis Yönetimi — Sık Sorulan Sorular" />
        </div>

        {/* İlgili Sayfalar */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Diğer Sektörel Tesis Yönetimi Çözümleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza & Ofis Yönetimi', icon: 'business' },
              { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut Yönetimi', icon: 'apartment' },
              { href: '/hizmetler/tesis-yonetimi/rehber', label: 'Tesis Yönetimi Rehberi', icon: 'menu_book' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 border border-[var(--color-outline)]/60 rounded-xl hover:border-brand-500/40 transition-all">
                <span className="material-symbols-outlined text-brand-500" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi" />
      <PreFooterCta />
    </>
  );
}
