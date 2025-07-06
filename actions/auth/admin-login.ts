'use server'

import {ActionReturnProps, ResponseProps} from "@/types/response-interface";
import {LoginSchemaType} from "@/schemas/login";
import {LoginContentProps} from "@/types/login-interface";
import {cookies} from "next/headers";

export const adminLogin = async (form: LoginSchemaType): ActionReturnProps<LoginContentProps> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/admin/login`)

    const res = await fetch(url.toString(), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
    })

    console.log('adminLogin', res.status)

    const data: ResponseProps<LoginContentProps> = await res.json();

    if (!res.ok || !data.content) {
        return {success: false, data: data}
    }

    const isProd = process.env.NODE_ENV === 'production'

    const cookieStore = await cookies()

    cookieStore.set('admin_access_token', data.content.accessToken, {
        httpOnly: true,
        secure: isProd,
        path: '/',
        sameSite: 'lax',
    })

    cookieStore.set('admin_refresh_token', data.content.refreshToken, {
        httpOnly: true,
        secure: isProd,
        path: '/',
        sameSite: 'lax',
    })

    return {success: true, data: data}
}