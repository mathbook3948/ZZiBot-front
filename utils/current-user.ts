import {cookies} from "next/headers";
import {CurrentUser} from "@/types/user-interface";

const currentUser = async (): Promise<CurrentUser | null> => {
    const cookieStore = await cookies()
    const userAccessToken = cookieStore.get("user_access_token")?.value
    const userRefreshToken = cookieStore.get("user_refresh_token")?.value

    if(!userAccessToken || !userRefreshToken) return null;

    return {
        accessToken: userAccessToken,
        refreshToken: userRefreshToken
    }
}

export default currentUser