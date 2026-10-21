import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function LandscapeTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_land_title"
      descKey="testi_land_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
