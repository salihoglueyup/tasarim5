export interface EndpointBenchmarkItem {
  url: string;
  statusCode: number;
  durationMs: number;
  meetsSla: boolean;
}

export interface EndpointBenchmarkReport {
  endpoints: EndpointBenchmarkItem[];
  allPassed: boolean;
  averageDurationMs: number;
}

/**
 * Faz 249: Canlı ve Yerel Uç Nokta Yanıt Sürelerini Ölçme & Benchmark
 */
export async function measureEndpointLatency(
  fetcher: (path: string) => Promise<{ status: number }>,
  paths: string[] = ['/', '/api/health', '/api/calculator', '/hizmetler/tesis-yonetimi'],
  slaThresholdMs: number = 500
): Promise<EndpointBenchmarkReport> {
  const items: EndpointBenchmarkItem[] = [];

  for (const path of paths) {
    const start = performance.now();
    let status = 200;
    try {
      const res = await fetcher(path);
      status = res.status;
    } catch {
      status = 500;
    }
    const duration = Math.round((performance.now() - start) * 100) / 100;

    items.push({
      url: path,
      statusCode: status,
      durationMs: duration,
      meetsSla: status < 400 && duration <= slaThresholdMs,
    });
  }

  const avg = items.length > 0
    ? Math.round((items.reduce((s, i) => s + i.durationMs, 0) / items.length) * 100) / 100
    : 0;

  return {
    endpoints: items,
    allPassed: items.every((i) => i.meetsSla),
    averageDurationMs: avg,
  };
}
