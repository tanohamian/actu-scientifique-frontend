import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { env } from '@app/config/env';

const intlMiddleware = createIntlMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed' 
});

async function check(req: NextRequest) {
  const url = req.nextUrl.pathname;
  if (
    req.method !== 'GET' ||
    !url.startsWith('/one-health') &&
    !url.startsWith('/technology') &&
    !url.startsWith('/eco-humanity') &&
    !url.startsWith('/portrait-discovery') &&
    !url.startsWith('/agenda') &&
    !url.startsWith(`${env.onProduction ? "" : "/admin/"}/dashboard`) &&
    !url.startsWith('/opportunities/') &&
    !url.startsWith('/about')
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

const testHost = (request: NextRequest) => {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');


  const adminDomain = env.adminUrl;
  console.log({hostname, adminDomain})
  if (hostname === adminDomain) {
    let newUrlPathName = url.pathname;
    // Remove '/admin
    if (newUrlPathName.startsWith('/admin')) {
      newUrlPathName = newUrlPathName.split('/admin')[1]
    }
    else {
      const newUrl = new URL(`/admin${newUrlPathName}`, request.url);
      return NextResponse.rewrite(newUrl);
    }
  }

  if (hostname !== adminDomain && url.pathname.startsWith('/admin')) {
    const newUrl = new URL(`https://${adminDomain + url.pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return null;
}
export default async function middleware(request: NextRequest) {
  try {
    await check(request);

    if (env.onProduction) {
      const hostRedirect = testHost(request);
      
      if (hostRedirect) {
        
        if (hostRedirect.status >= 300 && hostRedirect.status < 400) {
          return hostRedirect;
        }

        
        const rewriteUrl = hostRedirect.headers.get('x-middleware-rewrite');
        if (rewriteUrl) {
          const newRequest = new NextRequest(new URL(rewriteUrl), request);
          return intlMiddleware(newRequest);
        }
      }
    }

    
    const authToken = request.cookies.get('authToken')?.value;
    if (!authToken && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return intlMiddleware(request);

  } catch (error) {
    console.error(error);
    return NextResponse.next();
  }
}
/*
export default async function middleware(request: NextRequest) {
  try {
    await check(request);
    if (env.onProduction) {
      const hostRedirect = testHost(request);
      if (hostRedirect) {
        console.log("redirection vers admin : ", hostRedirect.url)
        return hostRedirect;
      }
    }


    const authToken = request.cookies.get('authToken')?.value;
    if (!authToken && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return intlMiddleware(request)

  } catch (error) {
    console.log(error);
    return NextResponse.next();
  }
}*/

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};