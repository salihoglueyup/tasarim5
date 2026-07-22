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
          </p>
        </div>

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
