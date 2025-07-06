import {getUserGuildList} from "@/actions/user/get-user-guild-list";
import UserDashboard from "@/views/user/dashboard/user-dashboard";

const UserDashboardPage = async () => {

    const res = await getUserGuildList()

    return (
        <UserDashboard content={res.data}/>
    )
}

export default UserDashboardPage