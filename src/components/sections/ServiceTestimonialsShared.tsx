"use client";

import { useLanguage } from '@/context/LanguageContext';
import ReviewListSeo from '@/components/seo/ReviewListSeo';

export interface ServiceTestimonialItem {
  quote: string;
  author: string;
  role: string;
  project: string;
}

export interface ServiceTestimonialsSharedProps {
  titleKey: string;
  descKey: string;
  testimonials: ServiceTestimonialItem[];
}

/**
 * Faz 45: 9 Farklı Testimonial bileşenini tek bir paylaşımlı, hafif,
 * donanım hızlandırmalı CSS mimarisinde birleştiren standart bileşen.
 * Framer Motion kaldırılmış, GPU CSS sınıflarıyla sıfır-jank geçişler sağlanmıştır.
 */
export default function ServiceTestimonialsShared({
  titleKey,
  descKey,
  testimonials,
}: ServiceTestimonialsSharedProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-10 md:p-14 shadow-sm relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">
          {t(titleKey as any)}
        </h2>
        <p className="text-sm text-[var(--color-secondary)] font-light mt-4">
          {t(descKey as any)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <div 
            key={idx}
            className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-gray-200/60 dark:border-white/5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 transform-gpu"
          >
            <div>
              <span className="text-slate-400 text-4xl leading-none font-serif">&quot;</span>
              <p className="text-[var(--color-secondary)] italic font-light text-sm mt-2 mb-6">
                {t(item.quote as any)}
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-lg">
                {item.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-[var(--color-primary)] font-bold text-sm">{item.author}</h4>
                <p className="text-xs text-[var(--color-secondary)]">{t(item.role as any)}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{item.project}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReviewListSeo 
        reviews={testimonials.map(item => ({
          author: item.author,
          reviewBody: t(item.quote as any) || item.quote,
          rating: 5
        }))}
      />
    </div>
  );
}
