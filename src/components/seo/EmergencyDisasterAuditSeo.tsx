"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';

export interface AuditItem {
  id: string;
  title: string;
  desc: string;
  lawRef: string;
  weight: number;
}

export default function EmergencyDisasterAuditSeo() {
  const auditQuestions: AuditItem[] = [
    {
      id: 'deprem_vana',
      title: 'Deprem Sensörlü Otomatik Doğalgaz Kesme Vanası',
      desc: 'Sismik sarsıntı anında kazan dairesi ve ana gaz hattını 3 saniyede otomatik kilitleyen sistem.',
      lawRef: 'Binaların Yangından Korunması Hakkında Yönetmelik Madde 112',
      weight: 15
    },
    {
      id: 'yangin_tup',
      title: 'Yangın Söndürme Tüpleri & Hidrofor Basınç Testi',
      desc: 'Her blok katında 6 kg ABC kuru kimyevi tozlu tüp ve yılda en az 1 kez yapılan hidrofor test raporu.',
      lawRef: 'TSE ISO 11602 Standartları',
      weight: 15
    },
    {
      id: 'yangin_merdiveni',
      title: 'Yangın Merdiveni Kaçış Kapıları ve Duman Tahliyesi',
      desc: 'Panik barlı, dışarıdan kilitlenmeyen, dumansız kaçış koridoru ve pozitif basınçlandırma fanı.',
      lawRef: 'Yangın Yönetmeliği Madde 38',
      weight: 15
    },
    {
      id: 'siginak',
      title: 'Sığınak Havalandırması, Acil Su Deposu & Aydınlatma',
      desc: 'Sığınak Yönetmeliği uyarınca sığınakta aktif hava filtreleme, akülü aydınlatma ve temiz su stoku.',
      lawRef: '3194 Sayılı İmar Kanunu Sığınak Yönetmeliği',
      weight: 15
    },
    {
      id: 'jenerator',
      title: 'Dizel Jeneratör & Asansör Acil Kurtarma Sistemi',
      desc: 'Elektrik kesildiğinde 8 saniye içinde ortak alanları ve asansörleri besleyen otomatik transfer panosu.',
      lawRef: 'Elektrik Tesisleri Yönetmeliği',
      weight: 10
    },
    {
      id: 'paratoner',
      title: 'Yıldırımdan Korunma Paratoner & Topraklama Ölçümü',
      desc: 'Yılda 1 kez TMMOB Elektrik Mühendisleri Odası onaylı topraklama ve paratoner ölçüm belgesi.',
      lawRef: 'İş Sağlığı ve Güvenliği Kanunu 6331',
      weight: 10
    },
    {
      id: 'tahliye_plani',
      title: 'Site Acil Durum Tahliye & Kriz Eylem Planı',
      desc: 'Deprem ve yangın anında toplanma alanları krokisi, tebliğ edilmiş kat maliki tahliye yönergesi.',
      lawRef: 'AFAD Afet ve Acil Durum Standartları',
      weight: 10
    },
    {
      id: 'ilkyardim',
      title: 'Sertifikalı Personel & Acil İlk Yardım İstasyonu',
      desc: 'Nizamiyede ve yönetim ofisinde Sağlık Bakanlığı onaylı ilk yardım çantası ve eğitimli personel.',
      lawRef: 'İlkyardım Yönetmeliği Madde 16',
      weight: 10
    }
  ];

  const [checkedIds, setCheckedIds] = useState<string[]>([
    'deprem_vana',
    'yangin_tup',
    'yangin_merdiveni',
    'jenerator'
  ]);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const totalScore = checkedIds.reduce((sum, id) => {
    const q = auditQuestions.find((item) => item.id === id);
    return sum + (q ? q.weight : 0);
  }, 0);

  const getStatus = () => {
    if (totalScore >= 85) return { label: 'Yüksek Hazırlık & Güvenli', color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30' };
    if (totalScore >= 50) return { label: 'Orta Seviye (Eksikler Var)', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/30' };
    return { label: 'Kritik Risk & Yasal Eksiklik', color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-500/30' };
  };

  const status = getStatus();

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    name: 'Bina Deprem, Sığınak ve Yangın Güvenliği Uygunluk Denetim Motoru',
    description: 'Kat Mülkiyeti Kanunu ve Yangın Yönetmeliği uyarınca site ve apartmanların afet hazırlık puanını hesaplayan denetim aracı.',
    provider: {
      '@type': 'Organization',
      name: 'Alo Yönetim Güvenlik Akademisi'
    }
  };

  return (
    <div className="my-12 bg-slate-900 text-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/15 relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">emergency</span>
              AFAD & Yangın Yönetmeliği Uyum Denetimi
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">
            Bina Deprem, Yangın & Sığınak Güvenlik Testi
          </h3>
          <p className="text-sm text-slate-300 font-light mt-1">
            Sitenizde mevcut olan güvenlik ve afet önlemlerini işaretleyerek yasal hazırlık skorunuzu hesaplayın.
          </p>
        </div>

        {/* Live Score Display */}
        <div className={`p-5 rounded-3xl border text-center shrink-0 ${status.bg} shadow-lg`}>
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Afet Hazırlık Skoru
          </span>
          <div className="text-4xl font-black text-white">
            {totalScore} <span className="text-lg font-light text-slate-300">/ 100</span>
          </div>
          <span className={`text-xs font-extrabold block mt-1 ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {auditQuestions.map((q) => {
          const isChecked = checkedIds.includes(q.id);

          return (
            <div
              key={q.id}
              onClick={() => toggleCheck(q.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-blue-500/10 border-blue-500/40 text-white'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isChecked
                    ? 'bg-blue-500 text-white'
                    : 'border border-white/30 bg-white/5'
                }`}
              >
                {isChecked && (
                  <span className="material-symbols-outlined text-base font-bold" aria-hidden="true">check</span>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">{q.title}</h4>
                  <span className="text-[11px] font-mono text-blue-400 font-bold shrink-0">
                    +{q.weight} Puan
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {q.desc}
                </p>
                <span className="text-[10px] font-mono text-slate-500 block pt-1">
                  {q.lawRef}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="text-slate-300 font-light">
          Alo Yönetim, yönettiği tüm sitelerde yangın tatbikatı ve 6 aylık periyodik teknik sığınak denetimi gerçekleştirir.
        </div>

        <Link
          href="/teklif-al"
          className="px-6 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg shrink-0"
        >
          Ücretsiz Tesis Risk Keşfi İste
        </Link>
      </div>
    </div>
  );
}
