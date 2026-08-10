'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getRelatedPosts } from '@/app/actions/post-actions';

/**
 * Pillar → cluster iç linki (SEO Master Plan V4 — Faz 152).
 * Bir hizmet (pillar) sayfasına, o pillar'a bağlı blog makalelerinin listesini
 * ekler. Client sayfalarda da güvenle kullanılır.
 */
export default function RelatedArticles({ pillar }: { pillar: string }) {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRelatedPosts(pillar).then((data) => {
      setPosts(data || []);
      setLoading(false);
    });
  }, [pillar]);
  
  if (loading || posts.length === 0) return null;

  return (
    <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">{t('blog_related_guides')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-5 hover:shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-slate-900 dark:text-white shrink-0">article</span>
              <div>
                <h3 className="font-bold text-[var(--color-primary)] group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-[var(--color-secondary)] font-light mt-1 line-clamp-2">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
