import {ActionReturnProps, ResponseProps} from "@/types/response-interface";
import {RefreshContentProps} from "@/types/login-interface";
import {cookies} from "next/headers";

const handleRefreshToken = async (refreshToken: string): Promise<ActionReturnProps<RefreshContentProps> | null> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`)

    const res = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            accept: '*/*'
        },
        body: JSON.stringify({refreshToken})
    })

    if (!res.ok) return null;

    const data: ResponseProps<RefreshContentProps> = await res.json()

    if (!data.content) return null;

    const isProd = process.env.NODE_ENV === 'production'

    const cookieStore = await cookies()

    cookieStore.set(`${data.content.type}_access_token`, data.content.accessToken, {
        httpOnly: true,
        secure: isProd,
        path: '/',
        sameSite: 'lax',
    })

    cookieStore.set(`${data.content.type}_access_token`, data.content.refreshToken, {
        httpOnly: true,
        secure: isProd,
        path: '/',
        sameSite: 'lax',
    })

    return {success: true, data}
}

export default handleRefreshToken