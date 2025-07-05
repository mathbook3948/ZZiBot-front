import UserMain from "@/views/user/main/user-main";
import {Suspense} from "react";

const UserPage = async () => {
    return (
        <Suspense>
            <UserMain/>
        </Suspense>
    )
}

export default UserPage