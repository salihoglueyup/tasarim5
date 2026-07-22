"use client";

import PageHeader from '@/components/layout/PageHeader';
import { Card, Badge, Button } from '@/components';
import Link from 'next/link';

const legalPoints = [
  {
    title: "Kat Mülkiyeti Kanunu (KMK) Danışmanlığı",
    desc: "Ortak alan işgalleri, bağımsız bölüm tadilat anlaşmazlıkları ve komşuluk hukuku ihtilaflarında uzman avukat kadrosu.",
    icon: "gavel"
  },
  {
    title: "Aidat Alacak İcra Takibi",
    desc: "Gecikmeye düşen kat malikleri için komşuluk ilişkilerini koruyan 4 adımlı uzlaşmacı ve yasal tahsilat akışı.",
    icon: "balance"
  },
  {
    title: "Kat Malikleri Genel Kurul Yönetimi",
    desc: "Bina genel kurullarının yasal usullere (çağrı, divan, karar defteri tescili) uygun eksiksiz organizasyonu.",
    icon: "groups"
  },
  {
    title: "Tedarikçi ve Hizmet Sözleşmeleri",
    desc: "Güvenlik, temizlik ve asansör firmalarıyla yapılan tüm sözleşmelerin binayı koruyacak cezai şartlarla hazırlanması.",
    icon: "history_edu"
  }
];

export default function HukukVeIcraDanismanligi() {
  return (
    <>
      <PageHeader 
        title="Hukuk & İcra Danışmanlığı" 
        description="Kat Mülkiyeti Kanunu uyarınca şeffaf aidat tahsilatı ve yasal genel kurul süreçleri." 
      />

      <section className="py-24 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-[#1e293b] to-[#0f172a] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl mb-20 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <Badge status="neutral">%100 Hukuki Güvence</Badge>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Sitenizin Tüm Hakları Kat Mülkiyeti Kanununa Tam Uyumlu
            </h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Uzman baro üyesi avukatlarımızla komşuluk huzurunu bozmadan aidat alacaklarını %100 tahsil ediyor, hukuki riskleri sıfırlıyoruz.
            </p>
          </div>
          <Link href="/teklif-al">
            <Button variant="primary" size="lg" className="bg-slate-700 hover:bg-slate-600 text-white shrink-0">
              Hukuk Danışmanlığı İsteyin
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legalPoints.map((p, i) => (
            <Card key={i} variant="glow" className="p-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{p.title}</h3>
              <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>

      </section>
    </>
  );
}
