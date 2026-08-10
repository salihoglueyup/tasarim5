"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';;
import { generateBreadcrumbs, definedTermSetSchema } from '@/lib/schemas';

type Term = {
  term: string;
  definition: string;
  /** İlgili hizmet/sayfa — kontekstuel iç link (Faz 78/97). */
  link?: { href: string; label: string };
};

// Sektör terimleri — kat malikleri ve site yöneticileri için net tanımlar.
const TERMS: Term[] = [
  {
    term: 'Aidat',
    definition:
      'Bir site veya apartmanda ortak giderlerin (temizlik, güvenlik, asansör bakımı, elektrik) kat malikleri arasında arsa payı veya eşit bölüşüm esasına göre paylaştırılan aylık katkı payıdır. Kat Mülkiyeti Kanunu m.20 gereğince ödenmesi zorunludur.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Aidat icra takibi' },
  },
  {
    term: 'Kat Mülkiyeti Kanunu (KMK)',
    definition:
      '634 sayılı Kat Mülkiyeti Kanunu, birden çok bağımsız bölümü olan taşınmazlarda maliklerin hak ve yükümlülüklerini, yönetim biçimini ve ortak yer kullanımını düzenleyen temel mevzuattır.',
  },
  {
    term: 'Demirbaş',
    definition:
      'Sitenin ortak kullanımına ait, uzun ömürlü ve envantere kayıtlı taşınır mallardır (jeneratör, hidrofor, güvenlik kamerası, bahçe ekipmanı). Yönetim değişiminde tutanakla devredilir.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Teknik bakım' },
  },
  {
    term: 'İşletme Projesi',
    definition:
      'Bir yıllık tahmini gelir ve giderleri, aidat tutarlarını ve avans miktarlarını gösteren bütçe planıdır. Yönetici tarafından hazırlanır ve kat malikleri kuruluna sunulur.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'Tesis yönetimi' },
  },
  {
    term: '5188 Sayılı Kanun',
    definition:
      'Özel Güvenlik Hizmetlerine Dair Kanun; sitelerde ve tesislerde görev yapacak özel güvenlik görevlilerinin eğitim, kimlik ve çalışma koşullarını düzenler. Kimliksiz güvenlik istihdamı yasaktır.',
    link: { href: '/guvenlik-akademisi', label: 'Güvenlik akademisi' },
  },
  {
    term: 'Kat Malikleri Kurulu',
    definition:
      'Bağımsız bölüm maliklerinin tamamından oluşan, sitenin en yetkili karar organıdır. Yöneticiyi seçer, işletme projesini ve yönetim planı değişikliklerini onaylar.',
  },
  {
    term: 'Yönetim Planı',
    definition:
      'Sitenin nasıl yönetileceğini belirleyen, tüm kat maliklerini bağlayan sözleşme niteliğindeki belgedir. Tapuya şerh edilir ve değiştirilmesi için nitelikli çoğunluk gerekir.',
  },
  {
    term: 'Ortak Alan',
    definition:
      'Bağımsız bölümler dışında kalan, tüm maliklerin ortak kullanımındaki yerlerdir (merdiven, asansör, çatı, bahçe, otopark, sığınak). Ortak alan giderleri aidata yansır.',
    link: { href: '/hizmetler/temizlik-ve-hijyen', label: 'Ortak alan temizliği' },
  },
  {
    term: 'Kompanzasyon (Reaktif Güç)',
    definition:
      'Ortak alan elektrik tesisatında reaktif enerji tüketiminin panolarla dengelenmesidir. Düzenli bakım, dağıtım şirketinin uyguladığı reaktif ceza faturalarını önler.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Teknik bakım' },
  },
  {
    term: 'Denetçi',
    definition:
      'Kat malikleri kurulunca seçilen, yönetimin gelir-gider hesaplarını ve işlemlerini denetleyen kişi veya kuruldur. Şeffaf yönetimin temel güvencesidir.',
  },
];

export default function Sozluk() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Sözlük', url: '/sozluk' },
  ]);

  const glossaryLd = definedTermSetSchema({
    name: 'Site ve Tesis Yönetimi Sözlüğü',
    description:
      'Kat malikleri ve site yöneticileri için aidat, demirbaş, KMK ve 5188 gibi sektör terimlerinin tanımları.',
    path: '/sozluk',
    terms: TERMS.map((t) => ({ term: t.term, definition: t.definition })),
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, glossaryLd]} />
      <PageHeader
        title="Site Yönetimi Sözlüğü"
        description="Aidat, demirbaş, Kat Mülkiyeti Kanunu ve daha fazlası — sık kullanılan tesis yönetimi terimlerinin açık tanımları."
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        <dl className="flex flex-col divide-y divide-[var(--color-outline)]/40">
          {TERMS.map((t) => (
            <div key={t.term} id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="py-8 scroll-mt-28">
              <dt className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-3">
                {t.term}
              </dt>
              <dd className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
                {t.definition}
                {t.link && (
                  <>
                    {' '}
                    <Link
                      href={t.link.href}
                      className="text-slate-900 dark:text-white font-semibold hover:underline"
                    >
                      {t.link.label} →
                    </Link>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-12 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Yönetiminizi profesyonellere bırakın
          </h2>
          <p className="text-sm text-[var(--color-secondary)] font-light max-w-md">
            Aidat takibinden hukuki süreçlere kadar tüm tesis yönetimi hizmetlerimizle tanışın.
          </p>
          <Link
            href="/teklif-al"
            className="mt-2 bg-[var(--color-primary)] text-white font-bold py-3.5 px-8 rounded-xl hover:opacity-95 transition-opacity"
          >
            Ücretsiz Teklif Alın
          </Link>
        </div>
      </section>
    </>
  );
}
