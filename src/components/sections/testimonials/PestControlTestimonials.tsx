import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function PestControlTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_pest_title"
      descKey="testi_pest_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
