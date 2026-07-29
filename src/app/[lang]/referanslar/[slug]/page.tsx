import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

export default async function ReferenceDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params;

  const project = await prisma.reference.findUnique({
    where: { slug }
  });

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
    gallery = project.gallery.split(',').map(url => url.trim()).filter(url => url);
  }

  let services: string[] = [];
  if (project.services) {
    services = project.services.split(',').map(s => s.trim()).filter(s => s);
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
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#081524] via-[#081524]/60 to-transparent" />
        
        <div className="relative z-10 w-full max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
          <Link href={`/${lang}/referanslar`} className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white mb-6 transition-colors">
            <span className="material-symbols-outlined text-lg mr-2">arrow_back</span>
            Tüm Referanslara Dön
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {project.category}
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {project.units}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">
            {project.title}
          </h1>
          
          <div className="flex items-center gap-2 text-white/80 font-medium">
            <span className="material-symbols-outlined">location_on</span>
            {project.location}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column (Content & Gallery) */}
          <div className="lg:col-span-2 space-y-16">
            
            {project.content && (
              <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:text-[var(--color-primary)] prose-a:text-brand-500 hover:prose-a:text-brand-400">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              </div>
            )}

            {/* Gallery Grid */}
            {gallery.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">Proje Galerisi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((url, idx) => (
                    <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden shadow-sm group">
                      <Image 
                        src={url} 
                        alt={`${project.title} - Galeri ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonialText && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <span className="text-[12rem] leading-none font-serif text-[var(--color-primary)]">"</span>
                </div>
                <div className="relative z-10">
                  <span className="text-brand-500 text-4xl mb-6 block">❝</span>
                  <p className="text-2xl md:text-3xl font-medium text-[var(--color-primary)] mb-8 leading-relaxed">
                    {project.testimonialText}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-[var(--color-secondary)]">
                        {project.testimonialAuthor ? project.testimonialAuthor.charAt(0) : '👤'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-primary)]">{project.testimonialAuthor || 'Müşterimiz'}</h4>
                      <p className="text-sm text-[var(--color-secondary)]">Proje Yetkilisi / Yönetim Kurulu</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            
            {/* Stats Bento Box */}
            {stats.length > 0 && (
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[2rem] p-8 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-6 opacity-90">Rakamlarla Proje</h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                      <div className="text-2xl font-black mb-1">{stat.value}</div>
                      <div className="text-xs font-medium text-white/70 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {services.length > 0 && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6">Hizmet Kapsamı</h3>
                <ul className="space-y-4">
                  {services.map((service, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[var(--color-secondary)] font-medium">
                      <span className="material-symbols-outlined text-brand-500">check_circle</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Map Placeholder */}
            {project.coordinates && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] overflow-hidden shadow-sm aspect-square relative group cursor-pointer">
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-[var(--color-secondary)] opacity-50 mb-2">map</span>
                    <p className="text-[var(--color-secondary)] font-medium">Haritada Gör</p>
                    <p className="text-xs text-[var(--color-secondary)] opacity-60 mt-1">{project.coordinates}</p>
                  </div>
                </div>
                {/* Normally an iframe or interactive map component would go here using the coordinates */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.coordinates)}`} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white text-slate-900 font-bold rounded-full text-sm hover:scale-105 transition-transform">
                    Google Haritalar'da Aç
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
