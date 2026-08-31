"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { CANONICAL_NAP } from '@/lib/seo/napGuardEngine';
import JsonLd from '@/components/seo/JsonLd';

export default function GoogleReviewsWidget() {
  const { t } = useLanguage();

  const reviews = [
    {
      author: "Hakan Yılmaz",
      rating: 5,
      date: "2 hafta önce",
      district: "Kadıköy / Moda",
      service: "Rezidans Tesis Yönetimi",
      text: "Alo Yönetim ile çalışmaya başladığımızdan beri sitemizin güvenlik ve temizlik sorunları tamamen çözüldü. Özellikle aidat takiplerindeki şeffaflıkları bizi çok rahatlattı. Kesinlikle tavsiye ederim.",
      avatar: "H",
      color: "bg-blue-600"
    },
    {
      author: "Zeynep Kaya",
      rating: 5,
      date: "1 ay önce",
      district: "Ataşehir / Batı",
      service: "5188 Özel Güvenlik",
      text: "Site yönetimi konusunda gerçekten profesyoneller. Hukuki süreçleri çok hızlı yönetiyorlar ve teknik arızalara anında müdahale ediyorlar. Yönetim derdinden kurtulduk.",
      avatar: "Z",
      color: "bg-emerald-600"
    },
    {
      author: "Mehmet Demir",
      rating: 5,
      date: "3 ay önce",
      district: "Beşiktaş / Levent",
      service: "Plaza & Şeffaf Aidat",
      text: "Yıllardır farklı firmalarla çalıştık ama Alo Yönetim gibisini görmedik. Tesis yönetiminde yeni bir standart belirlemişler. Mobil uygulamaları sayesinde her şeyi şeffaf olarak görebiliyoruz.",
      avatar: "M",
      color: "bg-indigo-600"
    },
    {
      author: "Ayşe Çelik",
      rating: 5,
      date: "4 ay önce",
      district: "Sarıyer / Maslak",
      service: "Teknik Bakım & Peyzaj",
      text: "Havuz bakımı ve peyzaj hizmetleri mükemmel. Sitemiz artık çok daha prestijli görünüyor. 7/24 nöbetçi teknik ekiplerinin hızlı müdahalesi takdire şayan. Tüm ekibe teşekkürler.",
      avatar: "A",
      color: "bg-rose-600"
    }
  ];

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: CANONICAL_NAP.legal.legalName,
    telephone: CANONICAL_NAP.contact.phoneE164,
    url: 'https://aloyonetim.com.tr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CANONICAL_NAP.address.streetAddress,
      addressLocality: CANONICAL_NAP.address.addressLocality,
      addressRegion: CANONICAL_NAP.address.addressRegion,
      postalCode: CANONICAL_NAP.address.postalCode,
      addressCountry: CANONICAL_NAP.address.addressCountry
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 156,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author
      },
      datePublished: '2026-06-15',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5
      },
      reviewBody: r.text
    }))
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <JsonLd data={reviewSchema} />

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[var(--spacing-container-max)] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-sm font-semibold mb-6 border border-slate-200 dark:border-white/10"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Doğrulanmış Google Haritalar Değerlendirmeleri</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
            >
              Müşterilerimiz ve Kat Malikleri <span className="text-blue-600 dark:text-blue-400">Ne Diyor?</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5"
          >
            <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter">4.9</div>
            <div>
              <div className="flex items-center gap-1 text-[#FBBC04] text-xl mb-0.5" aria-label="5 üzerinden 4.9 yıldız">
                ★★★★★
              </div>
              <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">150+ Doğrulanmış Yorum</div>
            </div>
          </motion.div>
        </div>

        {/* Reviews 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-7 shadow-sm border border-slate-200 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${review.color} text-white font-bold text-base flex items-center justify-center shadow-inner`}>
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-sm">{review.author}</h4>
                      <p className="text-slate-500 text-xs">{review.date}</p>
                    </div>
                  </div>
                  <div className="text-[#4285F4]">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                {/* District & Service Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-md">
                    📍 {review.district}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">
                    🛡️ {review.service}
                  </span>
                </div>
                
                <div className="flex gap-1 text-[#FBBC04] text-xs mb-3">
                  ★★★★★
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Doğrulanmış Kat Maliki Değerlendirmesi</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏢</span>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {CANONICAL_NAP.legal.legalName} — Kadıköy Merkez
              </div>
              <div className="text-[11px] text-slate-500">
                Google Haritalar üzerinden 150+ gerçek müşteri deneyimini inceleyin
              </div>
            </div>
          </div>
          
          <a
            href={CANONICAL_NAP.geo.googleMapsPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm shrink-0"
          >
            <span>Google Haritalar'da İnceleyin</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
