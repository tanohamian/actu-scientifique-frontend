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
  const normalizedPath = url.replace(/^\/(fr|en)(?=\/|$)/, '') || '/';

  const shouldTrack =
    normalizedPath === '/one-health' || normalizedPath.startsWith('/one-health/') ||
    normalizedPath === '/technology' || normalizedPath.startsWith('/technology/') ||
    normalizedPath === '/eco-humanity' || normalizedPath.startsWith('/eco-humanity/') ||
    normalizedPath === '/portrait-discovery' || normalizedPath.startsWith('/portrait-discovery/') ||
    normalizedPath === '/agenda' || normalizedPath.startsWith('/agenda/') ||
    normalizedPath === '/dashboard' || normalizedPath.startsWith('/dashboard/') ||
    normalizedPath === '/admin/dashboard' || normalizedPath.startsWith('/admin/dashboard/') ||
    normalizedPath === '/opportunities' || normalizedPath.startsWith('/opportunities/') ||
    normalizedPath === '/about' || normalizedPath.startsWith('/about/');

  if (req.method !== 'GET' || !shouldTrack) {
    return;
  }

  const reqBody = { url: normalizedPath } as { url: string };
  console.log(`Navigating to ${normalizedPath}`);

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

const testHost = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host');
  const adminDomain = env.adminUrl;

  if (hostname !== adminDomain && url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL(`https://${adminDomain}`, req.url));
  }

  if (hostname === adminDomain) {
    if (url.pathname.startsWith('/admin')) {
      const cleanPath = url.pathname.replace('/admin', '') || '/';
      return NextResponse.redirect(new URL(cleanPath, req.url));
    }
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return null;
};


export default async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');

  const response = intlMiddleware(request);
  void check(request);

  if (env.onProduction && hostname === env.adminUrl) {
    const url = request.nextUrl.clone();
    
    if (!url.pathname.includes('/admin') && !url.pathname.includes('.')) {
      
      const segments = url.pathname.split('/');
      const locale = ['fr', 'en'].includes(segments[1]) ? segments[1] : 'fr';
      const pathWithoutLocale = ['fr', 'en'].includes(segments[1]) 
        ? '/' + segments.slice(2).join('/') 
        : url.pathname;

      const internalPath = `/${locale}/admin${pathWithoutLocale}`;
      
      return NextResponse.rewrite(new URL(internalPath, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};