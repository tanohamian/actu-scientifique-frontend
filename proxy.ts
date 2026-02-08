
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from '@/app/config/env';


async function check(req: NextRequest) {
  const url = req.nextUrl.pathname;
  if (
    req.method !== 'GET' ||
    url.startsWith('/api') || 
    url.includes('next') || 
    url.startsWith('/.well-known') || 
    url.startsWith('/favicon.ico') ||
    url.startsWith('/images/') ||
    url.startsWith('/admin') ||
    url.startsWith('/assets') ||
    url.endsWith('.js')
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
const testHost = (request: NextRequest) =>{
    const url = request.nextUrl;
    console.log("url: ", url)
    console.log("request.url : ", request.url)
    const hostname = request.headers.get('host');

    console.log(`--- Middleware --- Host: ${hostname} | Path: ${url.pathname}`);

    const adminDomain = 'admin.actuscientifique.com';

    if (hostname === adminDomain) {
        if (!url.pathname.startsWith('/admin')) {
            const newUrl = new URL(`/admin${url.pathname}`, request.url);
            return NextResponse.rewrite(newUrl); 
        }
    }

    if (hostname !== adminDomain && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL(`https://${adminDomain}`, request.url));
    }

    return NextResponse.next();
}
export default async function middleware(request: NextRequest) {


  try {
    await check(request);

    const authToken = request.cookies.get('authToken')?.value;
    if (!authToken && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    testHost(request)
  } catch(error) {
    console.log(error)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/:path*'
  ],
};
