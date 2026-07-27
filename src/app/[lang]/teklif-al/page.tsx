import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { JsonLd, QuoteCtaButton } from '@/components';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

const STEPS = [
  {
    icon: 'edit_note',
    title: '1. Bilgilerinizi Paylaşın',
    desc: 'Sitenizin daire sayısı, konumu ve ihtiyaç duyduğunuz hizmetleri kısa formda iletin.',
  },
  {
    icon: 'search_insights',
    title: '2. Ücretsiz Keşif',
    desc: 'Uzman ekibimiz binanızı yerinde inceleyerek ihtiyaç analizi ve maliyet çıkarır.',
  },
  {
    icon: 'request_quote',
    title: '3. Şeffaf Teklif',
    desc: '48 saat içinde kalem kalem, gizli gider içermeyen net yönetim teklifinizi sunarız.',
  },
];

const SERVICES = [
  { href: '/hizmetler/tesis-yonetimi', label: 'Tesis Yönetimi' },
  { href: '/hizmetler/guvenlik-yonetimi', label: 'Güvenlik Yönetimi' },
  { href: '/hizmetler/temizlik-ve-hijyen', label: 'Temizlik ve Hijyen' },
  { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Hukuk ve İcra' },
];

export default function TeklifAl() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Teklif Al', url: '/teklif-al' },
  ]);

  const pageLd = webPageSchema({
    name: 'Ücretsiz Tesis Yönetimi Teklifi Alın',
    description:
      'Siteniz veya tesisiniz için ücretsiz keşif ve şeffaf yönetim teklifi. 48 saat içinde net fiyat.',
    path: '/teklif-al',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <PageHeader
        title="Ücretsiz Teklif Alın"
        description="Siteniz veya tesisiniz için ücretsiz keşif ve şeffaf yönetim teklifini 48 saat içinde alın. Gizli gider yok, taahhüt yok."
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-16">
        {/* Nasıl çalışır */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div
              key={s.title}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 flex flex-col gap-4 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
              </div>
              <h2 className="text-xl font-bold text-[var(--color-primary)]">{s.title}</h2>
              <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center gap-6 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold">Teklif formunu şimdi doldurun</h2>
          <p className="text-slate-300 font-light max-w-xl">
            Formu doldurmanız yalnızca 1 dakika sürer. Uzman danışmanımız en kısa sürede sizinle
            iletişime geçer.
          </p>
          <QuoteCtaButton className="mt-2 bg-white text-slate-950 font-bold py-4 px-10 rounded-xl hover:bg-slate-100 transition-colors">
            Teklif Formunu Aç
          </QuoteCtaButton>
        </div>

        {/* İç linkler */}
        <div className="text-center flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Hangi hizmet için teklif istiyorsunuz?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] hover:border-slate-900 dark:hover:border-white transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
