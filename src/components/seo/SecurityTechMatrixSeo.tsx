"use client";

import React from 'react';
import JsonLd from './JsonLd';

interface TechItem {
  title: string;
  category: string;
  badge: string;
  icon: string;
  description: string;
  specs: string[];
}

const TECH_ITEMS: TechItem[] = [
  {
    title: 'AI Destekli Plaka Tanıma (PTS) & Bariyer Entegrasyonu',
    category: 'Giriş-Çıkış Otomasyonu',
    badge: '%99.8 Doğruluk',
    icon: 'directions_car',
    description: 'Site sakinleri, misafirler ve yetkisiz araçlar için milisaniyelik plaka okuma, bariyer açma ve kara liste alarm sistemi.',
    specs: ['Otomatik bariyer tetikleme', 'Misafir araç anlık süre sayacı', 'EGM çalıntı araç uyarı entegrasyonu']
  },
  {
    title: 'Biyometrik Yüz Tanıma & Kartlı Turnike Sistemleri',
    category: 'Yaya Geçiş Kontrolü',
    badge: 'Temassız & Hızlı',
    icon: 'fingerprint',
    description: 'Blok girişleri, spor salonu, havuz ve ortak alan kapılarında yabancı geçişini %100 engelleyen biyometrik yetkilendirme.',
    specs: ['Anti-passback geçiş kontrolü', 'Canlılık tespiti (fotoğrafla aldatılamaz)', 'Mobil NFC & QR misafir geçiş kodu']
  },
  {
    title: '4K Gece Görüşlü Akıllı IP CCTV & Çevre Sınır Lazerleri',
    category: '7/24 Kamera İzleme',
    badge: 'Renkli Gece Görüşü',
    icon: 'videocam',
    description: 'Site çevre duvarlarında hareket, sınır ihlali ve şüpheli paket tespiti yapan yapay zeka analizli IP kamera ağı.',
    specs: ['Kör noktasız geniş açı lensler', '30+ gün kesintisiz NVR kayıt', 'Karanlıkta renkli ColorVu teknolojisi']
  },
  {
    title: 'GPS & NFC Destekli Anlık Devriye Tur Kontrol Kalemi',
    category: 'Saha Denetim & Devriye',
    badge: 'Anlık Canlı Takip',
    icon: 'security',
    description: 'Güvenlik görevlilerinin gece ve gündüz devriyelerini harita üzerinde anlık doğrulayan karekod ve RFID kontrol noktaları.',
    specs: ['Geciken devriye otomatik amir uyarısı', 'Fotoğraflı olay tutanağı kaydı', 'Yönetim kuruluna dijital devriye karnesi']
  },
  {
    title: 'Yangın, Gaz Sızıntısı & Su Baskını Erken Uyarı Entegrasyonu',
    category: 'Acil Durum Otomasyonu',
    badge: 'Anında Sismik Kesme',
    icon: 'crisis_alert',
    description: 'Kazan dairesi, otopark ve sığınaklardaki sensörlerin güvenlik nizamiye paneline ve itfaiyeye anlık alarm göndermesi.',
    specs: ['Depremde 3 saniyede otomatik gaz kesme', 'Duman tahliye kapağı açma', 'Acil anons ve aydınlatma tetikleme']
  },
  {
    title: '7/24 Mobil Operasyon & Merkezi Güvenlik Komuta Masası',
    category: 'Merkezi Yönetim',
    badge: 'Kesintisiz Koordinasyon',
    icon: 'hub',
    description: 'Alo Yönetim merkezinde tüm kameraların, alarmların ve devriye raporlarının nöbetçi operasyon müdürlerince 7/24 denetimi.',
    specs: ['Acil durumda 15 dakikada motorize destek', 'Resmi kolluk kuvvetleri anlık irtibatı', 'Haftalık/Aylık şeffaf güvenlik bülteni']
  }
];

export default function SecurityTechMatrixSeo() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Entegre Elektronik Güvenlik Teknolojileri ve Donanım Altyapısı',
    description: 'Alo Yönetim tarafından korunan tesislerde kurulan AI plaka tanıma, IP kamera, turnike ve GPS devriye donanım ekosistemi.',
    itemListElement: TECH_ITEMS.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.description
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">memory</span>
            <span>Yeni Nesil Güvenlik Teknolojileri</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight">
            Fiziki Güvenlik & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400">Yapay Zeka Donanım Ekosistemi</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-secondary)] font-light mt-3">
            Sadece personel değil; nizamiyeden çevre duvarına kadar en ileri teknolojik donanımlarla entegre koruma kalkanı.
          </p>
        </div>

        {/* 6 Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_ITEMS.map((item, i) => (
            <div 
              key={i} 
              className="bg-gray-50/50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 rounded-3xl p-7 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-500 transition-all hover:shadow-lg"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>
                
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-[var(--color-primary)] mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200/60 dark:border-white/5 space-y-1.5">
                {item.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-[11px] text-[var(--color-secondary)]">
                    <span className="material-symbols-outlined text-xs text-slate-500">check</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
