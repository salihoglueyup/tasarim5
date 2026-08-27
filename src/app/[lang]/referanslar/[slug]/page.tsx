import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { buildMetadata, LOCALES } from '@/lib/seo';
import redis from '@/lib/redis';
import { autoLinkHtml } from '@/lib/autoLinker';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getReferenceBySlug, REFERENCES_DATA } from '@/data/references';

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    let slugs: string[] = [];
    try {
      const refs = await prisma.reference.findMany({
        where: { published: true },
        select: { slug: true }
      });
      slugs = refs.map((r) => r.slug);
    } catch {
      // Fallback
    }

    if (slugs.length === 0) {
      slugs = REFERENCES_DATA.map((r) => r.slug);
    }

    return LOCALES.flatMap((lang) =>
      slugs.map((slug) => ({ lang, slug }))
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  let ref: any = null;
  try {
    ref = await prisma.reference.findUnique({
      where: { slug },
      select: { title: true, title_en: true, title_ru: true, title_ar: true, category: true, location: true, location_en: true, location_ru: true, location_ar: true, published: true },
    });
  } catch {
    // Fallback
  }

  if (!ref) {
    ref = getReferenceBySlug(slug, lang);
  }

  if (!ref || !ref.published) {
    return buildMetadata({ title: 'Referans Bulunamadı', description: '', path: `/referanslar/${slug}`, lang, noindex: true });
  }

  const title = lang === 'en' && ref.title_en ? ref.title_en : lang === 'ru' && ref.title_ru ? ref.title_ru : lang === 'ar' && ref.title_ar ? ref.title_ar : ref.title;
  const location = lang === 'en' && ref.location_en ? ref.location_en : lang === 'ru' && ref.location_ru ? ref.location_ru : lang === 'ar' && ref.location_ar ? ref.location_ar : ref.location;

  return buildMetadata({
    title: `${title} — ${location} Referansı | Alo Yönetim`,
    description: `${ref.category} kategorisinde ${location} bölgesinde yönetilen ${title} projemiz. Alo Yönetim profesyonel tesis yönetimi referansları.`,
    path: `/referanslar/${slug}`,
    lang,
    keywords: [ref.category, location, 'site yönetimi referansı', 'tesis yönetimi projesi'],
  });
}

export default async function ReferenceDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;

  let project: any = null;
  const cacheKey = `referans_detail_${slug}_${lang}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      project = JSON.parse(cached);
    }
  } catch (e) {
    console.warn("Redis okuma hatası:", e);
  }

  if (!project) {
    try {
      project = await prisma.reference.findUnique({
        where: { slug }
      });
    } catch (e) {
      console.warn("Veritabanı referans okuma hatası, statik veriye geçiliyor:", e);
    }
    
    if (!project) {
      project = getReferenceBySlug(slug, lang);
    }

    if (project) {
      try {
        await redis.setex(cacheKey, 3600, JSON.stringify(project));
      } catch (e) {
        console.warn("Redis yazma hatası:", e);
      }
    }
  }

  if (!project || !project.published) {
    notFound();
  }

  // Parse stats and gallery
  let stats: { label: string; value: string }[] = [];
  if (Array.isArray(project.stats)) {
    stats = project.stats;
  } else if (typeof project.stats === 'string') {
    try {
      stats = JSON.parse(project.stats);
    } catch (e) {
      console.error("Stats parse error:", e);
    }
  }

  let gallery: string[] = [];
  if (Array.isArray(project.gallery)) {
    gallery = project.gallery;
  } else if (typeof project.gallery === 'string') {
    gallery = project.gallery.split(',').map((url: string) => url.trim()).filter(Boolean);
  }

  let services: string[] = [];
  if (Array.isArray(project.services)) {
    services = project.services;
  } else if (typeof project.services === 'string') {
    services = project.services.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  const localizedTitle = lang === 'en' && project.title_en ? project.title_en : lang === 'ru' && project.title_ru ? project.title_ru : lang === 'ar' && project.title_ar ? project.title_ar : project.title;
  const localizedLocation = lang === 'en' && project.location_en ? project.location_en : lang === 'ru' && project.location_ru ? project.location_ru : lang === 'ar' && project.location_ar ? project.location_ar : project.location;
  const localizedContent = lang === 'en' && project.content_en ? project.content_en : lang === 'ru' && project.content_ru ? project.content_ru : lang === 'ar' && project.content_ar ? project.content_ar : project.content;
  const localizedTestimonial = lang === 'en' && project.testimonialText_en ? project.testimonialText_en : lang === 'ru' && project.testimonialText_ru ? project.testimonialText_ru : lang === 'ar' && project.testimonialText_ar ? project.testimonialText_ar : project.testimonialText;

  const dict = {
    tr: {
      back: 'Tüm Referanslara Dön',
      galleryTitle: 'Proje Galerisi',
      statsTitle: 'Rakamlarla Proje',
      servicesTitle: 'Hizmet Kapsamı',
      mapTitle: 'Haritada Gör',
      getDirections: 'Yol Tarifi Al',
      boardRole: 'Proje Yetkilisi / Yönetim Kurulu',
      home: 'Anasayfa',
      refs: 'Referanslarımız'
    },
    en: {
      back: 'Back to All References',
      galleryTitle: 'Project Gallery',
      statsTitle: 'Key Project Metrics',
      servicesTitle: 'Scope of Services',
      mapTitle: 'View on Map',
      getDirections: 'Get Directions',
      boardRole: 'Executive Board Member',
      home: 'Home',
      refs: 'Our References'
    },
    ru: {
      back: 'Ко всем проектам',
      galleryTitle: 'Галерея проекта',
      statsTitle: 'Показатели проекта',
      servicesTitle: 'Оказываемые услуги',
      mapTitle: 'Посмотреть на карте',
      getDirections: 'Маршрут',
      boardRole: 'Представитель правления ЖК',
      home: 'Главная',
      refs: 'Наши объекты'
    },
    ar: {
      back: 'العودة لجميع المشاريع',
      galleryTitle: 'معرض صور المشروع',
      statsTitle: 'مؤشرات المشروع بالأرقام',
      servicesTitle: 'نطاق الخدمات المقدمة',
      mapTitle: 'عرض على الخريطة',
      getDirections: 'الحصول على الاتجاهات',
      boardRole: 'ممثل مجلس الإدارة',
      home: 'الرئيسية',
      refs: 'مشاريعنا'
    }
  };

  const currentDict = dict[lang as keyof typeof dict] || dict.tr;

  const breadcrumbs = [
    { name: currentDict.home, url: lang === 'tr' ? '/' : `/${lang}` },
    { name: currentDict.refs, url: lang === 'tr' ? '/referanslar' : `/${lang}/referanslar` },
    { name: localizedTitle, url: lang === 'tr' ? `/referanslar/${project.slug}` : `/${lang}/referanslar/${project.slug}` }
  ];

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  const pageLd = webPageSchema({
    type: 'ItemPage',
    name: localizedTitle,
    path: lang === 'tr' ? `/referanslar/${project.slug}` : `/${lang}/referanslar/${project.slug}`,
    description: `${project.category} - ${localizedLocation}`
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      
      {/* 1. HERO BÖLÜMÜ */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end">
        {project.image ? (
          <Image 
            src={project.image} 
            alt={localizedTitle}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#0A0B10]" />
        )}
        
        {/* Lüks Degrade Katmanı */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-[#0A0B10]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B10]/50 via-transparent to-transparent opacity-80" />
        
        <div className="relative z-10 w-full max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-20">
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <Link href={lang === 'tr' ? '/referanslar' : `/${lang}/referanslar`} className="inline-flex items-center text-sm font-bold text-white/80 hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20">
            <span className="material-symbols-outlined text-lg mr-2">arrow_back</span>
            {currentDict.back}
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-slate-900 text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg uppercase tracking-wider border border-white/20">
                  {project.category}
                </span>
                <span className="bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">apartment</span>
                  {project.units}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                {localizedTitle}
              </h1>
              
              <div className="flex items-center gap-2 text-white/90 font-medium text-lg drop-shadow-md">
                <span className="material-symbols-outlined text-emerald-400">location_on</span>
                {localizedLocation}
              </div>
            </div>

            {/* Proje İkonu */}
            <div className="hidden md:flex w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-white text-[40px]">apartment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Sol Kolon (İçerik & Galeri) */}
          <div className="lg:col-span-8 space-y-20">
            
            {localizedContent && (
              <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-black prose-headings:text-[var(--color-heading-text)] prose-a:text-blue-500 hover:prose-a:text-blue-400 text-[var(--color-body-text)] leading-relaxed bg-[var(--color-surface)] dark:bg-[#15161E] p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-outline)]/60 dark:border-white/10 shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: (await import('isomorphic-dompurify')).default.sanitize(autoLinkHtml(localizedContent, `/referanslar/${project.slug}`)) }} />
              </div>
            )}

            {/* 4. Proje Galerisi */}
            {gallery.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-[var(--color-heading-text)] flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-500">photo_library</span>
                  {currentDict.galleryTitle}
                </h3>
                {/* Asimetrik Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[260px]">
                  {gallery.map((url: string, idx: number) => (
                    <div key={idx} className={`relative rounded-3xl overflow-hidden shadow-md group ${idx === 0 && gallery.length > 2 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                      <Image 
                        src={url} 
                        alt={`${localizedTitle} - Galeri ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Müşteri Yorumu */}
            {localizedTestimonial && (
              <div className="bg-gradient-to-br from-[#1C1D27] via-[#15161E] to-[#0D0E14] border border-slate-700/80 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl mt-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                
                <div className="absolute top-8 right-10 opacity-10 pointer-events-none">
                  <span className="text-[10rem] leading-none font-serif text-white">"</span>
                </div>
                
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-emerald-400 text-5xl mb-6 block">format_quote</span>
                  <p className="text-xl md:text-2xl font-medium text-white mb-10 leading-relaxed drop-shadow-sm">
                    {localizedTestimonial}
                  </p>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {project.testimonialAuthor ? project.testimonialAuthor.charAt(0) : '👤'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-lg">{project.testimonialAuthor || 'Müşterimiz'}</h4>
                      <p className="text-sm text-slate-400 font-medium">{project.testimonialRole || currentDict.boardRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon (Sidebar - Sticky) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 self-start">
            
            {/* 2. Stats Bento Box */}
            {stats.length > 0 && (
              <div className="bg-gradient-to-br from-[#1C1D27] via-[#15161E] to-[#0D0E14] border border-white/10 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                
                <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-400">bar_chart</span>
                  {currentDict.statsTitle}
                </h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {stats.map((stat: any, idx: number) => (
                    <div key={idx} className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="text-2xl sm:text-3xl font-black mb-1 text-white">{stat.value}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Hizmet Kapsamı */}
            {services.length > 0 && (
              <div className="bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/60 dark:border-white/10 rounded-[2.5rem] p-8 shadow-xl">
                <h3 className="text-xl font-black text-[var(--color-heading-text)] mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-500">verified</span>
                  {currentDict.servicesTitle}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {services.map((service: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-slate-50 dark:bg-[#1E202B] text-[var(--color-heading-text)] font-bold px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-slate-400 transition-all text-sm w-full">
                      <span className="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Haritada Gör */}
            {project.coordinates && (
              <div className="bg-[#15161E] rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square relative group cursor-pointer border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                  <div className="w-48 h-48 rounded-full border border-emerald-500/50 absolute animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="w-32 h-32 rounded-full border border-emerald-500/80 absolute animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
                  <div className="w-16 h-16 rounded-full bg-emerald-500 absolute" />
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 shadow-lg">
                    <span className="material-symbols-outlined text-3xl text-white">location_on</span>
                  </div>
                  <p className="text-white font-extrabold text-lg mb-1">{currentDict.mapTitle}</p>
                  <p className="text-xs text-slate-400 font-mono bg-black/40 px-3 py-1 rounded-full">{project.coordinates}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.coordinates)}`} target="_blank" rel="noreferrer" className="block w-full py-3 bg-white text-slate-950 font-black text-center rounded-2xl shadow-lg hover:bg-slate-100 transition-colors">
                    {currentDict.getDirections}
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
