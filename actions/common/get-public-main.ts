'use server'

import {ActionReturnProps} from "@/types/response-interface";
import {MainContentProps} from "@/types/main-interface";

export const getPublicMain = async (): ActionReturnProps<MainContentProps> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/public/main`)

    const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            accept: '*/*'
        },
        cache: 'no-cache'
    })

    console.log('getPublicMain', res.status)

    const data = await res.json();

    if (!res.ok) {
        return {success: false, data: data}
    }

    return {success: true, data: data}
}