import { describe, it, expect } from 'vitest';
import { rateLimit } from './rate-limit';

describe('rateLimit', () => {
  it('pencere başına 5 isteğe izin verir, 6.yı reddeder', () => {
    const ip = 'test-ip-1';
    const now = 1_000_000;
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(ip, now)).toBe(true);
    }
    expect(rateLimit(ip, now)).toBe(false);
  });

  it('pencere sıfırlandığında yeniden izin verir', () => {
    const ip = 'test-ip-2';
    const now = 2_000_000;
    for (let i = 0; i < 5; i++) rateLimit(ip, now);
    expect(rateLimit(ip, now)).toBe(false);
    // 61 saniye sonra pencere sıfırlanır.
    expect(rateLimit(ip, now + 61_000)).toBe(true);
  });

  it('farklı IP’ler birbirini etkilemez', () => {
    const now = 3_000_000;
    for (let i = 0; i < 5; i++) rateLimit('ip-a', now);
    expect(rateLimit('ip-a', now)).toBe(false);
    expect(rateLimit('ip-b', now)).toBe(true);
  });
});
