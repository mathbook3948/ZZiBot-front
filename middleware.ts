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

    console.log("권한처리 시작 =================================")

    // 권한 처리===================================================================
    const userToken = request.cookies.get('user_access_token')?.value
    const adminToken = request.cookies.get('admin_access_token')?.value

    if (pathname.startsWith('/admin')) {
        if(!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    } else {
        if(!userToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    try {
        const token = pathname.startsWith('/admin') ? adminToken! : userToken!

        // JWT 검증
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
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
