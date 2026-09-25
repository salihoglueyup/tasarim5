"use client";

import React, { useState } from 'react';
import { faqPageSchema } from '@/lib/schemas/faq';
import JsonLd from '@/components/seo/schema/JsonLd';

export default function CareerFaqSeo() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Sitemizde çalışan güvenlik veya temizlik görevlisinin kıdem tazminatından site yönetimi sorumlu mudur?',
      a: 'Geleneksel istihdamda 4857 Sayılı Kanun Madde 2 uyarınca asıl işveren sıfatıyla site yönetimleri ve kat malikleri kıdem tazminatından sorumlu tutulabilir. Ancak Alo Yönetim İstihdam Köprüsü modelinde personelin kıdem tazminatı karşılıkları her ay faturayla birlikte banka bloke fonuna aktarılır. Personel emekli olduğunda veya işten ayrıldığında hak ediş doğrudan bu havuzdan ödenir; kat maliklerinden tek kuruş ek avans ya da bütçe talep edilmez.',
    },
    {
      q: 'Personel ani olarak rapor aldığında veya mazeret bildirdiğinde nöbet aksar mı?',
      a: 'Kesinlikle aksamaz. Alo Yönetim’in İstanbul’un 39 ilçesini kapsayan 12 mobil lojistik ve operasyon merkezi bulunmaktadır. Bir personel hastalandığında veya acil mazeret bildirdiğinde, 24 saat içinde aynı yetkinlik ve 5188 lisansına sahip sertifikalı yedek personel tesisinize görevlendirilir.',
    },
    {
      q: 'Personel maaşları, bayram mesaileri ve fazla çalışma ücretleri nasıl ödenir?',
      a: 'Tüm personellerimizin hak edişleri her ayın 1’inde kurumsal anlaşmalı banka kanalıyla net olarak hesaplarına yatırılır. Resmi tatil ve bayram çalışmaları yasal zam oranlarıyla bordroya işlenir. SGK e-bildirgeleri ve banka maaş dekontları her ay site yönetimine şeffaf şekilde teslim edilir.',
    },
    {
      q: 'Sitemizin mevcut emektar personellerini İstihdam Köprüsü modeline devredebilir miyiz?',
      a: 'Evet. Sitenizde uzun yıllardır görev yapan kapıcı, güvenlik veya temizlik personellerinin kazanılmış yasal hakları, geçmiş kıdem hesaplamaları protokol altına alınarak Alo Yönetim bünyesine transfer edilebilir. Böylece personelleriniz işlerini korurken, site yönetiminiz gelecekteki kıdem yükünden ve bordrolama risklerinden kurtulur.',
    },
    {
      q: '5188 kimlik kartı olmayan adaylar güvenlik kadrolarına başvurabilir mi?',
      a: '5188 sayılı Özel Güvenlik Kanunu gereği kimliksiz güvenlik görevlisi çalıştırmak kanunen suçtur. Kimlik kartı olmayan ancak güvenlik sektöründe kariyer yapmak isteyen adaylarımıza Alo Yönetim Hizmet Akademisi üzerinden anlaşmalı eğitim kurumları desteğiyle kimlik alma ve staj süreçlerinde mentorluk sunulmaktadır.',
    },
    {
      q: 'İşten ayrılan bir personelin açabileceği olası davalarda hukuki muhatap kimdir?',
      a: 'Sözleşmemiz gereği personelin resmi işvereni Alo Yönetim tüzel kişiliğidir. Olası bir uyuşmazlık veya işe iade davasında Alo Yönetim Hukuk Departmanı sürece doğrudan müdahil olarak girer; site yönetim kurulunun ve kat maliklerinin adliye koridorlarında yıpranması önlenir.',
    },
  ];

  const faqSchema = faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <section id="sikca-sorulan-sorular" className="py-16 md:py-24 border-b border-[var(--color-outline)]/60 bg-[var(--color-surface)]">
      {/* Schema.org FAQPage Structured Data */}
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/80 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              quiz
            </span>
            <span>Mevzuat & Uygulama Detayları</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
            İstihdam Köprüsü modeli, kıdem tazminatı kalkanı ve işe alım süreçleri hakkında en çok merak edilen soruların yanıtları.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--color-surface-variant)]/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[var(--color-primary)] leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">expand_more</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed border-t border-[var(--color-outline)]/40 pt-4 bg-[var(--color-surface-variant)]/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
