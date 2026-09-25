import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Vizyon & Misyon 2026 Kurumsal Modernizasyon Güvence Testleri', () => {
  const rootDir = process.cwd();

  it('VizyonMisyonClient tüm 7 modern kurumsal vizyon bileşenini ve ekosistem referanslarını içerir', () => {
    const clientPath = path.join(
      rootDir,
      'src/app/[lang]/kurumsal/vizyon-misyon/VizyonMisyonClient.tsx'
    );
    const content = fs.readFileSync(clientPath, 'utf8');

    expect(content).toContain('VisionHeroSeo');
    expect(content).toContain('VisionAiOverviewSeo');
    expect(content).toContain('VisionComparisonMatrixSeo');
    expect(content).toContain('VisionOperationalPillarsSeo');
    expect(content).toContain('VisionManifestoSeo');
    expect(content).toContain('VisionRoadmapSeo');
    expect(content).toContain('VisionEcosystemCtaSeo');
    expect(content).toContain('guvenlikkursu.com');
  });

  it('VisionHeroSeo güncel doğrulanmış kurumsal metrikleri ve resmi akreditasyonları barındırır', () => {
    const heroPath = path.join(
      rootDir,
      'src/components/seo/vision/VisionHeroSeo.tsx'
    );
    const content = fs.readFileSync(heroPath, 'utf8');

    expect(content).toContain('45.000+');
    expect(content).toContain('1.200+');
    expect(content).toContain('%99,4');
    expect(content).toContain('%28');
    expect(content).toContain('ISO 9001');
    expect(content).toContain('634 Sayılı KMK');
  });

  it('VisionComparisonMatrixSeo 6 somut yönetim kriterini ve tasarruf faydalarını karşılaştırır', () => {
    const matrixPath = path.join(
      rootDir,
      'src/components/seo/vision/VisionComparisonMatrixSeo.tsx'
    );
    const content = fs.readFileSync(matrixPath, 'utf8');

    expect(content).toContain('Finansal Şeffaflık & Kasa Denetimi');
    expect(content).toContain('Personel Kıdem Tazminatı Güvencesi');
    expect(content).toContain('Güvenlik Kadrosu & Lisans Denetimi');
    expect(content).toContain('Teknik Arıza & Kestirimci Bakım');
    expect(content).toContain('Aidat Tahsilatı & Hukuki Takip');
    expect(content).toContain('Satın Alma & Tedarik Maliyetleri');
    expect(content).toContain('Geleneksel / Amatör Yönetim');
    expect(content).toContain('Alo Yönetim 2026 Standartları');
  });

  it('VisionManifestoSeo kat maliklerine 5 hukuki ve şeffaf taahhüt sunar', () => {
    const manifestoPath = path.join(
      rootDir,
      'src/components/seo/vision/VisionManifestoSeo.tsx'
    );
    const content = fs.readFileSync(manifestoPath, 'utf8');

    expect(content).toContain('Asla Gizli Komisyon veya Şişirilmiş Fatura Yok');
    expect(content).toContain('Dokunulmaz ve Blokeli Kıdem Tazminatı Fonu');
    expect(content).toContain('Her Ay Bağımsız Denetim Raporu E-Postanızda');
    expect(content).toContain('7/24 Kesintisiz Çağrı & 15 Dakikada Acil Müdahale');
    expect(content).toContain('Yıllık İşletme Projesinde Minimum %20 Tasarruf');
  });

  it('VisionRoadmapSeo 2014-2030 kilometre taşlarını ve liderlik dönemini sunar', () => {
    const roadmapPath = path.join(
      rootDir,
      'src/components/seo/vision/VisionRoadmapSeo.tsx'
    );
    const content = fs.readFileSync(roadmapPath, 'utf8');

    expect(content).toContain('2014 — 2019');
    expect(content).toContain('2020 — 2023');
    expect(content).toContain('2024 — 2026 (Bugün)');
    expect(content).toContain('2027 — 2030 Hedefi');
    expect(content).toContain('Otonom Yeşil Siteler & Karbon Nötr Tesisler');
  });

  it('Vizyon ve Misyon page.tsx dosyasında zengin AboutPage ve Corporation JSON-LD şemaları bulunur', () => {
    const pagePath = path.join(
      rootDir,
      'src/app/[lang]/kurumsal/vizyon-misyon/page.tsx'
    );
    const content = fs.readFileSync(pagePath, 'utf8');

    expect(content).toContain('AboutPage');
    expect(content).toContain('Corporation');
    expect(content).toContain('guvenlikkursu.com');
    expect(content).toContain('speakableSelectors');
  });
});
