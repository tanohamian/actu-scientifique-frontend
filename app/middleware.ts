import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const hostname = request.headers.get('host') || ''
    const { pathname } = url

    const isAdminDomain = hostname.startsWith('admin.')

    if (isAdminDomain) {
        const adminToken = request.cookies.get('authToken')?.value


        if (pathname === '/') {
            url.pathname = '/admin'
            return NextResponse.rewrite(url)
        }


        if (!pathname.startsWith('/admin')) {
            url.pathname = `/admin${pathname}`
            return NextResponse.rewrite(url)
        }

        if (!adminToken && url.pathname !== '/admin') {
            return NextResponse.redirect(new URL('/', request.url))
        }

        return NextResponse.next()
    }

    if (pathname.startsWith('/admin')) {
        return NextResponse.rewrite(new URL('/404', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}