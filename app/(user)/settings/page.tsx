import {getUserGuildList} from "@/actions/user/get-user-guild-list";
import UserSettings from "@/views/user/settings/user-settings";

const UserDashboardPage = async () => {

    const res = await getUserGuildList()

    return (
        <UserSettings content={res.data}/>
    )
}

export default UserDashboardPage