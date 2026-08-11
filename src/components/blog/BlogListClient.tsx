'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const PAGE_SIZE = 6;

function formatDate(iso: string | Date): string {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogListClient({ posts, categories }: { posts: any[], categories: any[] }) {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const catOk = activeCategory === 'all' || p.category?.slug === activeCategory;
      
      let tags = p.tags || [];
      if (typeof tags === 'string') {
        try { tags = JSON.parse(tags); } catch { tags = []; }
      }
      
      const qOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (tags.length > 0 && tags.some((tag: string) => tag.toLowerCase().includes(q)));
        
      return catOk && qOk;
    });
  }, [posts, activeCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <>
      {/* Newsletter */}
      <section className="px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto mt-12">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" style={{ transform: "translateZ(0)" }}></div>
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-widest bg-slate-500/10 px-4 py-1.5 rounded-full w-fit mb-4">
              <span className="material-symbols-outlined text-sm">mail</span>
              {t('blog_nl_tag') || 'Haber Bülteni'}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('blog_nl_title') || 'Gelişmelerden Haberdar Olun'}</h2>
            <p className="text-gray-300 font-light">{t('blog_nl_desc') || 'En yeni mevzuat değişiklikleri ve yönetim ipuçları doğrudan e-posta kutunuza gelsin.'}</p>
          </div>
          <form onSubmit={handleSubscribe} className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder={t('blog_nl_ph') || 'E-posta adresiniz'}
              aria-label={t('blog_nl_ph') || 'E-posta adresiniz'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-white w-full md:w-80 transition-colors backdrop-blur-sm"
              required
            />
            <button
              type="submit"
              aria-label={t('blog_nl_title')}
              className={`px-8 py-4 rounded-xl font-bold transition-all shadow-lg whitespace-nowrap flex items-center justify-center gap-2 ${
                subscribed ? 'bg-slate-500 text-white' : 'bg-white text-slate-950 hover:bg-slate-100'
              }`}
            >
              {subscribed ? (
                <><span className="material-symbols-outlined">check_circle</span> {t('blog_nl_success') || 'Kayıt Başarılı!'}</>
              ) : (
                t('blog_nl_btn') || 'Abone Ol'
              )}
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto min-h-[600px]">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Yazılarda ara: aidat, güvenlik, havuz…"
            aria-label="Blog içinde ara"
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-12 pr-5 py-3.5 text-sm focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => { setActiveCategory('all'); setPage(1); }}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${activeCategory === 'all' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md scale-105' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50'}`}
          >
            Tümü
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setActiveCategory(cat.slug); setPage(1); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${activeCategory === cat.slug ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md scale-105' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {paged.map((post) => {
              return (
                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group cursor-pointer block">
                    <div className="w-full aspect-[16/9] bg-gray-100 rounded-[2rem] mb-6 overflow-hidden relative border border-gray-200/50 shadow-sm">
                      <Image src={post.image || '/images/hero-poster-v5.webp'} alt={post.title} width={800} height={450} sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 font-bold px-4 py-1.5 rounded-full text-xs shadow-sm">
                        {post.category?.name || 'Kategori Yok'}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-3 text-gray-500 font-light text-sm">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        {formatDate(post.datePublished)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-2 line-clamp-2">{post.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <span className="material-symbols-outlined text-4xl mb-3">inbox</span>
            <p>Aramanıza uygun yazı bulunamadı.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={current === 1}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-white/5"
              aria-label="Önceki sayfa"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-current={current === n ? 'page' : undefined}
                className={`w-10 h-10 rounded-full text-sm font-bold transition-colors ${current === n ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950' : 'border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={current === totalPages}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-white/5"
              aria-label="Sonraki sayfa"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
