import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function PoolTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_pool_title"
      descKey="testi_pool_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
