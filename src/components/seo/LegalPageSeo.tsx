import React from 'react';
import JsonLd from './JsonLd';
import { webPageSchema, graph } from '@/lib/schemas';

interface LegalPageSeoProps {
  title: string;
  description: string;
  path: string;
}

export default function LegalPageSeo({ title, description, path }: LegalPageSeoProps) {
  const schema = graph(
    webPageSchema({
      type: 'WebPage',
      name: title,
      description,
      path,
    })
  );

  return <JsonLd data={schema} />;
}
