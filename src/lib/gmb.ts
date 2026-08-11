import redis from '@/lib/redis';
import { RatingInput } from './schemas';

export async function getGMBRating(): Promise<RatingInput> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

  const defaultRating: RatingInput = { ratingValue: '4.9', reviewCount: '150' };

  if (!apiKey || !placeId) {
    return defaultRating;
  }

  const cacheKey = `gmb_reviews_${placeId}`;
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const data = JSON.parse(cached);
      if (data.ratingValue && data.reviewCount) {
        return { ratingValue: data.ratingValue, reviewCount: data.reviewCount };
      }
    }
  } catch (err) {
    console.warn('Redis cache error for GMB reviews:', err);
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    
    if (res.ok) {
      const data = await res.json();
      if (data.result && data.result.rating && data.result.user_ratings_total) {
        const payload = {
          ratingValue: data.result.rating.toString(),
          reviewCount: data.result.user_ratings_total.toString(),
        };
        try {
          await redis.setex(cacheKey, 86400, JSON.stringify(payload));
        } catch (err) {
          // ignore redis set errors
        }
        return payload;
      }
    }
  } catch (error) {
    console.warn('Error fetching Google Places data:', error);
  }

  return defaultRating;
}
