"use client";

import React from 'react';
import PageHeader from '@/components/layout/page/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import TableOfContents from '@/components/blog/TableOfContents';
import LegalPageSeo from '@/components/seo/schema/LegalPageSeo';
import LegalEnglishSummary from '@/components/legal/LegalEnglishSummary';
import { ShieldCheck, Mail, Phone, MapPin, Clock, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function KvkkClient() {
  const { t, language } = useLanguage();
  
  const sections = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <>
      <LegalPageSeo 
        title={t('kvkk_page_title')}
        description={t('kvkk_page_desc')}
        path={`/${language}/kvkk-ve-aydinlatma-metni`}
      />

      <PageHeader 
        title={t('kvkk_page_title')} 
        description={t('kvkk_page_desc')} 
      />

      <article className="py-12 md:py-20 px-[var(--spacing-gutter)] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start relative">
          
          {/* Sol Kenar Çubuğu: İçindekiler Tablosu & Resmi Veri Sorumlusu İrtibatı */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <TableOfContents contentSelector="#article-content" className="w-full" />

            {/* Veri Sorumlusu Kartı */}
            <div className="p-6 rounded-3xl bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Veri Sorumlusu</span>
              </div>
              
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    Alo Yönetim ve Organizasyon A.Ş.
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    6698 Sayılı KVKK ve VERBİS Kayıtlı
                  </p>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-[var(--color-outline)]/40 dark:border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Osmanağa, Misak-ı Milli Sok. No:94A, 34714 Kadıköy / İstanbul</span>
                </div>

                <div className="space-y-2 pt-1 font-medium">
                  <a 
                    href="mailto:kvkk@aloyonetim.com.tr" 
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>kvkk@aloyonetim.com.tr</span>
                  </a>
                  <a 
                    href="tel:+902165504848" 
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>+90 216 550 48 48</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Ana İçerik Kartı */}
          <div 
            id="article-content"
            className="bg-[var(--color-surface)] dark:bg-[#15161E] p-6 sm:p-10 md:p-14 lg:p-16 rounded-3xl border border-[var(--color-outline)]/80 dark:border-white/10 shadow-xs relative"
          >
            {/* Kart Üst Bilgi ve Rozet Barı */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[var(--color-outline)]/60 dark:border-white/10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                6698 Sayılı KVKK Uyumlu
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Son Güncelleme: 1 Ağustos 2026
              </span>
            </div>

            {/* Güven ve Standart Rozetleri */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>ISO 27001 Belgeli</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>ISO 27701 Gizlilik</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>VERBİS Kayıtlı</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <FileText className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Yasal Tebliğ Uyumlu</span>
              </div>
            </div>

            {/* Faz 168: KVKK İngilizce Özet Versiyonu */}
            <LegalEnglishSummary type="kvkk" lang={language} />

            {/* Maddeler Akışı */}
            <div className="space-y-10">
              {sections.map((i) => {
                const headingKey = `kvkk_h${i}` as Parameters<typeof t>[0];
                const paragraphKey = `kvkk_p${i}` as Parameters<typeof t>[0];
                
                const heading = t(headingKey);
                const paragraph = t(paragraphKey);

                if (heading === headingKey || !heading) return null;

                return (
                  <section 
                    key={i} 
                    className="pb-8 border-b border-[var(--color-outline)]/40 dark:border-white/5 last:border-b-0 last:pb-0"
                  >
                    <h2 
                      id={`madde-${i}`} 
                      className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 scroll-mt-32 flex items-center gap-2.5"
                    >
                      <span className="w-1.5 h-5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                      <span>{heading}</span>
                    </h2>
                    
                    {paragraph && paragraph !== paragraphKey && (
                      <div 
                        className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base space-y-2.5 [&_strong]:text-slate-900 dark:[&_strong]:text-white [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_br]:block [&_br]:content-[''] [&_br]:mb-1.5"
                        dangerouslySetInnerHTML={{ __html: paragraph }} 
                      />
                    )}
                  </section>
                );
              })}
            </div>

            {/* Alt Kısım: Resmi Başvuru ve İletişim Kutusu */}
            <div className="mt-12 p-6 md:p-8 rounded-3xl bg-slate-950 dark:bg-white/[0.04] text-white border border-white/10 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    KVKK Madde 11 Kapsamında Başvuru Hakkı
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    Kişisel Verileriniz Hakkında Bilgi ve Hak Talepleri
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 max-w-xl leading-relaxed">
                    Kişisel verilerinizin işlenmesine ilişkin her türlü bilgi alma, güncelleme, aktarım sorgusu veya silme talebinizi yasal kanallarımızdan bize iletebilirsiniz. Başvurularınız en geç 30 gün içinde sonuçlandırılmaktadır.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href="mailto:kvkk@aloyonetim.com.tr"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs md:text-sm transition-all shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Resmi Başvuru Yap
                  </a>
                  <a
                    href="tel:+902165504848"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs md:text-sm border border-white/10 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    0216 550 48 48
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>
    </>
  );
}
