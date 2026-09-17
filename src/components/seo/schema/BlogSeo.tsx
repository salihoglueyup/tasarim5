import React from 'react';
import JsonLd from '@/components/seo/JsonLd';
import { BASE_URL } from '@/lib/seo';
import { ORG_ID, ORG_NAME } from '@/lib/schemas';

export interface BlogSeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorSlug?: string;
  authorBio?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
  readTimeMinutes?: number;
  articleBodySummary?: string;
  speakableSelectors?: string[];
  isTechnical?: boolean;
}

/**
 * Blog Yazıları İçin Gelişmiş Schema.org BlogPosting / TechArticle Yapılandırılmış Veri Bileşeni.
 */
export default function BlogSeo({
  title,
  description,
  path,
  image = '/images/hero-poster-v5.webp',
  datePublished,
  dateModified,
  authorName = 'Alo Yönetim Tesis Yönetimi Kurulu',
  authorSlug,
  category = 'Tesis Yönetimi',
  tags = ['tesis yönetimi', 'site yönetimi', 'apartman yönetimi'],
  wordCount = 800,
  readTimeMinutes = 4,
  articleBodySummary,
  speakableSelectors = ['h1', '.tldr', 'article p'],
  isTechnical = false,
}: BlogSeoProps) {
  const fullUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? image : `/${image}`}`;
  const modifiedDate = dateModified || datePublished;

  const schema = {
    '@context': 'https://schema.org',
    '@type': isTechnical ? 'TechArticle' : 'BlogPosting',
    '@id': `${fullUrl}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    headline: title,
    description: description,
    image: [fullImageUrl],
    datePublished,
    dateModified: modifiedDate,
    inLanguage: 'tr-TR',
    wordCount,
    timeRequired: `PT${readTimeMinutes}M`,
    articleSection: category,
    keywords: Array.from(new Set(['tesis yönetimi', ...tags])).join(', '),
    ...(articleBodySummary ? { articleBody: articleBodySummary } : {}),
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: 'Kıdemli Tesis ve Mülk Yönetimi Uzmanı',
      url: authorSlug ? `${BASE_URL}/blog/yazar/${authorSlug}` : `${BASE_URL}/hakkimizda`,
      worksFor: {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: ORG_NAME,
      },
      knowsAbout: [
        'Tesis Yönetimi',
        '634 Sayılı Kat Mülkiyeti Kanunu',
        'Site Güvenliği ve 5188 Sayılı Kanun',
        'Bina Teknik Bakımı',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.png`,
      },
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Tesis Yönetimi',
        sameAs: 'https://www.wikidata.org/wiki/Q1391515',
      },
      {
        '@type': 'Thing',
        name: 'Kat Mülkiyeti Kanunu',
        sameAs: 'https://www.wikidata.org/wiki/Q161851',
      },
      {
        '@type': 'Thing',
        name: 'Mülk Yönetimi',
        sameAs: 'https://www.wikidata.org/wiki/Q1758229',
      },
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: speakableSelectors,
    },
  };

  return <JsonLd data={schema} />;
}
