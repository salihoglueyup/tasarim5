import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { localBusinessAreaSchema } from '../schemas/services';
import { howToSchema, faqPageSchema } from '../schemas/faq';
import { definedTermSetSchema, webPageSchema } from '../schemas/misc';

describe('Wave 6: Faz 131 - Faz 135 Arama Motoru Otoritesi, Yapılandırılmış Veriler & Sözlük', () => {
  const kaliteBelgelerimizPagePath = path.resolve(
    process.cwd(),
    'src/app/[lang]/kurumsal/kalite-belgelerimiz/page.tsx'
  );

  it('Faz 131: localBusinessAreaSchema hem LocalBusiness hem ProfessionalService, geo ve hasMap içerir', () => {
    const schema = localBusinessAreaSchema({
      areaName: 'Kadıköy',
      geo: { lat: 40.99, lng: 29.02 },
      url: '/bolgeler/kadikoy/tesis-yonetimi',
    });

    expect(schema['@type']).toEqual(['LocalBusiness', 'ProfessionalService']);
    expect(schema).toHaveProperty('geo');
    expect((schema.geo as any)['@type']).toBe('GeoCoordinates');
    expect(schema).toHaveProperty('hasMap');
    expect(schema.hasMap).toContain('google.com/maps');
  });

  it('Faz 132: howToSchema adımları pozisyon ve metinleriyle eksiksiz üretir', () => {
    const schema = howToSchema({
      name: 'Aidat Hesaplama',
      description: 'Adım adım aidat hesaplama',
      steps: [
        { name: 'Adım 1', text: 'Daire sayısını girin' },
        { name: 'Adım 2', text: 'Hizmetleri seçin' },
      ],
    }) as any;

    expect(schema['@type']).toBe('HowTo');
    expect(schema.step).toHaveLength(2);
    expect(schema.step[0]['@type']).toBe('HowToStep');
    expect(schema.step[0].position).toBe(1);
    expect(schema.step[0].name).toBe('Adım 1');
  });

  it('Faz 133: faqPageSchema boş/hatalı kayıtları eler ve tam FAQPage üretir', () => {
    const schema = faqPageSchema([
      { question: 'Soru 1', answer: 'Cevap 1' },
      { question: '', answer: 'Boş soru' },
      { question: '   ', answer: '   ' },
      { q: 'Soru 2', a: 'Cevap 2' },
    ]) as any;

    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0].name).toBe('Soru 1');
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Cevap 1');
    expect(schema.mainEntity[1].name).toBe('Soru 2');
  });

  it('Faz 134: kalite-belgelerimiz sayfası type: AboutPage şeması kullanır', () => {
    const content = fs.readFileSync(kaliteBelgelerimizPagePath, 'utf-8');
    expect(content).toContain("type: 'AboutPage'");
  });

  it('Faz 135: definedTermSetSchema her terime özel @id ve url ile DefinedTerm üretir', () => {
    const schema = definedTermSetSchema({
      name: 'Site Terimleri Sözlüğü',
      description: 'Açıklamalar',
      path: '/sozluk',
      terms: [
        { term: 'Kat İrtifakı', definition: 'Yapılmakta olan binalardaki hak payı.', url: '/sozluk/kat-irtifaki' },
        { term: 'İşletme Projesi', definition: 'Yıllık tahmini bütçe tablosu.' },
      ],
    }) as any;

    expect(schema['@type']).toBe('DefinedTermSet');
    expect(schema.hasDefinedTerm).toHaveLength(2);
    expect(schema.hasDefinedTerm[0]['@type']).toBe('DefinedTerm');
    expect(schema.hasDefinedTerm[0].name).toBe('Kat İrtifakı');
    expect(schema.hasDefinedTerm[0]).toHaveProperty('@id');
    expect(schema.hasDefinedTerm[0]).toHaveProperty('url');
  });
});
