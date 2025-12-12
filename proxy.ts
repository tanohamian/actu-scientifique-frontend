import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request:NextRequest) {
  const authToken = request.cookies.get('authToken')?.value;
  if (!authToken && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};