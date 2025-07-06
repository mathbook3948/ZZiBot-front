'use server'

import {ActionReturnProps} from "@/types/response-interface";
import currentUser from "@/utils/current-user";
import {redirect} from "next/navigation";
import handleRefreshToken from "@/utils/handle-refresh-token";
import {DiscordUserProps} from "@/types/user-interface";

export const getUserDetail = async (): ActionReturnProps<DiscordUserProps> => {
    const user = await currentUser()

    if (!user) {
        redirect('/login')
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/user/discord/user/detail`)

    let res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            accept: '*/*',
            Authorization: `Bearer ${user.accessToken}`
        }
    })

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
            }
        })
    }

    console.log('getUserDetail', res.status)

    const data = await res.json();

    if (!res.ok || !data.result) {
        return {success: false, data: data}
    }

    return {success: true, data: data}
}