'use server'

import {ActionReturnProps} from "@/types/response-interface";
import currentUser from "@/utils/current-user";
import {redirect} from "next/navigation";
import handleRefreshToken from "@/utils/handle-refresh-token";
import {DiscordGuildChannelProps} from "@/types/settings-interface";

interface Props {
    guild_id: string
}

export const getUserGuildList = async ({guild_id}: Props): ActionReturnProps<DiscordGuildChannelProps[]> => {
    const user = await currentUser()

    if (!user) {
        redirect('/login')
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/user/discord/guild/${guild_id}/channels`)

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


    const data = await res.json();

    if (!res.ok) {
        return {success: false, data: data}
    }

    return {success: true, data: data}
}