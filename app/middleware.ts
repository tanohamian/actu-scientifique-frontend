import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host');

    console.log(`--- Middleware --- Host: ${hostname} | Path: ${url.pathname}`);

    const adminDomain = 'admin.actuscientifique.com';

    if (hostname === adminDomain) {
        if (!url.pathname.startsWith('/admin')) {
            const newUrl = new URL(`/admin${url.pathname}`, request.url);
            return NextResponse.rewrite(newUrl);
        }
        return NextResponse.next();
    }

    if (hostname !== adminDomain && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL(`https://${adminDomain}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [

        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};