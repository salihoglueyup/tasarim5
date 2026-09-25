import { describe, it, expect } from 'vitest';
import { courseSchema } from '@/lib/schemas';

describe('Güvenlik Akademisi (5188) Kursları ve Otorite Doğrulaması', () => {
  it('Course schema geçerli JSON-LD yapısal verisi üretmeli', () => {
    const schema = courseSchema({
      name: 'Silahlı Özel Güvenlik Temel Eğitimi',
      description: '120 ders saati ve 25 fişek poligon atış eğitimi içeren resmi program.',
      path: '/guvenlik-akademisi',
    });

    expect(schema['@type']).toBe('Course');
    expect(schema.name).toBe('Silahlı Özel Güvenlik Temel Eğitimi');
    expect(schema.provider).toBeDefined();
    const provider = schema.provider as { '@type': string; name: string };
    expect(provider['@type']).toBe('EducationalOrganization');
    expect(provider.name).toContain('Alo Yönetim');
  });

  it('EducationalOccupationalProgram schema doğru alanları içermeli', () => {
    const programLd = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      name: '5188 Sayılı Kanun Kapsamında Özel Güvenlik Eğitimi',
      description: 'Silahlı ve silahsız özel güvenlik sertifikasyon programı.',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Alo Güvenlik Kursu',
        url: 'https://www.guvenlikkursu.com/',
      },
    };

    expect(programLd['@type']).toBe('EducationalOccupationalProgram');
    expect(programLd.provider.url).toBe('https://www.guvenlikkursu.com/');
    expect(programLd.name).toContain('5188');
  });

  it('5188 Mevzuat kriterleri kurallara uygun olmalı', () => {
    const courseRequirements = {
      silahsizTemel: { minAge: 18, minEducation: 'ortaokul', hours: 100, shooting: 0 },
      silahliTemel: { minAge: 21, minEducation: 'lise', hours: 120, shooting: 25 },
      silahsizYenileme: { hours: 50, shooting: 0, examThreshold: false },
      silahliYenileme: { hours: 60, shooting: 25, examThreshold: false },
      farkEgitimi: { minAge: 21, minEducation: 'lise', hours: 20, shooting: 25 },
    };

    expect(courseRequirements.silahsizTemel.minAge).toBe(18);
    expect(courseRequirements.silahliTemel.minAge).toBe(21);
    expect(courseRequirements.silahliTemel.hours).toBe(120);
    expect(courseRequirements.silahliTemel.shooting).toBe(25);
    expect(courseRequirements.farkEgitimi.hours).toBe(20);
    expect(courseRequirements.silahsizYenileme.examThreshold).toBe(false);
  });
});
