import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 2: Bölüm ve Bileşen Optimizasyonları (Faz 26 - Faz 50)', () => {
  const sectionsDir = path.resolve(process.cwd(), 'src/components/sections');

  it('Hesaplayıcı bileşenlerinde (Cleaning, Dues, Facility, Landscape, Legal, Maintenance, Pest, Pool, Security) Framer Motion importu kalmamıştır', () => {
    const calculators = [
      'CleaningCalculator.tsx',
      'DuesCalculator.tsx',
      'FacilityCalculator.tsx',
      'LandscapeCalculator.tsx',
      'LegalCalculator.tsx',
      'MaintenanceCalculator.tsx',
      'PestControlCalculator.tsx',
      'PoolCalculator.tsx',
      'SecurityCalculator.tsx',
    ];

    calculators.forEach((calcFile) => {
      const subPath = path.join(sectionsDir, 'calculators', calcFile);
      const filePath = fs.existsSync(subPath) ? subPath : path.join(sectionsDir, calcFile);
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).not.toContain("from 'framer-motion'");
      expect(content).not.toContain('from "framer-motion"');
      expect(content).toContain('transform-gpu');
    });
  });

  it('9 Testimonial bileşeni ServiceTestimonialsShared üzerine refactor edilmiştir', () => {
    const testimonialFiles = [
      'CleaningTestimonials.tsx',
      'DuesTestimonials.tsx',
      'FacilityTestimonials.tsx',
      'LandscapeTestimonials.tsx',
      'LegalTestimonials.tsx',
      'MaintenanceTestimonials.tsx',
      'PestControlTestimonials.tsx',
      'PoolTestimonials.tsx',
      'SecurityTestimonials.tsx',
    ];

    testimonialFiles.forEach((testiFile) => {
      const subPath = path.join(sectionsDir, 'testimonials', testiFile);
      const filePath = fs.existsSync(subPath) ? subPath : path.join(sectionsDir, testiFile);
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('ServiceTestimonialsShared');
      expect(content).toContain('Object.freeze');
      expect(content).not.toContain("from 'framer-motion'");
    });
  });

  it('Hero.tsx ve AppComingSoon.tsx Framer Motion içermez, CSS donanım hızlandırma kullanır', () => {
    const heroSubPath = path.join(sectionsDir, 'core', 'Hero.tsx');
    const heroPath = fs.existsSync(heroSubPath) ? heroSubPath : path.join(sectionsDir, 'Hero.tsx');
    const heroContent = fs.readFileSync(heroPath, 'utf-8');
    expect(heroContent).not.toContain("from 'framer-motion'");
    expect(heroContent).toContain('transform-gpu');

    const appSoonSubPath = path.join(sectionsDir, 'interactive', 'AppComingSoon.tsx');
    const appSoonPath = fs.existsSync(appSoonSubPath) ? appSoonSubPath : path.join(sectionsDir, 'AppComingSoon.tsx');
    const appSoonContent = fs.readFileSync(appSoonPath, 'utf-8');
    expect(appSoonContent).not.toContain("from 'framer-motion'");
    expect(appSoonContent).toContain('transform-gpu');
  });

  it('globals.css içindeki lazy-section ve LCP resim kuralları kalibre edilmiştir', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    expect(cssContent).toContain('.lazy-section');
    expect(cssContent).toContain('contain-intrinsic-size: 0px 580px');
    expect(cssContent).toContain('.lazy-section-tall');
    expect(cssContent).toContain('.lazy-section-compact');
  });
});
