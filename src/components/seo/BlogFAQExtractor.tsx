import JsonLd from './JsonLd';
import { faqPageSchema } from '@/lib/schemas';

interface BlogFAQExtractorProps {
  htmlContent: string;
}

/**
 * Blog Gövdesinden Dinamik SSS (FAQPage) Çıkarıcı
 * 
 * Makale içindeki soru başlıklarını (H2/H3 ?) ve takip eden paragrafları
 * tespit ederek Google Zengin Sonuçlar uyumlu FAQPage şemasına dönüştürür.
 * Geçersiz/boş soru-cevap durumunda null dönerek GSC uyarılarını engeller.
 */
export default function BlogFAQExtractor({ htmlContent }: BlogFAQExtractorProps) {
  if (!htmlContent) return null;

  // H2 veya H3 etiketi içinde soru işareti (?) ile biten başlıkları ve 
  // hemen ardındaki <p> etiketini yakalayan Regex.
  const regex = /<h[23][^>]*>(.*?\?)<\/h[23]>[\s\S]*?<p[^>]*>(.*?)<\/p>/gi;
  
  const faqs: { question: string; answer: string }[] = [];
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    // HTML tag'lerini temizleyelim
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  const schema = faqPageSchema(faqs);
  if (!schema) return null;

  return <JsonLd data={schema} />;
}
