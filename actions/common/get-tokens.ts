'use server'

import currentUser from "@/utils/current-user";

export const getTokens = async () => {
    return await currentUser()
}