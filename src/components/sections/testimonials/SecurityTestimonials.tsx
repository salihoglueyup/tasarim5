import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_security_q1",
    author: "Ahmet Yılmaz",
    role: "testi_security_r1",
    project: "Vadi İstanbul Konakları"
  },
  {
    quote: "testi_security_q2",
    author: "Zeynep Kaya",
    role: "testi_security_r2",
    project: "Plaza 34 İş Merkezi"
  },
  {
    quote: "testi_security_q3",
    author: "Caner Demir",
    role: "testi_security_r3",
    project: "Premium Rezidans"
  }
];

Object.freeze(TESTIMONIALS);

export default function SecurityTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_sec_title"
      descKey="testi_sec_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
