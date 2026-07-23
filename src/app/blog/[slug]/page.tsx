"use client";

import { use } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, Badge, Button } from '@/components';
import Link from 'next/link';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = use(params);

  // Formatted title from slug
  const titleFormatted = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : "Site Yönetiminde Aidat Bütçesi Nasıl Optimize Edilir?";

  return (
    <>
      <PageHeader 
        title={titleFormatted} 
        description="Sektörel rehberler, Kat Mülkiyeti Kanunu ipuçları ve şeffaf yönetim makalesi." 
      />

      <article className="py-20 px-[var(--spacing-gutter)] max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">AY</span>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Alo Yönetim Editör Ekibi</div>
              <div className="text-[10px]">22 Temmuz 2026 • 5 Dk Okuma</div>
            </div>
          </div>
          <Badge status="info">Sektörel Rehber</Badge>
        </div>

        {/* Article Body */}
        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-light text-lg leading-relaxed flex flex-col gap-6">
          <p className="text-xl font-normal leading-relaxed text-slate-900 dark:text-white">
            Toplu yaşam alanlarında aidat yükünü hafifletmenin ve bina değerini artırmanın en etkili yolu şeffaf bütçe optimizasyonu ve toplu satın alma gücüdür.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">1. Asansör ve Ortak Alan Elektrik Giderlerinin Analizi</h2>
          <p>
            Bir sitedeki en yüksek iki sabit gider kalemi elektrik faturaları ve asansör bakımlarıdır. Reaktif güç panolarının düzenli denetlenmesi, kompanzasyon cezalarını engeller ve elektrik faturasında ortalama %15 düşüş sağlar.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">2. Toplu Satın Alma Gücü İle Sigorta ve Güvenlik Maliyeti</h2>
          <p>
            Yüzlerce projeyi yöneten kurumsal yönetim firmaları, özel güvenlik ve bina ortak alan sigortası poliçelerinde bireysel binalara kıyasla %20 ila %30 arasında daha avantajlı fiyatlar alabilmektedir.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">3. Dijital Aidat Takibi ve Sıfır Gecikme</h2>
          <p>
            Sakinlerin mobil uygulama üzerinden kredi kartıyla 7/24 aidat ödeyebilmesi, nakit akışını düzenler ve icra takip maliyetlerini ortadan kaldırır.

            {/* Internal Linking CTA - Faz 37 */}
            <div className="mt-12 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                <span className="material-symbols-outlined text-2xl">apartment</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Binanızın Yönetimini Profesyonellere Bırakın</h3>
              <p className="text-slate-600 dark:text-slate-400 font-light text-sm max-w-md">
                Aidat takibinden hukuki süreçlere, peyzajdan güvenliğe kadar tüm hizmetlerimizle tanışın.
              </p>
              <Link href="/hizmetler/tesis-yonetimi" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
                Tesis Yönetimi Hizmetimizi İnceleyin
              </Link>
            </div>
          </p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": slug.replace(/-/g, ' ').toUpperCase(),
              "image": "https://aloyonetim.com/og-image.jpg",
              "author": {
                "@type": "Organization",
                "name": "Alo Yönetim Editör Ekibi"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Alo Yönetim",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://aloyonetim.com/icon.png"
                }
              },
              "datePublished": "2026-07-22T08:00:00+03:00",
              "dateModified": "2026-07-22T08:00:00+03:00"
            })
          }}
        />

        {/* Share & Newsletter Callout */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 mt-6">
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-lg">Bu Makaleyi Yararlı Buldunuz mu?</div>
            <p className="text-xs text-slate-500 font-light mt-0.5">Kat malikleri ve site yöneticileri için hazırladığımız ücretsiz bültene katılın.</p>
          </div>
          <Link href="/teklif-al">
            <Button variant="primary" size="sm">Hemen Keşif İsteyin</Button>
          </Link>
        </div>

      </article>
    </>
  );
}
