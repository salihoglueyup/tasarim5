"use client";

import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';;
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

export default function BasariHikayeleriClient({ stories }: { stories: any[] }) {
  const { t, language } = useLanguage();

  const getStoryField = (story: any, field: string) => {
    if (language === 'en' && story[`${field}_en`]) return story[`${field}_en`];
    if (language === 'ru' && story[`${field}_ru`]) return story[`${field}_ru`];
    if (language === 'ar' && story[`${field}_ar`]) return story[`${field}_ar`];
    return story[field];
  };

  // Faz 167: Çok Dilli Başarı Hikayeleri & Vaka Analizleri
  const cases = stories && stories.length > 0 ? stories.map(s => {
    let parsedStats = [];
    try {
      parsedStats = s.stats ? JSON.parse(s.stats) : [];
    } catch(e) {}
    
    return {
      title: getStoryField(s, 'title'),
      tag: getStoryField(s, 'category') || t('case_1_tag'),
      desc: getStoryField(s, 'content') || getStoryField(s, 'testimonialText') || t('case_1_desc'),
      stats: parsedStats.map((st: any) => `${st.label}: ${st.value}`)
    }
  }) : [
    {
      title: t('case_1_title'),
      tag: t('case_1_tag'),
      desc: t('case_1_desc'),
      stats: [t('case_1_stat_1'), t('case_1_stat_2'), t('case_1_stat_3')]
    },
    {
      title: t('case_2_title'),
      tag: t('case_2_tag'),
      desc: t('case_2_desc'),
      stats: [t('case_2_stat_1'), t('case_2_stat_2'), t('case_2_stat_3')]
    },
    {
      title: t('case_3_title'),
      tag: t('case_3_tag'),
      desc: t('case_3_desc'),
      stats: [t('case_3_stat_1'), t('case_3_stat_2'), t('case_3_stat_3')]
    }
  ];
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t('case_page_title'), url: '/basari-hikayeleri' }
  ]);

  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: t('case_page_title'),
    description: t('case_page_desc'),
    path: '/basari-hikayeleri',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <PageHeader 
        title={t('case_page_title')} 
        description={t('case_page_desc')} 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="flex flex-col gap-12">
          {cases.map((c, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-10 md:p-14 rounded-[3rem] shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:border-[var(--color-primary)] transition-all">
              <div className="flex flex-col gap-4 max-w-2xl">
                <span className="text-xs font-bold text-slate-600 bg-slate-500/10 px-4 py-1.5 rounded-full w-fit">
                  {c.tag}
                </span>
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">{c.title}</h2>
                <p className="text-lg text-[var(--color-secondary)] font-light leading-relaxed">{c.desc}</p>
              </div>

              <div className="flex flex-col gap-4 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex-1">
                {c.stats.map((s: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-[var(--color-primary)]">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white shrink-0">bar_chart</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
