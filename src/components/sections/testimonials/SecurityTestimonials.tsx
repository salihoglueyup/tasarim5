import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function SecurityTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_sec_title"
      descKey="testi_sec_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
