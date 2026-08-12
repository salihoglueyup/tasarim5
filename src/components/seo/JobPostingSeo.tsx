"use client";

import JsonLd from './JsonLd';

interface JobPostingSeoProps {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string | string[]; // "FULL_TIME", "PART_TIME", "CONTRACTOR", "TEMPORARY", "INTERN", "VOLUNTEER", "PER_DIEM", "OTHER"
  hiringOrganizationName?: string;
  hiringOrganizationUrl?: string;
  hiringOrganizationLogo?: string;
  jobLocation: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  baseSalary?: {
    currency: string;
    value: number;
    unitText: string; // "HOUR", "DAY", "WEEK", "MONTH", "YEAR"
  };
}

/**
 * SEO Faz 12: İstihdam Köprüsü için JobPosting Şeması
 * Google İş İlanları (Google Jobs) arama sonuçlarında çıkmayı sağlar.
 */
export default function JobPostingSeo({
  title,
  description,
  datePosted,
  validThrough,
  employmentType = "FULL_TIME",
  hiringOrganizationName = "Alo Yönetim",
  hiringOrganizationUrl = "https://aloyonetim.com",
  hiringOrganizationLogo = "https://aloyonetim.com/logo.png",
  jobLocation,
  baseSalary
}: JobPostingSeoProps) {
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: hiringOrganizationName,
      sameAs: hiringOrganizationUrl,
      logo: hiringOrganizationLogo
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: jobLocation.streetAddress,
        addressLocality: jobLocation.addressLocality,
        addressRegion: jobLocation.addressRegion,
        postalCode: jobLocation.postalCode,
        addressCountry: jobLocation.addressCountry
      }
    }
  };

  if (validThrough) {
    schema.validThrough = validThrough;
  }

  if (baseSalary) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: baseSalary.currency,
      value: {
        '@type': 'QuantitativeValue',
        value: baseSalary.value,
        unitText: baseSalary.unitText
      }
    };
  }

  return <JsonLd data={schema} />;
}
