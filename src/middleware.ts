import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

const protectedRoutes = ['/admin'];
const publicRoutes = ['/admin/login'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // We need to support multi-language routing, so we check if the path contains /admin
  const isProtectedRoute = protectedRoutes.some((route) => path.includes(route) && !path.includes('/admin/login'));
  const isPublicRoute = publicRoutes.some((route) => path.includes(route));

  if (isProtectedRoute) {
    const cookie = request.cookies.get('admin_session')?.value;
    const session = cookie ? await decrypt(cookie) : null;

    if (!session?.userId) {
      // Redirect to login, preserving the language prefix if it exists
      const langPrefix = path.split('/')[1];
      const loginUrl = new URL(`/${langPrefix}/admin/login`, request.nextUrl);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isPublicRoute) {
    const cookie = request.cookies.get('admin_session')?.value;
    const session = cookie ? await decrypt(cookie) : null;

    if (session?.userId) {
      // If already logged in, redirect to dashboard
      const langPrefix = path.split('/')[1];
      const dashboardUrl = new URL(`/${langPrefix}/admin/dashboard`, request.nextUrl);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, videos, models (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos|models).*)',
  ],
};
