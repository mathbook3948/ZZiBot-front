import {NextRequest, NextResponse} from 'next/server'
import {jwtVerify} from 'jose'

const PUBLIC_PATHS = ['/command', '/login', '/']

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 정적 파일, public 경로는 통과
    const isStatic = pathname.match(/\.\w+$/) || pathname.startsWith('/_next/image')
    const isApi = pathname.startsWith('/api')
    const isAdminLogin = pathname.startsWith('/admin/login')
    const isPublic = PUBLIC_PATHS.includes(pathname)
    if (isStatic || isPublic || isApi || isAdminLogin) {
        return NextResponse.next()
    }

    // 권한 처리===================================================================
    const token =
        request.cookies.get('__Secure-authjs.session-token')?.value ??
        request.cookies.get('next-auth.session-token')?.value

    if (!token) {
        if (pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    try {
        // JWT 검증
        const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
        const {payload} = await jwtVerify(token, secret)
        const roles = payload.roles as string[]

        if (pathname.startsWith('/admin')) {
            //관리자
            if (!token) {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }

            if (!(roles.includes("ADMIN") || roles.includes("SUPERADMIN"))) {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } else {
            //사용자
            if (!token) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        }

        return NextResponse.next()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        if (pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}
