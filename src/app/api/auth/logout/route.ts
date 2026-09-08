import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
  } catch {}

  return NextResponse.json({ success: true }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-cache, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
