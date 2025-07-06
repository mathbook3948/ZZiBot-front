'use server'

import {ActionReturnProps} from "@/types/response-interface";
import currentUser from "@/utils/current-user";
import {redirect} from "next/navigation";
import handleRefreshToken from "@/utils/handle-refresh-token";
import {DiscordGuildProps} from "@/types/dashboard-interface";

export const getUserGuildList = async (): ActionReturnProps<DiscordGuildProps[]> => {
    const user = await currentUser()

    if (!user) {
        redirect('/login')
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/user/discord/guild/list`)

    let res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            accept: '*/*',
            Authorization: `Bearer ${user.accessToken}`
        },
        cache: 'force-cache',
        next: { revalidate: 600 }
    })

    console.log("res", res)

    if (res.status === 401) {
        const refreshRes = await handleRefreshToken(user.refreshToken)

        if (!refreshRes) {
            redirect('/login')
        }

        res = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${refreshRes.data.content!.accessToken}`
            },
            cache: 'force-cache',
            next: { revalidate: 600 }
        })
    }

    console.log('getUserGuildList', res.status)

    const data = await res.json();

    if (!res.ok) {
        return {success: false, data: data}
    }

    return {success: true, data: data}
}