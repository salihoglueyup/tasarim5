'use client';

import { usePathname } from 'next/navigation';
import JsonLd from './JsonLd';
import { generateBreadcrumbs } from '@/lib/schemas';

const PATH_NAMES: Record<string, string> = {
  // Ana Menü
  'hizmetler': 'Hizmetlerimiz',
  'iletisim': 'İletişim',
  'hakkimizda': 'Hakkımızda',
  'blog': 'Blog',
  'referanslar': 'Referanslar',
  'sektorel-cozumler': 'Sektörel Çözümler',
  'bolgeler': 'Hizmet Bölgelerimiz',
  'sss': 'Sıkça Sorulan Sorular',
  'hesaplayici': 'Aidat & Hizmet Hesaplayıcı',
  'kurumsal': 'Kurumsal',
  'guvenlik-akademisi': 'Güvenlik Akademisi',
  'teklif-al': 'Ücretsiz Teklif Al',
  'basari-hikayeleri': 'Başarı Hikayeleri',
  'istihdam-koprusu': 'İstihdam Köprüsü',
  'site-haritasi': 'Site Haritası',
  'sozluk': 'Tesis Yönetimi Sözlüğü',

  // Kurumsal Alt Sayfalar
  'kalite-belgelerimiz': 'Kalite Belgelerimiz & Sertifikalar',
  'kalite-politikamiz': 'Kalite Politikamız',
  'vizyon-misyon': 'Vizyon & Misyon',
  'surdurulebilirlik': 'Sürdürülebilirlik',
  'ges-projeleri': 'Güneş Enerjisi (GES) Projeleri',

  // Hizmet Detayları
  'temizlik-ve-hijyen': 'Temizlik ve Hijyen Yönetimi',
  'tesis-yonetimi': 'Entegre Tesis ve Site Yönetimi',
  'guvenlik-yonetimi': 'Özel Güvenlik Yönetimi',
  'teknik-bakim': 'Teknik Bakım ve İşletme',
  'peyzaj-ve-bahce-bakimi': 'Peyzaj ve Bahçe Bakımı',
  'havuz-bakimi-ve-hijyen': 'Havuz Bakımı ve Hijyen',
  'hasere-ve-dezenfeksiyon': 'Haşere Kontrol ve Dezenfeksiyon',
  'hukuk-ve-icra-danismanligi': 'Hukuk ve İcra Danışmanlığı',
  'aidat-takibi': 'Aidat Takibi ve Bütçe Yönetimi',

  // İlçe İsimleri
  'kadikoy': 'Kadıköy',
  'atasehir': 'Ataşehir',
  'uskudar': 'Üsküdar',
  'maltepe': 'Maltepe',
  'kartal': 'Kartal',
  'umraniye': 'Ümraniye',
  'besiktas': 'Beşiktaş',
  'sisli': 'Şişli',
  'bakirkoy': 'Bakırköy',
  'sariyer': 'Sarıyer',
  'beylikduzu': 'Beylikdüzü',
  'basaksehir': 'Başakşehir',

  // Yasal Sayfalar
  'kullanim-sartlari': 'Kullanım Şartları',
  'gizlilik-politikasi': 'Gizlilik Politikası',
  'cerez-politikasi': 'Çerez Politikası',
  'kvkk-ve-aydinlatma-metni': 'KVKK Aydınlatma Metni',

  // Blog Kategorileri
  'kategori': 'Kategori',
  'etiket': 'Etiket',
  'yazar': 'Yazar',
};

function formatName(segment: string) {
  if (PATH_NAMES[segment]) return PATH_NAMES[segment];
  return segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Dinamik Breadcrumb JSON-LD Enjeksiyonu
 * Google SERP'de tıklanabilir site hiyerarşisini (BreadcrumbList) hatasız Türkçe karakterlerle üretir.
 */
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
