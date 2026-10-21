import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function CleaningTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_clean_title"
      descKey="testi_clean_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
