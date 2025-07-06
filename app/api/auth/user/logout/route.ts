import {NextResponse} from 'next/server'

export async function GET() {
    const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_ZZIBOT_URL}`)

    const isProd = process.env.NODE_ENV === 'production'

    res.cookies.set('user_access_token', '', {
        maxAge: 0,
        httpOnly: true,
        secure: isProd,
        path: '/',
        sameSite: 'lax',
    });

    res.cookies.set('user_refresh_token', '', {
        maxAge: 0,
        httpOnly: true,
        secure: isProd,
        path: '/',
        sameSite: 'lax',
    });

    return res;
}
