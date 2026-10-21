import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function DuesTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_fac_title"
      descKey="testi_fac_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
