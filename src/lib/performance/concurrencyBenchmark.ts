export interface BenchmarkResult {
  totalRequests: number;
  concurrency: number;
  successCount: number;
  failureCount: number;
  totalDurationMs: number;
  requestsPerSecond: number;
  averageLatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  stable: boolean;
}

/**
 * Faz 243: Yüksek Eşzamanlı İstek Simülasyonu & API Yanıt Süresi Benchmark Motoru
 */
export async function simulateConcurrentRequests<T>(
  task: () => Promise<T>,
  concurrency: number = 20,
  totalRequests: number = 60
): Promise<BenchmarkResult> {
  const latencies: number[] = [];
  let successCount = 0;
  let failureCount = 0;

  const startTime = performance.now();
  let remainingRequests = totalRequests;

  async function worker() {
    while (remainingRequests > 0) {
      remainingRequests--;
      const taskStart = performance.now();
      try {
        await task();
        const latency = performance.now() - taskStart;
        latencies.push(latency);
        successCount++;
      } catch {
        const latency = performance.now() - taskStart;
        latencies.push(latency);
        failureCount++;
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, totalRequests) }, () => worker());
  await Promise.all(workers);

  const totalDurationMs = performance.now() - startTime;
  latencies.sort((a, b) => a - b);

  const averageLatencyMs = latencies.length > 0
    ? Math.round((latencies.reduce((sum, l) => sum + l, 0) / latencies.length) * 100) / 100
    : 0;

  const p95Index = Math.floor(latencies.length * 0.95);
  const p99Index = Math.floor(latencies.length * 0.99);

  const p95LatencyMs = latencies[p95Index] ? Math.round(latencies[p95Index] * 100) / 100 : 0;
  const p99LatencyMs = latencies[p99Index] ? Math.round(latencies[p99Index] * 100) / 100 : 0;

  const requestsPerSecond = totalDurationMs > 0
    ? Math.round((totalRequests / (totalDurationMs / 1000)) * 10) / 10
    : 0;

  const stable = failureCount === 0 && p95LatencyMs < 500;

  return {
    totalRequests,
    concurrency,
    successCount,
    failureCount,
    totalDurationMs: Math.round(totalDurationMs * 100) / 100,
    requestsPerSecond,
    averageLatencyMs,
    p95LatencyMs,
    p99LatencyMs,
    stable,
  };
}
