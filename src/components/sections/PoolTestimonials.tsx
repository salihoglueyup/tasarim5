"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ReviewListSeo from '@/components/seo/ReviewListSeo';

export default function PoolTestimonials() {
  const { t } = useLanguage();
  const testimonials = [
    {
      quote: "testi_pool_q1",
      author: "Hakan Yılmaz",
      role: "testi_pool_r1",
      project: "Aqua Palace"
    },
    {
      quote: "testi_pool_q2",
      author: "Aslı Demir",
      role: "testi_pool_r2",
      project: "MyWorld Europe"
    },
    {
      quote: "testi_pool_q3",
      author: "Selim Çetin",
      role: "testi_pool_r3",
      project: "Bosphorus City"
    }
  ];

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-10 md:p-14 shadow-sm relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('testi_pool_title')}</h2>
        <p className="text-sm text-[var(--color-secondary)] font-light mt-4">{t('testi_pool_desc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-gray-200/60 dark:border-white/5 flex flex-col justify-between"
          >
            <div>
              <span className="text-slate-400 text-4xl leading-none font-serif">"</span>
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
          </motion.div>
        ))}
      </div>
      <ReviewListSeo 
        reviews={testimonials.map(item => ({
          author: item.author,
          reviewBody: t(item.quote as any) || item.quote,
          rating: 5
        }))} 
        ratingValue="4.9" 
      />
    </div>
  );
}
