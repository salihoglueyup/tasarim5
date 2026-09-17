import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_legal_q1",
    author: "Kemal Yücel",
    role: "testi_legal_r1",
    project: "Nidapark"
  },
  {
    quote: "testi_legal_q2",
    author: "Ayşe Çoban",
    role: "testi_legal_r2",
    project: "Sur Yapı Metropol"
  },
  {
    quote: "testi_legal_q3",
    author: "Fatih Kaya",
    role: "testi_legal_r3",
    project: "Viaport Houses"
  }
];

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
