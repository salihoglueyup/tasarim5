"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_POSTS = [
  { 
    slug: "2024-aidat-artis-oranlari", 
    title: "2024 Yılı Aidat Artış Oranları ve Yasal Haklarınız", 
    date: "15 Ekim 2023", 
    category: "Hukuk",
    image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    slug: "deprem-risk-analizi", 
    title: "Sitenizde Deprem Risk Analizi Nasıl Yapılmalı?", 
    date: "02 Eylül 2023", 
    category: "Güvenlik",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    slug: "2024-aidat-artis-oranlari", 
    title: "Enerji Verimliliği Sağlayan Akıllı Aydınlatma Sistemleri", 
    date: "18 Ağustos 2023", 
    category: "Teknoloji",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    slug: "deprem-risk-analizi", 
    title: "Site Yönetimlerinde Şeffaflık Neden Önemli?", 
    date: "05 Temmuz 2023", 
    category: "Yönetim",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    slug: "kentsel-donusum-surecleri", 
    title: "Sitelerde Kentsel Dönüşüm Süreci Nasıl İlerler?", 
    date: "12 Haziran 2023", 
    category: "Hukuk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    slug: "yuzme-havuzu-bakim-kimyasallari", 
    title: "Yaz Öncesi Yüzme Havuzu Hazırlığı ve Kimyasal Kullanımı", 
    date: "24 Mayıs 2023", 
    category: "Yönetim",
    image: "https://images.unsplash.com/photo-1537565266751-341a94bc7d6f?q=80&w=2000&auto=format&fit=crop"
  }
];

const CATEGORIES = ["Tümü", "Hukuk", "Güvenlik", "Teknoloji", "Yönetim"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = activeCategory === "Tümü" 
    ? ALL_POSTS 
    : ALL_POSTS.filter(post => post.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <>
      <PageHeader 
        title="Blog & Haberler" 
        description="Tesis yönetimi sektörüyle ilgili güncel gelişmeler, yasal değişiklikler ve uzman makalelerimiz." 
      />

      {/* Newsletter Banner */}
      <section className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto mt-12">
        <div className="bg-gradient-to-r from-blue-900 via-[#122338] to-[#081524] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit mb-4">
              <span className="material-symbols-outlined text-sm">mail</span>
              Tesis Yönetimi E-Bülten
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Sektördeki Gelişmeleri Kaçırmayın</h3>
            <p className="text-gray-300 font-light">KMK değişiklikleri, asgari ücret / aidat zam oranları ve yönetim ipuçları ayda bir kez e-posta kutunuzda.</p>
          </div>
          <form onSubmit={handleSubscribe} className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="E-posta adresiniz" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-blue-400 w-full md:w-80 transition-colors backdrop-blur-sm"
              required
            />
            <button 
              type="submit" 
              className={`px-8 py-4 rounded-xl font-bold transition-all shadow-lg whitespace-nowrap flex items-center justify-center gap-2 ${
                subscribed ? 'bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {subscribed ? (
                <><span className="material-symbols-outlined">check_circle</span> Abone Olundu</>
              ) : (
                'Ücretsiz Kaydol'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto min-h-[600px]">
        
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={post.slug}
              >
                <Link href={`/blog/${post.slug}`} className="group cursor-pointer block">
                  <div className="w-full aspect-[16/9] bg-gray-100 rounded-[2rem] mb-6 overflow-hidden relative border border-gray-200/50 shadow-sm">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-700 font-bold px-4 py-1.5 rounded-full text-xs shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-3 text-gray-500 font-light text-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      3 dk okuma
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <span className="material-symbols-outlined text-4xl mb-3">inbox</span>
            <p>Bu kategoride henüz yazı bulunmamaktadır.</p>
          </div>
        )}

      </section>
    </>
  );
}

