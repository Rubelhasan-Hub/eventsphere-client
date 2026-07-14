import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// এখানে ফাংশনটির নাম অবশ্যই 'proxy' হতে হবে
export async function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token");

  // প্রোটেকশন লজিক
  if (!sessionToken && (request.nextUrl.pathname.startsWith('/events') || request.nextUrl.pathname.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/events/:path*', '/dashboard/:path*'],
};