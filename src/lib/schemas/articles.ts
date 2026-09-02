import type { JsonLdObject } from './constants';
import { ORG_ID, ORG_NAME, ORG_LOGO, BASE_URL, abs } from './constants';

export function personSchema(opts: {
  name: string;
  jobTitle: string;
  image?: string;
  sameAs?: string[];
}): JsonLdObject {
  return {
    '@type': 'Person',
    name: opts.name,
    jobTitle: opts.jobTitle,
    worksFor: { '@id': ORG_ID },
    ...(opts.image ? { image: abs(opts.image) } : {}),
    ...(opts.sameAs && opts.sameAs.length ? { sameAs: opts.sameAs } : {}),
  };
}

// ---------------------------------------------------------------------------
// Faz 54 — VideoObject
// ---------------------------------------------------------------------------

export function blogPostingSchema(opts: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  /** E-E-A-T için zengin yazar bilgisi (Faz 30/94). */
  author?: { 
    name: string; 
    jobTitle?: string; 
    url?: string;
    alumniOf?: { name: string; sameAs?: string }[];
    knowsAbout?: string[];
  };
  section?: string;
  keywords?: string[];
  timeRequired?: string;
  wordCount?: number;
  articleBody?: string;
  about?: { name: string; sameAs?: string }[];
  mentions?: { name: string; sameAs?: string }[];
}): JsonLdObject {
  const url = abs(opts.path);
  const author = opts.author
    ? {
        '@type': 'Person',
        name: opts.author.name,
        ...(opts.author.jobTitle ? { jobTitle: opts.author.jobTitle } : {}),
        ...(opts.author.url ? { url: abs(opts.author.url) } : {}),
        ...(opts.author.alumniOf ? {
          alumniOf: opts.author.alumniOf.map(school => ({
            '@type': 'CollegeOrUniversity',
            name: school.name,
            ...(school.sameAs ? { sameAs: school.sameAs } : {})
          }))
        } : {}),
        ...(opts.author.knowsAbout ? { knowsAbout: opts.author.knowsAbout } : {})
      }
    : { '@type': 'Person', name: opts.authorName ?? `${ORG_NAME} Editör Ekibi` };
  return {
    '@type': 'BlogPosting',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    ...(opts.image ? { image: abs(opts.image) } : {}),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    ...(opts.section ? { articleSection: opts.section } : {}),
    ...(opts.keywords && opts.keywords.length ? { keywords: opts.keywords.join(', ') } : {}),
    ...(opts.timeRequired ? { timeRequired: opts.timeRequired } : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    ...(opts.articleBody ? { articleBody: opts.articleBody } : {}),
    ...(opts.about && opts.about.length ? {
      about: opts.about.map(a => ({
        '@type': 'Thing',
        name: a.name,
        ...(a.sameAs ? { sameAs: a.sameAs } : {})
      }))
    } : {}),
    ...(opts.mentions && opts.mentions.length ? {
      mentions: opts.mentions.map(m => ({
        '@type': 'Thing',
        name: m.name,
        ...(m.sameAs ? { sameAs: m.sameAs } : {})
      }))
    } : {}),
    author,
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG_NAME,
      logo: {
        '@type': 'ImageObject',
        url: ORG_LOGO,
        contentLocation: { '@type': 'Place', name: 'İstanbul, Türkiye' }
      }
    },
  };
}

// ---------------------------------------------------------------------------
// Faz 57/59 — WebPage (+ speakable) her sayfa tipi için
// ---------------------------------------------------------------------------

export function authorPersonSchema(author: {
  slug: string;
  name: string;
  bio?: string | null;
  avatar?: string | null;
}): JsonLdObject {
  return {
    '@type': 'Person',
    '@id': `${BASE_URL}/blog/yazar/${author.slug}#person`,
    name: author.name,
    url: abs(`/blog/yazar/${author.slug}`),
    jobTitle: 'Kıdemli Tesis Yönetimi Uzmanı',
    worksFor: { '@id': ORG_ID },
    knowsAbout: [
      'Tesis Yönetimi',
      'KMK 634 Kat Mülkiyeti Kanunu',
      'ISO 41001 Entegre Tesis Yönetimi',
      'Aidat Yönetimi ve İcra Takibi',
      'Site Güvenliği (5188)',
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'İstanbul Üniversitesi',
        sameAs: 'https://tr.wikipedia.org/wiki/%C4%B0stanbul_%C3%9Cniversitesi',
      },
    ],
    ...(author.bio ? { description: author.bio } : {}),
    ...(author.avatar
      ? { image: { '@type': 'ImageObject', url: author.avatar } }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// CaseStudy — Vaka Çalışması İçerik Şeması (Faz 6B E-E-A-T)
// ---------------------------------------------------------------------------
