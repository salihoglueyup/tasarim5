import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function LegalTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_legal_title"
      descKey="testi_legal_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
