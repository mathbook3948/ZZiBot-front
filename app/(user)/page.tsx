import UserMain from "@/views/user/main/user-main";
import {Suspense} from "react";
import {getPublicMain} from "@/actions/common/get-public-main";

const UserPage = async () => {

    const res = await getPublicMain()

    const content = res.data.content

    return (
        <Suspense>
            <UserMain
                guildCount={content?.guildCount ?? 0}
                connectedChannelCount={content?.connectedChannelCount ?? 0}
            />
        </Suspense>
    )
}

export default UserPage