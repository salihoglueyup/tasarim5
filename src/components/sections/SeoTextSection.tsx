"use client";

import { useLanguage } from '@/context/LanguageContext';
import SemanticLinker from '@/components/seo/SemanticLinker';

interface SeoTextSectionProps {
  titleKey?: string;
  p1Key?: string;
  p2Key?: string;
}

export default function SeoTextSection({
  titleKey = 'home_seo_title',
  p1Key = 'home_seo_p1',
  p2Key = 'home_seo_p2'
}: SeoTextSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="speakable-content" className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto bg-slate-50 dark:bg-[#0a192b] border-y border-slate-200/50 dark:border-white/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-primary)] mb-6 tracking-tight text-center md:text-left">
          {t(titleKey as Parameters<typeof t>[0])}
        </h2>
        
        <div className="text-lg text-[var(--color-secondary)] leading-relaxed space-y-6 text-center md:text-left font-light">
          <p><SemanticLinker text={t(p1Key as Parameters<typeof t>[0]) as string} /></p>
          <p><SemanticLinker text={t(p2Key as Parameters<typeof t>[0]) as string} /></p>
        </div>
      </div>
    </section>
  );
}
