import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  CareerHeroSeo,
  CareerDualProtectionSeo,
  CareerDisciplinesGridSeo,
  CareerOpenPositionsSeo,
  CareerRecruitmentStepsSeo,
  CareerLegalGuaranteeDeepDiveSeo,
  CareerApplicationDualFormSeo,
  CareerFaqSeo,
  CareerCtaBannerSeo,
} from '@/components/seo/career';

describe('Career & İstihdam Köprüsü SEO Component Suite', () => {
  it('tüm 9 adet kariyer bileşeni başarıyla tanımlı ve geçerli birer fonksiyondur', () => {
    expect(typeof CareerHeroSeo).toBe('function');
    expect(typeof CareerDualProtectionSeo).toBe('function');
    expect(typeof CareerDisciplinesGridSeo).toBe('function');
    expect(typeof CareerOpenPositionsSeo).toBe('function');
    expect(typeof CareerRecruitmentStepsSeo).toBe('function');
    expect(typeof CareerLegalGuaranteeDeepDiveSeo).toBe('function');
    expect(typeof CareerApplicationDualFormSeo).toBe('function');
    expect(typeof CareerFaqSeo).toBe('function');
    expect(typeof CareerCtaBannerSeo).toBe('function');
  });

  it('CareerHeroSeo sunucu tarafında hatasız render edilir ve temel metinleri içerir', () => {
    const html = renderToString(React.createElement(CareerHeroSeo));
    expect(html).toContain('İstihdam Köprüsü');
    expect(html).toContain('5188');
    expect(html).toContain('Kıdem Tazminatı');
  });

  it('CareerDualProtectionSeo çift taraflı koruma maddelerini barındırır', () => {
    const html = renderToString(React.createElement(CareerDualProtectionSeo));
    expect(html).toContain('Tazminatı');
    expect(html).toContain('Kurumsal İşveren');
    expect(html).toContain('Maaş');
  });

  it('CareerDisciplinesGridSeo 4 temel branşı listeler', () => {
    const html = renderToString(React.createElement(CareerDisciplinesGridSeo));
    expect(html).toContain('5188 Sayılı Lisanslı Özel Güvenlik');
    expect(html).toContain('Endüstriyel Temizlik');
    expect(html).toContain('Elektromekanik');
    expect(html).toContain('Lobi');
  });

  it('CareerOpenPositionsSeo iş ilanlarını ve JobPosting Schema.org yapısal verisini basar', () => {
    const html = renderToString(React.createElement(CareerOpenPositionsSeo));
    expect(html).toContain('JobPosting');
    expect(html).toContain('5188 Kimlikli Özel Güvenlik');
    expect(html).toContain('36.500 ₺');
  });

  it('CareerRecruitmentStepsSeo 5 aşamalı işe alım ve güvenlik tahkikatını açıklar', () => {
    const html = renderToString(React.createElement(CareerRecruitmentStepsSeo));
    expect(html).toContain('5188 Güvenlik');
    expect(html).toContain('Adli Sicil');
    expect(html).toContain('Hizmet Akademisi');
  });

  it('CareerLegalGuaranteeDeepDiveSeo kıdem tazminatı kalkanı detaylarını içerir', () => {
    const html = renderToString(React.createElement(CareerLegalGuaranteeDeepDiveSeo));
    expect(html).toContain('Aylık Bloke Provizyon Havuzu');
    expect(html).toContain('Yargıtay Emsal Kararlarıyla Uyumlu Sözleşme');
    expect(html).toContain('Kıdem Tazminatı Kalkanı');
  });

  it('CareerApplicationDualFormSeo aday ve yönetici başvuru alanlarını barındırır', () => {
    const html = renderToString(React.createElement(CareerApplicationDualFormSeo));
    expect(html).toContain('Aday Bilgileri');
    expect(html).toContain('Başvuru Detayı');
    expect(html).toContain('İş Arayanım');
    expect(html).toContain('Yöneticiyim');
  });

  it('CareerFaqSeo FAQPage Schema.org nesnesi üretir ve soruları listeler', () => {
    const html = renderToString(React.createElement(CareerFaqSeo));
    expect(html).toContain('FAQPage');
    expect(html).toContain('Sıkça Sorulan Sorular');
    expect(html).toContain('kıdem tazminatından site yönetimi sorumlu mudur');
  });

  it('CareerCtaBannerSeo alt dönüşüm butonlarını ve çağrı merkezini barındırır', () => {
    const html = renderToString(React.createElement(CareerCtaBannerSeo));
    expect(html).toContain('Açık Pozisyonları İncele');
    expect(html).toContain('Tesisime Personel Teklifi Al');
    expect(html).toContain('0850 309 67 34');
  });
});
