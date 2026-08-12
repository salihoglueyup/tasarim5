'use client';

import { usePathname } from 'next/navigation';
import JsonLd from './JsonLd';
import { generateBreadcrumbs } from '@/lib/schemas';

const PATH_NAMES: Record<string, string> = {
  'hizmetler': 'Hizmetler',
  'iletisim': 'İletişim',
  'hakkimizda': 'Hakkımızda',
  'blog': 'Blog',
  'referanslar': 'Referanslar',
  'sektorel-cozumler': 'Sektörel Çözümler',
  'bolgeler': 'Bölgeler',
  'sss': 'Sıkça Sorulan Sorular',
  'hesaplayici': 'Hesaplayıcı',
  'kurumsal': 'Kurumsal',
  'guvenlik-akademisi': 'Güvenlik Akademisi',
  // Hizmetler
  'temizlik-ve-hijyen': 'Temizlik ve Hijyen',
  'tesis-yonetimi': 'Tesis Yönetimi',
  'guvenlik-yonetimi': 'Güvenlik Yönetimi',
  'teknik-bakim': 'Teknik Bakım',
  'peyzaj-ve-bahce-bakimi': 'Peyzaj ve Bahçe Bakımı',
  'havuz-bakimi-ve-hijyen': 'Havuz Bakımı',
  'hasere-ve-dezenfeksiyon': 'Haşere ve Dezenfeksiyon',
  'hukuk-ve-icra-danismanligi': 'Hukuk ve İcra Danışmanlığı',
  'aidat-takibi': 'Aidat Takibi',
};

function formatName(segment: string) {
  if (PATH_NAMES[segment]) return PATH_NAMES[segment];
  return segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  if (!pathname || pathname === '/' || pathname === '/tr' || pathname === '/en') return null;

  const segments = pathname.split('/').filter(Boolean);
  
  // İlk segment dil ise atla
  const hasLang = ['tr', 'en', 'ru', 'ar'].includes(segments[0]);
  const langPrefix = hasLang ? `/${segments[0]}` : '';
  const breadcrumbSegments = hasLang ? segments.slice(1) : segments;

  if (breadcrumbSegments.length === 0) return null;

  const items = [
    { name: 'Ana Sayfa', url: `${langPrefix}` || '/' }
  ];

  let currentPath = langPrefix;
  breadcrumbSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    items.push({
      name: formatName(segment),
      url: currentPath,
    });
  });

  return <JsonLd data={generateBreadcrumbs(items)} />;
}
