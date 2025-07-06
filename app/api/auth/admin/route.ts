import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const body = await req.json()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: body.username,
            password: body.password,
        }),
    })

    if (!res.ok) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const { accessToken, refreshToken, id } = await res.json()

    const response = NextResponse.json({ id })

    response.cookies.set({
        name: 'access_token',
        value: accessToken,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    })

    response.cookies.set({
        name: 'refresh_token',
        value: refreshToken,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    })

    return response
}
