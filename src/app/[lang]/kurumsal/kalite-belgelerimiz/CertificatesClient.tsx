"use client";

import { useLanguage } from '@/context/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import TrustVerificationAuditSeo from '@/components/seo/TrustVerificationAuditSeo';
import { ServiceAuthorityHubSeo } from '@/components/seo';


interface Certificate {
  id: string;
  titleKey: string;
  subKey: string;
  descKey: string;
  icon: string;
  color: string;
  pdfPath: string;
  slug: string;
}

const CERTIFICATES: Certificate[] = [
  { id: "cert_1", titleKey: "cert_1_title", subKey: "cert_1_sub", descKey: "cert_1_desc", icon: "eco",            color: "from-emerald-500 to-teal-700",  pdfPath: "/certificates/dogaya-saygi.pdf", slug: "dogaya-saygi" },
  { id: "cert_2", titleKey: "cert_2_title", subKey: "cert_2_sub", descKey: "cert_2_desc", icon: "security",       color: "from-blue-600 to-indigo-800",   pdfPath: "/certificates/iso-31000.pdf",    slug: "iso-31000" },
  { id: "cert_3", titleKey: "cert_3_title", subKey: "cert_3_sub", descKey: "cert_3_desc", icon: "health_and_safety", color: "from-amber-500 to-orange-700", pdfPath: "/certificates/iso-45001.pdf",  slug: "iso-45001" },
  { id: "cert_4", titleKey: "cert_4_title", subKey: "cert_4_sub", descKey: "cert_4_desc", icon: "diversity_3",    color: "from-purple-500 to-pink-700",   pdfPath: "/certificates/iso-26000.pdf",    slug: "iso-26000" },
  { id: "cert_5", titleKey: "cert_5_title", subKey: "cert_5_sub", descKey: "cert_5_desc", icon: "all_inclusive",  color: "from-cyan-500 to-blue-700",     pdfPath: "/certificates/iso-22301.pdf",    slug: "iso-22301" },
  { id: "cert_6", titleKey: "cert_6_title", subKey: "cert_6_sub", descKey: "cert_6_desc", icon: "public",         color: "from-teal-500 to-emerald-700",  pdfPath: "/certificates/iso-14001.pdf",    slug: "iso-14001" },
  { id: "cert_7", titleKey: "cert_7_title", subKey: "cert_7_sub", descKey: "cert_7_desc", icon: "support_agent",  color: "from-rose-500 to-red-700",      pdfPath: "/certificates/iso-10002.pdf",    slug: "iso-10002" },
];

function CertificateCard({ cert, onClick }: { cert: Certificate; onClick: () => void }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for a fluid Apple TV style feeling
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation values (tilt effect)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Map mouse position to shine effect
  const shineOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.05, 0.3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onClick={() => window.open(cert.pdfPath, '_blank')}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative cursor-pointer group h-[340px] md:h-[400px] w-full perspective-[1000px]"
    >
      <div 
        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-slate-900 dark:group-hover:border-white"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Glow / Shine Layer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-slate-100/40 to-white/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 pointer-events-none"
          style={{ opacity: shineOpacity }}
        />

        <div className="p-8 h-full flex flex-col items-start justify-between relative z-10">
          <div 
            className="w-14 h-14 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 transition-transform duration-300"
            style={{ transform: "translateZ(30px)" }}
          >
            <span className="material-symbols-outlined text-2xl">{cert.icon}</span>
          </div>

          <div className="flex-grow flex flex-col justify-end w-full" style={{ transform: "translateZ(20px)" }}>
            <span className="inline-block self-start text-[10px] font-extrabold tracking-wider uppercase mb-2.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              {t(cert.titleKey as any)}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3">
              {t(cert.subKey as any)}
            </h3>
            <p className="text-sm font-light text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
              {t(cert.descKey as any)}
            </p>
            <Link
              href={`/kurumsal/sertifikalar/${cert.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
            >
              <span>Detayları İncele</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificatesClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader 
        title={t('certificates_title')} 
        description={t('certificates_desc')} 
      />

      <section className="relative py-16 bg-slate-50/50 dark:bg-slate-950 overflow-hidden">
        {/* Subtle background blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-slate-200/50 dark:bg-slate-900/30 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-16">
          
          {/* ========================================================================= */}
          {/* GOOGLE POSITION ZERO — STRATEJİK MASTER ÖZET REHBER & MEVZUAT OTORİTESİ   */}
          {/* ========================================================================= */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

            {/* Başlık & Rozetler */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-blue-400">verified</span>
                <span>Özet Rehber: Tesis Yönetiminde Uluslararası ISO Kalite Standartları ve Yetki Belgeleri</span>
              </div>
              <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                ISO 41001 & TÜRKAK Akredite Standartlar
              </span>
            </div>

            {/* Genişletilmiş ve Detaylandırılmış Metin */}
            <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
              <p>
                <strong className="text-[var(--color-primary)] font-bold">Tesis Yönetimi Kalite ve Akreditasyon Standartları</strong>;{' '}
                <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  konut siteleri
                </Link>
                ,{' '}
                <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  lüks rezidanslar
                </Link>
                ,{' '}
                <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  iş merkezleri ve plazalar
                </Link>
                {' '}ile{' '}
                <Link href="/sektorel-cozumler/sanayi-ve-lojistik-tesis-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  sanayi tesislerinde
                </Link>{' '}
                sunulan tüm hizmetlerin uluslararası kabul görmüş denetim, iş güvenliği, çevre duyarlılığı ve müşteri memnuniyeti prosedürlerine tam uygun olarak icra edilmesini garanti altına alan kurumsal yetki belgeleridir.
              </p>
              <p>
                Kalite güvence sistemimiz;{' '}
                <a href="https://www.iso.org/standard/68021.html" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                  ISO 41001:2018 (Uluslararası Tesis Yönetimi Standardı)
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                ,{' '}
                <a href="https://www.iso.org/iso-9001-quality-management.html" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                  ISO 9001:2015 Kalite Yönetim Sistemi
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                ,{' '}
                <a href="https://www.tse.org.tr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                  TSE Hizmet Yeri Yeterlilik Belgesi
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                {' '}ve 5188 Sayılı Kanun Valilik Özel Güvenlik Şirketi Faaliyet İzin Belgesi ile tam yetkilendirilmiştir.
              </p>
              <p>
                Kurumsal akreditasyon yapımız;{' '}
                <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Entegre Tesis Yönetimi
                </Link>
                ,{' '}
                <Link href="/hizmetler/guvenlik-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  5188 Lisanslı Özel Güvenlik
                </Link>
                ,{' '}
                <Link href="/hizmetler/teknik-bakim" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Teknik Bakım ve Periyodik Muayene
                </Link>
                {' '}ve{' '}
                <Link href="/hizmetler/temizlik-ve-hijyen" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Endüstriyel Hijyen
                </Link>{' '}
                süreçlerinde dört ana kalite disiplininde uygulanır:
              </p>

              {/* 4 Ana Kalite Sütunu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>🌐</span> ISO 41001:2018 Entegre Tesis Yönetimi Sistemi
                  </span>
                  <p className="text-[var(--color-secondary)]">
                    Gayrimenkullerin tüm operasyonel yaşam döngüsünü, bakım SLA sürelerini ve bütçe verimliliğini dünya standartlarında işletme güvencesi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>🛡️</span> ISO 45001 & 6331 İSG İş Sağlığı ve Güvenliği
                  </span>
                  <p className="text-[var(--color-secondary)]">
                    Tesis sakinleri ve personeli için sıfır iş kazası hedefi, periyodik acil durum tahliye tatbikatları ve yangın güvenlik protokolleri.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>🌿</span> ISO 14001:2015 Çevre & Sıfır Atık Yönetimi
                  </span>
                  <p className="text-[var(--color-secondary)]">
                    Sürdürülebilir tesis yönetimi, yağmur suyu geri kazanımı, LED aydınlatma otomasyonu ve tehlikeli atık ayrıştırma sertifikasyonu.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                  <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <span>🎧</span> ISO 10002 & ISO 27001 Müşteri Memnuniyeti & Veri Güvenliği
                  </span>
                  <p className="text-[var(--color-secondary)]">
                    7/24 sakin talep yönetimi, SLA çözüm takibi, KVKK uyumlu kamera kayıt arşivi ve şifreli finansal veri koruması.
                  </p>
                </div>
              </div>

              <p>
                Tüm yetki belgelerimiz bağımsız uluslararası denetim kuruluşlarınca her yıl periyodik olarak denetlenmekte olup, kat malikleri kurullarına sıfır yasal risk ve maksimum mülk prestiji sunmaktadır.
              </p>
            </div>

            {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
              <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                  <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">verified</span>
                  </span>
                  <span>%100 Akredite Operasyon</span>
                </div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  TÜRKAK ve uluslararası akreditasyon kuruluşları onaylı kurumsal kalite süreçleri.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">gavel</span>
                  </span>
                  <span>Sıfır Hukuki Risk</span>
                </div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  İş hukuku, İSG ve Kat Mülkiyeti Kanunu kapsamında yönetim kurullarına tam yasal güvence.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                  <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">domain</span>
                  </span>
                  <span>Mülk Değer Koruması</span>
                </div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                  Sertifikalı tesis yönetim modeliyle mülklerin piyasa değerini ve kiralanabilirlik oranını artırma.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-blue-500/5 dark:bg-primary/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-slate-500/5 dark:bg-blue-600/10 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] relative z-10">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-8">
              {t('certificates_manifest_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-100 dark:to-slate-400">{t('certificates_manifest_title_2')}</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6 text-left md:text-center justify-center text-slate-600 dark:text-slate-300">
              <p className="text-base md:text-lg font-light leading-relaxed flex-1">
                {t('certificates_manifest_p1')}
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed flex-1">
                {t('certificates_manifest_p2')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 perspective-[2000px] mb-16">
            {CERTIFICATES.map((cert) => (
              <CertificateCard 
                key={cert.id} 
                cert={cert} 
                onClick={() => {}} 
              />
            ))}
          </div>

          {/* TÜRKAK & ISO Canlı Güvenilirlik Mührü (E-E-A-T) */}
          <TrustVerificationAuditSeo />

          {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
          <ServiceAuthorityHubSeo
            serviceName="Uluslararası Kalite Standartları ve Akreditasyon Belgelerimiz"
            serviceCategory="Kalite & Standartlar"
            lawReferences={[
              {
                title: "Türk Standardları Enstitüsü (TSE) Resmi Belge Doğrulama Portalı",
                sourceName: "T.C. Sanayi ve Teknoloji Bakanlığı & TSE",
                url: "https://basvuru.tse.org.tr",
                badge: "TSE Doğrulama",
                description: "Alo Yönetim Hizmet Yeterlilik Belgesi (TSE HYB 12850) ve ISO standartları resmi tescil ve karekodlu doğrulama sistemi."
              },
              {
                title: "TÜRKAK — Türk Akreditasyon Kurumu Resmi Portalı",
                sourceName: "T.C. Dışişleri Bakanlığı TÜRKAK",
                url: "https://www.turkak.org.tr",
                badge: "TÜRKAK Akredite",
                description: "ISO 9001, ISO 14001, ISO 45001 ve ISO 27001 denetimlerinin uluslararası geçerliliğini sağlayan akreditasyon kurumu."
              },
              {
                title: "ISO — International Organization for Standardization (Cenevre / İsviçre)",
                sourceName: "ISO Global Headquarters",
                url: "https://www.iso.org",
                badge: "ISO Standartları",
                description: "Tesis yönetimi (ISO 41001), bilgi güvenliği (ISO 27001) ve müşteri memnuniyeti (ISO 10002) uluslararası kalite çerçevesi."
              }
            ]}
            glossaryTerms={[
              {
                slug: "kat-mulkiyeti-kanunu-kmk",
                term: "KMK Hukuki Uyumluluk Standartları",
                summary: "Kat Mülkiyeti Kanunu ve Türk Ticaret Kanunu mevzuatına %100 tam uyumlu şeffaf yönetim güvencesidir."
              },
              {
                slug: "bina-otomasyon-sistemi-bms",
                term: "ISO 50001 Enerji Yönetimi Standartları",
                summary: "Bina otomasyonu ve enerji tasarrufu uygulamalarıyla karbon ayak izinin minimize edilmesi kriterleridir."
              },
              {
                slug: "atik-yonetimi-ve-sifir-atik-belgesi",
                term: "ISO 14001 Çevre & Sıfır Atık",
                summary: "Tesislerde kaynağında ayrıştırma ve çevre dostu kimyasallarla sürdürülebilir yaşam standartlarıdır."
              },
              {
                slug: "5188-sayili-kanun",
                term: "ISO 45001 & 5188 Güvenlik Standartları",
                summary: "İş sağlığı ve güvenliği ile 5188 sayılı özel güvenlik kanunu protokollerinin entegrasyonudur."
              }
            ]}
          />

        </div>
      </section>
    </>
  );
}
