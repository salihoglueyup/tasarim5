import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Faz 188: Güvenli Şifreleme Algoritmaları (bcrypt)
 */
export async function hashPassword(plainPassword: string, saltRounds: number = SALT_ROUNDS): Promise<string> {
  if (!plainPassword || typeof plainPassword !== 'string') {
    throw new Error('Geçersiz şifre formatı.');
  }
  return bcrypt.hash(plainPassword, saltRounds);
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  if (!plainPassword || !hashedPassword) return false;
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch {
    return false;
  }
}

export function isStrongPassword(password: string): { isStrong: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!password || password.length < 8) {
    errors.push('Şifre en az 8 karakter uzunluğunda olmalıdır.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermelidir.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermelidir.');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Şifre en az bir rakam içermelidir.');
  }

  return {
    isStrong: errors.length === 0,
    errors,
  };
}
