import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    const { pathname } = request.nextUrl

    const isAdminDomain = hostname.startsWith('admin.')

    if (isAdminDomain) {
        const adminToken = request.cookies.get('authToken')?.value
        const isLoginPage = pathname.startsWith('/admin')

        if (!adminToken && !isLoginPage) {
            const loginUrl = new URL('/admin', request.url)
            loginUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(loginUrl)
        }

        if (adminToken && isLoginPage) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }


        return NextResponse.next()
    }

    else {
        if (pathname.startsWith('/admin')) {
            return NextResponse.rewrite(new URL('/404', request.url))
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}