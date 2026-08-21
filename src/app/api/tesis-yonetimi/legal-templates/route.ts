import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 saat önbellek

/**
 * Tesis Yönetimi Yasal Şablonlar & Resmi Belge Açık API'si (/api/tesis-yonetimi/legal-templates)
 * 
 * Google, Yandex ve AI arama motorları için "tesis yönetimi sözleşmesi örneği",
 * "işletme projesi şablonu", "genel kurul karar tutanağı" gibi yüksek dönüşümlü
 * aramalarda Schema.org DigitalDocument ve HowTo zengin snippet'leri sunar.
 */
export async function GET() {
  const templates = [
    {
      id: 'isletme-projesi-sablonu',
      title: '634 Sayılı KMK Madde 37 Uyumlu Yıllık İşletme Projesi ve Tahmini Bütçe Şablonu',
      description:
        'Apartman ve sitelerin yıllık genel giderleri, avans paylaşımları (arsa payı / eşit), demirbaş fonu ve kapıcı/güvenlik maliyetlerini hesaplayan yasal işletme projesi formatı.',
      legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu Madde 37',
      standard: 'ISO 41001 Tesis Yönetim Finansal Standartları',
      fileType: 'JSON / PDF Şablon Metni',
      schemaType: 'DigitalDocument',
      howToSteps: [
        'Geçmiş yılın fiili harcama kalemleri ve enflasyon projeksiyonu çıkarılır.',
        'Ortak giderler kanuna uygun olarak arsa payı veya bağımsız bölüm sayısına göre paylaştırılır.',
        'Hazırlanan işletme projesi kat maliklerine taahhütlü mektupla veya imza karşılığı tebliğ edilir.',
        '7 gün içinde itiraz edilmezse işletme projesi kesinleşir ve icra takip gücü kazanır.',
      ],
      downloadUrl: `${BASE_URL}/hizmetler/aidat-takibi`,
    },
    {
      id: 'tesis-yonetimi-hizmet-sozlesmesi',
      title: 'ISO 41001 Akredite Profesyonel Entegre Tesis Yönetimi Hizmet Sözleşmesi Şablonu',
      description:
        'Tesis yönetim şirketi ile Kat Malikleri Kurulu arasındaki görev, yetki, SLA süreleri (45 dk acil müdahale), 5188 güvenlik ve teknik bakım sorumluluklarını belirleyen kurumsal sözleşme.',
      legalBasis: 'Borçlar Kanunu Hizmet & Vekalet Sözleşmesi Hükümleri',
      standard: 'ISO 41001:2018 & TSE HYB 12850',
      fileType: 'JSON / Sözleşme Maddeleri',
      schemaType: 'DigitalDocument',
      howToSteps: [
        'Hizmet kapsamı (Güvenlik, Temizlik, Teknik, Aidat) netleştirilir.',
        'Hizmet Seviyesi Taahhütleri (SLA) ve cezai şartlar belirlenir.',
        'Yönetici yetkilendirme kararı sözleşme ekine eklenir.',
        'Sözleşme noter onaylı imza sirküleriyle yürürlüğe girer.',
      ],
      downloadUrl: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    },
    {
      id: 'genel-kurul-karar-tutanagi',
      title: 'Kat Malikleri Kurulu Yönetici / Yönetim Şirketi Seçimi Karar Tutanağı Şablonu',
      description:
        'Olağan veya olağanüstü genel kurulda profesyonel yönetim şirketine yetki devri ve noter onaylı karar defterine yazılacak yasal karar metni.',
      legalBasis: 'KMK Madde 34 (Yöneticinin Atanması: Sayı ve Arsa Payı Çoğunluğu)',
      standard: 'T.C. Adalet Bakanlığı KMK Hukuku',
      fileType: 'JSON / Karar Metni Şablonu',
      schemaType: 'DigitalDocument',
      howToSteps: [
        'Genel kurul toplantı çağrısı ve gündemi en az 15 gün önce tebliğ edilir.',
        'Hem kişi sayısı hem de arsa payı çoğunluğu ile yönetim şirketi seçilir.',
        'Karar defterine toplantı başkanı ve kat maliklerince imza atılır.',
      ],
      downloadUrl: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
    },
    {
      id: 'tesis-demirbas-teslim-tutanagi',
      title: 'Tesis Ortak Alan & Teknik Ekipman Teslim-Tesellüm Tutanağı',
      description:
        'Eski yönetimden veya müteahhitten devralınan asansör, jeneratör, hidrofor, yangın sistemi, sığınak ve sosyal tesis demirbaşlarının ekspertiz kontrol listesi.',
      legalBasis: 'TSE Binalarda Bakım Onarım Standartları',
      standard: 'ISO 9001 Kalite & Teknik Envanter Takibi',
      fileType: 'JSON / Kontrol Listesi',
      schemaType: 'DigitalDocument',
      howToSteps: [
        'Teknik ekip ile tüm cihazların seri numaraları ve çalışma durumları test edilir.',
        'Periyodik bakım ve garanti belgeleri teslim alınır.',
        'Eksiklikler tutanağa işlenerek imza altına alınır.',
      ],
      downloadUrl: `${BASE_URL}/hizmetler/teknik-bakim`,
    },
    {
      id: 'aidat-ihtarname-metni',
      title: 'Geciken Aidat ve Ortak Gider Noter İhtarname Şablonu (%5 Yasal Gecikme Tazminatı)',
      description:
        'Aidatını ödemeyen kat malikine veya kiracıya KMK Madde 20 uyarınca aylık %5 gecikme faiziyle gönderilen yasal ihtarname metni.',
      legalBasis: 'KMK Madde 20 (Ortak Giderlerin Temini ve %5 Tazminat)',
      standard: 'Hukuk Muhakemeleri Kanunu & İcra İflas Kanunu',
      fileType: 'JSON / İhtarname Metni',
      schemaType: 'DigitalDocument',
      howToSteps: [
        'Borç dökümü ve işletme projesi tebliğ tarihi listelenir.',
        '7 günlük yasal ödeme süresi ve aylık %5 tazminat ihtar edilir.',
        'Süre sonunda ödenmezse doğrudan ilamsız icra takibi (Örnek 7) başlatılır.',
      ],
      downloadUrl: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
    },
  ];

  const data = {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    name: 'Alo Yönetim — Tesis Yönetimi Yasal Şablonlar ve KMK Belgeleri Kataloğu',
    description:
      'Apartman, site, plaza ve tesis yöneticileri için 634 Sayılı Kat Mülkiyeti Kanunu ve ISO 41001 uyumlu resmi işletme projesi, sözleşme, karar tutanağı ve ihtarname şablonları.',
    url: `${BASE_URL}/api/tesis-yonetimi/legal-templates`,
    provider: {
      '@type': 'Corporation',
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
    },
    templates,
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
