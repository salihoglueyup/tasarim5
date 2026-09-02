import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { applyApiRateLimit } from '@/lib/security/rateLimiter';

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Faz 187: Admin Girişi Brute-Force Koruması (5 dakikada en fazla 5 deneme)
    const rateLimitRes = await applyApiRateLimit(clientIp(request), 'admin_login_brute_force', 5, 300);
    if (!rateLimitRes.success) {
      return NextResponse.json({ error: 'Çok fazla başarısız deneme. Lütfen 5 dakika bekleyin.' }, { status: 429 });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email ve şifre gereklidir.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Geçersiz email veya şifre.' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Geçersiz email veya şifre.' }, { status: 401 });
    }

    // Create session
    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const session = await encrypt(sessionData);
    
    const cookieStore = await cookies();
    cookieStore.set('admin_session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}
