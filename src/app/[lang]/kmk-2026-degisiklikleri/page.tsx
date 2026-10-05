import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { localePath } from '@/lib/i18n/localePath';
import JsonLd from '@/components/seo/schema/JsonLd';
import PageHeader from '@/components/layout/page/PageHeader';
import { generateBreadcrumbs, faqPageSchema, webPageSchema } from '@/lib/schemas';
import { KMK_AMENDMENT_2026 as K } from '@/lib/legal/kmkAmendment2026';
import { KMK_2026_FAQS } from '@/lib/legal/kmkAmendment2026Faqs';
import AidatArtisSiniriHesaplayici from './AidatArtisSiniriHesaplayici';

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const PATH = '/kmk-2026-degisiklikleri';
const TITLE = 'KMK 2026 Değişiklikleri: Aidat Artış Sınırı, Geçici İşletme Projesi ve 2/3 Çoğunluk';
const DESCRIPTION = `${K.gazetteDateTr} tarihli ${K.lawNumber} sayılı Kanun ile Kat Mülkiyeti Kanunu m.35, 37 ve 70 değişti: aidat artışı yeniden değerleme oranıyla sınırlandı, geçici işletme projesi ve toplu yapılarda 2/3 yönetim planı çoğunluğu geldi.`;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: `${TITLE} | Alo Yönetim`,
    description: DESCRIPTION,
    path: PATH,
    lang,
    ogType: 'article',
    datePublished: K.contentDate,
    dateModified: K.contentDate,
    targetKeyword: 'kat mülkiyeti kanunu 2026 değişikliği',
    keywords: [
      'kat mülkiyeti kanunu 2026 değişiklik',
      '7579 sayılı kanun kmk',
      'site aidat artış sınırı',
      'aidat yeniden değerleme oranı',
      'geçici işletme projesi',
      'yönetim planı 2/3 çoğunluk',
      'kmk madde 37 değişiklik',
    ],
  });
}

const CHANGES = [
  {
    article: 'KMK m.35',
    topic: 'Avans toplama',
    before: 'Yönetici avans toplayabilir, avans harcanıp bittiğinde geri kalan işler için tekrar avans toplayabilirdi.',
    after: 'Avans, işletme projesi onaylanıncaya kadar toplanabilir.',
  },
  {
    article: 'KMK m.37',
    topic: 'İşletme projesi',
    before: 'İşletme projesi yönetici tarafından hazırlanıp kat maliklerine tebliğ edilirdi.',
    after: `İşletme projesi kat malikleri kurulunda onaylanır. Onaylı proje yoksa yönetici geçici proje yapar ve en geç ${K.interimProjectMaxMonths} ay içinde kurula onaylatır. Mevcut proje varsa geçici projedeki bedel, bir önceki yılın yeniden değerleme oranını aşamaz.`,
  },
  {
    article: 'KMK m.70',
    topic: 'Toplu yapılarda yönetim planı',
    before: 'Toplu yapılarda yönetim planı değişikliği için beşte dört (4/5) oy gerekirdi.',
    after: 'Üçte iki (2/3) oy gerekir. Yönetim planlarının bu orana aykırı hükümleri uygulanmaz.',
  },
] as const;

export default async function Kmk2026Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'KMK 2026 Değişiklikleri', url: PATH },
  ]);
  const faqLd = faqPageSchema(KMK_2026_FAQS.map((f) => ({ question: f.question, answer: f.answer })));
  const pageLd = webPageSchema({
    name: `${TITLE} | Alo Yönetim`,
    description: DESCRIPTION,
    path: PATH,
    speakableSelectors: ['h1', '#kmk-2026-ozet'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, faqLd, pageLd]} />
      <PageHeader title="KMK 2026 Değişiklikleri" description="7579 sayılı Kanun: aidat artış sınırı, geçici işletme projesi ve toplu yapılarda 2/3 yönetim planı çoğunluğu" />

      <article className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto space-y-14">
        <section
          id="kmk-2026-ozet"
          className="rounded-3xl border border-slate-500/20 bg-slate-500/5 p-6 md:p-8"
          aria-labelledby="ozet-baslik"
        >
          <h2 id="ozet-baslik" className="text-lg font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
            Kısa özet
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            {K.parliamentAcceptedTr} tarihinde TBMM&apos;de kabul edilen ve {K.gazetteDateTr} tarihli {K.gazetteNumber} sayılı
            Resmî Gazete&apos;de yayımlanan <strong>{K.lawNumber} sayılı Kanun</strong>, 634 sayılı Kat Mülkiyeti Kanunu&apos;nun
            35, 37 ve 70. maddelerini değiştirdi. Mevcut işletme projesi olan sitelerde geçici projedeki aidat artışı bir önceki
            yılın yeniden değerleme oranını aşamaz, işletme projesi kat malikleri kurulunda onaylanır ve toplu yapılarda
            yönetim planı değişikliği için gereken çoğunluk beşte dörtten üçte ikiye indi.
          </p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            İçerik tarihi: {K.contentDateTr}. Kaynak:{' '}
            <a className="font-semibold underline" href={K.gazetteUrl} target="_blank" rel="noopener noreferrer">
              Resmî Gazete, {K.gazetteDateTr}
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="degisenler-baslik" className="space-y-5">
          <h2 id="degisenler-baslik" className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Hangi maddeler, nasıl değişti?
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-outline)]/80">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-500/10 text-slate-900 dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Madde</th>
                  <th scope="col" className="px-4 py-3 font-bold">Önceki düzen</th>
                  <th scope="col" className="px-4 py-3 font-bold">Yeni düzen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-outline)]/60 text-slate-700 dark:text-slate-200">
                {CHANGES.map((c) => (
                  <tr key={c.article} className="align-top">
                    <th scope="row" className="px-4 py-4 font-semibold text-slate-900 dark:text-white">
                      {c.article}
                      <span className="mt-0.5 block text-xs font-normal text-slate-500">{c.topic}</span>
                    </th>
                    <td className="px-4 py-4 leading-relaxed">{c.before}</td>
                    <td className="px-4 py-4 leading-relaxed">{c.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Değişiklikler yayım tarihinde, yani {K.gazetteDateTr} tarihinde yürürlüğe girmiştir.
          </p>
        </section>

        <section aria-labelledby="hesap-baslik" className="space-y-4">
          <h2 id="hesap-baslik" className="sr-only">Aidat artış sınırı hesaplama</h2>
          <AidatArtisSiniriHesaplayici />
        </section>

        <section aria-labelledby="kim-baslik" className="space-y-5">
          <h2 id="kim-baslik" className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Yönetici, kat maliki ve kiracı için ne anlama geliyor?
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                who: 'Yöneticiler',
                text: 'Onaylı işletme projesi olmayan sitelerde geçici proje hazırlayıp en geç 3 ay içinde kurula sunmak gerekir. Mevcut projesi olanlarda geçici projedeki artış yeniden değerleme oranıyla sınırlıdır. Kayıtların ve tebliğlerin belgeli tutulması önem kazanır.',
              },
              {
                who: 'Kat malikleri',
                text: 'İşletme projesinin, dolayısıyla aidatın belirlenmesi kat malikleri kurulunun onayına bağlandı. Toplu yapılarda yönetim planı değişikliği için 2/3 çoğunluk yeterli olacağından plan revizyonu daha ulaşılabilir hâle geldi.',
              },
              {
                who: 'Kiracılar',
                text: 'Ortak gider ve avans yükümlülüğünün kimde olduğuna ilişkin kurallar bu kanunla değişmedi. Kira sözleşmesindeki aidat düzenlemesi ve KMK m.20 geçerliliğini koruyor.',
              },
            ].map((b) => (
              <div key={b.who} className="rounded-2xl border border-[var(--color-outline)]/80 bg-[var(--color-surface)] p-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{b.who}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="degismeyenler-baslik" className="space-y-4">
          <h2 id="degismeyenler-baslik" className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Neler değişmedi?
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            <li>Genel yapılarda yönetim planı değişikliği için KMK m.28/3&apos;teki beşte dört (4/5) kuralı geçerlidir.</li>
            <li>Ortak gider ve avansı zamanında ödemeyen kat malikine aylık %5 gecikme tazminatı işler (KMK m.20).</li>
            <li>Kesinleşen işletme projesi, ilamsız icra takibinde İİK m.68/1 kapsamında dayanak olabilir.</li>
            <li>İşletme projesine itiraz için 7 günlük süre, değişiklik metninde yer almamaktadır.</li>
          </ul>
        </section>

        <section aria-labelledby="sss-baslik" className="space-y-5">
          <h2 id="sss-baslik" className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Sıkça sorulan sorular
          </h2>
          <div className="space-y-3">
            {KMK_2026_FAQS.map((f) => (
              <details
                key={f.id}
                className="group rounded-2xl border border-[var(--color-outline)]/80 bg-[var(--color-surface)] p-5 open:shadow-xs"
              >
                <summary className="cursor-pointer list-none text-base font-bold text-slate-900 dark:text-white">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--color-outline)]/80 bg-[var(--color-surface)] p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Siteniz için hukuki destek</h2>
          <p className="mt-2 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            İşletme projesi, geçici proje süreci veya yönetim planı revizyonu için hukuk ekibimizle görüşebilirsiniz.
            Bu sayfa genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez ve her sitenin durumu farklıdır.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={localePath('/hizmetler/hukuk-ve-icra-danismanligi', lang)}
              className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              Hukuk ve İcra Danışmanlığı
            </Link>
            <Link
              href={localePath('/iletisim', lang)}
              className="inline-flex items-center rounded-xl border border-[var(--color-outline)] px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-500/5 dark:text-slate-100"
            >
              Bize ulaşın
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
