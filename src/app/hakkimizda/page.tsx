"use client";

import PageHeader from '@/components/layout/PageHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const leaders = [
  {
    name: "Oğuzhan Kaya",
    title: "Kurucu & Genel Müdür",
    bio: "17 yılı aşkın gayrimenkul ve entegre tesis yönetimi tecrübesiyle Alo Yönetim'in vizyonuna liderlik etmektedir.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Selin Yılmaz",
    title: "Operasyon Direktörü",
    bio: "45.000+ bağımsız bölümün saha güvenlik, temizlik ve teknik süreçlerinin koordinasyonunu yürütmektedir.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Av. Mehmet Demir",
    title: "Hukuk Müşaviri",
    bio: "Kat Mülkiyeti Kanunu ve icra hukuku alanında uzman kadrosuyla komşuluk ilişkilerini koruyan çözümler sunar.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

const timeline = [
  { year: "2009", title: "Kuruluş", desc: "Kadıköy'de profesyonel site yönetimi ve danışmanlık hizmetleri ile faaliyetlerimize başladık." },
  { year: "2015", title: "50+ Proje Barajı", desc: "İstanbul Anadolu yakasının önde gelen lüks konut sitelerinin yönetimini üstlendik." },
  { year: "2020", title: "Dijital Portal Dönüşümü", desc: "Kendi yazılımımız olan Sakin & Yönetici mobil uygulamasını hayata geçirdik." },
  { year: "2026", title: "45.000+ Daire & Liderlik", desc: "100+ prestijli proje ve 1.200+ eğitimli saha personelimizle sektörün güven adresi olduk." }
];

export default function Hakkimizda() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <PageHeader 
        title="Hakkımızda" 
        description="2009'dan bugüne şeffaf, güvenilir ve teknoloji odaklı profesyonel mülk yönetimi." 
      />

      {/* Manifest & Story */}
      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-16 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full w-fit">
              15+ Yıllık Kurumsal Tecrübe
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] leading-tight">
              Türkiye'nin En Prestijli Tesis Yönetim Standartlarını Oluşturuyoruz
            </h2>
            <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">
              Alo Yönetim olarak, toplu yaşam alanlarında karşılaşılan aidat belirsizlikleri, yetersiz güvenlik ve aksayan teknik bakımlara son vermek amacıyla yola çıktık. %100 şeffaf bilanço anlayışımız, güçlü hukuk desteğimiz ve 7/24 sahada olan uzman kadromuzla yaşam alanlarınıza değer katıyoruz.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-[#122338] text-white p-10 rounded-[2.5rem] flex flex-col gap-6">
            <div className="text-4xl font-extrabold text-blue-400">45.000+</div>
            <div className="text-lg font-semibold">Bağımsız Bölüm Güvencemizde</div>
            <p className="text-xs text-gray-300 font-light leading-relaxed border-t border-white/10 pt-4">
              Toplu satın alma gücümüz sayesinde sitelerin yıllık bütçelerinde ortalama %22 tasarruf sağlıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
            Yönetim Kadromuz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mt-4">
            Deneyimli ve Uzman Liderler
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((l, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-[2.5rem] flex flex-col gap-4 text-center items-center shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <img src={l.avatar} alt={l.name} className="w-24 h-24 rounded-full object-cover border-2 border-blue-600" />
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary)]">{l.name}</h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">{l.title}</p>
              </div>
              <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">{l.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
            Zaman Tüneli
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mt-4">
            Büyüme Yolculuğumuz (2009 - 2026)
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Animated Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full hidden md:block">
            <motion.div 
              className="w-full bg-blue-600 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {timeline.map((t, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center justify-between gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full text-left md:text-right">
                  {i % 2 === 0 && (
                    <div className="hidden md:block">
                      <div className="text-5xl font-extrabold text-blue-600/10">{t.year}</div>
                      <h3 className="text-2xl font-bold text-[var(--color-primary)] mt-1 mb-3">{t.title}</h3>
                      <p className="text-slate-500 dark:text-gray-400 font-light">{t.desc}</p>
                    </div>
                  )}
                </div>
                
                {/* Node */}
                <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] border-4 border-[var(--color-outline)] shadow-xl flex items-center justify-center z-10 hidden md:flex shrink-0">
                  <div className="w-6 h-6 rounded-full bg-blue-600 animate-pulse"></div>
                </div>

                <div className="flex-1 w-full text-left md:text-left bg-[var(--color-surface)] p-8 rounded-3xl border border-[var(--color-outline)] shadow-sm relative overflow-hidden group hover:border-blue-600/50 transition-colors duration-300">
                  <div className="absolute -top-10 -right-10 text-8xl font-black text-slate-100 dark:text-slate-800/50 z-0 select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
                    {t.year}
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block md:hidden text-2xl font-black text-blue-600 mb-2">{t.year}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-3">{t.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 font-light leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
