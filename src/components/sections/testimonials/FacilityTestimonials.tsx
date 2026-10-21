import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function FacilityTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_dues_title"
      descKey="testi_dues_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
