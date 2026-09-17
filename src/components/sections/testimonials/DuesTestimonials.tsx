import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_dues_q1",
    author: "Mehmet Çınar",
    role: "testi_dues_r1",
    project: "Vadi İstanbul Evleri"
  },
  {
    quote: "testi_dues_q2",
    author: "Sibel Korkmaz",
    role: "testi_dues_r2",
    project: "Folkart Towers"
  },
  {
    quote: "testi_dues_q3",
    author: "Hasan Yılmaz",
    role: "testi_dues_r3",
    project: "Bosphorus City"
  }
];

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
