import type { JsonLdObject } from './constants';

export function faqPageSchema(items: { question: string; answer: string }[]): JsonLdObject {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
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
