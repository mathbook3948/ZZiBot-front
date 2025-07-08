'use server'

import {ActionReturnProps} from "@/types/response-interface";
import currentUser from "@/utils/current-user";
import {redirect} from "next/navigation";
import handleRefreshToken from "@/utils/handle-refresh-token";
import {revalidatePath} from "next/cache";

interface Props {
    guild_id: string
    channel_id: string
    custom_message: string
}

export const modifyUserAlarmConfig = async (form: Props): ActionReturnProps<null> => {
    const user = await currentUser()

    if (!user) {
        redirect('/login')
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/user/alarm/config/modify`)

    let res = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(form),
    })

    if (res.status === 401) {
        const refreshRes = await handleRefreshToken(user.refreshToken)

        if (!refreshRes) {
            redirect('/login')
        }

        res = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${refreshRes.data.content!.accessToken}`
            },
            body: JSON.stringify(form),
        })
    }


    const data = await res.json();

    if (!res.ok || !data.result) {
        return {success: false, data: data}
    }

    revalidatePath("/settings")
    revalidatePath(`/settings/${form.guild_id}`)

    return {success: true, data: data}
}