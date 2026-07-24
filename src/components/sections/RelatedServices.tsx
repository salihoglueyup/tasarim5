"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const ALL_SERVICES = [
  { name: 'Güvenlik Yönetimi', path: '/hizmetler/guvenlik-yonetimi', icon: 'security' },
  { name: 'Tesis Yönetimi', path: '/hizmetler/tesis-yonetimi', icon: 'account_balance_wallet' },
  { name: 'Temizlik ve Hijyen', path: '/hizmetler/temizlik-ve-hijyen', icon: 'cleaning_services' },
  { name: 'Teknik Bakım', path: '/hizmetler/teknik-bakim', icon: 'engineering' },
  { name: 'Peyzaj ve Bahçe Bakımı', path: '/hizmetler/peyzaj-ve-bahce-bakimi', icon: 'park' },
  { name: 'Havuz Bakımı ve Hijyen', path: '/hizmetler/havuz-bakimi-ve-hijyen', icon: 'pool' },
  { name: 'Haşere ve Dezenfeksiyon', path: '/hizmetler/hasere-ve-dezenfeksiyon', icon: 'bug_report' },
  { name: 'Hukuk ve İcra Danışmanlığı', path: '/hizmetler/hukuk-ve-icra-danismanligi', icon: 'gavel' }
];

interface RelatedServicesProps {
  currentPath: string;
}

export default function RelatedServices({ currentPath }: RelatedServicesProps) {
  const currentIndex = ALL_SERVICES.findIndex(s => s.path === currentPath);
  
  const related = [];
  for (let i = 1; i <= 4; i++) {
    const idx = (Math.max(0, currentIndex) + i) % ALL_SERVICES.length;
    if (ALL_SERVICES[idx].path !== currentPath && related.length < 3) {
      related.push(ALL_SERVICES[idx]);
    }
  }

  return (
    <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto border-t border-slate-100 dark:border-white/5">
      <div className="flex flex-col items-center md:items-start mb-10">
        <h3 className="text-2xl font-bold text-[var(--color-primary)]">İlgili Diğer Hizmetlerimiz</h3>
        <p className="text-[var(--color-secondary)] font-light mt-2 text-sm">Alo Yönetim bünyesinde sunduğumuz diğer ayrıcalıklı çözümler.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((service, idx) => (
          <Link key={idx} href={service.path} className="group flex items-center gap-4 p-6 bg-[var(--color-surface)] border border-slate-200/60 dark:border-white/10 rounded-2xl hover:border-blue-500/50 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">{service.icon}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[var(--color-primary)] group-hover:text-blue-600 transition-colors">{service.name}</span>
              <span className="text-xs text-[var(--color-secondary)] mt-1 flex items-center gap-1">İncele <span className="material-symbols-outlined text-[10px]">arrow_forward</span></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
