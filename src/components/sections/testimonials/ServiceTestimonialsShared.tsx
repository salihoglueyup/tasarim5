"use client";

import ReferenceBand from '@/components/sections/references/ReferenceBand';

export interface ServiceTestimonialItem {
  quote: string;
  author: string;
  role: string;
  project: string;
}

export interface ServiceTestimonialsSharedProps {
  titleKey: string;
  descKey: string;
  testimonials: ServiceTestimonialItem[];
}

/**
 * Hizmet sayfalarındaki "müşteri yorumları" bölümü.
 * Önceki sürümde gösterilen uydurma yorumlar (ve onlardan üretilen Review şeması) kaldırıldı;
 * yerine src/data/realReferences.ts içindeki gerçek referanslardan kısa bir şerit gösterilir.
 * Props geriye dönük uyumluluk için korunur ve kullanılmaz.
 */
export default function ServiceTestimonialsShared(_props: ServiceTestimonialsSharedProps) {
  return <ReferenceBand limit={4} />;
}
