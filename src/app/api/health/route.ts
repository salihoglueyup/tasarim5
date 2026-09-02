import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export const dynamic = 'force-dynamic';

/**
 * Faz 195: Uptime & SLA Standartlarına Uygun Sağlık Denetimi (/api/health)
 * RFC 8485 Sağlık Kontrolü Standartları ile %99.9 SLA İzleme
 */
export async function GET() {
  const startTime = performance.now();
  let postgresStatus = 'unknown';
  let redisStatus = 'unknown';
  let isHealthy = true;

  // 1. PostgreSQL Sağlık Kontrolü (Kritik Hizmet)
  try {
    await prisma.$queryRaw`SELECT 1`;
    postgresStatus = 'connected';
  } catch (error) {
    postgresStatus = 'error';
    isHealthy = false;
    console.error('Health Check: PostgreSQL connection error:', error);
  }

  // 2. Redis Sağlık Kontrolü (Önbellek & Rate Limit)
  try {
    if (redis && redis.status === 'ready') {
      const pingResult = await redis.ping();
      redisStatus = pingResult === 'PONG' ? 'connected' : 'degraded';
    } else {
      redisStatus = 'degraded_in_memory';
    }
  } catch (error) {
    redisStatus = 'degraded';
    console.warn('Health Check: Redis fallback warning:', error);
  }

  const durationMs = Math.round((performance.now() - startTime) * 100) / 100;
  const memoryUsage = process.memoryUsage();
  const heapUsedMb = Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100;

  // RFC 8485 SLA Uyumluluk Formatı
  const overallStatus = isHealthy
    ? (redisStatus === 'connected' ? 'pass' : 'warn')
    : 'fail';

  const responsePayload = {
    status: overallStatus,
    healthy: isHealthy,
    version: '2026.1',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    sla: {
      tier: 'Tier-3 Facility Management Cloud',
      targetUptime: '99.9%',
      status: isHealthy ? 'OPERATIONAL' : 'DEGRADED',
    },
    services: {
      database: {
        type: 'postgresql',
        status: postgresStatus === 'connected' ? 'pass' : 'fail',
        state: postgresStatus,
      },
      cache: {
        type: 'redis',
        status: redisStatus === 'connected' ? 'pass' : 'warn',
        state: redisStatus,
      },
      system: {
        heapUsedMb,
        status: heapUsedMb < 1024 ? 'pass' : 'warn',
      },
    },
    latencyMs: durationMs,
  };

  return NextResponse.json(responsePayload, {
    status: isHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-SLA-Status': isHealthy ? 'OPERATIONAL' : 'DEGRADED',
    },
  });
}
