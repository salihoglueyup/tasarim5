import Link from 'next/link';
import { POSTS } from '@/data/posts';

/**
 * Pillar → cluster iç linki (SEO Master Plan V4 — Faz 152).
 * Bir hizmet (pillar) sayfasına, o pillar'a bağlı blog makalelerinin listesini
 * ekler. Client sayfalarda da güvenle kullanılır (yalnız statik Link render eder).
 */
export default function RelatedArticles({ pillar }: { pillar: string }) {
  const posts = POSTS.filter((p) => p.pillar === pillar).slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">İlgili Rehberler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-5 hover:shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-blue-600 shrink-0">article</span>
              <div>
                <h3 className="font-bold text-[var(--color-primary)] group-hover:text-blue-600 transition-colors leading-snug">
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
