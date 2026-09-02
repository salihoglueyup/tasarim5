import type { JsonLdObject } from './constants';

export function faqPageSchema(items: { question?: string; answer?: string; q?: string; a?: string }[]): JsonLdObject {
  const validItems = (items || [])
    .map((i) => ({
      question: (i.question || i.q || '').trim(),
      answer: (i.answer || i.a || '').trim(),
    }))
    .filter((i) => i.question.length > 0 && i.answer.length > 0);

  return {
    '@type': 'FAQPage',
    mainEntity: validItems.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: i.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// Faz 49 — HowTo
// ---------------------------------------------------------------------------
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): JsonLdObject {
  return {
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
