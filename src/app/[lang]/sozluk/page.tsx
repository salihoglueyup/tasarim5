import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema, definedTermSetSchema } from '@/lib/schemas';
import { TERMS, termToSlug } from '@/data/dictionary';
import { KMK_LAW_INDEX } from '@/data/kmkLawData';
import { VoiceSearchSpeakableSeo } from '@/components/seo';
import SozlukClient from './SozlukClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);

  return buildMetadata({
    title: 'Site ve Tesis Yönetimi Sözlüğü — KMK & 5188 Terimleri | Alo Yönetim',
    description:
      'Aidat, demirbaş, işletme projesi, 634 sayılı KMK ve 5188 özel güvenlik mevzuat terimleri sözlüğü. Kat malikleri ve yöneticiler için açık yasal tanımlar.',
    path: '/sozluk',
    lang,
    targetKeyword: 'site yönetimi sözlüğü',
    keywords: [
      'site yönetimi sözlüğü',
      'tesis yönetimi terimleri',
      'kmk sözlük',
      'işletme projesi nedir',
      'aidat borcu kmk 20',
      '5188 özel güvenlik terimleri',
      'demirbaş nedir',
      'mali ibra nedir',
      'kat malikleri kurulu',
      'apartman yönetimi sözlüğü',
    ],
  });
}

export default async function SozlukPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t.nav_home || 'Anasayfa', url: '/' },
    { name: 'Sözlük', url: '/sozluk' },
  ]);

  const pageLd = webPageSchema({
    name: 'Site ve Tesis Yönetimi Sözlüğü | Alo Yönetim',
    description: 'Kat malikleri ve site yöneticileri için aidat, demirbaş, KMK ve 5188 gibi sektör terimlerinin tanımları.',
    path: '/sozluk',
    speakableSelectors: ['h1', 'p'],
  });

  const kmkTerms = KMK_LAW_INDEX.map((item) => ({
    term: `KMK Madde ${item.articleNumber}: ${item.title}`,
    definition: item.summary,
    url: item.legalAnchor,
  }));

  const allTerms = [
    ...TERMS.map((t) => ({
      term: t.term,
      definition: t.definition,
      url: `/sozluk#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    })),
    ...kmkTerms,
  ];

  const termSetLd = definedTermSetSchema({
    name: 'Site ve Tesis Yönetimi Sözlüğü & KMK 634 Kanun Maddeleri',
    description: 'Kat Mülkiyeti Kanunu ve profesyonel tesis yönetimi yasal terimler ve mevzuat maddeleri sözlüğü.',
    path: '/sozluk',
    terms: allTerms,
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, pageLd, termSetLd]} />
      <SozlukClient lang={lang} />

      {/* Bireysel terim sayfaları — Google arama motoru tarama linkleri (Faz 7A) */}
      <nav aria-label="Sözlük terimleri" className="sr-only">
        {TERMS.map((t) => (
          <a key={t.term} href={`/sozluk/${termToSlug(t.term)}`}>{t.term} nedir</a>
        ))}
      </nav>
    </>
  );
}
