"use client";

import JsonLd from './JsonLd';
import { reviewsWithRating } from '@/lib/schemas';
import { useLanguage } from '@/context/LanguageContext';

export interface ReviewInput {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

export default function ReviewListSeo({ reviews, ratingValue = "4.9" }: { reviews: ReviewInput[], ratingValue?: string }) {
  const schema = reviewsWithRating({ reviews, ratingValue });
  return <JsonLd data={schema} />;
}
