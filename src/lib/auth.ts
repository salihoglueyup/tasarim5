import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

if (!process.env.JWT_SECRET) {
  throw new Error('CRITICAL SECURITY ERROR: JWT_SECRET environment variable is not set.');
}
const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

/**
 * Yetki kontrolü (RBAC): Yalnızca geçerli oturumu OLAN ve rolü 'ADMIN' olan
 * kullanıcı için oturumu döndürür; aksi halde null. Tüm admin işlemlerinde
 * (server action'lar, upload, seed) tek kaynak olarak kullanılır.
 */
export async function assertAdmin() {
  const session = await getSession();
  if (!session || !session.userId || session.role !== 'ADMIN') return null;
  return session;
}
