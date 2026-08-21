"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DynamicFAQ, HowToSeo, SeoTextSection } from '@/components';
import RelatedServices from '@/components/sections/RelatedServices';
import PreFooterCta from '@/components/sections/PreFooterCta';

const FEATURES = [
  { icon: 'health_and_safety', title: 'ISO 45001 İş Güvenliği', desc: 'Risk değerlendirmesi, KKD standartları, güvenlik eğitimleri ve periyodik iç denetim.' },
  { icon: 'build', title: 'Ağır Teknik Bakım', desc: 'Endüstriyel ekipman bakımı, kompresör, jeneratör ve elektrik dağıtım sistemi yönetimi.' },
  { icon: 'local_fire_department', title: 'Yangın & Hidrofor Güvenliği', desc: 'Sprinkler ve gaz sistemleri yıllık bakımı, hidrofor testi ve acil tahliye planları.' },
  { icon: 'fence', title: 'Perimetre Güvenliği', desc: 'Devriyeli özel güvenlik, termal kamera, araç giriş-çıkış kayıt ve gece görüş sistemleri.' },
  { icon: 'cleaning_services', title: 'Endüstriyel Zemin Temizliği', desc: 'Özel makine ve kimyasallarla fabrika zemin, platform ve depo temizliği.' },
  { icon: 'recycling', title: 'Atık & Çevre Yönetimi', desc: 'ISO 14001 uyumlu belgelenmiş atık yönetimi ve çevre mevzuatı takibi.' },
];

const STEPS = [
  { name: '1. Endüstriyel Keşif', text: 'Tesisteki ekipmanlar, güvenlik riskleri, atık akışı ve mevcut bakım protokolleri uzman ekibimizce değerlendirilir.' },
  { name: '2. Risk & Maliyet Analizi', text: 'ISO 45001 uyum açıkları tespit edilir; mevcut bakım giderleri analiz edilir ve tasarruf potansiyeli ortaya konur.' },
  { name: '3. SLA Sözleşmesi', text: 'Üretim sürekliliğini güvence altına alan SLA maddeleri (45 dk müdahale, yedek parça stok) içeren sözleşme imzalanır.' },
  { name: '4. Entegre Operasyon', text: 'Güvenlik, bakım, temizlik ve çevre yönetimi tek merkezden koordine edilir; aylık teknik rapor sunulur.' },
];

const FAQS = [
  { question: 'Sanayi tesislerinde ISO 45001 uyumu nasıl sağlanır?', answer: 'Risk değerlendirmesi, acil durum planları, güvenlik eğitimleri, KKD (kişisel koruyucu donanım) standartları ve periyodik iç denetimler ISO 45001 kapsamında uygulanır. Alo Yönetim bu süreçleri belgeli olarak yürütür.' },
  { question: 'Endüstriyel tesis bakım yönetimi nasıl planlanır?', answer: 'Önleyici bakım takvimi (PPM) oluşturulur; kritik ekipmanlar için yedek parça stok yönetimi yapılır; arıza takibi dijital CMMS sistemi üzerinden yürütülür. Üretim sürekliliği birincil önceliktir.' },
  { question: 'Yangın güvenliği ve hidrofor sistemleri nasıl yönetilir?', answer: 'Yangın söndürme sistemleri (sprinkler, gaz sistemi) yılda bir yetkili servis tarafından bakıma tabi tutulur; yangın hidroforu 3 ayda bir çalışma testi yapılır. Tüm belgeler düzenli tutulur.' },
  { question: 'Sanayi tesisinde perimetre güvenliği nasıl sağlanır?', answer: '5188 lisanslı devriyeli güvenlik, araç giriş-çıkış kayıt sistemi, termal kameralar ve gece görüş sistemleri ile güçlendirilmiş çevre güvenliği sağlanır.' },
  { question: 'Endüstriyel zemin ve atık yönetimi nasıl yapılır?', answer: 'Endüstriyel zemin temizliği için özel makine ve kimyasallar kullanılır. Atık yönetimi çevre mevzuatı (Çevre Kanunu, ISO 14001) çerçevesinde belgelenmiş şekilde yürütülür.' },
];

export default function SanayiTesisiYonetimiClient() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-orange-950/30 to-slate-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-400 via-transparent to-transparent" />
        <div className="relative z-10 px-[var(--spacing-gutter)] max-w-5xl mx-auto w-full text-center mt-20 flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-orange-300 border border-orange-400/30 bg-orange-400/10 px-5 py-2 rounded-full tracking-widest uppercase">
              Endüstriyel Tesis Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Sanayi Tesisi &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">Fabrika Yönetimi</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl font-light">
              İstanbul sanayi tesisleri için ISO 45001 iş güvenliği, ağır teknik bakım, yangın sistemi yönetimi ve perimetre güvenliği. Üretim sürekliliğini koruyoruz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/teklif-al" className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105">
                Endüstriyel Keşif Talep Et
              </Link>
              <Link href="/hizmetler/tesis-yonetimi" className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-xl transition-all">
                Tesis Yönetimi Ana Sayfa
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto space-y-20">

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-12 text-center">Sanayi Tesis Yönetim Hizmetleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6 hover:border-orange-400/40 transition-all">
                <span className="material-symbols-outlined text-orange-400 text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Süreç */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <HowToSeo name="Sanayi Tesisi Yönetim Süreci" description="Sanayi tesisi veya fabrikanızı profesyonel yönetime taşımak 4 adımda tamamlanır." steps={STEPS} />
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm">
          <DynamicFAQ faqs={FAQS} title="Sanayi Tesis Yönetimi — Sık Sorulan Sorular" />
        </div>

        {/* İlgili Sayfalar */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Diğer Sektörel Çözümler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza & Ofis Yönetimi', icon: 'business' },
              { href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut Yönetimi', icon: 'domain' },
              { href: '/hizmetler/tesis-yonetimi/rehber', label: 'Tesis Yönetimi Rehberi', icon: 'menu_book' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 border border-[var(--color-outline)]/60 rounded-xl hover:border-brand-500/40 transition-all">
                <span className="material-symbols-outlined text-brand-500">{item.icon}</span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeoTextSection titleKey="tesis_seo_title" p1Key="tesis_seo_p1" p2Key="tesis_seo_p2" />
      <RelatedServices currentPath="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi" />
      <PreFooterCta />
    </>
  );
}
