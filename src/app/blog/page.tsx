"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

export default function Blog() {
  const posts = [
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
  ];

  return (
    <>
      <PageHeader 
        title="Blog & Haberler" 
        description="Tesis yönetimi sektörüyle ilgili güncel gelişmeler, yasal değişiklikler ve uzman makalelerimiz." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} className="group cursor-pointer block">
              <div className="w-full aspect-[16/9] bg-[var(--color-outline)]/20 rounded-[2rem] mb-6 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-4 mb-4 text-[var(--color-secondary)] font-light text-sm">
                <span className="uppercase tracking-widest font-bold text-[var(--color-primary)]">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
