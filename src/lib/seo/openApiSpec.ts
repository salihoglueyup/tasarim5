import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/napGuardEngine';

/**
 * Alo Yönetim Entegre Tesis Yönetimi & KMK Hukuku Açık Veri OpenAPI 3.1.0 Spesifikasyonu
 * Standart: OpenAPI Specification 3.1.0 (https://spec.openapis.org/oas/v3.1.0)
 * Hedef: AI Arama Motorları (Perplexity, ChatGPT, Claude), B2B Entegratörler ve Geliştiriciler.
 */
export function generateOpenApiSpec() {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Alo Yönetim Tesis Yönetimi & KMK Hukuku Açık Veri API\'si',
      version: '1.0.0',
      description:
        'İstanbul genelinde 39 ilçede ISO 41001:2018 standartlarında entegre tesis yönetimi, 634 Sayılı Kat Mülkiyeti Kanunu (KMK) içtihatları, Yargıtay emsal kararları, B2B teknik şartname (RFP) üreticisi, ilçe bazlı aidat endeksi ve akredite otorite korpusu açık veri servisleri.',
      termsOfService: `${BASE_URL}/kullanim-kosullari`,
      contact: {
        name: CANONICAL_NAP.legal.legalName,
        url: BASE_URL,
        email: CANONICAL_NAP.contact.email,
        telephone: CANONICAL_NAP.contact.phoneDisplay,
      },
      license: {
        name: 'Creative Commons Attribution 4.0 International (CC BY 4.0) & Açık Veri Lisansı',
        url: 'https://creativecommons.org/licenses/by/4.0/',
      },
    },
    servers: [
      {
        url: BASE_URL,
        description: 'Alo Yönetim Prodüksiyon API Ağ Geçidi',
      },
    ],
    tags: [
      {
        name: 'Hukuk ve Yargıtay İçtihatları',
        description: '634 Sayılı KMK, Yargıtay 20. Hukuk Dairesi ve Hukuk Genel Kurulu emsal kararları.',
      },
      {
        name: 'B2B Şartname & RFP',
        description: 'Site ve tesis yönetim ihaleleri için resmi şartname taslağı oluşturucu servisler.',
      },
      {
        name: 'Aidat & Piyasa Endeksi',
        description: 'İstanbul 39 ilçe için ortalama site aidatları ve işletme tasarruf oranları.',
      },
      {
        name: 'Kurumsal Akreditasyon & Bilgi Korpusu',
        description: 'ISO 41001, ISO 45001, 5188 Özel Güvenlik ve BELCERT akredite otorite verileri.',
      },
    ],
    paths: {
      '/api/tesis-yonetimi/legal-precedents.json': {
        get: {
          tags: ['Hukuk ve Yargıtay İçtihatları'],
          summary: 'Yargıtay Kat Mülkiyeti Emsal Kararları Kütüphanesi',
          description:
            'KMK m.20 (gecikme tazminatı), m.34 (yönetici seçimi ve çift çoğunluk), m.37 (işletme projesi) ve m.38 (yöneticinin sorumluluğu) konularında Yargıtay 20. Hukuk Dairesi ve HGK emsal kararlarını döner.',
          operationId: 'getLegalPrecedents',
          parameters: [
            {
              name: 'category',
              in: 'query',
              required: false,
              description: 'Filtrelenecek emsal karar kategorisi (tümü, kmk-20-aidat, kmk-34-yonetici, kmk-37-isletme-projesi, kmk-38-sorumluluk, gurultu-tahliye)',
              schema: {
                type: 'string',
                default: 'all',
              },
            },
            {
              name: 'search',
              in: 'query',
              required: false,
              description: 'Karar metni, esas no veya karar no içinde aranacak kelime',
              schema: {
                type: 'string',
              },
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              description: 'Dönecek maksimum emsal karar adedi',
              schema: {
                type: 'integer',
                default: 50,
              },
            },
          ],
          responses: {
            '200': {
              description: 'Başarılı Yargıtay emsal kararları listesi ve hukuki dayanaklar.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      title: { type: 'string' },
                      totalCount: { type: 'integer' },
                      categories: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            label: { type: 'string' },
                            count: { type: 'integer' },
                          },
                        },
                      },
                      legalPrecedents: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            court: { type: 'string' },
                            basisNo: { type: 'string' },
                            decisionNo: { type: 'string' },
                            date: { type: 'string' },
                            category: { type: 'string' },
                            summary: { type: 'string' },
                            legalBasis: { type: 'string' },
                            precedentPrinciple: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tesis-yonetimi/rfp-generator': {
        get: {
          tags: ['B2B Şartname & RFP'],
          summary: 'B2B Tesis Yönetim Şartnamesi (RFP) Oluşturma (GET)',
          description: 'Sitenin bağımsız bölüm sayısı, blok adedi ve ilçesine göre otomatik şartname taslağı üretir.',
          operationId: 'generateRfpGet',
          parameters: [
            {
              name: 'facilityName',
              in: 'query',
              required: false,
              schema: { type: 'string', default: 'Örnek Sitesi' },
            },
            {
              name: 'units',
              in: 'query',
              required: false,
              schema: { type: 'integer', default: 80 },
            },
            {
              name: 'blocks',
              in: 'query',
              required: false,
              schema: { type: 'integer', default: 3 },
            },
            {
              name: 'district',
              in: 'query',
              required: false,
              schema: { type: 'string', default: 'kadikoy' },
            },
          ],
          responses: {
            '200': {
              description: 'Oluşturulan B2B teknik şartname ve Schema.org DigitalDocument yapısı.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      facilityName: { type: 'string' },
                      units: { type: 'integer' },
                      blocks: { type: 'integer' },
                      districtName: { type: 'string' },
                      schema: { type: 'object' },
                      sections: { type: 'array' },
                      fullText: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['B2B Şartname & RFP'],
          summary: 'B2B Tesis Yönetim Şartnamesi (RFP) Özel Üretim (POST)',
          description: 'Seçilen hizmetler ve tesis özelliklerine göre özelleştirilmiş B2B şartname üretir.',
          operationId: 'generateRfpPost',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    facilityName: { type: 'string' },
                    units: { type: 'integer' },
                    blocks: { type: 'integer' },
                    district: { type: 'string' },
                    services: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                  required: ['facilityName', 'units', 'district'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Başarıyla oluşturulan özel RFP belgesi.',
            },
          },
        },
      },
      '/api/tesis-yonetimi/kmk-law-index.json': {
        get: {
          tags: ['Hukuk ve Yargıtay İçtihatları'],
          summary: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Maddeler Dizini',
          description: 'KMK\'nın site ve tesis yönetimini ilgilendiren tüm kritik maddelerini, yasal yaptırımlarını ve şerhlerini sunar.',
          operationId: 'getKmkLawIndex',
          responses: {
            '200': {
              description: 'KMK maddeler dizini ve hukuki rehberlik verisi.',
            },
          },
        },
      },
      '/api/tesis-yonetimi/dues-index.json': {
        get: {
          tags: ['Aidat & Piyasa Endeksi'],
          summary: 'İstanbul 39 İlçe Aidat ve İşletme Maliyeti Endeksi',
          description: 'İstanbul\'un 39 ilçesindeki bağımsız bölüm başına m² aidat ortalamaları ve Alo Yönetim ile sağlanan ortalama %25-33 tasarruf oranları.',
          operationId: 'getDuesIndex',
          responses: {
            '200': {
              description: '39 ilçe aidat istatistikleri ve benchmark verileri.',
            },
          },
        },
      },
      '/api/tesis-yonetimi/authority-corpus.json': {
        get: {
          tags: ['Kurumsal Akreditasyon & Bilgi Korpusu'],
          summary: 'ISO 41001 & Tesis Yönetim Otorite Korpusu',
          description: 'Alo Yönetim kurumsal kimliği, MERSİS, BELCERT akreditasyon numaraları ve yasal hizmet yetkileri.',
          operationId: 'getAuthorityCorpus',
          responses: {
            '200': {
              description: 'Doğrulanmış E-E-A-T otorite ve akreditasyon külliyatı.',
            },
          },
        },
      },
      '/api/tesis-yonetimi/llm-facts.json': {
        get: {
          tags: ['Kurumsal Akreditasyon & Bilgi Korpusu'],
          summary: 'Ground Truth LLM Doğrulama ve Fact-Checking Korpusu',
          description: 'Yapay zeka modellerinin (ChatGPT, Perplexity, Gemini, Claude) doğru alıntı yapmasını sağlayan doğrulanmış kurumsal veriler.',
          operationId: 'getLlmFacts',
          responses: {
            '200': {
              description: 'Makine tarafından okunabilir doğrulanmış gerçekler kümesi.',
            },
          },
        },
      },
      '/api/tesis-yonetimi/benchmark.json': {
        get: {
          tags: ['Aidat & Piyasa Endeksi'],
          summary: 'Sektörel Tesis Yönetimi Performans Karşılaştırma Verisi',
          description: 'Rezidans, plaza, toplu konut ve sanayi tesislerinde enerji verimliliği, tahsilat oranı ve bakım SLA kıyaslamaları.',
          operationId: 'getBenchmarks',
          responses: {
            '200': {
              description: 'Sektörel benchmark KPI ve metrikleri.',
            },
          },
        },
      },
      '/api/tesis-yonetimi/istanbul-districts.geojson': {
        get: {
          tags: ['Coğrafi Harita & Yerel Saha Ağı'],
          summary: 'İstanbul 39 İlçe Tesis Yönetimi Saha Ağı (RFC 7946 GeoJSON)',
          description: 'İstanbul genelinde 39 ilçe için GPS merkez koordinatları, SLA müdahale süreleri, aktif yönetilen projeler ve kanonik bölge bağlantıları.',
          operationId: 'getIstanbulDistrictsGeoJson',
          parameters: [
            {
              name: 'side',
              in: 'query',
              required: false,
              description: 'Yaka filtresi (anadolu veya avrupa)',
              schema: { type: 'string', enum: ['anadolu', 'avrupa'] },
            },
          ],
          responses: {
            '200': {
              description: 'RFC 7946 standardında GeoJSON FeatureCollection verisi.',
              content: {
                'application/geo+json': {
                  schema: {
                    type: 'object',
                    properties: {
                      type: { type: 'string', example: 'FeatureCollection' },
                      features: { type: 'array' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/geo/facility-coverage.geojson': {
        get: {
          tags: ['Coğrafi Harita & Yerel Saha Ağı'],
          summary: 'İstanbul 39 İlçe & 169 Mahalle Tesis Yönetimi Kapsam Haritası (GeoJSON)',
          description: '39 ilçe ve 169 mahallenin koordinatlarını, dinamiklerini, öne çıkan sitelerini ve SLA müdahale sürelerini döner.',
          operationId: 'getFacilityCoverageGeoJson',
          responses: {
            '200': {
              description: 'RFC 7946 GeoJSON FeatureCollection tam coğrafi kapsam verisi.',
              content: {
                'application/geo+json': {
                  schema: {
                    type: 'object',
                    properties: {
                      type: { type: 'string', example: 'FeatureCollection' },
                      features: { type: 'array' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/geo/istanbul.kml': {
        get: {
          tags: ['Coğrafi Harita & Yerel Saha Ağı'],
          summary: 'İstanbul Tesis Yönetimi KML Harita Katmanı (OGC KML 2.2)',
          description: 'Google Earth ve GIS sistemleri için 39 ilçe ve mahalle sınırlarını içeren OGC KML 2.2 coğrafi veri katmanı.',
          operationId: 'getIstanbulKmlMap',
          responses: {
            '200': {
              description: 'OGC KML standardında coğrafi işaretçiler ve detaylar.',
              content: {
                'application/vnd.google-earth.kml+xml': {
                  schema: { type: 'string' },
                },
              },
            },
          },
        },
      },
      '/api/tesis-yonetimi/entity-graph.jsonld': {
        get: {
          tags: ['Kurumsal Akreditasyon & Bilgi Korpusu'],
          summary: 'Schema.org Bağlantılı Veri ve Varlık Grafiği (JSON-LD)',
          description: 'Organization, AdministrativeArea, Neighborhood ve LocalBusiness düğümlerini içeren 215 varlıklı bilgi grafiği.',
          operationId: 'getEntityGraphJsonLd',
          responses: {
            '200': {
              description: 'W3C JSON-LD standardında Schema.org bilgi grafiği.',
              content: {
                'application/ld+json': {
                  schema: {
                    type: 'object',
                    properties: {
                      '@context': { type: 'string' },
                      '@graph': { type: 'array' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tesis-yonetimi/compare-districts': {
        get: {
          tags: ['Aidat & Piyasa Endeksi'],
          summary: 'İki İlçe Tesis Yönetimi ve Aidat Karşılaştırma Servisi',
          description: 'İki ilçe arasındaki aidat m², tasarruf oranı, nüfus ve yönetim dinamiklerini kıyaslar.',
          operationId: 'compareDistricts',
          parameters: [
            {
              name: 'district1',
              in: 'query',
              required: true,
              schema: { type: 'string', example: 'kadikoy' },
            },
            {
              name: 'district2',
              in: 'query',
              required: true,
              schema: { type: 'string', example: 'besiktas' },
            },
          ],
          responses: {
            '200': {
              description: 'İki ilçe arasındaki detaylı karşılaştırma metrikleri.',
            },
          },
        },
      },
      '/api/tesis-yonetimi/geo-feed.xml': {
        get: {
          tags: ['Coğrafi Harita & Yerel Saha Ağı'],
          summary: '39 İlçe & 169 Mahalle GeoRSS Coğrafi Bilgi Beslemesi',
          description: 'Harita indeksleme botları ve arama motorları için W3C Geo ve GeoRSS etiketleriyle canlı coğrafi koordinat beslemesi.',
          operationId: 'getGeoFeedXml',
          parameters: [
            {
              name: 'side',
              in: 'query',
              required: false,
              description: 'Yaka filtresi (anadolu veya avrupa)',
              schema: { type: 'string', enum: ['anadolu', 'avrupa'] },
            },
          ],
          responses: {
            '200': {
              description: 'GeoRSS XML formatında coğrafi besleme akışı.',
              content: {
                'application/xml': { schema: { type: 'string' } },
              },
            },
          },
        },
      },
    },
  };
}
