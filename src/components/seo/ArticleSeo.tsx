"use client";

import JsonLd from './JsonLd';

interface ArticleSeoProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  publisherName?: string;
  publisherLogo?: string;
  isBlog?: boolean;
}

/**
 * SEO Faz 11: Makale & Blog Gönderisi SEO Zenginleştirmesi
 * Google Discover (Keşfet) ve Google Haberler (News) görünürlüğünü tetikler.
 */
export default function ArticleSeo({
  title,
  description,
  url,
  image = "https://aloyonetim.com/images/default-blog.jpg",
  datePublished,
  dateModified,
  authorName = "Alo Yönetim Ekibi",
  authorUrl = "https://aloyonetim.com/hakkimizda",
  publisherName = "Alo Yönetim",
  publisherLogo = "https://aloyonetim.com/logo.png",
  isBlog = true
}: ArticleSeoProps) {
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': isBlog ? 'BlogPosting' : 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo
      }
    }
  };

  return <JsonLd data={schema} />;
}
