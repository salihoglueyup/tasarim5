import JsonLd from './JsonLd';

type ItemListElement = {
  name: string;
  url: string;
  image?: string;
  description?: string;
};

interface ItemListSeoProps {
  items: ItemListElement[];
}

export default function ItemListSeo({ items }: ItemListSeoProps) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        name: item.name,
        url: item.url,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description }),
      }
    })),
  };

  return <JsonLd data={schema} />;
}
