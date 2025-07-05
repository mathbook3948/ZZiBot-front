import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_PATHS = ['/login', '/']

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 정적 파일, public 경로는 통과
    const isStatic = pathname.match(/\.\w+$/) || pathname.startsWith('/_next/image')
    const isApi = pathname.startsWith('/api')
    const isAdminLogin = pathname.startsWith('/admin/login')
    const isPublic =  PUBLIC_PATHS.includes(pathname)
    if (isStatic || isPublic || isApi || isAdminLogin) {
        return NextResponse.next()
    }

    // 토큰 쿠키 읽기
    const token =
        request.cookies.get('__Secure-authjs.session-token')?.value ??
        request.cookies.get('next-auth.session-token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        // JWT 검증
        const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
        const { payload } = await jwtVerify(token, secret)

        // 권한 검사 (예시)
        if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/403', request.url))
        }

        return NextResponse.next()
    } catch (err) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
