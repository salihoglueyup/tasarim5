import PageHeader from '@/components/layout/page/PageHeader';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, faqPageSchema, webPageSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import FaqClient from './FaqClient';
import { buildMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { redis } from '@/lib/redis';
import { FaqAiOverviewHubSeo, FactCheckAiGroundingSeo, PeopleAlsoAskDeepTreeSeo } from '@/components/seo';
import Link from 'next/link';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';


export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return buildMetadata({
    title: 'Sıkça Sorulan Sorular & KMK 634 Rehberi | Alo Yönetim',
    description: 'Site yönetimi, aidat icra takibi, 5188 özel güvenlik ve KMK 634 hakkında en çok merak edilen 40+ soru ve uzman yanıtları. Hukuki rehberi inceleyin!',
    path: '/sss',
    lang,
    targetKeyword: 'site yönetimi sıkça sorulan sorular',
    keywords: [
      'site yönetimi sss',
      'apartman yönetimi soruları',
      'kmk 634 soruları',
      'aidat ödenmezse ne olur',
      'yönetici nasıl seçilir',
    ],
  });
}

export default async function SSSPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  let faqs: any[] = [];
  const cacheKeyFaqs = `sss_faqs_list_v2_${lang}`;

  try {
    const cached = await redis.get(cacheKeyFaqs);
    if (cached) faqs = JSON.parse(cached);
  } catch {
    // Redis offline fallback
  }

  if (faqs.length === 0) {
    faqs = await prisma.faq.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    }).catch(() => []);

    if (faqs.length > 0) {
      redis.setex(cacheKeyFaqs, 3600, JSON.stringify(faqs)).catch(() => {});
    }
  }

  // Benzersiz kategorileri bul ve sayılarını hesapla
  const uniqueCategories = Array.from(new Set(faqs.map(f => f.category)));
  
  const categories = [
    { name: 'Tümü', count: faqs.length },
    ...uniqueCategories.map(cat => ({
      name: cat,
      count: faqs.filter(f => f.category === cat).length
    }))
  ];

  const jsonLd = faqPageSchema(
    faqs.map((f) => ({ question: f.question, answer: f.answer.replace(/<[^>]+>/g, '') }))
  );

  const breadcrumbLd = generateBreadcrumbs([
    { name: dict.nav_home || 'Anasayfa', url: lang === 'tr' ? '/' : `/${lang}` },
    { name: dict.sss_title || 'Sıkça Sorulan Sorular', url: lang === 'tr' ? '/sss' : `/${lang}/sss` }
  ]);

  const pageLd = webPageSchema({
    name: dict.sss_title + ' — Alo Yönetim',
    path: '/sss',
    speakableSelectors: ['#faq-instant-answer-text', '#factcheck-instant-answer-text', '#paa-deep-tree-instant-answer-text', 'h1', '.faq-question', '.faq-answer'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, jsonLd, pageLd]} />
      <PageHeader 
        title={dict.sss_title} 
        description={dict.sss_desc} 
      />

      <section className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-7xl mx-auto space-y-16 md:space-y-24">
        {/* 1. Canlı SSS Arama, Kategori Filtreleme ve 595+ Soru Listesi */}
        <FaqClient faqs={faqs} categories={categories} lang={lang} />

        {/* 2. Yapay Zeka Karar Masası, Hukuki Mitler ve PAA Ağacı */}
        <div className="space-y-10 pt-12 border-t border-[var(--color-outline)]/60 dark:border-white/10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
              Yapay Zeka Destekli Karar Masası
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
              Kat Mülkiyetinde Hukuki Standartlar & Yargıtay Gerçekleri
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              634 Sayılı Kat Mülkiyeti Kanunu ve 5188 Sayılı Güvenlik Kanunu kapsamında Google AI Overviews ve Perplexity gibi üretken yapay zekaların başvurduğu doğrudan kanıt kütüğü.
            </p>
          </div>

          <FaqAiOverviewHubSeo />
          <FactCheckAiGroundingSeo lang={lang} />
          <PeopleAlsoAskDeepTreeSeo lang={lang} />
        </div>

        {/* 3. Lüks Çift Butonlu Dönüşüm CTA'sı */}
        <div className="p-8 sm:p-10 md:p-12 rounded-3xl bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 shadow-xs relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Profesyonel Yönetim & Hukuki Çözüm
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {dict.sss_cta_title || 'Aradığınız Sorunun Cevabını Bulamadınız mı?'}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                {dict.sss_cta_desc || 'Sitenize özel yönetim planı, aidat projeksiyonu veya yasal mevzuat uyuşmazlıkları için uzman kadromuzla hemen iletişime geçin, 10 dakikada şeffaf bütçe teklifi alın.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
              <Link 
                href={lang === 'tr' ? '/teklif-al' : `/${lang}/teklif-al`} 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm transition-all shadow-xs cursor-pointer"
              >
                <span>{dict.sss_cta_btn || '10 Dakikada Teklif Al'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href={lang === 'tr' ? '/iletisim' : `/${lang}/iletisim`} 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-semibold text-sm transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Uzmanımıza Danışın</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

