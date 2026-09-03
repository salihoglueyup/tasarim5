import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, digitalDocumentSchema } from '@/lib/schemas';
import { CERTIFICATES, getCertificate } from '@/data/certificates';
import PreFooterCta from '@/components/sections/PreFooterCta';

export const revalidate = 2592000; // 30 gün

export function generateStaticParams() {
  return CERTIFICATES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const cert = getCertificate(slug);
  if (!cert) return buildMetadata({ title: 'Bulunamadı', description: '', path: '/kurumsal/sertifikalar', lang, noindex: true });

  return buildMetadata({
    title: `${cert.name} — ${cert.subtitle} | Alo Yönetim`,
    description: cert.description,
    path: `/kurumsal/sertifikalar/${cert.slug}`,
    lang,
    keywords: cert.keywords,
  });
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const cert = getCertificate(slug);
  if (!cert) notFound();

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Kalite Belgelerimiz', url: '/kurumsal/kalite-belgelerimiz' },
    { name: cert.name, url: `/kurumsal/sertifikalar/${cert.slug}` },
  ]);

  const pageLd = webPageSchema({
    name: `${cert.name} — ${cert.subtitle}`,
    description: cert.description,
    path: `/kurumsal/sertifikalar/${cert.slug}`,
    speakableSelectors: ['h1', '.cert-description'],
  });

  const docLd = digitalDocumentSchema({
    name: cert.name,
    description: cert.description,
    url: cert.pdf,
    datePublished: cert.datePublished,
    issuerName: cert.issuer,
    issuerUrl: cert.issuerUrl,
    about: cert.about,
  });

  const others = CERTIFICATES.filter((c) => c.slug !== cert.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, docLd]} />

      <PageHeader title={cert.name} description={cert.subtitle} />

      <section className="py-16 md:py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-start">

          {/* Sol: İçerik */}
          <div className="flex flex-col gap-8">
            {/* Badge + başlık */}
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg shrink-0`}>
                <span className="material-symbols-outlined text-white text-3xl" aria-hidden="true">{cert.icon}</span>
              </div>
              <div>
                <p className={`text-xs font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${cert.color}`}>
                  {cert.issuer}
                </p>
                <h2 className="text-xl font-bold text-[var(--color-primary)]">{cert.subtitle}</h2>
              </div>
            </div>

            {/* Açıklama */}
            <p className="cert-description text-base md:text-lg text-[var(--color-secondary)] font-light leading-relaxed">
              {cert.longDescription}
            </p>

            {/* Bilgi satırları */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Standart', value: cert.name },
                { label: 'Kapsam', value: cert.about },
                { label: 'Belge Tarihi', value: new Date(cert.datePublished).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' }) },
                { label: 'Belgelendiren Kurum', value: cert.issuer },
              ].map((item) => (
                <div key={item.label} className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-5">
                  <dt className="text-xs font-bold text-[var(--color-tertiary)] uppercase tracking-wider mb-1">{item.label}</dt>
                  <dd className="text-sm font-semibold text-[var(--color-primary)]">{item.value}</dd>
                </div>
              ))}
            </dl>

            {/* İlgili sayfa linki */}
            {cert.relatedPath && (
              <Link
                href={cert.relatedPath}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">link</span>
                İlgili hizmetimizi inceleyin
              </Link>
            )}
          </div>

          {/* Sağ: PDF Viewer + İndir */}
          <div className="flex flex-col gap-4 sticky top-24">
            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl overflow-hidden shadow-sm">
              <div className="bg-slate-100 dark:bg-slate-800 px-5 py-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--color-secondary)]">Sertifika Önizlemesi</span>
                <span className="material-symbols-outlined text-sm text-[var(--color-tertiary)]" aria-hidden="true">picture_as_pdf</span>
              </div>
              <iframe
                src={`${cert.pdf}#view=FitH`}
                className="w-full h-[480px]"
                title={`${cert.name} sertifikası`}
                loading="lazy"
              />
            </div>

            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label={`${cert.name} sertifikasını PDF formatında indir (1.8 MB)`}
              className={`flex items-center justify-center gap-3 bg-gradient-to-r ${cert.color} text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:opacity-90 transition-opacity`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">download</span>
              <span>Sertifikayı İndir</span>
              <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium ml-1">PDF · 1.8 MB</span>
            </a>

            <Link
              href="/kurumsal/kalite-belgelerimiz"
              className="flex items-center justify-center gap-2 bg-[var(--color-surface)] border border-[var(--color-outline)] text-[var(--color-primary)] font-semibold py-3 px-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
              Tüm Belgeler
            </Link>
          </div>
        </div>
      </section>

      {/* Diğer Sertifikalar */}
      <section className="py-16 bg-slate-50 dark:bg-[#0a0a0f] px-[var(--spacing-gutter)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto">
          <h2 className="text-xl font-extrabold text-[var(--color-primary)] mb-8">Diğer Sertifikalarımız</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/kurumsal/sertifikalar/${c.slug}`}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-white text-xl" aria-hidden="true">{c.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--color-tertiary)]">{c.name}</p>
                  <p className="text-sm font-semibold text-[var(--color-primary)] group-hover:underline leading-snug">{c.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCta />
    </>
  );
}
