import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_maintenance_q1",
    author: "Kemal Sunar",
    role: "testi_maintenance_r1",
    project: "Bosphorus City"
  },
  {
    quote: "testi_maintenance_q2",
    author: "Zeynep Alkan",
    role: "testi_maintenance_r2",
    project: "Tema İstanbul"
  },
  {
    quote: "testi_maintenance_q3",
    author: "Cemil Özkan",
    role: "testi_maintenance_r3",
    project: "Trump Towers"
  }
];

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
