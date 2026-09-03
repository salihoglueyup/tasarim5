"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { MenuItem } from './MobileMenu';

type MegaMenuDropdownProps = {
  hoveredMenu: string | null;
  item: MenuItem;
  getLocalizedPath: (path: string) => string;
  closeMenus: () => void;
};

import type { Language } from '@/i18n/translations';

interface PromoConfig {
  tag: string;
  title: string;
  desc: string;
  link: string;
  btnText: string;
  badgeBg?: string;
}

const PROMO_MAP: Record<Language, Record<string, PromoConfig>> = {
  tr: {
    nav_services: {
      tag: '%30 Net Tasarruf',
      title: 'Aidat & Bütçe Simülatörü ⚡',
      desc: 'Sitenizin daire sayısına göre işletme projesi maliyetini ve tasarrufunu hesaplayın.',
      link: '/hesaplayici',
      btnText: 'Hemen Hesapla',
    },
    nav_tools_library: {
      tag: 'KMK 634 Arşivi',
      title: 'Site Yönetimi Sözlüğü 📖',
      desc: 'Kat Mülkiyeti Kanunu ve tesis yönetimi alanında 120+ terim ve içtihat rehberi.',
      link: '/sozluk',
      btnText: 'Sözlüğü Keşfet',
    },
    nav_districts: {
      tag: '7/24 Mobil Ağ',
      title: '45 Dk SLA Acil Müdahale 📍',
      desc: "İstanbul'un 39 ilçesinde nöbetçi gezici teknik servis ve süpervizör amir filosu.",
      link: '/bolgeler',
      btnText: 'Tüm İlçeleri Gör',
    },
    nav_corporate: {
      tag: 'ISO 41001 Belgeli',
      title: 'Kalite Standartlarımız 🏆',
      desc: 'TÜRKAK akreditasyonlu ISO 41001, 9001, 14001, 45001 kalite sertifikalarımız.',
      link: '/kurumsal/kalite-belgelerimiz',
      btnText: 'Belgeleri İncele',
    },
    nav_contact_media: {
      tag: '7/24 Canlı Destek',
      title: 'Ücretsiz Keşif & Teklif 🚀',
      desc: '48 saat içinde sitenize özel şeffaf işletme projesi ve tasarruf analizi sunuyoruz.',
      link: '/teklif-al',
      btnText: 'Ücretsiz Keşif İste',
    },
  },
  en: {
    nav_services: {
      tag: '30% Net Savings',
      title: 'Dues & Budget Simulator ⚡',
      desc: 'Calculate operating project costs and net savings based on your property unit count.',
      link: '/hesaplayici',
      btnText: 'Calculate Now',
    },
    nav_tools_library: {
      tag: 'KMK 634 Archive',
      title: 'Management Glossary 📖',
      desc: 'Guide to 120+ Condominium Law and integrated facility management terms.',
      link: '/sozluk',
      btnText: 'Explore Glossary',
    },
    nav_districts: {
      tag: '24/7 Mobile Network',
      title: '45 Min SLA Response 📍',
      desc: 'Mobile technical crew and supervisor fleet covering all 39 Istanbul districts.',
      link: '/bolgeler',
      btnText: 'View All Districts',
    },
    nav_corporate: {
      tag: 'ISO 41001 Certified',
      title: 'Quality Standards 🏆',
      desc: 'TURKAK-accredited ISO 41001, 9001, 14001, 45001 international certificates.',
      link: '/kurumsal/kalite-belgelerimiz',
      btnText: 'Inspect Certificates',
    },
    nav_contact_media: {
      tag: '24/7 Live Support',
      title: 'Free Discovery & Quote 🚀',
      desc: 'We deliver a transparent operating project and savings analysis within 48 hours.',
      link: '/teklif-al',
      btnText: 'Request Free Discovery',
    },
  },
  ru: {
    nav_services: {
      tag: 'Экономия до 30%',
      title: 'Калькулятор взносов ⚡',
      desc: 'Рассчитайте стоимость операционного бюджета и экономию для вашего ЖК.',
      link: '/hesaplayici',
      btnText: 'Рассчитать сейчас',
    },
    nav_tools_library: {
      tag: 'Архив KMK 634',
      title: 'Словарь управления 📖',
      desc: 'Справочник по более чем 120 терминам закона о кондоминиумах и управлении.',
      link: '/sozluk',
      btnText: 'Открыть словарь',
    },
    nav_districts: {
      tag: 'Сеть 24/7',
      title: 'SLA реагирования 45 мин 📍',
      desc: 'Мобильные технические бригады во всех 39 районах Стамбула.',
      link: '/bolgeler',
      btnText: 'Все районы',
    },
    nav_corporate: {
      tag: 'Сертификат ISO 41001',
      title: 'Стандарты качества 🏆',
      desc: 'Международные сертификаты TÜRKAK ISO 41001, 9001, 14001, 45001.',
      link: '/kurumsal/kalite-belgelerimiz',
      btnText: 'Изучить сертификаты',
    },
    nav_contact_media: {
      tag: 'Поддержка 24/7',
      title: 'Бесплатный аудит и КП 🚀',
      desc: 'Прозрачный проект бюджета и анализ экономии в течение 48 часов.',
      link: '/teklif-al',
      btnText: 'Запросить аудит',
    },
  },
  ar: {
    nav_services: {
      tag: 'وفر يصل إلى 30%',
      title: 'حاسبة الرسوم والميزانية ⚡',
      desc: 'احسب تكلفة المشروع التشغيلي والوفر الصافي بناءً على عدد وحدات مجمعك.',
      link: '/hesaplayici',
      btnText: 'احسب الآن',
    },
    nav_tools_library: {
      tag: 'أرشيف قانون الملكية 634',
      title: 'قاموس إدارة المرافق 📖',
      desc: 'دليل لأكثر من 120 مصطلحاً وسابقة قضائية في إدارة المجمعات والمرافق.',
      link: '/sozluk',
      btnText: 'استكشف القاموس',
    },
    nav_districts: {
      tag: 'شبكة متنقلة 24/7',
      title: 'استجابة سريعة خلال 45 دقيقة 📍',
      desc: 'فرق صيانة فنية متنقلة وأسطول مشرفين يغطي 39 منطقة في إسطنبول.',
      link: '/bolgeler',
      btnText: 'عرض جميع المناطق',
    },
    nav_corporate: {
      tag: 'معتمد ISO 41001',
      title: 'معايير الجودة العالمية 🏆',
      desc: 'شهادات ISO 41001 و 9001 و 14001 و 45001 المعتمدة من TÜRKAK.',
      link: '/kurumsal/kalite-belgelerimiz',
      btnText: 'فحص الشهادات',
    },
    nav_contact_media: {
      tag: 'دعم مباشر 24/7',
      title: 'معاينة وعرض مجاني 🚀',
      desc: 'نقدم مشروع تشغيل شفاف وتحليلاً للوفر المالي في مجمعك خلال 48 ساعة.',
      link: '/teklif-al',
      btnText: 'طلب معاينة مجانية',
    },
  }
};

const WIDTH_MAP: Record<string, string> = {
  nav_services: 'w-[800px]',
  nav_districts: 'w-[740px]',
  nav_tools_library: 'w-[680px]',
  nav_corporate: 'w-[680px]',
  nav_contact_media: 'w-[680px]',
};

export default function MegaMenuDropdown({
  hoveredMenu,
  item,
  getLocalizedPath,
  closeMenus,
}: MegaMenuDropdownProps) {
  const { t, language } = useLanguage();

  if (!item.subItems) return null;

  const langPromos = PROMO_MAP[language] || PROMO_MAP.tr;
  const promo = langPromos[item.nameKey] || langPromos.nav_services;
  const widthClass = WIDTH_MAP[item.nameKey] || 'w-[720px]';

  return (
    <AnimatePresence>
      {hoveredMenu === item.nameKey && (
        <motion.div 
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className={`absolute top-full left-1/2 -translate-x-1/2 ${widthClass} pt-3 origin-top z-50`}
        >
          <div className="bg-white/95 dark:bg-[#15161E]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-[var(--color-outline)]/80 dark:border-white/10 overflow-hidden grid grid-cols-12 p-5 gap-4">
            
            {/* Sub-items (8 Cols) */}
            <div className="col-span-8 grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-1">
              {item.subItems.map((subItem) => (
                <Link 
                  key={subItem.nameKey} 
                  href={getLocalizedPath(subItem.path)}
                  prefetch={subItem.path === '/hizmetler/tesis-yonetimi'}
                  onClick={closeMenus}
                  className="p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex items-start gap-3 group"
                >
                  {subItem.icon && (
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0">
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{subItem.icon}</span>
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t(subItem.nameKey)}
                    </div>
                    {subItem.descKey && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light leading-snug mt-0.5 line-clamp-1">
                        {t(subItem.descKey)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Promo / Banner Card (4 Cols) */}
            <div className="col-span-4 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#1e293b] to-blue-950 border border-white/10 shadow-lg">
              
              {/* Arka plan dekoratif desen & parlama */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-2">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full w-fit">
                  {promo.tag}
                </span>
                <div className="font-extrabold text-sm leading-snug mt-1 text-white">{promo.title}</div>
                <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                  {promo.desc}
                </p>
                {item.nameKey === 'nav_contact_media' && (
                  <a
                    href="tel:+902165504848"
                    className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1.5 rounded-xl transition-colors mt-2 w-fit shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">call</span>
                    <span>0216 550 48 48</span>
                  </a>
                )}
              </div>

              <Link 
                href={getLocalizedPath(promo.link)}
                prefetch={['/hesaplayici', '/hizmetler/tesis-yonetimi'].includes(promo.link)}
                onClick={closeMenus}
                className="relative z-10 mt-4 text-xs font-bold text-white hover:text-slate-950 bg-white/10 hover:bg-white border border-white/15 hover:border-white py-2.5 px-3.5 rounded-xl flex items-center justify-between group/btn transition-all duration-300 shadow-sm"
              >
                <span>{promo.btnText}</span>
                <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
