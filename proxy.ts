import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { env } from '@app/config/env';

const intlMiddleware = createIntlMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always' 
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
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');
  const adminDomain = env.adminUrl;

  if (hostname !== adminDomain && url.pathname.startsWith('/admin')) {
    const newUrl = new URL(url.pathname, `https://${adminDomain}`);
    return NextResponse.redirect(newUrl);
  }

  
  if (hostname === adminDomain) {
    
    if (!url.pathname.startsWith('/admin') && !url.pathname.startsWith('/api')) {
      
      
      const segments = url.pathname.split('/');
      const locales = ['fr', 'en'];
      const hasLocale = locales.includes(segments[1]);

      if (hasLocale) {
        
        const locale = segments[1];
        const rest = segments.slice(2).join('/');
        url.pathname = `/${locale}/admin/${rest}`;
      } else {
        
        url.pathname = `/admin${url.pathname}`;
      }

      return NextResponse.rewrite(url);
    }
  }

  return null;
};


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