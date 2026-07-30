import { prisma } from '@/lib/prisma';
import SectoralClient from './SectoralClient';

export default async function SektorelCozumlerPage() {
  const dbSolutions = await prisma.sectoralSolution.findMany({
    where: { published: true },
    orderBy: { order: 'asc' }
  });

  return (
    <SectoralClient dbSolutions={dbSolutions} />
  );
}
