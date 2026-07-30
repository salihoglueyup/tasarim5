import { prisma } from '@/lib/prisma';
import BasariHikayeleriClient from './BasariHikayeleriClient';

export default async function BasariHikayeleriPage() {
  const stories = await prisma.reference.findMany({
    where: {
      isSuccessStory: true,
      published: true
    },
    orderBy: { order: 'asc' }
  });

  return (
    <BasariHikayeleriClient stories={stories} />
  );
}
