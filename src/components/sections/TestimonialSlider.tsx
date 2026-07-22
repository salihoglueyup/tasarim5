"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    title: "Yönetim Kurulu Başkanı",
    site: "Lalezar Konakları (240 Daire)",
    location: "Kadıköy, İstanbul",
    rating: 5,
    comment: "Eski yönetimde aidatların nereye gittiğini takip edemiyorduk. Alo Yönetim'e geçtikten sonra ilk yıl bütçemizde %24 net tasarruf sağladık. Tüm harcamalar şeffaf bir şekilde cebimizde.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    title: "Denetim Kurulu Üyesi",
    site: "Sapphire Residence (180 Daire)",
    location: "Ataşehir, İstanbul",
    rating: 5,
    comment: "Asansör ve jeneratör bakımlarında 7/24 teknik müdahale garantisi veriyorlar. Gece yarısı su patlaması olduğunda bile 15 dakikada ekipler sahadaydı.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Mehmet Demir",
    title: "Site Yöneticisi",
    site: "Marina Towers (320 Daire)",
    location: "Kartal, İstanbul",
    rating: 5,
    comment: "Geciken aidatların icra takibinde ve hukuk süreçlerinde o kadar profesyoneller ki komşular arasında husumet çıkmadan tüm alacaklar tahsil edildi.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Selin Öztürk",
    title: "Kat Maliki",
    site: "Koru Park Evleri (95 Daire)",
    location: "Ümraniye, İstanbul",
    rating: 5,
    comment: "Mobil uygulama üzerinden aidatımı kredi kartıyla taksitle ödeyebilmek harika bir rahatlık. Havuz rezervasyonlarımı bile telefondan yapıyorum.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Mustafa Çelik",
    title: "Site Müdürü",
    site: "Vadi Panorama Projesi (410 Daire)",
    location: "Sarıyer, İstanbul",
    rating: 5,
    comment: "Peyzaj ve ekolojik temizlik kimyasalları konusunda ISO standartlarına tam uyuyorlar. Çocuklarımız ortak alanlarda gönül rahatlığıyla oynuyor.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Zeynep Arslan",
    title: "Yönetim Kurulu Üyesi",
    site: "Akasya Evleri (150 Daire)",
    location: "Bakırköy, İstanbul",
    rating: 5,
    comment: "48 saatlik devir teslim sürecinde eski yönetimden tüm evrakları sıfır sorunla teslim aldılar. Profesyonellik tam olarak bu.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Burak Şahin",
    title: "Rezidans Yöneticisi",
    site: "Horizon Plaza & Loft (210 Daire)",
    location: "Şişli, İstanbul",
    rating: 5,
    comment: "Güvenlik personelinin 5188 kanun eğitimi ve kriz anındaki tavrı mükemmel. Güvenlik odamız 7/24 yapay zeka kameralarıyla izleniyor.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Canan Erdem",
    title: "Kat Maliki",
    site: "Yeşiltepe Sitesi (130 Daire)",
    location: "Maltepe, İstanbul",
    rating: 5,
    comment: "Aylık gelir-gider raporları her ayın 1'inde e-posta ve mobil uygulama üzerinden şeffafça gönderiliyor. Güvenimiz tam.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto overflow-hidden">
      
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full">
            Gerçek Müşteri Deneyimleri
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight mt-4">
            Yöneticilerimiz Ne Diyor?
          </h2>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full border border-[var(--color-outline)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            aria-label="Önceki Yorum"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="text-sm font-bold text-[var(--color-secondary)] px-2">
            {currentIndex + 1} / {testimonials.length}
          </span>
          <button 
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full border border-[var(--color-outline)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            aria-label="Sonraki Yorum"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Main Active Testimonial Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-10 md:p-16 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden"
        >
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(current.rating)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-2xl fill-current">star</span>
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl text-[var(--color-primary)] font-light leading-relaxed italic">
              "{current.comment}"
            </blockquote>

            <div className="flex items-center gap-4">
              <img 
                src={current.avatar} 
                alt={current.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
              />
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary)]">{current.name}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-medium">{current.title} • {current.site}</p>
                <span className="text-xs text-gray-400">{current.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 to-[#122338] text-white p-8 rounded-[2rem] flex flex-col gap-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span className="material-symbols-outlined">verified</span>
              Onaylı Kullanıcı Yorumu
            </div>
            <div className="text-xs text-gray-300 leading-relaxed">
              Bu değerlendirme Alo Yönetim tarafından hizmet verilen {current.site} yönetim kurulundan alınmıştır.
            </div>
          </div>

        </motion.div>
      </AnimatePresence>

    </section>
  );
}
