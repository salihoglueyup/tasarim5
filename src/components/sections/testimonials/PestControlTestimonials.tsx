import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_pestcontrol_q1",
    author: "Canan Özbey",
    role: "testi_pestcontrol_r1",
    project: "Koru Florya"
  },
  {
    quote: "testi_pestcontrol_q2",
    author: "Ercan Şahin",
    role: "testi_pestcontrol_r2",
    project: "Mall of İstanbul"
  },
  {
    quote: "testi_pestcontrol_q3",
    author: "Pelin Vural",
    role: "testi_pestcontrol_r3",
    project: "Zorlu Center"
  }
];

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
