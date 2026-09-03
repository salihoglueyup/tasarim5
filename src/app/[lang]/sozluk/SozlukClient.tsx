"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DefinedTermSetSeo } from '@/components';
import { VoiceSearchSpeakableSeo } from '@/components/seo';
import { TERMS } from '@/data/dictionary';
import { ENGLISH_TERMS } from '@/data/dictionaryEn';
import { KMK_LAW_INDEX } from '@/data/kmkLawData';

export default function SozlukClient({ lang = "tr" }: { lang?: string }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Faz 166: Çok Dilli Sözlük Terim Arama Altyapısı
  const activeTerms = React.useMemo(() => {
    if (lang === 'en') {
      return ENGLISH_TERMS.map((e) => ({
        term: e.term,
        definition: `${e.definition} (Turkish: ${e.turkishEquivalent})`,
        link: e.link,
      }));
    }
    return TERMS;
  }, [lang]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: "Kat Mülkiyeti Kanunu'na göre aidat gecikme tazminatı oranı nedir?",
      a: "634 sayılı KMK Madde 20 uyarınca, gününde ödenmeyen aidat ve ortak gider borçları için aylık yüzde 5 (%5) yasal gecikme tazminatı hesaplanır. Bu oran gün hesabı üzerinden tahakkuk ettirilir."
    },
    {
      q: "Demirbaş giderleri ile işletme aidatı arasındaki temel fark nedir?",
      a: "İşletme aidatı; personelin maaşı, temizlik, günlük elektrik-su gibi rutin işletme giderlerini kapsar ve bağımsız bölümü fiilen kullanan (kiracı veya malik) tarafından ödenir. Demirbaş giderleri (çatı yenileme, asansör motor değişimi, dış cephe mantolama) ise gayrimenkulün ana değerini artırdığından sadece kat maliklerine aittir."
    },
    {
      q: "Sitelerde 5188 sayılı kanun kapsamında güvenlik personeli çalıştırmak zorunlu mudur?",
      a: "Bir sitenin özel güvenlik kimliği ve üniformasıyla nöbet tutturabilmesi için 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca İl Valiliği Özel Güvenlik Komisyonu'ndan 'Özel Güvenlik İzni (ÖGİ)' alması ve zorunlu mali sorumluluk sigortası yaptırması yasal zorunluluktur."
    },
    {
      q: "Kat Malikleri Kurulu'nda karar yeter sayısı (nisap) nasıl belirlenir?",
      a: "Olağan veya olağanüstü genel kurullarda kural olarak hem sayı hem arsa payı çoğunluğu aranır. Yönetici seçimi, yönetim planı değişikliği (4/5 rıza) ve önemli tadilatlarda kanunun öngördüğü nitelikli nisap kuralları uygulanır."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] font-sans text-slate-800 dark:text-slate-200">
      
      {/* 1. Ultra-Lüks Titanium Dark Hero & İstatistikler */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-slate-950 text-white border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#15151C] to-slate-900 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-slate-700/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] relative z-10">
          <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
            
            {/* Rozet */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-extrabold tracking-wide shadow-sm">
              <span className="material-symbols-outlined text-[15px] text-amber-400" aria-hidden="true">menu_book</span>
              <span>RESMİ KMK 634 & 5188 MEVZUAT KÜTÜPHANESİ</span>
            </div>

            {/* H1 Başlık */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] drop-shadow-xl">
              Site ve Tesis Yönetimi <span className="bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 bg-clip-text text-transparent">Sözlüğü</span>
            </h1>

            {/* Açıklama */}
            <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">
              Kat Mülkiyeti Kanunu (KMK), 5188 sayılı Özel Güvenlik Mevzuatı, işletme projesi bütçelemesi, aidat tahsilat hukuku ve entegre tesis yönetimi terminolojisi için güvenilir, güncel ve açık tanımlar.
            </p>

            {/* 4'lü Canlı İstatistik Rozetleri */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-sm flex flex-col items-center text-center">
                <span className="text-xl md:text-2xl font-black text-white">120+</span>
                <span className="text-[11px] font-semibold text-slate-400 mt-0.5">Onaylı Terim</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-sm flex flex-col items-center text-center">
                <span className="text-xl md:text-2xl font-black text-purple-400">KMK 634</span>
                <span className="text-[11px] font-semibold text-slate-400 mt-0.5">Mevzuat Uyumlu</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-sm flex flex-col items-center text-center">
                <span className="text-xl md:text-2xl font-black text-emerald-400">5188</span>
                <span className="text-[11px] font-semibold text-slate-400 mt-0.5">Özel Güvenlik</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-sm flex flex-col items-center text-center">
                <span className="text-xl md:text-2xl font-black text-amber-400">ISO 41001</span>
                <span className="text-[11px] font-semibold text-slate-400 mt-0.5">Tesis Standardı</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Ana Sözlük Modülü (DefinedTermSetSeo) */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] space-y-8">
          <VoiceSearchSpeakableSeo
            question="Site ve Tesis Yönetimi Terimleri ve KMK Maddeleri Nelerdir?"
            directAnswer="634 sayılı Kat Mülkiyeti Kanunu (KMK), 5188 sayılı özel güvenlik kanunu ve ISO 41001 entegre tesis yönetimi standartlarına dair tüm yasal terimler ve tanımlardır."
            lang={lang}
          />

          <DefinedTermSetSeo 
            hideHeader={true}
            name="Site ve Tesis Yönetimi Sözlüğü"
            description="Kat malikleri ve site yöneticileri için yasal ve operasyonel terimler sözlüğü."
            path="/sozluk"
            terms={activeTerms}
          />
        </div>
      </section>

      {/* 3. Google Position Zero / AI Overviews Master Özet Rehberi */}
      <section className="py-16 md:py-20 border-t border-[var(--color-outline)]/60 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)]">
          
          <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full w-fit mx-auto border border-blue-500/20">
              MEVZUAT & YÖNETİM REHBERİ
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--color-primary)]">
              Site ve Tesis Yönetiminde Temel Hukuki ve Operasyonel Esaslar
            </h2>
            <p className="text-sm md:text-base text-[var(--color-secondary)] font-light">
              Mülkünüzün değerini koruyan ve komşuluk uyuşmazlıklarını önleyen 4 ana yönetim sütunu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-purple-500/40 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">gavel</span>
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary)]">Yönetim Planı Hiyerarşisi</h3>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                  Tapu kütüğüne tescil edilen Yönetim Planı, sitenin özel anayasasıdır. Kat Malikleri Kurulu kararları ve işletme projeleri KMK 634 ve bu plana aykırı olamaz.
                </p>
              </div>
              <Link href="/hizmetler/hukuk-ve-icra-danismanligi" className="mt-4 text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                <span>Hukuki Destek</span>
                <span className="material-symbols-outlined text-[13px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-blue-500/40 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">account_balance_wallet</span>
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary)]">Aidat & KMK m.20 Takibi</h3>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                  Gününde ödenmeyen aidat ve avans payları için aylık %5 yasal gecikme tazminatı işletilir. Noter ihtarı ve ilamsız icra takipleriyle bütçe dengesi korunur.
                </p>
              </div>
              <Link href="/hizmetler/aidat-takibi" className="mt-4 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>Aidat Tahsilatı</span>
                <span className="material-symbols-outlined text-[13px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-emerald-500/40 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">shield</span>
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary)]">5188 Lisanslı Özel Güvenlik</h3>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                  İl Valiliği komisyon kararı (ÖGİ), 5188 kimlik kartı ve zorunlu mali sorumluluk sigortası olmadan sitelerde güvenlik personeli çalıştırmak ağır idari para cezası doğurur.
                </p>
              </div>
              <Link href="/hizmetler/guvenlik-yonetimi" className="mt-4 text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                <span>5188 Güvenlik</span>
                <span className="material-symbols-outlined text-[13px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-amber-500/40 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">engineering</span>
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary)]">İşletme vs Demirbaş Ayrımı</h3>
                <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                  Günlük temizlik ve periyodik asansör bakımı işletme bütçesinden (kiracı/malik); asansör revizyonu ve hidrofor değişimi gibi yatırımlar demirbaş fonundan (malik) karşılanır.
                </p>
              </div>
              <Link href="/hizmetler/teknik-bakim" className="mt-4 text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                <span>Teknik Bakım</span>
                <span className="material-symbols-outlined text-[13px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 4. KMK 634 Temel Kanun Maddeleri Referans Tablosu */}
      <section className="py-16 md:py-20 border-t border-[var(--color-outline)]/60">
        <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)]">
          
          <div className="flex flex-col gap-3 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              MEVZUAT DİZİNİ
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
              KMK 634 Sayılı Kanun Maddeleri Hızlı Referansı
            </h2>
            <p className="text-xs md:text-sm text-[var(--color-secondary)] font-light">
              Yöneticiler, denetçiler ve kat malikleri için en sık başvurulan temel kanun maddeleri ve pratik karşılıkları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {KMK_LAW_INDEX.map((law) => (
              <div 
                key={law.articleNumber}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-5.5 flex flex-col justify-between shadow-sm hover:border-blue-500/40 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                      KMK Madde {law.articleNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{law.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-primary)] leading-snug">
                    {law.title}
                  </h3>
                  <p className="text-xs text-[var(--color-secondary)] font-light leading-relaxed">
                    {law.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-outline)]/40 text-[11px] text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300">Uygulama:</strong> {law.practicalApplication}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Sıkça Sorulan Sorular Akordeon */}
      <section className="py-16 md:py-20 border-t border-[var(--color-outline)]/60 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-[var(--spacing-gutter)]">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              MERAK EDİLENLER
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
              Site Yönetimi & Hukuk Hakkında SSS
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left font-bold text-sm md:text-base text-[var(--color-primary)] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <span className={`material-symbols-outlined text-lg transition-transform duration-300 text-slate-400 ${activeFaq === index ? 'rotate-180 text-blue-600' : ''}`}>
                    expand_more
                  </span>
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-[var(--color-secondary)] font-light leading-relaxed border-t border-[var(--color-outline)]/40 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. B2B Keşif & Hukuki Danışmanlık CTA Kartı */}
      <section className="py-16 md:py-24 px-[var(--spacing-gutter)] max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[2.5rem] p-8 md:p-14 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden border border-slate-700/60">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/15">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>
            <span>SIFIR HUKUKİ RİSK & %100 ŞEFFAFLIK</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black max-w-2xl leading-tight">
            Sitenizin Yönetimini Kurumsal ve Yasal Güvenceye Alın
          </h2>

          <p className="text-xs md:text-sm text-slate-300 font-light max-w-xl leading-relaxed">
            Aidat icra takiplerinden 5188 güvenlik protokollerine, asansör teknik denetiminden şeffaf işletme projesine kadar tüm süreçlerinizi yönetiyoruz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Link
              href="/teklif-al"
              className="bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs md:text-sm py-3.5 px-7 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Ücretsiz Keşif & Teklif İsteyin</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>

            <Link
              href="/hesaplayici"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-xs md:text-sm py-3.5 px-6 rounded-2xl transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">calculate</span>
              <span>Aidat Bütçesi Simüle Et</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
