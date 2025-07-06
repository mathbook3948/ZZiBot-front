import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {ResponseProps} from "@/types/response-interface";
import {LoginContentProps} from "@/types/login-interface";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');

    //code 없을 경우
    if (!code) {
        const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_ZZIBOT_URL}`)
        redirectUrl.searchParams.set("error", "잘못된 요청입니다")

        return NextResponse.redirect(redirectUrl.toString())
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)

    const res = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code})
    })

    const data: ResponseProps<LoginContentProps> = await res.json();

    if (!res.ok || !data.content) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_ZZIBOT_URL}?error=${data.msg}`)
    }

    const isProd = process.env.NODE_ENV === 'production'

    const cookieStore = await cookies()

    cookieStore.set('user_access_token', data.content.accessToken, {
        httpOnly: true,
        secure: isProd,
        path: '/',
        sameSite: 'lax',
    })

    cookieStore.set('user_refresh_token', data.content.refreshToken, {
        httpOnly: true,
        secure: isProd,
        path: '/',
        sameSite: 'lax',
    })

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_ZZIBOT_URL}`)
}