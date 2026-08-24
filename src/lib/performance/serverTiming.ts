export interface ServerTimingEntry {
  name: string;
  duration?: number;
  description?: string;
}

/**
 * W3C Server-Timing standardında HTTP başlığı üreten hafif sınıf.
 * Googlebot ve Lighthouse'un sunucu işlem sürelerini (TTFB) milisaniye seviyesinde
 * doğrulamasına olanak tanır.
 */
export class ServerTimingBuilder {
  private timers: Map<string, number> = new Map();
  private entries: ServerTimingEntry[] = [];

  start(name: string): this {
    this.timers.set(name, performance.now());
    return this;
  }

  stop(name: string, description?: string): this {
    const startTime = this.timers.get(name);
    if (startTime !== undefined) {
      const duration = Math.round((performance.now() - startTime) * 100) / 100;
      this.entries.push({ name, duration, description });
      this.timers.delete(name);
    }
    return this;
  }

  add(name: string, opts: { duration?: number; description?: string } = {}): this {
    this.entries.push({
      name,
      duration: opts.duration,
      description: opts.description,
    });
    return this;
  }

  toHeader(): string {
    return this.entries
      .map((entry) => {
        const parts = [entry.name];
        if (entry.duration !== undefined) {
          parts.push(`dur=${entry.duration}`);
        }
        if (entry.description) {
          parts.push(`desc="${entry.description.replace(/"/g, "'")}"`);
        }
        return parts.join(';');
      })
      .join(', ');
  }

  applyToHeaders(headers: Headers): void {
    const headerValue = this.toHeader();
    if (headerValue) {
      headers.set('Server-Timing', headerValue);
    }
  }
}
