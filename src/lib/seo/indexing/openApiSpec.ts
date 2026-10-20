import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';

/**
 * Alo Yönetim Entegre Tesis Yönetimi & KMK Hukuku Açık Veri OpenAPI 3.1.0 Spesifikasyonu
 * Standart: OpenAPI Specification 3.1.0 (https://spec.openapis.org/oas/v3.1.0)
 * Hedef: AI Arama Motorları (Perplexity, ChatGPT, Claude), B2B Entegratörler ve Geliştiriciler.
 */
export function generateOpenApiSpec() {
  return {
    openapi: '3.1.0',
    'x-service-info': {
      categories: ['facility-management', 'property-management', 'legal-compliance'],
      docs: {
        homepage: `${BASE_URL}/llms-full.txt`,
        apiReference: `${BASE_URL}/openapi.json`,
      },
    },
    info: {
      title: 'Alo Yönetim Tesis Yönetimi & KMK Hukuku Açık Veri API\'si',
      version: '1.0.0',
      description:
        'İstanbul genelinde 39 ilçede entegre tesis yönetimi, 634 Sayılı Kat Mülkiyeti Kanunu (KMK) içtihatları, Yargıtay emsal kararları, B2B teknik şartname (RFP) üreticisi, ilçe bazlı aidat endeksi ve akredite otorite korpusu açık veri servisleri.',
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
        description: 'ISO 45001, ISO 14001, ISO 10002 (BELCERT, ILAS) ve 5188 Özel Güvenlik belge verileri.',
      },
      {
        name: 'Yapay Zeka & Semantik Grounding (GEO)',
        description: 'ChatGPT Search, Perplexity ve Claude için dinamik KMK 634, Yargıtay emsal kararları ve 39 ilçe canlı semantik sorgu uç noktaları.',
      },
    ],
    paths: {
      '/api/tesis-yonetimi/rfp-generator': {
        get: {
          tags: ['B2B Şartname & RFP'],
          summary: 'B2B Tesis Yönetim Şartnamesi (RFP) Oluşturma (GET)',
          description: 'Sitenin bağımsız bölüm sayısı, blok adedi ve ilçesine göre otomatik şartname taslağı üretir.',
          operationId: 'generateRfpGet',
          'x-payment-info': {
            intent: 'charge',
            method: 'card',
            amount: '0.00',
            currency: 'TRY',
            description: 'Ücretsiz B2B Tesis Yönetim Teknik Şartnamesi (RFP) ve İşletme Bütçesi Ön Değerlendirme Servisi',
          },
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
          'x-payment-info': {
            intent: 'charge',
            method: 'card',
            amount: '0.00',
            currency: 'TRY',
            description: 'Ücretsiz Özelleştirilmiş B2B Tesis Yönetim Teknik Şartname (RFP) Üretim Servisi',
          },
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
      '/api/ai/site-agent-context.json': {
        get: {
          tags: ['Yapay Zeka & Semantik Grounding (GEO)'],
          summary: 'Profesyonel Site Yönetimi Tam LLM Ground-Truth Bilgi Korpusu',
          description: '634 Sayılı KMK maddeleri, Yargıtay 20. H.D. içtihatları, 39 ilçe konut stoğu ve aidat tasarruf oranları ile akredite site yönetimi bağlam verisi.',
          operationId: 'getSiteAgentContext',
          responses: {
            '200': {
              description: 'Tam yapılandırılmış JSON-LD ve semantik RAG korpusu.',
            },
          },
        },
      },
    },
  };
}
