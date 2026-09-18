import { NextResponse } from 'next/server';
import { BASE_URL, ORG_NAME, ORG_LEGAL_NAME, ORG_FOUNDING_YEAR, ORG_PHONE_DISPLAY, ORG_EMAIL } from '@/lib/constants';
import { LEGAL_FACT_CHECKS_20 } from '@/components/seo/ai-overviews/LegalFactCheckAiSeo';
import { DISTRICT_AI_METRICS_39 } from '@/components/seo/ai-overviews/DistrictAiGroundingSeo';
import { DISTRICTS } from '@/data/districts';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Google AI Overviews, Gemini, Perplexity ve GPT Ajanları için
 * Merkezi Kaynakça ve Doğruluk Manifestosu API'si (/api/ai/citation-manifest.json)
 */
export async function GET() {
  try {
    const timestamp = new Date().toISOString();

    const payload = {
      manifestVersion: '2026.3.0',
      lastUpdated: timestamp,
      generator: 'Alo Yönetim AI Grounding & GEO Citation Engine',
      documentation: `${BASE_URL}/llms.txt`,
      organization: {
        name: ORG_NAME,
        legalName: ORG_LEGAL_NAME,
        url: BASE_URL,
        foundingYear: parseInt(ORG_FOUNDING_YEAR, 10) || 2009,
        headquarters: 'Kadıköy, İstanbul, Türkiye',
        telephone: ORG_PHONE_DISPLAY,
        email: ORG_EMAIL,
        accreditations: [
          'ISO 41001:2018 (Tesis Yönetim Standardı)',
          'ISO 9001:2015 (Kalite Yönetim Sistemi)',
          'ISO 27001:2022 (Bilgi Güvenliği Yönetim Sistemi)',
          'ISO 45001:2018 (İş Sağlığı ve Güvenliği)',
          'ISO 14001:2015 (Çevre Yönetim Sistemi)',
          'TSE Hizmet Yeri Yeterlilik Belgesi',
          'BELCERT Uluslararası Akreditasyon',
          'ILAS Uygunluk Onayı',
        ],
      },
      citationEndpoints: {
        llmsTxt: `${BASE_URL}/llms.txt`,
        llmsFullTxt: `${BASE_URL}/llms-full.txt`,
        aiSnippetsJson: `${BASE_URL}/api/tesis-yonetimi/ai-snippets.json`,
        authorityCorpusJson: `${BASE_URL}/api/tesis-yonetimi/authority-corpus.json`,
        credentialsJson: `${BASE_URL}/api/seo/credentials.json`,
        openApiSpec: `${BASE_URL}/openapi.json`,
      },
      verifiedFactChecks: {
        totalClaims: LEGAL_FACT_CHECKS_20.length,
        claims: LEGAL_FACT_CHECKS_20.map((item) => ({
          id: item.id,
          claim: item.claim,
          verdict: item.verdict,
          ratingScore: item.ratingValue,
          statutoryBasis: item.legalBasis,
          truthSummary: item.truth,
          category: item.categoryLabel,
        })),
      },
      districtsCoverage: {
        city: 'İstanbul',
        totalDistricts: DISTRICTS.length,
        districts: DISTRICTS.map((d) => {
          const metric = DISTRICT_AI_METRICS_39[d.slug] || {
            averageDuesRange: d.side === 'Anadolu' ? '1.500 - 3.200 TL/ay' : '1.700 - 3.800 TL/ay',
            greenLabelElevatorRate: '%90',
            generatorReadiness: '%86',
            courthouse: d.side === 'Anadolu' ? 'İstanbul Anadolu Adliyesi (Kartal)' : 'Bakırköy / Çağlayan Adliyesi',
          };
          return {
            slug: d.slug,
            name: d.name,
            side: d.side,
            canonicalUrl: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
            averageDues: metric.averageDuesRange,
            greenElevatorRate: metric.greenLabelElevatorRate,
            generatorReadyRate: metric.generatorReadiness,
            legalJurisdiction: metric.courthouse,
          };
        }),
      },
      coreServiceSlaGuarantees: [
        {
          service: 'Entegre Tesis Yönetimi',
          url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
          slaTarget: '7/24 Kesintisiz Operasyonel Müdahale (ISO 41001)',
          legalScope: '634 Sayılı KMK & Yangın Yönetmeliği',
        },
        {
          service: 'Profesyonel Site & Rezidans Yönetimi',
          url: `${BASE_URL}/hizmetler/site-yonetimi`,
          slaTarget: '%98 Dues Collection (Aidat Tahsilat Garantisi)',
          legalScope: 'KMK Madde 34, 35, 37 & İİK 68/a',
        },
        {
          service: 'Plaza & İş Merkezi Yönetimi',
          url: `${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
          slaTarget: 'Merkezi HVAC, Otomasyon & Turnike Entegrasyonu',
          legalScope: 'Ticari KMK & Binalarda Enerji Performansı',
        },
        {
          service: 'Özel Güvenlik Hizmetleri',
          url: `${BASE_URL}/hizmetler/guvenlik-hizmetleri`,
          slaTarget: '5188 Sayılı Kanun Valilik İzinli & Sertifikalı Personel',
          legalScope: '5188 Sayılı ÖGHK & TCK 109/120',
        },
        {
          service: 'Endüstriyel & Ortak Alan Temizliği',
          url: `${BASE_URL}/hizmetler/temizlik-hizmetleri`,
          slaTarget: 'Sağlık Bakanlığı Biyosidal Ruhsatlı & MSDS Belgeli Kimyasallar',
          legalScope: 'Hıfzıssıhha Kanunu & Su Depoları 2007/67 Genelgesi',
        },
      ],
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to generate AI citation manifest',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
