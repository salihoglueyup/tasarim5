import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { batchLoadByIds } from '../data/batchLoader';
import { safeRedisGet, safeRedisSet, safeRedisRemember, isRedisAvailable } from '../redis';

describe('Wave 8: Faz 181 - Faz 185 Veritabanı İndeksleri, N+1 Önleme, Connection Pool, Redis Fallback & CSP', () => {
  it('Faz 181: schema.prisma üzerinde Post, Faq, Reference ve Lead modellerinde composite index tanımları bulunur', () => {
    const schemaPath = path.resolve(process.cwd(), 'prisma/schema.prisma');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    expect(schemaContent).toContain('@@index([published, datePublished(sort: Desc)])');
    expect(schemaContent).toContain('@@index([categoryId, published])');
    expect(schemaContent).toContain('@@index([authorId, published])');
    expect(schemaContent).toContain('@@index([category, order])');
    expect(schemaContent).toContain('@@index([published, order])');
    expect(schemaContent).toContain('@@index([type, createdAt(sort: Desc)])');
  });

  it('Faz 182: batchLoadByIds N+1 sorgularını engelleyip tek seferde O(1) harita üretir', async () => {
    const mockFetcher = vi.fn(async (ids: string[]) => {
      return ids.map((id) => ({ id, name: `Kategori ${id}` }));
    });

    const categoryIds = ['cat1', 'cat2', 'cat1', 'cat3'];
    const map = await batchLoadByIds(categoryIds, mockFetcher, 'id');

    // Tek bir veritabanı sorgusu çağrılmış olmalı
    expect(mockFetcher).toHaveBeenCalledTimes(1);
    // Yinelenen ID'ler temizlenmiş olmalı (cat1 tekilleştirildi)
    expect(mockFetcher).toHaveBeenCalledWith(['cat1', 'cat2', 'cat3']);

    expect(map.size).toBe(3);
    expect(map.get('cat1')?.name).toBe('Kategori cat1');
    expect(map.get('cat2')?.name).toBe('Kategori cat2');
  });

  it('Faz 183: prisma.ts dosyasında PG Pool max: 10 ve global memoization ile yapılandırılmıştır', () => {
    const prismaFilePath = path.resolve(process.cwd(), 'src/lib/prisma.ts');
    const prismaContent = fs.readFileSync(prismaFilePath, 'utf-8');

    expect(prismaContent).toContain('max: 10');
    expect(prismaContent).toContain('idleTimeoutMillis: 30000');
    expect(prismaContent).toContain('connectionTimeoutMillis: 5000');
    expect(prismaContent).toContain('globalForPrisma.pool');
  });

  it('Faz 184: Redis fonksiyonları bağlantı kopsa dahi güvenle çalışır ve çökme üretmez', async () => {
    // Redis test ortamında kapalı/yetkisiz olsa bile fonksiyonlar hata fırlatmamalı
    const getResult = await safeRedisGet('non_existent_key');
    expect(getResult === null || getResult !== undefined).toBe(true);

    const setResult = await safeRedisSet('test_key', { a: 1 }, 10);
    expect(typeof setResult).toBe('boolean');

    // safeRedisRemember fallback testi
    const fallbackFn = vi.fn(async () => ({ success: true, fromFallback: true }));
    const data = await safeRedisRemember('test_fallback_key', 60, fallbackFn);
    expect(data.fromFallback).toBe(true);
  });

  it('Faz 185: next.config.ts sıkılaştırılmış Content-Security-Policy (CSP) direktiflerini içerir', () => {
    const nextConfigPath = path.resolve(process.cwd(), 'next.config.ts');
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');

    expect(nextConfigContent).toContain('Content-Security-Policy');
    expect(nextConfigContent).toContain("manifest-src 'self'");
    expect(nextConfigContent).toContain("media-src 'self' blob: data:");
    expect(nextConfigContent).toContain("child-src 'self'");
    expect(nextConfigContent).toContain("frame-ancestors 'none'");
    expect(nextConfigContent).toContain("object-src 'none'");
  });
});
