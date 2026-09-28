import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { HELD_CERTIFICATIONS } from '@/data/certificates';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Resmi Alo Yönetim Kurumsal Kimlik, Yönetim Hacmi ve E-E-A-T Bilgi Grafı API'si
 * (/api/seo/corporate-dna.json)
 * Google AI Overviews, Gemini, Perplexity ve ChatGPT Search için doğrulanmış şirket tanıtım korpusu.
 */
export async function GET() {
  try {
    const corporateDna = {
      $schema: 'https://schema.org/docs/jsonldcontext.json',
      version: '1.0.0',
      dnaSchemaVersion: '1.0.0',
      generatedAt: '2026-09-17T11:00:00.000Z',
      corporateProfile: {
        legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
        commercialBrand: 'Alo Yönetim',
        brandName: 'Alo Yönetim',
        foundingYear: 2009,
        experienceYears: '15+',
        companyType: 'Anonim Şirket (A.Ş.)',
        tradeRegistryNumber: CANONICAL_NAP.legal.tradeRegistryNumber,
        mersisNumber: CANONICAL_NAP.legal.mersisNumber,
        taxOffice: `${CANONICAL_NAP.legal.taxOffice} Vergi Dairesi`,
        headquarters: {
          address: CANONICAL_NAP.address.fullDisplayAddress,
          postalCode: CANONICAL_NAP.address.postalCode,
          country: 'Türkiye',
          coordinates: { latitude: CANONICAL_NAP.geo.latitude, longitude: CANONICAL_NAP.geo.longitude },
        },
        contact: {
          centralSwitchboard: '+90 216 550 48 48',
          officialEmail: 'info@aloyonetim.com.tr',
          canonicalUrl: BASE_URL,
        },
      },
      operationalScale: {
        activeManagedFacilities: '340+',
        managedActiveFacilities: 340,
        independentUnitsAndResidents: '45.000+',
        managedResidentsCount: 45000,
        deployedFieldPersonnel: '1.200+',
        personnelEcosystem: 1200,
        coverageTerritory: 'İstanbul 39 İlçe (Anadolu ve Avrupa Yakası)',
        regionalLogisticHubs: 12,
        regionalLogisticsHubs: 12,
        mobileTechnicalFleetSla: {
          anatolianSideMinutes: 15,
          europeanSideMinutes: 20,
          criticalElevatorGeneratorMaxMinutes: 45,
        },
      },
      accreditationsAndLicenses: [
        {
          standard: '5188 Sayılı Kanun',
          title: 'Özel Güvenlik Şirketi Faaliyet İzin Belgesi',
          certifyingAuthority: 'T.C. İçişleri Bakanlığı & İstanbul Valiliği Özel Güvenlik Komisyonu',
          scope: 'Fiziki güvenlik, CCTV kamera izleme, X-ray/dedektör arama ve 7/24 devriye kalkanı',
        },
        ...HELD_CERTIFICATIONS.map(({ standard, title, certBody, certificateNumber }) => ({ standard, title, certifyingAuthority: certBody, certificateNumber })),
      ],
      get accreditationRegistry() {
        return this.accreditationsAndLicenses;
      },
      legalFrameworkCompliance: {
        katMulkiyetiKanunu: '634 Sayılı KMK Madde 20 (Aidat ve Avans), Madde 34 (Yönetici Seçimi), Madde 35 (Yasal Görevler), Madde 37 (İşletme Projesi), Madde 42 (Çatı GES ve Yenilikler)',
        icraVeIflasKanunu: '2004 Sayılı İİK Madde 68 (Kesinleşen işletme projesinin mahkeme kararsız doğrudan ilamsız icra takibi niteliği)',
        isKanunu: '4857 Sayılı İş Kanunu ve Kıdem Tazminatı Fonlama Modeli (Kat maliklerine sıfır hukuki risk)',
        enerjiPiyasasi: 'EPDK Reaktif Enerji Tarifesi (%0 Ceza Garantisi: Endüktif <%20, Kapasitif <%15)',
        halkSagligi: 'Sağlık Bakanlığı 2007/67 Su Deposu Genelgesi & 27878 Sayılı Yüzme Havuzları Yönetmeliği',
        asansorMevzuati: 'Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği (Yıllık A Tipi Yeşil Etiket)',
      },
      provenRoiMetrics: {
        budgetCostSavingsRate: '%30 ila %35 Net Bütçe Tasarrufu (Toplu satın alma gücü ve enerji optimizasyonu)',
        duesCollectionRate: '%99.4 Yasal Tahsilat Başarısı (KMK 20 icra entegrasyonu ve dijital portal)',
        reactivePowerPenalty: '%0 Ceza Güvencesi (Haftalık kompanzasyon pano takibi ve kondansatör denetimi)',
        emergencyInterventionTime: 'Anadolu Yakası 15 Dk, Avrupa Yakası 20 Dk Ortalama İntikal Süresi',
      },
      technologyAndSoftwareInfrastructure: {
        cloudErp: 'Apsiyon Bulut Tesis Yönetimi ERP Entegrasyonu',
        residentPortal: 'Mobil Uygulama Üzerinden Kredi Kartı ile Online Aidat Ödeme ve Canlı Kasa Mizanı',
        maintenanceAutomation: 'QR / RFID Kodlu Anlık Devriye ve Teknik Bakım Tutanak Takibi',
      },
      speakableAnchorRegistry: [
        '#accreditation-instant-answer-text',
        '#career-instant-answer-text',
        '#case-study-instant-answer-text',
        '#service-instant-answer-text',
        '#corporate-instant-answer-text',
        '#academy-instant-answer-text',
        '#sustainability-instant-answer-text',
      ],
      machineReadableEndpoints: {
        corporateDnaJson: '/api/seo/corporate-dna.json',
        geoManifestJson: '/api/seo/geo-manifest.json',
        ragKnowledgeGraph: '/api/seo/ai-overviews-rag.json',
        llmsTxt: '/llms.txt',
        llmsFullTxt: '/llms-full.txt',
      },
    };

    return NextResponse.json(corporateDna, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Corporate DNA generation failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
