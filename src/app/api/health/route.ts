import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = performance.now();
  let postgresStatus = 'unknown';
  let redisStatus = 'unknown';
  let isHealthy = true;

  // 1. PostgreSQL Sağlık Kontrolü
  try {
    await prisma.$queryRaw`SELECT 1`;
    postgresStatus = 'connected';
  } catch (error) {
    postgresStatus = 'error';
    isHealthy = false;
    console.error('Health Check: PostgreSQL connection error:', error);
  }

  // 2. Redis Sağlık Kontrolü
  try {
    const pingResult = await redis.ping();
    redisStatus = pingResult === 'PONG' ? 'connected' : 'degraded';
  } catch (error) {
    redisStatus = 'error';
    // Redis optional/graceful fallback, so we keep isHealthy true if PG is alive, or degrade
    console.warn('Health Check: Redis connection warning:', error);
  }

  const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

  const responsePayload = {
    status: isHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    services: {
      postgres: postgresStatus,
      redis: redisStatus,
    },
    latencyMs: durationMs,
  };

  return NextResponse.json(responsePayload, {
    status: isHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
