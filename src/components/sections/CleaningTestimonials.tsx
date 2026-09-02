import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_cleaning_q1",
    author: "Hülya Yücel",
    role: "testi_cleaning_r1",
    project: "Nidapark Evleri"
  },
  {
    quote: "testi_cleaning_q2",
    author: "Kaan Arslan",
    role: "testi_cleaning_r2",
    project: "Vadi İstanbul"
  },
  {
    quote: "testi_cleaning_q3",
    author: "Elif Demirtaş",
    role: "testi_cleaning_r3",
    project: "Elite Plaza"
  }
];

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
