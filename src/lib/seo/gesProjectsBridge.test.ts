import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Sitelerde Çatı GES ve Güneş Enerjisi 2026 Modernizasyon Güvence Testleri', () => {
  const rootDir = process.cwd();

  it('GesProjeleriClient tüm 8 modern güneş enerjisi ve sürdürülebilirlik bileşenini içerir', () => {
    const clientPath = path.join(
      rootDir,
      'src/app/[lang]/surdurulebilirlik/ges-projeleri/GesProjeleriClient.tsx'
    );
    const content = fs.readFileSync(clientPath, 'utf8');

    expect(content).toContain('GesHeroSeo');
    expect(content).toContain('GesAiOverviewSeo');
    expect(content).toContain('GesRoiCalculatorSeo');
    expect(content).toContain('GesProjectRoadmapSeo');
    expect(content).toContain('GesEvChargingHubSeo');
    expect(content).toContain('GesNetMeteringSeo');
    expect(content).toContain('GesAuthorityFaqSeo');
    expect(content).toContain('GesConversionCtaSeo');
  });

  it('GesHeroSeo resmi EPDK ve KMK 42 mühürlerini ve doğrulanmış 4 metriği barındırır', () => {
    const heroPath = path.join(
      rootDir,
      'src/components/seo/ges/GesHeroSeo.tsx'
    );
    const content = fs.readFileSync(heroPath, 'utf8');

    expect(content).toContain('%70 - %85');
    expect(content).toContain('3.2 Yıl');
    expect(content).toContain('25+ Yıl');
    expect(content).toContain('14.800 T');
    expect(content).toContain('EPDK LİSANSSIZ ÜRETİM (MADDE 5/1-ç)');
    expect(content).toContain('634 Sayılı KMK m.42');
  });

  it('GesRoiCalculatorSeo daire sayısı, elektrik faturası ve daire başı aidat indirimi simülasyonunu barındırır', () => {
    const calcPath = path.join(
      rootDir,
      'src/components/seo/ges/GesRoiCalculatorSeo.tsx'
    );
    const content = fs.readFileSync(calcPath, 'utf8');

    expect(content).toContain('Sitedeki Toplam Daire Sayısı');
    expect(content).toContain('Aylık Ortak Elektrik Faturası');
    expect(content).toContain('Aidat İndirimi');
    expect(content).toContain('Gerekli Santral Gücü');
    expect(content).toContain('Amortisman Süresi');
  });

  it('GesProjectRoadmapSeo keşiften çift yönlü sayaca kadar 6 aşamalı süreci eksiksiz sunar', () => {
    const roadmapPath = path.join(
      rootDir,
      'src/components/seo/ges/GesProjectRoadmapSeo.tsx'
    );
    const content = fs.readFileSync(roadmapPath, 'utf8');

    expect(content).toContain('Ücretsiz Statik Çatı & Güneşlenme Keşfi');
    expect(content).toContain('Kat Malikleri Kurulu (Genel Kurul) Karar Protokolü');
    expect(content).toContain('Dağıtım Şirketi (BEDAŞ / AYEDAŞ) Çağrı Mektubu');
    expect(content).toContain('TEDAŞ Proje Onayı & Belediye Yazısı');
    expect(content).toContain('Tier-1 Panel Montajı & Membran Su Yalıtım Güvencesi');
    expect(content).toContain('Çift Yönlü Sayaç Kabulü & Aylık Mahsuplaşma Başlangıcı');
  });

  it('GesEvChargingHubSeo elektrikli araç şarj entegrasyonu ve dinamik yük dengeleme modellerini sunar', () => {
    const evPath = path.join(
      rootDir,
      'src/components/seo/ges/GesEvChargingHubSeo.tsx'
    );
    const content = fs.readFileSync(evPath, 'utf8');

    expect(content).toContain('Piyasa Fiyatının %40 Altına Şarj');
    expect(content).toContain('Dinamik Yük Dengeleme (DLB)');
    expect(content).toContain('22 kW AC');
  });

  it('ges-projeleri page.tsx dosyasında zengin HowTo, FAQPage ve ItemPage JSON-LD şemaları bulunur', () => {
    const pagePath = path.join(
      rootDir,
      'src/app/[lang]/surdurulebilirlik/ges-projeleri/page.tsx'
    );
    const content = fs.readFileSync(pagePath, 'utf8');

    expect(content).toContain('HowTo');
    expect(content).toContain('FAQPage');
    expect(content).toContain('ItemPage');
    expect(content).toContain('speakableSelectors');
  });
});
