import JsonLd from './JsonLd';

interface BlogFAQExtractorProps {
  htmlContent: string;
}

export default function BlogFAQExtractor({ htmlContent }: BlogFAQExtractorProps) {
  if (!htmlContent) return null;

  // H2 veya H3 etiketi içinde soru işareti (?) ile biten başlıkları ve 
  // hemen ardındaki <p> etiketini yakalayan Regex.
  const regex = /<h[23][^>]*>(.*?\?)<\/h[23]>[\s\S]*?<p[^>]*>(.*?)<\/p>/gi;
  
  const faqs = [];
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    // HTML tag'lerini temizleyelim
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  if (faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}
