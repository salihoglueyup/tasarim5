import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatDate,
  formatRelativeTime,
} from './formatters';
import { filterFaqsByLanguage } from '../../app/[lang]/sss/FaqClient';
import { calculateDuesLocalized } from '../hesaplayici';
import { buildLanguageAlternates } from '../seo';

describe('Wave 7: Faz 161 - Faz 165 Çok Dilli Formatlayıcılar, Sitemap Alternates, SSS Arama & Hesaplayıcı', () => {
  it('Faz 161: formatCurrency, formatNumber ve formatPercent TR, EN, RU, AR dillerine göre formatlar', () => {
    // Para birimi
    const trCurr = formatCurrency(25000, 'tr', 'TRY');
    expect(trCurr).toContain('25.000');
    expect(trCurr).toContain('₺');

    const enCurr = formatCurrency(25000, 'en', 'USD');
    expect(enCurr).toContain('25,000');
    expect(enCurr).toContain('$');

    // Sayı formatı
    expect(formatNumber(1250000, 'tr')).toBe('1.250.000');
    expect(formatNumber(1250000, 'en')).toBe('1,250,000');

    // Yüzde formatı
    expect(formatPercent(0.3, 'tr')).toContain('%30');
    expect(formatPercent(0.3, 'en')).toContain('30');
  });

  it('Faz 162: formatDate ve formatRelativeTime tarihleri dile göre yerelleştirir', () => {
    const fixedDate = new Date('2026-06-15T12:00:00Z');

    const trDate = formatDate(fixedDate, 'tr', 'long');
    expect(trDate).toContain('Haziran');
    expect(trDate).toContain('2026');

    const enDate = formatDate(fixedDate, 'en', 'long');
    expect(enDate).toContain('June');
    expect(enDate).toContain('2026');

    const relative = formatRelativeTime(Date.now() - 2 * 24 * 60 * 60 * 1000, 'tr');
    expect(relative).toContain('önce');
  });

  it('Faz 163: sitemap language alternates 4 dil ve x-default hreflang içerir', () => {
    const alternates = buildLanguageAlternates('/hizmetler/tesis-yonetimi');
    expect(alternates).toHaveProperty('tr');
    expect(alternates).toHaveProperty('en');
    expect(alternates).toHaveProperty('ru');
    expect(alternates).toHaveProperty('ar');
    expect(alternates).toHaveProperty('x-default');
  });

  it('Faz 164: filterFaqsByLanguage 4 dilde soru/cevap araması ve kategori filtrelemesi yapar', () => {
    const sampleFaqs = [
      {
        id: '1',
        category: 'Güvenlik',
        question: 'Özel güvenlik izinleri nasıl alınır?',
        answer: '5188 sayılı kanun kapsamında Valilik onayı alınır.',
        question_en: 'How to obtain private security permits?',
        answer_en: 'Governorate approval is obtained under Law No. 5188.',
        question_ar: 'كيفية الحصول على تراخيص الأمن الخاص؟',
        answer_ar: 'يتم الحصول على موافقة الولاية بموجب القانون رقم 5188.',
      },
      {
        id: '2',
        category: 'Finans',
        question: 'Geciken aidata faiz uygulanır mı?',
        answer: 'KMK 20. madde gereğince aylık %5 gecikme tazminatı uygulanır.',
        question_en: 'Is there interest on late dues?',
        answer_en: 'Monthly 5% delay compensation is applied pursuant to KMK Article 20.',
      },
    ];

    // İngilizce arama
    const enSearch = filterFaqsByLanguage(sampleFaqs, 'security', 'All', 'en');
    expect(enSearch).toHaveLength(1);
    expect(enSearch[0].id).toBe('1');

    // Arapça arama
    const arSearch = filterFaqsByLanguage(sampleFaqs, 'الأمن', 'الكل', 'ar');
    expect(arSearch).toHaveLength(1);
    expect(arSearch[0].id).toBe('1');

    // Kategori filtreleme
    const financeFaqs = filterFaqsByLanguage(sampleFaqs, '', 'Finans', 'tr');
    expect(financeFaqs).toHaveLength(1);
    expect(financeFaqs[0].id).toBe('2');
  });

  it('Faz 165: calculateDuesLocalized İngilizce ve Arapça dahil tüm dillerde formatlanmış aidat ve bütçe sonuçları döner', () => {
    const input = {
      units: 50,
      elevators: 4,
      hasSecurity: true,
      hasPool: true,
      hasGreenSpace: true,
    };

    const resTr = calculateDuesLocalized(input, 'tr');
    expect(resTr.formattedDuesPerUnit).toContain('₺');
    expect(resTr.totalMonthlyBudget).toBeGreaterThan(0);

    const resEn = calculateDuesLocalized(input, 'en');
    expect(resEn.formattedDuesPerUnit).toBeDefined();
    expect(resEn.formattedTotalMonthlyBudget).toBeDefined();

    const resAr = calculateDuesLocalized(input, 'ar');
    expect(resAr.formattedDuesPerUnit).toBeDefined();
    expect(resAr.formattedEstimatedSavings).toBeDefined();
  });
});
