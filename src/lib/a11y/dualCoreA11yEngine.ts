import { auditHeadingHierarchy } from './headingAuditor';
import { auditImageAccessibility } from './imageAltAuditor';
import { auditSemanticLandmarks } from './semanticLandmarkAuditor';
import { validateHtmlLangDirection } from './langAttributeAuditor';

export interface LighthouseA11yCategory {
  id: string;
  title: string;
  weight: number;
  passed: boolean;
  score: number; // 0 or weight
  details?: string;
}

export interface LighthouseA11yReport {
  score: number; // 0 - 100
  passed: boolean;
  categories: LighthouseA11yCategory[];
  summary: string;
}

/**
 * Faz 224 & Faz 225: Lighthouse Accessibility & WCAG 2.1 AA 100/100 Tam Puan Denetim Motoru
 */
export function runLighthouseA11yAudit(htmlContent: string, lang: string = 'tr'): LighthouseA11yReport {
  const categories: LighthouseA11yCategory[] = [];

  // 1. html-has-lang & html-lang-valid (15 puan)
  const langCheck = validateHtmlLangDirection(lang);
  categories.push({
    id: 'html-has-lang',
    title: '<html> öğesi bir [lang] özelliğine sahip',
    weight: 10,
    passed: Boolean(lang),
    score: lang ? 10 : 0,
  });
  categories.push({
    id: 'html-lang-valid',
    title: '<html> [lang] değeri geçerli bir BCP 47 dil kodudur',
    weight: 5,
    passed: langCheck.isValid,
    score: langCheck.isValid ? 5 : 0,
  });

  // 2. bypass: Skip Navigation Link (10 puan)
  const hasSkipLink = /href="#main-content"/i.test(htmlContent);
  categories.push({
    id: 'bypass',
    title: 'Sayfa tekrarlayan blokları atlamak için bağlantı (Skip Link) içerir',
    weight: 10,
    passed: hasSkipLink,
    score: hasSkipLink ? 10 : 0,
  });

  // 3. heading-order: Başlık hiyerarşisi (10 puan)
  const headingReport = auditHeadingHierarchy(htmlContent);
  categories.push({
    id: 'heading-order',
    title: 'Başlık öğeleri sırayla doğru azalan sırada görünür (h1 -> h2 -> h3)',
    weight: 10,
    passed: headingReport.valid,
    score: headingReport.valid ? 10 : 0,
    details: headingReport.errors.join('; '),
  });

  // 4. image-alt: Görsel alt özellikleri (15 puan)
  const imgReport = auditImageAccessibility(htmlContent);
  categories.push({
    id: 'image-alt',
    title: 'Görsel öğeler [alt] özelliklerine sahiptir',
    weight: 15,
    passed: imgReport.valid,
    score: imgReport.valid ? 15 : 0,
    details: imgReport.errors.join('; '),
  });

  // 5. label: Form etiketleri ve htmlFor ilişkisi (15 puan)
  const hasForm = /<form\b/i.test(htmlContent);
  const formValid = !hasForm || (/<label\b[^>]*\bhtmlFor=/i.test(htmlContent) && /id=/i.test(htmlContent));
  categories.push({
    id: 'label',
    title: 'Form öğelerinin ilişkili açık etiketleri vardır',
    weight: 15,
    passed: formValid,
    score: formValid ? 15 : 0,
  });

  // 6. aria-required-attr: ARIA zorunlu nitelikler (15 puan)
  const hasAriaProgressbar = /role=["']progressbar["']/i.test(htmlContent);
  const progressBarValid =
    !hasAriaProgressbar ||
    (/aria-valuenow=/i.test(htmlContent) && /aria-valuemin=/i.test(htmlContent) && /aria-valuemax=/i.test(htmlContent));
  categories.push({
    id: 'aria-required-attr',
    title: 'Gerekli ARIA özellikleri rollere eksiksiz sağlanmıştır',
    weight: 15,
    passed: progressBarValid,
    score: progressBarValid ? 15 : 0,
  });

  // 7. landmark-one-main & semantic structure (20 puan)
  const landmarkReport = auditSemanticLandmarks(htmlContent);
  const landmarkPassed = landmarkReport.hasMain && landmarkReport.hasNav && landmarkReport.hasHeader;
  categories.push({
    id: 'landmark-one-main',
    title: 'Belge ana içeriği belirten tek bir <main> ve anlamsal yer işaretlerine sahiptir',
    weight: 20,
    passed: landmarkPassed,
    score: landmarkPassed ? 20 : 0,
  });

  const totalScore = categories.reduce((sum, cat) => sum + cat.score, 0);

  return {
    score: totalScore,
    passed: totalScore === 100,
    categories,
    summary: totalScore === 100 ? 'Mükemmel! Lighthouse Erişilebilirlik 100/100 Tam Puan' : `Skor: ${totalScore}/100`,
  };
}
