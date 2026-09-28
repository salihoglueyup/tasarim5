/**
 * Puan/yorum işaretlemesi ve yıldız arayüzü KALDIRILDI.
 *
 * Eski sürüm sayfada gerçek yorumlarla desteklenmeyen (4.9 / 340 yorum gibi) bir AggregateRating şeması ve
 * yıldız arayüzü basıyordu. Kuruluşun kendi sayfasına kendi verdiği puanlar Google'ın yapılandırılmış veri
 * kurallarına aykırıdır ve yanıltıcıdır. Gerçek, sayfada görünen müşteri yorumları toplandığında
 * Review/AggregateRating yeniden ve yorumlarla birlikte eklenmelidir.
 *
 * Bu bileşen, mevcut çağrı noktalarının derlenmesi için imzasını korur ve hiçbir şey çizmez.
 */
export interface AggregateRatingProps {
  itemReviewed?: { '@type': string; name: string };
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
  showUI?: boolean;
  className?: string;
}

export default function AggregateRatingSeo(_props: AggregateRatingProps) {
  return null;
}
