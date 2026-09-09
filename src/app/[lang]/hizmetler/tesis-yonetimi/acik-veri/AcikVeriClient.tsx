"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FacilitySubSectorCrossNav from '@/components/seo/FacilitySubSectorCrossNav';
import { BASE_URL } from '@/lib/seo';

interface ApiEndpointInfo {
  id: string;
  name: string;
  category: string;
  path: string;
  description: string;
  updateFrequency: string;
  icon: string;
  sampleCurl: string;
  fields: { name: string; type: string; desc: string }[];
  sampleJson: string;
}

const API_ENDPOINTS: ApiEndpointInfo[] = [
  {
    id: 'kpi-benchmarks',
    name: 'Sektörel SLA & KPI Karşılaştırma Verileri',
    category: 'Sektörel Kıyaslama',
    path: '/api/tesis-yonetimi/kpi-benchmarks.json',
    description: 'Plaza, rezidans, toplu konut ve sanayi tesisleri için ortalama acil müdahale süreleri (SLA), işletme bütçesi sapma toleransları, aidat tahsilat başarı oranları ve sakin memnuniyet endeksleri.',
    updateFrequency: 'Aylık Güncellenir',
    icon: 'analytics',
    sampleCurl: `curl -X GET "${BASE_URL}/api/tesis-yonetimi/kpi-benchmarks.json" -H "Accept: application/json"`,
    fields: [
      { name: 'sector', type: 'string', desc: 'Tesis tipi (plaza, rezidans, toplu-konut, sanayi)' },
      { name: 'averageSlaMinutes', type: 'number', desc: 'Teknik arıza müdahale taahhüt süresi (dakika)' },
      { name: 'collectionRatePercent', type: 'number', desc: 'Ortalama aidat tahsilat başarı yüzdesi (%)' },
      { name: 'budgetVarianceTolerance', type: 'number', desc: 'İşletme bütçesi sapma payı toleransı (%)' },
      { name: 'residentSatisfactionScore', type: 'number', desc: '100 üzerinden periyodik memnuniyet skoru' },
    ],
    sampleJson: JSON.stringify(
      {
        schemaVersion: "2026.1",
        updatedAt: "2026-09-01T00:00:00Z",
        sectors: [
          {
            slug: "plaza-yonetimi",
            title: "A+ Plaza & İş Merkezi",
            averageSlaMinutes: 30,
            collectionRatePercent: 98.4,
            budgetVarianceTolerance: 2.1,
            residentSatisfactionScore: 94.8
          },
          {
            slug: "rezidans-site-yonetimi",
            title: "Rezidans & Lüks Konut",
            averageSlaMinutes: 45,
            collectionRatePercent: 96.2,
            budgetVarianceTolerance: 3.5,
            residentSatisfactionScore: 92.4
          }
        ]
      },
      null,
      2
    ),
  },
  {
    id: 'legal-precedents',
    name: 'Yargıtay Emsal Kararları & KMK 634 İçtihat Arşivi',
    category: 'Hukuk & Mevzuat',
    path: '/api/tesis-yonetimi/legal-precedents.json',
    description: '634 Sayılı Kat Mülkiyeti Kanunu ve 2004 Sayılı İİK çerçevesinde aidat borçları (KMK m.20), işletme projesine itiraz süreleri (KMK m.37), yönetici seçimi (KMK m.34) ve oybirliği gerektiren işlemler (KMK m.45) için Yargıtay Hukuk Daireleri emsal ilamları.',
    updateFrequency: 'Haftalık Kontrol',
    icon: 'gavel',
    sampleCurl: `curl -X GET "${BASE_URL}/api/tesis-yonetimi/legal-precedents.json" -H "Accept: application/json"`,
    fields: [
      { name: 'articleCode', type: 'string', desc: 'İlgili kanun maddesi (KMK-20, KMK-37, vb.)' },
      { name: 'rulingCourt', type: 'string', desc: 'Kararı veren mahkeme veya Yargıtay Dairesi' },
      { name: 'caseNumber', type: 'string', desc: 'Esas ve Karar Numarası' },
      { name: 'precedentSummary', type: 'string', desc: 'Tesis yönetimini bağlayan bağlayıcı hukuki ilke' },
    ],
    sampleJson: JSON.stringify(
      {
        legalDomain: "634 Sayılı Kat Mülkiyeti Kanunu",
        totalPrecedents: 12,
        precedents: [
          {
            articleCode: "KMK-20",
            rulingCourt: "Yargıtay 18. Hukuk Dairesi",
            caseNumber: "E. 2014/15234, K. 2014/18902",
            precedentSummary: "Kat maliki ortak yer ve tesislerden yararlanmadığını öne sürerek aidat ödemekten kaçınamaz. %5 gecikme tazminatı kanunen re'sen uygulanır."
          },
          {
            articleCode: "KMK-37",
            rulingCourt: "Yargıtay 5. Hukuk Dairesi",
            caseNumber: "E. 2021/8412, K. 2021/11045",
            precedentSummary: "7 günlük tebliğ ve itiraz süresi içinde itiraz edilmeyen işletme projesi kesinleşerek İİK m.68 kapsamında borç ikrarı içeren resmi senet niteliği kazanır."
          }
        ]
      },
      null,
      2
    ),
  },
  {
    id: 'energy-benchmarks',
    name: 'ISO 50001 Enerji & Yeşil Tesis Tüketim Standartları',
    category: 'Yeşil Tesis & Mühendislik',
    path: '/api/tesis-yonetimi/energy-benchmarks.json',
    description: 'Ortak alan aydınlatma, merkezi iklimlendirme (HVAC), kompanzasyon reaktif ceza sınırları ve çatı GES tasarruf hedefleri için doğrulanmış enerji kıyaslama standartları.',
    updateFrequency: 'Çeyreklik Güncellenir',
    icon: 'energy_savings_leaf',
    sampleCurl: `curl -X GET "${BASE_URL}/api/tesis-yonetimi/energy-benchmarks.json" -H "Accept: application/json"`,
    fields: [
      { name: 'facilityType', type: 'string', desc: 'Bina tipi ve metrekare ölçeği' },
      { name: 'kwhPerSquareMeterAnnual', type: 'number', desc: 'Yıllık hedef ortak alan elektrik tüketimi (kWh/m²)' },
      { name: 'maxReactivePenaltyRatio', type: 'number', desc: 'İzin verilen maksimum reaktif oran (<%14)' },
      { name: 'solarRoiYears', type: 'number', desc: 'Güneş santrali ortalama amortisman süresi (yıl)' },
    ],
    sampleJson: JSON.stringify(
      {
        standard: "ISO 50001:2018 Enerji Yönetim Sistemi",
        benchmarks: [
          {
            facilityType: "A+ İş Merkezi & Plaza",
            kwhPerSquareMeterAnnual: 110.5,
            maxReactivePenaltyRatio: 0.12,
            solarRoiYears: 3.4
          },
          {
            facilityType: "Toplu Konut & Site Ortak Alan",
            kwhPerSquareMeterAnnual: 42.0,
            maxReactivePenaltyRatio: 0.14,
            solarRoiYears: 3.8
          }
        ]
      },
      null,
      2
    ),
  },
  {
    id: 'budget-distribution',
    name: 'İşletme Bütçesi Kalem Dağılım İstatistikleri',
    category: 'Mali Yönetim',
    path: '/api/tesis-yonetimi/budget-distribution.json',
    description: 'KMK Madde 37 kapsamında hazırlanan site işletme bütçelerinde harcama kalemlerinin (Güvenlik, Temizlik, Teknik Bakım, Enerji, Hukuk) ideal yüzdesel dağılım normları.',
    updateFrequency: 'Altı Aylık',
    icon: 'account_balance_wallet',
    sampleCurl: `curl -X GET "${BASE_URL}/api/tesis-yonetimi/budget-distribution.json" -H "Accept: application/json"`,
    fields: [
      { name: 'category', type: 'string', desc: 'Bütçe harcama kalemi' },
      { name: 'minSharePercent', type: 'number', desc: 'Asgari bütçe payı (%)' },
      { name: 'maxSharePercent', type: 'number', desc: 'Azami bütçe payı (%)' },
      { name: 'recommendedAllocation', type: 'number', desc: 'Optimum önerilen bütçe payı (%)' },
    ],
    sampleJson: JSON.stringify(
      {
        budgetDistributionBenchmark: [
          { category: "5188 Lisanslı Özel Güvenlik", minSharePercent: 35, maxSharePercent: 44, recommendedAllocation: 39 },
          { category: "Endüstriyel Temizlik & Hijyen", minSharePercent: 18, maxSharePercent: 25, recommendedAllocation: 21 },
          { category: "Periyodik Teknik Bakım & Asansör", minSharePercent: 14, maxSharePercent: 20, recommendedAllocation: 17 },
          { category: "Ortak Alan Enerji & Su Tüketimi", minSharePercent: 12, maxSharePercent: 18, recommendedAllocation: 15 },
          { category: "Hukuk Müşavirliği & İcra Takibi", minSharePercent: 4, maxSharePercent: 8, recommendedAllocation: 5 },
          { category: "Demirbaş & Olağanüstü Yedek Fon", minSharePercent: 3, maxSharePercent: 6, recommendedAllocation: 3 }
        ]
      },
      null,
      2
    ),
  },
  {
    id: 'maintenance-frequencies',
    name: 'Teknik Bakım & İş Güvenliği Periyodik Kontrol Takvimi',
    category: 'Mühendislik & İSG',
    path: '/api/tesis-yonetimi/maintenance-frequencies.json',
    description: 'Binalarda ve sitelerde can ve mal emniyeti açısından yasal olarak zorunlu periyodik teknik bakım ve muayene aralıkları (Asansör, Trafo, Jeneratör, Yangın, Hidrofor).',
    updateFrequency: 'Yıllık',
    icon: 'construction',
    sampleCurl: `curl -X GET "${BASE_URL}/api/tesis-yonetimi/maintenance-frequencies.json" -H "Accept: application/json"`,
    fields: [
      { name: 'equipment', type: 'string', desc: 'Ekipman veya teknik donanım türü' },
      { name: 'statutoryPeriod', type: 'string', desc: 'Mevzuata göre zorunlu kontrol periyodu' },
      { name: 'regulatoryAuthority', type: 'string', desc: 'Denetim dayanağı olan mevzuat/kurum' },
      { name: 'certificationType', type: 'string', desc: 'Verilen resmi rapor ve etiket türü' },
    ],
    sampleJson: JSON.stringify(
      {
        maintenanceCalendar: [
          {
            equipment: "İnsan & Yük Asansörleri",
            statutoryPeriod: "Ayda 1 Bakım / Yılda 1 A-Tipi Muayene",
            regulatoryAuthority: "Sanayi ve Teknoloji Bakanlığı Asansör Yönetmeliği",
            certificationType: "Yeşil Etiket Uygunluk Belgesi"
          },
          {
            equipment: "Orta Gerilim Trafoları & YG Tesisleri",
            statutoryPeriod: "Yılda 1 Kez Periyodik Test & Muayene",
            regulatoryAuthority: "Elektrik Kuvvetli Akım Tesisleri Yönetmeliği (EMO)",
            certificationType: "YG İşletme Sorumluluğu Raporu"
          },
          {
            equipment: "Otomatik Yangın Algılama & Sprinkler",
            statutoryPeriod: "3 Ayda 1 Fonksiyon Testi / Yılda 1 Genel Bakım",
            regulatoryAuthority: "Binaların Yangından Korunması Hakkında Yönetmelik",
            certificationType: "Yangın Sistemi Uygunluk Belgesi"
          }
        ]
      },
      null,
      2
    ),
  },
  {
    id: 'staff-ratios',
    name: 'Tesis Tipolojilerine Göre Personel Norm Kadro Oranları',
    category: 'İnsan Kaynakları',
    path: '/api/tesis-yonetimi/staff-ratios.json',
    description: 'Bağımsız bölüm sayısı, blok adedi, çevre güvenlik sınırı ve otopark kat adedine göre hesaplanan ideal 5188 özel güvenlik, temizlik ve teknik teknisyen norm kadro matrisi.',
    updateFrequency: 'Yıllık',
    icon: 'badge',
    sampleCurl: `curl -X GET "${BASE_URL}/api/tesis-yonetimi/staff-ratios.json" -H "Accept: application/json"`,
    fields: [
      { name: 'facilityScale', type: 'string', desc: 'Bağımsız bölüm ölçeği (Örn. 100-250 Daire)' },
      { name: 'securityStaffPerPost', type: 'string', desc: 'Nokta başına güvenlik kadro katsayısı' },
      { name: 'cleaningStaffRatio', type: 'string', desc: 'Bağımsız bölüm / temizlik personeli oranı' },
      { name: 'technicalStaffRatio', type: 'string', desc: 'Teknik şef / teknisyen dağılımı' },
    ],
    sampleJson: JSON.stringify(
      {
        staffingStandards: [
          {
            scale: "100 - 300 Bağımsız Bölüm",
            securityStaff: "1 Ana Nizamiye (7/24 4 Personel Vardiya)",
            cleaningStaff: "2 - 3 Kat & Ortak Alan Görevlisi",
            technicalStaff: "1 Mobil Gezici Tekniker (Yarı Zamanlı veya Nöbetçi)"
          },
          {
            scale: "500 - 1500 Bağımsız Bölüm (Toplu Yapı)",
            securityStaff: "2 Giriş Kapısı + 1 Gece Devriyesi (8 - 12 Personel)",
            cleaningStaff: "6 - 10 Personel + 1 Temizlik Süpervizörü",
            technicalStaff: "2 Tam Zamanlı Elektrik & Mekanik Teknisyeni"
          }
        ]
      },
      null,
      2
    ),
  },
  {
    id: 'openapi-spec',
    name: 'OpenAPI 3.1.0 Makine Taranabilir Spesifikasyonu',
    category: 'API & Standartlar',
    path: '/openapi.json',
    description: 'Tüm tesis yönetimi açık veri API uç noktalarını, parametre şemalarını ve veri modellerini uluslararası OpenAPI 3.1.0 standartlarında tanımlayan JSON şartname dosyası.',
    updateFrequency: 'Sürekli Güncel',
    icon: 'integration_instructions',
    sampleCurl: `curl -X GET "${BASE_URL}/openapi.json" -H "Accept: application/json"`,
    fields: [
      { name: 'openapi', type: 'string', desc: 'OpenAPI versiyonu (3.1.0)' },
      { name: 'info', type: 'object', desc: 'API künyesi, lisans ve iletişim verileri' },
      { name: 'paths', type: 'object', desc: 'Tanımlı tüm API rotaları ve metodları' },
      { name: 'components', type: 'object', desc: 'Yeniden kullanılabilir veri şemaları' },
    ],
    sampleJson: JSON.stringify(
      {
        openapi: "3.1.0",
        info: {
          title: "Alo Yönetim Tesis Yönetimi Açık Veri API Spesifikasyonu",
          version: "2026.1.0",
          license: { name: "Open Data Commons Attribution License (ODC-By 1.0)" }
        },
        servers: [{ url: BASE_URL, description: "Canlı Üretim Sunucusu" }]
      },
      null,
      2
    ),
  },
  {
    id: 'istanbul-districts-geojson',
    name: 'İstanbul 39 İlçe Tesis Yönetimi Saha Ağı (RFC 7946 GeoJSON)',
    category: 'Coğrafi Harita & Yerel Saha Ağı',
    path: '/api/tesis-yonetimi/istanbul-districts.geojson',
    description: 'İstanbul genelinde 39 ilçenin GPS merkez koordinatları, SLA acil müdahale süreleri (30-45 dk), aktif yönetilen proje sayıları ve doğrudan ilçe tesis yönetimi bağlantıları.',
    updateFrequency: 'Haftalık Güncellenir',
    icon: 'map',
    sampleCurl: `curl -X GET "${BASE_URL}/api/tesis-yonetimi/istanbul-districts.geojson" -H "Accept: application/geo+json"`,
    fields: [
      { name: 'type', type: 'string', desc: 'GeoJSON tipi (FeatureCollection)' },
      { name: 'features', type: 'array', desc: '39 ilçenin Point geometrileri ve operasyonel özellikleri' },
      { name: 'coordinates', type: '[lng, lat]', desc: 'RFC 7946 standardında GPS koordinatları' },
      { name: 'slaMinutes', type: 'number', desc: 'İlçeye özel ortalama SLA müdahale süresi (dakika)' },
    ],
    sampleJson: JSON.stringify(
      {
        type: "FeatureCollection",
        metadata: {
          title: "Alo Yönetim İstanbul 39 İlçe Tesis Yönetimi Saha Ağı",
          license: "https://opendatacommons.org/licenses/by/1-0/",
          totalFeatures: 39
        },
        features: [
          {
            type: "Feature",
            id: "kadikoy",
            geometry: { type: "Point", coordinates: [29.0333, 40.9833] },
            properties: {
              districtName: "Kadıköy",
              side: "Anadolu",
              managedProjects: 48,
              slaMinutes: 30,
              emergencyResponseTime: "30 Dakika",
              facilityManagementUrl: `${BASE_URL}/bolgeler/kadikoy/tesis-yonetimi`
            }
          },
          {
            type: "Feature",
            id: "besiktas",
            geometry: { type: "Point", coordinates: [29.0067, 41.0422] },
            properties: {
              districtName: "Beşiktaş",
              side: "Avrupa",
              managedProjects: 39,
              slaMinutes: 30,
              emergencyResponseTime: "30 Dakika",
              facilityManagementUrl: `${BASE_URL}/bolgeler/besiktas/tesis-yonetimi`
            }
          }
        ]
      },
      null,
      2
    ),
  },
];

export default function AcikVeriClient({ lang }: { lang: string }) {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [expandedJson, setExpandedJson] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => {
      setCopiedEndpoint(null);
    }, 2500);
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] relative z-10">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">api</span>
              OpenAPI 3.1.0 & GeoJSON
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              8 Açık Kamu API & Harita Servisi Canlı
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">lock_open</span>
              Sıfır Auth • Açık Lisans (ODC-BY)
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mb-6">
            Tesis Yönetimi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Açık Veri Portalı</span> & API Standartları
          </h1>

          <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mb-8">
            Türkiye entegre tesis yönetimi sektörünün ilk makine taranabilir kurumsal açık veri (Open Data) omurgası. 
            Site yönetim kurulları, ihale denetçileri, kat malikleri, araştırmacılar ve yapay zeka ajanları için doğrulanmış sektörel KPI kıyaslamaları, KMK Yargıtay emsalleri ve ISO 50001 enerji standartları.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-md group"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">code</span>
              <span>OpenAPI 3.1.0 Spesifikasyonunu Aç</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform" aria-hidden="true">open_in_new</span>
            </a>

            <Link
              href="/hizmetler/tesis-yonetimi/rehber"
              className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/15 transition-all border border-slate-200 dark:border-white/10"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">menu_book</span>
              <span>Tesis Yönetim Şirketi Seçim Rehberi</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Info & Value Proposition Grid */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">visibility</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Şeffaf Yönetim & KMK 41 Denetimi
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                Kat Mülkiyeti Kanunu m.41 uyarınca denetçiler ve kat malikleri, sitelerinin bütçe ve personel verilerini açık API standartlarımız ile objektif kıyaslayabilir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">smart_toy</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                Yapay Zeka (AI Agent) & LLM Uyumluluğu
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                Tüm verilerimiz OpenAPI 3.1.0 formatında yapılandırılmıştır. GPTBot, ClaudeBot, Gemini ve Perplexity gibi kurumsal RAG motorları verileri doğrudan tüketebilir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">verified_user</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                ISO 41001 & Açık Kamu Lisansı
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                Tesis yönetimi standartlarımız TÜRKAK akreditasyonlu ISO 41001 ve ISO 50001 normlarına dayanır. Open Data Commons Attribution (ODC-By 1.0) ile ücretsizdir.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Endpoints Section */}
      <section className="py-16">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                RESTful Veri Servisleri
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                8 Temel Tesis Yönetimi & Harita API Uç Noktası
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Content-Type: application/json; charset=utf-8
            </span>
          </div>

          <div className="space-y-6">
            {API_ENDPOINTS.map((endpoint) => {
              const isJsonExpanded = expandedJson === endpoint.id;
              const isCopied = copiedEndpoint === endpoint.id;

              return (
                <div
                  key={endpoint.id}
                  className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-amber-500/30"
                >
                  {/* Top Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 text-amber-500 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-2xl" aria-hidden="true">{endpoint.icon}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            GET
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {endpoint.category}
                          </span>
                          <span className="text-[11px] text-slate-400">• {endpoint.updateFrequency}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                          {endpoint.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleCopy(endpoint.sampleCurl, endpoint.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
                        title="cURL Komutunu Kopyala"
                      >
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">
                          {isCopied ? 'check' : 'content_copy'}
                        </span>
                        <span>{isCopied ? 'Kopyalandı!' : 'cURL Kopyala'}</span>
                      </button>

                      <a
                        href={endpoint.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/20 transition-colors"
                      >
                        <span>JSON Aç</span>
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 my-5 font-light leading-relaxed">
                    {endpoint.description}
                  </p>

                  {/* cURL Snippet Box */}
                  <div className="mb-5 p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto flex items-center justify-between gap-4">
                    <span className="text-emerald-400">$</span>
                    <span className="truncate flex-1">{endpoint.sampleCurl}</span>
                    <button
                      onClick={() => handleCopy(endpoint.sampleCurl, endpoint.id)}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Kopyala"
                    >
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">content_copy</span>
                    </button>
                  </div>

                  {/* Schema Fields & Toggle Preview */}
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Anahtar Parametreler:</span>
                      {endpoint.fields.map((f) => (
                        <span key={f.name} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 font-mono text-[11px]">
                          {f.name} ({f.type})
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpandedJson(isJsonExpanded ? null : endpoint.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors shrink-0"
                    >
                      <span>{isJsonExpanded ? 'Örneği Gizle' : 'Örnek JSON Göster'}</span>
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">
                        {isJsonExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>

                  {/* Expanded JSON Box */}
                  {isJsonExpanded && (
                    <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                        <span>Response Preview (HTTP 200 OK)</span>
                        <button
                          onClick={() => handleCopy(endpoint.sampleJson, `json-${endpoint.id}`)}
                          className="hover:text-white transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs" aria-hidden="true">content_copy</span>
                          <span>{copiedEndpoint === `json-${endpoint.id}` ? 'Kopyalandı' : 'JSON Kopyala'}</span>
                        </button>
                      </div>
                      <pre className="text-emerald-400 whitespace-pre-wrap">{endpoint.sampleJson}</pre>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Sub-Sector Cross Navigation */}
      <section className="py-8">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)]">
          <FacilitySubSectorCrossNav currentSlug="acik-veri" />
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-[var(--spacing-gutter)] text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">shield</span>
            5188 Lisanslı & ISO 41001 Belgeli Yönetim
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Siteniz veya Tesisiniz İçin Profesyonel Yönetim Teklifi Alın
          </h2>
          <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Açık veri standartlarımız ve şeffaf işletme projemizle bütçenizi denetim altına alın. 
            48 saat içinde tesisinize özel teknik keşif ve tasarruf raporu hazırlıyoruz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/teklif-al"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-4 rounded-xl font-extrabold text-sm transition-all shadow-lg"
            >
              Ücretsiz Keşif & Teklif İste
            </Link>
            <Link
              href="/hizmetler/tesis-yonetimi/rehber"
              className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-sm transition-all"
            >
              Şartname Rehberini İncele
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
