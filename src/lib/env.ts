import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL zorunludur'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET en az 16 karakter olmalıdır (Güvenlik için)'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  N8N_WEBHOOK_URL: z.string().url('Geçerli bir webhook URL olmalıdır').optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Geçersiz veya eksik ortam değişkenleri (Environment Variables):');
  console.error(_env.error.format());
  throw new Error('Sistem güvenliği için eksik ortam değişkenleriyle (ENV) başlatma durduruldu.');
}

export const env = _env.data;
