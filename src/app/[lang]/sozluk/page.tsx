"use client";

import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs } from '@/lib/schemas';
import { DefinedTermSetSeo } from '@/components';
import { TERMS } from '@/data/dictionary';

export default function Sozluk() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Sözlük', url: '/sozluk' },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbLd]} />
      <PageHeader
        title="Site Yönetimi Sözlüğü"
        description="Aidat, demirbaş, Kat Mülkiyeti Kanunu ve daha fazlası — sık kullanılan tesis yönetimi terimlerinin açık tanımları."
      />

      {/* SEO Uyumlu Sözlük Bileşeni */}
      <DefinedTermSetSeo 
        name="Site ve Tesis Yönetimi Sözlüğü"
        description="Kat malikleri ve site yöneticileri için aidat, demirbaş, KMK ve 5188 gibi sektör terimlerinin tanımları."
        path="/sozluk"
        terms={TERMS}
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-12 text-center flex flex-col items-center gap-4">
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
