"use client";

import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, personSchema, webPageSchema } from '@/lib/schemas';
import { ShieldCheck, Target, Lightbulb, Leaf, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PreFooterCta from '@/components/sections/PreFooterCta';
import WhyUsBentoGrid from '@/components/sections/WhyUsBentoGrid';
import CertificateBadgeGrid from '@/components/sections/CertificateBadgeGrid';

// --- CountUp Animasyon Bileşeni ---
function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString() + (to > 100 ? "+" : "");
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function Hakkimizda() {
  const { t, language } = useLanguage();

  const leaders = [
    {
      name: t('about_team_placeholder_name'),
      title: t('about_team_placeholder_title'),
      bio: t('about_team_placeholder_bio'),
      avatar: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=300&auto=format&fit=crop"
    },
    {
      name: t('about_team_placeholder_name'),
      title: t('about_team_placeholder_title'),
      bio: t('about_team_placeholder_bio'),
      avatar: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=300&auto=format&fit=crop"
    },
    {
      name: t('about_team_placeholder_name'),
      title: t('about_team_placeholder_title'),
      bio: t('about_team_placeholder_bio'),
      avatar: "https://images.unsplash.com/photo-1557683304-673a23048d34?q=80&w=300&auto=format&fit=crop"
    }
  ];

  const timeline = [
    { year: t('about_timeline_1_year'), title: t('about_timeline_1_title'), desc: t('about_timeline_1_desc') },
    { year: t('about_timeline_2_year'), title: t('about_timeline_2_title'), desc: t('about_timeline_2_desc') },
    { year: t('about_timeline_3_year'), title: t('about_timeline_3_title'), desc: t('about_timeline_3_desc') },
    { year: t('about_timeline_4_year'), title: t('about_timeline_4_title'), desc: t('about_timeline_4_desc') }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('nav_corporate'), url: '/kurumsal' },
    { name: t('nav_about'), url: '/hakkimizda' }
  ]);

  const personLds = leaders.map((l) =>
    personSchema({ name: l.name, jobTitle: l.title, image: l.avatar }),
  );

  const pageLd = webPageSchema({
    type: 'AboutPage',
    name: t('about_title'),
    description: t('about_desc'),
    path: '/hakkimizda',
  });

  return (
    <div className="bg-slate-50 dark:bg-[#0C0C10] min-h-screen">
      <JsonLd data={[pageLd, breadcrumbLd, ...personLds]} />
      
      {/* 1. Dinamik Hero Bölümü (Premium Slate) */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-slate-950 text-white">
        {/* Zarif arkaplan gradyanı ve dokusu */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#15151C] to-slate-900 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        <div className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <span className="text-sm font-bold text-slate-300 uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              {t('about_title')}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight drop-shadow-xl" dangerouslySetInnerHTML={{ __html: t('about_hero_title') }} />
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl">
              {t('about_desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Sayılarla Alo Yönetim (Key Metrics) */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800/50 bg-white dark:bg-[#050507]">
        <div className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100 dark:divide-slate-800/50">
            <div className="text-center px-4">
              <div className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 mb-2">
                <Counter from={0} to={Number(t('about_stats_1_val') || 15)} />
              </div>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">{t('about_stats_1_label') || "Yıllık Tecrübe"}</p>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 mb-2">
                <Counter from={0} to={Number(t('about_stats_2_val') || 45000)} duration={2.5} />
              </div>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">{t('about_stats_2_label') || "Bağımsız Bölüm"}</p>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 mb-2">
                <Counter from={0} to={Number(t('about_stats_3_val') || 1200)} duration={2} />
              </div>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">{t('about_stats_3_label') || "Saha Çalışanı"}</p>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-6xl font-black text-slate-700 dark:text-slate-300 mb-2">
                %<Counter from={0} to={Number(t('about_stats_4_val') || 22)} />
              </div>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">{t('about_stats_4_label') || "Tasarruf Oranı"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Manifesto (Split Layout) */}
      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <Image 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
              alt="Alo Yönetim Kurumsal" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-10">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-white max-w-sm shadow-2xl">
                <div className="text-4xl font-bold mb-2 text-slate-100">{t('about_manifest_stat')}</div>
                <div className="text-sm font-light text-slate-300 leading-relaxed">{t('about_manifest_stat_desc')}</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest bg-slate-200 dark:bg-slate-800 px-4 py-1.5 rounded-full w-fit">
              {t('about_manifest_badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              {t('about_manifest_title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-4">
              {t('about_manifest_desc')}
            </p>
            <div className="mt-8 flex gap-4">
              <Link href={`/${language}/iletisim`} className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-lg">
                {t('btn_contact_us')} <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ek İçerik: Neden Alo Yönetim? */}
      <WhyUsBentoGrid />

      {/* 4. Değerlerimiz (Premium Bento Grid) */}
      <section className="py-24 bg-white dark:bg-[#050507] border-y border-slate-200 dark:border-slate-800/50">
        <div className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">
              {t('about_values_badge') || "Kurumsal Prensiplerimiz"}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              {t('about_values_title') || "Bizi Biz Yapan Değerler"}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
              {t('about_values_desc') || "Tüm süreçlerimizde şeffaflık ve güveni merkeze alarak hareket ediyoruz."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Büyük Kart - Şeffaflık */}
            <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-10 right-10 w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500">
                <Target size={36} className="text-slate-900 dark:text-white" />
              </div>
              <div className="mt-24 relative z-10">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('about_value_1_title') || "Şeffaflık"}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-light text-lg max-w-md">{t('about_value_1_desc') || "Toplanan her kuruşun nereye harcandığını kat malikleriyle anlık olarak paylaşıyoruz."}</p>
              </div>
            </div>

            {/* Orta Kart 1 - Güvenilirlik */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col group">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={28} className="text-slate-900 dark:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('about_value_2_title') || "Güvenilirlik"}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-light">{t('about_value_2_desc') || "Özel güvenlik sertifikalarımız ve hukuki güvencelerimizle sitenizi sıfır riskle yönetiyoruz."}</p>
            </div>

            {/* Orta Kart 2 - İnovasyon (Koyu Kart) */}
            <div className="bg-slate-900 dark:bg-[#15151C] text-white p-10 rounded-[2.5rem] shadow-xl flex flex-col group relative overflow-hidden border border-slate-800">
              <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Lightbulb size={160} />
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-800/80 backdrop-blur shadow-md flex items-center justify-center mb-8 relative z-10">
                <Lightbulb size={28} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{t('about_value_3_title') || "İnovasyon"}</h3>
              <p className="text-slate-400 font-light relative z-10">{t('about_value_3_desc') || "Geleneksel yönetimi rafa kaldırıp, mobil uygulamalarımız ve AI kameralarla geleceği tasarlıyoruz."}</p>
            </div>

            {/* Orta Kart 3 - Çevre (Koyu Kart 2) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-950 text-white p-10 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row items-center gap-8 group border border-slate-800">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-full bg-slate-700/50 shadow-md flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Leaf size={28} className="text-slate-300" />
                </div>
                <h3 className="text-3xl font-bold mb-4">{t('about_value_4_title') || "Çevreye Duyarlılık"}</h3>
                <p className="text-slate-400 font-light text-lg">{t('about_value_4_desc') || "Sıfır atık, güneş enerjisi ve ekolojik temizlik kimyasallarıyla yeşil doğayı koruyoruz."}</p>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 flex items-center justify-center p-6 text-center text-sm font-medium text-slate-300">
                {t('about_value_4_badge')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ek İçerik: Kalite Sertifikaları */}
      <CertificateBadgeGrid />

      {/* 5. Yönetim Ekibi (Hover Cards - Premium) */}
      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">
            {t('about_team_badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            {t('about_team_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((l, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={i} 
              className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              {/* Fotoğraf (Grayscale'den Renkliye geçiş - Daha yavaş ve pürüzsüz) */}
              <Image 
                src={l.avatar} 
                alt={l.name} 
                fill 
                className="object-cover transition-all duration-700 filter grayscale-[0.9] group-hover:grayscale-0 group-hover:scale-105" 
              />
              
              {/* Alt Bilgi Katmanı (Glassmorphism & Koyu Antrasit) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent flex flex-col justify-end p-8 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-1">{l.name}</h3>
                <p className="text-slate-300 font-medium text-sm mb-4 tracking-wide">{l.title}</p>
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <p className="text-slate-400 font-light text-sm leading-relaxed border-t border-white/10 pt-4 mt-2">
                    {l.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. İnteraktif Tarihçe (Dark Slate) */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#15151C] to-slate-950 -z-10" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        <div className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-4">
              {t('about_timeline_badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              {t('about_timeline_title')}
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto" ref={containerRef}>
            {/* Animasyonlu Çizgi */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 -translate-x-1/2 rounded-full hidden md:block">
              <motion.div 
                className="w-full bg-slate-300 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="flex flex-col gap-12">
              {timeline.map((tItem, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center justify-between gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Sol/Sağ Boşluk Alanı (Büyük Yıl Gösterimi) */}
                  <div className="flex-1 w-full text-left md:text-right">
                    {i % 2 === 0 && (
                      <div className="hidden md:block">
                        <div className="text-6xl font-black text-slate-800">{tItem.year}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Düğüm Noktası */}
                  <div className="w-10 h-10 rounded-full bg-slate-950 border-[3px] border-slate-600 shadow-xl flex items-center justify-center z-10 hidden md:flex shrink-0 transition-colors duration-500 hover:border-slate-300">
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"></div>
                  </div>

                  {/* İçerik Kartı */}
                  <div className="flex-1 w-full text-left bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-600 transition-colors duration-300">
                    <div className="absolute -top-6 -right-6 text-8xl font-black text-white/5 z-0 select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      {tItem.year}
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block md:hidden text-3xl font-black text-white mb-2">{tItem.year}</span>
                      <h3 className="text-2xl font-bold text-slate-200 mb-3">{tItem.title}</h3>
                      <p className="text-slate-400 font-light leading-relaxed">{tItem.desc}</p>
                    </div>
                  </div>
                  
                  {/* Diğer Yön Boşluk Alanı */}
                  <div className="flex-1 w-full text-left">
                    {i % 2 !== 0 && (
                      <div className="hidden md:block">
                        <div className="text-6xl font-black text-slate-800">{tItem.year}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Kapanış / CTA */}
      <PreFooterCta />
    </div>
  );
}
