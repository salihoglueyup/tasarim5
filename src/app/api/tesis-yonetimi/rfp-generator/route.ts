import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { getDistrict } from '@/data/districts';

export const dynamic = 'force-dynamic';

export interface RfpConfig {
  facilityName: string;
  units: number;
  blocks: number;
  districtSlug: string;
  servicesNeeded: string[];
}

export function generateFacilityRfpDocument(config: RfpConfig) {
  const district = getDistrict(config.districtSlug) || { name: 'Kadıköy', slug: 'kadikoy' };
  const facilityName = config.facilityName || `${district.name} Prestij Sitesi`;
  const units = Math.max(1, config.units || 60);
  const blocks = Math.max(1, config.blocks || 2);
  const services = config.servicesNeeded && config.servicesNeeded.length > 0
    ? config.servicesNeeded
    : ['guvenlik', 'temizlik', 'teknik', 'muhasebe'];

  const sections = [
    {
      heading: '1. İŞİN KONUSU VE KAPSAMI',
      content: `İstanbul ili ${district.name} ilçesinde yer alan, ${blocks} blok ve ${units} bağımsız bölümden oluşan ${facilityName} tesisinin; 634 Sayılı Kat Mülkiyeti Kanunu ve ISO 41001:2018 standartlarına uygun olarak profesyonel entegre tesis yönetimi hizmetlerinin yürütülmesidir.`,
    },
    {
      heading: '2. YÜKLENİCİ FİRMADA ARANAN ASGARİ NİTELİKLER (E-E-A-T ŞARTLARI)',
      content: `• ISO 41001:2018 Uluslararası Entegre Tesis Yönetim Sistemi Sertifikası\n• T.C. İçişleri Bakanlığı / Valilik onaylı 5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi\n• TSE HYB 12850 Tesis Hizmet Yeri Yeterlilik Belgesi\n• En az 10 yıl sektörel deneyim ve aktif yönetilen 200+ bağımsız bölüm referansı\n• Mesleki Sorumluluk ve 3. Şahıs Mali Mesuliyet Sigorta Poliçesi (En az 10.000.000 TL teminatlı).`,
    },
    {
      heading: '3. HİZMET STANDARTLARI VE SLA (HİZMET SEVİYESİ) TAAHHÜTLERİ',
      content: `• Acil Arıza Müdahale Süresi: ${district.name} bölgesi için en fazla 45 dakika\n• 7/24 Kesintisiz Güvenlik ve CCTV Kayıt Kontrolü (5188 Sayılı Kanun Uyumlu)\n• TSE Onaylı Kimyasallarla Günlük Kat ve Ortak Alan Hijyen Takvimi\n• Asansör, Jeneratör, Kompanzasyon Panosu ve Yangın Tesisatı Aylık Periyodik Bakımı\n• Kat Maliklerine Özel 7/24 Mobil Aidat, Borç ve Arıza Takip Platformu Erişimi.`,
    },
    {
      heading: '4. YASAL VE MALİ ŞARTLAR (KMK 634 UYUMU)',
      content: `• Yüklenici, her yıl Ocak ayında KMK Madde 37 uyarınca yıllık Tahmini İşletme Projesini hazırlamakla yükümlüdür.\n• Aylık gelir-gider tabloları, banka ekstreleri ve fatura dökümleri şeffaf portal üzerinden kat maliklerinin ve denetçinin incelemesine açık tutulacaktır.\n• Geciken aidatlara KMK Madde 20/2 gereğince yasal %5 gecikme tazminatı işletilecektir.`,
    },
    {
      heading: '5. TEKLİF VERME VE SÖZLEŞME SÜRECİ',
      content: `Teklifler, yukarıdaki şartname maddelerini eksiksiz karşılayacak şekilde kalem kalem (Güvenlik, Temizlik, Teknik, Yönetim Payı) hazırlanarak kapalı zarf veya dijital onaylı olarak Yönetim Kuruluna sunulacaktır.`,
    },
  ];

  const fullText = sections.map((s) => `${s.heading}\n${s.content}`).join('\n\n');

  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: `${facilityName} — Profesyonel Tesis Yönetimi Teknik İhale Şartnamesi (RFP)`,
    description: `${district.name} ${units} bağımsız bölümlü tesis için ISO 41001 ve KMK 634 standartlarında hazırlanmış resmi ihale ve yönetim şartnamesi.`,
    url: `${BASE_URL}/api/tesis-yonetimi/rfp-generator`,
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
    },
    about: [
      { '@type': 'Thing', name: 'Tesis Yönetimi Şartnamesi' },
      { '@type': 'Thing', name: 'ISO 41001:2018' },
      { '@type': 'Thing', name: '634 Sayılı Kat Mülkiyeti Kanunu' },
    ],
  };

  return {
    facilityName,
    districtName: district.name,
    units,
    blocks,
    services,
    sections,
    fullText,
    schema: schemaLd,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const facilityName = searchParams.get('facilityName') || 'Örnek Site';
  const units = parseInt(searchParams.get('units') || '60', 10);
  const blocks = parseInt(searchParams.get('blocks') || '2', 10);
  const districtSlug = searchParams.get('district') || 'kadikoy';
  const servicesNeeded = searchParams.get('services')?.split(',') || ['guvenlik', 'temizlik', 'teknik', 'muhasebe'];

  const rfp = generateFacilityRfpDocument({
    facilityName,
    units,
    blocks,
    districtSlug,
    servicesNeeded,
  });

  return NextResponse.json(rfp, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-RFP-Generator': 'Alo-Yonetim-Facility-RFP-Engine-v1',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rfp = generateFacilityRfpDocument({
      facilityName: body.facilityName || 'Örnek Site',
      units: typeof body.units === 'number' ? body.units : parseInt(body.units || '60', 10),
      blocks: typeof body.blocks === 'number' ? body.blocks : parseInt(body.blocks || '2', 10),
      districtSlug: body.district || 'kadikoy',
      servicesNeeded: body.services || ['guvenlik', 'temizlik', 'teknik', 'muhasebe'],
    });

    return NextResponse.json(rfp, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    const defaultRfp = generateFacilityRfpDocument({
      facilityName: 'Örnek Site',
      units: 60,
      blocks: 2,
      districtSlug: 'kadikoy',
      servicesNeeded: ['guvenlik', 'temizlik', 'teknik', 'muhasebe'],
    });
    return NextResponse.json(defaultRfp, { status: 200 });
  }
}
