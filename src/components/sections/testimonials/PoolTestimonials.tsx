import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_pool_q1",
    author: "Hakan Yılmaz",
    role: "testi_pool_r1",
    project: "Aqua Palace"
  },
  {
    quote: "testi_pool_q2",
    author: "Aslı Demir",
    role: "testi_pool_r2",
    project: "MyWorld Europe"
  },
  {
    quote: "testi_pool_q3",
    author: "Selim Çetin",
    role: "testi_pool_r3",
    project: "Bosphorus City"
  }
];

Object.freeze(TESTIMONIALS);

export default function PoolTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_pool_title"
      descKey="testi_pool_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
