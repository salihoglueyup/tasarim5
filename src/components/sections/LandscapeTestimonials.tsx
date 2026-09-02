import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_landscape_q1",
    author: "Murat Çelik",
    role: "testi_landscape_r1",
    project: "Yeşilvadi Konakları"
  },
  {
    quote: "testi_landscape_q2",
    author: "Sevim Aras",
    role: "testi_landscape_r2",
    project: "Botanica Evleri"
  },
  {
    quote: "testi_landscape_q3",
    author: "Oğuzhan Kaya",
    role: "testi_landscape_r3",
    project: "Gölpark Evleri"
  }
];

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
