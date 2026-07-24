"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { generateBreadcrumbs } from '@/lib/schemas';

export default function Blog() {
  const { t } = useLanguage();

  const ALL_POSTS = [
    { 
      slug: "2024-aidat-artis-oranlari", 
      title: t('blog_post_1_title'), 
      date: t('blog_post_1_date'), 
      category: t('blog_cat_law'),
      image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      slug: "deprem-risk-analizi", 
      title: t('blog_post_2_title'), 
      date: t('blog_post_2_date'), 
      category: t('blog_cat_security'),
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      slug: "2024-aidat-artis-oranlari", // reusing slug for demo
      title: t('blog_post_3_title'), 
      date: t('blog_post_3_date'), 
      category: t('blog_cat_tech'),
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      slug: "deprem-risk-analizi", // reusing slug for demo
      title: t('blog_post_4_title'), 
      date: t('blog_post_4_date'), 
      category: t('blog_cat_mgmt'),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      slug: "kentsel-donusum-surecleri", 
      title: t('blog_post_5_title'), 
      date: t('blog_post_5_date'), 
      category: t('blog_cat_law'),
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      slug: "yuzme-havuzu-bakim-kimyasallari", 
      title: t('blog_post_6_title'), 
      date: t('blog_post_6_date'), 
      category: t('blog_cat_mgmt'),
      image: "https://images.unsplash.com/photo-1537565266751-341a94bc7d6f?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  const CATEGORIES = [
    t('blog_cat_all'), 
    t('blog_cat_law'), 
    t('blog_cat_security'), 
    t('blog_cat_tech'), 
    t('blog_cat_mgmt')
  ];

  const [activeCategory, setActiveCategory] = useState(t('blog_cat_all'));
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = activeCategory === t('blog_cat_all') 
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

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('blog_page_title'), url: '/blog' }
  ]);

  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t('blog_page_title'),
    description: t('blog_page_desc'),
    url: 'https://aloyonetim.com/blog',
    blogPost: ALL_POSTS.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date, // In reality, format to ISO string like 2024-01-01
      url: `https://aloyonetim.com/blog/${post.slug}`,
      image: post.image
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      <PageHeader 
        title={t('blog_page_title')} 
        description={t('blog_page_desc')} 
      />

      {/* Newsletter Banner */}
      <section className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto mt-12">
        <div className="bg-gradient-to-r from-blue-900 via-[#122338] to-[#081524] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit mb-4">
              <span className="material-symbols-outlined text-sm">mail</span>
              {t('blog_nl_tag')}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('blog_nl_title')}</h3>
            <p className="text-gray-300 font-light">{t('blog_nl_desc')}</p>
          </div>
          <form onSubmit={handleSubscribe} className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder={t('blog_nl_ph')} 
              aria-label={t('blog_nl_ph')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-blue-400 w-full md:w-80 transition-colors backdrop-blur-sm"
              required
            />
            <button 
              type="submit" 
              aria-label={t('blog_nl_title')}
              className={`px-8 py-4 rounded-xl font-bold transition-all shadow-lg whitespace-nowrap flex items-center justify-center gap-2 ${
                subscribed ? 'bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {subscribed ? (
                <><span className="material-symbols-outlined">check_circle</span> {t('blog_nl_success')}</>
              ) : (
                t('blog_nl_btn')
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
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      width={800}
                      height={450}
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
                      {t('blog_read_time')}
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
            <p>{t('blog_empty')}</p>
          </div>
        )}

      </section>
    </>
  );
}

