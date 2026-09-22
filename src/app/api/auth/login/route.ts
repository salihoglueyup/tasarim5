import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { applyApiRateLimit } from '@/lib/security/rateLimiter';

function clientIp(req: NextRequest): string {
  const cf = req.headers.get('cf-connecting-ip');
  if (cf) return cf.trim();
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: NextRequest) {
  const standardHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'private, no-cache, no-store',
    'X-Robots-Tag': 'noindex, nofollow',
  };

  try {
    // Faz 187: Admin Girişi Brute-Force Koruması (5 dakikada en fazla 5 deneme)
    const rateLimitRes = await applyApiRateLimit(clientIp(request), 'admin_login_brute_force', 5, 300);
    if (!rateLimitRes.success) {
      return NextResponse.json({ error: 'Çok fazla başarısız deneme. Lütfen 5 dakika bekleyin.' }, { status: 429, headers: standardHeaders });
    }

    const body = await request.json();
    const { email, password } = body;

    const rawEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!rawEmail || !password) {
      return NextResponse.json({ error: 'Email ve şifre gereklidir.' }, { status: 400, headers: standardHeaders });
    }

    // Hem .com hem de .com.tr varyasyonlarını destekleme
    const emailVariants = [rawEmail];
    if (rawEmail.endsWith('.com')) {
      emailVariants.push(`${rawEmail}.tr`);
    } else if (rawEmail.endsWith('.com.tr')) {
      emailVariants.push(rawEmail.replace(/\.tr$/, ''));
    }

    let user = await prisma.user.findFirst({
      where: {
        email: { in: emailVariants },
      },
    });

    // Self-Healing: Eğer canlı DB'de User tablosu boşsa varsayılan admin kullanıcısını otomatik oluştur
    if (!user) {
      const userCount = await prisma.user.count();
      if (userCount === 0 && (emailVariants.includes('admin@aloyonetim.com.tr') || emailVariants.includes('admin@aloyonetim.com'))) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        user = await prisma.user.create({
          data: {
            email: 'admin@aloyonetim.com.tr',
            name: 'Alo Yönetim Admin',
            password: hashedPassword,
            role: 'ADMIN',
          },
        });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Geçersiz email veya şifre.' }, { status: 401, headers: standardHeaders });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Geçersiz email veya şifre.' }, { status: 401, headers: standardHeaders });
    }

    // Create session
    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const session = await encrypt(sessionData);
    
    // Cookie Ayarları: HTTPS tespitine duyarlı ve reverse proxy ile tam uyumlu
    const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol;
    const isHttps = proto ? proto.replace(':', '') === 'https' : false;

    const cookieStore = await cookies();
    cookieStore.set('admin_session', session, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json(
      { success: true, user: { id: user.id, email: user.email, role: user.role } },
      { status: 200, headers: standardHeaders }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500, headers: standardHeaders });
  }
}
