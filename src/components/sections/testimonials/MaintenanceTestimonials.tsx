import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

// Uydurma yorumlar kaldırıldı; gerçek referanslar ReferenceBand ile gösterilir (src/data/realReferences.ts).
const TESTIMONIALS: ServiceTestimonialItem[] = [];

Object.freeze(TESTIMONIALS);

export default function MaintenanceTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_maint_title"
      descKey="testi_maint_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
