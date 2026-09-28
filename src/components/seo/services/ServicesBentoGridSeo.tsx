"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const TX_MAP: Record<string, string> = {
  "Profesyonel Tesis Yönetimi & İşletmesi": "sbg_1",
  "Tesis Yönetimi": "sbg_2",
  "Yönetim & İdari": "sbg_3",
  "Karma yaşam projeleri, plazalar, AVM ve mega sitelerde güvenlik, teknik bakım, hijyen ve idari operasyonların tek merkezden yönetildiği entegre tesis işletmesi.": "sbg_4",
  "Amiral Gemisi": "sbg_5",
  "ISO 14001 Belgeli": "sbg_6",
  "Entegre Tesis & Enerji Yönetimi": "sbg_7",
  "Merkezi Satın Alma ile %22 Tasarruf": "sbg_8",
  "Tek Sözleşme ile Tüm Taşeron Denetimi": "sbg_9",
  "Tesis Yaşam Döngüsü ve Varlık Planı": "sbg_10",
  "Profesyonel Site & Rezidans Yönetimi": "sbg_11",
  "Site Yönetimi": "sbg_12",
  "634 Sayılı Kat Mülkiyeti Kanunu m.34 güvencesiyle kat malikleri kurulu kararlarının uygulanması, KMK 37 işletme projesi, şeffaf dijital kasa ve huzurlu komşuluk ilişkileri.": "sbg_13",
  "Amiral Gemisi • KMK m.34": "sbg_14",
  "39 İlçede 142M+ Bütçe Denetimi": "sbg_15",
  "KMK 37 Resmi İşletme Projesi Tebliği": "sbg_16",
  "Hukuka Uygun Genel Kurul & Divan Yönetimi": "sbg_17",
  "Canlı Gelir-Gider & Banka Entegrasyonu": "sbg_18",
  "Mobil Sakin Paneli ile Anlık Talep Takibi": "sbg_19",
  "7/24 AI Destekli Özel Güvenlik Yönetimi": "sbg_20",
  "Özel Güvenlik": "sbg_21",
  "Güvenlik": "sbg_22",
  "T.C. İçişleri Bakanlığı 5188 Sayılı Kanun lisanslı, silahlı/silahsız üniformalı nöbet, RFID devriye tur kontrolü, yapay zeka destekli plaka tanıma (PTS) ve akıllı çevre güvenliği.": "sbg_23",
  "5188 Sayılı Kanun": "sbg_24",
  "PTS & RFID Tur Kontrolü": "sbg_25",
  "İçişleri Bakanlığı Onaylı Güvenlik Planı": "sbg_26",
  "Akıllı Plaka Tanıma (PTS) & Bariyer Entegrasyonu": "sbg_27",
  "RFID Noktalarında Anlık Canlı Devriye Takibi": "sbg_28",
  "Kolluk Kuvvetleri ile Koordineli Güvenlik Komisyonu": "sbg_29",
  "7/24 Teknik Bakım, Asansör & Jeneratör Onarımı": "sbg_30",
  "Teknik Bakım": "sbg_31",
  "Asansör, jeneratör, hidrofor, kazan dairesi ve yangın otomasyon sistemlerinde periyodik bakım, kestirimci arıza tespiti ve 20 dakikada acil mobil teknik müdahale garantisi.": "sbg_32",
  "20 Dk Acil SLA": "sbg_33",
  "A Tipi Yeşil Etiket Garantisi": "sbg_34",
  "Sanayi Bakanlığı Akredite Asansör Periyodik Kontrolü": "sbg_35",
  "Jeneratör Yük Testleri ve Otomatik Transfer Panosu": "sbg_36",
  "Hidrofor & Dalgıç Pompa Basınç Dengeleme": "sbg_37",
  "Yangın Sprinkler & Algılama Otomasyonu Denetimi": "sbg_38",
  "Endüstriyel Ortak Alan ve Blok Temizliği": "sbg_39",
  "Temizlik & Hijyen": "sbg_40",
  "Hijyen & Çevre": "sbg_41",
  "Blok girişleri, kat koridorları, camlar, asansör kabinleri ve kapalı otopark zeminlerinin binicili zemin yıkama otomatları ve ekolojik deterjanlarla profesyonel sterilizasyonu.": "sbg_42",
  "Sertifikalı Ekolojik Deterjan": "sbg_43",
  "Günde 2 Kez Blok Kontrolü": "sbg_44",
  "Binicili Otomatlarla Otopark Zemin Yıkama": "sbg_45",
  "Blok Koridoru ve Merdiven Günlük Paspaslama": "sbg_46",
  "Asansör ve Giriş Kapısı Antiviral Dezenfeksiyon": "sbg_47",
  "Günde 2 Sefer Katlardan Çöp Toplama Organizasyonu": "sbg_48",
  "Şeffaf Aidat Tahsilatı, Bütçe & Sakin Portalı": "sbg_49",
  "Aidat & Muhasebe": "sbg_50",
  "Sakinler için mobil kredi kartı ile aidat ödeme altyapısı, otomatik SMS/e-posta hatırlatmaları, gecikme tazminatı hesaplaması ve anlık dijital gelir-gider bilançosu.": "sbg_51",
  "%98.7 Tahsilat Oranı": "sbg_52",
  "Kredi Kartı & Otomatik POS": "sbg_53",
  "Kredi Kartı & Sanal POS ile 7/24 Online Ödeme": "sbg_54",
  "Vadesi Geçen Borçlarda Otomatik SMS / E-posta": "sbg_55",
  "KMK m.20 Uyarınca Aylık %5 Gecikme Tazminatı": "sbg_56",
  "Mobil Uygulama Üzerinden Dekont ve Bilanço Görüntüleme": "sbg_57",
  "KMK Hukuk & İcra Takip Danışmanlığı": "sbg_58",
  "Hukuk & İcra": "sbg_59",
  "Ödenmeyen aidat ve avans borçlarında KMK 20 ve İİK 68 uyarınca noter ihtarnamesi, ilamsız icra takibi ve genel kurul kararlarının iptali davalarında hukuki temsil desteği.": "sbg_60",
  "Uzman KMK Hukukçuları": "sbg_61",
  "7 Günde İcra & İtiraz Takibi": "sbg_62",
  "Borçlu Sakinlere Noter Onaylı KMK İhtarnamesi": "sbg_63",
  "UYAP Entegre Hızlı İlamsız İcra Takibi Açılışı": "sbg_64",
  "Haksız İtirazların İptali ve %20 İcra İnkar Tazminatı": "sbg_65",
  "Yönetim Planı Güncelleme ve Hukuki Danışmanlık": "sbg_66",
  "Peyzaj Mimarisi & Bahçe Bakımı": "sbg_67",
  "Peyzaj & Bahçe": "sbg_68",
  "Mevsimlik çiçek ekimi, çim havalandırma ve biçme, ağaç budama, ilaçlama ve su tasarruflu otomatik damlama-yağmurlama sulama sistemleri periyodik mühendislik bakımı.": "sbg_69",
  "Ziraat Mühendisi Kontrolü": "sbg_70",
  "Sensörlü Akıllı Sulama": "sbg_71",
  "Mevsimlik Çiçeklendirme ve Çim Havalandırma": "sbg_72",
  "Yağmur Sensörlü Otomatik Sulama Bakımı": "sbg_73",
  "Periyodik Ağaç Budama ve Bitki İlaçlaması": "sbg_74",
  "Bahçe Atıklarının Düzenli Bertarafı": "sbg_75",
  "Havuz Bakımı & Sağlık Bakanlığı Onaylı Hijyen": "sbg_76",
  "Havuz Bakımı": "sbg_77",
  "Açık ve kapalı yüzme havuzlarında günlük klor ve pH ölçümleri, dip süpürme, filtre ters yıkama, kışlama bakımı ve akredite laboratuvar mikrobiyolojik su analizleri.": "sbg_78",
  "Halk Sağlığı Standartları": "sbg_79",
  "Günlük Klor & pH Kaydı": "sbg_80",
  "Günde 3 Kez Kimyasal Ölçüm ve İşletme Defteri": "sbg_81",
  "Dip Süpürme, Savak Kanalı ve Filtre Temizliği": "sbg_82",
  "Sezon Başı Havuz Açılış ve Kış Koruma Bakımı": "sbg_83",
  "Halk Sağlığı Onaylı Periyodik Mikrobiyolojik Testler": "sbg_84",
  "Biyosidal İlaçlama & Haşere Mücadelesi": "sbg_85",
  "Haşere & İlaçlama": "sbg_86",
  "Bodrum, sığınak, çöp bacaları, otopark ve yeşil alanlarda kemirgen ve haşerelere karşı insan ve evcil hayvan sağlığına zararsız biyosidal jel ve ULV sisleme uygulaması.": "sbg_87",
  "Sağlık Bakanlığı Ruhsatlı": "sbg_88",
  "Kokusuz & Kalıcı Koruma": "sbg_89",
  "Sağlık Bakanlığı Onaylı Biyosidal Ürünler": "sbg_90",
  "Çöp Odaları ve Bacalarında Kalıcı İlaçlama": "sbg_91",
  "Bodrum ve Otopark Kemirgen Yem İstasyonları": "sbg_92",
  "Evcil Hayvan ve Çocuk Sağlığına Zararsız Formül": "sbg_93",
  "10 Temel Operasyonel Çözüm Alanı": "sbg_94",
  "Tesis & Site Yönetim Hizmet Kataloğu": "sbg_95",
  "İhtiyacınıza uygun operasyonel modülü seçebilir veya tüm hizmetleri tek bir çatı altında anahtar teslim Entegre Tesis Yönetimi olarak birleştirebilirsiniz.": "sbg_96",
  "Tüm Hizmetler (10)": "sbg_97",
  "Yönetim & İdari (4)": "sbg_98",
  "Güvenlik (1)": "sbg_99",
  "Teknik Bakım (1)": "sbg_100",
  "Hijyen & Çevre (4)": "sbg_101",
  "araması için": "sbg_102",
  "hizmet bulundu.": "sbg_103",
  "Tüm alanlarda arandı": "sbg_104",
  "Amiral Gemisi Çözümlerimiz (Büyük Ölçekli Yönetim)": "sbg_105",
  "Hizmet Detayını İncele": "sbg_106",
  "Uzmanlık Operasyonları & Hizmet Modülleri": "sbg_107",
  "İncele": "sbg_108",
  "Aramanıza uygun hizmet bulunamadı": "sbg_109",
  "Aradığınız spesifik bir konu varsa bizimle iletişime geçebilir veya ücretsiz yönetim keşfi talep edebilirsiniz.": "sbg_110",
  "Doğrudan Teklif İsteyin": "sbg_111",
};

export interface ServiceDefinition {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: 'management' | 'security' | 'technical' | 'hygiene';
  categoryLabel: string;
  desc: string;
  icon: string;
  badge: string;
  stats: string;
  isFlagship?: boolean;
  bulletPoints: string[];
}

export const ALL_SERVICES_CATALOG: ServiceDefinition[] = [
  {
    id: 'tesis-yonetimi',
    slug: '/hizmetler/tesis-yonetimi',
    title: 'Profesyonel Tesis Yönetimi & İşletmesi',
    shortTitle: 'Tesis Yönetimi',
    category: 'management',
    categoryLabel: 'Yönetim & İdari',
    isFlagship: true,
    desc: 'Karma yaşam projeleri, plazalar, AVM ve mega sitelerde güvenlik, teknik bakım, hijyen ve idari operasyonların tek merkezden yönetildiği entegre tesis işletmesi.',
    icon: 'domain',
    badge: 'Amiral Gemisi',
    stats: 'ISO 14001 Belgeli',
    bulletPoints: [
      'Entegre Tesis & Enerji Yönetimi',
      'Merkezi Satın Alma ile %22 Tasarruf',
      'Tek Sözleşme ile Tüm Taşeron Denetimi',
      'Tesis Yaşam Döngüsü ve Varlık Planı'
    ]
  },
  {
    id: 'site-yonetimi',
    slug: '/hizmetler/site-yonetimi',
    title: 'Profesyonel Site & Rezidans Yönetimi',
    shortTitle: 'Site Yönetimi',
    category: 'management',
    categoryLabel: 'Yönetim & İdari',
    isFlagship: true,
    desc: '634 Sayılı Kat Mülkiyeti Kanunu m.34 güvencesiyle kat malikleri kurulu kararlarının uygulanması, KMK 37 işletme projesi, şeffaf dijital kasa ve huzurlu komşuluk ilişkileri.',
    icon: 'apartment',
    badge: 'Amiral Gemisi • KMK m.34',
    stats: '39 İlçede 142M+ Bütçe Denetimi',
    bulletPoints: [
      'KMK 37 Resmi İşletme Projesi Tebliği',
      'Hukuka Uygun Genel Kurul & Divan Yönetimi',
      'Canlı Gelir-Gider & Banka Entegrasyonu',
      'Mobil Sakin Paneli ile Anlık Talep Takibi'
    ]
  },
  {
    id: 'guvenlik-yonetimi',
    slug: '/hizmetler/guvenlik-yonetimi',
    title: '7/24 AI Destekli Özel Güvenlik Yönetimi',
    shortTitle: 'Özel Güvenlik',
    category: 'security',
    categoryLabel: 'Güvenlik',
    desc: 'T.C. İçişleri Bakanlığı 5188 Sayılı Kanun lisanslı, silahlı/silahsız üniformalı nöbet, RFID devriye tur kontrolü, yapay zeka destekli plaka tanıma (PTS) ve akıllı çevre güvenliği.',
    icon: 'shield',
    badge: '5188 Sayılı Kanun',
    stats: 'PTS & RFID Tur Kontrolü',
    bulletPoints: [
      'İçişleri Bakanlığı Onaylı Güvenlik Planı',
      'Akıllı Plaka Tanıma (PTS) & Bariyer Entegrasyonu',
      'RFID Noktalarında Anlık Canlı Devriye Takibi',
      'Kolluk Kuvvetleri ile Koordineli Güvenlik Komisyonu'
    ]
  },
  {
    id: 'teknik-bakim',
    slug: '/hizmetler/teknik-bakim',
    title: '7/24 Teknik Bakım, Asansör & Jeneratör Onarımı',
    shortTitle: 'Teknik Bakım',
    category: 'technical',
    categoryLabel: 'Teknik Bakım',
    desc: 'Asansör, jeneratör, hidrofor, kazan dairesi ve yangın otomasyon sistemlerinde periyodik bakım, kestirimci arıza tespiti ve 20 dakikada acil mobil teknik müdahale garantisi.',
    icon: 'engineering',
    badge: '20 Dk Acil SLA',
    stats: 'A Tipi Yeşil Etiket Garantisi',
    bulletPoints: [
      'Sanayi Bakanlığı Akredite Asansör Periyodik Kontrolü',
      'Jeneratör Yük Testleri ve Otomatik Transfer Panosu',
      'Hidrofor & Dalgıç Pompa Basınç Dengeleme',
      'Yangın Sprinkler & Algılama Otomasyonu Denetimi'
    ]
  },
  {
    id: 'temizlik-ve-hijyen',
    slug: '/hizmetler/temizlik-ve-hijyen',
    title: 'Endüstriyel Ortak Alan ve Blok Temizliği',
    shortTitle: 'Temizlik & Hijyen',
    category: 'hygiene',
    categoryLabel: 'Hijyen & Çevre',
    desc: 'Blok girişleri, kat koridorları, camlar, asansör kabinleri ve kapalı otopark zeminlerinin binicili zemin yıkama otomatları ve ekolojik deterjanlarla profesyonel sterilizasyonu.',
    icon: 'cleaning_services',
    badge: 'Sertifikalı Ekolojik Deterjan',
    stats: 'Günde 2 Kez Blok Kontrolü',
    bulletPoints: [
      'Binicili Otomatlarla Otopark Zemin Yıkama',
      'Blok Koridoru ve Merdiven Günlük Paspaslama',
      'Asansör ve Giriş Kapısı Antiviral Dezenfeksiyon',
      'Günde 2 Sefer Katlardan Çöp Toplama Organizasyonu'
    ]
  },
  {
    id: 'aidat-takibi',
    slug: '/hizmetler/aidat-takibi',
    title: 'Şeffaf Aidat Tahsilatı, Bütçe & Sakin Portalı',
    shortTitle: 'Aidat & Muhasebe',
    category: 'management',
    categoryLabel: 'Yönetim & İdari',
    desc: 'Sakinler için mobil kredi kartı ile aidat ödeme altyapısı, otomatik SMS/e-posta hatırlatmaları, gecikme tazminatı hesaplaması ve anlık dijital gelir-gider bilançosu.',
    icon: 'payments',
    badge: '%98.7 Tahsilat Oranı',
    stats: 'Kredi Kartı & Otomatik POS',
    bulletPoints: [
      'Kredi Kartı & Sanal POS ile 7/24 Online Ödeme',
      'Vadesi Geçen Borçlarda Otomatik SMS / E-posta',
      'KMK m.20 Uyarınca Aylık %5 Gecikme Tazminatı',
      'Mobil Uygulama Üzerinden Dekont ve Bilanço Görüntüleme'
    ]
  },
  {
    id: 'hukuk-ve-icra-danismanligi',
    slug: '/hizmetler/hukuk-ve-icra-danismanligi',
    title: 'KMK Hukuk & İcra Takip Danışmanlığı',
    shortTitle: 'Hukuk & İcra',
    category: 'management',
    categoryLabel: 'Yönetim & İdari',
    desc: 'Ödenmeyen aidat ve avans borçlarında KMK 20 ve İİK 68 uyarınca noter ihtarnamesi, ilamsız icra takibi ve genel kurul kararlarının iptali davalarında hukuki temsil desteği.',
    icon: 'gavel',
    badge: 'Uzman KMK Hukukçuları',
    stats: '7 Günde İcra & İtiraz Takibi',
    bulletPoints: [
      'Borçlu Sakinlere Noter Onaylı KMK İhtarnamesi',
      'UYAP Entegre Hızlı İlamsız İcra Takibi Açılışı',
      'Haksız İtirazların İptali ve %20 İcra İnkar Tazminatı',
      'Yönetim Planı Güncelleme ve Hukuki Danışmanlık'
    ]
  },
  {
    id: 'peyzaj-ve-bahce-bakimi',
    slug: '/hizmetler/peyzaj-ve-bahce-bakimi',
    title: 'Peyzaj Mimarisi & Bahçe Bakımı',
    shortTitle: 'Peyzaj & Bahçe',
    category: 'hygiene',
    categoryLabel: 'Hijyen & Çevre',
    desc: 'Mevsimlik çiçek ekimi, çim havalandırma ve biçme, ağaç budama, ilaçlama ve su tasarruflu otomatik damlama-yağmurlama sulama sistemleri periyodik mühendislik bakımı.',
    icon: 'park',
    badge: 'Ziraat Mühendisi Kontrolü',
    stats: 'Sensörlü Akıllı Sulama',
    bulletPoints: [
      'Mevsimlik Çiçeklendirme ve Çim Havalandırma',
      'Yağmur Sensörlü Otomatik Sulama Bakımı',
      'Periyodik Ağaç Budama ve Bitki İlaçlaması',
      'Bahçe Atıklarının Düzenli Bertarafı'
    ]
  },
  {
    id: 'havuz-bakimi-ve-hijyen',
    slug: '/hizmetler/havuz-bakimi-ve-hijyen',
    title: 'Havuz Bakımı & Sağlık Bakanlığı Onaylı Hijyen',
    shortTitle: 'Havuz Bakımı',
    category: 'hygiene',
    categoryLabel: 'Hijyen & Çevre',
    desc: 'Açık ve kapalı yüzme havuzlarında günlük klor ve pH ölçümleri, dip süpürme, filtre ters yıkama, kışlama bakımı ve akredite laboratuvar mikrobiyolojik su analizleri.',
    icon: 'pool',
    badge: 'Halk Sağlığı Standartları',
    stats: 'Günlük Klor & pH Kaydı',
    bulletPoints: [
      'Günde 3 Kez Kimyasal Ölçüm ve İşletme Defteri',
      'Dip Süpürme, Savak Kanalı ve Filtre Temizliği',
      'Sezon Başı Havuz Açılış ve Kış Koruma Bakımı',
      'Halk Sağlığı Onaylı Periyodik Mikrobiyolojik Testler'
    ]
  },
  {
    id: 'hasere-ve-dezenfeksiyon',
    slug: '/hizmetler/hasere-ve-dezenfeksiyon',
    title: 'Biyosidal İlaçlama & Haşere Mücadelesi',
    shortTitle: 'Haşere & İlaçlama',
    category: 'hygiene',
    categoryLabel: 'Hijyen & Çevre',
    desc: 'Bodrum, sığınak, çöp bacaları, otopark ve yeşil alanlarda kemirgen ve haşerelere karşı insan ve evcil hayvan sağlığına zararsız biyosidal jel ve ULV sisleme uygulaması.',
    icon: 'pest_control',
    badge: 'Sağlık Bakanlığı Ruhsatlı',
    stats: 'Kokusuz & Kalıcı Koruma',
    bulletPoints: [
      'Sağlık Bakanlığı Onaylı Biyosidal Ürünler',
      'Çöp Odaları ve Bacalarında Kalıcı İlaçlama',
      'Bodrum ve Otopark Kemirgen Yem İstasyonları',
      'Evcil Hayvan ve Çocuk Sağlığına Zararsız Formül'
    ]
  }
];

interface ServicesBentoGridSeoProps {
  searchQuery?: string;
  onOpenQuote?: () => void;
}

export default function ServicesBentoGridSeo({
  searchQuery = '',
  onOpenQuote,
}: ServicesBentoGridSeoProps) {
  const { t, language } = useLanguage();
  const lp = (p: string) => (language === 'tr' ? p : `/${language}${p}`);
  const tx = (s: string): string => {
    const k = TX_MAP[s];
    return k ? t(k as Parameters<typeof t>[0]) : s;
  };
  const [activeTab, setActiveTab] = useState<'all' | 'management' | 'security' | 'technical' | 'hygiene'>('all');

  const filteredServices = ALL_SERVICES_CATALOG.filter((service) => {
    const matchesTab = activeTab === 'all' || service.category === activeTab;
    const matchesSearch =
      searchQuery.trim() === '' ||
      tx(service.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx(service.desc).toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx(service.categoryLabel).toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.bulletPoints.some((b) => tx(b).toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const flagshipServices = filteredServices.filter((s) => s.isFlagship);
  const regularServices = filteredServices.filter((s) => !s.isFlagship);

  return (
    <section id="hizmet-katalogu" className="py-20 md:py-28 bg-[var(--color-background)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-sm">hub</span>
              {tx('10 Temel Operasyonel Çözüm Alanı')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              {tx('Tesis & Site Yönetim Hizmet Kataloğu')}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-secondary)] max-w-lg font-light leading-relaxed">
            {tx('İhtiyacınıza uygun operasyonel modülü seçebilir veya tüm hizmetleri tek bir çatı altında anahtar teslim Entegre Tesis Yönetimi olarak birleştirebilirsiniz.')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Tüm Hizmetler (10)', icon: 'apps' },
            { id: 'management', label: 'Yönetim & İdari (4)', icon: 'domain' },
            { id: 'security', label: 'Güvenlik (1)', icon: 'shield' },
            { id: 'technical', label: 'Teknik Bakım (1)', icon: 'engineering' },
            { id: 'hygiene', label: 'Hijyen & Çevre (4)', icon: 'eco' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-102'
                  : 'bg-[var(--color-surface)] text-[var(--color-secondary)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              {tx(tab.label)}
            </button>
          ))}
        </div>

        {/* Results Counter if searching */}
        {searchQuery.trim() !== '' && (
          <div className="mb-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-blue-800 dark:text-blue-300 flex items-center justify-between">
            <span>
              <strong>&ldquo;{searchQuery}&rdquo;</strong> {tx('araması için')} <strong>{filteredServices.length}</strong> {tx('hizmet bulundu.')}
            </span>
            <span className="text-xs opacity-75">{tx('Tüm alanlarda arandı')}</span>
          </div>
        )}

        {/* Top Bento Row: Flagship Services (Tesis & Site Yönetimi) */}
        {flagshipServices.length > 0 && (
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">star</span>
              {tx('Amiral Gemisi Çözümlerimiz (Büyük Ölçekli Yönetim)')}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {flagshipServices.map((service) => (
                <div
                  key={service.id}
                  className="group relative bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-variant)]/40 border-2 border-blue-500/30 hover:border-blue-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                      </div>
                      <span className="text-xs font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-3.5 py-1.5 rounded-full">
                        {tx(service.badge)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tx(service.title)}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed font-light">
                        {tx(service.desc)}
                      </p>
                    </div>

                    {/* Bullet Points */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[var(--color-outline)]/40 text-xs text-[var(--color-primary)] font-medium">
                      {service.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                          <span>{tx(point)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[var(--color-outline)]/50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--color-tertiary)] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-amber-500">verified</span>
                      {tx(service.stats)}
                    </span>
                    <Link
                      href={lp(service.slug)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:translate-x-1 transition-all"
                    >
                      {tx('Hizmet Detayını İncele')}
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Services Grid (8 Specialized Modules) */}
        {regularServices.length > 0 && (
          <div>
            {flagshipServices.length > 0 && (
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">construction</span>
                {tx('Uzmanlık Operasyonları & Hizmet Modülleri')}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {regularServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[var(--color-secondary)] bg-[var(--color-surface-variant)] px-2.5 py-1 rounded-full border border-[var(--color-outline)]/40">
                        {tx(service.categoryLabel)}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {tx(service.title)}
                    </h3>

                    <p className="text-xs text-[var(--color-secondary)] leading-relaxed font-light line-clamp-3">
                      {tx(service.desc)}
                    </p>

                    <div className="pt-2 text-[11px] font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      {tx(service.badge)}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--color-outline)]/40 flex items-center justify-between">
                    <span className="text-[10px] text-[var(--color-secondary)] font-medium">
                      {tx(service.stats)}
                    </span>
                    <Link
                      href={lp(service.slug)}
                      className="text-xs font-bold text-[var(--color-primary)] hover:text-amber-500 flex items-center gap-1 transition-colors"
                    >
                      {tx('İncele')}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 px-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl">
            <span className="material-symbols-outlined text-5xl text-slate-400 mb-3">search_off</span>
            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">{tx('Aramanıza uygun hizmet bulunamadı')}</h3>
            <p className="text-xs text-[var(--color-secondary)] max-w-md mx-auto mb-6">
              {tx('Aradığınız spesifik bir konu varsa bizimle iletişime geçebilir veya ücretsiz yönetim keşfi talep edebilirsiniz.')}
            </p>
            <Link
              href={lp('/teklif-al')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[var(--color-surface)] text-xs font-bold"
            >
              {tx('Doğrudan Teklif İsteyin')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
