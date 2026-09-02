export const DEFAULT_SLOW_QUERY_THRESHOLD_MS = 150; // 150ms üzeri yavaş sorgu kabul edilir

export interface SlowQueryRecord {
  id: string;
  query: string;
  durationMs: number;
  timestamp: string;
  thresholdMs: number;
  exceededByMs: number;
}

class SlowQueryRegistry {
  private slowQueries: SlowQueryRecord[] = [];
  private readonly maxRecords = 100;

  /**
   * Faz 238: Canlıda Yavaş Sorguları (Slow Queries) Kaydetme ve İzleme
   */
  public recordIfSlow(query: string, durationMs: number, thresholdMs: number = DEFAULT_SLOW_QUERY_THRESHOLD_MS): boolean {
    if (durationMs >= thresholdMs) {
      const record: SlowQueryRecord = {
        id: `sq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        query: query.length > 200 ? query.slice(0, 200) + '...' : query,
        durationMs: Math.round(durationMs * 100) / 100,
        timestamp: new Date().toISOString(),
        thresholdMs,
        exceededByMs: Math.round((durationMs - thresholdMs) * 100) / 100,
      };

      this.slowQueries.unshift(record);
      if (this.slowQueries.length > this.maxRecords) {
        this.slowQueries.pop();
      }

      console.warn(`⚠️ [Slow Query Monitor] Yavaş Sorgu Tespit Edildi: "${record.query}" -> ${record.durationMs}ms (Eşik: ${thresholdMs}ms)`);
      return true;
    }

    return false;
  }

  public getSlowQueries(): SlowQueryRecord[] {
    return [...this.slowQueries];
  }

  public getStats() {
    const total = this.slowQueries.length;
    const avgDuration = total > 0
      ? Math.round((this.slowQueries.reduce((sum, q) => sum + q.durationMs, 0) / total) * 100) / 100
      : 0;

    return {
      totalRecorded: total,
      averageDurationMs: avgDuration,
      thresholdMs: DEFAULT_SLOW_QUERY_THRESHOLD_MS,
    };
  }

  public clear() {
    this.slowQueries = [];
  }
}

export const slowQueryMonitor = new SlowQueryRegistry();
