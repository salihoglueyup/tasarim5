'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'genel-bakis', label: 'Genel Bakış', icon: 'visibility' },
  { id: 'hizmet-kapsami', label: '9 Disiplin & Kapsam', icon: 'layers' },
  { id: 'tesis-araclari', label: 'Akıllı Araçlar & RFP', icon: 'calculate' },
  { id: 'hukuk-ve-guvenlik', label: 'KMK Hukuk & 5188 Güvenlik', icon: 'gavel' },
  { id: 'bakim-ve-enerji', label: 'Yıllık Bakım & Enerji', icon: 'calendar_month' },
  { id: 'fiyat-ve-sss', label: 'Fiyatlar & SSS', icon: 'help_outline' },
];

export default function FacilityStickySubnav() {
  const [activeSection, setActiveSection] = useState<string>('genel-bakis');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky visibility threshold
      if (window.scrollY > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll offset
      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: Math.abs(rect.top - 120) };
      });

      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0] && offsets[0].top < 600) {
        setActiveSection(offsets[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 110;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="Tesis Yönetimi Hızlı Bölüm Menüsü"
      className={`sticky top-0 sm:top-16 z-30 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-surface)]/95 dark:bg-[var(--color-surface)]/95 backdrop-blur-xl border-b border-[var(--color-outline)]/80 dark:border-white/10 shadow-md'
          : 'bg-[var(--color-surface)]/80 dark:bg-[var(--color-surface)]/80 backdrop-blur-md border-b border-[var(--color-outline)]/60'
      }`}
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Navigation Anchor Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm font-bold scale-[1.02]'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                }`}
              >
                <span className={`material-symbols-outlined text-[16px] ${isActive ? 'text-[var(--color-on-primary)]' : 'text-[var(--color-tertiary)]'}`} aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right CTA Button */}
        <div className="shrink-0 hidden md:flex items-center gap-3">
          <Link
            href="/teklif-al"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>Ücretsiz Keşif Al</span>
            <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
