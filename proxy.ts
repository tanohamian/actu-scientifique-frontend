
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from '@/app/config/env';


async function check(req: NextRequest) {
  const url = req.nextUrl.pathname;
  if (
    req.method !== 'GET' ||
    url.startsWith('/api/stats/check') || 
    url.startsWith('/_next/static') || 
    url.startsWith('/.well-known') || 
    url.startsWith('/favicon.ico') ||
    url.startsWith('/images/')
    ) {
    return;
  }
  const reqBody = { url } as { url: string };
  console.log(`Navigating to ${url}`);
  try {
    const response = await fetch(`${env.baseUrl}/stats/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });
    console.log(await response.text());
  } catch (error) {
    console.log(error);
  }
}

export default async function middleware(request: NextRequest) {


  try {
    await check(request);

    const authToken = request.cookies.get('authToken')?.value;
    if (!authToken && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
  } catch(error) {
    console.log(error)
  }
}

export const config = {
  matcher: '/:path*',
};
