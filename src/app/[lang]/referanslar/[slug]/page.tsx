import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import redis from '@/lib/redis';

export const dynamic = 'force-dynamic';

export default async function ReferenceDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params;

  let project;
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
    project = await prisma.reference.findUnique({
      where: { slug }
    });
    
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
  let stats: { label: string, value: string }[] = [];
  try {
    if (project.stats) {
      stats = JSON.parse(project.stats);
    }
  } catch (e) {
    console.error("Stats parse error:", e);
  }

  let gallery: string[] = [];
  if (project.gallery) {
    gallery = project.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url);
  }

  let services: string[] = [];
  if (project.services) {
    services = project.services.split(',').map((s: string) => s.trim()).filter((s: string) => s);
  }

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Referanslarımız', url: '/referanslar' },
    { name: project.title, url: `/referanslar/${project.slug}` }
  ]);

  const pageLd = webPageSchema({
    type: 'ItemPage',
    name: project.title,
    path: `/referanslar/${project.slug}`,
    description: project.category + " - " + project.location
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      
      {/* 1. HERO BÖLÜMÜ YENİDEN TASARIMI */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end">
        {project.image ? (
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}
        
        {/* Daha Premium Bir Degrade Katmanı */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/40 via-transparent to-transparent opacity-80" />
        
        <div className="relative z-10 w-full max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-20">
          <Link href={`/${lang}/referanslar`} className="inline-flex items-center text-sm font-bold text-white/70 hover:text-white mb-8 transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10">
            <span className="material-symbols-outlined text-lg mr-2">arrow_back</span>
            Tüm Referanslara Dön
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wider border border-white/10">
                  {project.category}
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">apartment</span>
                  {project.units}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                {project.title}
              </h1>
              
              <div className="flex items-center gap-2 text-white/90 font-medium text-lg drop-shadow-md">
                <span className="material-symbols-outlined text-brand-400">location_on</span>
                {project.location}
              </div>
            </div>

            {/* Proje İkonu / Logosu (Eğer var sayarsak) */}
            <div className="hidden md:flex w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-white/80 text-[40px]">corporate_fare</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Sol Kolon (İçerik & Galeri) */}
          <div className="lg:col-span-8 space-y-20">
            
            {project.content && (
              <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:text-[var(--color-primary)] prose-a:text-brand-500 hover:prose-a:text-brand-400 text-[var(--color-secondary)] leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: (await import('isomorphic-dompurify')).default.sanitize(project.content) }} />
              </div>
            )}

            {/* 4. Proje Galerisi (Masonry Vari Daha Şık Grid) */}
            {gallery.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-[var(--color-primary)] flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-500">photo_library</span>
                  Proje Galerisi
                </h3>
                {/* Asimetrik Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[250px]">
                  {gallery.map((url, idx) => (
                    <div key={idx} className={`relative rounded-3xl overflow-hidden shadow-md group ${idx === 0 && gallery.length > 2 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                      <Image 
                        src={url} 
                        alt={`${project.title} - Galeri ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Müşteri Yorumu (Premium Koyu Tema) */}
            {project.testimonialText && (
              <div className="bg-slate-900 border border-slate-700 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl mt-12">
                {/* Arka plan deseni/parlaması */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                
                <div className="absolute top-8 right-10 opacity-10 pointer-events-none">
                  <span className="text-[10rem] leading-none font-serif text-white">"</span>
                </div>
                
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-brand-400 text-5xl mb-6 block">format_quote</span>
                  <p className="text-xl md:text-2xl font-medium text-white mb-10 leading-relaxed drop-shadow-sm">
                    {project.testimonialText}
                  </p>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {project.testimonialAuthor ? project.testimonialAuthor.charAt(0) : '👤'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{project.testimonialAuthor || 'Müşterimiz'}</h4>
                      <p className="text-sm text-slate-400 font-medium">Proje Yetkilisi / Yönetim Kurulu</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon (Sidebar - Sticky) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 self-start">
            
            {/* 2. Stats Bento Box (Düzeltilen Renkler - bg-slate-900) */}
            {stats.length > 0 && (
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                {/* Glass parlama */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-400">bar_chart</span>
                  Rakamlarla Proje
                </h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 transition-colors">
                      <div className="text-3xl font-black mb-1 text-white">{stat.value}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Hizmet Kapsamı (Glassmorphism Listesi) */}
            {services.length > 0 && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/40 rounded-[2.5rem] p-8 shadow-xl">
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-500">verified</span>
                  Hizmet Kapsamı
                </h3>
                <div className="flex flex-wrap gap-3">
                  {services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 text-[var(--color-primary)] font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 hover:shadow-md transition-all text-sm w-full">
                      <span className="material-symbols-outlined text-brand-500 text-[20px]">check_circle</span>
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Haritada Gör (Premium Animasyonlu) */}
            {project.coordinates && (
              <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square relative group cursor-pointer border border-slate-800">
                {/* Animasyonlu Radar Arka Planı */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <div className="w-48 h-48 rounded-full border border-brand-500/50 absolute animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="w-32 h-32 rounded-full border border-brand-500/80 absolute animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
                  <div className="w-16 h-16 rounded-full bg-brand-500 absolute" />
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 shadow-lg">
                    <span className="material-symbols-outlined text-3xl text-white">location_on</span>
                  </div>
                  <p className="text-white font-bold text-lg mb-1">Haritada Gör</p>
                  <p className="text-xs text-slate-400 font-mono bg-slate-800/50 px-3 py-1 rounded-full">{project.coordinates}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.coordinates)}`} target="_blank" rel="noreferrer" className="block w-full py-3 bg-brand-500 text-white font-bold text-center rounded-xl shadow-lg hover:bg-brand-400 transition-colors">
                    Yol Tarifi Al
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
