"use client";

import { useLanguage } from '@/context/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import TrustVerificationAuditSeo from '@/components/seo/TrustVerificationAuditSeo';

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

      <section className="relative py-24 bg-slate-50/50 dark:bg-slate-950 overflow-hidden">
        {/* Subtle background blurs */}
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

        </div>
      </section>
    </>
  );
}
