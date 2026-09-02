import { prisma } from '@/lib/prisma';

export interface EntitySummary {
  id: string;
  name: string;
  slug?: string;
}

/**
 * Faz 182: N+1 Veritabanı Sorgularını Çözen Evrensel Batch Loader
 * İlişkisel sorguları döngü içinde tek tek sorgulamak yerine (N+1),
 * benzersiz ID'leri toplayıp tek bir `findMany({ where: { id: { in: ids } } })`
 * sorgusuyla O(1) Map olarak döndürür.
 */
export async function batchLoadByIds<T, K extends string | number>(
  ids: K[],
  fetcher: (uniqueIds: K[]) => Promise<T[]>,
  idKey: keyof T
): Promise<Map<K, T>> {
  const map = new Map<K, T>();
  const uniqueIds = Array.from(new Set(ids.filter(Boolean)));

  if (uniqueIds.length === 0) {
    return map;
  }

  const records = await fetcher(uniqueIds);
  for (const record of records) {
    const key = record[idKey] as unknown as K;
    if (key !== undefined && key !== null) {
      map.set(key, record);
    }
  }

  return map;
}

/**
 * Kategoriler için N+1 engelleyici toplu yükleyici
 */
export async function batchLoadCategories(categoryIds: string[]): Promise<Map<string, EntitySummary>> {
  return batchLoadByIds(
    categoryIds,
    async (ids) => {
      return prisma.category.findMany({
        where: { id: { in: ids } },
        select: { id: true, name: true, slug: true },
      });
    },
    'id'
  );
}

/**
 * Yazarlar için N+1 engelleyici toplu yükleyici
 */
export async function batchLoadAuthors(authorIds: string[]): Promise<Map<string, EntitySummary>> {
  return batchLoadByIds(
    authorIds,
    async (ids) => {
      return prisma.author.findMany({
        where: { id: { in: ids } },
        select: { id: true, name: true, slug: true },
      });
    },
    'id'
  );
}
