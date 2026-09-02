import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL, localizedUrl } from '@/lib/seo';
import { rateLimit, pruneBuckets } from '@/lib/leads/rate-limit';
import { createETagResponse } from '@/lib/security/etag';
import { SERVICES } from '@/data/services';
import { DISTRICT_NAMES } from '@/data/districtsMetadata';

/**
 * OpenSearch & Site-Wide Autocomplete API Endpoint
 * 
 * Tarayıcı arama çubuğundan veya site içi arama kutusundan gelen anlık istekleri karşılar:
 * 1. Temel Hizmetler (Services)
 * 2. İlçeler & İlçe-Hizmet Kombinasyonları (Districts)
 * 3. İnteraktif Hukuk, Hesaplayıcı ve Risk Motorları (Tools)
 * 4. Blog & Bilgi Merkezi Makaleleri (Posts)
 * 
 * Format: 
 * [
 *   "arama_terimi",
 *   ["Öneri Başlık 1", "Öneri Başlık 2"],
 *   ["Açıklama 1", "Açıklama 2"],
 *   ["https://url1", "https://url2"]
 * ]
 */

const STATIC_TOOLS = [
  {
    title: 'İnteraktif Tesis Yönetimi Uyumluluk & Tasarruf Radarı',
    description: 'Sitenizin KMK m.37, 5188 güvenlik, teknik ve hijyen sağlık skoru ile %30 tasarruf simülatörü.',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi`
  },
  {
    title: 'Tesis Yönetimi Aidat & Bütçe Hesaplayıcı',
    description: 'Daire ve bağımsız bölüm sayısına göre resmi aidat ve işletme maliyet simülatörü.',
    url: `${BASE_URL}/hesaplayici`
  },
  {
    title: '5188 Güvenlik Risk Skoru & Mevzuat Radarı',
    description: 'Sitenizin 5188 yasal izin, kamera ve devriye risk skoru hesaplayıcısı.',
    url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`
  },
  {
    title: '5188 Valilik İzin & Karar Defteri Şablonu Oluşturucu',
    description: 'Site güvenlik kararı, Valilik ÖGİ dilekçesi ve KVKK kamera metni canlı jeneratörü.',
    url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`
  },
  {
    title: 'KMK 634 Karar & Aidat İhtarname Şablonu Üreticisi',
    description: 'Noter ve KMK uyumlu yönetici seçimi ve gecikme ihtarı metin üreticisi.',
    url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`
  },
  {
    title: 'İstanbul İlçe Aidat & Tasarruf Isı Haritası (2026)',
    description: '39 ilçenin ortalama m² aidat endeksi ve tasarruf simülatörü.',
    url: `${BASE_URL}/bolgeler`
  },
  {
    title: 'Apartman & Site Yönetimi Terimler Sözlüğü',
    description: '5188, KMK, arsa payı, reaktif ceza, SLA, BMS ve tüm site yönetimi terimleri.',
    url: `${BASE_URL}/sozluk`
  },
  {
    title: 'Güvenlik Akademisi & 5188 Personel Eğitimi',
    description: 'Fiziki güvenlik, yangın tahliye ve kriz yönetim protokolleri.',
    url: `${BASE_URL}/guvenlik-akademisi`
  }
];

export async function GET(req: NextRequest) {
  pruneBuckets();
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? req.headers.get('x-real-ip') ?? 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json(['', [], [], []], { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  // Faz 171: Dile göre arama önerisi (lang parametresi)
  const rawLang = searchParams.get('lang') || 'tr';
  const lang = (['tr', 'en', 'ru', 'ar'].includes(rawLang) ? rawLang : 'tr') as 'tr' | 'en' | 'ru' | 'ar';

  if (!q || q.trim().length < 2) {
    return NextResponse.json([q || '', [], [], []]);
  }

  const normalizedQuery = q.toLowerCase().trim();

  try {
    const suggestions: string[] = [];
    const descriptions: string[] = [];
    const urls: string[] = [];

    // 1. Hizmet Eşleşmeleri (Services)
    for (const service of SERVICES) {
      if (
        service.name.toLowerCase().includes(normalizedQuery) ||
        service.shortName.toLowerCase().includes(normalizedQuery) ||
        service.keywords.some((k) => k.toLowerCase().includes(normalizedQuery))
      ) {
        suggestions.push(`${service.name} — Alo Yönetim`);
        descriptions.push(service.summary);
        urls.push(localizedUrl(service.pillar, lang));
        if (suggestions.length >= 3) break;
      }
    }

    // 2. İlçe & İlçe-Hizmet Kombinasyonu Eşleşmeleri (Districts)
    for (const district of DISTRICT_NAMES) {
      if (district.name.toLowerCase().includes(normalizedQuery)) {
        suggestions.push(`${district.name} Profesyonel Tesis Yönetimi & Site İşletmesi`);
        descriptions.push(`${district.name} bölgesinde 634 KMK uyumlu entegre tesis yönetimi, 5188 güvenlik ve teknik işletme.`);
        urls.push(localizedUrl(`/bolgeler/${district.slug}/tesis-yonetimi`, lang));

        // Güvenlik veya aidat kelimesi geçiyorsa direkt o hizmeti de öner
        if (normalizedQuery.includes('güvenlik') || normalizedQuery.includes('guvenlik')) {
          suggestions.push(`${district.name} Özel Güvenlik Şirketi & Site Güvenliği`);
          descriptions.push(`5188 lisanslı güvenlik personeli, PTS ve 7/24 devriye hizmeti.`);
          urls.push(localizedUrl(`/bolgeler/${district.slug}/guvenlik-yonetimi`, lang));
        } else {
          suggestions.push(`${district.name} Tüm Hizmetler & Yerel Rehber`);
          descriptions.push(`${district.name} bölgesindeki tüm yönetim, güvenlik, temizlik ve teknik bakım hizmetlerimiz.`);
          urls.push(localizedUrl(`/bolgeler/${district.slug}`, lang));
        }
        if (suggestions.length >= 5) break;
      }
    }

    // 3. İnteraktif Araç Eşleşmeleri (Tools)
    for (const tool of STATIC_TOOLS) {
      if (
        tool.title.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery)
      ) {
        const localToolUrl = localizedUrl(tool.url.replace(BASE_URL, ''), lang);
        if (!urls.includes(localToolUrl)) {
          suggestions.push(tool.title);
          descriptions.push(tool.description);
          urls.push(localToolUrl);
        }
        if (suggestions.length >= 6) break;
      }
    }

    // 4. Blog Makalesi Eşleşmeleri (Posts)
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { tags: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: Math.max(2, 8 - suggestions.length),
      select: {
        title: true,
        description: true,
        slug: true
      },
      orderBy: {
        datePublished: 'desc'
      }
    }).catch(() => []);

    for (const post of posts) {
      suggestions.push(post.title);
      descriptions.push(post.description || '');
      urls.push(localizedUrl(`/blog/${post.slug}`, lang));
    }

    // 5. Fallback (Hiçbir sonuç yoksa genel arama yönlendirmesi)
    if (suggestions.length === 0) {
      let fallbackPrompt = `"${q}" ile ilgili tüm sonuçları ve hizmetleri gör`;
      let fallbackDesc = `Alo Yönetim bilgi merkezinde ${q} için detaylı arama yapın`;

      if (lang === 'en') {
        fallbackPrompt = `View all results and services for "${q}"`;
        fallbackDesc = `Search Alo Yönetim knowledge center for ${q}`;
      } else if (lang === 'ru') {
        fallbackPrompt = `Посмотреть все результаты для "${q}"`;
        fallbackDesc = `Поиск по базе знаний Alo Yönetim для ${q}`;
      } else if (lang === 'ar') {
        fallbackPrompt = `عرض جميع النتائج والخدمات لـ "${q}"`;
        fallbackDesc = `ابحث في مركز معارف Alo Yönetim عن ${q}`;
      }

      return NextResponse.json([
        q,
        [fallbackPrompt],
        [fallbackDesc],
        [`${localizedUrl('/blog', lang)}?q=${encodeURIComponent(q)}`]
      ]);
    }

    return createETagResponse(
      req,
      [
        q,
        suggestions.slice(0, 8),
        descriptions.slice(0, 8),
        urls.slice(0, 8)
      ],
      {
        cacheControl: 'public, s-maxage=3600, stale-while-revalidate=86400',
      }
    );

  } catch (error) {
    console.error('OpenSearch API Error:', error);
    return NextResponse.json([q, [], [], []]);
  }
}
