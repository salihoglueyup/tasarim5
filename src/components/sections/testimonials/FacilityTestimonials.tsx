import ServiceTestimonialsShared, { ServiceTestimonialItem } from './ServiceTestimonialsShared';

const TESTIMONIALS: ServiceTestimonialItem[] = [
  {
    quote: "testi_facility_q1",
    author: "Mehmet Kılıç",
    role: "testi_facility_r1",
    project: "Aqua City Konutları"
  },
  {
    quote: "testi_facility_q2",
    author: "Ayşe Yılmaz",
    role: "testi_facility_r2",
    project: "Blue Lake Evleri"
  },
  {
    quote: "testi_facility_q3",
    author: "Burak Taşcı",
    role: "testi_facility_r3",
    project: "Metropol İş Merkezi"
  }
];

Object.freeze(TESTIMONIALS);

export default function FacilityTestimonials() {
  return (
    <ServiceTestimonialsShared
      titleKey="testi_dues_title"
      descKey="testi_dues_desc"
      testimonials={TESTIMONIALS}
    />
  );
}
