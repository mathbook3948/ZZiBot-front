'use server'

import {ActionReturnProps} from "@/types/response-interface";
import currentUser from "@/utils/current-user";
import {redirect} from "next/navigation";
import handleRefreshToken from "@/utils/handle-refresh-token";

interface Props {
    guild_id: string
}

export const sendTestAlarm = async (form: Props): ActionReturnProps<null> => {
    const user = await currentUser()

    if (!user) {
        redirect('/login')
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/user/alarm/config/test`)

    let res = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            accept: '*/*',
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(form)
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
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshRes.data.content!.accessToken}`
            },
            body: JSON.stringify(form)
        })
    }


    const data = await res.json();

    if (!res.ok || !data.result) {
        return {success: false, data: data}
    }

    return {success: true, data: data}
}