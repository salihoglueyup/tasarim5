import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd } from '@/components';
import { buildMetadata } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'İstanbul Bölgeleri — İlçe Bazında Tesis Yönetimi',
    description:
      'İstanbul’un ilçelerinde profesyonel site ve tesis yönetimi. Kadıköy, Ataşehir, Beşiktaş, Üsküdar ve daha fazlasında yerel ekibimizle hizmetinizdeyiz.',
    path: '/bolgeler',
    lang,
    keywords: ['istanbul tesis yönetimi', 'ilçe site yönetimi', 'yerel apartman yönetimi'],
  });
}

export default function Bolgeler() {
  const sides: ('Anadolu' | 'Avrupa')[] = ['Anadolu', 'Avrupa'];

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
  ]);

  const itemListLd: JsonLdObject = {
    '@type': 'ItemList',
    itemListElement: DISTRICTS.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${d.name} Tesis Yönetimi`,
      url: `${BASE_URL}/bolgeler/${d.slug}`,
    })),
  };

  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: 'İstanbul Bölgeleri — İlçe Bazında Tesis Yönetimi',
    description: 'İstanbul ilçelerinde profesyonel site ve tesis yönetimi hizmetleri.',
    path: '/bolgeler',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, itemListLd]} />
      <PageHeader
        title="İstanbul Bölgeleri"
        description="Hizmet verdiğimiz ilçeyi seçin; mahallenize kadar uzanan yerel tesis yönetimi ekibimizle tanışın."
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-16">
        {sides.map((side) => (
          <div key={side} className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
              {side} Yakası
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DISTRICTS.filter((d) => d.side === side).map((d) => (
                <Link
                  key={d.slug}
                  href={`/bolgeler/${d.slug}`}
                  className="group bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] p-7 flex flex-col gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600">location_on</span>
                    <h3 className="text-xl font-bold text-[var(--color-primary)]">
                      {d.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed line-clamp-3">
                    {d.intro}
                  </p>
                  <span className="text-xs font-semibold text-blue-600 mt-1 group-hover:underline">
                    {d.name} hizmetlerini gör →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
